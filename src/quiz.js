const kanjiDisplay = document.querySelector('.kanji-display');
const kanjiInput = document.querySelector('.kanji-input');
const submitBtn = document.querySelector('.submit-btn');
const feedback = document.querySelector('.feedback');
const scoreDisplay = document.querySelector('.score');

let score = 0;

function getRandomKanji() {
    const levels = Object.keys(kanjiData);
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    const randomKanji = kanjiData[randomLevel][Math.floor(Math.random() * kanjiData[randomLevel].length)];
    return randomKanji;
}

function displayKanji() {
    const kanji = getRandomKanji();
    kanjiDisplay.textContent = kanji.kanji;
    kanjiDisplay.dataset.meaning = kanji.meaning;
}

function checkAnswer() {
    const userAnswer = kanjiInput.value.trim().toLowerCase();
    const correctAnswers = kanjiDisplay.dataset.meaning.toLowerCase().split(', ');
    
    if (correctAnswers.includes(userAnswer)) {
        feedback.textContent = 'Правильно!';
        score++;
        scoreDisplay.textContent = score;
    } else {
        feedback.textContent = `Неправильно. Правильный ответ: ${correctAnswers.join(', ')}`;
    }

    kanjiInput.value = '';
    displayKanji();
}

submitBtn.addEventListener('click', checkAnswer);
kanjiInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

displayKanji();
