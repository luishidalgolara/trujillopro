// ═══════════════════════════════════════════════════════════
// FUNDAMENTOS MÉDICOS - MEDICAL 3D PLATFORM
// Interactive functionality for subjects cards
// ═══════════════════════════════════════════════════════════

// ═══ LOADING SCREEN ═══
document.addEventListener('DOMContentLoaded', () => {
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loaderFill = document.getElementById('loaderFill');
  const loaderText = document.getElementById('loaderText');
  
  // Simulate loading progress
  let progress = 0;
  const loadingTexts = [
    'Inicializando...',
    'Cargando ciencias básicas...',
    'Cargando ciencias clínicas...',
    'Preparando contenido...',
    'Casi listo...'
  ];
  
  const interval = setInterval(() => {
    progress += 20;
    loaderFill.style.width = `${progress}%`;
    
    const textIndex = Math.floor(progress / 20);
    if (textIndex < loadingTexts.length) {
      loaderText.textContent = loadingTexts[textIndex];
    }
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingOverlay.classList.add('hidden');
      }, 300);
    }
  }, 200);
});

// ═══ SUBJECT CARDS - EXPAND/COLLAPSE ═══
const subjectCards = document.querySelectorAll('.subject-card');

subjectCards.forEach(card => {
  const header = card.querySelector('.subject-header');
  const toggle = card.querySelector('.subject-toggle');
  
  header.addEventListener('click', () => {
    // Close other expanded cards (optional - remove if you want multiple open)
    // subjectCards.forEach(otherCard => {
    //   if (otherCard !== card && otherCard.classList.contains('expanded')) {
    //     otherCard.classList.remove('expanded');
    //   }
    // });
    
    // Toggle current card
    card.classList.toggle('expanded');
    
    // Update toggle button text
    if (card.classList.contains('expanded')) {
      toggle.textContent = '+';
    } else {
      toggle.textContent = '+';
    }
  });
});

// ═══ SEARCH FUNCTIONALITY ═══
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
let searchTimeout;

searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  
  searchTimeout = setTimeout(() => {
    const searchTerm = e.target.value.toLowerCase().trim();
    let visibleCount = 0;
    
    subjectCards.forEach(card => {
      const title = card.querySelector('.subject-title').textContent.toLowerCase();
      const subtitle = card.querySelector('.subject-subtitle').textContent.toLowerCase();
      const intro = card.querySelector('.subject-intro').textContent.toLowerCase();
      
      // Get all topic texts
      const topics = Array.from(card.querySelectorAll('.topic-item'));
      const topicTexts = topics.map(topic => topic.textContent.toLowerCase()).join(' ');
      
      // Check if search term matches any content
      const matches = 
        title.includes(searchTerm) ||
        subtitle.includes(searchTerm) ||
        intro.includes(searchTerm) ||
        topicTexts.includes(searchTerm);
      
      if (matches || searchTerm === '') {
        card.style.display = '';
        visibleCount++;
        
        // Highlight matching text (optional)
        if (searchTerm !== '') {
          highlightSearchTerm(card, searchTerm);
        } else {
          removeHighlight(card);
        }
      } else {
        card.style.display = 'none';
        card.classList.remove('expanded');
      }
    });
    
    // Show/hide no results message
    if (visibleCount === 0 && searchTerm !== '') {
      noResults.classList.add('visible');
    } else {
      noResults.classList.remove('visible');
    }
  }, 300); // Debounce delay
});

// ═══ HIGHLIGHT SEARCH TERM ═══
function highlightSearchTerm(card, term) {
  // This is a simple implementation
  // For production, consider using a library like mark.js
  const elements = card.querySelectorAll('.subject-title, .subject-subtitle, .subject-intro, .topic-item strong, .topic-item p');
  
  elements.forEach(element => {
    const text = element.textContent;
    const regex = new RegExp(`(${term})`, 'gi');
    
    if (regex.test(text) && !element.querySelector('mark')) {
      const highlighted = text.replace(regex, '<mark style="background: rgba(102, 126, 234, 0.3); color: inherit; padding: 2px 4px; border-radius: 3px;">$1</mark>');
      element.innerHTML = highlighted;
    }
  });
}

