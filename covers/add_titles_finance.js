const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'fn01.jpg', title: 'SAVINGS TRACKER' },
  { file: 'fn02.jpg', title: 'BUDGET BREAKDOWN' },
  { file: 'fn03.jpg', title: 'DEBT PAYOFF TRACKER' },
  { file: 'fn04.jpg', title: 'SAVINGS JAR CHALLENGE' },
  { file: 'fn05.jpg', title: 'INVESTMENT TRACKER' },
  { file: 'fn06.jpg', title: 'CREDIT CARD PAYOFF' },
  { file: 'fn07.jpg', title: 'NET WORTH TRACKER' },
  { file: 'fn08.jpg', title: 'FAMILY BUDGET PLANNER' },
  { file: 'fn09.jpg', title: 'SUBSCRIPTION TRACKER' },
  { file: 'fn10.jpg', title: 'EMERGENCY FUND PLANNER' },
  { file: 'fn11.jpg', title: 'RETIREMENT PLANNER' },
  { file: 'fn12.jpg', title: 'TAX PREP CHECKLIST' },
  { file: 'fn13.jpg', title: 'SIDE HUSTLE TRACKER' },
  { file: 'fn14.jpg', title: 'STUDENT LOAN TRACKER' },
  { file: 'fn15.jpg', title: 'CASH ENVELOPE SYSTEM' },
  { file: 'fn16.jpg', title: 'FINANCIAL GOALS PLANNER' },
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
