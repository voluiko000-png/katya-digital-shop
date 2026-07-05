const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'kd01.jpg', title: 'SUDOKU PUZZLE BOOK' },
  { file: 'kd02.jpg', title: 'WORD SEARCH BOOK' },
  { file: 'kd03.jpg', title: 'CROSSWORD PUZZLE BOOK' },
  { file: 'kd04.jpg', title: 'ADULT COLORING BOOK' },
  { file: 'kd05.jpg', title: 'JOURNAL NOTEBOOK' },
  { file: 'kd06.jpg', title: 'GRATITUDE JOURNAL BOOK' },
  { file: 'kd07.jpg', title: 'BABY NAME BOOK' },
  { file: 'kd08.jpg', title: 'LOGIC PUZZLE BOOK' },
  { file: 'kd09.jpg', title: 'HANDWRITING PRACTICE BOOK' },
  { file: 'kd10.jpg', title: 'DOT GRID NOTEBOOK' },
  { file: 'kd11.jpg', title: 'PASSWORD ORGANIZER BOOK' },
  { file: 'kd12.jpg', title: 'BLANK RECIPE BOOK' },
  { file: 'kd13.jpg', title: 'TRIVIA QUIZ BOOK' },
  { file: 'kd14.jpg', title: 'LARGE PRINT WORD PUZZLES' },
  { file: 'kd15.jpg', title: 'KIDS ACTIVITY BOOK' },
  { file: 'kd16.jpg', title: 'UNDATED PLANNER BOOK' },
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
