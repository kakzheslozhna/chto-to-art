// js/script.js
document.addEventListener('DOMContentLoaded', function() {

    // Инициализация AOS
    AOS.init({ duration: 700, easing: 'ease-out-quad', once: true, offset: 50 });
    document.body.classList.add('aos-animate');

    // Плавный скролл к якорям
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(id);
            if (targetElement) {
                const navMenu = document.querySelector('.header__nav');
                const burgerButton = document.querySelector('.burger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (burgerButton) burgerButton.classList.remove('active');
                    document.body.style.overflow = '';
                }
                let offset = 0;
                const headerElement = document.querySelector('.header');
                if (headerElement && getComputedStyle(headerElement).position === 'fixed') {
                    const headerStyles = getComputedStyle(headerElement);
                    if (headerStyles.transform === 'none' || !headerElement.classList.contains('hidden')) { 
                        offset = headerElement.offsetHeight;
                    } else if (headerElement.classList.contains('scrolled')) { 
                         offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height-sticky')) || 65;
                    } else { 
                         offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 75;
                    }
                }
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // "Липкая" шапка со скрытием при скролле
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    const scrollThreshold = 150; 
    if (header) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > scrollThreshold && scrollTop > lastScrollTop) { header.classList.add('hidden'); } 
            else if (scrollTop < lastScrollTop || scrollTop <= scrollThreshold) { header.classList.remove('hidden'); }
            if (scrollTop > 50) { header.classList.add('scrolled'); } 
            else { header.classList.remove('scrolled'); }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
        }, { passive: true }); 
    }

    // Мобильное меню (бургер)
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.header__nav'); // nav используется в closeModal
    if (burger && nav) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Hero Slider (Swiper.js)
    const heroSlider = new Swiper('.hero-slider', { loop: true, effect: 'fade', fadeEffect: { crossFade: true }, autoplay: { delay: 6000, disableOnInteraction: false, }, pagination: { el: '.hero-slider__pagination', clickable: true, dynamicBullets: false, }, navigation: { nextEl: '.hero-slider__nav--next', prevEl: '.hero-slider__nav--prev', }, on: { init: function () { const activeSlide = this.slides[this.activeIndex]; AOS.refreshHard(activeSlide.querySelectorAll('[data-aos]')); initHeroSlideTabs(activeSlide); }, slideChangeTransitionStart: function () { this.slides.forEach(slide => { slide.querySelectorAll('[data-aos]').forEach(el => { el.classList.remove('aos-animate', 'aos-init'); }); }); }, slideChangeTransitionEnd: function () { const activeSlide = this.slides[this.activeIndex]; activeSlide.querySelectorAll('[data-aos]').forEach(el => { el.classList.add('aos-init'); setTimeout(() => el.classList.add('aos-animate'), 50); }); initHeroSlideTabs(activeSlide); } } });
    function initHeroSlideTabs(slideElement) { const tabButtons = slideElement.querySelectorAll('.hero-slide__tab-btn'); const tabContents = slideElement.querySelectorAll('.hero-slide__content[data-tab-id]'); if (tabButtons.length > 0 && tabContents.length > 0) { if (!slideElement.querySelector('.hero-slide__tab-btn.active')) { tabButtons[0].classList.add('active'); } const activeTabButton = slideElement.querySelector('.hero-slide__tab-btn.active'); const defaultTabId = activeTabButton ? activeTabButton.dataset.tabContent : tabButtons[0].dataset.tabContent; tabContents.forEach(content => content.classList.remove('active')); const activeContent = slideElement.querySelector(`.hero-slide__content[data-tab-id="${defaultTabId}"]`); if (activeContent) activeContent.classList.add('active'); tabButtons.forEach(button => { const newButton = button.cloneNode(true); button.parentNode.replaceChild(newButton, button); newButton.addEventListener('click', function() { const tabId = this.dataset.tabContent; slideElement.querySelectorAll('.hero-slide__tab-btn').forEach(btn => btn.classList.remove('active')); this.classList.add('active'); tabContents.forEach(content => { content.classList.remove('active'); if (content.dataset.tabId === tabId) { content.classList.add('active'); content.querySelectorAll('[data-aos]').forEach(el => { el.classList.remove('aos-animate'); el.classList.add('aos-init'); setTimeout(() => el.classList.add('aos-animate'), 50); }); } }); }); }); } }

    // Cases Slider (Swiper.js) 
    const casesSlider = new Swiper('.cases-slider', { loop: true, slidesPerView: 'auto', spaceBetween: 25, centeredSlides: true, pagination: { el: '.cases-slider__pagination', clickable: true, }, navigation: { nextEl: '.cases-slider__nav--next', prevEl: '.cases-slider__nav--prev', }, breakpoints: { 320: { spaceBetween: 15, }, 768: { spaceBetween: 25, }, 1024: { spaceBetween: 30, } } });
    // Awards Slider 
    const awardsSlider = new Swiper('.awards-slider', { loop: true, slidesPerView: 2, spaceBetween: 20, autoplay: { delay: 3500, disableOnInteraction: false, }, pagination: { el: '.awards-slider__pagination', clickable: true, }, breakpoints: { 576: { slidesPerView: 3, spaceBetween: 20 }, 768: { slidesPerView: 4, spaceBetween: 30 }, 992: { slidesPerView: 5, spaceBetween: 30 } } });
    // Clients Slider 
    const clientsSlider = new Swiper('.clients-slider', { loop: true, slidesPerView: 3, spaceBetween: 30, autoplay: { delay: 3000, disableOnInteraction: false, }, breakpoints: { 576: { slidesPerView: 4, spaceBetween: 30 }, 768: { slidesPerView: 5, spaceBetween: 40 }, 992: { slidesPerView: 6, spaceBetween: 40 }, } });
    
    // Табы (для секций "Проекты" и "Письма партнеров")
    const tabContainers = document.querySelectorAll('.tabs'); tabContainers.forEach(container => { const tabButtons = container.querySelectorAll('.tabs__button'); const tabPanes = container.querySelectorAll('.tabs__pane'); tabButtons.forEach(button => { button.addEventListener('click', function() { const tabId = this.dataset.tab; tabButtons.forEach(btn => btn.classList.remove('active')); this.classList.add('active'); tabPanes.forEach(pane => { pane.classList.remove('active'); if (pane.dataset.tabContent === tabId) { pane.classList.add('active'); pane.querySelectorAll('[data-aos]').forEach(el => { el.classList.remove('aos-animate'); el.classList.add('aos-init'); setTimeout(() => el.classList.add('aos-animate'), 50); }); } }); }); }); });

    // Модальные окна
    const modalOpenButtons = document.querySelectorAll('[data-modal-open]');
    const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
    modalOpenButtons.forEach(button => { button.addEventListener('click', function() { const modalId = this.dataset.modalOpen; const modal = document.getElementById(modalId); if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; if (modalId === 'discuss') { if (typeof checkDiscussFormCooldown === 'function') { checkDiscussFormCooldown(); } } } }); });
    function closeModal(modal) { if (!modal) return; modal.classList.remove('active'); const anyModalActive = document.querySelector('.modal.active'); const mobileNavActive = nav ? nav.classList.contains('active') : false; if (!anyModalActive && !mobileNavActive) { document.body.style.overflow = ''; } }
    modalCloseButtons.forEach(button => { button.addEventListener('click', function() { const modal = this.closest('.modal'); if (modal) { closeModal(modal); } }); });
    document.querySelectorAll('.modal').forEach(modal => { modal.addEventListener('click', function(e) { if (e.target === this) { closeModal(this); } }); });
    document.addEventListener('keydown', function(e) { if (e.key === "Escape") { const activeModal = document.querySelector('.modal.active'); if (activeModal) { closeModal(activeModal); } } });

    // "Статистический спиннер" 
    const statsSpinner = document.querySelector('.stats-spinner'); if (statsSpinner) { const items = Array.from(statsSpinner.querySelectorAll('.stats-spinner__item')); const centerElement = statsSpinner.querySelector('.stats-spinner__center'); const containerWidth = statsSpinner.offsetWidth; const containerHeight = statsSpinner.offsetHeight; const itemsToPlace = items.filter(item => !item.classList.contains('stats-spinner__center')); const numItems = itemsToPlace.length; if (numItems > 0) { const radiusX = containerWidth / 2.8; const radiusY = containerHeight / 2.8; const angleStep = (2 * Math.PI) / numItems; itemsToPlace.forEach((item, index) => { const angle = index * angleStep - (Math.PI / 2); const x = radiusX * Math.cos(angle) + (containerWidth / 2) - (item.offsetWidth / 2); const y = radiusY * Math.sin(angle) + (containerHeight / 2) - (item.offsetHeight / 2); item.style.left = `${x}px`; item.style.top = `${y}px`; }); } if(centerElement) { centerElement.style.left = `calc(50% - ${centerElement.offsetWidth / 2}px)`; centerElement.style.top = `calc(50% - ${centerElement.offsetHeight / 2}px)`; centerElement.style.position = 'absolute'; } }
    // Обновление года в футере
    const currentYearElement = document.getElementById('current-year'); if (currentYearElement) { currentYearElement.textContent = new Date().getFullYear(); }
    // Бегущая строка
    const ticker = document.querySelector('.ticker'); if (ticker) { const contentWidth = ticker.scrollWidth / 2; const tickerWrapWidth = ticker.parentElement.offsetWidth; if (ticker.firstElementChild && contentWidth < tickerWrapWidth) { let currentContent = ticker.innerHTML; while(ticker.scrollWidth / 2 < tickerWrapWidth * 1.5) { ticker.innerHTML += currentContent; if (ticker.scrollWidth > tickerWrapWidth * 4) break; } } else if (!ticker.firstElementChild) { const textContent = ticker.textContent; ticker.innerHTML = `<span>${textContent}</span><span>${textContent}</span>`; } else { const originalHTML = ticker.innerHTML; ticker.innerHTML += originalHTML; } }

    // File Upload Logic for Discuss Project Form
    const discussForm = document.getElementById('discussForm'); 
    if (discussForm) { 
        const fileUploadArea = discussForm.querySelector('#fileUploadArea');
        const fileInput = discussForm.querySelector('#projectFiles');
        const fileUploadList = discussForm.querySelector('#fileUploadList');
        const fileUploadError = discussForm.querySelector('#fileUploadError');
        const submitButton = discussForm.querySelector('#discussSubmitButton'); // Переменная для кнопки формы "Обсудить проект"
        const formMessage = discussForm.querySelector('#discussFormMessage'); 
        const MAX_FILES = 3; const MAX_FILE_SIZE_MB = 5; const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; const ALLOWED_EXTENSIONS = ['pdf', 'xlsx', 'xls', 'doc', 'docx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'zip', 'rar'];
        const COOLDOWN_DURATION_MS = 15 * 60 * 1000; const SUBMIT_COUNT_LIMIT = 2; const LOCAL_STORAGE_SUBMIT_COUNT_KEY = 'discussFormSubmitCount'; const LOCAL_STORAGE_LAST_SUBMIT_KEY = 'discussFormLastSubmitTime';
        let selectedFiles = []; 
        if (fileUploadArea) { ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => { fileUploadArea.addEventListener(eventName, preventDefaults, false); }); function preventDefaults(e) { e.preventDefault(); e.stopPropagation(); } ['dragenter', 'dragover'].forEach(eventName => { fileUploadArea.addEventListener(eventName, () => fileUploadArea.classList.add('dragover'), false); }); ['dragleave', 'drop'].forEach(eventName => { fileUploadArea.addEventListener(eventName, () => fileUploadArea.classList.remove('dragover'), false); }); fileUploadArea.addEventListener('drop', handleDrop, false); }
        function handleDrop(e) { let dt = e.dataTransfer; let files = dt.files; handleFiles(files); }
        if (fileInput) { fileInput.addEventListener('change', (e) => { handleFiles(e.target.files); fileInput.value = ''; }); }
        function handleFiles(files) { fileUploadError.textContent = ''; let currentFiles = Array.from(files); if (selectedFiles.length + currentFiles.length > MAX_FILES) { fileUploadError.textContent = `Можно прикрепить не более ${MAX_FILES} файлов.`; return; } for (let file of currentFiles) { if (file.size > MAX_FILE_SIZE_BYTES) { fileUploadError.textContent = `Файл "${escapeHTML(file.name)}" слишком большой (макс. ${MAX_FILE_SIZE_MB}MB).`; continue; } const extension = file.name.split('.').pop().toLowerCase(); if (!ALLOWED_EXTENSIONS.includes(extension)) { fileUploadError.textContent = `Файл "${escapeHTML(file.name)}" имеет недопустимый тип.`; continue; } if (selectedFiles.length < MAX_FILES) { const isDuplicate = selectedFiles.some(sf => sf.name === file.name && sf.size === file.size); if (!isDuplicate) { selectedFiles.push(file); } } else { fileUploadError.textContent = `Достигнут лимит в ${MAX_FILES} файла.`; break; } } renderFileList(); }
        function renderFileList() { fileUploadList.innerHTML = ''; selectedFiles.forEach((file, index) => { const listItem = document.createElement('div'); listItem.classList.add('file-upload-list__item'); const fileIcon = getFileIcon(file.name); listItem.innerHTML = ` <span class="file-upload-list__item-name">${fileIcon} ${escapeHTML(file.name)}</span> <div style="display: flex; align-items: center;"> <span class="file-upload-list__item-size">${formatFileSize(file.size)}</span> <button type="button" class="file-upload-list__item-remove" data-index="${index}" title="Удалить файл">×</button> </div> `; fileUploadList.appendChild(listItem); }); fileUploadList.querySelectorAll('.file-upload-list__item-remove').forEach(button => { button.addEventListener('click', (e) => { const indexToRemove = parseInt(e.currentTarget.dataset.index); selectedFiles.splice(indexToRemove, 1); renderFileList(); }); }); }
        function getFileIcon(filename) { const ext = filename.split('.').pop().toLowerCase(); if (['pdf'].includes(ext)) return '📄'; if (['doc', 'docx'].includes(ext)) return '📝'; if (['xls', 'xlsx'].includes(ext)) return '📊'; if (['ppt', 'pptx'].includes(ext)) return '💻'; if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return '🖼️'; if (['zip', 'rar'].includes(ext)) return '📦'; return '📎'; }
        function formatFileSize(bytes) { if (bytes === 0) return '0 Bytes'; const k = 1024; const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']; const i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]; }
        function escapeHTML(str) { if (typeof str !== 'string') return ''; return str.replace(/[&<>"']/g, function (match) { return {'&': '&','<': '<','>': '>','"': '"',"'": "'"}[match]; }); }
        let discussCooldownInterval; 
        function checkDiscussFormCooldown() { const lastSubmitTime = parseInt(localStorage.getItem(LOCAL_STORAGE_LAST_SUBMIT_KEY) || '0'); const submitCount = parseInt(localStorage.getItem(LOCAL_STORAGE_SUBMIT_COUNT_KEY) || '0'); const now = Date.now(); if (submitCount >= SUBMIT_COUNT_LIMIT) { const timePassed = now - lastSubmitTime; if (timePassed < COOLDOWN_DURATION_MS) { const timeLeft = COOLDOWN_DURATION_MS - timePassed; disableDiscussSubmitButton(Math.ceil(timeLeft / 1000)); return false; } else { localStorage.setItem(LOCAL_STORAGE_SUBMIT_COUNT_KEY, '0'); } } enableDiscussSubmitButton(); return true; }
        function disableDiscussSubmitButton(secondsLeft) { if (!submitButton) return; submitButton.disabled = true; let originalText = 'Отправить заявку'; clearInterval(discussCooldownInterval); if (secondsLeft > 0) { submitButton.textContent = `Подождите ${secondsLeft} сек...`; discussCooldownInterval = setInterval(() => { secondsLeft--; if (secondsLeft > 0) { submitButton.textContent = `Подождите ${secondsLeft} сек...`; } else { clearInterval(discussCooldownInterval); submitButton.textContent = originalText; submitButton.disabled = false; localStorage.setItem(LOCAL_STORAGE_SUBMIT_COUNT_KEY, '0'); } }, 1000); } else { submitButton.textContent = 'Отправка...'; } }
        function enableDiscussSubmitButton() { if (!submitButton) return; clearInterval(discussCooldownInterval); submitButton.disabled = false; submitButton.textContent = 'Отправить заявку'; }
        function updateDiscussSubmitStats() { let submitCount = parseInt(localStorage.getItem(LOCAL_STORAGE_SUBMIT_COUNT_KEY) || '0'); submitCount++; localStorage.setItem(LOCAL_STORAGE_SUBMIT_COUNT_KEY, submitCount.toString()); localStorage.setItem(LOCAL_STORAGE_LAST_SUBMIT_KEY, Date.now().toString()); }
        const discussModal = document.getElementById('discuss'); if (discussModal) { const observer = new MutationObserver(mutations => { mutations.forEach(mutation => { if (mutation.attributeName === 'class' && discussModal.classList.contains('active')) { checkDiscussFormCooldown(); } }); }); observer.observe(discussModal, { attributes: true }); } checkDiscussFormCooldown(); 
        discussForm.addEventListener('submit', async function(e) { e.preventDefault(); if (formMessage) { formMessage.style.display = 'none'; formMessage.className = 'form-message'; } fileUploadError.textContent = ''; if (!checkDiscussFormCooldown()) { return; } disableDiscussSubmitButton(0); const formData = new FormData(discussForm); formData.delete('project_files[]'); selectedFiles.forEach((file) => { formData.append('project_files[]', file, file.name); }); try { const response = await fetch('http://localhost:5000/api/submit_project', { method: 'POST', body: formData, }); const result = await response.json(); if (formMessage) { if (response.ok) { formMessage.textContent = result.message || 'Заявка успешно отправлена!'; formMessage.classList.add('success'); discussForm.reset(); selectedFiles = []; renderFileList(); updateDiscussSubmitStats(); checkDiscussFormCooldown(); setTimeout(() => { closeModal(discussForm.closest('.modal')); formMessage.style.display = 'none'; }, 3000); } else { formMessage.textContent = result.error || 'Ошибка при отправке заявки. Попробуйте позже.'; formMessage.classList.add('error'); enableDiscussSubmitButton(); } formMessage.style.display = 'block'; } else { if (response.ok) alert(result.message || 'Заявка успешно отправлена!'); else alert(result.error || 'Ошибка при отправке заявки. Попробуйте позже.'); if (response.ok) { discussForm.reset(); selectedFiles = []; renderFileList(); updateDiscussSubmitStats(); checkDiscussFormCooldown(); setTimeout(() => closeModal(discussForm.closest('.modal')), 3000); } else { enableDiscussSubmitButton(); } } } catch (error) { console.error('Ошибка сети или сервера:', error); const errorMsg = 'Сетевая ошибка или сервер недоступен.'; if (formMessage) { formMessage.textContent = errorMsg; formMessage.classList.add('error'); formMessage.style.display = 'block'; } else { alert(errorMsg); } enableDiscussSubmitButton(); } });
    }

    // --- Код для формы Заказать звонок с IMaskJS (УНИФИЦИРОВАННОЕ ПОЛЕ) ---
    const callbackForm = document.getElementById('callbackForm');
    
    if (callbackForm) {
        const phoneInputUnified = callbackForm.querySelector('#callbackPhoneUnified');
        const countryCodeSelect = callbackForm.querySelector('#phoneCountryCode'); // Наш новый селект
        const callbackFormMessage = callbackForm.querySelector('#callbackFormMessage'); 
        let phoneMaskInstanceUnified;

        function initializePhoneMask() {
            if (phoneMaskInstanceUnified) {
                phoneMaskInstanceUnified.destroy();
            }

            const selectedOption = countryCodeSelect.options[countryCodeSelect.selectedIndex];
            const maskPattern = selectedOption.dataset.mask;
            const placeholderText = selectedOption.dataset.prefix + " " + selectedOption.dataset.placeholder;
            // Префикс уже будет в итоговом значении маски, если маска его включает,
            // или мы добавим его при отправке. Для плейсхолдера покажем его.
            
            phoneInputUnified.placeholder = placeholderText;
            phoneInputUnified.value = ''; // Очищаем инпут при смене маски

            if (maskPattern && window.IMask) {
                const maskOptions = {
                    mask: maskPattern, 
                    lazy: false, 
                    placeholderChar: '_',
                    // Для IMask, если префикс страны не является частью редактируемой маски,
                    // его нужно будет добавлять отдельно при формировании итогового номера.
                    // Если маска УЖЕ включает код страны (как '+{7} (000) ...'), то это проще.
                    // Давай сделаем маски, которые НЕ включают код страны, а код берем из data-prefix.
                };
                phoneMaskInstanceUnified = IMask(phoneInputUnified, maskOptions);
                console.log("IMask инициализирован/обновлен для:", selectedOption.value, phoneMaskInstanceUnified);
            }
        }

        if (phoneInputUnified && countryCodeSelect && window.IMask) {
            console.log("Попытка инициализации IMask для #callbackPhoneUnified с выбором страны");
            countryCodeSelect.addEventListener('change', initializePhoneMask);
            initializePhoneMask(); // Первичная инициализация
        } else { 
            if (!phoneInputUnified) console.error("Элемент #callbackPhoneUnified не найден!"); 
            if (!countryCodeSelect) console.error("Элемент #phoneCountryCode не найден!"); 
            if (!window.IMask) console.error("Библиотека IMask не загружена!"); 
        }

        callbackForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if(callbackFormMessage) { callbackFormMessage.style.display = 'none'; callbackFormMessage.className = 'form-message'; }
            
            const submitBtn = callbackForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true; submitBtn.textContent = 'Отправка...';
            
            const formData = new FormData(callbackForm); // Изначально содержит name и phone_number_part
            let fullPhoneNumber = "";
            const selectedOption = countryCodeSelect.options[countryCodeSelect.selectedIndex];
            const countryPrefix = selectedOption.dataset.prefix; // +7, +375

            if (phoneMaskInstanceUnified) {
                const unmaskedValue = phoneMaskInstanceUnified.unmaskedValue; // Только цифры из инпута (без префикса)
                const expectedLength = phoneMaskInstanceUnified.mask.replace(/[^0]/g, "").length; // Ожидаемая длина цифр в маске

                if (unmaskedValue.length === expectedLength) { 
                    fullPhoneNumber = countryPrefix + unmaskedValue;
                    console.log("Сформированный номер телефона (IMask + Select):", fullPhoneNumber);
                } else {
                    const errorText = `Пожалуйста, введите полный номер телефона (${expectedLength} цифр после кода).`;
                    if(callbackFormMessage) { callbackFormMessage.textContent = errorText; callbackFormMessage.classList.add('error'); callbackFormMessage.style.display = 'block';} 
                    else { alert(errorText); }
                    submitBtn.disabled = false; submitBtn.textContent = originalBtnText;
                    return;
                }
            } else {
                // Фоллбэк, если IMask не сработал
                const rawPhonePart = phoneInputUnified.value.replace(/\D/g, '');
                if (rawPhonePart.length > 5) { // Очень простая проверка
                    fullPhoneNumber = countryPrefix + rawPhonePart;
                } else {
                    if(callbackFormMessage) { callbackFormMessage.textContent = 'Пожалуйста, введите корректный номер телефона.'; /*...*/ } else { alert('Пожалуйста, введите корректный номер телефона.'); }
                    submitBtn.disabled = false; submitBtn.textContent = originalBtnText;
                    return;
                }
                console.warn("IMask не инициализирован, используется сырой ввод с префиксом:", fullPhoneNumber);
            }

            formData.set('phone', fullPhoneNumber); // Заменяем/добавляем поле 'phone'
            formData.delete('phone_number_part');   // Удаляем частичный номер
            formData.delete('country_code_selector'); // Удаляем селектор, если не нужен на бэке

            console.log("Отправляемые данные (callback):", Object.fromEntries(formData));
            
            try {
                const response = await fetch('http://localhost:5000/api/submit_callback', { method: 'POST', body: formData });
                const result = await response.json();
                if (callbackFormMessage) {
                    if (response.ok) { 
                        callbackFormMessage.textContent = result.message || 'Заявка на звонок успешно отправлена!'; 
                        callbackFormMessage.classList.add('success'); 
                        callbackForm.reset(); 
                        if (phoneMaskInstanceUnified) phoneMaskInstanceUnified.value = ''; 
                        initializePhoneMask(); // Сбросить маску к дефолтной стране
                        setTimeout(() => { closeModal(callbackForm.closest('.modal')); callbackFormMessage.style.display = 'none'; }, 3000); 
                    } else { 
                        callbackFormMessage.textContent = result.error || 'Ошибка отправки. Попробуйте позже.'; 
                        callbackFormMessage.classList.add('error'); 
                    }
                    callbackFormMessage.style.display = 'block';
                } else { /* ... alert fallback ... */ }
            } catch (error) { /* ... обработка сетевой ошибки ... */ }
            submitBtn.disabled = false; submitBtn.textContent = originalBtnText;
        });
    }
});