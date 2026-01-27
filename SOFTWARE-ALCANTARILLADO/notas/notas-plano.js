// ARCHIVO: notas/notas-plano.js (CORREGIDO - CON AUTO-SAVE)

const NOTAS_DATA = {
    nota1: {
        titulo: "NOTAS",
        contenido: [
            "SE INDICA QUE LAS TUBERIAS NO PUEDEN IR POR DENTRO DEL MURO DIVISORIO, TAMPOCO A LA VISTA.",
            "SE INDICA QUE LA CAMARA DOMICILIARIA NO DEBE QUEDAR A LA VISTA SEGUN DETALLE EN PLANO."
        ]
    },
    nota2: {
        titulo: "NOTAS",
        contenido: [
            "TODAS LAS BOCAS DE ADMISION SE ENCUENTRAN SOBRE LA COTA DE SOLERA EN QUE SE UBIQUE LA UNION DOMICILIARIA DE LA PROPIEDAD.",
            "LAS COTAS DE SOLERA, CAMARAS Y NPT INDICANDO EN LOS PLANOS SON REFERENCIALES, DEBIENDO AJUSTARSE A ESTO SEGUN LOS PLANOS DE LAS RESPECTIVAS ESPECIALIDADES.",
            "LAS CAMARAS MAYORES A 1m DEBEN TENER ESCALINES CADA 0,30m Y SU SECCION CAMBIA.",
            "LA UNION DOMICILIARIA NO PODRA SOBREPASAR LOS 20 METROS."
        ]
    }
};

let notaIdCounter = 0;
let notasActivas = [];

function toggleMenuNotas() {
    const dropdown = document.getElementById('dropdownNotas');
    if (dropdown) {
        dropdown.classList.toggle('active');
        console.log('🔽 Dropdown notas:', dropdown.classList.contains('active') ? 'abierto' : 'cerrado');
    }
}

