const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'cl01.jpg', title: 'WOODLAND ANIMALS CLIPART' },
  { file: 'cl02.jpg', title: 'FLORAL BOUQUET CLIPART' },
  { file: 'cl03.jpg', title: 'FOOD & DRINK CLIPART' },
  { file: 'cl04.jpg', title: 'CHRISTMAS CLIPART' },
  { file: 'cl05.jpg', title: 'HALLOWEEN CLIPART' },
  { file: 'cl06.jpg', title: 'BABY SHOWER CLIPART' },
  { file: 'cl07.jpg', title: 'TROPICAL SUMMER CLIPART' },
  { file: 'cl08.jpg', title: 'SCHOOL SUPPLIES CLIPART' },
  { file: 'cl09.jpg', title: 'WEDDING CLIPART' },
  { file: 'cl10.jpg', title: 'SPACE & PLANETS CLIPART' },
  { file: 'cl11.jpg', title: 'FARM ANIMALS CLIPART' },
  { file: 'cl12.jpg', title: 'UNICORN FANTASY CLIPART' },
  { file: 'cl13.jpg', title: 'SPORTS CLIPART' },
  { file: 'cl14.jpg', title: 'CAMPING CLIPART' },
  { file: 'cl15.jpg', title: 'SEA CREATURES CLIPART' },
  { file: 'cl16.jpg', title: 'BIRTHDAY PARTY CLIPART' },
];

function svgBanner(rawTitle, w, h) {
  const title = rawTitle.replace(/&/g, '&amp;');
  const bandH = Math.round(h * 0.24);
  const bandY = h - bandH;
  const fontSize = Math.round(w * 0.048);
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
