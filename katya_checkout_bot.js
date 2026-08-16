// Katya Shop checkout bot — @katya_digitalproducts_bot.
// Магазин (index.html, GitHub Pages) уже открывается через кнопку Open Shop у этого бота.
// Раньше покупка нигде не обрабатывалась (checkout вообще не был построен, только Tanya/Emma
// боты имели недоделанный PayPal-вариант в store_bot.js — их не трогаем по просьбе Валеры).
// Здесь — оплата Telegram Stars (XTR): не нужен ни PayPal-аккаунт, ни эквайринг, ни туннель,
// ни вебхук — работает из любой страны, включая Молдову, где Stripe/PayPal напрямую недоступны.
//
// Запуск:            node katya_checkout_bot.js
// Офлайн-проверка:    node katya_checkout_bot.js --selftest
const fs = require('fs');
const path = require('path');

const TOKEN = '8710991944:AAHB_Ce_AnPza-2hrnlZv1W58gBnQDJOwSg'; // Katya Digital Products bot
const API = `https://api.telegram.org/bot${TOKEN}`;
const PRODUCTS_DIR = path.join(__dirname, '..', 'Цифровые_продукты');
const DELIVERED_FILE = path.join(__dirname, 'katya_delivered.json');

function readFile(p) { try { return fs.readFileSync(p, 'utf8').trim(); } catch (e) { return ''; } }
async function api(method, body) {
  const r = await fetch(`${API}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return r.json();
}

// ---------- каталог: единственный источник правды — index.html (те же товары, что в витрине) ----------
// ponytail: курс Stars примерно $0.02/star (Telegram не публикует фиксированный курс) — округляем
// до целого числа Stars; поправить множитель здесь, если Валера увидит расхождение с реальным курсом.
const USD_TO_STARS = 50;
function loadCatalog() {
  const m = readFile(path.join(__dirname, 'index.html')).match(/var PRODUCTS = (\[[\s\S]*?\]);/);
  const list = m ? JSON.parse(m[1]) : [];
  const zips = {};
  for (const f of (fs.existsSync(PRODUCTS_DIR) ? fs.readdirSync(PRODUCTS_DIR) : [])) {
    const n = f.match(/^(\d{2})_.+\.zip$/);
    if (n) zips['p' + n[1]] = path.join(PRODUCTS_DIR, f);
  }
  return list.map(p => {
    const amount = String(p.price).replace(/[^0-9.]/g, '');
    return { id: p.id, name: p.name, amount, stars: Math.max(1, Math.round(parseFloat(amount) * USD_TO_STARS)), file: zips[p.id] || null };
  });
}
const PRODUCTS = loadCatalog();

// ---------- Indigo/other product lines cross-sold through the same bot (16.08.2026) ----------
// Валера: traffic shouldn't only go through Payhip/PayPal (his account isn't working) - same
// Stars checkout, same bot, just a different, hand-picked list, not the whole Katya catalog.
// Deliverable files live outside Цифровые_продукты, so it's a plain path, not a folder scan.
const EXTRA_PRODUCTS = [
  { id: 'indigo_client_crm', name: 'Client CRM & Follow-Up Tracker (Working App)', amount: '15', stars: Math.round(15 * USD_TO_STARS),
    file: 'C:/Users/Валера/Desktop/БАЗА/App_Sales_Products/client-crm-follow-up-tracker.html' },
];
for (const p of EXTRA_PRODUCTS) if (!fs.existsSync(p.file)) { console.error(`⚠️ EXTRA_PRODUCTS: файл не найден для ${p.id}: ${p.file}`); p.file = null; }
const ALL_PRODUCTS = PRODUCTS.concat(EXTRA_PRODUCTS);

const norm = s => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();
function findProduct(q) {
  return ALL_PRODUCTS.find(p => p.id === q.id) || ALL_PRODUCTS.find(p => norm(p.name) === norm(q.name)) || null;
}
function parseOrder(data) {
  try { const j = JSON.parse(data); if (j && (j.id || j.name)) return j; } catch (e) {}
  const m = String(data).match(/^Order:\s*(.+?)\s*-\s*\$?\s*([\d.]+)\s*$/);
  return m ? { name: m[1], price: m[2] } : null;
}

// ---------- attribution: какой канал-пост / start-ссылка привела покупателя (для маркетинг-плана) ----------
const STARTS_LOG = path.join(__dirname, 'katya_starts.log');
function logStart(payload, chatId) {
  try { fs.appendFileSync(STARTS_LOG, `${new Date().toISOString()}\t${payload}\t${chatId}\n`); } catch (e) {}
}

async function sendInvoiceFor(chatId, p, starsOverride) {
  const r = await api('sendInvoice', {
    chat_id: chatId,
    title: p.name.slice(0, 32),
    description: `${p.name} — instant digital download after payment.`,
    payload: p.id,
    currency: 'XTR',
    prices: [{ label: p.name.slice(0, 32), amount: starsOverride || p.stars }],
  });
  if (!r.ok) console.error('❌ sendInvoice:', JSON.stringify(r));
}

// ---------- допродажа: сразу после выдачи предлагаем соседний бандл со скидкой 15% ----------
async function upsell(chatId, justBoughtId) {
  const others = PRODUCTS.filter(x => x.id !== justBoughtId && x.file);
  if (!others.length) return;
  const p = others[Math.floor(Math.random() * others.length)];
  const discounted = Math.max(1, Math.round(p.stars * 0.85));
  await api('sendMessage', { chat_id: chatId, text: `While you're here — 15% off ${p.name} today only:` });
  await sendInvoiceFor(chatId, p, discounted);
}

// ---------- выдача товара (ключ — telegram_payment_charge_id, защита от повторной выдачи) ----------
let delivered = new Set(JSON.parse(readFile(DELIVERED_FILE) || '[]'));
function saveDelivered() { fs.writeFileSync(DELIVERED_FILE, JSON.stringify([...delivered])); }
async function deliver(chatId, productId, key) {
  if (!chatId || delivered.has(key)) return;
  delivered.add(key); saveDelivered();
  try {
    const p = ALL_PRODUCTS.find(x => x.id === productId);
    if (!p || !p.file) {
      await api('sendMessage', { chat_id: chatId, text: 'Payment received. Your files will be sent by support shortly.' });
      console.log(`⚠️ оплачен ${productId}, но файл не найден — chat ${chatId}`);
      return;
    }
    const fd = new FormData();
    fd.append('chat_id', String(chatId));
    fd.append('caption', `Payment confirmed. Here is your download: ${p.name}\nThank you! Lifetime access, free updates.`);
    fd.append('document', new Blob([fs.readFileSync(p.file)]), path.basename(p.file));
    const j = await (await fetch(`${API}/sendDocument`, { method: 'POST', body: fd })).json();
    if (!j.ok) throw new Error('sendDocument: ' + JSON.stringify(j));
    console.log(`✅ выдан ${p.id} (${key}) → chat ${chatId}`);
    await upsell(chatId, p.id);
  } catch (e) {
    delivered.delete(key); saveDelivered();
    console.error('❌ выдача не удалась:', e.message);
  }
}

// ---------- заказ из витрины (Mini App) → счёт в Stars ----------
async function handleOrder(chatId, data) {
  const q = parseOrder(data);
  const p = q && findProduct(q);
  if (!p) { await api('sendMessage', { chat_id: chatId, text: 'Sorry, we could not find that product. Please open the shop and try again.' }); return; }
  await sendInvoiceFor(chatId, p);
}

let offset = 0;
async function loop() {
  try {
    const r = await fetch(`${API}/getUpdates?timeout=30&offset=${offset}`);
    const j = await r.json();
    if (j.ok) {
      for (const u of j.result) {
        offset = u.update_id + 1;
        if (u.pre_checkout_query) { await api('answerPreCheckoutQuery', { pre_checkout_query_id: u.pre_checkout_query.id, ok: true }); continue; }
        const msg = u.message;
        if (!msg || !msg.chat) continue;
        if (msg.successful_payment) {
          const sp = msg.successful_payment;
          await deliver(msg.chat.id, sp.invoice_payload, sp.telegram_payment_charge_id);
          continue;
        }
        if (msg.web_app_data) { await handleOrder(msg.chat.id, msg.web_app_data.data); continue; }
        if (msg.text && msg.text.trim().startsWith('/start')) {
          const payload = msg.text.trim().slice(6).trim(); // /start p07 -> "p07" (deep-link from a channel post)
          const p = payload && PRODUCTS.find(x => x.id === payload);
          if (p) {
            logStart(payload, msg.chat.id);
            await api('sendMessage', { chat_id: msg.chat.id, text: `${p.name} — ${p.stars}⭐. Pay instantly below, your files arrive right here in chat.` });
            await sendInvoiceFor(msg.chat.id, p);
          } else {
            await api('sendMessage', { chat_id: msg.chat.id, text: 'Welcome to Katya Digital Products! Tap the Open Shop button below to browse 20 bundles — pay instantly with Telegram Stars, get your files right here in chat.' });
          }
        }
      }
    }
  } catch (e) { await new Promise(s => setTimeout(s, 2000)); }
  loop();
}

function selftest() {
  const assert = require('assert');
  assert.ok(PRODUCTS.length >= 20, 'каталог не разобрался из index.html');
  for (const p of PRODUCTS) {
    assert.ok(p.stars > 0, `плохая цена в Stars у ${p.id}`);
    assert.ok(p.file && fs.existsSync(p.file), `нет zip для ${p.id}`);
  }
  assert.strictEqual(findProduct({ id: 'p20' }).id, 'p20');
  assert.strictEqual(findProduct({ name: 'нет такого' }), null);
  console.log(`selftest OK — ${PRODUCTS.length} товаров, все zip на месте, цены в Stars посчитаны`);
}

if (process.argv.includes('--selftest')) { selftest(); }
else (async () => {
  await api('deleteWebhook', { drop_pending_updates: true });
  console.log('🛍️ Katya checkout bot запущен (@katya_digitalproducts_bot): Stars-оплата + автовыдача файлов.');
  loop();
})();
