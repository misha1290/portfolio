document.addEventListener('DOMContentLoaded', () => {

    // 1. Кастомный курсор
    const cursor = document.querySelector('.cursor');
        if (cursor) {
            document.body.classList.add('custom-cursor-active');
        }
    const hoverTargets = document.querySelectorAll('.hover-target, a, button');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        target.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // 2. Анимация появления при скролле (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 3. SPA Навигация (переключение страниц)
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Убираем активность со всех кнопок и страниц
            navButtons.forEach(b => b.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));

            // Активируем нужную
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetPage = document.getElementById(targetId);
            targetPage.classList.add('active');
            
            // Скролл наверх
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Перезапускаем анимации для новой страницы
            const pageReveals = targetPage.querySelectorAll('.reveal');
            pageReveals.forEach(r => {
                r.classList.remove('visible');
                setTimeout(() => r.classList.add('visible'), 50);
            });
        });
    });

    // 4. Фильтрация проектов
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.advanced-project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projects.forEach(project => {
                const categories = project.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    project.style.display = 'grid';
                    // Перезапуск анимации
                    project.classList.remove('visible');
                    setTimeout(() => project.classList.add('visible'), 50);
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
    // Логика мобильного меню
    const burgerMenu = document.getElementById('burger-menu');
    const mainNav = document.getElementById('main-nav');

    burgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    // Закрываем меню при клике на любую ссылку в нем (интегрируем в существующий код SPA)
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // ... (твой существующий код переключения страниц) ...
            
            // Добавляем закрытие мобильного меню:
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('open');
            }
        });
    });
});
