document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // MOBILE NAVIGATION MENU TOGGLE
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // ==========================================
    // SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================
    const animatedElements = document.querySelectorAll('[data-animate]');
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    } else {
        animatedElements.forEach(el => {
            el.classList.add('animated');
        });
    }

    // Fallback de seguridad: si pasados 1000ms algún elemento con [data-animate]
    // no se ha animado, se fuerza su visibilidad.
    setTimeout(() => {
        document.querySelectorAll('[data-animate]:not(.animated)').forEach(el => {
            el.classList.add('animated');
        });
    }, 1000);

    // ==========================================
    // INITIALIZE LUCIDE ICONS
    // ==========================================
    const renderIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };
    renderIcons();

});