// ═══ REMOVE HIGHLIGHT ═══
function removeHighlight(card) {
  const marks = card.querySelectorAll('mark');
  marks.forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

// ═══ KEYBOARD SHORTCUTS ═══
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
  }
  
  // Escape to clear search
  if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.blur();
  }
});

// ═══ SCROLL ANIMATIONS ═══
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe section headers
document.querySelectorAll('.section-header').forEach(header => {
  header.style.opacity = '0';
  header.style.transform = 'translateY(30px)';
  header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(header);
});

// ═══ STATS COUNTER ANIMATION ═══
const statValues = document.querySelectorAll('.stat-value');

const animateCounter = (element) => {
  const target = element.textContent;
  const isNumber = /^\d+$/.test(target);
  
  if (isNumber) {
    const targetNumber = parseInt(target);
    let current = 0;
    const increment = targetNumber / 30;
    const duration = 1000;
    const stepTime = duration / 30;
    
    const counter = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        element.textContent = targetNumber;
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(current);
      }
    }, stepTime);
  }
};

// Animate counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statValue = entry.target.querySelector('.stat-accent');
      if (statValue && !statValue.dataset.animated) {
        animateCounter(statValue);
        statValue.dataset.animated = 'true';
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
  statsObserver.observe(stat);
});

// ═══ UTILITY FUNCTIONS ═══

// Expand all cards
window.expandAll = () => {
  subjectCards.forEach(card => {
    card.classList.add('expanded');
  });
};

// Collapse all cards
window.collapseAll = () => {
  subjectCards.forEach(card => {
    card.classList.remove('expanded');
  });
};

// Filter by category
window.filterByCategory = (category) => {
  const grids = {
    'basic': document.getElementById('basicSciences'),
    'clinical': document.getElementById('clinicalSciences')
  };
  
  if (category === 'all') {
    Object.values(grids).forEach(grid => {
      if (grid) {
        const cards = grid.querySelectorAll('.subject-card');
        cards.forEach(card => card.style.display = '');
      }
    });
  } else if (grids[category]) {
    Object.entries(grids).forEach(([key, grid]) => {
      if (grid) {
        const cards = grid.querySelectorAll('.subject-card');
        cards.forEach(card => {
          card.style.display = key === category ? '' : 'none';
        });
      }
    });
  }
};

// ═══ PERFORMANCE OPTIMIZATION ═══

// Lazy load content when card is expanded
subjectCards.forEach(card => {
  const content = card.querySelector('.subject-content');
  
  // Store original content
  if (!card.dataset.contentLoaded) {
    card.dataset.originalContent = content.innerHTML;
    card.dataset.contentLoaded = 'true';
  }
});

// ═══ ACCESSIBILITY ═══

// Add ARIA labels
subjectCards.forEach((card, index) => {
  const header = card.querySelector('.subject-header');
  const content = card.querySelector('.subject-content');
  const toggle = card.querySelector('.subject-toggle');
  
  header.setAttribute('role', 'button');
  header.setAttribute('aria-expanded', 'false');
  header.setAttribute('aria-controls', `subject-content-${index}`);
  header.setAttribute('tabindex', '0');
  
  content.setAttribute('id', `subject-content-${index}`);
  content.setAttribute('role', 'region');
  
  toggle.setAttribute('aria-label', 'Expandir/Contraer');
  
  // Keyboard navigation
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
  
  // Update aria-expanded when toggled
  const observer = new MutationObserver(() => {
    const isExpanded = card.classList.contains('expanded');
    header.setAttribute('aria-expanded', isExpanded);
  });
  
  observer.observe(card, { attributes: true, attributeFilter: ['class'] });
});

// ═══ LOCAL STORAGE - SAVE USER PREFERENCES ═══

