// ═══════════════════════════════════════════════════════════════════════════
// ANNOTATIONS SYSTEM v1.1
// Sistema de marcadores numéricos 3D con paneles informativos
// FIXED: Uses mesh._type + parent node name traversal for detection
// ═══════════════════════════════════════════════════════════════════════════



class AnnotationSystem {
    constructor(THREE, scene, camera, renderer, model, allMeshes) {
        this.THREE = THREE;
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.model = model;
        this.allMeshes = allMeshes;

        this.markers = [];
        this.markerData = [];
        this.activeMarker = null;
        this.visible = false;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.panelEl = null;
        this.containerEl = null;
        this.labelEls = [];
        this._boundClick = this._onClick.bind(this);
        this._boundMove = this._onMouseMove.bind(this);
        this.hoveredMarker = null;

        // ══ FIX: Capturar la matriz original del modelo al inicio ══
        // Las fixedPosition están definidas en el espacio del mundo ORIGINAL
        // (antes de que el sismo/colapso mueva el modelo).
        // Guardamos la inversa de la matriz original para poder convertir
        // worldPos → localPos del modelo, y luego en update() reconvertir
        // usando la matrixWorld ACTUAL del modelo.
        this.model.updateMatrixWorld(true);
        this._origModelMatrixInverse = this.model.matrixWorld.clone().invert();

        this._init();
    }

    _init() {
        // Capturar la matriz mundo original del modelo en el momento de la creación.
        // Se usará para convertir coordenadas mundo → local del modelo,
        // de modo que los marcadores sigan al edificio durante sismo/colapso.
        this.model.updateMatrixWorld(true);
        this._origModelMatrixInverse = this.model.matrixWorld.clone().invert();

        this._createOverlayContainer();
        this._createInfoPanel();
        this._createMarkers();
        this._bindEvents();
    }

    _createOverlayContainer() {
        this.containerEl = document.createElement('div');
        this.containerEl.id = 'annotationOverlay';
        this.containerEl.className = 'ann-overlay';
        this.containerEl.style.display = 'none';
        document.body.appendChild(this.containerEl);
    }

    _createInfoPanel() {
        this.panelEl = document.createElement('div');
        this.panelEl.id = 'annotationPanel';
        this.panelEl.className = 'ann-panel';
        this.panelEl.innerHTML = `
            <button class="ann-panel-close" id="annPanelClose">✕</button>
            <div class="ann-panel-scroll">
                <div class="ann-panel-header">
                    <div class="ann-panel-icon" id="annIcon">🏛️</div>
                    <div>
                        <div class="ann-panel-badge" id="annCategory">Categoría</div>
                        <h2 class="ann-panel-title" id="annTitle">Nombre</h2>
                    </div>
                </div>
                <p class="ann-panel-desc" id="annDesc"></p>
                <div class="ann-section">
                    <h3 class="ann-section-title">🧪 Composición Material</h3>
                    <ul class="ann-list" id="annComposition"></ul>
                </div>
                <div class="ann-section">
                    <h3 class="ann-section-title">📋 Especificaciones Técnicas</h3>
                    <div class="ann-specs-grid" id="annSpecs"></div>
                </div>
                <div class="ann-section">
                    <h3 class="ann-section-title">📐 Cálculos de Diseño</h3>
                    <div id="annCalcs"></div>
                </div>
                <div class="ann-section">
                    <h3 class="ann-section-title">⚙️ Función Estructural</h3>
                    <p class="ann-func-text" id="annFunction"></p>
                </div>
                <div class="ann-section">
                    <h3 class="ann-section-title">📚 Normativa Aplicable</h3>
                    <div class="ann-norms" id="annNorms"></div>
                </div>
            </div>
        `;
        document.body.appendChild(this.panelEl);
        document.getElementById('annPanelClose').onclick = () => this.closePanel();
    }

    // ═══════════════════════════════════════════════════════════════════
    // ANCESTOR NAME HELPERS — walk up Three.js node tree
    // ═══════════════════════════════════════════════════════════════════

    _ancestorHas(mesh, substring) {
        let node = mesh;
        while (node) {
            if (node.name && node.name.indexOf(substring) !== -1) return true;
            node = node.parent;
        }
        return false;
    }

