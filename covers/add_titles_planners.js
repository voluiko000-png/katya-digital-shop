const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'pl01.jpg', title: 'DAILY SCHEDULE' },
  { file: 'pl02.jpg', title: 'WEEKLY PLANNER' },
  { file: 'pl03.jpg', title: 'MONTHLY CALENDAR' },
  { file: 'pl04.jpg', title: 'ACADEMIC PLANNER' },
  { file: 'pl05.jpg', title: 'SELF CARE CHECKLIST' },
  { file: 'pl06.jpg', title: 'FOCUS TIMER PLANNER' },
  { file: 'pl07.jpg', title: 'GRATITUDE JOURNAL' },
  { file: 'pl08.jpg', title: 'MEAL PREP PLANNER' },
  { file: 'pl09.jpg', title: 'BABY MILESTONE PLANNER' },
  { file: 'pl10.jpg', title: 'HOMESCHOOL PLANNER' },
  { file: 'pl11.jpg', title: 'NEW YEAR GOALS' },
  { file: 'pl12.jpg', title: 'BUSINESS PLANNER' },
  { file: 'pl13.jpg', title: 'GARDEN PLANNER' },
  { file: 'pl14.jpg', title: 'PET CARE PLANNER' },
  { file: 'pl15.jpg', title: 'TO-DO LIST' },
  { file: 'pl16.jpg', title: 'YEARLY OVERVIEW' },
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
