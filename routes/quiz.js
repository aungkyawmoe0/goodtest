const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const questionsFile = path.join(__dirname, '../data/questions.json');

// Load questions from file
const loadQuestions = () => {
    if (fs.existsSync(questionsFile)) {
        const data = fs.readFileSync(questionsFile);
        return JSON.parse(data);
    }
    return [];
};

// Calculate score
router.post('/submit', (req, res) => {
    const userAnswers = req.body.answers;
    const questions = loadQuestions();
    let score = 0;
    const correctAnswers = [];

    questions.forEach((question, index) => {
        if (userAnswers[index] && userAnswers[index] === question.correctAnswer) {
            score++;
        }
        correctAnswers.push(question.correctAnswer);
    });

    const passingScore = Math.ceil(questions.length * 0.6);
    const result = {
        score,
        pass: score >= passingScore,
        correctAnswers
    };

    res.json(result);
});

module.exports = router;
