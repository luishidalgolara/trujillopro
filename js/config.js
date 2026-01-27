// ========================================
// TRUJILLO - Configuration & Global Settings
// ========================================

// Observer Options
const OBSERVER_OPTIONS = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const OBSERVER_OPTIONS_HIGH = {
    threshold: 0.5
};

const OBSERVER_OPTIONS_COMPARISON = {
    threshold: 0.3
};

// Animation Settings
const ANIMATION_TIMING = {
    galleryTransition: 300,
    fadeDelay: 50,
    staggerDelay: 100,
    counterDuration: 1500,
    typingSpeed: 20,
    rippleDuration: 600
};

// Scroll Settings
const SCROLL_SETTINGS = {
    navbarScrollThreshold: 100,
    navbarHideThreshold: 500,
    counterTriggerOffset: 200,
    revealPoint: 100
};

// Global State
let countersAnimated = false;
let currentImageIndex = 0;
let currentModule = 'electric';
let currentVideoIndex = 0;