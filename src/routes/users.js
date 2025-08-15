const express = require('express');
const router = express.Router();
const pool = require('../db'); // Подключение к PostgreSQL базе данных

// POST /users — создаем нового анонимного пользователя
router.post('/', async (req, res) => {
  try {
    // Вставляем нового пользователя в таблицу, ID сгенерируется автоматически библиоткеой PostgreSQL
    const result = await pool.query(
      // используя SQL синтаксис, выполняем операцию - вставь в таблицу users и после чего верни id и created_at поля
      'INSERT INTO users DEFAULT VALUES RETURNING id, created_at'
    );

    // берем первую запись, новые значения кладуться сверху в Postgres
    const newUser = result.rows[0];

    // возвращаем 201 статус код, и созданного ющера
    res.status(201).json({
      message: 'User created',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /users/:id — получение информации о пользователе
router.get('/:id', async (req, res) => {
  // создаем переменную id, и кладем туда значение что приходит из quety params в запросе
  const { id } = req.params;

  try {
    // обращаемся к базе данных с помощью query параметров
    const result = await pool.query(
      'SELECT id, created_at FROM users WHERE id = $1',
      [id]
    );

    // сли в результате, длинна строки 0, значит запись не найдена
    if (result.rows.length === 0) {
      // возвращаем 404 юзеру с сообщением User not found
      return res.status(404).json({ message: 'User not found' });
    }

    // возвращаем 200 и результат, в случае учпеха
    res.status(200).json(result.rows[0]);
  } catch (error) {
    // если отловим ошибку в данном случае всегда возвращаем 500, возможно не создана таблица или другие проблемы с базой данных
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
