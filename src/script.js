function displayKanji(level) {
    const levelElement = document.getElementById(level);
    const kanjiGrid = levelElement.querySelector('.kanji-grid');
    kanjiData[level].forEach(kanjiObj => {
        const kanjiElement = document.createElement('div');
        kanjiElement.classList.add('kanji');
        kanjiElement.textContent = kanjiObj.kanji;

        // Создайте элемент подсказки с переводом и добавьте его к иероглифу
        const tooltipElement = document.createElement('div');
        tooltipElement.classList.add('tooltip');
        tooltipElement.textContent = `${kanjiObj.meaning}`;
        kanjiElement.appendChild(tooltipElement);

        // Обновите положение подсказки при наведении
        kanjiElement.addEventListener('mousemove', (event) => {
            tooltipElement.style.display = 'block';
            tooltipElement.style.left = (event.offsetX + 10) + 'px';
            tooltipElement.style.top = (event.offsetY + 10) + 'px';
        });

        // Скрыть подсказку, когда курсор уходит с иероглифа
        kanjiElement.addEventListener('mouseleave', () => {
            tooltipElement.style.display = 'none';
        });

        kanjiGrid.appendChild(kanjiElement);
    });
}

// Загрузка иероглифов для каждого уровня
displayKanji('n5');
// Вызовите displayKanji для уровней N4, N3, N2 и N1 аналогичным образом
