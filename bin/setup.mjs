#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log(chalk.blue('🚀 Запуск установки Telegram бота на grammY...'));
  console.log(chalk.gray('ℹ Этот шаблон создаст бота на TypeScript с готовой структурой проекта\n'));

  // Получаем имя проекта
  const projectName = process.argv[2];
  if (!projectName) {
    console.error(chalk.red('❌ Ошибка: не указано имя проекта'));
    console.log(chalk.green('\nПравильный формат команды:'));
    console.log(`  npx grammy-bot-template ${chalk.yellow('<имя-проекта>')}`);
    console.log(chalk.gray('\nПример:'));
    console.log(`  npx grammy-bot-template ${chalk.yellow('мой-телеграм-бот')}`);
    process.exit(1);
  }

  // Проверяем допустимость имени проекта
  if (!/^[a-z0-9-]+$/.test(projectName)) {
    console.error(chalk.red('❌ Ошибка: имя проекта может содержать только:'));
    console.error(chalk.red('   - латинские буквы (a-z)'));
    console.error(chalk.red('   - цифры (0-9)'));
    console.error(chalk.red('   - дефисы (-)'));
    process.exit(1);
  }

  const projectPath = path.join(process.cwd(), projectName);
  
  try {
    await fs.mkdir(projectPath);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'EEXIST') {
      console.error(chalk.red(`❌ Ошибка: папка "${projectName}" уже существует!`));
      console.log(chalk.gray('\nПопробуйте другое имя проекта:'));
      console.log(`  npx grammy-bot-template ${chalk.yellow('<другое-имя>')}`);
      process.exit(1);
    }
    throw err;
  }

  // Копирование файлов шаблона
  console.log(chalk.blue('\n📂 Копируем файлы шаблона...'));
  await fs.cp(
    path.join(__dirname, '../template'),
    projectPath,
    { recursive: true }
  );

  // Обновляем package.json
  const userPackageJsonPath = path.join(projectPath, 'package.json');
  const userPackageJson = JSON.parse(await fs.readFile(userPackageJsonPath, 'utf-8'));
  userPackageJson.name = projectName.toLowerCase().replace(/\s+/g, '-');
  await fs.writeFile(
    userPackageJsonPath,
    JSON.stringify(userPackageJson, null, 2)
  );

  // Установка зависимостей
  console.log(chalk.blue('\n📦 Устанавливаем зависимости... (это может занять пару минут)'));
  try {
    execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
  } catch (error) {
    console.error(chalk.red('\n❌ Ошибка при установке зависимостей:'));
    console.error(error);
    process.exit(1);
  }

  // Финальное сообщение
  console.log(chalk.greenBright(`\n✅ Готово! Бот "${projectName}" успешно создан!`));
  console.log(chalk.green(`   Папка проекта: ${chalk.underline(projectPath)}`));

  console.log(chalk.yellowBright('\nДальнейшие действия:'));
  console.log(chalk.cyan(`\n1. Перейдите в папку проекта:`));
  console.log(`   cd ${chalk.yellow(projectName)}`);
  
  console.log(chalk.cyan(`\n2. Настройте токен бота в файле:`));
  console.log(`   ${chalk.yellow('.env')}`);
  
  console.log(chalk.cyan(`\n3. Доступные команды:`));
  console.log(`   ${chalk.yellow('npm start')}      - запуск бота в режиме разработки`);
  console.log(`   ${chalk.yellow('npm run build')}  - сборка проекта`);
  console.log(`   ${chalk.yellow('npm run dev')}    - запуск с hot-reload (если установлен nodemon)`);

  console.log(chalk.gray('\nℹ Документация grammY: https://grammy.dev/ru'));
}

main().catch(err => {
  console.error(chalk.red('❌ Критическая ошибка при создании проекта:'));
  console.error(err);
  process.exit(1);
});
