# 📄 SISTEMA DE EXPORTACIÓN PDF DE ALTA CALIDAD

Sistema profesional de exportación de planos eléctricos a PDF con máxima calidad vectorial.

---

## 🚀 INSTALACIÓN

### 1️⃣ Agregar librerías externas al HTML

Agrega estas líneas en el `<head>` de tu `index-electrico.html`:

```html
<!-- Librerías para exportación PDF -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

<!-- Estilos de exportación -->
<link rel="stylesheet" href="exportar-pdf/exportador-styles.css">
```

### 2️⃣ Cargar scripts del sistema

Agrega antes del `</body>`:

```html
<!-- Sistema de exportación PDF -->
<script src="exportar-pdf/exportador-configuracion.js"></script>
<script src="exportar-pdf/exportador-core.js"></script>
<script src="exportar-pdf/exportador-ui.js"></script>
```

### 3️⃣ Conectar el botón de exportación

Busca el botón "EXPORTAR PLANO" en tu HTML y modifica el `onclick`:

```html
<!-- ANTES -->
<button class="btn-header btn-success" onclick="exportarResultados()">
    💾 EXPORTAR PLANO
</button>

<!-- DESPUÉS -->
<button class="btn-header btn-success" onclick="mostrarModalExportacionPDF()">
    💾 EXPORTAR PLANO
</button>
```

---

## ✨ CARACTERÍSTICAS

### 🎯 Presets de Calidad

| Preset   | DPI | Escala | Uso                        | Tamaño |
|----------|-----|--------|----------------------------|--------|
| Máxima   | 600 | 4x     | Impresión profesional      | 15-25 MB |
| Alta     | 300 | 2x     | Balance calidad/tamaño     | 5-8 MB |
| Media    | 150 | 1.5x   | Visualización digital      | 2-4 MB |
| Rápida   | 96  | 1x     | Preview rápido             | 1-2 MB |

### 📐 Formatos Disponibles

- **A0**: 1189 × 841 mm (planos grandes)
- **A1**: 841 × 594 mm (estándar) ✅ 
- **A2**: 594 × 420 mm
- **A3**: 420 × 297 mm

### 📦 Elementos Incluidos

✅ Plano eléctrico base (SVG vectorial)
✅ Símbolos eléctricos (⚡💡🔌)
✅ Cuadro de cargas
✅ Tablero eléctrico
✅ Viñeta técnica
✅ Simbología
✅ Etiquetas y anotaciones

---

## 🎮 USO

### Exportación Básica

1. Diseña tu plano normalmente
2. Click en **"💾 EXPORTAR PLANO"**
3. Selecciona preset de calidad (recomendado: **Alta**)
4. Click en **"📄 Exportar a PDF"**
5. ¡Listo! El PDF se descarga automáticamente

### Exportación Personalizada

```javascript
// Desde la consola del navegador
await exportarPlanoAPDF();
```

### Configuración Manual

```javascript
// Cambiar preset
aplicarPresetPDF('maxima');

// Obtener configuración actual
const config = obtenerConfiguracionPDF();
console.log(config);

// Modificar configuración
config.calidad.dpi = 450;
config.pagina.formato = 'A0';
actualizarConfiguracionPDF(config);
```

---

## 🔧 CONFIGURACIÓN AVANZADA

### Cambiar DPI

```javascript
const config = obtenerConfiguracionPDF();
config.calidad.dpi = 450; // Valor personalizado
actualizarConfiguracionPDF(config);
```

### Activar/Desactivar Elementos

```javascript
const config = obtenerConfiguracionPDF();
config.elementos.cuadroCargas = false; // No incluir cuadro de cargas
config.elementos.vineta = false;       // No incluir viñeta
actualizarConfiguracionPDF(config);
```

### Cambiar Compresión

```javascript
const config = obtenerConfiguracionPDF();
config.calidad.compresion = 'media'; // 'ninguna', 'baja', 'media', 'alta'
actualizarConfiguracionPDF(config);
```

---

## 📋 MARCADO DE ELEMENTOS

