/* ══════════════════════════════════════
   MEDICAL 3D — APP.JS
   Plataforma Médica In Silico
   ══════════════════════════════════════ */

const MODULES = [
    {
        id: 'brain',
        name: 'Cerebro',
        latin: 'Encephalon',
        system: 'nervioso',
        systemLabel: 'S. Nervioso',
        icon: '🧠',
        desc: 'Centro de control del cuerpo humano. Procesa información sensorial, motora, cognitiva y emocional. Compuesto por hemisferios cerebrales, cerebelo y tronco encefálico.',
        file: 'modulos-3D/index-brain.html',
        complexity: 'Alta',
        vertices: '125K'
    },
    {
        id: 'heart',
        name: 'Corazón',
        latin: 'Cor',
        system: 'cardiovascular',
        systemLabel: 'Cardiovascular',
        icon: '❤️',
        desc: 'Órgano muscular que bombea sangre a través del sistema circulatorio. Cuatro cámaras: dos aurículas y dos ventrículos.',
        file: 'modulos-3D/heart_index.html',
        complexity: 'Alta',
        vertices: '98K'
    },
    {
        id: 'eye',
        name: 'Ojo',
        latin: 'Oculus',
        system: 'nervioso',
        systemLabel: 'S. Nervioso',
        icon: '👁️',
        desc: 'Órgano sensorial de la visión. Capta la luz y la convierte en impulsos eléctricos interpretados por el cerebro.',
        file: 'modulos-3D/eye_index.html',
        complexity: 'Media',
        vertices: '67K'
    },
    {
        id: 'lungs',
        name: 'Pulmones',
        latin: 'Pulmones',
        system: 'respiratorio',
        systemLabel: 'Respiratorio',
        icon: '🫁',
        desc: 'Órganos principales de la respiración. Realizan el intercambio gaseoso: oxígeno y dióxido de carbono entre aire y sangre.',
        file: 'modulos-3D/lungs_index.html',
        complexity: 'Alta',
        vertices: '110K'
    },
    {
        id: 'liver',
        name: 'Hígado',
        latin: 'Hepar',
        system: 'digestivo',
        systemLabel: 'Digestivo',
        icon: '🫘',
        desc: 'Glándula más grande del cuerpo. Metaboliza nutrientes, desintoxica, produce bilis y almacena glucógeno.',
        file: 'modulos-3D/liver_index.html',
        complexity: 'Media',
        vertices: '72K'
    },
    {
        id: 'stomach',
        name: 'Estómago',
        latin: 'Ventriculus',
        system: 'digestivo',
        systemLabel: 'Digestivo',
        icon: '🫗',
        desc: 'Órgano digestivo que descompone alimentos mediante ácidos y enzimas. Conecta esófago con intestino delgado.',
        file: 'modulos-3D/stomach_index.html',
        complexity: 'Media',
        vertices: '58K'
    },
    {
        id: 'skeleton',
        name: 'Esqueleto',
        latin: 'Skeleton',
        system: 'musculoesqueletico',
        systemLabel: 'Esquelético',
        icon: '🦴',
        desc: 'Armazón óseo del cuerpo humano. 206 huesos que proporcionan soporte, protección de órganos y movimiento.',
        file: 'modulos-3D/skeleton_index.html',
        complexity: 'Muy Alta',
        vertices: '180K'
    },
    {
        id: 'skull',
        name: 'Cráneo',
        latin: 'Cranium',
        system: 'musculoesqueletico',
        systemLabel: 'Esquelético',
        icon: '💀',
        desc: 'Estructura ósea que protege el cerebro. Formado por 22 huesos: 8 craneales y 14 faciales.',
        file: 'modulos-3D/skull_index.html',
        complexity: 'Alta',
        vertices: '95K'
    },
    {
        id: 'intestine',
        name: 'Intestino Grueso',
        latin: 'Intestinum crassum',
        system: 'digestivo',
        systemLabel: 'Digestivo',
        icon: '🔄',
        desc: 'Última porción del tubo digestivo. Absorbe agua y electrolitos, forma y almacena heces.',
        file: 'modulos-3D/intestine_index.html',
        complexity: 'Media',
        vertices: '82K'
    },
    {
        id: 'small-intestine',
        name: 'Intestino Delgado',
        latin: 'Intestinum tenue',
        system: 'digestivo',
        systemLabel: 'Digestivo',
        icon: '〰️',
        desc: 'Porción más larga del tubo digestivo (~6m). Principal sitio de absorción de nutrientes. Tres secciones: duodeno, yeyuno e íleon.',
        file: 'modulos-3D/small-intestine_index.html',
        complexity: 'Alta',
        vertices: '105K'
    },
    {
        id: 'spleen',
        name: 'Bazo',
        latin: 'Splen',
        system: 'linfatico',
        systemLabel: 'Linfático',
        icon: '🟤',
        desc: 'Órgano linfoide que filtra sangre, recicla glóbulos rojos y participa en la respuesta inmunitaria.',
        file: 'modulos-3D/spleen_index.html',
        complexity: 'Baja',
        vertices: '42K'
    },
    {
        id: 'pancreas',
        name: 'Páncreas',
        latin: 'Pancreas',
        system: 'digestivo',
        systemLabel: 'Digestivo',
        icon: '🟡',
        desc: 'Glándula mixta. Función exocrina: enzimas digestivas. Función endocrina: insulina y glucagón para regular la glucemia.',
        file: 'modulos-3D/pancreas_index.html',
        complexity: 'Media',
        vertices: '52K'
    },
    {
        id: 'circulatory',
        name: 'Sistema Circulatorio',
        latin: 'Systema cardiovasculare',
        system: 'cardiovascular',
        systemLabel: 'Cardiovascular',
        icon: '🩸',
        desc: 'Red de arterias, venas y capilares que transporta sangre, nutrientes, oxígeno y desechos por todo el cuerpo.',
        file: 'modulos-3D/index-circulatory.html',
        complexity: 'Muy Alta',
        vertices: '200K'
    },
    {
        id: 'nervous',
        name: 'Sistema Nervioso',
        latin: 'Systema nervosum',
        system: 'nervioso',
        systemLabel: 'S. Nervioso',
        icon: '⚡',
        desc: 'Red de nervios y células que transmiten señales. Incluye sistema nervioso central y periférico.',
        file: 'modulos-3D/nervous_index.html',
        complexity: 'Muy Alta',
        vertices: '190K'
    },
    {
        id: 'ecorche',
        name: 'Écorché',
        latin: 'Anatomía muscular',
        system: 'anatomia',
        systemLabel: 'Anatomía',
        icon: '🏋️',
        desc: 'Modelo anatómico que muestra la musculatura superficial y profunda del cuerpo humano sin piel.',
        file: 'modulos-3D/ecorche_index.html',
        complexity: 'Muy Alta',
        vertices: '220K'
    }
];

