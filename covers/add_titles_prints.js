const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'pr01.jpg', title: 'ABSTRACT LINE ART' },
  { file: 'pr02.jpg', title: 'BOTANICAL PRINT' },
  { file: 'pr03.jpg', title: 'MOTIVATIONAL PRINT' },
  { file: 'pr04.jpg', title: 'MOUNTAIN LANDSCAPE' },
  { file: 'pr05.jpg', title: 'GEOMETRIC PRINT' },
  { file: 'pr06.jpg', title: 'GALLERY WALL SET' },
  { file: 'pr07.jpg', title: 'CELESTIAL PRINT' },
  { file: 'pr08.jpg', title: 'BATHROOM WALL ART' },
  { file: 'pr09.jpg', title: 'NURSERY WALL ART' },
  { file: 'pr10.jpg', title: 'KITCHEN WALL ART' },
  { file: 'pr11.jpg', title: 'FINE LINE ART PRINT' },
  { file: 'pr12.jpg', title: 'VINTAGE MAP PRINT' },
  { file: 'pr13.jpg', title: 'TROPICAL LEAF PRINT' },
  { file: 'pr14.jpg', title: 'ZODIAC PRINT' },
  { file: 'pr15.jpg', title: 'SUNSET GRADIENT PRINT' },
  { file: 'pr16.jpg', title: 'OFFICE DESK PRINT' },
];

function svgBanner(rawTitle, w, h) {
  const title = rawTitle.replace(/&/g, '&amp;');
  const bandH = Math.round(h * 0.24);
  const bandY = h - bandH;
  const fontSize = Math.round(w * 0.052);
  return Buffer.from(`
  <svg width="${w}" height="${h}">
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="black" stop-opacity="0"/>
        <stop offset="100%" stop-color="black" stop-opacity="0.72"/>
      </linearGradient>
    </defs>
    <rect x="0" y="${bandY}" width="${w}" height="${bandH}" fill="url(#fade)"/>
    <text x="50%" y="${h - bandH * 0.32}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
      font-size="${fontSize}" font-weight="800" fill="white" style="letter-spacing:1px">${title}</text>
  </svg>`);
}

(async () => {
  for (const item of items) {
    const input = path.join(__dirname, item.file);
    const meta = await sharp(input).metadata();
    const buf = await sharp(input)
      .composite([{ input: svgBanner(item.title, meta.width, meta.height), top: 0, left: 0 }])
      .jpeg({ quality: 90 })
      .toBuffer();
    await sharp(buf).toFile(input.replace('.jpg', '_titled.jpg'));
    console.log(item.file, '-> done');
  }
  console.log('ALL DONE');
})();
