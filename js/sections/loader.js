// ========================================
// TRUJILLO - Section Loader v3
// ========================================

const sectionFiles = [
    'js/sections/nav.js',
    'js/sections/hero.js',
    'js/sections/problem.js',
    'js/sections/modules.js',
    'js/sections/ai.js',
    'js/sections/gallery.js',
    'js/sections/comparison.js',
    'js/sections/pricing.js',
    'js/sections/benefits.js',
    'js/sections/cta.js',
    'js/sections/footer.js',
    'js/sections/modals.js',
];

const existingScripts = [
    'js/config.js',
    'js/gallery-data.js',
    'js/navigation.js',
    'js/gallery.js',
    'js/animations.js',
    'js/interactions.js',
    'js/modal.js',
    'js/certificate-modal.js',
];

function loadScriptsSequentially(files, callback) {
    if (files.length === 0) { if (callback) callback(); return; }
    const s = document.createElement('script');
    s.src = files[0];
    s.onload  = () => loadScriptsSequentially(files.slice(1), callback);
    s.onerror = () => loadScriptsSequentially(files.slice(1), callback);
    document.body.appendChild(s);
}

// FASE 1 — inyectar secciones
// FASE 2 — cargar JS existentes
// FASE 3 — init manual con pequeño delay para asegurar que todo esté parseado
loadScriptsSequentially(sectionFiles, () => {
    loadScriptsSequentially(existingScripts, () => {
        setTimeout(() => {
            try { initScrollProgress(); }   catch(e){}
            try { initNavbar(); }           catch(e){}
            try { initSmoothScroll(); }     catch(e){}
            try { initLogoClick(); }        catch(e){}
            try { initGalleryTabs(); }      catch(e){}
            try { initLightboxEvents(); }   catch(e){}
            try { initVideoModalEvents(); } catch(e){}
            try { initLazyLoading(); }      catch(e){}
            try { initScrollReveal(); }     catch(e){}
            try { initAnimations(); }       catch(e){}
            try { initCounters(); }         catch(e){}
            try { initComparisonAnimation(); } catch(e){}
            try { initTimeBarAnimation(); } catch(e){}
            try { initChatTyping(); }       catch(e){}
            try { initButtonRipple(); }     catch(e){}
            try { addRippleStyles(); }      catch(e){}
            try { initPricingCardsHover(); }catch(e){}
            try { initConsoleEasterEgg(); } catch(e){}
            try { initPdfModal(); }         catch(e){}
        }, 100);
    });
});