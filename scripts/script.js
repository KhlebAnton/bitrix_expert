document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.querySelector('.btn_menu');
    const menu = document.querySelector('.menu_overlay');
    const menuLinks = document.querySelectorAll('a');

    function disableScroll() {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
    function showMenu() {
        btnMenu.classList.add('is-open');
        menu.classList.add('is-open');
        disableScroll();
    }
    function hideMenu() {
        btnMenu.classList.remove('is-open');
        menu.classList.remove('is-open');
        enableScroll();
    }
    btnMenu.addEventListener('click', () => {
        if (!btnMenu.classList.contains('is-open')) {
            showMenu();
        } else {
            hideMenu();
        }
    });
    menuLinks.forEach(link => {
        link.addEventListener('click', hideMenu)
    });
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('is-open') &&
            !menu.contains(e.target) &&
            !btnMenu.contains(e.target)) {
            hideMenu();
        }
    });

    const header = document.querySelector('.header');
    let lastScroll = 0;
    const scrollThreshold = 10;

    function hideHeader() {
        header.classList.add('is-hidden');
    }


    function showHeader() {
        header.classList.remove('is-hidden');
    }

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            showHeader();
            lastScroll = currentScroll;
            return;
        }

        if (Math.abs(currentScroll - lastScroll) < scrollThreshold) {
            return;
        }

        if (currentScroll > lastScroll) {
            hideHeader();
        } else {
            showHeader();
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll);

    const swiperCase = new Swiper('.swiper_cases', {
        loop: false,
        pagination: {
            el: '.custom-pagination',
            clickable: true
        },
        slidesPerView: 'auto',
        spaceBetween: 16,

        breakpoints: {

            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }

        }
    });
    const swiperTechno = new Swiper('.swiper_techno', {
        loop: false,
        pagination: {
            el: '.custom-pagination',
            clickable: true
        },
        slidesPerView: 'auto',
        spaceBetween: 10,
        breakpoints: {

            1200: {
                spaceBetween: 27
            }

        }
    });


    // Получаем элементы
    const fileInput = document.getElementById('fileInput');
    const buttonMode = document.getElementById('buttonMode');
    const fileInfoMode = document.getElementById('fileInfoMode');
    const fileName = document.getElementById('fileNameDisplay');
    const removeBtn = document.getElementById('removeFileBtn');

    // Функция обновления интерфейса
    function updateUI() {
        const hasFile = fileInput.files.length > 0;

        if (hasFile) {
            // Показываем название файла + крестик
            buttonMode.style.display = 'none';
            fileInfoMode.style.display = 'flex';
            fileName.textContent = fileInput.files[0].name;
        } else {
            // Показываем кнопку
            buttonMode.style.display = 'flex';
            fileInfoMode.style.display = 'none';
            fileName.textContent = '';
        }
    }

    // Выбор файла
    fileInput.addEventListener('change', updateUI);

    // Удаление файла
    removeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        fileInput.value = '';
        updateUI();
    });
    


const modalBtns = document.querySelectorAll('[data-btn-modal]');
const modals = document.querySelectorAll('.modal_overlay');

// Открытие
modalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const modalId = btn.dataset.btnModal;
        const modal = document.querySelector(
            `[data-id-modal="${modalId}"]`
        );

        if (modal) {
            modal.classList.add('is-open');
            disableScroll();
        }
    });
});

// Закрытие по кнопкам внутри модалки
document.querySelectorAll('.modal_close, .btn_close_modal').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal_overlay');

        if (modal) {
            modal.classList.remove('is-open');

            // Если открытых модалок и меню нет — возвращаем скролл
            if (
                !document.querySelector('.modal_overlay.is-open') &&
                !menu.classList.contains('is-open')
            ) {
                enableScroll();
            }
        }
    });
});

// Закрытие по клику на фон
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('is-open');

            if (
                !document.querySelector('.modal_overlay.is-open') &&
                !menu.classList.contains('is-open')
            ) {
                enableScroll();
            }
        }
    });
});

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal_overlay.is-open').forEach(modal => {
            modal.classList.remove('is-open');
        });

        if (!menu.classList.contains('is-open')) {
            enableScroll();
        }
    }
});

// ====================
// ОТПРАВКА ФОРМЫ
// ====================

const forms = document.querySelectorAll('.form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        console.log('===== ДАННЫЕ ФОРМЫ =====');

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                if (value.size > 0) {
                    console.log(`Файл (${key}):`, {
                        name: value.name,
                        size: value.size,
                        type: value.type
                    });
                }
            } else {
                console.log(`${key}:`, value);
            }
        }

        // Закрываем текущую модалку
        const currentModal = form.closest('.modal_overlay');

        if (currentModal) {
            currentModal.classList.remove('is-open');
        }

        // Открываем спасибо-модалку
        const successModal = document.querySelector(
            '[data-id-modal="access"]'
        );

        if (successModal) {
            successModal.classList.add('is-open');
        }

        // Очистка формы
        form.reset();

        // Сброс отображения файла
        if (typeof updateUI === 'function') {
            updateUI();
        }
    });
});

    
});