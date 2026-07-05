const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'a01.jpg', title: 'PRODUCTIVITY' },
  { file: 'a02.jpg', title: 'SOCIAL MEDIA' },
  { file: 'a03.jpg', title: 'BUSINESS STRATEGY' },
  { file: 'a04.jpg', title: 'CONTENT CREATION' },
  { file: 'a05.jpg', title: 'COPYWRITING' },
  { file: 'a06.jpg', title: 'EMAIL MARKETING' },
  { file: 'a07.jpg', title: 'CAREER BOOST' },
  { file: 'a08.jpg', title: 'STUDY & LEARNING' },
  { file: 'a09.jpg', title: 'JOURNALING' },
  { file: 'a10.jpg', title: 'AI ART PROMPTS' },
  { file: 'a11.jpg', title: 'CODING PROMPTS' },
  { file: 'a12.jpg', title: 'MEAL PLANNING' },
  { file: 'a13.jpg', title: 'TRAVEL PLANNING' },
  { file: 'a14.jpg', title: 'WEDDING PLANNING' },
  { file: 'a15.jpg', title: 'FITNESS COACHING' },
  { file: 'a16.jpg', title: 'FINANCIAL PLANNING' },
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
