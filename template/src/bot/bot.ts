import { Bot } from "grammy";
import { BotContext } from "../types/context.type";
import { logger } from "./middlewares/logger";
import dotenv from "dotenv";
import { registerBotCommands } from "./handlers/commands/start.command";
import { registerBotMenuButtons } from "./handlers/callbacks/menu.handler";
import { registerCallbackHanlder } from "./handlers/callbacks/callbacks.handler";
import { registerInput } from "./handlers/callbacks/input.hanlder";

dotenv.config();

export const bot = new Bot<BotContext>(process.env.BOT_TOKEN || "");

registerBotCommands();
registerBotMenuButtons();
registerCallbackHanlder();
registerInput();

bot.use(logger);