Para que el sistema detecte correctamente los elementos integrados, asegúrate de que tengan los atributos data correctos:

```html
<!-- Cuadro de cargas integrado -->
<foreignObject data-cuadro-cargas-integrado>
  <!-- contenido -->
</foreignObject>

<!-- Tablero eléctrico integrado -->
<foreignObject data-tablero-integrado>
  <!-- contenido -->
</foreignObject>

<!-- Viñeta integrada -->
<foreignObject data-vineta-integrada>
  <!-- contenido -->
</foreignObject>

<!-- Simbología integrada -->
<foreignObject data-simbologia-integrada>
  <!-- contenido -->
</foreignObject>
```

---

## ⚡ OPTIMIZACIÓN

### Para Máxima Calidad

```javascript
aplicarPresetPDF('maxima');
const config = obtenerConfiguracionPDF();
config.calidad.dpi = 600;
config.calidad.escala = 4;
config.calidad.compresion = 'ninguna';
config.calidad.antialiasing = true;
actualizarConfiguracionPDF(config);
```

### Para Archivos Pequeños

```javascript
aplicarPresetPDF('media');
const config = obtenerConfiguracionPDF();
config.calidad.compresion = 'alta';
config.elementos.simbologia = false; // Omitir si no es necesario
actualizarConfiguracionPDF(config);
```

---

## 🐛 TROUBLESHOOTING

### Error: "jsPDF no está cargado"
**Solución**: Verifica que la librería esté cargada en el HTML:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

### PDF en blanco
**Solución**: Verifica que el SVG tenga id="plano"
```html
<svg id="plano" viewBox="0 0 841 594">
```

### Elementos no aparecen en PDF
**Solución**: Verifica los atributos data-* en los elementos integrados

### Archivo muy grande
**Solución**: Usa preset "Media" o "Rápida", o aumenta la compresión

---

## 📊 CALIDAD vs TAMAÑO

| Preset   | Calidad Visual | Tamaño Archivo | Tiempo Export |
|----------|----------------|----------------|---------------|
| Máxima   | ⭐⭐⭐⭐⭐     | 15-25 MB       | 10-15 seg     |
| Alta     | ⭐⭐⭐⭐       | 5-8 MB         | 5-8 seg       |
| Media    | ⭐⭐⭐         | 2-4 MB         | 3-5 seg       |
| Rápida   | ⭐⭐           | 1-2 MB         | 1-2 seg       |

**Recomendación**: Usa **"Alta"** para balance ideal entre calidad y tamaño.

---

## 🎨 PERSONALIZACIÓN

### Metadatos del PDF

```javascript
const config = obtenerConfiguracionPDF();
config.avanzado.metadatos = {
    titulo: 'Mi Proyecto Eléctrico',
    autor: 'Ingeniero Eléctrico',
    asunto: 'Diseño eléctrico residencial',
    palabrasClave: 'plano, eléctrico, vivienda'
};
actualizarConfiguracionPDF(config);
```

### Marca de Agua

```javascript
const config = obtenerConfiguracionPDF();
config.avanzado.marcaAgua = true;
config.avanzado.textoMarcaAgua = 'PRELIMINAR';
actualizarConfiguracionPDF(config);
```

---

## 💡 TIPS

✅ **Usa preset "Alta"** para proyectos finales
✅ **Verifica el plano** antes de exportar
✅ **Cierra modales** antes de exportar
✅ **Usa formato A1** para planos domiciliarios
✅ **Incluye todos los elementos** en exportación final

---

## 🆘 SOPORTE

Si tienes problemas:
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica que todas las librerías estén cargadas
4. Comprueba que los elementos tengan los atributos correctos

---

## 📄 VERSIÓN

**v1.0.0** - Sistema de exportación PDF de alta calidad
- ✅ Exportación vectorial
- ✅ Múltiples presets de calidad
- ✅ Formatos A0-A4
- ✅ Elementos integrados
- ✅ 100% local, sin APIs

---

**¡Listo para exportar planos de calidad profesional!** 🚀
