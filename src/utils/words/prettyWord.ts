import { wordsCancored } from './wordsCancored';

// Одинаковый стиль написания с заглавной буквы
export const capitalize = (word: string) => {
  if (!word) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

// Запрещенные слова
export const isCensorText = (text: string) => {
  const lowerCaseText = text.toLowerCase(); // Приводим текст к нижнему регистру для нечувствительности к регистру

  for (const item of wordsCancored) {
    const lowerCaseBadWord = item.word.toLowerCase(); // Приводим запрещенное слово к нижнему регистру
    if (lowerCaseText.includes(lowerCaseBadWord)) {
      return true; // Если запрещенное слово найдено (фрагментарно), возвращаем true
    }
  }

  return false; // Если ни одно запрещенное слово не найдено, возвращаем false
}


