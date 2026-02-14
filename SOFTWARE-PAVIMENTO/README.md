# 🛣️ Software Educativo sobre Pavimentos de Chile

Software interactivo educativo en 3D para la enseñanza de tipos de pavimentación en Chile, diseñado para profesores e instituciones educativas.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Educational-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white)

## 📋 Descripción

Este software educativo permite visualizar de manera interactiva los tres principales tipos de pavimentación utilizados en Chile:

- **Pavimento Flexible (Asfáltico)** 🛣️
- **Pavimento Rígido (Hormigón)** 🧱
- **Pavimento Semirrígido** ⚙️

## ✨ Características

### Visualización 3D Interactiva
- ✅ Visor 3D con rotación 360°
- ✅ Función "Explotar Capas" para ver cada capa por separado
- ✅ Rotación automática
- ✅ Zoom y navegación fluida
- ✅ Click en capas para información detallada

### Información Técnica Completa
- ✅ Descripción de cada tipo de pavimento
- ✅ Materiales principales
- ✅ Funcionamiento estructural
- ✅ Capas típicas con espesores
- ✅ Ventajas y desventajas
- ✅ Datos específicos de Chile

### Datos de Chile Incluidos
- ✅ Normas chilenas aplicables (Manual de Carreteras MOP, NCh)
- ✅ Ejemplos reales en Chile
- ✅ Consideraciones climáticas por zona
- ✅ Costos referenciales 2026
- ✅ Distribución de uso en el país

## 🚀 Instalación y Uso

### Opción 1: Uso Directo (Recomendado)
1. Descomprimir el archivo ZIP
2. Abrir el archivo `index.html` en un navegador moderno
3. ¡Listo para usar!

### Opción 2: Servidor Local
```bash
# Si tienes Python instalado:
python -m http.server 8000

# O con Node.js:
npx http-server
```
Luego abrir: `http://localhost:8000`

## 🎮 Controles

### Controles del Mouse
- **Click izquierdo + Arrastrar**: Rotar la vista
- **Scroll**: Hacer zoom in/out
- **Click derecho + Arrastrar**: Mover la cámara
- **Click en capas**: Ver información detallada

### Atajos de Teclado
- **E**: Explotar/Contraer capas
- **R**: Activar/desactivar rotación automática
- **Espacio**: Resetear vista
- **1**: Pavimento Flexible
- **2**: Pavimento Rígido
- **3**: Pavimento Semirrígido

### Botones de Interfaz
- **Explotar Capas**: Separa las capas verticalmente para mejor visualización
- **Rotar Automático**: Activa la rotación continua del modelo
- **Resetear Vista**: Vuelve a la posición inicial de la cámara

## 📁 Estructura del Proyecto

```
pavimento-educativo-chile/
│
├── index.html                      # Página principal
│
├── css/
│   ├── style.css                   # Estilos generales
│   ├── viewer3d.css                # Estilos del visor 3D
│   └── responsive.css              # Estilos responsivos
│
├── js/
│   ├── main.js                     # Inicialización de la app
│   ├── viewer3d.js                 # Motor del visor 3D (Three.js)
│   ├── data-pavimentos.js          # Base de datos de pavimentos
│   └── ui-controls.js              # Controles de interfaz
│
├── assets/
│   ├── images/                     # Imágenes del proyecto
│   ├── data/                       # Datos adicionales
│   └── models/                     # Modelos 3D (si se usan externos)
│
└── README.md                       # Este archivo
```

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y animaciones
- **JavaScript ES6**: Lógica de la aplicación
- **Three.js (r128)**: Renderizado 3D
- **CDN**: Carga de librerías desde Cloudflare

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Google Chrome (recomendado)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ✅ Opera

### Requisitos Mínimos
- Navegador con soporte WebGL
- JavaScript habilitado
- Resolución mínima: 1024x768
- Conexión a internet (para cargar Three.js desde CDN)

### Dispositivos
- ✅ Computadores de escritorio
- ✅ Laptops
- ✅ Tablets
- ✅ Móviles (con funcionalidad limitada)

## 🎓 Uso Educativo

### Para Profesores
Este software está diseñado específicamente para:
- Clases de Ingeniería Civil
- Cursos de Infraestructura Vial
- Talleres de Pavimentación
- Seminarios técnicos
- Material de apoyo visual

### Contenido Pedagógico
Cada tipo de pavimento incluye:
- Descripción técnica clara
- Explicación del comportamiento estructural
- Detalles de cada capa constructiva
- Análisis de ventajas y desventajas
- Ejemplos reales en Chile
- Normativa aplicable

## 📊 Información Técnica

### Pavimento Flexible
- Uso en Chile: 87% de pavimentos
- Vida útil: 10-15 años
- Costo: $8.000 - $15.000 CLP/m²
- Normas: Manual de Carreteras Vol. 5 (MOP), NCh 1852

### Pavimento Rígido
- Uso en Chile: 8% de pavimentos
- Vida útil: 30-40+ años
- Costo: $18.000 - $30.000 CLP/m²
- Normas: Manual de Carreteras Vol. 5 (MOP), NCh 170, NCh 1017

### Pavimento Semirrígido
- Uso en Chile: 5% de pavimentos
- Vida útil: 20-25 años
- Costo: $12.000 - $20.000 CLP/m²
- Normas: MC V5 8.302, MC V5 8.303, NCh 158

## 🐛 Solución de Problemas

### El visor 3D no carga
- Verificar que JavaScript esté habilitado
- Comprobar conexión a internet (para CDN de Three.js)
- Verificar que el navegador soporte WebGL
- Probar en otro navegador

### Pantalla en blanco
- Recargar la página (F5 o Ctrl+R)
- Limpiar caché del navegador
- Verificar la consola del navegador (F12) para errores

### Rendimiento lento
- Cerrar otras pestañas del navegador
- Desactivar extensiones del navegador
- Usar un navegador más moderno
- Verificar que la tarjeta gráfica tenga drivers actualizados

## 🔄 Actualizaciones Futuras

### En desarrollo:
- [ ] Modo de comparación lado a lado
- [ ] Exportación de informes en PDF
- [ ] Calculadora de costos
- [ ] Más ejemplos de proyectos chilenos
- [ ] Versión offline completa
- [ ] Soporte para VR/AR

## 📞 Soporte

Para reportar problemas o sugerencias:
- Usar la función de feedback del software
- Contactar al administrador del sistema
- Revisar la documentación técnica

## 📄 Licencia

Este software es de uso educativo. Desarrollado para instituciones educativas y profesores de Chile.

## 👥 Créditos

- **Desarrollado por**: Sistema Educativo de Pavimentación
- **Año**: 2026
- **Basado en**: Normativa MOP Chile y NCh
- **Tecnología 3D**: Three.js

## 🇨🇱 Información sobre Chile

Este software utiliza información oficial de:
- Ministerio de Obras Públicas (MOP) - Dirección de Vialidad
- Manual de Carreteras Volumen 5
- Instituto Nacional de Normalización (INN)
- Normas Chilenas (NCh)

---

**Versión**: 1.0.0  
**Fecha**: Febrero 2026  
**Estado**: ✅ Producción

🛣️ **¡Bienvenido al futuro de la educación en pavimentación!** 🇨🇱
