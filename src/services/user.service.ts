import { Context } from "grammy";
import { mainMenuKeyboard } from "../keyboards/mainMenu";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../database/entities/User";

// Пример сервиса (логика) для работы с пользователем
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUser(userId: number): Promise<User | null> {
    return await this.userRepository.findByTelegramId(userId);
  }

  async handleStart(ctx: Context) {
    const user = await this.userRepository.findOrCreate(
      ctx.from!.id,
      ctx.from!.username,
      ctx.from!.first_name,
      ctx.from!.last_name
    );

    await ctx.reply(`Добро пожаловать, ${user.firstName || "пользователь"}!`, {
      reply_markup: mainMenuKeyboard,
      parse_mode: "Markdown",
    });
  }

  async updateUser(
    telegramId: number,
    updateData: Partial<User>
  ): Promise<boolean> {
    return this.userRepository.safeUpdate(telegramId, updateData);
  }
}
