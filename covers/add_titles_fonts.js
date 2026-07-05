const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'fo01.jpg', title: 'SCRIPT CALLIGRAPHY FONT' },
  { file: 'fo02.jpg', title: 'MODERN SANS FONT' },
  { file: 'fo03.jpg', title: 'BRUSH LETTERING FONT' },
  { file: 'fo04.jpg', title: 'VINTAGE SERIF FONT' },
  { file: 'fo05.jpg', title: 'PLAYFUL BUBBLE FONT' },
  { file: 'fo06.jpg', title: 'GEOMETRIC FONT' },
  { file: 'fo07.jpg', title: 'WEDDING CALLIGRAPHY FONT' },
  { file: 'fo08.jpg', title: 'GRAFFITI FONT' },
  { file: 'fo09.jpg', title: 'RETRO GROOVY FONT' },
  { file: 'fo10.jpg', title: 'FARMHOUSE FONT' },
  { file: 'fo11.jpg', title: 'HALLOWEEN FONT' },
  { file: 'fo12.jpg', title: 'CHRISTMAS FONT' },
  { file: 'fo13.jpg', title: 'MONOGRAM FONT' },
  { file: 'fo14.jpg', title: 'KIDS CARTOON FONT' },
  { file: 'fo15.jpg', title: 'LUXURY GOLD FONT' },
  { file: 'fo16.jpg', title: 'WATERCOLOR FONT' },
];

function svgBanner(rawTitle, w, h) {
  const title = rawTitle.replace(/&/g, '&amp;');
  const bandH = Math.round(h * 0.24);
  const bandY = h - bandH;
  const fontSize = Math.round(w * 0.05);
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
