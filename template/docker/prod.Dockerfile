FROM node:18-alpine

WORKDIR /app

# Устанавливаем только production-зависимости
COPY package.json package-lock.json ./
RUN npm install --production

# Копируем исходники
COPY . .

# Запуск бота
CMD ["npm", "start"]
