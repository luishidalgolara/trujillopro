# SISTEMA DE PLANOS ELÉCTRICOS MÚLTIPLES

Sistema modular para gestionar múltiples planos eléctricos en la aplicación ELEKTRA.

## 📁 ESTRUCTURA DE ARCHIVOS

```
sistema-planos-electricos/
├── electrico-plano-instance.js      - Clase para cada plano individual
├── electrico-plano-state.js         - Estado global del sistema
├── electrico-plano-state-manager.js - Guardar/cargar estado de planos
├── electrico-plano-manager.js       - Gestor principal (crear, eliminar, duplicar)
├── electrico-plano-ui.js            - Interfaz de usuario (barra inferior)
├── electrico-plano-integration.js   - Integración con el código existente
└── electrico-plano-styles.css       - Estilos visuales
```

## 🔗 CÓMO INTEGRAR CON index-electrico.html

### 1. Agregar los archivos CSS y JS en el `<head>`:

```html
<!-- SISTEMA DE PLANOS MÚLTIPLES -->
<link rel="stylesheet" href="sistema-planos-electricos/electrico-plano-styles.css">
```

### 2. Agregar los scripts ANTES del cierre `</body>`:

```html
<!-- SISTEMA DE PLANOS ELÉCTRICOS MÚLTIPLES -->
<script src="sistema-planos-electricos/electrico-plano-instance.js"></script>
<script src="sistema-planos-electricos/electrico-plano-state.js"></script>
<script src="sistema-planos-electricos/electrico-plano-state-manager.js"></script>
<script src="sistema-planos-electricos/electrico-plano-manager.js"></script>
<script src="sistema-planos-electricos/electrico-plano-ui.js"></script>
<script src="sistema-planos-electricos/vineta-interceptor.js"></script>
<script src="sistema-planos-electricos/electrico-plano-integration.js"></script>
```

**IMPORTANTE:** Estos scripts deben ir DESPUÉS de que se carguen tus scripts principales pero ANTES del cierre final `</body>`.

## ⚡ CARACTERÍSTICAS

### ✅ Funcionalidades principales:
- Crear hasta 10 planos eléctricos independientes
- Duplicar planos con todo su contenido
- Eliminar planos (mínimo 1 plano siempre)
- Renombrar planos
- Cambiar entre planos con un click
- Vista previa en miniaturas
- Auto-guardado cada 30 segundos
- Exportar/importar todos los planos

### ✅ Cada plano guarda:
- Formato (A0/A1)
- Escala (1:50, 1:75, etc.)
- Todos los elementos eléctricos
- Trazados automáticos
- Dibujos libres
- Etiquetas
- Configuración de tablero
- Isométrico 3D
- Viñeta eléctrica
- Simbología
- Y más...

### ✅ Interceptores automáticos:
- Cambios de formato A0/A1
- Cambios de escala
- Selección de herramientas
- Cambios de modo (edición/navegación)
- Modificaciones en el canvas SVG

## 🎮 CONTROLES

### Barra inferior:
- **➕ AGREGAR PLANO** - Crear nuevo plano
- **💾 Exportar** - Exportar todos los planos a JSON
- **⬇️ Ocultar** - Colapsar la barra

### Por cada miniatura:
- **Click** - Cambiar a ese plano
- **📋** - Duplicar plano
- **✏️** - Renombrar plano
- **🗑️** - Eliminar plano

### Atajos de teclado:
- **P** - Mostrar/ocultar barra de planos

## 🎨 PERSONALIZACIÓN

Los estilos están en `electrico-plano-styles.css`:
- Colores: Amarillo/Naranja temático (🟡⚡)
- Altura de barra: 180px
- Tamaño miniaturas: 220x130px
- Efectos hover y animaciones

## 🔍 DEBUGGING

Todos los archivos tienen `console.log()` para seguimiento:
- ✅ Confirmaciones de carga
- 📐 Cambios de formato
- 📏 Cambios de escala
- 🔄 Cambios de plano
- 💾 Auto-guardados

## ⚠️ NOTAS IMPORTANTES

1. El sistema se inicializa automáticamente 1.5 segundos después de cargar la página
2. Siempre debe haber al menos 1 plano
3. Máximo 10 planos por proyecto
4. El estado se guarda automáticamente al cambiar de plano
5. Se guarda automáticamente cada 30 segundos
6. Se guarda antes de cerrar/recargar la página

## 🚀 PRÓXIMOS PASOS

Después de integrar:
1. Probar crear un plano nuevo
2. Dibujar algo en el plano 1
3. Crear plano 2 y verificar que plano 1 mantiene su contenido
4. Probar duplicar, renombrar, eliminar
5. Verificar que los formatos A0/A1 se guardan correctamente
6. Verificar auto-guardado (esperar 30 seg y cambiar de plano)

---
Desarrollado para ELEKTRA - Editor de Planos Eléctricos Domiciliarios
