/* ============================================================
   gc-state.js — PharmaLab Chile | Galería Química General
   Estado global compartido entre módulos
   ============================================================ */

'use strict';

/* ─── Estado del modal ─── */
let currentModalId = 0;
let modalAnim      = null;
let autoRotate     = true;

/* ─── Controles de vista 3D ─── */
let rotX = 0.3;
let rotY = 0;
let zoom = 1;

/* ─── Drag / touch ─── */
let isDragging  = false;
let lastMouseX  = 0;
let lastMouseY  = 0;

/* ─── Mini-canvas animations ─── */
let miniAnims = [];

/* ─── Utilidades matemáticas 3D ─── */
function project3D(x, y, z, cx, cy, fov = 320) {
  const scale = fov / (fov + z);
  return { x: cx + x * scale, y: cy + y * scale, s: scale };
}

function rotateX(x, y, z, a) {
  return { x, y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a) };
}

function rotateY(x, y, z, a) {
  return { x: x * Math.cos(a) + z * Math.sin(a), y, z: -x * Math.sin(a) + z * Math.cos(a) };
}
