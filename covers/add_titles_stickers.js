const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'st01.jpg', title: 'PLANNER STICKER SET' },
  { file: 'st02.jpg', title: 'MOTIVATIONAL STICKERS' },
  { file: 'st03.jpg', title: 'PLANT STICKER SET' },
  { file: 'st04.jpg', title: 'WEATHER STICKER SET' },
  { file: 'st05.jpg', title: 'FOOD STICKER SET' },
  { file: 'st06.jpg', title: 'KAWAII ANIMAL STICKERS' },
  { file: 'st07.jpg', title: 'WASHI TAPE STICKERS' },
  { file: 'st08.jpg', title: 'MOOD TRACKER STICKERS' },
  { file: 'st09.jpg', title: 'BUDGET STICKER SET' },
  { file: 'st10.jpg', title: 'HOLIDAY STICKER SET' },
  { file: 'st11.jpg', title: 'GOODNOTES STICKERS' },
  { file: 'st12.jpg', title: 'TRAVEL STICKER SET' },
  { file: 'st13.jpg', title: 'FITNESS STICKER SET' },
  { file: 'st14.jpg', title: 'SCHOOL STICKER SET' },
  { file: 'st15.jpg', title: 'SELF CARE STICKERS' },
  { file: 'st16.jpg', title: 'PRODUCTIVITY STICKERS' },
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
