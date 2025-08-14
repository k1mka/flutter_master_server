const express = require('express');
const router = express.Router();
const pool = require('../db'); // Подключение к PostgreSQL

// POST /users — создаем нового анонимного пользователя
router.post('/', async (req, res) => {
  try {
    // Вставляем нового пользователя в таблицу, ID сгенерируется автоматически
    const result = await pool.query(
      'INSERT INTO users DEFAULT VALUES RETURNING id, created_at'
    );

    const newUser = result.rows[0];

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
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, created_at FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
