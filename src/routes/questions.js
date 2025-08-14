// Для удобства наши роуты вынесены в отдельную папку (routes).
// Сейчас в ней только questions. В точке входа в приложение мы указываем
// для всех запросов из этого файла префикс /questions,
// а также передаем сюда уже заранее распарсенные данные через middleware.

// Импортируем пакет express, чтобы создавать и обрабатывать маршруты.
const express = require('express');

// Вызываем метод Router у express и сохраняем его в переменную
// для более компактного объявления маршрутов.
const router = express.Router();

// Импортируем список вопросов из файла data/questions.js
const questions = require('../data/questions');

// Так как в server.js мы указали префикс /questions для этого роутера,
// то здесь обработчик router.get('/') будет вызываться по GET /questions
router.get('/', (req, res) => {
  // Устанавливаем статус 200 (успешно)
  res.status(200).json(questions);
});

// Маршрут GET /questions/random — возвращает случайный вопрос
router.get('/random', (req, res) => {
  if (questions.length === 0) {
    return res.status(404).json({ message: 'Question not found' });
  }

  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex];

  res.status(200).json(randomQuestion);
});

// PATCH /questions/:id — обновление поля isCorrect у вопроса
router.patch('/:id', (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const { isCorrect } = req.body;

  if (typeof isCorrect !== 'boolean') {
    return res.status(400).json({ message: 'isCorrect must be boolean' });
  }

  const question = questions.find((q) => q.id === questionId);
  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }

  question.isCorrect = isCorrect;

  res.status(200).json({ message: 'Field isCorrect updated', question });
});

// DELETE /questions/:id — удаление вопроса по ID
router.delete('/:id', (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const index = questions.findIndex((q) => q.id === questionId);

  if (index === -1) {
    return res.status(404).json({ message: 'Question not found' });
  }

  const deletedQuestion = questions.splice(index, 1)[0];

  res.status(200).json({ message: 'Question deleted', deletedQuestion });
});

// Экспортируем router, чтобы можно было подключить его в server.js
module.exports = router;
