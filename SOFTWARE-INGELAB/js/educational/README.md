# 📚 Sistema Educativo Interactivo - Construcción 3D

Sistema de marcadores educativos interactivos para el visualizador 3D de construcción. Permite a los usuarios hacer clic en componentes estructurales para aprender sobre su construcción y función.

---

## 🎯 Características

- ✨ **Marcadores 3D animados** sobre cada componente estructural
- 📖 **Información educativa completa** sobre cada elemento
- 🎨 **Interfaz visual atractiva** con animaciones fluidas
- 🖱️ **Interacción intuitiva** mediante clicks y hover
- 📱 **Diseño responsivo** para diferentes dispositivos
- 🔄 **Fácil integración** con el código existente

---

## 📂 Estructura de Archivos

```
js/educational/
├── config.js              # Configuración y contenido educativo
├── markers.js             # Generación de marcadores 3D
├── infoPanel.js           # Panel de información flotante
├── interaction.js         # Gestión de clicks y hover
├── manager.js             # Coordinador principal
├── integration-guide.js   # Guía de integración
└── README.md             # Esta documentación

css/
└── educational.css       # Estilos del sistema educativo
```

---

## 🚀 Instalación Rápida

### 1. Incluir archivos CSS en `index.html`

```html
<head>
    <!-- ... otros estilos ... -->
    <link rel="stylesheet" href="css/educational.css">
</head>
```

### 2. Incluir archivos JavaScript en `index.html`

```html
<body>
    <!-- ... contenido ... -->
    
    <!-- Scripts del sistema educativo -->
    <script src="js/educational/config.js"></script>
    <script src="js/educational/markers.js"></script>
    <script src="js/educational/infoPanel.js"></script>
    <script src="js/educational/interaction.js"></script>
    <script src="js/educational/manager.js"></script>
    
    <!-- Script principal -->
    <script src="js/main.js"></script>
</body>
```

### 3. Agregar botón en la UI

```html
<div class="view-options">
    <!-- ... otros botones ... -->
    <button class="option-btn" id="educationalBtn">
        <span>📚</span> Modo Educativo
    </button>
</div>
```

### 4. Inicializar en `main.js`

```javascript
// Variable global
let educationalManager;

// Después de crear scene, camera, renderer
function initEducational() {
    educationalManager = new EducationalManager(scene, camera, renderer);
    window.educationalManager = educationalManager; // Hacer accesible globalmente
}

// Llamar después de init()
initEducational();
```

### 5. Agregar event listener del botón

```javascript
document.getElementById('educationalBtn').addEventListener('click', () => {
    const isVisible = educationalManager.toggleMarkers();
    const btn = document.getElementById('educationalBtn');
    btn.classList.toggle('educational-active', isVisible);
    
    if (!isVisible) {
        educationalManager.closeInfoPanel();
    }
});
```

### 6. Actualizar en el loop de animación

```javascript
function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    
    // Actualizar sistema educativo
    if (educationalManager) {
        educationalManager.update(delta);
    }
    
    renderer.render(scene, camera);
}
```

---

## 📝 Uso Básico

### Registrar un Componente Individual

```javascript
// Después de crear un componente
const foundation = createFoundation();

// Registrarlo en el sistema educativo
educationalManager.registerComponent(
    'fundacion_principal',  // ID único
    'fundacion',            // Tipo de componente
    new THREE.Vector3(0, 0.3, 0), // Posición
    foundation              // Mesh (opcional)
);
```

### Registrar Múltiples Componentes

```javascript
// Registrar todas las columnas
const columnPositions = [
    new THREE.Vector3(-4, 1.5, -4),
    new THREE.Vector3(4, 1.5, -4),
    new THREE.Vector3(-4, 1.5, 4),
    new THREE.Vector3(4, 1.5, 4)
];

columnPositions.forEach((pos, i) => {
    educationalManager.registerComponent(
        `columna_${i}`,
        'columna',
        pos
    );
});
```

### Registrar desde un Mesh Group

```javascript
const beamGroup = createBeams();

// Registrar automáticamente todos los meshes del grupo
educationalManager.registerFromMeshGroup(beamGroup, 'viga');
```

---

## 🎨 Componentes Disponibles

El sistema incluye información educativa para:

| Tipo | Descripción | Icono |
|------|-------------|-------|
| `fundacion` | Fundación o cimiento | 🏗️ |
| `columna` | Columna de hormigón armado | 🏛️ |
| `viga` | Viga estructural | ➡️ |
| `losa` | Losa de hormigón | ⬜ |
| `muro` | Muro de hormigón armado | 🧱 |
| `escalera` | Escalera de hormigón | 📶 |
| `fierro` | Enfierradura (acero de refuerzo) | 🔩 |
| `tuberia` | Sistema de alcantarillado | 🚰 |

Cada componente incluye:
- ❓ **¿Qué es?** - Definición y características
- 🔨 **¿Cómo se construye?** - Proceso constructivo detallado
- ⚡ **¿Para qué sirve?** - Funciones principales

---

## 🔧 Personalización

### Modificar Contenido Educativo

Edita `js/educational/config.js`:

```javascript
const EDUCATIONAL_CONTENT = {
    'nuevo_componente': {
        name: 'Nombre del Componente',
        icon: '🏗️',
        color: '#FF5722',
        what: 'Descripción de qué es...',
        how: 'Proceso de construcción...',
        purpose: 'Para qué sirve...'
    }
};
```

### Ajustar Apariencia de Marcadores

En `js/educational/config.js`:

```javascript
const MARKER_CONFIG = {
    size: 0.8,           // Tamaño base
    hoverSize: 1.0,      // Tamaño al hacer hover
    color: '#FFD700',    // Color principal
    emissive: '#FF8C00', // Color de brillo
    opacity: 0.9,
    hoverOpacity: 1.0
};
```

