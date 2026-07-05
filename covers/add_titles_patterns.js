const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 'pa01.jpg', title: 'CROCHET STITCH PATTERN' },
  { file: 'pa02.jpg', title: 'KNITTING CABLE PATTERN' },
  { file: 'pa03.jpg', title: 'AMIGURUMI PATTERN' },
  { file: 'pa04.jpg', title: 'CROSS STITCH PATTERN' },
  { file: 'pa05.jpg', title: 'EMBROIDERY PATTERN' },
  { file: 'pa06.jpg', title: 'MACRAME PATTERN' },
  { file: 'pa07.jpg', title: 'QUILTING PATTERN' },
  { file: 'pa08.jpg', title: 'CROCHET BLANKET PATTERN' },
  { file: 'pa09.jpg', title: 'KNITTED SWEATER PATTERN' },
  { file: 'pa10.jpg', title: 'HAT & SCARF PATTERN' },
  { file: 'pa11.jpg', title: 'SEWING PATTERN' },
  { file: 'pa12.jpg', title: 'BABY BLANKET PATTERN' },
  { file: 'pa13.jpg', title: 'CROCHET FLOWER PATTERN' },
  { file: 'pa14.jpg', title: 'TAPESTRY CROCHET PATTERN' },
  { file: 'pa15.jpg', title: 'KNITTED MITTENS PATTERN' },
  { file: 'pa16.jpg', title: 'MARKET BAG PATTERN' },
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
