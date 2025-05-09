import "reflect-metadata";
import { bot } from "./bot/bot";
import { AppDataSource } from "./database/data-source";

// Точка входа бота
async function bootstrap() {
  try {
    // Инициализация БД
    await AppDataSource.initialize();
    console.log("База данных запущена!");

    // Запускаем бота
    await bot.start();

    // Подключаем команды
    console.log("Бот запущен!");
  } catch (error) {
    console.error("Ошибка запуска:", error);
  }
}

bootstrap();
