class Question {
  constructor({ id, userId, text, isCorrect }) {
    this.id = id;
    this.userId = userId;
    this.text = text;
    this.isCorrect = isCorrect;
  }
}

module.exports = Question;
