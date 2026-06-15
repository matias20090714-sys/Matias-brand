document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================
    // Header Scroll State
    // ==========================================
    const header = document.getElementById('header');
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once in case page was reloaded down the screen

    // ==========================================
    // Mobile Menu Navigation
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Toggle hamburger menu visual state
            const bars = navToggle.querySelectorAll('.bar');
            if (navMenu.classList.contains('open')) {
                bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navToggle.click();
            }
        });
    });

    // ==========================================
    // Active Link ScrollSpy
    // ==========================================
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollSpy = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset header
            const sectionId = current.getAttribute('id');
            
            // Special handling for hero section which starts at top
            if (sectionId === 'hero' && scrollY < 300) {
                document.querySelector('.nav-list a[href="#"]').classList.add('active');
                return;
            }

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Find matching link
                const link = document.querySelector(`.nav-list a[href*=${sectionId}]`);
                if (link) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    };
    window.addEventListener('scroll', scrollSpy);

    // ==========================================
    // FAQ Accordion
    // ==========================================
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const faqItem = trigger.parentElement;
            const faqContent = faqItem.querySelector('.faq-content');
            const isActive = faqItem.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-content').style.maxHeight = null;
                item.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
            });

            // If it wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
                faqContent.style.maxHeight = faqContent.scrollHeight + "px";
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ==========================================
    // Contact Form Redirection to WhatsApp
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form inputs
            const name = document.getElementById('name').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation check
            if (!name || !whatsapp || !email || !message) {
                alert('Por favor, completa todos los campos del formulario.');
                return;
            }
            
            // Format WhatsApp Message
            const waNumber = '59892707489';
            const baseText = `Hola Matías, te dejo mis datos desde la página web:\n\n` + 
                             `*Nombre:* ${name}\n` +
                             `*WhatsApp:* ${whatsapp}\n` +
                             `*Email:* ${email}\n` +
                             `*Mensaje:* ${message}`;
            
            const encodedText = encodeURIComponent(baseText);
            const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;
            
            // Open in new tab/window
            window.open(waUrl, '_blank');
            
            // Reset form and show success message
            contactForm.reset();
            
            // Custom modern success toast (simulated with standard alert for simplicity, but could be enhanced)
            alert('¡Gracias! Serás redirigido a WhatsApp para enviar tus datos directamente a Matías.');
        });
    }

    // ==========================================
    // Intersection Observer for Scroll Animations
    // ==========================================
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        animationObserver.observe(element);
    });
});
