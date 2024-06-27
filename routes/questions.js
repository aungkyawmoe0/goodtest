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

// Save questions to file
const saveQuestions = (questions) => {
    fs.writeFileSync(questionsFile, JSON.stringify(questions, null, 2));
};

// Get all questions
router.get('/', (req, res) => {
    const questions = loadQuestions();
    res.json(questions);
});

// Add a new question
router.post('/', (req, res) => {
    const questions = loadQuestions();
    const newQuestion = req.body;
    questions.push(newQuestion);
    saveQuestions(questions);
    res.status(201).json(newQuestion);
});

module.exports = router;