// Save expanded state
const saveExpandedState = () => {
  const expandedCards = Array.from(subjectCards)
    .filter(card => card.classList.contains('expanded'))
    .map(card => card.dataset.subject);
  
  localStorage.setItem('expandedSubjects', JSON.stringify(expandedCards));
};

// Load expanded state
const loadExpandedState = () => {
  const savedState = localStorage.getItem('expandedSubjects');
  if (savedState) {
    const expandedSubjects = JSON.parse(savedState);
    subjectCards.forEach(card => {
      if (expandedSubjects.includes(card.dataset.subject)) {
        card.classList.add('expanded');
      }
    });
  }
};

// Save state on card toggle
subjectCards.forEach(card => {
  card.querySelector('.subject-header').addEventListener('click', () => {
    setTimeout(saveExpandedState, 300);
  });
});

// Load state on page load
// loadExpandedState(); // Uncomment to enable persistent state

// ═══ CONSOLE EASTER EGG ═══
console.log('%c🧬 Medical 3D - Fundamentos Médicos', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%c¡Bienvenido estudiante de medicina! 🎓', 'font-size: 14px; color: #4facfe;');
console.log('%cUtiliza las siguientes funciones en la consola:', 'font-size: 12px; color: #999;');
console.log('%c  expandAll() - Expandir todas las materias', 'font-size: 11px; color: #666;');
console.log('%c  collapseAll() - Contraer todas las materias', 'font-size: 11px; color: #666;');
console.log('%c  filterByCategory("basic") - Mostrar solo ciencias básicas', 'font-size: 11px; color: #666;');
console.log('%c  filterByCategory("clinical") - Mostrar solo ciencias clínicas', 'font-size: 11px; color: #666;');
console.log('%c  filterByCategory("all") - Mostrar todas', 'font-size: 11px; color: #666;');
console.log('%c\n💡 Tip: Usa Ctrl/Cmd + K para buscar rápidamente', 'font-size: 11px; color: #43e97b;');

// ═══ EXPORT FOR EXTERNAL USE ═══
window.FundamentosMedicos = {
  expandAll,
  collapseAll,
  filterByCategory,
  version: '1.0.0'
};

// ═══════════════════════════════════════════════════════════
// ═══ ABRIR MODALES AL HACER CLIC EN TOPICS ═══
// ═══════════════════════════════════════════════════════════

// Mapeo completo de títulos de topics a sus rutas de modales
const topicModalsMap = {
  // ═══ BIOLOGÍA CELULAR ═══
  'Estructura y función de organelos': 'biologia-celular/estructura-funcion-organelos/organelos-modal.html',
  'Membranas celulares': 'biologia-celular/membranas-celulares/membranas-modal.html',
  'Transporte celular': 'biologia-celular/transporte-celular/transporte-modal.html',
  'Señalización celular': 'biologia-celular/señalizacion-celular/señalizacion-modal.html',
  
  // ═══ BIOQUÍMICA ═══
  'Metabolismo': 'Bioquímica/Metabolismo/metabolismo-modal.html',
  'Enzimas': 'Bioquímica/enzimas/enzimas-modal.html',
  'Hormonas': 'Bioquímica/Hormonas/hormonas-modal.html',
  'Proteínas': 'Bioquímica/Proteinas/proteinas-modal.html',
  
  // ═══ GENÉTICA MÉDICA ═══
  'ADN y ARN': 'Genética-Médica/adn-arn/adn-arn-modal.html',
  'Mutaciones': 'Genética-Médica/Mutaciones/mutaciones-modal.html',
  'Enfermedades hereditarias': 'Genética-Médica/Enfermedades-Hereditarias/enfermedades-modal.html',
  'Epigenética': 'Genética-Médica/Epigenetica/epigenetica-modal.html',
  
  // ═══ HISTOLOGÍA ═══
  'Tejido epitelial': 'Histología/Tejido-Epitelial/epitelio-modal.html',
  'Tejido muscular': 'Histología/Tejido-Muscular/musculo-modal.html',
  'Tejido nervioso': 'Histología/Tejido-Nervioso/nervioso-modal.html',
  'Tejido conectivo': 'Histología/tejido-conectivo/tejido-conectivo-modal.html',
  
  // ═══ MICROBIOLOGÍA ═══
  'Bacterias': 'Microbiología/Bacterias/bacterias-modal.html',
  'Virus': 'Microbiología/Virus/virus-modal.html',
  'Hongos': 'Microbiología/Hongos/hongos-modal.html',
  'Parásitos': 'Microbiología/Parásitos/parasitos-modal.html',
  
  // ═══ FISIOLOGÍA ═══
  'Sistema nervioso': 'Fisiología/Sistema-Nervioso/sistema-nervioso-modal.html',
  'Sistema cardiovascular': 'Fisiología/Sistema-Cardiovascular/sistema-cardiovascular-modal.html',
  'Sistema respiratorio': 'Fisiología/Sistema-Respiratorio/sistema-respiratorio-modal.html',
  'Sistema endocrino': 'Fisiología/Sistema-Endocrino/sistema-endocrino-modal.html',
  
  // ═══ ANATOMÍA ═══
  'Anatomía macroscópica': 'Anatomía/anatomia-macroscopica/anatomia-modal.html',
  'Anatomía topográfica': 'Anatomía/anatomia-topografica/anatomia-topografica.html',
  'Neuroanatomía': 'Anatomía/neuroanatomia/neuroanatomia.html',
  
  // ═══ FISIOLOGÍA CLÍNICA ═══
  'Regulación de presión arterial': 'Fisiología-Clínica/regulacion-presion-arterial/regulacion-presion-arterial.html',
  'Respiración celular': 'Fisiología-Clínica/Respiración-celular/respiracion-celular.html',
  'Potencial de acción neuronal': 'Fisiología-Clínica/Potencial-de-acción-neuronal/potencial-accion-neuronal.html',
  
  // ═══ FISIOPATOLOGÍA ═══
  'Mecanismos de enfermedad': 'Fisiopatología/Mecanismos-de-enfermedad/mecanismos-enfermedad.html',
  'Respuesta a infección': 'Fisiopatología/Respuesta-a-infección/respuesta-infeccion.html',
  'Dolor y obstrucción': 'Fisiopatología/Dolor-y-obstrucción/dolor-obstruccion.html',
  
  // ═══ INMUNOLOGÍA ═══
  'Respuesta inmune': 'inmunologia/Respuesta-inmune/respuesta-inmune.html',
  'Autoinmunidad': 'inmunologia/Autoinmunidad/autoinmunidad.html',
  'Inflamación': 'inmunologia/inflamacion/inflamacion.html',
  'Vacunas': 'inmunologia/vacunas/vacunas.html',
  
  // ═══ FARMACOLOGÍA ═══
  'Mecanismos de acción': 'Farmacología/Mecanismos-de-acción/farmacodinamia-modal.html'
};

// Event listener para abrir modales al hacer clic en topics
document.addEventListener('click', (e) => {
  const topicItem = e.target.closest('.topic-item');
  
  if (topicItem) {
    const strong = topicItem.querySelector('strong');
    
    if (strong) {
      const topicTitle = strong.textContent.trim();
      const modalPath = topicModalsMap[topicTitle];
      
      if (modalPath) {
        e.preventDefault();
        e.stopPropagation();
        
        // Abrir modal en nueva pestaña
        window.open(modalPath, '_blank');
        
        // Feedback visual (animación de clic)
        topicItem.style.transform = 'scale(0.98)';
        setTimeout(() => {
          topicItem.style.transform = '';
        }, 150);
        
        // Log para debugging (opcional - remover en producción)
        console.log(`✅ Abriendo modal: ${topicTitle} → ${modalPath}`);
      } else {
        // Log de advertencia si no hay ruta mapeada
        console.warn(`⚠️ No hay modal configurado para: "${topicTitle}"`);
      }
    }
  }
});

// ═══ FIN DEL ARCHIVO ═══