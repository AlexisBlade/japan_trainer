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

        // Функция для создания и отображения tooltip
        function showTooltip(target) {
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = `${target.getAttribute('data-meaning')} (${target.getAttribute('data-furigana')})`;
            target.appendChild(tooltip);
        }

        // Функция для удаления tooltip
        function hideTooltip(target) {
            const tooltip = target.querySelector('.tooltip');
            if (tooltip) {
                target.removeChild(tooltip);
            }
        }

        // Обработчики событий для подсветки перевода
        kanjiElement.addEventListener('mouseenter', (event) => {
            showTooltip(event.target);
        });

        kanjiElement.addEventListener('mouseleave', () => {
            hideTooltip(kanjiElement);
        });

        // Обработчик событий для кликов и касаний
        kanjiElement.addEventListener('mousedown', (event) => {
            const tooltip = kanjiElement.querySelector('.tooltip');
            if (tooltip) {
                hideTooltip(kanjiElement);
            } else {
                showTooltip(event.target);
            }
        });
    
        kanjiElement.addEventListener('touchstart', (event) => {
            event.preventDefault();
            const tooltip = kanjiElement.querySelector('.tooltip');
            if (tooltip) {
                hideTooltip(kanjiElement);
            } else {
                showTooltip(event.target);
            }
        }, { passive: false });
    

        kanjiGrid.appendChild(kanjiElement);
    });
}



// Изначально отображаем иероглифы уровня N5
displayKanjiByLevel('n5');

// Измените отображаемые иероглифы при выборе другого уровня
levelSelect.addEventListener('change', (event) => {
    displayKanjiByLevel(event.target.value);
});


document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('kanji-grid') || event.target.classList.contains('kanji-container')) {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach((tooltip) => {
            tooltip.remove();
        });
    }
});

document.addEventListener('touchstart', (event) => {
    if (event.target.classList.contains('kanji-grid') || event.target.classList.contains('kanji-container')) {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach((tooltip) => {
            tooltip.remove();
        });
    }
}, { passive: true });