const pool = require('../db');
const Question = require('../models/question');

// Добавление нового вопроса
async function addQuestion(userId, text) {
  const result = await pool.query(
    'INSERT INTO questions (user_id, text) VALUES ($1, $2) RETURNING id, user_id, text, is_correct',
    [userId, text]
  );
  const row = result.rows[0];

  return new Question({
    id: row.id,
    userId: row.user_id,
    text: row.text,
    isCorrect: row.is_correct,
  });
}

// Получение всех вопросов пользователя
async function getQuestionsByUser(userId) {
  const result = await pool.query(
    'SELECT id, user_id, text, is_correct FROM questions WHERE user_id = $1',
    [userId]
  );
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

module.exports = {
  addQuestion,
  getQuestionsByUser,
  updateQuestionStatus,
  deleteQuestion,
};
