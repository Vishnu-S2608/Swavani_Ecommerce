import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcPath = 'C:/Users/JEGAN/.gemini/antigravity-ide/brain/ddec95ed-0488-4e22-96f7-16a6059c393c/.user_uploaded/media_1793013171282.png';

async function generate() {
  const size = 712;
  const radius = size / 2;

  // Clean circular mask
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius - 2}" fill="#fff" /></svg>`
  );

  // Optional refined border
  const borderRing = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius - 3}" fill="none" stroke="#3A0615" stroke-width="4" opacity="0.6" /></svg>`
  );

  // Step 1: Base high-res circular logo (512x512)
  const baseBuffer = await sharp(srcPath)
    .extract({ left: 47, top: 40, width: size, height: size })
    .composite([
      { input: circleMask, blend: 'dest-in' },
      { input: borderRing, blend: 'over' }
    ])
    .png()
    .toBuffer();

  // Step 2: Generate all necessary icon sizes
  const sizes = [
    { name: 'icon.png', size: 512, dest: ['public', 'src/app'] },
    { name: 'icon-192.png', size: 192, dest: ['public'] },
    { name: 'apple-icon.png', size: 180, dest: ['public', 'src/app'] },
    { name: 'favicon-32x32.png', size: 32, dest: ['public'] },
    { name: 'favicon-16x16.png', size: 16, dest: ['public'] }
  ];

  for (const item of sizes) {
    const resized = await sharp(baseBuffer)
      .resize(item.size, item.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    for (const dir of item.dest) {
      const outPath = path.join(dir, item.name);
      fs.writeFileSync(outPath, resized);
      console.log(`Generated: ${outPath} (${item.size}x${item.size})`);
    }
  }

  // Step 3: Generate a proper multi-size Windows/browser favicon.ico (combining 16x16, 32x32, 48x48 PNGs)
  const icoSizes = [16, 32, 48];
  const pngBuffers = [];
  for (const s of icoSizes) {
    const buf = await sharp(baseBuffer)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    pngBuffers.push({ size: s, buffer: buf });
  }

  // Build ICO binary structure
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4); // count of images

  let offset = 6 + pngBuffers.length * 16;
  const dirEntries = [];
  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.size, 0); // width
    entry.writeUInt8(img.size, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(img.buffer.length, 8); // image size in bytes
    entry.writeUInt32LE(offset, 12); // image offset
    offset += img.buffer.length;
    dirEntries.push(entry);
  }

  const icoBuffer = Buffer.concat([
    header,
    ...dirEntries,
    ...pngBuffers.map(p => p.buffer)
  ]);

  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('src/app/favicon.ico', icoBuffer);
  console.log('Generated: public/favicon.ico & src/app/favicon.ico');
}

generate().catch(console.error);
