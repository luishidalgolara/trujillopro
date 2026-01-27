// ========================================
// TRUJILLO - Premium Presentation JavaScript
// Modern, Interactive, Smooth
// ========================================

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initScrollReveal();
    initNavbar();
    initGalleryTabs();
    initSmoothScroll();
    initAnimations();
    // initParallax(); // ELIMINADO - Causaba scroll-linked warning
});

// ========================================
// SCROLL PROGRESS BAR
// ========================================
function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Menu button functionality
    const menuBtn = document.getElementById('menuBtn');
    menuBtn.addEventListener('click', () => {
        // Add menu toggle functionality here if needed
        console.log('Menu clicked');
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
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
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// GALLERY TABS
// ========================================
// Gallery content for each module - TODAS las imágenes (GLOBAL)
const galleryContent = {
    electric: [
        { title: 'Interface Principal', image: 'ELECTRICO/ELE1.png' },
        { title: 'Trazado Automático', image: 'ELECTRICO/ELE2.png' },
        { title: 'Cuadro de Cargas', image: 'ELECTRICO/ELE3.png' },
        { title: 'Cálculos Automáticos', image: 'ELECTRICO/ELE4.png' },
        { title: 'Planos Generados', image: 'ELECTRICO/ELE5.png' },
        { title: 'Memoria Técnica', image: 'ELECTRICO/ELE6.png' },
        { title: 'Vista Adicional 1', image: 'ELECTRICO/ELE7.png' },
        { title: 'Vista Adicional 2', image: 'ELECTRICO/ELE8.png' }
    ],
    water: [
        { title: 'Interface Principal', image: 'AGUA%20POTABLE/AP1.png' },
        { title: 'Trazado Automático', image: 'AGUA%20POTABLE/AP2.png' },
        { title: 'Isométricos', image: 'AGUA%20POTABLE/AP3.png' },
        { title: 'Cuadros de Gastos', image: 'AGUA%20POTABLE/AP4.png' },
        { title: 'Detalles Constructivos', image: 'AGUA%20POTABLE/AP5.png' },
        { title: 'Memoria Técnica', image: 'AGUA%20POTABLE/AP6.png' },
        { title: 'Vista Adicional 1', image: 'AGUA%20POTABLE/AP7.png' },
        { title: 'Vista Adicional 2', image: 'AGUA%20POTABLE/AP8.png' }
    ],
    sewer: [
        { title: 'Interface Principal', image: 'ALCANTARILLADO/AC1.png' },
        { title: 'Trazado Automático', image: 'ALCANTARILLADO/AC2.png' },
        { title: 'Isométricos', image: 'ALCANTARILLADO/AC3.png' },
        { title: 'Cálculos UEH', image: 'ALCANTARILLADO/AC4.png' },
        { title: 'Detalles RIDAA', image: 'ALCANTARILLADO/AC5.png' },
        { title: 'EETT Automáticas', image: 'ALCANTARILLADO/AC6.png' },
        { title: 'Vista Adicional', image: 'ALCANTARILLADO/AC7.png' }
    ],
    structure: [
        { title: 'Formularios Inteligentes', image: 'ESTRUCTURAL/EST1.png' },
        { title: 'Visor 3D', image: 'ESTRUCTURAL/EST2.png' },
        { title: 'Enfierradura', image: 'ESTRUCTURAL/EST3.png' },
        { title: 'Cortes Transversales', image: 'ESTRUCTURAL/EST4.png' },
        { title: 'Cálculos Estructurales', image: 'ESTRUCTURAL/EST5.png' },
        { title: 'Exportación PDF', image: 'ESTRUCTURAL/EST6.png' },
        { title: 'Vista Adicional 1', image: 'ESTRUCTURAL/EST7.png' },
        { title: 'Vista Adicional 2', image: 'ESTRUCTURAL/EST8.png' },
        { title: 'Vista Adicional 3', image: 'ESTRUCTURAL/EST9.png' }
    ]
};

function initGalleryTabs() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const galleryGrid = document.getElementById('galleryGrid');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get module type
            const module = tab.getAttribute('data-tab');
            
            // Update gallery content with animation
            galleryGrid.style.opacity = '0';
            galleryGrid.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                updateGalleryContent(galleryGrid, galleryContent[module]);
                
                setTimeout(() => {
                    galleryGrid.style.opacity = '1';
                    galleryGrid.style.transform = 'translateY(0)';
                }, 50);
            }, 300);
        });
    });
    
    // Transition styles for gallery
    galleryGrid.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
}

