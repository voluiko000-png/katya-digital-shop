const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'we01.jpg', title: 'WEDDING INVITATION' },
  { file: 'we02.jpg', title: 'SEATING CHART' },
  { file: 'we03.jpg', title: 'WEDDING BUDGET TRACKER' },
  { file: 'we04.jpg', title: 'WEDDING DAY TIMELINE' },
  { file: 'we05.jpg', title: 'GUEST LIST TRACKER' },
  { file: 'we06.jpg', title: 'SAVE THE DATE' },
  { file: 'we07.jpg', title: 'WEDDING MENU CARD' },
  { file: 'we08.jpg', title: 'VOW TEMPLATE' },
  { file: 'we09.jpg', title: 'BRIDAL SHOWER INVITE' },
  { file: 'we10.jpg', title: 'WEDDING CHECKLIST' },
  { file: 'we11.jpg', title: 'THANK YOU CARD' },
  { file: 'we12.jpg', title: 'TABLE NUMBER CARD' },
  { file: 'we13.jpg', title: 'VENDOR TRACKER' },
  { file: 'we14.jpg', title: 'HONEYMOON PLANNER' },
  { file: 'we15.jpg', title: 'BACHELORETTE INVITE' },
  { file: 'we16.jpg', title: 'WEDDING PROGRAM CARD' },
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
