## Telegram Bot Template (Node.js + Grammy) 🤖
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
