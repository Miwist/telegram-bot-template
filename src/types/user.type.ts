export interface User {
  id: number;
  telegramId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  registerDate: Date;
  lastActivityDate: Date;
  hasPaid: boolean;
}
