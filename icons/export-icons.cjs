const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const srcDir = path.join(__dirname, 'src');
const outDir = __dirname;

const exports = [
  { src: 'icon-light.svg', out: 'apple-touch-icon-light.png',     size: 180 },
  { src: 'icon-dark.svg',  out: 'apple-touch-icon-dark.png',      size: 180 },
  { src: 'icon-light.svg', out: 'apple-touch-icon-light-152.png', size: 152 },
  { src: 'icon-light.svg', out: 'apple-touch-icon-light-167.png', size: 167 },
  { src: 'icon-light.svg', out: 'favicon-light-32.png',           size: 32  },
  { src: 'icon-dark.svg',  out: 'favicon-dark-32.png',            size: 32  },
  { src: 'icon-light.svg', out: 'favicon-light-16.png',           size: 16  },
  { src: 'icon-dark.svg',  out: 'favicon-dark-16.png',            size: 16  },
];

async function run() {
  for (const { src, out, size } of exports) {
    const inPath  = path.join(srcDir, src);
    const outPath = path.join(outDir, out);
    await sharp(inPath)
      .resize(size, size)
      .png()
      .toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`${out} — ${size}x${size} — ${stat.size} bytes`);
  }
  console.log('Done.');
}

run().catch(err => { console.error(err); process.exit(1); });