function updateGalleryContent(container, items) {
    container.innerHTML = '';
    
    items.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        
        // Get current module from active tab
        const activeTab = document.querySelector('.gallery-tab.active');
        const currentModule = activeTab ? activeTab.getAttribute('data-tab') : 'electric';
        
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="gallery-image" onclick="openLightbox(${index}, '${currentModule}')">
        `;
        
        container.appendChild(galleryItem);
    });
}

// ========================================
// LIGHTBOX FUNCTIONALITY WITH NAVIGATION
// ========================================
let currentImageIndex = 0;
let currentModule = 'electric';

function openLightbox(index, module) {
    currentImageIndex = index;
    currentModule = module;
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.querySelector('.lightbox-caption');
    const counter = document.querySelector('.lightbox-counter');
    
    const images = galleryContent[module];
    const currentImage = images[currentImageIndex];
    
    lightbox.style.display = 'block';
    lightboxImg.src = currentImage.image;
    caption.textContent = currentImage.title;
    counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    const images = galleryContent[currentModule];
    currentImageIndex += direction;
    
    // Loop around
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.querySelector('.lightbox-caption');
    const counter = document.querySelector('.lightbox-counter');
    const currentImage = images[currentImageIndex];
    
    // Fade effect
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
        lightboxImg.src = currentImage.image;
        caption.textContent = currentImage.title;
        counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
        lightboxImg.style.opacity = 1;
    }, 150);
}

// Close lightbox on click outside image or on close button
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Add transition to image
    if (lightboxImg) {
        lightboxImg.style.transition = 'opacity 0.3s ease';
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changeImage(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changeImage(1));
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });
});

// ========================================
// MODULE CARDS HOVER EFFECT
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
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);
    
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
// PARALLAX EFFECTS (DISABLED - CAUSING SCROLL-LINKED ISSUES)
// ========================================
function initParallax() {
    // Parallax effect disabled to avoid scroll-linked positioning warnings
    // and improve performance
}

// ========================================
// COUNTER ANIMATION
// ========================================
function animateCounter(element, target, duration = 2000) {
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
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

window.addEventListener('scroll', () => {
    if (!countersAnimated) {
        const heroSection = document.querySelector('.hero');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.pageYOffset + window.innerHeight;
        
        if (scrollPosition > heroBottom - 200) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target, 1500);
            });
            countersAnimated = true;
        }
    }
});

// ========================================
// BUTTON INTERACTIONS
// ========================================
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
        }, 600);
    });
});

// Add ripple animation CSS
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

// ========================================
// COMPARISON TABLE ANIMATION
// ========================================
function initComparisonAnimation() {
    const comparisonRows = document.querySelectorAll('.comparison-row');
    
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    comparisonRows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
        observer.observe(row);
    });
}

// Initialize comparison animation
initComparisonAnimation();

// ========================================
// TIME BAR ANIMATION
// ========================================
function initTimeBarAnimation() {
    const timeBars = document.querySelectorAll('.time-fill');
    
    const observerOptions = {
        threshold: 0.5
    };
    
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
    }, observerOptions);
    
    timeBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize time bar animation
initTimeBarAnimation();

// ========================================
// PRICING CARDS HOVER
// ========================================
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

// ========================================
// AI CHAT DEMO TYPING EFFECT
// ========================================
function initChatTyping() {
    const chatAI = document.querySelector('.chat-ai p');
    
    if (chatAI) {
        const originalText = chatAI.textContent;
        chatAI.textContent = '';
        
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(chatAI, originalText, 0);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        observer.observe(chatAI);
    }
}

function typeWriter(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(element, text, index + 1), 20);
    }
}

// Initialize chat typing
initChatTyping();

// ========================================
// SCROLL TO TOP ON LOGO CLICK
// ========================================
document.querySelector('.nav-logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// LAZY LOADING IMAGES (when added)
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// ========================================
// PDF MODAL FUNCTIONALITY
// ========================================
const pdfModal = document.getElementById('pdfModal');
const openPricingBtn = document.getElementById('openPricingBtn');
const pdfModalClose = document.querySelector('.pdf-modal-close');
const pdfViewer = document.getElementById('pdfViewer');

if (openPricingBtn) {
    openPricingBtn.addEventListener('click', () => {
        pdfModal.style.display = 'block';
        pdfViewer.src = 'PDF/Modelo_Licenciamiento.pdf';
        document.body.style.overflow = 'hidden';
    });
}

if (pdfModalClose) {
    pdfModalClose.addEventListener('click', closePdfModal);
}

if (pdfModal) {
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            closePdfModal();
        }
    });
}

function closePdfModal() {
    pdfModal.style.display = 'none';
    pdfViewer.src = '';
    document.body.style.overflow = 'auto';
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal.style.display === 'block') {
        closePdfModal();
    }
});

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c🚀 TRUJILLO ', 'color: #0066FF; font-size: 20px; font-weight: bold;');
console.log('%cSistema Automatizado para Diseño de Instalaciones Domiciliarias', 'color: #00D9FF; font-size: 12px;');
console.log('%c¿Interesado en el código? Visita nuestro sitio web', 'color: #9AA0B4; font-size: 10px;');