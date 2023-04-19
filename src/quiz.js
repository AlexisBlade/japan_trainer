const levelSelect = document.getElementById('level-select');
const kanjiDisplay = document.querySelector('.kanji-display');
const kanjiInput = document.querySelector('.kanji-input');
const submitBtn = document.querySelector('.submit-btn');
const feedback = document.querySelector('.feedback');
const scoreDisplay = document.querySelector('.score');

let score = 0;

function getRandomKanji(level) {
    const randomKanji = kanjiData[level][Math.floor(Math.random() * kanjiData[level].length)];
    return randomKanji;
}

function displayKanji() {
    const level = levelSelect.value;
    const kanji = getRandomKanji(level);
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

levelSelect.addEventListener('change', () => {
    score = 0;
    scoreDisplay.textContent = score;
    displayKanji();
});

displayKanji();
