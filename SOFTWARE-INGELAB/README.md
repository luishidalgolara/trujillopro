# 🏗️ Sistema Educativo 3D - Estructuras de Construcción

Sistema interactivo y educativo para visualizar en 3D las estructuras de construcción de edificios de 1 a 3 niveles.

## 🎯 Características

- **Visualización 3D Interactiva**: Explora edificios de 1, 2 y 3 niveles en tiempo real
- **Vista Explosiva**: Separa los componentes para ver cada capa estructural
- **Componentes Detallados**: Información educativa completa de cada elemento
- **Interfaz Elegante**: Diseño moderno y sofisticado
- **Controles Intuitivos**: Fácil navegación con mouse y teclado
- **Etiquetas Dinámicas**: Identifica componentes en tiempo real
- **Información Técnica**: Especificaciones, materiales y normativas

## 🏢 Componentes Estructurales

### Elementos disponibles:
1. **Cimentación** - Base y zapatas del edificio
2. **Columnas** - Soportes verticales de concreto armado
3. **Vigas** - Elementos horizontales estructurales
4. **Losas** - Pisos y techos de concreto
5. **Muros** - Paredes divisorias y de carga
6. **Refuerzo de Acero** - Varillas y estribos
7. **Cubierta/Techo** - Protección superior
8. **Escaleras** - Circulación vertical (en edificios de 2+ niveles)

## 🎮 Controles

### Mouse:
- **Click Izquierdo + Arrastrar**: Rotar la cámara
- **Click Derecho + Arrastrar**: Mover la vista (pan)
- **Scroll**: Zoom in/out
- **Click en Componentes**: Ver información detallada

### Teclado:
- **1, 2, 3**: Cambiar entre 1, 2 o 3 niveles
- **E**: Activar/desactivar vista explosiva
- **R**: Reiniciar vista de cámara
- **L**: Mostrar/ocultar etiquetas
- **ESC**: Cerrar panel de información

### Comandos de Consola:
- `help` - Mostrar ayuda de atajos de teclado
- `stats` - Ver estadísticas de rendimiento
- `credits` - Ver créditos del sistema

## 🚀 Instalación y Uso

### Opción 1: Usar directamente
1. Descomprime el archivo ZIP
2. Abre `index.html` en tu navegador web
3. ¡Listo! El sistema se cargará automáticamente

### Opción 2: Servidor local (recomendado)
```bash
# Si tienes Python 3 instalado:
python -m http.server 8000

# Si tienes Node.js instalado:
npx http-server

# Luego abre en tu navegador:
# http://localhost:8000
```

## 📋 Requisitos

- Navegador moderno con soporte para WebGL:
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+
- JavaScript habilitado
- Conexión a internet (para cargar Three.js desde CDN)

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura del documento
- **CSS3** - Estilos elegantes y animaciones
- **JavaScript ES6+** - Lógica de la aplicación
- **Three.js r128** - Renderizado 3D
- **WebGL** - Aceleración gráfica por hardware

## 📁 Estructura del Proyecto

```
construccion-3d-educativo/
│
├── index.html                 # Página principal
│
├── css/
│   ├── style.css             # Estilos principales
│   └── ui.css                # Estilos de interfaz
│
├── js/
│   ├── main.js               # Inicialización
│   ├── scene.js              # Configuración 3D
│   ├── models.js             # Modelos 3D
│   ├── controls.js           # Controles de usuario
│   ├── ui.js                 # Lógica de interfaz
│   └── data/
│       └── estructuras.js    # Datos educativos
│
└── README.md                 # Este archivo
```

## 🎓 Uso Educativo

Este sistema está diseñado para:

- **Estudiantes de Arquitectura**: Comprender estructuras básicas
- **Estudiantes de Ingeniería Civil**: Visualizar componentes estructurales
- **Profesores**: Material didáctico interactivo
- **Profesionales**: Referencia visual rápida
- **Público General**: Aprender sobre construcción

## 💡 Características Avanzadas

### Vista Explosiva
Activa con el botón "Vista Explosiva" o presiona `E` para separar los componentes y visualizar cada capa independientemente.

### Información Detallada
Haz click en cualquier componente para ver:
- Función principal
- Materiales utilizados
- Especificaciones técnicas
- Tipos de elementos
- Importancia estructural

### Visibilidad de Componentes
Usa la lista lateral para mostrar/ocultar componentes individuales y enfocarte en elementos específicos.

## 🐛 Solución de Problemas

### El modelo no se carga
- Verifica tu conexión a internet
- Asegúrate de que JavaScript esté habilitado
- Prueba con otro navegador
- Revisa la consola del navegador (F12) para errores

### Rendimiento lento
- Cierra otras pestañas del navegador
- Actualiza tus drivers gráficos
- Usa un navegador más moderno
- Reduce el tamaño de la ventana

### No veo las texturas
- Verifica que WebGL esté habilitado
- Actualiza tu navegador
- Prueba con diferentes niveles de calidad

## 📝 Notas Técnicas

- El sistema usa coordenadas métricas reales
- Los colores representan diferentes materiales
- Las proporciones son aproximadamente a escala
- Las especificaciones técnicas son basadas en normativas estándar

## 🔄 Actualizaciones Futuras

Características planeadas:
- [ ] Más tipos de edificios
- [ ] Sistema de medidas dinámico
- [ ] Exportar vistas a imagen
- [ ] Modo realidad aumentada
- [ ] Calculadora estructural
- [ ] Más materiales y texturas

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 👥 Créditos

Desarrollado con ❤️ usando:
- Three.js - Biblioteca de renderizado 3D
- Diseño moderno y elegante
- Datos técnicos basados en normativas de construcción

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias:
1. Revisa este README
2. Verifica los requisitos del sistema
3. Consulta la consola del navegador para errores

---

**¡Explora, aprende y disfruta del mundo de la construcción en 3D!** 🏗️✨
