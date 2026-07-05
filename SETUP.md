# Katya Store — Telegram Mini App setup (04.07.2026)

## Как открыть магазин в Telegram
1. В Telegram найди бота **@valera_claude_bridge_bot** (сейчас называется "Katya | Digital Products")
2. Открой его → внизу слева кнопка **🛍 Shop** → откроется витрина

## Что настроено
- **Бот:** @valera_claude_bridge_bot, токен: `8797491670:AAHRhhlfiqVIqWofrToN_TKcx75KlU5BT9k`
- **Витрина:** [store/index.html](index.html) — 20 товаров, AI-обложки (covers/p01–p20.jpg), тёмная тема, всё на английском
- **Меню-кнопка бота** → web_app → адрес туннеля

## ⚠️ ВАЖНО — адрес временный
- Магазин отдаётся через:
  - локальный сервер `python -m http.server 8899` в папке store
  - туннель `cloudflared` → `https://indiana-richards-contacts-rocks.trycloudflare.com`
- **Оба живут только пока включён компьютер и запущены эти процессы.** При выключении/перезагрузке адрес меняется, магазин перестанет открываться, пока не поднять заново и не обновить кнопку бота.
- **Постоянное решение (следующий шаг):** захостить папку store на бесплатном постоянном хостинге (GitHub Pages / Netlify) — нужен 1 раз вход в аккаунт (действие Валеры), тогда адрес не будет меняться.

## Чтобы поднять заново после перезагрузки
1. `python -m http.server 8899` в папке store
2. `cloudflared tunnel --url http://localhost:8899` → взять новый https://...trycloudflare.com
3. setChatMenuButton у бота на новый адрес (curl, см. историю)
