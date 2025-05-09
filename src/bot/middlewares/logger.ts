import { MiddlewareFn } from "grammy";
import { BotContext } from "../../types/context.type";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import { format } from "date-fns";
import { join } from "path";

const LOGS_DIR = join(__dirname, "../../cache/logs");

if (!existsSync(LOGS_DIR)) {
    mkdirSync(LOGS_DIR, { recursive: true });
}

export const logger: MiddlewareFn<BotContext> = async (ctx, next) => {
  const startDate = Date.now();
  const logDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  
  try {
    // Основная информация о запросе
    const requestInfo = {
      update_id: ctx.update.update_id,
      date: logDate,
      chat_id: ctx.chat?.id,
      user_id: ctx.from?.id,
      username: ctx.from?.username,
      message_text: ctx.message?.text || ctx.callbackQuery?.data,
    };

    await next();
    
    const duration = Date.now() - startDate;
    const isCallback = !!ctx.callbackQuery;
    
    const logMessage = JSON.stringify({
      ...requestInfo,
      status: "success",
      duration_ms: duration,
      response: isCallback ? "callback_processed" : "message_processed",
    }, null, 2);

    console.log(`[${logDate}] ${logMessage}`);
    appendFileSync(`${LOGS_DIR}/bot_${format(new Date(), "yyyy-MM-dd")}.log`, `${logMessage}\n`);
  } catch (error: any) {
    const duration = Date.now() - startDate;
    const errorLog = JSON.stringify({
      update_id: ctx.update.update_id,
      date: logDate,
      chat_id: ctx.chat?.id,
      user_id: ctx.from?.id,
      status: "error",
      duration_ms: duration,
      error: {
        name: error?.name,
        message: error?.message,
        stack: error?.stack?.split("\n")[0],
      },
      request: {
        text: ctx.message?.text,
        callback_data: ctx.callbackQuery?.data,
      }
    }, null, 2);

    console.error(`[${logDate}] ${errorLog}`);
    appendFileSync(`${LOGS_DIR}/errors_${format(new Date(), "yyyy-MM-dd")}.log`, `${errorLog}\n`);
    
    throw error;
  }
};

// Дополнительный middleware для логирования команд
export const commandLogger: MiddlewareFn<BotContext> = async (ctx, next) => {
  if (ctx.message?.text?.startsWith("/")) {
    const command = ctx.message.text.split(" ")[0];
    console.log(`[COMMAND] ${command} by @${ctx.from?.username || 'unknown'} (${ctx.from?.id})`);
  }
  await next();
};
