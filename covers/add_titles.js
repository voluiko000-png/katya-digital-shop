const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'p01.jpg', title: 'AI PROMPTS PACK' },
  { file: 'p02.jpg', title: 'COLORING PAGE' },
  { file: 'p03.jpg', title: 'KNITTING PATTERN' },
  { file: 'p04.jpg', title: 'NOTION DASHBOARD' },
  { file: 'p05.jpg', title: 'DAILY PLANNER' },
  { file: 'p06.jpg', title: 'RESUME TEMPLATE' },
  { file: 'p07.jpg', title: 'CRICUT SVG FILE' },
  { file: 'p08.jpg', title: 'DIGITAL STICKERS' },
  { file: 'p09.jpg', title: 'WALL ART PRINT' },
  { file: 'p10.jpg', title: 'CAROUSEL TEMPLATE' },
  { file: 'p11.jpg', title: 'WORKOUT LOG' },
  { file: 'p12.jpg', title: 'BUDGET TRACKER' },
  { file: 'p13.jpg', title: 'WEDDING WORDING' },
  { file: 'p14.jpg', title: 'ALPHABET TRACING' },
  { file: 'p15.jpg', title: 'MEAL PLANNER' },
  { file: 'p16.jpg', title: 'FONT PAIRING GUIDE' },
  { file: 'p17.jpg', title: 'ICON PACK' },
  { file: 'p18.jpg', title: 'LIGHTROOM PRESET' },
  { file: 'p19.jpg', title: 'KDP INTERIOR' },
];

function svgBanner(title, w, h) {
  const bandH = Math.round(h * 0.28);
  const bandY = h - bandH;
  const fontSize = Math.round(w * 0.058);
  return Buffer.from(`
  <svg width="${w}" height="${h}">
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="black" stop-opacity="0"/>
        <stop offset="100%" stop-color="black" stop-opacity="0.75"/>
      </linearGradient>
    </defs>
    <rect x="0" y="${bandY}" width="${w}" height="${bandH}" fill="url(#fade)"/>
    <text x="50%" y="${h - bandH * 0.28}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
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
    console.log(item.file, `(${meta.width}x${meta.height})`, '-> done');
  }
  console.log('ALL DONE');
})();
