# 📘 GUÍA DE INTEGRACIÓN

## PASO 1: COPIAR ARCHIVOS
Copia `sala-bombas/` a tu proyecto.

## PASO 2: CARGAR SCRIPTS
En `index.html` después de `render3d.js`:
```html
<script src="sala-bombas/utils/materiales.js"></script>
<script src="sala-bombas/utils/posicionamiento.js"></script>
<script src="sala-bombas/utils/etiquetas.js"></script>
<script src="sala-bombas/config/dimensiones-bombas.js"></script>
<script src="sala-bombas/modelos/sala-estructura.js"></script>
<script src="sala-bombas/modelos/bomba-centrifuga.js"></script>
<script src="sala-bombas/modelos/tuberias.js"></script>
<script src="sala-bombas/modelos/valvulas.js"></script>
<script src="sala-bombas/modelos/accesorios.js"></script>
<script src="sala-bombas/sala-bombas.js"></script>
```

## PASO 3: MODIFICAR formulario.js
En `actualizarResultados()`:
```javascript
if (resultados.numeroBombas > 0) {
    SalaBombas.crear(Render3D.scene, {
        numeroBombas: resultados.numeroBombas,
        potencia: resultados.potenciaBomba,
        caudal: resultados.caudalEstimado,
        presion: resultados.presionRequerida,
        posicionEstanque: {
            largo: resultados.largo,
            ancho: resultados.ancho,
            altura: resultados.altura
        }
    });
}
```

## PASO 4: AGREGAR BOTÓN (Opcional)
```html
<button id="toggleBombas">👁️ Mostrar/Ocultar Sala</button>
```

```javascript
document.getElementById('toggleBombas').addEventListener('click', () => {
    SalaBombas.toggleVisibilidad(!SalaBombas.getEstado().activo);
});
```

## ✅ ¡LISTO!
Ahora tu sistema visualiza la sala de bombas automáticamente.
