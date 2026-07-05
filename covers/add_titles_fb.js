const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'fb01.jpg', lines: ['DIGITAL PRODUCTS', 'THAT ACTUALLY HELP', 'YOU WIN THE DAY'] },
  { file: 'fb02.jpg', lines: ['50+ TEMPLATES,', 'PROMPTS & PRINTABLES', 'IN ONE PLACE'] },
  { file: 'fb03.jpg', lines: ['NOTION · CANVA', 'AI PROMPTS · PLANNERS', 'AND MORE'] },
  { file: 'fb04.jpg', lines: ['INSTANT DOWNLOAD', 'USE IN MINUTES', 'NO WAITING'] },
  { file: 'fb05.jpg', lines: ['SWIPE TO SEE MORE', 'THEN TAP THE LINK', 'TO SHOP'] },
];

function svgBanner(rawLines, w, h) {
  const lines = rawLines.map(l => l.replace(/&/g, '&amp;'));
  const bandH = Math.round(h * 0.42);
  const bandY = h - bandH;
  const fontSize = Math.round(w * 0.072);
  const lineGap = fontSize * 1.15;
  const startY = bandY + bandH * 0.38;
  const textEls = lines.map((line, i) =>
    `<text x="50%" y="${startY + i * lineGap}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
      font-size="${fontSize}" font-weight="900" fill="white" style="letter-spacing:1px">${line}</text>`
  ).join('\n');
  return Buffer.from(`
  <svg width="${w}" height="${h}">
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="black" stop-opacity="0"/>
        <stop offset="100%" stop-color="black" stop-opacity="0.8"/>
      </linearGradient>
    </defs>
    <rect x="0" y="${bandY}" width="${w}" height="${bandH}" fill="url(#fade)"/>
    ${textEls}
  </svg>`);
}

(async () => {
  for (const item of items) {
    const input = path.join(__dirname, item.file);
    const meta = await sharp(input).metadata();
    const buf = await sharp(input)
      .composite([{ input: svgBanner(item.lines, meta.width, meta.height), top: 0, left: 0 }])
      .jpeg({ quality: 90 })
      .toBuffer();
    await sharp(buf).toFile(input.replace('.jpg', '_titled.jpg'));
    console.log(item.file, '-> done');
  }
  console.log('ALL DONE');
})();
