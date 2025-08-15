// импортируем нашу базу данных,
const pool = require('../db');

// импортируем нашу модель вопроса, луяше использовать модели, а не обьекты,
// так-как модели лучше описывают обьект
const Question = require('../models/question');

// Добавление нового вопроса
async function addQuestion(userId, text) {
  // образаемся к методу query, который доступен из файла с нашей базы данных, для того,
  // чтобы записать данные в нашу базу
  const result = await pool.query(
    // используется SQL синтаксис, так-как PostgreSQL это реляционная база данных
    // вставь в таблицу questions user_id и text, $1 это user_id, $2 это text, после вставки верни поля id, user_id, text, is_correct
    'INSERT INTO questions (user_id, text) VALUES ($1, $2) RETURNING id, user_id, text, is_correct',
    // не забываем передать параметр
    [userId, text]
  );

  // так-как последние записанные данные наверху таблицы, мы берем самое новое значение по индексу 0
  const row = result.rows[0];

  // и передаем все значения в модель
  return new Question({
    id: row.id,
    userId: row.user_id,
    text: row.text,
    isCorrect: row.is_correct,
  });
}

// Получение всех вопросов пользователя
async function getQuestionsByUser(userId) {
  // снова обращаемся к методу query чтобы сделать запрос в базу и получить result
  const result = await pool.query(
    // возьми поля id, user_id, text, is_correct из таблицы questions, где user_id равен тому userId которого мы передали в запросе
    'SELECT id, user_id, text, is_correct FROM questions WHERE user_id = $1',
    [userId]
  );

  // получаем список ответов, намаиливаем его и возвращаем результат
  return result.rows.map((row) => ({
    id: row.id,
    userId: row.user_id,
    text: row.text,
    isCorrect: row.is_correct,
  }));
}

// Обновление статуса вопроса
async function updateQuestionStatus(questionId, isCorrect) {
  const result = await pool.query(
    'UPDATE questions SET is_correct = $1 WHERE id = $2 RETURNING id, user_id, text, is_correct',
    [isCorrect, questionId]
  );
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return new Question({
    id: row.id,
    userId: row.user_id,
    text: row.text,
    isCorrect: row.is_correct,
  });
}

// Удаление вопроса
async function deleteQuestion(questionId) {
  const result = await pool.query(
    'DELETE FROM questions WHERE id = $1 RETURNING id, user_id, text, is_correct',
    [questionId]
  );
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return new Question({
    id: row.id,
    userId: row.user_id,
    text: row.text,
    isCorrect: row.is_correct,
  });
}

async function getRandomQuestion(userId) {
  const result = await pool.query(
    'SELECT * FROM questions WHERE user_id = $1 ORDER BY RANDOM() LIMIT 1',
    [userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return new Question({
    id: row.id,
    userId: row.user_id,
    text: row.text,
    isCorrect: row.is_correct,
  });
}

module.exports = {
  addQuestion,
  getQuestionsByUser,
  updateQuestionStatus,
  deleteQuestion,
  getRandomQuestion,
};
