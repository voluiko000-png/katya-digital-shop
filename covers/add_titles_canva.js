const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'cv01.jpg', title: 'INSTAGRAM POST TEMPLATES' },
  { file: 'cv02.jpg', title: 'INSTAGRAM STORY TEMPLATES' },
  { file: 'cv03.jpg', title: 'PINTEREST PIN TEMPLATES' },
  { file: 'cv04.jpg', title: 'YOUTUBE THUMBNAIL PACK' },
  { file: 'cv05.jpg', title: 'BUSINESS CARD TEMPLATE' },
  { file: 'cv06.jpg', title: 'FLYER POSTER TEMPLATE' },
  { file: 'cv07.jpg', title: 'CANVA RESUME TEMPLATE' },
  { file: 'cv08.jpg', title: 'PRESENTATION TEMPLATE' },
  { file: 'cv09.jpg', title: 'LOGO DESIGN TEMPLATE' },
  { file: 'cv10.jpg', title: 'LINKEDIN BANNER TEMPLATE' },
  { file: 'cv11.jpg', title: 'TIKTOK COVER TEMPLATE' },
  { file: 'cv12.jpg', title: 'NEWSLETTER TEMPLATE' },
  { file: 'cv13.jpg', title: 'PLANNER COVER TEMPLATE' },
  { file: 'cv14.jpg', title: 'INVITATION TEMPLATE' },
  { file: 'cv15.jpg', title: 'MENU DESIGN TEMPLATE' },
  { file: 'cv16.jpg', title: 'INFOGRAPHIC TEMPLATE' },
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
