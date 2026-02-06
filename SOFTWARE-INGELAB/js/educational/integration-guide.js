/**
 * GUÍA DE INTEGRACIÓN DEL SISTEMA EDUCATIVO
 * 
 * Este archivo muestra cómo integrar el sistema educativo
 * con el código existente del proyecto.
 */

/* ============================================
   1. ACTUALIZAR index.html
   ============================================ */

/*
Agregar antes del cierre de </head>:
<link rel="stylesheet" href="css/educational.css">

Agregar antes de </body>, después de los otros scripts:
<script src="js/educational/config.js"></script>
<script src="js/educational/markers.js"></script>
<script src="js/educational/infoPanel.js"></script>
<script src="js/educational/interaction.js"></script>
<script src="js/educational/manager.js"></script>
*/


/* ============================================
   2. INICIALIZAR EN main.js
   ============================================ */

/*
Después de crear scene, camera y renderer, agregar:

// Inicializar sistema educativo
let educationalManager;

function initEducational() {
    educationalManager = new EducationalManager(scene, camera, renderer);
    console.log('📚 Sistema educativo listo');
}

// Llamar después de init()
initEducational();
*/


/* ============================================
   3. AGREGAR BOTÓN EN LA UI
   ============================================ */

/*
En el HTML, agregar un botón en las opciones de vista:

<button class="option-btn" id="educationalBtn">
    <span>📚</span> Modo Educativo
</button>

En ui.js o controls.js, agregar el event listener:

document.getElementById('educationalBtn').addEventListener('click', () => {
    const isVisible = educationalManager.toggleMarkers();
    const btn = document.getElementById('educationalBtn');
    
    if (isVisible) {
        btn.classList.add('educational-active');
    } else {
        btn.classList.remove('educational-active');
        educationalManager.closeInfoPanel();
    }
});
*/


/* ============================================
   4. REGISTRAR COMPONENTES ESTRUCTURALES
   ============================================ */

/*
Método 1: Al crear fundaciones (en models.js o donde se creen)

function createFoundation() {
    const foundation = // ... código existente de creación
    
    // Registrar en sistema educativo
    if (educationalManager) {
        const position = new THREE.Vector3(0, 0.3, 0); // Posición aproximada
        educationalManager.registerComponent(
            'fundacion_main',
            'fundacion',
            position,
            foundation
        );
    }
    
    return foundation;
}


Método 2: Al crear columnas

function createColumns(levels) {
    const columns = // ... código existente
    
    // Registrar columnas
    if (educationalManager) {
        const columnPositions = [
            { x: -4, y: 1.5, z: -4 },
            { x: 4, y: 1.5, z: -4 },
            { x: -4, y: 1.5, z: 4 },
            { x: 4, y: 1.5, z: 4 }
        ];
        
        columnPositions.forEach((pos, i) => {
            educationalManager.registerComponent(
                `columna_${i}`,
                'columna',
                new THREE.Vector3(pos.x, pos.y, pos.z)
            );
        });
    }
    
    return columns;
}


Método 3: Al crear vigas

function createBeams() {
    const beams = // ... código existente
    
    if (educationalManager) {
        // Registrar una viga representativa
        educationalManager.registerComponent(
            'viga_frontal',
            'viga',
            new THREE.Vector3(0, 3.2, -4)
        );
    }
    
    return beams;
}


Método 4: Al crear losas

function createSlabs(levels) {
    const slabs = // ... código existente
    
    if (educationalManager) {
        for (let i = 0; i < levels; i++) {
            educationalManager.registerComponent(
                `losa_nivel${i + 1}`,
                'losa',
                new THREE.Vector3(0, 3 + (i * 3), 0)
            );
        }
    }
    
    return slabs;
}


Método 5: Desde reinforcement/manager.js

// En el método createReinforcement():
if (window.educationalManager) {
    // Registrar fierros de fundación
    window.educationalManager.registerComponent(
        'fierro_fundacion',
        'fierro',
        new THREE.Vector3(0, 0.5, 0)
    );
}


Método 6: Desde plumbing/manager.js

// En el método createPlumbing():
if (window.educationalManager) {
    // Registrar sistema de tuberías
    window.educationalManager.registerComponent(
        'tuberia_alcantarillado',
        'tuberia',
        new THREE.Vector3(0, -0.5, 0)
    );
}
*/


