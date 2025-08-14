// server.js — точка входа в наше приложение (сервер)

// импортируем пакет express
const express = require('express');

// создаем экземпляр express-приложения для работы с REST API
const app = express();

// промежуточный обработчик: принимает request от клиента,
// парсит (преобразует) JSON-тело запроса в объект JavaScript
// и добавляет его в req.body
app.use(express.json());

// промежуточный обработчик: парсит данные, отправленные в формате
// application/x-www-form-urlencoded (обычные HTML-формы),
// и добавляет их в req.body
app.use(express.urlencoded({ extended: true }));

// подключаем router из файла routes/questions.js
const questionsRouter = require('./routes/questions');

// регистрируем middleware, который добавляет префикс /questions
// для всех маршрутов, описанных в questionsRouter
app.use('/questions', questionsRouter);

// указываем порт для сервера из переменной окружения,
// если не задано — используем 3000
const PORT = process.env.PORT || 3000;

// запускаем сервер и начинаем слушать указанный порт
// в колбэке можно логировать или выполнять код, который нужно запустить при старте
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