document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('dropdownNotas');
    const btnContainer = document.querySelector('.btn-notas-container');
    
    if (dropdown && btnContainer && !btnContainer.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

function insertarNota(notaId) {
    console.log('📝 Insertando nota:', notaId);
    
    const dropdown = document.getElementById('dropdownNotas');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
    
    const notaData = NOTAS_DATA[notaId];
    if (!notaData) {
        console.error('❌ Nota no encontrada:', notaId);
        console.log('Notas disponibles:', Object.keys(NOTAS_DATA));
        return;
    }
    
    console.log('✅ Datos de nota encontrados:', notaData);
    
    const drawingBoard = document.getElementById('drawingBoard');
    if (!drawingBoard) {
        console.error('❌ Drawing board no encontrado');
        return;
    }
    
    const uniqueId = `nota-${notaIdCounter++}`;
    
    const notaDiv = document.createElement('div');
    notaDiv.className = 'nota-plano-container';
    notaDiv.id = uniqueId;
    notaDiv.setAttribute('data-anclada', 'false');
    notaDiv.setAttribute('data-tipo', notaId);
    
    let contenidoHTML = '<ol>';
    notaData.contenido.forEach(item => {
        contenidoHTML += `<li>${item}</li>`;
    });
    contenidoHTML += '</ol>';
    
    notaDiv.innerHTML = `
        <div class="nota-plano-header">
            <div class="nota-plano-titulo">${notaData.titulo}:</div>
            <div class="nota-plano-controles">
                <button class="nota-btn anclar" onclick="anclarNota('${uniqueId}')">📌 ANCLAR</button>
                <button class="nota-btn eliminar" onclick="eliminarNota('${uniqueId}')">✕</button>
            </div>
        </div>
        <div class="nota-plano-contenido">
            ${contenidoHTML}
        </div>
        <div class="nota-resize-handle"></div>
    `;
    
    const offset = (notaIdCounter - 1) * 30;
    notaDiv.style.left = (100 + offset) + 'px';
    notaDiv.style.top = (100 + offset) + 'px';
    
    drawingBoard.appendChild(notaDiv);
    
    notasActivas.push({
        id: uniqueId,
        tipo: notaId,
        element: notaDiv,
        anclada: false
    });
    
    inicializarArrastreNota(notaDiv);
    inicializarRedimensionNota(notaDiv);
    actualizarFontSize(notaDiv);
    
    console.log(`✅ Nota ${notaId} insertada en plano con ID ${uniqueId}`);
    
    // ⭐ AUTO-SAVE después de insertar nota
    setTimeout(() => {
        if (window.PlaneManagerCoreAlc) {
            window.PlaneManagerCoreAlc.saveCurrentPlaneState();
            console.log('💾 [Nota] guardada en plano actual');
        }
    }, 100);
}

function actualizarFontSize(notaDiv) {
    const ancho = notaDiv.offsetWidth;
    const contenido = notaDiv.querySelector('.nota-plano-contenido');
    const titulo = notaDiv.querySelector('.nota-plano-titulo');
    const botones = notaDiv.querySelectorAll('.nota-btn');
    const ol = notaDiv.querySelector('.nota-plano-contenido ol');
    const header = notaDiv.querySelector('.nota-plano-header');
    
    // Escalar fuente del contenido (entre 6px y 13px)
    if (contenido) {
        const fontSize = Math.max(6, Math.min(13, ancho / 25));
        contenido.style.fontSize = fontSize + 'px';
        contenido.style.lineHeight = '1.3';
    }
    
    // Escalar fuente del título (entre 7px y 14px)
    if (titulo) {
        const titleSize = Math.max(7, Math.min(14, ancho / 23));
        titulo.style.fontSize = titleSize + 'px';
    }
    
    // Escalar botones (entre 6px y 10px)
    botones.forEach(boton => {
        const btnSize = Math.max(6, Math.min(10, ancho / 35));
        boton.style.fontSize = btnSize + 'px';
        
        const btnPadding = Math.max(1, Math.min(6, ancho / 55));
        boton.style.padding = btnPadding + 'px ' + (btnPadding * 2) + 'px';
    });
    
    // Escalar espaciado de la lista
    if (ol) {
        const marginLeft = Math.max(8, Math.min(18, ancho / 20));
        ol.style.marginLeft = marginLeft + 'px';
        
        const lis = ol.querySelectorAll('li');
        lis.forEach(li => {
            const liMargin = Math.max(1, Math.min(6, ancho / 60));
            li.style.marginBottom = liMargin + 'px';
        });
    }
    
    // Escalar padding del header
    if (header) {
        const headerMargin = Math.max(2, Math.min(8, ancho / 45));
        header.style.marginBottom = headerMargin + 'px';
        header.style.paddingBottom = headerMargin + 'px';
    }
    
    // Escalar padding del contenedor
    const padding = Math.max(4, Math.min(12, ancho / 30));
    notaDiv.style.padding = padding + 'px ' + (padding * 1.5) + 'px';
}

function inicializarArrastreNota(notaDiv) {
    let arrastrando = false;
    let offsetX = 0;
    let offsetY = 0;
    
    const header = notaDiv.querySelector('.nota-plano-header');
    
    if (!header) {
        console.error('❌ Header no encontrado en:', notaDiv);
        return;
    }
    
    console.log('✅ Sistema de arrastre inicializado para:', notaDiv.id);
    
    header.addEventListener('mousedown', function(e) {
        console.log('🖱️ MOUSEDOWN detectado en header de', notaDiv.id);
        
        // Si se hace clic en un botón, no arrastrar
        if (e.target.closest('.nota-btn')) {
            console.log('⚠️ Click en botón, ignorando arrastre');
            return;
        }
        
        const anclada = notaDiv.getAttribute('data-anclada') === 'true';
        if (anclada) {
            console.log('📌 Nota anclada, no se puede mover');
            return;
        }
        
        arrastrando = true;
        console.log('✅ Iniciando arrastre...');
        
        const rect = notaDiv.getBoundingClientRect();
        const boardRect = notaDiv.parentElement.getBoundingClientRect();
        
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        notaDiv.style.zIndex = '9999';
        header.style.cursor = 'grabbing';
        
        e.preventDefault();
        e.stopPropagation();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!arrastrando) return;
        
        const drawingBoard = notaDiv.parentElement;
        if (!drawingBoard) return;
        
        const boardRect = drawingBoard.getBoundingClientRect();
        
        let x = e.clientX - boardRect.left - offsetX;
        let y = e.clientY - boardRect.top - offsetY;
        
        x = Math.max(0, Math.min(x, boardRect.width - notaDiv.offsetWidth));
        y = Math.max(0, Math.min(y, boardRect.height - notaDiv.offsetHeight));
        
        notaDiv.style.left = x + 'px';
        notaDiv.style.top = y + 'px';
    });
    
    document.addEventListener('mouseup', function() {
        if (arrastrando) {
            console.log('✅ Arrastre finalizado');
            arrastrando = false;
            notaDiv.style.zIndex = '100';
            header.style.cursor = 'move';
            
            // ⭐ AUTO-SAVE después de mover
            setTimeout(() => {
                if (window.PlaneManagerCoreAlc) {
                    window.PlaneManagerCoreAlc.saveCurrentPlaneState();
                    console.log('💾 [Nota] posición guardada en plano actual');
                }
            }, 100);
        }
    });
}