/* ============================================
   5. ACTUALIZAR LOOP DE ANIMACIÓN
   ============================================ */

/*
En main.js, dentro de la función animate():

function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    
    // Actualizar sistema educativo
    if (educationalManager) {
        educationalManager.update(delta);
    }
    
    // ... resto del código de animación
    
    renderer.render(scene, camera);
}
*/


/* ============================================
   6. SINCRONIZAR CON CONTROLES DE CÁMARA
   ============================================ */

/*
Si usas OrbitControls o similar, notificar al sistema educativo:

controls.addEventListener('start', () => {
    if (educationalManager) {
        educationalManager.setDragging(true);
    }
});

controls.addEventListener('end', () => {
    if (educationalManager) {
        educationalManager.setDragging(false);
    }
});
*/


/* ============================================
   7. RESETEAR AL CAMBIAR EDIFICIO
   ============================================ */

/*
Cuando el usuario cambia el tipo de edificio:

function changeBuilding(levels) {
    // Limpiar edificio anterior
    // ...
    
    // Resetear sistema educativo
    if (educationalManager) {
        educationalManager.reset();
    }
    
    // Crear nuevo edificio
    createBuilding(levels);
    
    // Los componentes se registrarán automáticamente
    // al crearse con los códigos del punto 4
}
*/


/* ============================================
   8. EJEMPLO COMPLETO DE INTEGRACIÓN
   ============================================ */

/*
// En main.js

// Variables globales
let educationalManager;

// Después de init()
function initEducational() {
    educationalManager = new EducationalManager(scene, camera, renderer);
    
    // Hacer accesible globalmente
    window.educationalManager = educationalManager;
    
    console.log('📚 Sistema educativo inicializado');
}

// En la creación del edificio
function createBuilding(levels) {
    // Crear fundación
    const foundation = createFoundation();
    if (educationalManager) {
        educationalManager.registerComponent(
            'fundacion',
            'fundacion',
            new THREE.Vector3(0, 0.3, 0),
            foundation
        );
    }
    
    // Crear columnas
    const columns = createColumns(levels);
    if (educationalManager) {
        const positions = getColumnPositions();
        positions.forEach((pos, i) => {
            educationalManager.registerComponent(
                `columna_${i}`,
                'columna',
                pos
            );
        });
    }
    
    // ... resto de componentes
}

// Botón toggle
document.getElementById('educationalBtn').addEventListener('click', () => {
    const isVisible = educationalManager.toggleMarkers();
    const btn = document.getElementById('educationalBtn');
    btn.classList.toggle('educational-active', isVisible);
    
    if (!isVisible) {
        educationalManager.closeInfoPanel();
    }
});

// Loop de animación
function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    
    if (educationalManager) {
        educationalManager.update(delta);
    }
    
    controls.update();
    renderer.render(scene, camera);
}
*/


/* ============================================
   9. DEBUGGING Y UTILIDADES
   ============================================ */

/*
// Ver componentes registrados en la consola
console.log(educationalManager.getStats());
console.log(educationalManager.exportComponentsInfo());

// Forzar mostrar/ocultar marcadores
educationalManager.showMarkers();
educationalManager.hideMarkers();

// Cerrar panel de información
educationalManager.closeInfoPanel();
*/


/* ============================================
   10. PERSONALIZACIÓN
   ============================================ */

/*
Puedes personalizar:

1. Colores y tamaños de marcadores en:
   js/educational/config.js → MARKER_CONFIG

2. Posiciones de marcadores en:
   js/educational/config.js → MARKER_POSITIONS

3. Contenido educativo en:
   js/educational/config.js → EDUCATIONAL_CONTENT

4. Estilos visuales en:
   css/educational.css
*/

console.log('📖 Guía de integración cargada');