### Ajustar Posiciones de Marcadores

En `js/educational/config.js`:

```javascript
const MARKER_POSITIONS = {
    'fundacion': { x: 0, y: 0.3, z: 0 },
    'columna': { x: 0, y: 0.5, z: 0 },
    // ... personalizar según necesidad
};
```

### Modificar Estilos Visuales

Edita `css/educational.css` para cambiar:
- Colores del panel de información
- Tamaños de fuente
- Animaciones
- Efectos de hover

---

## 🎮 API del Manager

### Métodos Principales

```javascript
// Mostrar/ocultar marcadores
educationalManager.toggleMarkers();
educationalManager.showMarkers();
educationalManager.hideMarkers();

// Registrar componentes
educationalManager.registerComponent(id, type, position, mesh);
educationalManager.registerComponents(type, positionsArray);
educationalManager.registerFromMeshGroup(group, type);

// Gestión de información
educationalManager.closeInfoPanel();

// Control de arrastre de cámara
educationalManager.setDragging(true/false);

// Actualizar animaciones (en loop)
educationalManager.update(delta);

// Resetear sistema
educationalManager.reset();

// Obtener estadísticas
const stats = educationalManager.getStats();
console.log(stats);
// { totalComponents: 12, totalMarkers: 12, enabled: true, infoPanelVisible: false }

// Exportar info de componentes
const info = educationalManager.exportComponentsInfo();
console.log(info);

// Limpiar completamente
educationalManager.dispose();
```

---

## 📱 Responsividad

El sistema se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop (>1400px)**: Panel lateral de 450px
- **Tablet (1024px-1400px)**: Panel lateral de 400px
- **Mobile (<768px)**: Panel de ancho completo

---

## ⚡ Optimización

### Rendimiento

- Los marcadores solo se actualizan cuando están visibles
- Las animaciones usan `requestAnimationFrame`
- Los event listeners se limpian correctamente
- Geometrías y materiales se disponen al limpiar

### Buenas Prácticas

```javascript
// ✅ Bueno: Registrar un marcador por grupo de componentes similares
educationalManager.registerComponent('vigas_nivel1', 'viga', centerPosition);

// ❌ Evitar: Registrar marcadores para cada viga individual
// Puede sobrecargar visualmente el modelo
```

---

## 🐛 Debugging

### Ver Estado del Sistema

```javascript
// Estadísticas generales
console.log(educationalManager.getStats());

// Lista de componentes registrados
console.log(educationalManager.exportComponentsInfo());

// Verificar si está habilitado
console.log(educationalManager.enabled);
```

### Problemas Comunes

**Los marcadores no aparecen:**
- Verificar que `educationalManager.enabled === true`
- Comprobar que los componentes están registrados
- Revisar la consola para errores

**El panel no se muestra al hacer click:**
- Verificar que el CSS está cargado
- Comprobar que el elemento `#infoPanel` existe en el HTML
- Revisar que no hay errores en la consola

**Los marcadores están en posición incorrecta:**
- Ajustar `MARKER_POSITIONS` en `config.js`
- Verificar las coordenadas al registrar componentes

---

## 🎓 Ejemplos de Integración

### Ejemplo 1: Fundación

```javascript
function createFoundation() {
    const geometry = new THREE.BoxGeometry(10, 0.5, 10);
    const material = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const foundation = new THREE.Mesh(geometry, material);
    foundation.position.y = 0.25;
    scene.add(foundation);
    
    // Registrar en sistema educativo
    if (educationalManager) {
        educationalManager.registerComponent(
            'fundacion_main',
            'fundacion',
            new THREE.Vector3(0, 0.3, 0),
            foundation
        );
    }
    
    return foundation;
}
```

### Ejemplo 2: Múltiples Columnas

```javascript
function createColumns(levels) {
    const columnGroup = new THREE.Group();
    
    const positions = [
        { x: -4, z: -4 }, { x: 4, z: -4 },
        { x: -4, z: 4 }, { x: 4, z: 4 }
    ];
    
    positions.forEach((pos, i) => {
        const column = createColumn(levels);
        column.position.set(pos.x, 0, pos.z);
        columnGroup.add(column);
        
        // Registrar cada columna
        if (educationalManager) {
            educationalManager.registerComponent(
                `columna_${i}`,
                'columna',
                new THREE.Vector3(pos.x, levels * 1.5, pos.z)
            );
        }
    });
    
    return columnGroup;
}
```

### Ejemplo 3: Integración con Sistema de Fierros

```javascript
// En reinforcement/manager.js
createFoundationReinforcement() {
    const reinforcement = // ... crear enfierradura
    
    // Registrar en sistema educativo
    if (window.educationalManager) {
        window.educationalManager.registerComponent(
            'fierro_fundacion',
            'fierro',
            new THREE.Vector3(0, 0.4, 0)
        );
    }
    
    return reinforcement;
}
```

---

## 📄 Licencia

Este sistema educativo es parte del proyecto Construcción 3D Educativo.

---

## 👥 Contribuir

Para agregar nuevos componentes educativos:

1. Agregar el contenido en `config.js` → `EDUCATIONAL_CONTENT`
2. Definir la posición del marcador en `MARKER_POSITIONS`
3. Registrar el componente donde se crea en el código
4. Probar la visualización y ajustar según sea necesario

---

## 📞 Soporte

Si encuentras problemas o tienes preguntas:

1. Revisa la guía de integración en `integration-guide.js`
2. Consulta los ejemplos en esta documentación
3. Verifica la consola del navegador para errores
4. Revisa que todos los archivos estén correctamente cargados

---

**¡Sistema Educativo listo para usar! 🎉**

Desarrollado para el proyecto Construcción 3D Educativo
