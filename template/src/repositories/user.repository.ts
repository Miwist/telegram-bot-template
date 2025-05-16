import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/User";

// Пример репозитория для работы с сущностью пользователя
export class UserRepository {
  private repository = AppDataSource.getRepository(User);

  async findByTelegramId(telegramId: number) {
    return this.repository.findOne({ where: { telegramId } });
  }

  async findOrCreate(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string
  ) {
    let user = await this.repository.findOne({ where: { telegramId } });

    if (!user) {
      user = this.repository.create({
        telegramId,
        username,
        firstName,
        lastName,
        registerDate: new Date(),
        lastActivityDate: new Date(),
      });
      await this.repository.save(user);
    }

    return user;
  }

  async safeUpdate(
    telegramId: number,
    updateData: Partial<User>
  ): Promise<boolean> {
    const result = await this.repository.update({ telegramId }, updateData);

    if (!result.affected) {
      return false;
    }

    return result.affected > 0;
  }


}
