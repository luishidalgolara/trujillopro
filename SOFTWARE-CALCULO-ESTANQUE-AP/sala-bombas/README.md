# 🔧 MÓDULO SALA DE BOMBAS 3D
Sistema de visualización 3D para salas de bombeo

## 📖 Descripción
Módulo independiente para renderizar salas de bombas en 3D con bombas centrífugas, tuberías, válvulas y accesorios.

## ✨ Características
- ✅ Bombas Centrífugas Detalladas
- ✅ Sistema de Tuberías (succión e impulsión)
- ✅ Válvulas y accesorios
- ✅ Sala completa (paredes, piso, techo)
- ✅ Tablero eléctrico
- ✅ Etiquetas informativas
- ✅ Posicionamiento automático

## 🚀 Uso Rápido
```javascript
// Crear sala
SalaBombas.crear(scene, {
    numeroBombas: 2,
    potencia: 5,
    caudal: 50,
    presion: 30,
    posicionEstanque: { largo: 4, ancho: 3, altura: 2.5 }
});

// Eliminar sala
SalaBombas.eliminar(scene);
```

## 📦 Dependencias
- Three.js r128

Ver **INTEGRACION.md** para guía completa de integración.
