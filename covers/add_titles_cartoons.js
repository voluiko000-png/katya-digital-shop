const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'ct01.jpg', title: 'DINOSAUR CARTOON PACK' },
  { file: 'ct02.jpg', title: 'ASTRONAUT CARTOON PACK' },
  { file: 'ct03.jpg', title: 'DRAGON CARTOON PACK' },
  { file: 'ct04.jpg', title: 'ROBOT CARTOON PACK' },
  { file: 'ct05.jpg', title: 'FAIRY CARTOON PACK' },
  { file: 'ct06.jpg', title: 'SUPERHERO CARTOON PACK' },
  { file: 'ct07.jpg', title: 'PIRATE CARTOON PACK' },
  { file: 'ct08.jpg', title: 'MERMAID CARTOON PACK' },
  { file: 'ct09.jpg', title: 'WIZARD CARTOON PACK' },
  { file: 'ct10.jpg', title: 'FARM ANIMAL CARTOONS' },
  { file: 'ct11.jpg', title: 'JUNGLE ANIMAL CARTOONS' },
  { file: 'ct12.jpg', title: 'MONSTER CARTOON PACK' },
  { file: 'ct13.jpg', title: 'PRINCESS CARTOON PACK' },
  { file: 'ct14.jpg', title: 'KNIGHT CARTOON PACK' },
  { file: 'ct15.jpg', title: 'NINJA CARTOON PACK' },
  { file: 'ct16.jpg', title: 'VEHICLE CARTOON PACK' },
];

function svgBanner(rawTitle, w, h) {
  const title = rawTitle.replace(/&/g, '&amp;');
  const bandH = Math.round(h * 0.24);
  const bandY = h - bandH;
  const fontSize = Math.round(w * 0.05);
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
