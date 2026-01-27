// ========================================
// TRUJILLO - Interactions Module
// ========================================

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================
function initButtonRipple() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, ANIMATION_TIMING.rippleDuration);
        });
    });
}

// Add ripple animation CSS
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// PRICING CARDS HOVER
// ========================================
function initPricingCardsHover() {
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => {
                if (c !== this) {
                    c.style.opacity = '0.5';
                    c.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = 'scale(1)';
            });
        });
    });
}

// ========================================
// CONSOLE EASTER EGG
// ========================================
function initConsoleEasterEgg() {
    console.log('%c🚀 TRUJILLO ', 'color: #0066FF; font-size: 20px; font-weight: bold;');
    console.log('%cSistema Automatizado para Diseño de Instalaciones Domiciliarias', 'color: #00D9FF; font-size: 12px;');
    console.log('%c¿Interesado en el código? Visita nuestro sitio web', 'color: #9AA0B4; font-size: 10px;');
}
