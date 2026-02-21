/* ============================================================
   gc-state.js — PharmaLab Chile | Galería Celular 3D
   Estado global compartido + Utilidades matemáticas 3D
   Debe cargarse DESPUÉS de gc-data.js
   ============================================================ */

'use strict';

/* ═══════════════════════════════════════════════════════════
   ESTADO GLOBAL
   ═══════════════════════════════════════════════════════════ */
let currentModalId = 0;
let modalCanvas, modalCtx;
let modalAnim = null;
let autoRotate = true;
let isDragging = false;
let lastMouseX = 0, lastMouseY = 0;
let rotX = 0.3, rotY = 0;
let zoom = 1;
let miniAnims = [];

/* ═══════════════════════════════════════════════════════════
   UTILIDADES MATEMÁTICAS 3D
   ═══════════════════════════════════════════════════════════ */
function rotateX(p, a) {
  return [p[0], p[1]*Math.cos(a) - p[2]*Math.sin(a), p[1]*Math.sin(a) + p[2]*Math.cos(a)];
}
function rotateY(p, a) {
  return [p[0]*Math.cos(a) + p[2]*Math.sin(a), p[1], -p[0]*Math.sin(a) + p[2]*Math.cos(a)];
}
function project(p, cx, cy, scale, fov) {
  const z = p[2] * scale + fov;
  const f = fov / z;
  return [cx + p[0]*scale*f, cy + p[1]*scale*f, f];
}
