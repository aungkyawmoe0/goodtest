let currentQuestionIndex = 0;
let questions = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('/questions')
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion(currentQuestionIndex);
        });

    document.getElementById('prevButton').addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
    });

    document.getElementById('submitQuiz').addEventListener('click', () => {
        const answers = {};
        questions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption) {
                answers[index] = selectedOption.value;
            }
        });
        fetch('/quiz/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answers })
        }).then(response => response.json()).then(result => {
            localStorage.setItem('quizResults', JSON.stringify(result));
            window.location.href = '/results';
        });
    });
});

function showQuestion(index) {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = `
        <h2>Question ${index + 1} of ${questions.length}</h2>
        <p>${questions[index].question}</p>
        ${questions[index].options.map((option, i) => `
            <label><input type="radio" name="question${index}" value="${option}" required> ${option}</label><br>
        `).join('')}
    `;

    document.getElementById('prevButton').disabled = index === 0;
    document.getElementById('nextButton').style.display = index === questions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submitQuiz').style.display = index === questions.length - 1 ? 'inline-block' : 'none';
}
