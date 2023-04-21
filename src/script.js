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
        
        // Добавьте атрибуты с информацией об иероглифе
        kanjiElement.setAttribute('data-meaning', kanji.meaning);
        kanjiElement.setAttribute('data-furigana', kanji.furigana);

        // Добавьте обработчики событий для подсветки перевода
        kanjiElement.addEventListener('mouseenter', (event) => {
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = event.target.getAttribute('data-meaning');
            event.target.appendChild(tooltip);
        });

        kanjiElement.addEventListener('mouseleave', () => {
            const tooltip = kanjiElement.querySelector('.tooltip');
            if (tooltip) {
                kanjiElement.removeChild(tooltip);
            }
        });

        kanjiGrid.appendChild(kanjiElement);
    });
}

// Изначально отображаем иероглифы уровня N5
displayKanjiByLevel('n5');

// Измените отображаемые иероглифы при выборе другого уровня
levelSelect.addEventListener('change', (event) => {
    displayKanjiByLevel(event.target.value);
});
