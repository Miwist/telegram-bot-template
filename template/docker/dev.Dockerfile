FROM node:18-alpine

WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY package.json package-lock.json ./
RUN npm install

# Копируем исходники (в dev можно монтировать том, но тут для примера)
COPY . .

# Запуск бота с вотчером (если нужно)
CMD ["npm", "run", "start"] 
