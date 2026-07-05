const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'ki01.jpg', title: 'ALPHABET ACTIVITY' },
  { file: 'ki02.jpg', title: 'COUNTING NUMBERS' },
  { file: 'ki03.jpg', title: 'PUZZLE ACTIVITY' },
  { file: 'ki04.jpg', title: 'STICKER CHART' },
  { file: 'ki05.jpg', title: 'BINGO GAME CARDS' },
  { file: 'ki06.jpg', title: 'MAZE ACTIVITY BOOK' },
  { file: 'ki07.jpg', title: 'DOT TO DOT PAGES' },
  { file: 'ki08.jpg', title: 'MEMORY MATCH GAME' },
  { file: 'ki09.jpg', title: 'WEATHER CHART' },
  { file: 'ki10.jpg', title: 'EMOTIONS CHART' },
  { file: 'ki11.jpg', title: 'KIDS CHORE CHART' },
  { file: 'ki12.jpg', title: 'SHAPES & COLORS' },
  { file: 'ki13.jpg', title: 'HANDWRITING PRACTICE' },
  { file: 'ki14.jpg', title: 'SCAVENGER HUNT' },
  { file: 'ki15.jpg', title: 'BEDTIME ROUTINE CHART' },
  { file: 'ki16.jpg', title: 'REWARD CHART' },
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
