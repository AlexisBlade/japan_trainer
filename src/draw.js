// Draw Module for Japan 

const levelSelect = document.getElementById('level-select');
const drawingCanvas = document.getElementById('drawing-canvas');
const drawingContext = drawingCanvas.getContext('2d');
const translation = document.getElementById('translation');
const resultArea = document.getElementById('result-area');
const correctKanji = document.getElementById('correct-kanji');
let currentKanji = {};

function getRandomKanji(level) {
    const randomKanji = kanjiData[level][Math.floor(Math.random() * kanjiData[level].length)];
    return randomKanji;
}

function displayTranslation() {
    const level = levelSelect.value;
    currentKanji = getRandomKanji(level);
    translation.textContent = currentKanji.meaning;
}

function showResult() {
    const buttonText = document.getElementById("check-result").innerHTML;

    if (buttonText === "Узнать результат") {
        resultArea.style.display = 'block';
        correctKanji.textContent = currentKanji.kanji;
        document.getElementById("check-result").innerHTML = "Продолжить";
    } else {
        drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        resultArea.style.display = 'none';
        document.getElementById("check-result").innerHTML = "Узнать результат";
        displayTranslation();
    }
}

levelSelect.addEventListener('change', displayTranslation);
displayTranslation();

let drawing = false;

function startPosition(event) {
    drawing = true;
    drawingContext.beginPath();
    const {
        clientX,
        clientY
    } = event.touches ? event.touches[0] : event;
    drawingContext.moveTo(clientX - drawingCanvas.offsetLeft, clientY - drawingCanvas.offsetTop);
}

function draw(event) {
    if (drawing) {
        const {
            clientX,
            clientY
        } = event.touches ? event.touches[0] : event;
        drawingContext.lineTo(clientX - drawingCanvas.offsetLeft, clientY - drawingCanvas.offsetTop);
        drawingContext.stroke();
    }
}

function endPosition() {
    drawing = false;
}

drawingCanvas.addEventListener('mousedown', startPosition);
drawingCanvas.addEventListener('mousemove', draw);
drawingCanvas.addEventListener('mouseup', endPosition);
drawingCanvas.addEventListener('mouseleave', endPosition);

// Сенсорные события
drawingCanvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    startPosition(event);
}, {
    passive: false
});
drawingCanvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    draw(event);
}, {
    passive: false
});
drawingCanvas.addEventListener('touchend', endPosition);