const CATEGORIES = [
    { key: 'all', label: 'Todos' },
    { key: 'nervioso', label: 'Nervioso' },
    { key: 'cardiovascular', label: 'Cardiovascular' },
    { key: 'digestivo', label: 'Digestivo' },
    { key: 'respiratorio', label: 'Respiratorio' },
    { key: 'musculoesqueletico', label: 'Esquelético' },
    { key: 'linfatico', label: 'Linfático' },
    { key: 'anatomia', label: 'Anatomía' }
];

// ── STATE ──
let activeFilter = 'all';
let searchQuery = '';

// ── DOM REFERENCES ──
const $ = id => document.getElementById(id);

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
    simulateLoading();
    renderFilters();
    renderModules();
    bindSearch();
});

// ── LOADING SIMULATION ──
function simulateLoading() {
    const overlay = $('loadingOverlay');
    const fill = $('loaderFill');
    const text = $('loaderText');
    
    const steps = [
        { p: 25, t: 'Cargando módulos...' },
        { p: 55, t: 'Preparando interfaz...' },
        { p: 85, t: 'Inicializando plataforma...' },
        { p: 100, t: '¡Listo!' }
    ];

    let i = 0;
    const step = () => {
        if (i >= steps.length) {
            setTimeout(() => overlay.classList.add('hidden'), 400);
            return;
        }
        fill.style.width = steps[i].p + '%';
        text.textContent = steps[i].t;
        i++;
        setTimeout(step, 350 + Math.random() * 250);
    };
    setTimeout(step, 300);
}

// ── RENDER FILTERS ──
function renderFilters() {
    const container = $('filters');
    container.innerHTML = CATEGORIES.map(cat => `
        <button class="filter-btn ${cat.key === 'all' ? 'active' : ''}" data-filter="${cat.key}">
            ${cat.label}
        </button>
    `).join('');

    container.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        activeFilter = btn.dataset.filter;
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderModules();
    });
}

// ── RENDER MODULES ──
function renderModules() {
    const grid = $('modulesGrid');
    const noResults = $('noResults');
    
    const filtered = MODULES.filter(m => {
        const matchFilter = activeFilter === 'all' || m.system === activeFilter;
        const matchSearch = searchQuery === '' || 
            m.name.toLowerCase().includes(searchQuery) || 
            m.latin.toLowerCase().includes(searchQuery) ||
            m.system.toLowerCase().includes(searchQuery) ||
            m.desc.toLowerCase().includes(searchQuery);
        return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.classList.add('visible');
        $('statModules').textContent = '0';
        return;
    }

    noResults.classList.remove('visible');
    $('statModules').textContent = filtered.length;

    grid.innerHTML = filtered.map((m, i) => `
        <a href="${m.file}" class="module-card sys-${m.system}" style="animation-delay: ${i * 0.06}s" title="Abrir modelo 3D: ${m.name}">
            <div class="card-header">
                <div class="card-icon">${m.icon}</div>
                <span class="card-system-tag">${m.systemLabel}</span>
            </div>
            <div class="card-name">${m.name}</div>
            <div class="card-latin">${m.latin}</div>
            <div class="card-desc">${m.desc}</div>
            <div class="card-footer">
                <div class="card-meta">
                    <span class="card-meta-item">
                        <span class="card-meta-icon">◆</span> ${m.complexity}
                    </span>
                    <span class="card-meta-item">
                        <span class="card-meta-icon">△</span> ${m.vertices}
                    </span>
                </div>
                <div class="card-arrow">→</div>
            </div>
        </a>
    `).join('');
}

// ── SEARCH ──
function bindSearch() {
    const input = $('searchInput');
    let debounce;
    input.addEventListener('input', e => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderModules();
        }, 200);
    });
}
