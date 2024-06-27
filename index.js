const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const questionsRoute = require('./routes/questions');
const quizRoute = require('./routes/quiz');

app.use('/questions', questionsRoute);
app.use('/quiz', quizRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/add-question', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addQuestion.html'));
});

app.get('/take-quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'takeQuiz.html'));
});

app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'results.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
