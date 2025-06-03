document.addEventListener('DOMContentLoaded', function() {
    const siteHeader = document.getElementById('site-header');
    const heroSliderSection = document.getElementById('hero-slider');
    const burgerMenu = document.getElementById('burger-menu');
    const mainNavMenu = document.getElementById('main-navigation-menu');

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

    function setDynamicPadding() {
        if (siteHeader && heroSliderSection) {
            const headerHeight = siteHeader.offsetHeight;
            heroSliderSection.style.paddingTop = `${headerHeight}px`;
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    window.addEventListener('resize', setDynamicPadding);
    setDynamicPadding();
    handleHeaderScroll();

    if (burgerMenu && mainNavMenu) {
        burgerMenu.addEventListener('click', function() {
            const isOpened = mainNavMenu.classList.toggle('active');
            burgerMenu.classList.toggle('active');
            burgerMenu.setAttribute('aria-expanded', String(isOpened));
        });
        const navLinks = mainNavMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNavMenu.classList.contains('active')) {
                    mainNavMenu.classList.remove('active');
                    burgerMenu.classList.remove('active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
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
                }
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNavMenu.classList.contains('active')) {
                mainNavMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
                burgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const slidesData = [
        { id: "naruzhnaya-reklama", label: "УСЛУГИ КОМПАНИИ", title: "Наружная реклама", description: "Яркие и эффективные решения для вашего бренда на улицах города.", image: "img/slide-naruzhnaya.jpg", tabName: "Наружная реклама" },
        { id: "oformlenie-vitrin", label: "УСЛУГИ КОМПАНИИ", title: "Оформление витрин", description: "Инсталляции, световые решения, объемные фигуры, буквы в витринах.", image: "img/slide-vitrin.jpg", tabName: "Оформление витрин" },
        { id: "magazino-stroenie", label: "УСЛУГИ КОМПАНИИ", title: "Магазино-строение", description: "Комплексные решения для открытия магазина: кассовые зоны, прилавки, витрины, торговые точки.", image: "img/slide-magazin.jpg", tabName: "Магазино-строение" },
        { id: "dizain-proekty", label: "УСЛУГИ КОМПАНИИ", title: "Дизайн-проекты", description: "Создание эксклюзивной дизайн-концепции, адаптация, ребрендинг.", image: "img/slide-dizain.jpg", tabName: "Дизайн-проекты" },
        { id: "navigatsiya", label: "УСЛУГИ КОМПАНИИ", title: "Навигация", description: "Внутренняя и внешняя рекламная навигация на любых носителях.", image: "img/slide-navigatsiya.jpg", tabName: "Навигация" },
        { id: "eksklyuzivnye-pop-up", label: "УСЛУГИ КОМПАНИИ", title: "Эксклюзивные pop-up", description: "Сложные функциональные брендированные зоны в торговом пространстве.", image: "img/slide-popup.jpg", tabName: "Эксклюзивные pop-up" },
        { id: "torgovye-prostranstva", label: "УСЛУГИ КОМПАНИИ", title: "Торговые пространства", description: "Комплексное брендирование магазинов, торговых центров, ресторанов, спортивных объектов.", image: "img/slide-torgovye.jpg", tabName: "Торговые пространства" },
        { id: "sportivnye-obekty", label: "УСЛУГИ КОМПАНИИ", title: "Спортивные объекты", description: "Рекламное оформление, брендирование, спонсорская реклама, навигация и прочее в спортивных объектах.", image: "img/slide-sport.jpg", tabName: "Спортивные объекты" }
    ];
    const slideLabelEl = document.getElementById('slide-services-label');
    const slideTitleEl = document.getElementById('slide-title');
    const slideDescriptionEl = document.getElementById('slide-description');
    const sliderImageColumn = document.querySelector('.slider-image-column');
    const textContentWrapper = document.querySelector('.slider-text-column .slide-content-wrapper');
    const prevArrow = document.getElementById('slider-arrow-prev');
    const nextArrow = document.getElementById('slider-arrow-next');
    const tabsContainer = document.getElementById('slider-tabs-container');
    let currentSlideIndex = slidesData.findIndex(s => s.id === "eksklyuzivnye-pop-up");
    if (currentSlideIndex === -1) currentSlideIndex = 0;
    let autoPlayInterval;
    const AUTOPLAY_DELAY = 7000;

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
                stopAutoPlay();
                startAutoPlay();
            });
        });
    }

    function updateSlide(index) {
        if (!slidesData[index] || !slideLabelEl || !slideTitleEl || !slideDescriptionEl || !textContentWrapper || !sliderImageColumn) {
            console.error("Slider elements not found or slide data missing for index:", index);
            return;
        }
        const slide = slidesData[index];
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
        const newImage = document.createElement('img');
        newImage.src = slide.image;
        newImage.alt = slide.title;
        const placeholderImg = document.getElementById('slide-image-placeholder');
        if (placeholderImg) placeholderImg.classList.remove('active');
        const currentActiveImage = sliderImageColumn.querySelector('img.active');
        if (currentActiveImage) {
            currentActiveImage.classList.remove('active');
        }
        sliderImageColumn.appendChild(newImage);
        setTimeout(() => {
            newImage.classList.add('active');
        }, 20);
        const allImages = sliderImageColumn.querySelectorAll('img');
        allImages.forEach(img => {
            if (img !== newImage && !img.classList.contains('active')) {
                setTimeout(() => {
                    if (img.parentNode) {
                        img.remove();
                    }
                }, 800);
            }
        });
        if (tabsContainer) {
            const tabs = tabsContainer.querySelectorAll('li');
            tabs.forEach((tab, i) => {
                if (i === index) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
        }
        currentSlideIndex = index;
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

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    if (slidesData.length > 0 && heroSliderSection) {
        generateTabs();
        updateSlide(currentSlideIndex);
        startAutoPlay();
        if (prevArrow && nextArrow) {
            prevArrow.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
            });
            nextArrow.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            });
        }
        heroSliderSection.addEventListener('mouseenter', stopAutoPlay);
        heroSliderSection.addEventListener('mouseleave', startAutoPlay);
    }

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
    
    if (filterBtns.length > 0) {
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
            }
        });
    };
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => observer.observe(el));

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
                    angle = (angle + angleIncrement);
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
                        numberCounters.forEach(animateCounter);
                        entry.target.dataset.animated = "true";
                    }
                }
            });
        }, { threshold: 0.5 });
        circleObserver.observe(mainCircleStat);
        document.querySelectorAll('.stat-circle-small, .stat-circle-medium').forEach(circle => {
            const smallCircleObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const numberEl = entry.target.querySelector('.stat-number');
                        if (numberEl && !numberEl.dataset.animated) {
                            animateCounter(numberEl);
                            numberEl.dataset.animated = "true";
                        }
                    }
                });
            }, { threshold: 0.5 });
            smallCircleObserver.observe(circle);
        });
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
        const photoSizeMin = 130; 
        const photoSizeMax = 230; 
        teamPhotosContainer.innerHTML = '';
        for (let i = 0; i < numberOfPhotos; i++) {
            const photoEl = document.createElement('div');
            photoEl.className = 'team-photo-item animate-on-scroll';
            photoEl.dataset.animationDelay = `${i * 0.08}s`;
            const img = document.createElement('img');
            const randomWidth = Math.floor(Math.random() * (photoSizeMax - photoSizeMin + 1) + photoSizeMin);
            const randomHeight = Math.floor(randomWidth * (Math.random() * 0.2 + 1.1));
            img.src = `https://via.placeholder.com/${randomWidth}x${randomHeight}.png/e0e0e0/a0a0a0?text=Сотрудник+${i + 1}`;
            photoEl.appendChild(img);
            
            let containerWidth = teamPhotosContainer.offsetWidth;
            let containerHeight = teamPhotosContainer.offsetHeight;
            if(containerWidth === 0 && containerHeight === 0) {
                containerWidth = 500; containerHeight = 500; 
            }

            let x, y, overlap;
            let attempts = 0;
            const maxAttempts = 50;
            const existingPhotos = teamPhotosContainer.querySelectorAll('.team-photo-item');

            do {
                overlap = false;
                x = Math.random() * (containerWidth - randomWidth * 1.1) + randomWidth * 0.05;
                y = Math.random() * (containerHeight - randomHeight * 1.1) + randomHeight * 0.05;
                
                for (const existingPhoto of existingPhotos) {
                    const ex = parseFloat(existingPhoto.style.left);
                    const ey = parseFloat(existingPhoto.style.top);
                    const ew = parseFloat(existingPhoto.style.width);
                    const eh = parseFloat(existingPhoto.style.height);
                    if (x < ex + ew && x + randomWidth > ex && y < ey + eh && y + randomHeight > ey) {
                        overlap = true;
                        break;
                    }
                }
                attempts++;
            } while (overlap && attempts < maxAttempts);

            photoEl.style.width = `${randomWidth}px`;
            photoEl.style.height = `${randomHeight}px`;
            photoEl.style.left = `${x}px`;
            photoEl.style.top = `${y}px`;
            photoEl.style.animationDelay = `${0.5 + Math.random() * 2.5}s`;
            photoEl.style.animationDuration = `${22 + Math.random() * 12}s`;
            photoEl.style.zIndex = Math.floor(Math.random() * 3) + 1;
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
                    delay: 2800,       
                    disableOnInteraction: false, 
                    pauseOnMouseEnter: true,     
                },
                navigation: {
                    nextEl: '#clients-swiper-next',
                    prevEl: '#clients-swiper-prev',
                },
                observer: true, 
                observeParents: true,
            });
        }
    } else {
        console.warn('Swiper library is not loaded. Sliders will not function.');
    }

    // Partner Letters Section
    const partnerLettersData = [
        { id: 'x5', name: 'X5 RETAIL GROUP', image: 'https://i.imgur.com/s0nFHtP.png' }, // Пример, замени на реальные пути
        { id: 'tsum', name: 'ЦУМ', image: 'https://via.placeholder.com/600x850/ffffff/cccccc?text=Письмо+ЦУМ' },
        { id: 'avangard', name: 'АВАНГАРД', image: 'https://via.placeholder.com/600x850/ffffff/cccccc?text=Письмо+АВАНГАРД' },
        { id: 'fhr', name: 'ФХР', image: 'https://via.placeholder.com/600x850/ffffff/cccccc?text=Письмо+ФХР' },
        { id: 'familia', name: 'ФАМИЛИЯ', image: 'https://via.placeholder.com/600x850/ffffff/cccccc?text=Письмо+ФАМИЛИЯ' },
    ];

    const letterImageColumn = document.getElementById('letter-image-column');
    const partnerNamesColumn = document.getElementById('partner-names-column');
    let currentLetterImage = document.getElementById('current-letter-image');
    let currentPartnerIndex = 0;

    function displayPartnerLetter(index) {
        if (!letterImageColumn || !partnerNamesColumn || !partnerLettersData[index]) return;

        const partner = partnerLettersData[index];

        // Update active name
        const nameItems = partnerNamesColumn.querySelectorAll('.partner-name-item');
        nameItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        // Create new image element for the new letter
        const newLetterImage = document.createElement('img');
        newLetterImage.src = partner.image;
        newLetterImage.alt = `Письмо от ${partner.name}`;
        
        // Animation: current image slides out, new image slides in
        if (currentLetterImage) {
            currentLetterImage.classList.remove('active');
            currentLetterImage.classList.add('previous'); // To slide it out
            // Remove the old 'previous' image after animation
            const oldPrevious = letterImageColumn.querySelector('img.previous:not(.active)');
            if(oldPrevious && oldPrevious !== currentLetterImage) {
                 setTimeout(() => { if(oldPrevious.parentNode) oldPrevious.remove(); }, 500);
            }
        }
        
        letterImageColumn.appendChild(newLetterImage);
        
        // Make the new image active after a short delay to allow CSS transition
        setTimeout(() => {
            newLetterImage.classList.add('active');
            // Remove the truly previous image (that just slid out)
            if(currentLetterImage && currentLetterImage !== newLetterImage && currentLetterImage.parentNode) {
                 setTimeout(() => { currentLetterImage.remove(); }, 500);
            }
            currentLetterImage = newLetterImage; // Update current image reference
        }, 20); // Small delay for transition trigger

        currentPartnerIndex = index;
    }

    if (partnerNamesColumn && letterImageColumn) {
        partnerLettersData.forEach((partner, index) => {
            const nameItem = document.createElement('div');
            nameItem.className = 'partner-name-item';
            nameItem.textContent = partner.name;
            nameItem.dataset.index = index;
            nameItem.addEventListener('click', () => {
                displayPartnerLetter(index);
            });
            partnerNamesColumn.appendChild(nameItem);
        });
        // Display the first letter initially
        if (partnerLettersData.length > 0) {
            displayPartnerLetter(0); 
            // Set placeholder for the first image directly if it's hardcoded in HTML
            const initialImage = document.getElementById('current-letter-image');
            if(initialImage) initialImage.src = partnerLettersData[0].image;

        }
    }
});
