// ========================================
// TRUJILLO - Animations Module
// ========================================

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = SCROLL_SETTINGS.revealPoint;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Add scroll-reveal class to sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach((section, index) => {
        section.classList.add('scroll-reveal');
        section.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ========================================
// MODULE CARDS & ANIMATIONS
// ========================================
function initAnimations() {
    // Module cards interactive
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
        });
    });
    
    // Problem cards animation
    const problemCards = document.querySelectorAll('.problem-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, OBSERVER_OPTIONS);
    
    problemCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
        observer.observe(card);
    });
    
    // Benefit cards stagger animation
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// ========================================
// COUNTER ANIMATION
// ========================================
function animateCounter(element, target, duration = ANIMATION_TIMING.counterDuration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Trigger counters on scroll
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    window.addEventListener('scroll', () => {
        if (!countersAnimated) {
            const heroSection = document.querySelector('.hero');
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollPosition = window.pageYOffset + window.innerHeight;
            
            if (scrollPosition > heroBottom - SCROLL_SETTINGS.counterTriggerOffset) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                countersAnimated = true;
            }
        }
    });
}

// ========================================
// COMPARISON TABLE ANIMATION
// ========================================
function initComparisonAnimation() {
    const comparisonRows = document.querySelectorAll('.comparison-row');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * ANIMATION_TIMING.staggerDelay);
            }
        });
    }, OBSERVER_OPTIONS_COMPARISON);
    
    comparisonRows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
        observer.observe(row);
    });
}

// ========================================
// TIME BAR ANIMATION
// ========================================
function initTimeBarAnimation() {
    const timeBars = document.querySelectorAll('.time-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentWidth = entry.target.style.width;
                entry.target.style.width = '0%';
                
                setTimeout(() => {
                    entry.target.style.width = currentWidth;
                }, 100);
            }
        });
    }, OBSERVER_OPTIONS_HIGH);
    
    timeBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ========================================
// AI CHAT DEMO TYPING EFFECT
// ========================================
function typeWriter(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(element, text, index + 1), ANIMATION_TIMING.typingSpeed);
    }
}

function initChatTyping() {
    const chatAI = document.querySelector('.chat-ai p');
    
    if (chatAI) {
        const originalText = chatAI.textContent;
        chatAI.textContent = '';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(chatAI, originalText, 0);
                    observer.unobserve(entry.target);
                }
            });
        }, OBSERVER_OPTIONS_HIGH);
        
        observer.observe(chatAI);
    }
}
