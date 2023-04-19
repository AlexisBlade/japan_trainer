const levelSelect = document.getElementById('level-select');
const kanjiGrid = document.querySelector('.kanji-grid');
const levelTitle = document.querySelector('.level-title'); // Найдите элемент заголовка

function displayKanjiByLevel(level) {
    // Очистите контейнер с иероглифами перед добавлением новых
    kanjiGrid.innerHTML = '';

    // Обновите текст заголовка
    levelTitle.textContent = `Уровень ${level.toUpperCase()}`;

    // Добавьте иероглифы выбранного уровня
    kanjiData[level].forEach(kanji => {
        const kanjiElement = document.createElement('div');
        kanjiElement.textContent = kanji.kanji;
        kanjiElement.classList.add('kanji');
        kanjiGrid.appendChild(kanjiElement);
    });
}

// Изначально отображаем иероглифы уровня N5
displayKanjiByLevel('n5');

// Измените отображаемые иероглифы при выборе другого уровня
levelSelect.addEventListener('change', (event) => {
    displayKanjiByLevel(event.target.value);
});
