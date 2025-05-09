## Telegram Bot Template (Node.js) 🤖

Быстрый старт для создания Telegram-бота на Node.js. Готовый шаблон с базовой структурой, примерами команд и middleware.

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

- Клонируйте репозиторий:

```bash
git clone https://github.com/miwist/telegram-bot-template.git
```

- Установите зависимости:

```bash
npm install
```

- Настройте `.env` (скопируйте .env.example):

```bash
env
BOT_TOKEN=your_telegram_bot_token
```

- Запустите бота:

```bash
npm start
```

#### Предварительные требования

- Node.js 18+
- PostgreSQL 12+ (или другая СУБД)
- Telegram Bot Token от @BotFather

#### Миграции
```bash
npm run migration:generate --name=InitialSchema # для создания миграции
npm run migration:run   # для выполнения миграции в БД
npm run migration:create --name=InitialSchema # для создания пустой миграции
npm run migration:reset # для отката миграции в БД
```

> Необходимо добавить в `data-source.ts` миграции для выполнения, затем выполнять `npm run migration:run`.

#### Docker

```bash
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.prod.yml up -d
```