    _getAncestorChain(mesh) {
        const names = [];
        let node = mesh;
        while (node) {
            if (node.name) names.push(node.name);
            node = node.parent;
        }
        return names;
    }

    // ═══════════════════════════════════════════════════════════════════
    // MARKER CREATION
    // ═══════════════════════════════════════════════════════════════════

    _createMarkers() {
        const T = this.THREE;

        ANNOTATION_MARKERS.forEach(markerDef => {
            if (!markerDef.fixedPosition) {
                console.warn(`⚠️ Marker #${markerDef.id}: no fixedPosition defined`);
                return;
            }

            const worldPos = new T.Vector3(
                markerDef.fixedPosition.x,
                markerDef.fixedPosition.y,
                markerDef.fixedPosition.z
            );

            // Invisible hit-sphere for raycasting
            const geo = new T.SphereGeometry(0.3, 8, 8);
            const mat = new T.MeshBasicMaterial({ transparent: true, opacity: 0, depthTest: false });
            const hitSphere = new T.Mesh(geo, mat);
            hitSphere.position.copy(worldPos);
            hitSphere.renderOrder = 999;
            hitSphere._annotationId = markerDef.id;
            hitSphere._dataKey = markerDef.dataKey;
            this.scene.add(hitSphere);

            // HTML label
            const labelEl = document.createElement('div');
            labelEl.className = 'ann-marker';
            labelEl.dataset.id = markerDef.id;
            labelEl.innerHTML = `<span class="ann-marker-num">${markerDef.label}</span>`;
            labelEl.style.display = 'none';
            this.containerEl.appendChild(labelEl);

            labelEl.addEventListener('click', (e) => {
                e.stopPropagation();
                this._selectMarker(markerDef.id, markerDef.dataKey);
            });

            // ══ FIX: Convertir la posición fija (mundo original) a espacio LOCAL del modelo ══
            // Así cuando el modelo se mueva, podemos recalcular la posición mundo real.
            const localPos = worldPos.clone().applyMatrix4(this._origModelMatrixInverse);

            this.markers.push(hitSphere);
            this.labelEls.push(labelEl);
            this.markerData.push({
                id: markerDef.id,
                dataKey: markerDef.dataKey,
                hitSphere,
                labelEl,
                worldPos: worldPos.clone(),
                localPos: localPos.clone()   // posición relativa al modelo
            });
        });

        console.log(`📌 Annotation system: ${this.markers.length} markers created`);
    }

    // ═══════════════════════════════════════════════════════════════════
    // EVENT HANDLERS
    // ═══════════════════════════════════════════════════════════════════

    _bindEvents() {
        this.renderer.domElement.addEventListener('click', this._boundClick);
        this.renderer.domElement.addEventListener('mousemove', this._boundMove);
    }

    _onClick(e) {
        if (!this.visible) return;
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -((e.clientY - 58) / (window.innerHeight - 58)) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const hits = this.raycaster.intersectObjects(this.markers, false);
        if (hits.length > 0) {
            const hit = hits[0].object;
            this._selectMarker(hit._annotationId, hit._dataKey);
        }
    }

