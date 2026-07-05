const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'ca01.jpg', title: 'MODERN RESUME' },
  { file: 'ca02.jpg', title: 'COVER LETTER' },
  { file: 'ca03.jpg', title: 'LINKEDIN MAKEOVER' },
  { file: 'ca04.jpg', title: 'INTERVIEW PREP' },
  { file: 'ca05.jpg', title: 'SALARY NEGOTIATION' },
  { file: 'ca06.jpg', title: 'CAREER ROADMAP' },
  { file: 'ca07.jpg', title: 'PORTFOLIO TEMPLATE' },
  { file: 'ca08.jpg', title: 'THANK YOU NOTE' },
  { file: 'ca09.jpg', title: 'NETWORKING KIT' },
  { file: 'ca10.jpg', title: 'PERSONAL BRANDING' },
  { file: 'ca11.jpg', title: 'CAREER CHANGE GUIDE' },
  { file: 'ca12.jpg', title: 'INTERNSHIP KIT' },
  { file: 'ca13.jpg', title: 'FREELANCE CONTRACT' },
  { file: 'ca14.jpg', title: 'REMOTE WORK KIT' },
  { file: 'ca15.jpg', title: '30-60-90 DAY PLAN' },
  { file: 'ca16.jpg', title: 'SKILLS TRACKER' },
];

function svgBanner(rawTitle, w, h) {
  const title = rawTitle.replace(/&/g, '&amp;');
  const bandH = Math.round(h * 0.24);
  const bandY = h - bandH;
  const fontSize = Math.round(w * 0.055);
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
