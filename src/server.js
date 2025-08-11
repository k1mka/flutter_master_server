const express = require('express');
const app = express();

const questionsRouter = require('./routes/questions');

app.use('/questions', questionsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
