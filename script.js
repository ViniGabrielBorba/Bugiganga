// Carousel de Depoimentos
document.addEventListener('DOMContentLoaded', function() {
    const depoimentos = document.querySelectorAll('.depoimento-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let autoSlideInterval;

    // Função para mostrar slide específico
    function showSlide(index) {
        // Remove classe active de todos os slides e dots
        depoimentos.forEach(depoimento => depoimento.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Adiciona classe active ao slide e dot atual
        if (depoimentos[index]) {
            depoimentos[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        currentSlide = index;
    }

    // Função para próximo slide
    function nextSlide() {
        const next = (currentSlide + 1) % depoimentos.length;
        showSlide(next);
        resetAutoSlide();
    }

    // Função para slide anterior
    function prevSlide() {
        const prev = (currentSlide - 1 + depoimentos.length) % depoimentos.length;
        showSlide(prev);
        resetAutoSlide();
    }

    // Event listeners para botões
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Auto-slide a cada 5 segundos
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Inicia auto-slide
    startAutoSlide();

    // Pausa auto-slide ao passar o mouse sobre o carousel
    const carousel = document.querySelector('.depoimentos-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    // Smooth scroll para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de entrada ao scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observa elementos para animação
    const animateElements = document.querySelectorAll('.produto-card, .diferencial-card, .section-title');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