function inicializarRedimensionNota(notaDiv) {
    const handle = notaDiv.querySelector('.nota-resize-handle');
    if (!handle) return;
    
    let redimensionando = false;
    let anchoInicial = 0;
    let altoInicial = 0;
    let mouseInicialX = 0;
    let mouseInicialY = 0;
    
    handle.addEventListener('mousedown', function(e) {
        e.stopPropagation();
        
        const anclada = notaDiv.getAttribute('data-anclada') === 'true';
        if (anclada) return;
        
        redimensionando = true;
        
        anchoInicial = notaDiv.offsetWidth;
        altoInicial = notaDiv.offsetHeight;
        mouseInicialX = e.clientX;
        mouseInicialY = e.clientY;
        
        document.body.style.userSelect = 'none';
        
        console.log('📏 Iniciando redimensión de', notaDiv.id);
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!redimensionando) return;
        
        const deltaX = e.clientX - mouseInicialX;
        const deltaY = e.clientY - mouseInicialY;
        
        const nuevoAncho = Math.max(100, Math.min(700, anchoInicial + deltaX));
        const nuevoAlto = Math.max(50, altoInicial + deltaY);
        
        notaDiv.style.width = nuevoAncho + 'px';
        notaDiv.style.height = nuevoAlto + 'px';
        
        actualizarFontSize(notaDiv);
    });
    
    document.addEventListener('mouseup', function() {
        if (redimensionando) {
            redimensionando = false;
            document.body.style.userSelect = '';
            console.log('✅ Redimensión finalizada');
            
            // ⭐ AUTO-SAVE después de redimensionar
            setTimeout(() => {
                if (window.PlaneManagerCoreAlc) {
                    window.PlaneManagerCoreAlc.saveCurrentPlaneState();
                    console.log('💾 [Nota] tamaño guardado en plano actual');
                }
            }, 100);
        }
    });
}

function anclarNota(notaId) {
    const notaDiv = document.getElementById(notaId);
    if (!notaDiv) return;
    
    const anclada = notaDiv.getAttribute('data-anclada') === 'true';
    
    if (anclada) {
        notaDiv.setAttribute('data-anclada', 'false');
        notaDiv.classList.remove('anclada');
        
        const boton = notaDiv.querySelector('.nota-btn.anclar');
        if (boton) {
            boton.textContent = '📌 ANCLAR';
            boton.classList.remove('anclada');
        }
        
        const handle = notaDiv.querySelector('.nota-resize-handle');
        if (handle) handle.style.display = 'block';
        
        console.log(`🔓 Nota ${notaId} desanclada`);
    } else {
        notaDiv.setAttribute('data-anclada', 'true');
        notaDiv.classList.add('anclada');
        
        const boton = notaDiv.querySelector('.nota-btn.anclar');
        if (boton) {
            boton.textContent = '🔓 DESANCLAR';
            boton.classList.add('anclada');
        }
        
        const handle = notaDiv.querySelector('.nota-resize-handle');
        if (handle) handle.style.display = 'none';
        
        console.log(`📌 Nota ${notaId} anclada`);
    }
    
    const nota = notasActivas.find(n => n.id === notaId);
    if (nota) {
        nota.anclada = !anclada;
    }
    
    // ⭐ AUTO-SAVE después de anclar/desanclar
    setTimeout(() => {
        if (window.PlaneManagerCoreAlc) {
            window.PlaneManagerCoreAlc.saveCurrentPlaneState();
            console.log('💾 [Nota] estado de anclaje guardado en plano actual');
        }
    }, 100);
}

function eliminarNota(notaId) {
    const notaDiv = document.getElementById(notaId);
    if (notaDiv) {
        notaDiv.remove();
    }
    
    notasActivas = notasActivas.filter(n => n.id !== notaId);
    
    console.log(`🗑️ Nota ${notaId} eliminada`);
    
    // ⭐ AUTO-SAVE después de eliminar
    setTimeout(() => {
        if (window.PlaneManagerCoreAlc) {
            window.PlaneManagerCoreAlc.saveCurrentPlaneState();
            console.log('💾 [Nota] eliminación guardada en plano actual');
        }
    }, 100);
}

// Exportar funciones al scope global
window.toggleMenuNotas = toggleMenuNotas;
window.insertarNota = insertarNota;
window.anclarNota = anclarNota;
window.eliminarNota = eliminarNota;

console.log('✅ Sistema de notas en plano inicializado');
console.log('📋 Notas disponibles:', Object.keys(NOTAS_DATA));