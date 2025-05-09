import { UserService } from "../services/user.service";

const userService = new UserService();

// Проверка на админа
export const isAdmin = async (telegramId: number) => {
    const user = await userService.getUser(telegramId);

    if (user!.isAdmin) {
        return true;
    }

    return false;
}