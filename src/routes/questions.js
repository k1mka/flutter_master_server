const express = require('express');
const router = express.Router();
const questions = require('../data/questions');

router.get('/', (req, res) => {
  res.statusCode == 200;
  res.json(questions);
});

router.patch('/:id', (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const { isSelected } = req.body;

  const question = questions.find((q) => q.id === questionId);
  if (!question) {
    return res.status(404).json({ message: 'Question not found' });
  }

  question.isSelected = Boolean(isSelected);

  res.status(200).json({ message: 'Field isSelected updates', question });
});

module.exports = router;
