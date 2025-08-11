const Question = require('../models/question');

const questionsList = [
  new Question(1, 'Расскажи о себе'),
  new Question(2, 'В чём твои сильные стороны?'),
  new Question(3, 'Какие технологии ты знаешь?'),
];

module.exports = questionsList;
