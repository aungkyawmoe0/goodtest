document.getElementById('addQuestionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const questionData = {
        question: formData.get('question'),
        options: formData.getAll('options[]'),
        correctAnswer: formData.get('correctAnswer')
    };
    fetch('/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionData)
    }).then(response => response.json()).then(() => {
        alert('Question added successfully!');
        e.target.reset();
    });
});