    _onMouseMove(e) {
        if (!this.visible) return;
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -((e.clientY - 58) / (window.innerHeight - 58)) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const hits = this.raycaster.intersectObjects(this.markers, false);
        const canvas = this.renderer.domElement;
        if (hits.length > 0) {
            canvas.style.cursor = 'pointer';
            const hovId = hits[0].object._annotationId;
            if (this.hoveredMarker !== hovId) {
                this.hoveredMarker = hovId;
                this.labelEls.forEach(el => el.classList.toggle('hover', parseInt(el.dataset.id) === hovId));
            }
        } else {
            if (this.hoveredMarker !== null) {
                this.hoveredMarker = null;
                canvas.style.cursor = '';
                this.labelEls.forEach(el => el.classList.remove('hover'));
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // SELECT & DISPLAY
    // ═══════════════════════════════════════════════════════════════════

    _selectMarker(id, dataKey) {
        const data = STRUCTURAL_DATA[dataKey];
        if (!data) return;
        this.activeMarker = id;
        this.labelEls.forEach(el => el.classList.toggle('active', parseInt(el.dataset.id) === id));
        this._fillPanel(data);
        this.panelEl.classList.add('visible');
    }

    _fillPanel(data) {
        document.getElementById('annIcon').textContent = data.icon;
        document.getElementById('annCategory').textContent = data.category;
        document.getElementById('annTitle').textContent = data.name;
        document.getElementById('annDesc').textContent = data.description;

        document.getElementById('annComposition').innerHTML = data.composition.items
            .map(item => `<li>${item}</li>`).join('');

        document.getElementById('annSpecs').innerHTML = data.specifications.items
            .map(spec => `<div class="ann-spec-card"><div class="ann-spec-label">${spec.label}</div><div class="ann-spec-value">${spec.value}</div></div>`).join('');

        document.getElementById('annCalcs').innerHTML = data.calculations.formulas
            .map(f => `<div class="ann-calc-block">
                <div class="ann-calc-name">${f.name}</div>
                <div class="ann-calc-formula">${f.formula}</div>
                <div class="ann-calc-example">${f.example}</div>
                <div class="ann-calc-note">💡 ${f.note}</div>
            </div>`).join('');

        document.getElementById('annFunction').textContent = data.structuralFunction.text;

        document.getElementById('annNorms').innerHTML = data.normative
            .map(n => `<span class="ann-norm-tag">${n}</span>`).join('');
    }

    closePanel() {
        this.panelEl.classList.remove('visible');
        this.activeMarker = null;
        this.labelEls.forEach(el => el.classList.remove('active'));
    }

    // ═══════════════════════════════════════════════════════════════════
    // TOGGLE VISIBILITY
    // ═══════════════════════════════════════════════════════════════════

    toggle() {
        this.visible = !this.visible;
        this.containerEl.style.display = this.visible ? 'block' : 'none';
        this.markers.forEach(m => m.visible = this.visible);
        if (!this.visible) {
            this.closePanel();
            this.labelEls.forEach(el => { el.classList.remove('hover'); el.style.display = 'none'; });
        }
        return this.visible;
    }

    show() { this.visible = true; this.containerEl.style.display = 'block'; this.markers.forEach(m => m.visible = true); }
    hide() { this.visible = false; this.containerEl.style.display = 'none'; this.markers.forEach(m => m.visible = false); this.closePanel(); }

    // ═══════════════════════════════════════════════════════════════════
    // UPDATE — Project 3D → 2D every frame
    // Transforms marker positions through model's matrixWorld so they
    // follow the building during earthquake / collapse animations
    // ═══════════════════════════════════════════════════════════════════

    update() {
        if (!this.visible) return;
        const width = window.innerWidth;
        const height = window.innerHeight - 58;

        // Ensure the model's world matrix is current
        this.model.updateMatrixWorld(true);

        this.markerData.forEach((md) => {
            // Transform the fixed local position through the model's current world matrix
            const transformed = md.localPos.clone().applyMatrix4(this.model.matrixWorld);

            // Also sync the invisible hit-sphere so raycasting stays accurate
            md.hitSphere.position.copy(transformed);

            const pos = transformed.clone();
            pos.project(this.camera);

            if (pos.z > 1) { md.labelEl.style.display = 'none'; return; }

            const x = (pos.x * 0.5 + 0.5) * width;
            const y = (-(pos.y * 0.5) + 0.5) * height + 58;

            if (x < -30 || x > width + 30 || y < 28 || y > height + 88) {
                md.labelEl.style.display = 'none'; return;
            }

            md.labelEl.style.display = 'flex';
            md.labelEl.style.left = x + 'px';
            md.labelEl.style.top = y + 'px';

            const camDist = this.camera.position.distanceTo(transformed);
            const scale = Math.max(0.6, Math.min(1.2, 12 / camDist));
            md.labelEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
        });
    }

    dispose() {
        this.renderer.domElement.removeEventListener('click', this._boundClick);
        this.renderer.domElement.removeEventListener('mousemove', this._boundMove);
        this.markers.forEach(m => this.scene.remove(m));
        if (this.containerEl) this.containerEl.remove();
        if (this.panelEl) this.panelEl.remove();
    }
}