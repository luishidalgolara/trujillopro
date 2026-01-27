// ========================================
// TRUJILLO - Initialization Module
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    initScrollProgress();
    initNavbar();
    initSmoothScroll();
    initLogoClick();
    
    // Gallery & Lightbox
    initGalleryTabs();
    initLightboxEvents();
    initVideoModalEvents();
    initLazyLoading();
    
    // Animations
    initScrollReveal();
    initAnimations();
    initCounters();
    initComparisonAnimation();
    initTimeBarAnimation();
    initChatTyping();
    
    // Interactions
    initButtonRipple();
    addRippleStyles();
    initPricingCardsHover();
    initConsoleEasterEgg();
    
    // Modal
    initPdfModal();
});