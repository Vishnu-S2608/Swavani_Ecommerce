const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const source = path.join(__dirname, '..', 'public', 'icon.png');
  const pubDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'src', 'app');

  console.log('Generating icons from:', source);

  // 1. Generate PNGs in required multiples of 48 and standard sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },   // Google's official recommended baseline
    { name: 'favicon-96x96.png', size: 96 },   // 2x multiple of 48
    { name: 'favicon-144x144.png', size: 144 }, // 3x multiple of 48
    { name: 'apple-icon.png', size: 180 },     // Apple touch icon
    { name: 'icon-192.png', size: 192 },       // 4x multiple of 48 / PWA
    { name: 'icon-512.png', size: 512 },       // High-res PWA
  ];

  for (const item of sizes) {
    const dest = path.join(pubDir, item.name);
    await sharp(source)
      .resize(item.size, item.size, { fit: 'contain', background: { r: 244, g: 232, b: 212, alpha: 0 } })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(dest);
    console.log(`Generated public/${item.name} (${item.size}x${item.size})`);
  }

  // Also copy apple-icon.png and icon.png into src/app/
  fs.copyFileSync(path.join(pubDir, 'apple-icon.png'), path.join(appDir, 'apple-icon.png'));
  fs.copyFileSync(path.join(pubDir, 'icon-192.png'), path.join(appDir, 'icon.png'));

  // 2. Generate a valid multi-image ICO containing 16x16, 32x32, 48x48
  const icoSizes = [16, 32, 48];
  const pngBuffers = [];
  for (const s of icoSizes) {
    const buf = await sharp(source)
      .resize(s, s, { fit: 'contain' })
      .png()
      .toBuffer();
    pngBuffers.push({ size: s, buffer: buf });
  }

  // ICO header: 6 bytes
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4); // number of images

  // Directory entries: 16 bytes each
  let offset = 6 + (16 * count);
  const dirEntries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 0); // width
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    dirEntries.push(entry);
    offset += item.buffer.length;
  }

  const finalIco = Buffer.concat([
    header,
    ...dirEntries,
    ...pngBuffers.map(b => b.buffer)
  ]);

  fs.writeFileSync(path.join(pubDir, 'favicon.ico'), finalIco);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), finalIco);
  console.log('Generated multi-frame favicon.ico (16, 32, 48) for public/ and src/app/');
}

generateIcons().catch(console.error);
