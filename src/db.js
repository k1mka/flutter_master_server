const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // любой существующий пользователь PostgreSQL
  host: 'localhost',
  database: 'questions_db', // твоя база данных
  port: 5432, // стандартный порт PostgreSQL
  // password можно не указывать, так как у пользователя пока только id
});

module.exports = pool;
