# Шаблон Telegram бота на grammY и TypeScript / grammY Telegram Bot Template

[![npm version](https://img.shields.io/npm/v/grammy-bot-starter.svg)](https://www.npmjs.com/package/grammy-bot-starter)
[![Downloads](https://img.shields.io/npm/dm/grammy-bot-starter.svg)](https://www.npmjs.com/package/grammy-bot-starter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Быстрый старт
Быстрый старт для создания Telegram-бота на Node.js. Готовый шаблон с базовой структурой, примерами команд и middleware.

### Предварительные требования

- Node.js 18+
- PostgreSQL 12+ (или другая СУБД)
- Telegram Bot Token от @BotFather

Создайте нового Telegram бота за 30 секунд:

```bash
npx create-grammy-bot my-bot
cd my-bot
npm start
```

### ⚡ Особенности:

- Готовая архитектура (модули handlers/, services/, utils/)

- Работа с библиотекой grammy

- Конфигурация через .env (токен бота, настройки API и БД)

- Примеры кода:

1. Команды (/start, /help)

2. Текстовые и callback-кнопки

3. Middleware для логирования и ошибок

4. Поддержка TypeScript

### 🚀 Быстрый старт:
- Установите зависимости:

```bash
npm install
```

- Настройте `.env`:

```bash
env
BOT_TOKEN=your_telegram_bot_token
```

- Запустите бота:

```bash
npm start
```
