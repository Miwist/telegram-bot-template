import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // В продакшене false!
  logging: true,
  entities: [User],
  migrations: [
  ],
  subscribers: [],
});

// Для SQLite:
// export const AppDataSource = new DataSource({
//   type: "sqlite",
//   database: "database.sqlite",
//   entities: [User],
//   synchronize: true,
// });
