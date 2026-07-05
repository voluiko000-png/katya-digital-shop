// Katya Store bot — на любое сообщение / /start сразу шлёт кнопку OPEN SHOP.
// Токен бота @valera_claude_bridge_bot ("Katya | Digital Products").
// URL магазина читается из shop_url.txt (обновляй его при смене туннеля).
const fs = require('fs');
const path = require('path');

const TOKEN = '8950464270:AAEuFYPNtaMnkX_OxOODuUmI8GCMuAFdd6A'; // Tanya bot, чистый username
const API = `https://api.telegram.org/bot${TOKEN}`;
const URL_FILE = path.join(__dirname, 'shop_url.txt');

function shopUrl() {
  try { return fs.readFileSync(URL_FILE, 'utf8').trim(); }
  catch (e) { return 'https://indiana-richards-contacts-rocks.trycloudflare.com/index.html'; }
}

async function api(method, body) {
  const r = await fetch(`${API}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return r.json();
}

async function sendShop(chatId) {
  await api('sendMessage', {
    chat_id: chatId,
    text: 'Welcome to Katya Digital Products! 20 ready-to-use digital products — AI prompts, Notion templates, planners, printables & more. Tap below to open the store:',
    reply_markup: { inline_keyboard: [[{ text: 'OPEN SHOP - 20 products', web_app: { url: shopUrl() } }]] },
  });
}

let offset = 0;
async function loop() {
  try {
    const r = await fetch(`${API}/getUpdates?timeout=30&offset=${offset}`);
    const j = await r.json();
    if (j.ok) {
      for (const u of j.result) {
        offset = u.update_id + 1;
        const msg = u.message;
        // отвечаем ТОЛЬКО на /start — чтобы не спамить кнопкой на каждое сообщение
        if (msg && msg.chat && msg.text && msg.text.trim() === '/start') {
          await sendShop(msg.chat.id);
        }
      }
    }
  } catch (e) { await new Promise(s => setTimeout(s, 2000)); }
  loop();
}

(async () => {
  await api('deleteWebhook', { drop_pending_updates: true }); // сбрасываем висящие старые апдейты
  console.log('🛍️ Katya Store bot запущен (@valera_claude_bridge_bot). Отвечает только на /start.');
  loop();
})();
