const Question = require('../models/question');

const questionsList = [
  new Question(1, 'Расскажи о себе', false),
  new Question(2, 'В чём твои сильные стороны?', false),
  new Question(3, 'Какие технологии ты знаешь?', true),
];

module.exports = questionsList;
