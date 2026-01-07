/* ============================================
   DOMINANDO O DIGITAL - JavaScript
   Interações e Animações
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Header Scroll Effect
    // ============================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Muda o ícone
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Fecha menu ao clicar num link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ============================================
    // FAQ Accordion
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fecha outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item clicado
            item.classList.toggle('active');
        });
    });

    // ============================================
    // Smooth Scroll para links âncora
    // ============================================
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

    // ============================================
    // Animação de entrada dos elementos
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll(
        '.module-card, .benefit-card, .testimonial-card, .faq-item, .section-header'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Classe CSS para animação
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);

    // ============================================
    // Contador animado para stats
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateStats = () => {
        if (statsAnimated) return;
        
        const heroSection = document.getElementById('inicio');
        const heroRect = heroSection.getBoundingClientRect();
        
        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const finalValue = stat.textContent;
                const isNumber = /^\d+/.test(finalValue);
                
                if (isNumber) {
                    const number = parseInt(finalValue);
                    const suffix = finalValue.replace(/\d+/, '');
                    let current = 0;
                    const increment = number / 30;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current) + suffix;
                    }, 50);
                }
            });
        }
    };

    window.addEventListener('scroll', animateStats);
    animateStats(); // Verifica na carga inicial

    // ============================================
    // Efeito de hover nos cards com parallax leve
    // ============================================
    const cards = document.querySelectorAll('.module-card, .pricing-card-main');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================================
    // Efeito de typing no título hero (opcional)
    // ============================================
    const addTypingEffect = () => {
        const gradientText = document.querySelector('.hero-content .gradient-text');
        if (!gradientText) return;
        
        const originalText = gradientText.textContent;
        gradientText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                gradientText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        
        // Inicia após um pequeno delay
        setTimeout(typeWriter, 500);
    };

    // Descomente a linha abaixo para ativar o efeito de typing
    // addTypingEffect();

    // ============================================
    // Lazy loading para imagens (se houver)
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // Botão WhatsApp - mostrar/esconder baseado no scroll
    // ============================================
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    if (whatsappBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                whatsappBtn.style.opacity = '1';
                whatsappBtn.style.visibility = 'visible';
            } else {
                whatsappBtn.style.opacity = '0.7';
            }
        });
    }

    // ============================================
    // Prevenir comportamento padrão em links de demo
    // ============================================
    const demoLinks = document.querySelectorAll('a[href="#"]');
    demoLinks.forEach(link => {
        if (!link.classList.contains('whatsapp-float')) {
            link.addEventListener('click', (e) => {
                // Permite scroll para seções
                if (link.getAttribute('href') === '#' && !link.closest('nav')) {
                    e.preventDefault();
                    // Aqui podemos adicionar um modal de "Em breve" ou redirecionar para WhatsApp
                    const whatsappUrl = 'https://wa.me/258?text=Olá!%20Quero%20saber%20mais%20sobre%20o%20curso%20Dominando%20o%20Digital';
                    window.open(whatsappUrl, '_blank');
                }
            });
        }
    });

    // ============================================
    // Console message
    // ============================================
    console.log('%c🚀 Dominando o Digital', 'font-size: 24px; font-weight: bold; color: #6366F1;');
    console.log('%cTransformando moçambicanos em profissionais digitais!', 'font-size: 14px; color: #EC4899;');

});

// ============================================
// Service Worker Registration (para PWA futuro)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('SW registrado'))
        //     .catch(err => console.log('SW falhou:', err));
    });
}
