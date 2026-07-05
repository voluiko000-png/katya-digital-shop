const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'n01.jpg', title: 'HABIT TRACKER' },
  { file: 'n02.jpg', title: 'PROJECT HUB' },
  { file: 'n03.jpg', title: 'FINANCE TRACKER' },
  { file: 'n04.jpg', title: 'VISION BOARD' },
  { file: 'n05.jpg', title: 'MEAL PLANNER' },
  { file: 'n06.jpg', title: 'JOB SEARCH TRACKER' },
  { file: 'n07.jpg', title: 'CONTENT CALENDAR' },
  { file: 'n08.jpg', title: 'READING TRACKER' },
  { file: 'n09.jpg', title: 'TRAVEL PLANNER' },
  { file: 'n10.jpg', title: 'WEDDING HUB' },
  { file: 'n11.jpg', title: 'FITNESS TRACKER' },
  { file: 'n12.jpg', title: 'STUDY PLANNER' },
  { file: 'n13.jpg', title: 'CLIENT CRM' },
  { file: 'n14.jpg', title: 'HOME INVENTORY' },
  { file: 'n15.jpg', title: 'BUDGET TRACKER' },
  { file: 'n16.jpg', title: 'DAILY JOURNAL' },
];

function svgBanner(rawTitle, w, h) {
  const title = rawTitle.replace(/&/g, '&amp;');
  const bandH = Math.round(h * 0.24);
  const bandY = h - bandH;
  const fontSize = Math.round(w * 0.058);
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
