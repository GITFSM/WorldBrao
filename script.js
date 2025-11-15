document.addEventListener('DOMContentLoaded', () => {
    // 1. Управление Звуком
    const clickSound = document.getElementById('click-sound');
    const toggleSoundBtn = document.getElementById('toggle-sound-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const navLinks = document.querySelectorAll('.nav-link');

    // Переменная для отслеживания состояния звука (включен/выключен)
    let isSoundMuted = false;

    // Установка начальной громкости
    clickSound.volume = volumeSlider.value;

    // Функция воспроизведения звука
    function playClickSound() {
        if (!isSoundMuted) {
            // Воспроизведение звука с самого начала
            clickSound.currentTime = 0;
            clickSound.play().catch(error => {
                // Обработка ошибки, если браузер блокирует автовоспроизведение
                console.log("Ошибка воспроизведения звука:", error);
            });
        }
    }

    // Обработчик для ползунка громкости
    volumeSlider.addEventListener('input', (event) => {
        clickSound.volume = event.target.value;
    });

    // Обработчик для кнопки вкл/выкл звука
    toggleSoundBtn.addEventListener('click', () => {
        isSoundMuted = !isSoundMuted;

        if (isSoundMuted) {
            toggleSoundBtn.textContent = '🔊 Включить Звук';
        } else {
            toggleSoundBtn.textContent = '🔇 Выключить Звук';
            // Можно проиграть звук, чтобы показать, что он включился
            playClickSound(); 
        }
    });

    // 2. Плавный Скроллинг и Звук при Нажатии
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем стандартный переход

            playClickSound(); // Воспроизводим звук нажатия

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Плавный переход к секции
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60, // Сдвиг на высоту шапки
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Анимация при Скролле (появление секций)
    const contentSections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс, который запускает CSS-анимацию
                entry.target.classList.add('animated');
                // Прекращаем наблюдение, чтобы анимация не повторялась
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Секция появится, когда 10% её будет видно
    });

    contentSections.forEach(section => {
        observer.observe(section);
    });
});