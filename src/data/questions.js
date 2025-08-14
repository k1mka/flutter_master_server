// получаем модельку из папки data
const Question = require('../models/question');

// обьявляем список наших вопросов
const questionsList = [
  new Question(1, 'What is Flutter and why would you use it?', false),
  new Question(2, 'Explain the widget tree in Flutter.', false),
  new Question(
    3,
    'What is the difference between StatefulWidget and StatelessWidget?',
    false
  ),
  new Question(4, 'How does Flutter handle layout and rendering?', false),
  new Question(
    5,
    'What are keys in Flutter and when should you use them?',
    false
  ),
  new Question(6, 'Explain the concept of hot reload in Flutter.', false),
  new Question(7, 'What is a Future in Dart?', false),
  new Question(8, 'How do you manage state in Flutter?', false),
  new Question(
    9,
    'What are the advantages of using Provider for state management?',
    false
  ),
  new Question(
    10,
    'Explain how navigation and routing work in Flutter.',
    false
  ),
  new Question(
    11,
    'What is the difference between async and sync functions in Dart?',
    false
  ),
  new Question(
    12,
    'How do you handle asynchronous programming in Flutter?',
    false
  ),
  new Question(13, 'What is the build() method and when is it called?', false),
  new Question(14, 'Explain the lifecycle of a StatefulWidget.', false),
  new Question(15, 'How can you optimize Flutter app performance?', false),
  new Question(16, 'What are some common layout widgets in Flutter?', false),
  new Question(17, 'How do you implement animations in Flutter?', false),
  new Question(
    18,
    'What is the difference between mainAxisAlignment and crossAxisAlignment?',
    false
  ),
  new Question(19, 'Explain how to make HTTP requests in Flutter.', false),
  new Question(20, 'What is the purpose of the pubspec.yaml file?', false),
];

// экспортируем массив вопросов
module.exports = questionsList;
