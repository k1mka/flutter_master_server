const { Pool } = require('pg'); // импортируем библиотеку pg, для работа с PostgreSQL

const pool = new Pool({
  user: 'postgres', // любой существующий пользователь PostgreSQL
  host: 'localhost', // указываем что база подымается локально
  database: 'questions_db', // название нащей базы данных
  port: 5432, // стандартный порт PostgreSQL
  // password можно не указывать, так как у пользователя пока только id
});

module.exports = pool; // экспортируем чтобы модуль и свойства pool были доступны в других файлах
