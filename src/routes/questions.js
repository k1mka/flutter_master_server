const express = require('express');
const router = express.Router();
const questions = require('../data/questions');

router.get('/', (req, res) => {
  res.statusCode == 200;
  res.json(questions);
});

router.get('/random', (req, res) => {
  if (questions.length === 0) {
    return res.status(404).json({ message: 'Question not found' });
  }
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex];
  res.status(200).json(randomQuestion);
});

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

router.delete('/:id', (req, res) => {
  const questionId = parseInt(req.params.id, 10);

  const index = questions.findIndex((q) => q.id === questionId);

  if (index === -1) {
    return res.status(404).json({ message: 'Question not found' });
  }

  const deletedQuestion = questions.splice(index, 1)[0];

  res.status(200).json({ message: 'Question deleted', deletedQuestion });
});

module.exports = router;
