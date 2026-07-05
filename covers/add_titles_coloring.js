const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'c01.jpg', title: 'DINOSAUR' },
  { file: 'c02.jpg', title: 'UNICORN' },
  { file: 'c03.jpg', title: 'SPACE ROCKET' },
  { file: 'c04.jpg', title: 'UNDER THE SEA' },
  { file: 'c05.jpg', title: 'CUTE PUPPY' },
  { file: 'c06.jpg', title: 'BUTTERFLY' },
  { file: 'c07.jpg', title: 'DRAGON' },
  { file: 'c08.jpg', title: 'RACE CAR' },
  { file: 'c09.jpg', title: 'PRINCESS CASTLE' },
  { file: 'c10.jpg', title: 'FARM ANIMALS' },
  { file: 'c11.jpg', title: 'ROBOT FRIEND' },
  { file: 'c12.jpg', title: 'AUTUMN LEAVES' },
  { file: 'c13.jpg', title: 'ZOO LION' },
  { file: 'c14.jpg', title: 'ICE CREAM TRUCK' },
  { file: 'c15.jpg', title: 'CHRISTMAS TREE' },
  { file: 'c16.jpg', title: 'OWL AT NIGHT' },
];

function svgBanner(title, w, h) {
  const bandH = Math.round(h * 0.24);
  const bandY = h - bandH;
  const fontSize = Math.round(w * 0.062);
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
