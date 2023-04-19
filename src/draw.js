const drawingCanvas = document.getElementById('drawing-canvas');
const drawingContext = drawingCanvas.getContext('2d');
const translation = document.getElementById('translation');
const resultArea = document.getElementById('result-area');
const correctKanji = document.getElementById('correct-kanji');
let currentKanji = {};

function getRandomKanji() {
    const levels = Object.keys(kanjiData);
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    const randomKanji = kanjiData[randomLevel][Math.floor(Math.random() * kanjiData[randomLevel].length)];
    return randomKanji;
}

function displayTranslation() {
    currentKanji = getRandomKanji();
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

displayTranslation();


let drawing = false;

function startPosition(event) {
    drawing = true;
    drawingContext.beginPath();
    const {clientX, clientY} = event.touches ? event.touches[0] : event;
    drawingContext.moveTo(clientX - drawingCanvas.offsetLeft, clientY - drawingCanvas.offsetTop);
}

function draw(event) {
    if (drawing) {
        const {clientX, clientY} = event.touches ? event.touches[0] : event;
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
}, {passive: false});
drawingCanvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    draw(event);
}, {passive: false});
drawingCanvas.addEventListener('touchend', endPosition);
