// One-off: create a static Stars invoice link per product via createInvoiceLink
// (chat-independent, works from Telegram.WebApp.openInvoice() inside the Mini App -
// unlike sendData(), openInvoice works regardless of how the Mini App was launched).
// Run: node gen_invoice_links.js  -> prints JSON {id: link} to paste into index.html
const fs = require('fs');
const path = require('path');

const TOKEN = '8710991944:AAHB_Ce_AnPza-2hrnlZv1W58gBnQDJOwSg'; // Katya bot
const API = `https://api.telegram.org/bot${TOKEN}`;
const USD_TO_STARS = 50; // ponytail: same approximate rate as katya_checkout_bot.js

function readFile(p) { try { return fs.readFileSync(p, 'utf8').trim(); } catch (e) { return ''; } }

async function main() {
  const html = readFile(path.join(__dirname, 'index.html'));
  const m = html.match(/var PRODUCTS = (\[[\s\S]*?\]);/);
  const products = JSON.parse(m[1]);
  const links = {};
  for (const p of products) {
    const amount = String(p.price).replace(/[^0-9.]/g, '');
    const stars = Math.max(1, Math.round(parseFloat(amount) * USD_TO_STARS));
    const r = await fetch(`${API}/createInvoiceLink`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: p.name.slice(0, 32),
        description: `${p.name} — instant digital download after payment.`,
        payload: p.id,
        currency: 'XTR',
        prices: [{ label: p.name.slice(0, 32), amount: stars }],
      }),
    });
    const j = await r.json();
    if (!j.ok) { console.error(`FAILED ${p.id}:`, JSON.stringify(j)); continue; }
    links[p.id] = j.result;
    console.log(`${p.id} (${stars}⭐): ${j.result}`);
  }
  fs.writeFileSync(path.join(__dirname, 'invoice_links.json'), JSON.stringify(links, null, 2));
  console.log(`\nSaved ${Object.keys(links).length} links to invoice_links.json`);
}
main();
