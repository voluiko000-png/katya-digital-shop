const sharp = require('sharp');
const path = require('path');

const items = [
  { file: 're01.jpg', title: 'RECIPE CARD SET' },
  { file: 're02.jpg', title: 'WEEKLY MEAL PLAN' },
  { file: 're03.jpg', title: 'GROCERY LIST TEMPLATE' },
  { file: 're04.jpg', title: 'AIR FRYER RECIPES' },
  { file: 're05.jpg', title: 'SLOW COOKER RECIPES' },
  { file: 're06.jpg', title: 'SMOOTHIE RECIPES' },
  { file: 're07.jpg', title: 'BAKING RECIPES' },
  { file: 're08.jpg', title: 'VEGAN RECIPES' },
  { file: 're09.jpg', title: 'KETO RECIPES' },
  { file: 're10.jpg', title: 'KIDS LUNCHBOX IDEAS' },
  { file: 're11.jpg', title: 'HOLIDAY RECIPES' },
  { file: 're12.jpg', title: 'PANTRY INVENTORY' },
  { file: 're13.jpg', title: 'RECIPE BINDER' },
  { file: 're14.jpg', title: 'BUDGET MEAL PLAN' },
  { file: 're15.jpg', title: 'DESSERT RECIPES' },
  { file: 're16.jpg', title: 'FAMILY COOKBOOK' },
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
