import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

// Пример сущности пользователя
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
    type: 'varchar', // В БД хранится как строка
    transformer: {
      to: (value: number) => String(value),
      from: (value: string) => Number(value),
    },
  })
  telegramId!: number;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @CreateDateColumn()
  registerDate!: Date;

  @UpdateDateColumn()
  lastActivityDate!: Date;

  @Column({ default: false })
  hasPaid!: boolean;

  @Column({ default: false })
  isBanned?: boolean;

  @Column({ default: false })
  isAdmin?: boolean;
}
