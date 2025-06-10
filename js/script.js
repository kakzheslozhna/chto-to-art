document.addEventListener('DOMContentLoaded', function() {
    const siteHeader = document.getElementById('site-header');
    const heroSliderSection = document.getElementById('hero-slider');
    const burgerMenu = document.getElementById('burger-menu');
    const mainNavMenu = document.getElementById('main-navigation-menu');

    function updateHeaderHeightVar() {
        if (siteHeader) {
            const headerHeight = siteHeader.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
            if (heroSliderSection) {
               heroSliderSection.style.paddingTop = `${headerHeight}px`;
            }
        }
    }

    function handleHeaderScroll() {
        if (siteHeader && heroSliderSection) {
            const scrollThreshold = heroSliderSection.offsetHeight * 0.5;
            if (window.scrollY > scrollThreshold) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        } else if (siteHeader) {
            if (window.scrollY > 50) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    window.addEventListener('resize', updateHeaderHeightVar);
    updateHeaderHeightVar();
    handleHeaderScroll();

    if (burgerMenu && mainNavMenu) {
        burgerMenu.addEventListener('click', function() {
            const isOpened = mainNavMenu.classList.toggle('active');
            burgerMenu.classList.toggle('active');
            burgerMenu.setAttribute('aria-expanded', String(isOpened));
            if (isOpened) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        const navLinks = mainNavMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNavMenu.classList.contains('active')) {
                    mainNavMenu.classList.remove('active');
                    burgerMenu.classList.remove('active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });

        document.addEventListener('click', function(event) {
            if (mainNavMenu.classList.contains('active')) {
                const isClickInsideNav = mainNavMenu.contains(event.target);
                const isClickOnBurger = burgerMenu.contains(event.target);
                if (!isClickInsideNav && !isClickOnBurger) {
                    mainNavMenu.classList.remove('active');
                    burgerMenu.classList.remove('active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNavMenu.classList.contains('active')) {
                mainNavMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
                burgerMenu.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    const slidesData = [
        { 
            id: "naruzhnaya-reklama", 
            label: "УСЛУГИ КОМПАНИИ", 
            title: "Наружная реклама", 
            description: "Яркие и эффективные решения для вашего бренда на улицах города.", 
            image: "img/slide-naruzhnaya-poster.jpg", 
            videoSrc: "video/slide-naruzhnaya.mp4",    
            isMedia: true, 
            mediaType: 'video', 
            tabName: "Наружная реклама" 
        },
        { 
            id: "oformlenie-vitrin", 
            label: "УСЛУГИ КОМПАНИИ", 
            title: "Оформление витрин", 
            description: "Инсталляции, световые решения, объемные фигуры, буквы в витринах.", 
            image: "img/slide-vitrin-poster.jpg", 
            videoSrc: "video/slide-vitrin.mp4",    
            isMedia: true,
            mediaType: 'video',
            tabName: "Оформление витрин" 
        },
        { 
            id: "magazino-stroenie", 
            label: "УСЛУГИ КОМПАНИИ", 
            title: "Магазино-строение", 
            description: "Комплексные решения для открытия магазина: кассовые зоны, прилавки, витрины, торговые точки.", 
            image: "img/slide-magazin-poster.jpg", 
            videoSrc: "video/slide-magazin.mp4",
            isMedia: true,
            mediaType: 'video',
            tabName: "Магазино-строение" 
        },
        { 
            id: "dizain-proekty", 
            label: "УСЛУГИ КОМПАНИИ", 
            title: "Дизайн-проекты", 
            description: "Создание эксклюзивной дизайн-концепции, адаптация, ребрендинг.", 
            image: "img/slide-dizain-poster.jpg", 
            videoSrc: "video/slide-dizain.mp4",
            isMedia: true,
            mediaType: 'video',
            tabName: "Дизайн-проекты" 
        },
        { 
            id: "navigatsiya", 
            label: "УСЛУГИ КОМПАНИИ", 
            title: "Навигация", 
            description: "Внутренняя и внешняя рекламная навигация на любых носителях.", 
            image: "img/slide-navigatsiya-poster.jpg", 
            videoSrc: "video/slide-navigatsiya.mp4",
            isMedia: true,
            mediaType: 'video',
            tabName: "Навигация" 
        },
        { 
            id: "eksklyuzivnye-pop-up", 
            label: "УСЛУГИ КОМПАНИИ", 
            title: "Эксклюзивные pop-up", 
            description: "Сложные функциональные брендированные зоны в торговом пространстве.", 
            image: "img/slide-popup-poster.jpg", 
            videoSrc: "video/popup-video.mp4",    
            isMedia: true,
            mediaType: 'video',
            tabName: "Эксклюзивные pop-up" 
        },
        { 
            id: "torgovye-prostranstva", 
            label: "УСЛУГИ КОМПАНИИ", 
            title: "Торговые пространства", 
            description: "Комплексное брендирование магазинов, торговых центров, ресторанов, спортивных объектов.", 
            image: "img/slide-torgovye-poster.jpg", 
            videoSrc: "video/slide-torgovye.mp4",
            isMedia: true,
            mediaType: 'video',
            tabName: "Торговые пространства" 
        },
        { 
            id: "sportivnye-obekty", 
            label: "УСЛУГИ КОМПАНИИ", 
            title: "Спортивные объекты", 
            description: "Рекламное оформление, брендирование, спонсорская реклама, навигация и прочее в спортивных объектах.", 
            image: "img/slide-sport-poster.jpg", 
            videoSrc: "video/slide-sport.mp4",
            isMedia: true,
            mediaType: 'video',
            tabName: "Спортивные объекты" 
        }
    ];
    const slideLabelEl = document.getElementById('slide-services-label');
    const slideTitleEl = document.getElementById('slide-title');
    const slideDescriptionEl = document.getElementById('slide-description');
    const sliderImageColumn = document.querySelector('.slider-image-column');
    const textContentWrapper = document.querySelector('.slider-text-column .slide-content-wrapper');
    const prevArrow = document.getElementById('slider-arrow-prev');
    const nextArrow = document.getElementById('slider-arrow-next');
    const tabsContainer = document.getElementById('slider-tabs-container');
    
    let defaultSlideId = "naruzhnaya-reklama"; 
    let currentSlideIndex = slidesData.findIndex(s => s.id === defaultSlideId);
    if (currentSlideIndex === -1) { 
        currentSlideIndex = 0; 
        console.warn(`Default slide with id "${defaultSlideId}" not found. Starting with the first slide.`);
    }

    let autoPlayInterval = null; // Инициализируем null
    const AUTOPLAY_DELAY = 7000; 
    let isSliderVisible = false; // Флаг видимости слайдера
    let isMouseOverSlider = false; // Флаг наведения мыши

    function generateTabs() {
        if (!tabsContainer) return;
        tabsContainer.innerHTML = '';
        slidesData.forEach((slide, index) => {
            const tab = document.createElement('li');
            tab.textContent = slide.tabName;
            tab.setAttribute('data-slide-index', String(index));
            tabsContainer.appendChild(tab);
            tab.addEventListener('click', () => {
                goToSlide(index);
                // При клике на таб, если мышь не наведена, автоплей перезапустится
                // Если наведена, видео все равно сменится и заиграет, а автоплей останется на паузе.
                if (!isMouseOverSlider) {
                    stopAutoPlayInterval();
                    startAutoPlayInterval();
                }
                // Убедимся, что видео нового слайда играет, если слайдер видим
                if (isSliderVisible) {
                    playActiveVideo();
                }
            });
        });
    }

    function playActiveVideo() {
        if (!isSliderVisible) return; // Не играть, если слайдер не виден

        const activeVideo = sliderImageColumn.querySelector('video.slide-media.active');
        if (activeVideo && activeVideo.paused) {
            if (activeVideo.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
                activeVideo.play().catch(error => {
                    console.warn("Play attempt failed for active video:", activeVideo.src, error);
                });
            } else {
                const canPlayHandler = () => {
                    if (activeVideo.classList.contains('active') && activeVideo.paused && isSliderVisible) {
                         activeVideo.play().catch(e => console.warn("Delayed play failed:", activeVideo.src, e));
                    }
                };
                activeVideo.removeEventListener('canplaythrough', canPlayHandler); // Удаляем старый, если был
                activeVideo.removeEventListener('loadeddata', canPlayHandler);
                activeVideo.addEventListener('canplaythrough', canPlayHandler, { once: true });
                activeVideo.addEventListener('loadeddata', canPlayHandler, { once: true });
            }
        }
    }

    function pauseActiveVideo() {
        const activeVideo = sliderImageColumn.querySelector('video.slide-media.active');
        if (activeVideo && !activeVideo.paused) {
            activeVideo.pause();
        }
    }
    
    function updateSlide(index) {
        if (!slidesData[index] || !slideLabelEl || !slideTitleEl || !slideDescriptionEl || !textContentWrapper || !sliderImageColumn) {
            console.error("Missing elements for slide update or slide data for index:", index);
            return;
        }
        const slide = slidesData[index];
        const oldSlideIndex = currentSlideIndex;
        currentSlideIndex = index;

        sliderImageColumn.querySelectorAll('video.slide-media:not(.active)').forEach(vid => { // Паузим только НЕ активные перед удалением
            if (!vid.paused) vid.pause();
        });
         // Паузим предыдущее активное видео, если оно было видео
        const previousActiveVideo = sliderImageColumn.querySelector('video.slide-media.active');
        if (previousActiveVideo && previousActiveVideo.closest('.slider-image-column')) { // Убедимся, что оно еще в DOM
            previousActiveVideo.pause();
        }
        
        textContentWrapper.classList.remove('slide-text-animating');
        slideLabelEl.style.opacity = '0';
        slideTitleEl.style.opacity = '0';
        slideDescriptionEl.style.opacity = '0';
        setTimeout(() => {
            slideLabelEl.textContent = slide.label;
            slideTitleEl.textContent = slide.title;
            slideDescriptionEl.textContent = slide.description;
            textContentWrapper.classList.add('slide-text-animating');
        }, 50);

        const placeholderImg = document.getElementById('slide-image-placeholder');
        
        const currentActiveMediaElements = sliderImageColumn.querySelectorAll('.slide-media.active');
        currentActiveMediaElements.forEach(activeMedia => {
            activeMedia.classList.remove('active');
            if (activeMedia.tagName === 'VIDEO') {
                 sliderImageColumn.classList.remove('video-slide-active');
            }
        });

        const allDynamicallyAddedMedia = sliderImageColumn.querySelectorAll('.slide-media:not(#slide-image-placeholder)');
        allDynamicallyAddedMedia.forEach(mediaEl => {
            if (mediaEl.tagName === 'VIDEO') {
                mediaEl.oncanplaythrough = null; 
                mediaEl.onloadeddata = null;
                mediaEl.onerror = null;
                mediaEl.src = ""; 
                mediaEl.removeAttribute('src'); 
                mediaEl.load();
            }
            setTimeout(() => {
                if (mediaEl.parentNode) mediaEl.remove();
            }, 800); 
        });
        
        if (placeholderImg) {
            placeholderImg.classList.remove('active');
            placeholderImg.style.opacity = '0';
        }
        sliderImageColumn.classList.remove('video-slide-active');

        let newMediaElement;
        const isVideoSlide = slide.isMedia && slide.mediaType === 'video' && slide.videoSrc;

        if (isVideoSlide) {
            if (placeholderImg && slide.image) {
                placeholderImg.src = slide.image;
                placeholderImg.alt = slide.title + " (loading video...)";
                placeholderImg.style.opacity = '1'; 
                placeholderImg.classList.add('active'); 
            } else if (placeholderImg) {
                placeholderImg.style.opacity = '0';
                placeholderImg.classList.remove('active');
            }

            newMediaElement = document.createElement('video');
            newMediaElement.src = slide.videoSrc;
            if (slide.image) newMediaElement.poster = slide.image;
            newMediaElement.loop = true;
            newMediaElement.muted = true; 
            newMediaElement.playsInline = true; 
            newMediaElement.preload = "auto";
            newMediaElement.removeAttribute('controls'); 
            newMediaElement.setAttribute('data-media-type', 'video');
            sliderImageColumn.classList.add('video-slide-active');
        } else { 
            if (placeholderImg) { // Используем плейсхолдер для картинок
                placeholderImg.src = slide.image; 
                placeholderImg.alt = slide.title;
                placeholderImg.setAttribute('data-media-type', slide.isMedia && slide.mediaType === 'gif' ? 'gif' : 'image');
                newMediaElement = placeholderImg; // Теперь плейсхолдер это наш "новый" элемент
            } else { // Если плейсхолдера нет (не должно быть по HTML), создаем img
                newMediaElement = document.createElement('img');
                newMediaElement.src = slide.image; 
                newMediaElement.alt = slide.title;
                newMediaElement.setAttribute('data-media-type', slide.isMedia && slide.mediaType === 'gif' ? 'gif' : 'image');
            }
            sliderImageColumn.classList.remove('video-slide-active');
        }
        
        if (newMediaElement !== placeholderImg) { // Если это не плейсхолдер (т.е. видео)
            newMediaElement.classList.add('slide-media');
            newMediaElement.style.opacity = '0'; 
            sliderImageColumn.appendChild(newMediaElement);
        }


        const finaliseMediaDisplay = () => {
            if (currentSlideIndex === index) { 
                if (isVideoSlide && placeholderImg) { 
                    placeholderImg.style.opacity = '0';
                    placeholderImg.classList.remove('active');
                }
                newMediaElement.style.opacity = '1'; // Плавно показываем (для видео или плейсхолдера-картинки)
                newMediaElement.classList.add('active'); 
                
                if (newMediaElement.tagName === 'VIDEO' && isSliderVisible) { 
                    playActiveVideo();
                }
            } else if (newMediaElement.tagName === 'VIDEO' && newMediaElement !== placeholderImg) {
                 if (newMediaElement.parentNode) newMediaElement.remove();
            }
        };
    
        if (isVideoSlide) {
            if (newMediaElement.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
                setTimeout(finaliseMediaDisplay, 30); 
            } else {
                newMediaElement.addEventListener('canplaythrough', finaliseMediaDisplay, { once: true });
                newMediaElement.addEventListener('loadeddata', finaliseMediaDisplay, { once: true });
                newMediaElement.addEventListener('error', (e) => {
                    console.error('Error loading video:', newMediaElement.src, e);
                    if (placeholderImg && newMediaElement.poster) {
                        placeholderImg.src = newMediaElement.poster;
                        placeholderImg.alt = slide.title + " (video error)";
                        placeholderImg.style.opacity = '1';
                        placeholderImg.classList.add('active'); 
                    } else if (placeholderImg) {
                        placeholderImg.style.opacity = '0';
                        placeholderImg.classList.remove('active'); 
                    }
                    if (newMediaElement.parentNode && newMediaElement !== placeholderImg) newMediaElement.remove();
                    sliderImageColumn.classList.remove('video-slide-active');
                }, { once: true });
            }
        } else { 
            // Для картинок, которые теперь отображаются через placeholderImg
            if (placeholderImg === newMediaElement) { // Убедимся, что это плейсхолдер
                 setTimeout(finaliseMediaDisplay, 20); // Просто показываем его
            }
        }

        if (tabsContainer) {
            const tabs = tabsContainer.querySelectorAll('li');
            tabs.forEach((tab, i) => {
                tab.classList.toggle('active', i === index);
            });
        }
    }

    function nextSlide() {
        let newIndex = (currentSlideIndex + 1) % slidesData.length;
        updateSlide(newIndex);
    }

    function prevSlide() {
        let newIndex = (currentSlideIndex - 1 + slidesData.length) % slidesData.length;
        updateSlide(newIndex);
    }

    function goToSlide(index) {
        updateSlide(index);
    }
    
    function startAutoPlayInterval() {
        if (autoPlayInterval) clearInterval(autoPlayInterval); // Очищаем существующий, если есть
        autoPlayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    function stopAutoPlayInterval() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }

    if (heroSliderSection) {
        const sliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    isSliderVisible = true;
                    heroSliderSection.classList.add('is-visible-slider');
                    playActiveVideo(); // Запускаем видео текущего слайда
                    if (!isMouseOverSlider && slidesData.length > 1 && !autoPlayInterval) { // Запускаем автоплей только если мышь не наведена
                        startAutoPlayInterval();
                    }
                } else {
                    isSliderVisible = false;
                    heroSliderSection.classList.remove('is-visible-slider');
                    pauseActiveVideo(); // Паузим видео
                    stopAutoPlayInterval(); // Останавливаем автоплей
                }
            });
        }, { threshold: 0.1 }); 

        sliderObserver.observe(heroSliderSection);
    }

    if (slidesData.length > 0 && heroSliderSection) {
        generateTabs();
        updateSlide(currentSlideIndex); 
        // Первоначальный запуск автоплея и видео будет обработан IntersectionObserver

        if (prevArrow && nextArrow) {
            prevArrow.addEventListener('click', () => { 
                prevSlide(); 
                if (!isMouseOverSlider) {
                    stopAutoPlayInterval();    
                    startAutoPlayInterval();   
                }
                if(isSliderVisible) playActiveVideo();
            });
            nextArrow.addEventListener('click', () => { 
                nextSlide(); 
                if (!isMouseOverSlider) {
                    stopAutoPlayInterval();
                    startAutoPlayInterval();
                }
                if(isSliderVisible) playActiveVideo();
            });
        }
        heroSliderSection.addEventListener('mouseenter', () => {
            isMouseOverSlider = true;
            stopAutoPlayInterval(); // Останавливаем только смену слайдов
            // Видео НЕ останавливаем, оно должно продолжать играть
        }); 
        heroSliderSection.addEventListener('mouseleave', () => {
            isMouseOverSlider = false;
            if (isSliderVisible && slidesData.length > 1) { // Возобновляем автоплей, если слайдер видим
                startAutoPlayInterval();
            }
        });
    }

    // --- ОСТАЛЬНАЯ ЧАСТЬ КОДА ---
    // (Проекты, статистика, модалки, и т.д. - без изменений из твоего предыдущего полного файла)
    // ... (скопируй сюда всю оставшуюся часть твоего script.js)
    const projectsGridContainer = document.getElementById('projects-grid-container');
    const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
    const allProjects = [
        { id: 1, title: "Сеть универсамов Верный", category: "visual", image: "https://via.placeholder.com/600x400.png?text=Верный", description: "Комплексное оформление сети универсамов 'Верный'.", details: "Более подробное описание проекта Верный...", gallery: ["https://via.placeholder.com/800x500.png?text=Верный+Деталь+1", "https://via.placeholder.com/800x500.png?text=Верный+Деталь+2"] }, { id: 2, title: "Авиапарк", category: "visual", image: "https://via.placeholder.com/600x400.png?text=Авиапарк", description: "Навигационные системы для ТРЦ Авиапарк.", details: "Детали проекта Авиапарк...", gallery: [] }, { id: 3, title: "Burger King", category: "visual", image: "https://via.placeholder.com/600x400.png?text=Burger+King", description: "Оформление ресторанов Burger King.", details: "Детали проекта Burger King...", gallery: [] }, { id: 4, title: "Стадион 'Спартак'", category: "sport", image: "https://via.placeholder.com/600x400.png?text=Спартак", description: "Брендирование стадиона 'Спартак'.", details: "Детали проекта стадион Спартак...", gallery: [] }, { id: 5, title: "Кубок России по футболу", category: "sport", image: "https://via.placeholder.com/600x400.png?text=Кубок+РФ", description: "Оформление мероприятий Кубка России.", details: "Детали проекта Кубок РФ...", gallery: [] }, { id: 6, title: "Winline Баскетбольная площадка", category: "sport", image: "https://via.placeholder.com/600x400.png?text=Winline", description: "Брендированная площадка Winline.", details: "Детали проекта Winline...", gallery: [] }, { id: 7, title: "Pop-up 'Monochrome'", category: "exclusive", image: "https://via.placeholder.com/600x400.png?text=Monochrome", description: "Эксклюзивный pop-up стенд.", details: "Детали проекта Monochrome...", gallery: [] }, { id: 8, title: "PRADA Гоночный болид", category: "exclusive", image: "https://via.placeholder.com/600x400.png?text=PRADA", description: "Инсталляция для PRADA.", details: "Детали проекта PRADA...", gallery: [] }, { id: 9, title: "Канатная дорога (декор)", category: "exclusive", image: "https://via.placeholder.com/600x400.png?text=Канатная+Дорога", description: "Декорирование канатной дороги.", details: "Детали проекта Канатная дорога...", gallery: [] }, { id: 10, title: "Divage стенд косметики", category: "design", image: "https://via.placeholder.com/600x400.png?text=Divage", description: "Стенд для Divage.", details: "Детали проекта Divage...", gallery: [] }, { id: 11, title: "Тинькофф мобильный офис", category: "design", image: "https://via.placeholder.com/600x400.png?text=Тинькофф", description: "Мобильный офис Тинькофф.", details: "Детали проекта Тинькофф...", gallery: [] }, { id: 12, title: "Еще один Визуальный проект", category: "visual", image: "https://via.placeholder.com/600x400.png?text=Визуал+Еще", description: "Описание еще одного визуального проекта.", details: "...", gallery: [] }, { id: 13, title: "Проект Спортивный Новый", category: "sport", image: "https://via.placeholder.com/600x400.png?text=Спорт+Новый", description: "Новый спортивный проект.", details: "...", gallery: [] }, { id: 14, title: "Эксклюзив для VIP", category: "exclusive", image: "https://via.placeholder.com/600x400.png?text=VIP+Эксклюзив", description: "Очень эксклюзивный проект.", details: "...", gallery: [] }, { id: 15, title: "Супер Дизайн Концепт", category: "design", image: "https://via.placeholder.com/600x400.png?text=Дизайн+Концепт", description: "Концептуальный дизайн проект.", details: "...", gallery: [] },
    ];
    let currentFilterProjects = 'all';
    const initialProjectsToShow = 3;
    let currentlyDisplayedCount = 0;
    let filteredProjects = [];

    function createProjectCard(project, isLoadMore = false) {
        const card = document.createElement('div');
        card.className = 'project-card animate-on-scroll';
        if (isLoadMore) {
            card.classList.add('load-more-card');
            card.id = 'load-more-btn';
            card.innerHTML = `<div class="load-more-content"><span class="load-more-title">БОЛЬШЕ ПРОЕКТОВ</span><span class="load-more-count" id="load-more-count-text">Показать еще N</span></div>`;
            card.addEventListener('click', loadAllRemainingProjects);
        } else {
            card.dataset.category = project.category;
            card.dataset.id = project.id;
            const img = document.createElement('img');
            img.src = project.image;
            img.alt = project.title;
            const overlay = document.createElement('div');
            overlay.className = 'project-card-overlay';
            const title = document.createElement('h3');
            title.className = 'project-card-title';
            title.textContent = project.title;
            const categoryText = document.createElement('span');
            categoryText.className = 'project-card-category';
            categoryText.textContent = project.category; 
            overlay.appendChild(title);
            overlay.appendChild(categoryText);
            card.appendChild(img);
            card.appendChild(overlay);
            card.addEventListener('click', () => openProjectModal(project.id));
        }
        return card;
    }

    function renderProjects() {
        if (!projectsGridContainer) return;
        projectsGridContainer.innerHTML = '';
        if (currentFilterProjects === 'all') {
            filteredProjects = allProjects;
        } else {
            filteredProjects = allProjects.filter(p => p.category === currentFilterProjects);
        }
        currentlyDisplayedCount = 0;
        appendProjects(initialProjectsToShow);
    }

    function appendProjects(count) {
        const projectsToAppend = filteredProjects.slice(currentlyDisplayedCount, currentlyDisplayedCount + count);
        projectsToAppend.forEach((project, index) => {
            const card = createProjectCard(project);
            card.style.animationDelay = `${index * 0.05}s`;
            card.classList.add('reveal');
            projectsGridContainer.appendChild(card);
        });
        currentlyDisplayedCount += projectsToAppend.length;
        updateLoadMoreCardVisibility();
    }

    function loadAllRemainingProjects() {
        const remainingCount = filteredProjects.length - currentlyDisplayedCount;
        if (remainingCount > 0) {
            appendProjects(remainingCount);
        }
        const loadMoreCard = document.getElementById('load-more-btn');
        if (loadMoreCard) {
            loadMoreCard.remove();
        }
    }

    function updateLoadMoreCardVisibility() {
        const existingLoadMoreCard = document.getElementById('load-more-btn');
        if (existingLoadMoreCard) {
            existingLoadMoreCard.remove();
        }
        if (currentlyDisplayedCount < filteredProjects.length && filteredProjects.length > initialProjectsToShow) {
             const remaining = filteredProjects.length - currentlyDisplayedCount;
             const loadMoreCard = createProjectCard(null, true);
             projectsGridContainer.appendChild(loadMoreCard);
             const loadMoreCountTextEl = loadMoreCard.querySelector('#load-more-count-text');
             if (loadMoreCountTextEl) {
                 loadMoreCountTextEl.textContent = `Показать еще ${remaining}`;
             }
        }
    }
    
    if (filterBtns.length > 0 && projectsGridContainer) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilterProjects = btn.dataset.filter;
                renderProjects();
            });
        });
    }

    const projectModal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('project-modal-close');
    const backModalBtn = document.getElementById('project-modal-back');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDescription = document.getElementById('modal-project-description');
    const modalMainImage = document.getElementById('modal-main-image');
    const modalGalleryContainer = document.getElementById('modal-gallery-container');

    function openProjectModal(projectId) {
        const project = allProjects.find(p => p.id === parseInt(projectId));
        if (!project || !projectModal || !modalTitle || !modalDescription || !modalMainImage || !modalGalleryContainer) return;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.details || project.description;
        modalMainImage.src = project.image;
        modalMainImage.alt = project.title;
        modalGalleryContainer.innerHTML = '';
        if (project.gallery && project.gallery.length > 0) {
            project.gallery.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = `Фото проекта ${project.title}`;
                modalGalleryContainer.appendChild(img);
            });
            modalGalleryContainer.style.display = 'grid';
            const galleryTitle = modalGalleryContainer.previousElementSibling;
            if (galleryTitle && galleryTitle.tagName === 'H4') galleryTitle.style.display = 'block';
        } else {
            modalGalleryContainer.style.display = 'none';
            const galleryTitle = modalGalleryContainer.previousElementSibling;
            if (galleryTitle && galleryTitle.tagName === 'H4') galleryTitle.style.display = 'none';
        }
        projectModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
    if (backModalBtn) backModalBtn.addEventListener('click', closeProjectModal);
    if (projectModal) {
        projectModal.addEventListener('click', (event) => {
            if (event.target === projectModal) {
                closeProjectModal();
            }
        });
    }
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && projectModal && projectModal.classList.contains('show')) {
            closeProjectModal();
        }
    });

    if (projectsGridContainer) {
        renderProjects();
    }

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.animationDelay || '0s';
                entry.target.style.transitionDelay = delay; 
                entry.target.classList.add('is-visible');
            } else {
                 entry.target.classList.remove('is-visible');
            }
        });
    };
    const observerOptions = { 
        root: null, 
        rootMargin: '0px 0px -10% 0px', 
        threshold: 0.01 
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => {
        const initialDelay = el.dataset.animationDelay || '0s';
        el.style.transitionDelay = `${initialDelay}, ${initialDelay}, 0.7s`; 
        observer.observe(el);
    });

    const mainCircleStat = document.getElementById('main-circle-stat');
    if (mainCircleStat) {
        const progressDot = document.getElementById('progress-dot');
        const progressCircle = document.getElementById('progress-dot-circle');
        const radius = progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        let dotAnimationId;
        const animateCircleAndDot = () => {
            progressCircle.style.strokeDashoffset = circumference;
            setTimeout(() => {
                progressCircle.style.strokeDashoffset = "0";
            }, 100);
            let angle = 0;
            const dotAnimationDuration = 4000;
            const totalSteps = dotAnimationDuration / (1000 / 60);
            const angleIncrement = 360 / totalSteps;
            let currentStep = 0;
            cancelAnimationFrame(dotAnimationId);
            function animateDot() {
                if (currentStep < totalSteps) {
                    angle = (angle + angleIncrement) % 360;
                    const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180);
                    const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180);
                    progressDot.setAttribute('cx', x);
                    progressDot.setAttribute('cy', y);
                    currentStep++;
                    dotAnimationId = requestAnimationFrame(animateDot);
                } else {
                    angle = 0;
                    currentStep = 0;
                    dotAnimationId = requestAnimationFrame(animateDot);
                }
            }
            animateDot();
        };
        const numberCounters = document.querySelectorAll('.production-visual-content .stat-number');
        const animateCounter = (el) => {
            const target = +el.dataset.target;
            const duration = 2000;
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                el.textContent = Math.floor(progress * target).toLocaleString('ru-RU');
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        };
        const circleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!entry.target.dataset.animated) {
                        animateCircleAndDot();
                        numberCounters.forEach(counter => {
                           if(counter.closest('#main-circle-stat') || counter.closest('.stat-circle-small') || counter.closest('.stat-circle-medium')) {
                               if(!counter.dataset.animated) {
                                   animateCounter(counter);
                                   counter.dataset.animated = "true";
                               }
                           }
                        });
                        entry.target.dataset.animated = "true"; 
                    }
                }
            });
        }, { threshold: 0.5 }); 
        circleObserver.observe(mainCircleStat);
    }

    const mainVimeoPlayer = document.getElementById('main-vimeo-player');
    const videoThumbnails = document.querySelectorAll('.video-thumbnail-item');
    if (mainVimeoPlayer && videoThumbnails.length > 0) {
        videoThumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const vimeoId = this.dataset.vimeoId;
                if (vimeoId) {
                    mainVimeoPlayer.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=0&muted=0&title=0&byline=0&portrait=0`;
                }
            });
        });
    }

    const teamPhotosContainer = document.getElementById('team-photos-container');
    if (teamPhotosContainer) {
        const numberOfPhotos = 10;
        const photoSizeMin = 120;
        const photoSizeMax = 220;
        teamPhotosContainer.innerHTML = ''; 
        let existingPhotoPositions = [];

        let containerWidth = teamPhotosContainer.offsetWidth;
        let containerHeight = teamPhotosContainer.offsetHeight;
        const parentVisualContent = teamPhotosContainer.closest('.team-visual-content');

        if (containerWidth === 0 || containerHeight === 0) {
            if (parentVisualContent) {
                containerWidth = parentVisualContent.offsetWidth;
                containerHeight = parentVisualContent.offsetHeight;
            }
            if (containerWidth === 0) {
                containerWidth = Math.max(300, window.innerWidth * 0.7); 
            }
            if (containerHeight === 0) {
                containerHeight = Math.max(300, window.innerHeight * 0.5); 
            }
        }

        for (let i = 0; i < numberOfPhotos; i++) {
            const photoEl = document.createElement('div');
            photoEl.className = 'team-photo-item animate-on-scroll';
            const img = document.createElement('img');
            
            let currentPhotoSizeMin = photoSizeMin;
            let currentPhotoSizeMax = photoSizeMax;
            if (containerWidth < 400) { 
                currentPhotoSizeMin = 80;
                currentPhotoSizeMax = 150;
            }

            const randomWidth = Math.floor(Math.random() * (currentPhotoSizeMax - currentPhotoSizeMin + 1) + currentPhotoSizeMin);
            const randomHeight = Math.floor(randomWidth * (Math.random() * 0.4 + 1.05));
            img.src = `https://via.placeholder.com/${randomWidth}x${randomHeight}.png/e0e0e0/a0a0a0?text=Сотрудник+${i + 1}`;
            photoEl.appendChild(img);
            
            let x, y, overlap;
            let attempts = 0;
            const maxAttempts = 30; 
            const paddingBetweenPhotos = 10;

            do {
                overlap = false;
                x = Math.random() * Math.max(0, (containerWidth - randomWidth - paddingBetweenPhotos * 2)) + paddingBetweenPhotos;
                y = Math.random() * Math.max(0, (containerHeight - randomHeight - paddingBetweenPhotos * 2)) + paddingBetweenPhotos;
                
                x = Math.max(paddingBetweenPhotos, Math.min(x, containerWidth - randomWidth - paddingBetweenPhotos));
                y = Math.max(paddingBetweenPhotos, Math.min(y, containerHeight - randomHeight - paddingBetweenPhotos));


                for (const pos of existingPhotoPositions) {
                    if (x < pos.x + pos.w + paddingBetweenPhotos && 
                        x + randomWidth + paddingBetweenPhotos > pos.x && 
                        y < pos.y + pos.h + paddingBetweenPhotos && 
                        y + randomHeight + paddingBetweenPhotos > pos.y) {
                        overlap = true;
                        break;
                    }
                }
                attempts++;
            } while (overlap && attempts < maxAttempts);
            
            existingPhotoPositions.push({ x: x, y: y, w: randomWidth, h: randomHeight });

            photoEl.style.width = `${randomWidth}px`;
            photoEl.style.height = `${randomHeight}px`;
            photoEl.style.left = `${x}px`;
            photoEl.style.top = `${y}px`;
            photoEl.style.animationDelay = `${0.5 + Math.random() * 2.5}s`; 
            photoEl.style.animationDuration = `${20 + Math.random() * 15}s`;
            photoEl.style.zIndex = Math.floor(Math.random() * numberOfPhotos) + 1;
            
            teamPhotosContainer.appendChild(photoEl);
        }
        const newAnimatedTeamPhotos = teamPhotosContainer.querySelectorAll('.team-photo-item.animate-on-scroll');
        const teamObserver = new IntersectionObserver(observerCallback, observerOptions);
        newAnimatedTeamPhotos.forEach(el => teamObserver.observe(el));
    }
    
    const mainAwardsData = [
        { title: "Лауреат конкурса POPAI <br>AWARDS 2019-2024", description: "Проекты-победители: Елка Swarovski, Бар Johnnie Walker, Оформление витрин Dior Christmas, Фотозона в бутике Dior, Baby Dior и др.", image: "https://via.placeholder.com/280x280.png/4A90E2/fff?text=POPAI" },
        { title: "Лауреат конкурса ZHAK <br>2014-2024", description: "Проекты-победители: Инсталляция для Универсама “Верный”, Оформление магазинов Ивлев шеф, Вагон метро Monochrome в ТЦ ЦУМ и др.", image: "https://via.placeholder.com/280x280.png/50E3C2/333?text=ZHAK" },
        { title: "Лауреат конкурса Полный <br>АУТ", description: "Проекты-победители: Елка Swarovski", image: "https://via.placeholder.com/280x280.png/F5A623/333?text=АУТ" }
    ];

    const mainAwardSlidesContainer = document.getElementById('main-award-slides-container');
    if (mainAwardSlidesContainer) {
        mainAwardsData.forEach(award => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide main-award-slide'; 
            slide.innerHTML = `
                <div class="main-award-image">
                    <img src="${award.image}" alt="${award.title.replace(/<br\s*\/?>/gi, ' ')}">
                </div>
                <div class="main-award-text">
                    <h3>${award.title}</h3>
                    <p>${award.description}</p>
                </div>
            `;
            mainAwardSlidesContainer.appendChild(slide);
        });
    }
    
    if (typeof Swiper !== 'undefined') {
        const mainAwardSwiperEl = document.getElementById('main-award-swiper-container');
        if (mainAwardSwiperEl) {
            new Swiper(mainAwardSwiperEl, {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                navigation: {
                    nextEl: '#main-award-next',
                    prevEl: '#main-award-prev',
                },
                autoplay: {
                    delay: 5500,
                    disableOnInteraction: true,
                },
                observer: true, 
                observeParents: true, 
            });
        }

    const clientsSwiperContainer = document.getElementById('clients-swiper-container');
        if (clientsSwiperContainer) {
             new Swiper(clientsSwiperContainer, {
                loop: true,
                slidesPerView: 'auto', 
                spaceBetween: 25,      
                centeredSlides: false, 
                autoplay: {
                    delay: 0, 
                    disableOnInteraction: false, 
                    pauseOnMouseEnter: true,     
                },
                speed: 8000, 
                allowTouchMove: false, 
                observer: true, 
                observeParents: true,
                freeMode: true, 
                freeModeMomentum: false, 
             });
        }
    } else {
        console.warn('Swiper library is not loaded. Sliders will not function.');
    }

    const partnerLettersData = [
        { id: 'x5', name: 'X5 RETAIL GROUP', image: 'https://i.imgur.com/s0nFHtP.png' }, 
        { id: 'tsum', name: 'ЦУМ', image: 'https://via.placeholder.com/600x850/ffffff/cccccc?text=Письмо+ЦУМ' },
        { id: 'avangard', name: 'АВАНГАРД', image: 'https://via.placeholder.com/600x850/ffffff/cccccc?text=Письмо+АВАНГАРД' },
        { id: 'fhr', name: 'ФХР', image: 'https://via.placeholder.com/600x850/ffffff/cccccc?text=Письмо+ФХР' },
        { id: 'familia', name: 'ФАМИЛИЯ', image: 'https://via.placeholder.com/600x850/ffffff/cccccc?text=Письмо+ФАМИЛИЯ' },
    ];

    const letterImageColumn = document.getElementById('letter-image-column');
    const partnerNamesColumn = document.getElementById('partner-names-column');
    let currentPartnerIndex = 0;

    function displayPartnerLetter(index) {
        if (!letterImageColumn || !partnerNamesColumn || !partnerLettersData[index]) return;
        const partner = partnerLettersData[index];
        const nameItems = partnerNamesColumn.querySelectorAll('.partner-name-item');
        nameItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        const newImage = document.createElement('img');
        newImage.src = partner.image;
        newImage.alt = `Письмо от ${partner.name}`;
        const activeImage = letterImageColumn.querySelector('img.active');
        if (activeImage) {
            activeImage.classList.remove('active');
            activeImage.classList.add('previous');
             setTimeout(() => {
                if (activeImage.parentNode && activeImage.classList.contains('previous')) {
                     activeImage.remove();
                }
            }, 500); 
        }
        letterImageColumn.appendChild(newImage);
        setTimeout(() => {
            newImage.classList.add('active');
        }, 20); 
        currentPartnerIndex = index;
    }

    if (partnerNamesColumn && letterImageColumn) {
        partnerNamesColumn.innerHTML = ''; 
        partnerLettersData.forEach((partner, index) => {
            const nameItem = document.createElement('div');
            nameItem.className = 'partner-name-item';
            nameItem.textContent = partner.name;
            nameItem.dataset.index = String(index);
            nameItem.addEventListener('click', () => {
                displayPartnerLetter(index);
            });
            partnerNamesColumn.appendChild(nameItem);
        });
        if (partnerLettersData.length > 0) {
            const initialImageInHtml = document.getElementById('current-letter-image');
            if(initialImageInHtml && initialImageInHtml.parentNode === letterImageColumn) {
                 letterImageColumn.innerHTML = '';
            }
            displayPartnerLetter(0); 
        }
    }

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "#top" || (this.classList.contains('scroll-to-top-btn') && targetId === "#site-header")) {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                let headerOffset = 0;
                const fixedHeader = document.getElementById('site-header');
                if (fixedHeader && getComputedStyle(fixedHeader).position === 'fixed') {
                    headerOffset = fixedHeader.offsetHeight;
                }
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                if (mainNavMenu && mainNavMenu.classList.contains('active') && this.closest('#main-navigation-menu')) {
                    mainNavMenu.classList.remove('active');
                    if(burgerMenu) {
                        burgerMenu.classList.remove('active');
                        burgerMenu.setAttribute('aria-expanded', 'false');
                    }
                    document.body.style.overflow = ''; 
                }
            }
        });
    });
    
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    function openModal(modalElement) {
        if (modalElement) {
            modalElement.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    function setupModal(modalId, openBtnIdOrIds, closeBtnId, formId, phoneFieldsConfig) {
        const modalElement = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeBtnId);
        const formElement = document.getElementById(formId);

        if (typeof openBtnIdOrIds === 'string') {
            const openBtn = document.getElementById(openBtnIdOrIds);
            if (openBtn) {
                openBtn.addEventListener('click', () => {
                    openModal(modalElement);
                    if (phoneFieldsConfig && phoneFieldsConfig.countryCodeSelect && phoneFieldsConfig.phoneInput) {
                        setPhonePlaceholderAndClear(phoneFieldsConfig.countryCodeSelect, phoneFieldsConfig.phoneInput);
                    }
                });
            }
        } else if (Array.isArray(openBtnIdOrIds)) { 
            openBtnIdOrIds.forEach(btnId => {
                const openBtn = document.getElementById(btnId);
                if (openBtn) {
                    openBtn.addEventListener('click', () => {
                        openModal(modalElement);
                        if (phoneFieldsConfig && phoneFieldsConfig.countryCodeSelect && phoneFieldsConfig.phoneInput) {
                            setPhonePlaceholderAndClear(phoneFieldsConfig.countryCodeSelect, phoneFieldsConfig.phoneInput);
                        }
                        if (modalId === 'calculate-cost-modal') {
                            if(formElement) formElement.reset(); 
                            attachedFiles = []; 
                            updateFileListUI();
                            updateFileUploadInfo();
                            const fileInputElem = document.getElementById('calc-modal-files');
                            if(fileInputElem) fileInputElem.value = '';
                            const charCounterElem = document.getElementById('calc-details-char-counter');
                            if(charCounterElem) charCounterElem.textContent = '0 / 300';
                            
                            const modalContent = modalElement.querySelector('.modal-content');
                            if(modalContent) {
                                reinitializeCalcFormElements(modalContent); 
                            }
                        }
                    });
                }
            });
        }

        if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modalElement));
        if (modalElement) {
            modalElement.addEventListener('click', (event) => {
                if (event.target === modalElement) closeModal(modalElement);
            });
        }
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modalElement && modalElement.classList.contains('show')) {
                closeModal(modalElement);
            }
        });
        return { modalElement, formElement };
    }
    
    function setPhonePlaceholderAndClear(countryCodeSelectElem, phoneInputElem) {
        if (countryCodeSelectElem && phoneInputElem) {
            const selectedOption = countryCodeSelectElem.options[countryCodeSelectElem.selectedIndex];
            phoneInputElem.placeholder = selectedOption.dataset.placeholder || '(XXX) XXX-XX-XX';
            phoneInputElem.value = ''; 
        }
    }

    function handlePhoneInput(e, countryCodeSelectElem) {
        let input = e.target;
        let value = input.value.replace(/\D/g, ''); 
        const selectedOption = countryCodeSelectElem.options[countryCodeSelectElem.selectedIndex];
        const countryCodeValue = selectedOption.value;
        
        let maxLength = 10; 
        if (countryCodeValue === '+375') { 
            maxLength = 9; 
        }
        value = value.substring(0, maxLength); 
        let formattedValue = "";

        if (countryCodeValue === '+7' || countryCodeValue === '+77') { 
            if (value.length > 0) formattedValue += "(" + value.substring(0, Math.min(3, value.length));
            if (value.length >= 3) formattedValue += ") ";
            if (value.length > 3) formattedValue += value.substring(3, Math.min(6, value.length));
            if (value.length >= 6) formattedValue += "-";
            if (value.length > 6) formattedValue += value.substring(6, Math.min(8, value.length));
            if (value.length >= 8) formattedValue += "-";
            if (value.length > 8) formattedValue += value.substring(8, Math.min(10, value.length));
        } else if (countryCodeValue === '+375') { 
            if (value.length > 0) formattedValue += "(" + value.substring(0, Math.min(2, value.length));
            if (value.length >= 2) formattedValue += ") ";
            if (value.length > 2) formattedValue += value.substring(2, Math.min(5, value.length));
            if (value.length >= 5) formattedValue += "-";
            if (value.length > 5) formattedValue += value.substring(5, Math.min(7, value.length));
            if (value.length >= 7) formattedValue += "-";
            if (value.length > 7) formattedValue += value.substring(7, Math.min(9, value.length));
        } else {
            formattedValue = value; 
        }
        input.value = formattedValue;
    }

    function handlePhoneKeyDown(e, countryCodeSelectElem) {
        const isDigit = e.key >= '0' && e.key <= '9';
        const isControlKey = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key);
        const isCtrlCmdAction = (e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase());
        
        let currentDigits = e.target.value.replace(/\D/g, '').length;
        const selectedOption = countryCodeSelectElem.options[countryCodeSelectElem.selectedIndex];
        const countryCodeValue = selectedOption.value;
        let maxLength = 10;
        if (countryCodeValue === '+375') maxLength = 9;

        if (isDigit && currentDigits >= maxLength && e.target.selectionStart === e.target.selectionEnd) {
            e.preventDefault(); return;
        }
        if (isDigit || isControlKey || isCtrlCmdAction) return; 
        e.preventDefault(); 
    }
    
    function showFormSubmissionResult(modalContentElement, success, message, originalHTMLToRestore, closeCallback) {
        modalContentElement.innerHTML = `
            <button class="modal-close-btn" id="close-result-message-btn" aria-label="Закрыть">×</button>
            <h3 class="modal-title" style="color: ${success ? '#76c776' : '#ff6b6b'};">${success ? 'Успешно!' : 'Ошибка!'}</h3>
            <p class="modal-subtitle">${message}</p>
            <button type="button" class="modal-submit-btn" id="ok-result-message-btn">${success ? 'Отлично' : 'Понятно'}</button>
        `;
        const closeResultBtn = modalContentElement.querySelector('#close-result-message-btn');
        const okResultBtn = modalContentElement.querySelector('#ok-result-message-btn');

        const restoreFormAndClose = () => {
            modalContentElement.innerHTML = originalHTMLToRestore;
            closeCallback(true, modalContentElement); 
        };
        if(closeResultBtn) closeResultBtn.addEventListener('click', restoreFormAndClose);
        if(okResultBtn) okResultBtn.addEventListener('click', restoreFormAndClose);
    }

    const contactModalConfig = {
        modalId: 'contact-modal',
        openBtnId: 'open-contact-modal-btn',
        closeBtnId: 'close-contact-modal-btn',
        formId: 'contact-modal-form',
        phoneFields: {
            countryCodeSelect: document.getElementById('modal-country-code'),
            phoneInput: document.getElementById('modal-phone')
        }
    };
    
    const { modalElement: contactModalElem, formElement: contactModalFormElem } = setupModal(
        contactModalConfig.modalId,
        contactModalConfig.openBtnId,
        contactModalConfig.closeBtnId,
        contactModalConfig.formId,
        contactModalConfig.phoneFields
    );
    
    if (contactModalConfig.phoneFields.countryCodeSelect && contactModalConfig.phoneFields.phoneInput) {
        contactModalConfig.phoneFields.countryCodeSelect.addEventListener('change', () => setPhonePlaceholderAndClear(contactModalConfig.phoneFields.countryCodeSelect, contactModalConfig.phoneFields.phoneInput));
        contactModalConfig.phoneFields.phoneInput.addEventListener('input', (e) => handlePhoneInput(e, contactModalConfig.phoneFields.countryCodeSelect));
        contactModalConfig.phoneFields.phoneInput.addEventListener('keydown', (e) => handlePhoneKeyDown(e, contactModalConfig.phoneFields.countryCodeSelect));
    }

    let originalContactFormHTML = '';
    if (contactModalFormElem) {
        originalContactFormHTML = contactModalFormElem.closest('.modal-content').innerHTML;
        
        const contactFormSubmitHandler = async function(event) {
            event.preventDefault(); 

            const agreementCheckbox = document.getElementById('modal-agree'); 
            if (!agreementCheckbox.checked) {
                const modalContent = this.closest('.modal-content');
                if (modalContent) {
                    showFormSubmissionResult(
                       modalContent,
                       false, 
                       'Необходимо согласие на обработку персональных данных.',
                       originalContactFormHTML, 
                       (shouldReInit, restoredContentEl) => { 
                            if (shouldReInit && restoredContentEl) reinitializeContactFormElements(restoredContentEl);
                       }
                   );
                } else {
                  alert('Необходимо согласие на обработку персональных данных.');
                }
                return; 
            }

            const currentForm = this;
            const submitButton = currentForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Отправка...';
            submitButton.disabled = true;

            const formData = new FormData(currentForm);
            const phoneContactInput = document.getElementById('modal-phone');
            if (phoneContactInput && phoneContactInput.value) {
                formData.set('phone', phoneContactInput.value.replace(/\D/g, ''));
            }
            if (agreementCheckbox.checked) {
                formData.set('agreement', 'on');
            }
            
            try {
                const response = await fetch('http://localhost:5000/api/submit_callback', { 
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();

                if (response.ok) {
                    showFormSubmissionResult(
                        currentForm.closest('.modal-content'), 
                        true, 
                        result.message || 'Спасибо! Ваша заявка принята. Мы скоро свяжемся с вами.',
                        originalContactFormHTML,
                        (shouldReInit, restoredContentEl) => {
                            closeModal(contactModalElem);
                            if (shouldReInit && restoredContentEl) reinitializeContactFormElements(restoredContentEl);
                        }
                    );
                    currentForm.reset(); 
                    setPhonePlaceholderAndClear(contactModalConfig.phoneFields.countryCodeSelect, contactModalConfig.phoneFields.phoneInput);
                } else {
                    throw new Error(result.error || 'Ошибка при отправке формы "Свяжитесь со мной".');
                }
            } catch (error) {
                console.error('Ошибка отправки формы "Свяжитесь со мной":', error);
                 showFormSubmissionResult(
                    currentForm.closest('.modal-content'),
                    false,
                    error.message || 'Произошла ошибка. Пожалуйста, попробуйте еще раз.',
                    originalContactFormHTML,
                     (shouldReInit, restoredContentEl) => { 
                        if (shouldReInit && restoredContentEl) reinitializeContactFormElements(restoredContentEl);
                     }
                );
            } finally {
                 if (submitButton) { 
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                 }
            }
        };
        contactModalFormElem.onsubmit = contactFormSubmitHandler;
    }


    const MAX_FILES_COUNT = 3;
    const MAX_TOTAL_SIZE_MB = 4.5; 
    const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;
    const ALLOWED_EXTENSIONS_CALC = ['pdf', 'xlsx', 'xls', 'doc', 'docx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'zip', 'rar'];
    let attachedFiles = []; 

    const calculateCostModalConfig = {
        modalId: 'calculate-cost-modal',
        openBtnIds: ['header-calculate-cost-btn', 'footer-calculate-cost-btn'], 
        closeBtnId: 'close-calculate-cost-modal-btn',
        formId: 'calculate-cost-modal-form',
        phoneFields: {
            countryCodeSelect: document.getElementById('calc-modal-country-code'),
            phoneInput: document.getElementById('calc-modal-phone')
        }
    };

    const { modalElement: calcModalElem, formElement: calcModalFormElem } = setupModal(
        calculateCostModalConfig.modalId,
        calculateCostModalConfig.openBtnIds, 
        calculateCostModalConfig.closeBtnId,
        calculateCostModalConfig.formId,
        calculateCostModalConfig.phoneFields
    );
    
    if (calculateCostModalConfig.phoneFields.countryCodeSelect && calculateCostModalConfig.phoneFields.phoneInput) {
        calculateCostModalConfig.phoneFields.countryCodeSelect.addEventListener('change', () => setPhonePlaceholderAndClear(calculateCostModalConfig.phoneFields.countryCodeSelect, calculateCostModalConfig.phoneFields.phoneInput));
        calculateCostModalConfig.phoneFields.phoneInput.addEventListener('input', (e) => handlePhoneInput(e, calculateCostModalConfig.phoneFields.countryCodeSelect));
        calculateCostModalConfig.phoneFields.phoneInput.addEventListener('keydown', (e) => handlePhoneKeyDown(e, calculateCostModalConfig.phoneFields.countryCodeSelect));
    }

    const calcDetailsTextarea = document.getElementById('calc-modal-details');
    const calcCharCounter = document.getElementById('calc-details-char-counter');
    if (calcDetailsTextarea && calcCharCounter) {
        calcDetailsTextarea.addEventListener('input', () => {
            const currentLength = calcDetailsTextarea.value.length;
            calcCharCounter.textContent = `${currentLength} / 300`;
        });
    }


    function handleFiles(files) {
        let currentTotalSize = attachedFiles.reduce((sum, f) => sum + f.size, 0);
        const localFileInput = document.getElementById('calc-modal-files'); 

        for (const file of files) {
            if (attachedFiles.length >= MAX_FILES_COUNT) {
                alert(`Можно прикрепить не более ${MAX_FILES_COUNT} файлов. Файл "${file.name}" не будет добавлен.`);
                break; 
            }
            const extension = file.name.split('.').pop().toLowerCase();
            if (!ALLOWED_EXTENSIONS_CALC.includes(extension)) {
                alert(`Файл "${file.name}" имеет недопустимое расширение. Разрешены: ${ALLOWED_EXTENSIONS_CALC.join(', ')}`);
                continue;
            }
            if (currentTotalSize + file.size > MAX_TOTAL_SIZE_BYTES) {
                alert(`Файл "${file.name}" слишком большой или превышен суммарный лимит (${MAX_TOTAL_SIZE_MB}MB).`);
                continue; 
            }
            if (attachedFiles.some(f => f.name === file.name && f.size === file.size)) {
                alert(`Файл с именем "${file.name}" уже добавлен.`);
                continue;
            }

            attachedFiles.push(file);
            currentTotalSize += file.size;
        }
        updateFileListUI();
        updateFileUploadInfo();
        if (localFileInput) localFileInput.value = null; 
    }

    function updateFileListUI() {
        const localFileListUI = document.getElementById('calc-file-list'); 
        if (!localFileListUI) {
            return;
        }
        
        localFileListUI.innerHTML = ''; 
        attachedFiles.forEach((file, index) => {
            const listItem = document.createElement('div');
            listItem.className = 'file-list-item';
            listItem.innerHTML = `
                <span class="file-name">${file.name}</span>
                <span class="file-size">(${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                <button type="button" class="remove-file-btn" data-index="${index}" aria-label="Удалить файл">×</button>
            `;
            localFileListUI.appendChild(listItem); 
        });

        const removeButtons = localFileListUI.querySelectorAll('.remove-file-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToRemove = parseInt(e.target.dataset.index);
                attachedFiles.splice(indexToRemove, 1);
                updateFileListUI(); 
                updateFileUploadInfo();
            });
        });
    }
    
    function updateFileUploadInfo() {
        const localFileUploadInfoUI = document.getElementById('calc-file-upload-info');
        const localFileCountInfoUI = document.getElementById('calc-file-count-info');
        const localFileSizeInfoUI = document.getElementById('calc-file-size-info');

        if (!localFileUploadInfoUI || !localFileCountInfoUI || !localFileSizeInfoUI) {
            return;
        }
        if (attachedFiles.length > 0) {
            localFileUploadInfoUI.style.display = 'block';
            localFileCountInfoUI.textContent = `Файлов: ${attachedFiles.length}/${MAX_FILES_COUNT}`;
            const totalSize = attachedFiles.reduce((sum, f) => sum + f.size, 0);
            localFileSizeInfoUI.textContent = `Общий размер: ${(totalSize / 1024 / 1024).toFixed(2)}MB / ${MAX_TOTAL_SIZE_MB}MB`;
            if (totalSize > MAX_TOTAL_SIZE_BYTES) {
                localFileSizeInfoUI.classList.add('error');
                localFileSizeInfoUI.classList.remove('success');
            } else {
                localFileSizeInfoUI.classList.remove('error');
                localFileSizeInfoUI.classList.add('success');
            }
        } else {
            localFileUploadInfoUI.style.display = 'none';
        }
    }

    function reinitializeCalcFormElements(modalContentElement) {
        const restoredForm = modalContentElement.querySelector('#' + calculateCostModalConfig.formId);
        const restoredCountrySelect = modalContentElement.querySelector('#' + calculateCostModalConfig.phoneFields.countryCodeSelect.id);
        const restoredPhoneInput = modalContentElement.querySelector('#' + calculateCostModalConfig.phoneFields.phoneInput.id);
        const restoredCloseBtn = modalContentElement.querySelector('#' + calculateCostModalConfig.closeBtnId);
        const restoredDetailsTextarea = modalContentElement.querySelector('#calc-modal-details');
        const restoredCharCounter = modalContentElement.querySelector('#calc-details-char-counter');
        const restoredFileInput = modalContentElement.querySelector('#calc-modal-files');
        const restoredDropArea = modalContentElement.querySelector('#calc-file-drop-area');
        
        if (restoredForm && calcModalFormElem && calcModalFormElem.onsubmit) { 
             restoredForm.onsubmit = calcModalFormElem.onsubmit; 
        }
        if (restoredCountrySelect && restoredPhoneInput) {
            restoredCountrySelect.onchange = () => setPhonePlaceholderAndClear(restoredCountrySelect, restoredPhoneInput);
            restoredPhoneInput.oninput = (e) => handlePhoneInput(e, restoredCountrySelect);
            restoredPhoneInput.onkeydown = (e) => handlePhoneKeyDown(e, restoredCountrySelect);
        }
        if (restoredCloseBtn && calcModalElem) { 
            restoredCloseBtn.onclick = () => closeModal(calcModalElem);
        }
        if (restoredDetailsTextarea && restoredCharCounter) {
            restoredDetailsTextarea.oninput = () => {
                restoredCharCounter.textContent = `${restoredDetailsTextarea.value.length} / 300`;
            };
        }
        if (restoredDropArea && restoredFileInput) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evName => restoredDropArea.addEventListener(evName, (e) => { e.preventDefault(); e.stopPropagation(); }));
            ['dragenter', 'dragover'].forEach(evName => restoredDropArea.addEventListener(evName, () => restoredDropArea.classList.add('dragover')));
            ['dragleave', 'drop'].forEach(evName => restoredDropArea.addEventListener(evName, () => restoredDropArea.classList.remove('dragover')));
            restoredDropArea.ondrop = (e) => { e.preventDefault(); e.stopPropagation(); handleFiles(e.dataTransfer.files); };
            restoredFileInput.onchange = (e) => handleFiles(e.target.files);
            restoredDropArea.onclick = (e) => {
                if (e.target === restoredDropArea || e.target.tagName === 'P' || e.target.classList.contains('file-input-label')) {
                    if(e.target.tagName !== 'LABEL') { restoredFileInput.click(); }
                }
            };
        }
        updateFileListUI(); 
        updateFileUploadInfo(); 
    }
    
    let originalCalcFormHTML = '';
    if (calcModalFormElem) {
        originalCalcFormHTML = calcModalFormElem.closest('.modal-content').innerHTML;
        const calcFormSubmitHandler = async function(event) { 
            event.preventDefault();
            
            const agreementCheckboxCalc = document.getElementById('calc-modal-agree');
            if (!agreementCheckboxCalc.checked) {
                 const modalContent = this.closest('.modal-content');
                 if (modalContent) {
                     showFormSubmissionResult(
                        modalContent,
                        false,
                        'Необходимо согласие на обработку персональных данных.',
                        originalCalcFormHTML, 
                        (shouldReInit, restoredContentEl) => { 
                            if (shouldReInit && restoredContentEl) reinitializeCalcFormElements(restoredContentEl);
                        }
                    );
                 } else {
                    alert('Необходимо согласие на обработку персональных данных.');
                 }
                 return;
            }

            const currentForm = this;
            const submitButton = currentForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Отправка...';
            submitButton.disabled = true;

            const formData = new FormData(); 
            formData.append('name', document.getElementById('calc-modal-name').value);
            formData.append('email', document.getElementById('calc-modal-email').value);
            const phoneCalcInput = document.getElementById('calc-modal-phone');
            const countryCodeCalcSelect = document.getElementById('calc-modal-country-code');
            if (phoneCalcInput && phoneCalcInput.value.replace(/\D/g, '').length > 0) {
                formData.append('phone_calc', phoneCalcInput.value.replace(/\D/g, ''));
                formData.append('country_code_calc', countryCodeCalcSelect.value);
            } else {
                formData.append('phone_calc', '');
                formData.append('country_code_calc', '');
            }
            formData.append('project_details', document.getElementById('calc-modal-details').value);
            if (agreementCheckboxCalc.checked) {
                formData.set('agreement', 'on');
            }
            
            attachedFiles.forEach((file) => {
                formData.append('project_files[]', file, file.name);
            });
            
            try {
                const response = await fetch('http://localhost:5000/api/calculate_project_cost', { 
                    method: 'POST',
                    body: formData, 
                });
                const result = await response.json();

                if (response.ok) {
                    showFormSubmissionResult(
                        currentForm.closest('.modal-content'),
                        true,
                        result.message || 'Заявка на расчет успешно отправлена! Мы скоро свяжемся с вами.',
                        originalCalcFormHTML,
                        (shouldReInit, restoredContentEl) => {
                            closeModal(calcModalElem); 
                            if (shouldReInit && restoredContentEl) {
                                reinitializeCalcFormElements(restoredContentEl);
                            }
                        }
                    );
                    currentForm.reset(); 
                    attachedFiles = [];
                    updateFileListUI(); 
                    updateFileUploadInfo(); 
                    if(document.getElementById('calc-modal-files')) document.getElementById('calc-modal-files').value = '';
                    if(document.getElementById('calc-details-char-counter')) document.getElementById('calc-details-char-counter').textContent = '0 / 300';
                    setPhonePlaceholderAndClear(calculateCostModalConfig.phoneFields.countryCodeSelect, calculateCostModalConfig.phoneFields.phoneInput);
                } else {
                    throw new Error(result.error || 'Ошибка при отправке формы.');
                }
            } catch (error) {
                console.error('Ошибка отправки формы расчета:', error);
                 showFormSubmissionResult(
                    currentForm.closest('.modal-content'),
                    false,
                    error.message || 'Произошла ошибка. Пожалуйста, попробуйте еще раз.',
                    originalCalcFormHTML,
                     (shouldReInit, restoredContentEl) => { 
                        if (shouldReInit && restoredContentEl) {
                            reinitializeCalcFormElements(restoredContentEl);
                        }
                    }
                );
            } finally {
                 if (submitButton) { 
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                 }
            }
        };
        calcModalFormElem.onsubmit = calcFormSubmitHandler; 
    }

    function reinitializeContactFormElements(modalContentElement) {
        const restoredForm = modalContentElement.querySelector('#' + contactModalConfig.formId);
        const restoredCountrySelect = modalContentElement.querySelector('#' + contactModalConfig.phoneFields.countryCodeSelect.id);
        const restoredPhoneInput = modalContentElement.querySelector('#' + contactModalConfig.phoneFields.phoneInput.id);
        const restoredCloseBtn = modalContentElement.querySelector('#' + contactModalConfig.closeBtnId);
        
        if (restoredForm && contactModalFormElem && contactModalFormElem.onsubmit) {
            restoredForm.onsubmit = contactModalFormElem.onsubmit;
        }
        if (restoredCountrySelect && restoredPhoneInput) {
            restoredCountrySelect.onchange = () => setPhonePlaceholderAndClear(restoredCountrySelect, restoredPhoneInput);
            restoredPhoneInput.oninput = (e) => handlePhoneInput(e, restoredCountrySelect);
            restoredPhoneInput.onkeydown = (e) => handlePhoneKeyDown(e, restoredCountrySelect);
        }
        if (restoredCloseBtn && contactModalElem) {
            restoredCloseBtn.onclick = () => closeModal(contactModalElem);
        }
    }
});
