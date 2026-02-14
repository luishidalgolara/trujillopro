/**
 * brain_core.js — Scene, Camera, Renderer, OrbitControls
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const $ = id => document.getElementById(id);
const lbFill = $('lbFill'), lbTxt = $('lbTxt'), ls = $('ls');
const setLoad = (p, t) => { lbFill.style.width = p + '%'; lbTxt.textContent = t };

setLoad(10, 'Configurando escena...');
const canvas = $('brainCanvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080b12);
scene.fog = new THREE.FogExp2(0x080b12, 0.06);

const camera = new THREE.PerspectiveCamera(45, innerWidth / (innerHeight - 52), 0.1, 100);
camera.position.set(3, 2, 4);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setSize(innerWidth, innerHeight - 52);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.useLegacyLights = false;

const ctrl = new OrbitControls(camera, canvas);
ctrl.enableDamping = true; ctrl.dampingFactor = 0.06;
ctrl.rotateSpeed = 0.7; ctrl.zoomSpeed = 0.8;
ctrl.minDistance = 2; ctrl.maxDistance = 12;
ctrl.target.set(0, -0.8, -0.5);
ctrl.autoRotate = true; ctrl.autoRotateSpeed = 0.8;

window.__BRAIN3D = { scene, camera, renderer, ctrl, $, setLoad, ls };
