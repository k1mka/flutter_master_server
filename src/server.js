const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const questionsRouter = require('./routes/questions');

app.use('/questions', questionsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
