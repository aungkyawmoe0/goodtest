document.addEventListener('DOMContentLoaded', () => {
    const results = JSON.parse(localStorage.getItem('quizResults'));
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = `
        <p>Score: ${results.score}</p>
        <p>${results.pass ? 'Congratulations, you passed!' : 'Sorry, you failed.'}</p>
        <h2>Correct Answers</h2>
        <ul>
            ${results.correctAnswers.map((correctAnswer, index) => `
                <li>Question ${index + 1}: ${correctAnswer}</li>
            `).join('')}
        </ul>
    `;
    if (results.pass) {
        const buyButton = document.createElement('button');
        buyButton.innerText = 'Buy Certificate';
        buyButton.addEventListener('click', () => {
            alert('Redirect to payment gateway.');
        });
        resultsContainer.appendChild(buyButton);
    }
});
