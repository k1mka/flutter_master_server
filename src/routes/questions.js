const express = require('express');
const router = express.Router();

const {
  addQuestion,
  getQuestionsByUser,
  updateQuestionStatus,
  deleteQuestion,
} = require('../data/questionService');

// GET /questions/:userId — получить все вопросы конкретного пользователя
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const questions = await getQuestionsByUser(userId);
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /questions — создать новый вопрос для пользователя
router.post('/', async (req, res) => {
  const { userId, text } = req.body;
  if (!userId || !text) {
    return res.status(400).json({ message: 'userId and text are required' });
  }

  try {
    const newQuestion = await addQuestion(userId, text);
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /questions/:id — обновление поля isCorrect
router.patch('/:id', async (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const { isCorrect } = req.body;

  if (typeof isCorrect !== 'boolean') {
    return res.status(400).json({ message: 'isCorrect must be boolean' });
  }

  try {
    const updatedQuestion = await updateQuestionStatus(questionId, isCorrect);
    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res
      .status(200)
      .json({ message: 'Field isCorrect updated', question: updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /questions/:id — удаление вопроса
router.delete('/:id', async (req, res) => {
  const questionId = parseInt(req.params.id, 10);

  try {
    const deletedQuestion = await deleteQuestion(questionId);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted', deletedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
