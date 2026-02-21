/**
 * PHARMASIM — molecule-renderer.js
 * Motor de renderizado 3D con Three.js
 */

class MoleculeRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.wrap   = this.canvas.parentElement;
        this.molecule = null;
        this.currentMod = null;
        this.displayMode = 'ballstick'; // ballstick | wireframe | sphere
        this.autoRotating = false;
        this.hoveredAtom = null;
        this.selectedAtom = null;
        this.atomMeshes = [];
        this.bondMeshes = [];

        this._initScene();
        this._initLights();
        this._initControls();
        this._startLoop();
        this._handleResize();
    }

    // ── SCENE SETUP ────────────────────────────────────────────────
    _initScene() {
        const w = this.wrap.clientWidth;
        const h = this.wrap.clientHeight;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0x050810, 1);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        this.scene = new THREE.Scene();

        // Fog for depth
        this.scene.fog = new THREE.FogExp2(0x050810, 0.012);

        // Camera
        this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 200);
        this.camera.position.set(0, 0, 20);

        // Raycaster
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(-999, -999);

        // Groups
        this.molGroup = new THREE.Group();
        this.scene.add(this.molGroup);

        // Background particle field
        this._addParticleField();
    }

    _addParticleField() {
        const geo = new THREE.BufferGeometry();
        const count = 300;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            pos[i] = (Math.random() - 0.5) * 80;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({
            size: 0.08,
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.25,
            sizeAttenuation: true
        });
        this.particles = new THREE.Points(geo, mat);
        this.scene.add(this.particles);
    }

    _initLights() {
        // Ambient
        const ambient = new THREE.AmbientLight(0x112244, 0.8);
        this.scene.add(ambient);

        // Key light (top-left)
        const key = new THREE.DirectionalLight(0xffffff, 1.4);
        key.position.set(8, 10, 10);
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        this.scene.add(key);

        // Fill light (blue, opposite)
        const fill = new THREE.DirectionalLight(0x4488ff, 0.5);
        fill.position.set(-8, -4, -6);
        this.scene.add(fill);

        // Rim light (accent cyan)
        const rim = new THREE.DirectionalLight(0x00d4ff, 0.3);
        rim.position.set(0, -8, -10);
        this.scene.add(rim);

        // Point light at molecule center
        this.molLight = new THREE.PointLight(0x00d4ff, 0.4, 30);
        this.molLight.position.set(0, 0, 0);
        this.scene.add(this.molLight);
    }

    // ── CONTROLS (drag + zoom, NO OrbitControls) ────────────────────
    _initControls() {
        this._isDragging = false;
        this._lastMouse = { x: 0, y: 0 };
        this._rotX = 0;
        this._rotY = 0;
        this._scale = 1;
        this._zoomLevel = 20;

        const canvas = this.canvas;

        canvas.addEventListener('mousedown', (e) => {
            if (e.target !== canvas) return;
            this._isDragging = true;
            this._lastMouse = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouse.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
            this.mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;

            if (!this._isDragging) {
                this._updateHover();
            } else {
                const dx = e.clientX - this._lastMouse.x;
                const dy = e.clientY - this._lastMouse.y;
                this._rotY += dx * 0.008;
                this._rotX += dy * 0.008;
                this._lastMouse = { x: e.clientX, y: e.clientY };
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (this._isDragging) {
                const dx = Math.abs(e.clientX - this._lastMouse.x);
                const dy = Math.abs(e.clientY - this._lastMouse.y);
                if (dx < 3 && dy < 3) this._handleClick();
            }
            this._isDragging = false;
        });

        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            this._zoomLevel += e.deltaY * 0.02;
            this._zoomLevel = Math.max(5, Math.min(45, this._zoomLevel));
        }, { passive: false });

        // Touch
        let lastTouchDist = 0;
        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                this._isDragging = true;
                this._lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            } else if (e.touches.length === 2) {
                lastTouchDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            }
        });
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches.length === 1 && this._isDragging) {
                const dx = e.touches[0].clientX - this._lastMouse.x;
                const dy = e.touches[0].clientY - this._lastMouse.y;
                this._rotY += dx * 0.008;
                this._rotX += dy * 0.008;
                this._lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            } else if (e.touches.length === 2) {
                const d = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                this._zoomLevel -= (d - lastTouchDist) * 0.05;
                this._zoomLevel = Math.max(5, Math.min(45, this._zoomLevel));
                lastTouchDist = d;
            }
        }, { passive: false });
        canvas.addEventListener('touchend', () => { this._isDragging = false; });
    }

    _updateHover() {
        if (!this.atomMeshes.length) return;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const hits = this.raycaster.intersectObjects(this.atomMeshes);

        if (hits.length > 0) {
            const mesh = hits[0].object;
            if (this.hoveredAtom !== mesh) {
                if (this.hoveredAtom && !this.hoveredAtom._selected) {
                    this.hoveredAtom.material.emissiveIntensity = 0;
                }
                this.hoveredAtom = mesh;
                mesh.material.emissiveIntensity = 0.4;
                this._showTooltip(mesh, hits[0].point);
                this.canvas.style.cursor = 'pointer';
            }
        } else {
            if (this.hoveredAtom && !this.hoveredAtom._selected) {
                this.hoveredAtom.material.emissiveIntensity = 0;
            }
            this.hoveredAtom = null;
            this._hideTooltip();
            this.canvas.style.cursor = this._isDragging ? 'grabbing' : 'grab';
        }
    }

    _handleClick() {
        if (!this.atomMeshes.length) return;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const hits = this.raycaster.intersectObjects(this.atomMeshes);

        if (this.selectedAtom) {
            this.selectedAtom.material.emissiveIntensity = 0;
            this.selectedAtom._selected = false;
            if (this.selectedAtom === (hits[0] && hits[0].object)) {
                this.selectedAtom = null;
                window.hideAtomInfoPanel && window.hideAtomInfoPanel();
                return;
            }
        }

        if (hits.length > 0) {
            const mesh = hits[0].object;
            this.selectedAtom = mesh;
            mesh._selected = true;
            mesh.material.emissiveIntensity = 0.6;
            window.showAtomInfoPanel && window.showAtomInfoPanel(mesh._atomData);
        } else {
            this.selectedAtom = null;
            window.hideAtomInfoPanel && window.hideAtomInfoPanel();
        }
    }

    _showTooltip(mesh, point) {
        const tooltip = document.getElementById('atomTooltip');
        const atomData = mesh._atomData;
        if (!tooltip || !atomData) return;

        const rect = this.canvas.getBoundingClientRect();
        const vec = point.clone().project(this.camera);
        const x = (vec.x * 0.5 + 0.5) * rect.width;
        const y = (-vec.y * 0.5 + 0.5) * rect.height;

        tooltip.style.left = x + 'px';
        tooltip.style.top  = y + 'px';
        tooltip.querySelector('.tooltip-element').textContent = atomData.el;
        tooltip.querySelector('.tooltip-info').textContent =
            window.ELEMENT_COLORS[atomData.el] ? window.ELEMENT_COLORS[atomData.el].name : atomData.el;
        tooltip.classList.add('visible');
    }

    _hideTooltip() {
        const tooltip = document.getElementById('atomTooltip');
        if (tooltip) tooltip.classList.remove('visible');
    }

    // ── MOLECULE LOADING ────────────────────────────────────────────
    loadMolecule(molData, modification = null) {
        this.molecule = molData;
        this.currentMod = modification;

        // Clear existing
        while (this.molGroup.children.length) {
            const obj = this.molGroup.children[0];
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) obj.material.dispose();
            this.molGroup.remove(obj);
        }
        this.atomMeshes = [];
        this.bondMeshes = [];
        this.selectedAtom = null;
        this.hoveredAtom = null;
        this._hideTooltip();

        const atoms = molData.structure.atoms;
        const bonds = molData.structure.bonds;

        // Apply modification if any
        let modAtoms = atoms;
        if (modification && modification.changes) {
            // Visual indication only – slight color shift
        }

        // Scale factor
        const scale = 0.9;

        // Build atoms
        atoms.forEach((atom, idx) => {
            const elData = window.ELEMENT_COLORS[atom.el] || { hex: 0xaaaaaa, name: atom.el, num: 0, mass: 0 };
            let radius;

            if (this.displayMode === 'sphere') {
                radius = (atom.r || 0.5) * 1.4;
            } else if (this.displayMode === 'wireframe') {
                radius = 0.12;
            } else {
                radius = (atom.r || 0.5) * 0.55;
            }

            const geo = new THREE.SphereGeometry(radius, 20, 20);
            const mat = new THREE.MeshStandardMaterial({
                color: modification ? this._getModColor(atom, idx, modification) : elData.hex,
                emissive: elData.hex,
                emissiveIntensity: 0,
                roughness: 0.25,
                metalness: 0.1,
            });

            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(atom.x * scale, atom.y * scale, atom.z * scale);
            mesh.castShadow = true;
            mesh._atomData = { ...atom, idx, elData };
            mesh._originalColor = elData.hex;
            this.molGroup.add(mesh);
            this.atomMeshes.push(mesh);
        });

        // Build bonds
        if (this.displayMode !== 'sphere') {
            bonds.forEach(([a, b, order]) => {
                const posA = new THREE.Vector3(atoms[a].x * scale, atoms[a].y * scale, atoms[a].z * scale);
                const posB = new THREE.Vector3(atoms[b].x * scale, atoms[b].y * scale, atoms[b].z * scale);

                if (order === 1) {
                    this._addBond(posA, posB, 0x99aacc, 0.1);
                } else if (order === 2) {
                    const off = new THREE.Vector3(0.15, 0.15, 0).applyQuaternion(
                        new THREE.Quaternion().setFromUnitVectors(
                            new THREE.Vector3(0, 1, 0),
                            posB.clone().sub(posA).normalize()
                        )
                    );
                    this._addBond(posA.clone().add(off), posB.clone().add(off), 0x99aacc, 0.07);
                    this._addBond(posA.clone().sub(off), posB.clone().sub(off), 0x99aacc, 0.07);
                }
            });
        }

        // Center molecule
        const bbox = new THREE.Box3().setFromObject(this.molGroup);
        const center = bbox.getCenter(new THREE.Vector3());
        this.molGroup.position.sub(center);

        // Adjust camera distance
        const size = bbox.getSize(new THREE.Vector3()).length();
        this._zoomLevel = size * 2.2;
        this.camera.position.set(0, 0, this._zoomLevel);

        // Update info overlay
        this._updateOverlayInfo(molData);

        // Animate entry
        this.molGroup.scale.set(0.1, 0.1, 0.1);
        this._animateEntry();
    }

    _getModColor(atom, idx, mod) {
        const elData = window.ELEMENT_COLORS[atom.el] || { hex: 0xaaaaaa };
        // Highlight modified atoms (last few) in warm orange
        const threshold = mod._highlightFrom || -1;
        if (idx >= threshold) return 0xf59e0b;
        return elData.hex;
    }

    _addBond(start, end, color, radius) {
        const dir = new THREE.Vector3().subVectors(end, start);
        const length = dir.length();

        const geo = new THREE.CylinderGeometry(radius, radius, length, 8, 1);
        const mat = new THREE.MeshStandardMaterial({
            color, roughness: 0.4, metalness: 0.05, transparent: true, opacity: 0.85
        });
        const mesh = new THREE.Mesh(geo, mat);

        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        mesh.position.copy(mid);
        mesh.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            dir.normalize()
        );

        mesh.castShadow = true;
        this.molGroup.add(mesh);
        this.bondMeshes.push(mesh);
    }

    _animateEntry() {
        const start = performance.now();
        const animate = (now) => {
            const t = Math.min((now - start) / 600, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            this.molGroup.scale.setScalar(ease);
            if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    _updateOverlayInfo(mol) {
        const ovAtoms   = document.getElementById('ovAtoms');
        const ovMW      = document.getElementById('ovMW');
        const ovFormula = document.getElementById('ovFormula');
        if (ovAtoms)   ovAtoms.textContent   = mol.atoms || mol.structure.atoms.length;
        if (ovMW)      ovMW.textContent      = mol.mw.toFixed(2) + ' g/mol';
        if (ovFormula) ovFormula.textContent = mol.formula || '—';
    }

    // ── DISPLAY MODES ───────────────────────────────────────────────
    setDisplayMode(mode) {
        this.displayMode = mode;
        if (this.molecule) this.loadMolecule(this.molecule, this.currentMod);
    }

    // ── AUTO-ROTATE ─────────────────────────────────────────────────
    toggleAutoRotate() {
        this.autoRotating = !this.autoRotating;
    }

    // ── ZOOM ────────────────────────────────────────────────────────
    zoom(factor) {
        this._zoomLevel *= factor;
        this._zoomLevel = Math.max(5, Math.min(60, this._zoomLevel));
    }

    resetView() {
        this._rotX = 0;
        this._rotY = 0;
        if (this.molecule) {
            const bbox = new THREE.Box3().setFromObject(this.molGroup);
            const size = bbox.getSize(new THREE.Vector3()).length();
            this._zoomLevel = size * 2.2;
        }
    }

    // ── RENDER LOOP ─────────────────────────────────────────────────
    _startLoop() {
        let lastT = 0;
        const loop = (t) => {
            requestAnimationFrame(loop);
            const dt = (t - lastT) / 1000;
            lastT = t;

            if (this.autoRotating && !this._isDragging) {
                this._rotY += 0.3 * dt;
            }

            // Smooth rotation
            this.molGroup.rotation.x += (this._rotX - this.molGroup.rotation.x) * 0.15;
            this.molGroup.rotation.y += (this._rotY - this.molGroup.rotation.y) * 0.15;

            // Smooth zoom
            this.camera.position.z += (this._zoomLevel - this.camera.position.z) * 0.1;

            // Particle slow drift
            if (this.particles) {
                this.particles.rotation.y += 0.00015;
                this.particles.rotation.x += 0.00008;
            }

            // Mol light pulse
            if (this.molLight) {
                this.molLight.intensity = 0.3 + Math.sin(t * 0.002) * 0.1;
            }

            this.renderer.render(this.scene, this.camera);
        };
        requestAnimationFrame(loop);
    }

    // ── RESIZE ──────────────────────────────────────────────────────
    _handleResize() {
        const ro = new ResizeObserver(() => {
            const w = this.wrap.clientWidth;
            const h = this.wrap.clientHeight;
            if (w > 0 && h > 0) {
                this.renderer.setSize(w, h);
                this.camera.aspect = w / h;
                this.camera.updateProjectionMatrix();
            }
        });
        ro.observe(this.wrap);
    }

    // ── HIGHLIGHT MOD ATOMS ──────────────────────────────────────────
    highlightModification(modIndex) {
        this.atomMeshes.forEach((mesh, i) => {
            const total = this.atomMeshes.length;
            const threshold = total - Math.max(3, Math.floor(total * 0.15));
            const isModified = i >= threshold;
            if (isModified) {
                mesh.material.color.setHex(0xf59e0b);
                mesh.material.emissive.setHex(0xf59e0b);
                mesh.material.emissiveIntensity = 0.5;
            } else {
                const el = mesh._atomData && mesh._atomData.el;
                const ec = window.ELEMENT_COLORS[el] || { hex: 0xaaaaaa };
                mesh.material.color.setHex(ec.hex);
                mesh.material.emissive.setHex(ec.hex);
                mesh.material.emissiveIntensity = 0;
            }
        });
        // Animate highlighted atoms
        let pulsed = false;
        const pulse = () => {
            if (pulsed) return;
            this.atomMeshes.forEach((mesh, i) => {
                const total = this.atomMeshes.length;
                const threshold = total - Math.max(3, Math.floor(total * 0.15));
                if (i >= threshold) {
                    mesh.scale.set(1.3, 1.3, 1.3);
                    setTimeout(() => mesh.scale.set(1, 1, 1), 300);
                }
            });
            pulsed = true;
        };
        setTimeout(pulse, 100);
    }

    resetHighlight() {
        this.atomMeshes.forEach((mesh) => {
            const el = mesh._atomData && mesh._atomData.el;
            const ec = window.ELEMENT_COLORS[el] || { hex: 0xaaaaaa };
            mesh.material.color.setHex(ec.hex);
            mesh.material.emissive.setHex(ec.hex);
            mesh.material.emissiveIntensity = 0;
            mesh.scale.set(1, 1, 1);
        });
    }
}

window.MoleculeRenderer = MoleculeRenderer;
