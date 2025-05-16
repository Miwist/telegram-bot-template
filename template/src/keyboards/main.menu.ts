import { Keyboard } from "grammy";

// Пример кнопок меню
export const mainMenuKeyboard = new Keyboard()
  .text("📋 Список услуг")
  .row()
  .text("ℹ️ Инфо")
  .resized();

export const cancelKeyboard = new Keyboard().text("❌ Отмена").resized();
