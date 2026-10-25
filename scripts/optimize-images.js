const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const productsDir = path.join(__dirname, '..', 'public', 'products');

async function optimizeImages() {
  const folders = fs.readdirSync(productsDir);
  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const folder of folders) {
    const folderPath = path.join(productsDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      if (!file.toLowerCase().endsWith('.jpg') && !file.toLowerCase().endsWith('.jpeg')) continue;

      const filePath = path.join(folderPath, file);
      const originalStat = fs.statSync(filePath);
      const originalSize = originalStat.size;
      totalBefore += originalSize;

      try {
        const inputBuffer = fs.readFileSync(filePath);
        const image = sharp(inputBuffer);
        const metadata = await image.metadata();

        // Target max dimension 1440px (super sharp for high-DPI screens without wasting MBs)
        const maxDim = 1440;
        let resizeOptions = null;

        if (metadata.width > maxDim || metadata.height > maxDim) {
          if (metadata.width > metadata.height) {
            resizeOptions = { width: maxDim, withoutEnlargement: true };
          } else {
            resizeOptions = { height: maxDim, withoutEnlargement: true };
          }
        }

        let pipeline = sharp(inputBuffer);
        if (resizeOptions) {
          pipeline = pipeline.resize(resizeOptions);
        }

        const buffer = await pipeline
          .jpeg({ quality: 84, progressive: true, mozjpeg: true })
          .toBuffer();

        fs.writeFileSync(filePath, buffer);
        const newSize = buffer.length;
        totalAfter += newSize;
        count++;

        console.log(`[${count}] ${folder}/${file}: ${(originalSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB (-${Math.round((1 - newSize / originalSize) * 100)}%)`);
      } catch (err) {
        console.error(`Error optimizing ${folder}/${file}:`, err.message);
        totalAfter += originalSize;
      }
    }
  }

  console.log('\n--- Optimization Complete ---');
  console.log(`Total images optimized: ${count}`);
  console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`After:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB (${Math.round((1 - totalAfter / totalBefore) * 100)}% reduction)`);
}

optimizeImages();
