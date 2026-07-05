const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'fi01.jpg', title: 'WORKOUT LOG' },
  { file: 'fi02.jpg', title: 'YOGA FLOW GUIDE' },
  { file: 'fi03.jpg', title: 'RUNNING TRACKER' },
  { file: 'fi04.jpg', title: 'HYDRATION TRACKER' },
  { file: 'fi05.jpg', title: 'MEAL PREP PLANNER' },
  { file: 'fi06.jpg', title: 'HOME GYM GUIDE' },
  { file: 'fi07.jpg', title: 'HIIT WORKOUT PLAN' },
  { file: 'fi08.jpg', title: 'BODY MEASUREMENT LOG' },
  { file: 'fi09.jpg', title: 'PRENATAL FITNESS' },
  { file: 'fi10.jpg', title: 'STRETCH & MOBILITY' },
  { file: 'fi11.jpg', title: 'NUTRITION TRACKER' },
  { file: 'fi12.jpg', title: 'WORKOUT CALENDAR' },
  { file: 'fi13.jpg', title: 'RESISTANCE BAND GUIDE' },
  { file: 'fi14.jpg', title: 'SLEEP & RECOVERY LOG' },
  { file: 'fi15.jpg', title: 'STEP CHALLENGE TRACKER' },
  { file: 'fi16.jpg', title: 'MIND-BODY WELLNESS' },
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
