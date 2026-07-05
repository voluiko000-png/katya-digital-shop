const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'ps01.jpg', title: 'MOODY FILM PRESETS' },
  { file: 'ps02.jpg', title: 'BRIGHT AIRY PRESETS' },
  { file: 'ps03.jpg', title: 'GOLDEN HOUR PRESETS' },
  { file: 'ps04.jpg', title: 'BLACK & WHITE PRESETS' },
  { file: 'ps05.jpg', title: 'TRAVEL PRESETS' },
  { file: 'ps06.jpg', title: 'PORTRAIT PRESETS' },
  { file: 'ps07.jpg', title: 'FOOD PHOTO PRESETS' },
  { file: 'ps08.jpg', title: 'WEDDING PRESETS' },
  { file: 'ps09.jpg', title: 'URBAN STREET PRESETS' },
  { file: 'ps10.jpg', title: 'NATURE PRESETS' },
  { file: 'ps11.jpg', title: 'VINTAGE FILM PRESETS' },
  { file: 'ps12.jpg', title: 'INFLUENCER PRESETS' },
  { file: 'ps13.jpg', title: 'MOBILE LIGHTROOM PRESETS' },
  { file: 'ps14.jpg', title: 'CANVA TEMPLATE PACK' },
  { file: 'ps15.jpg', title: 'WINTER PRESETS' },
  { file: 'ps16.jpg', title: 'SUMMER VIBRANT PRESETS' },
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
