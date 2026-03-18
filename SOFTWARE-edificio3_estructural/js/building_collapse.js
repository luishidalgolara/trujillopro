// ═══════════════════════════════════════════════════════════════════════════
// BUILDING COLLAPSE SIMULATOR v4.0 — Colapso Realista por Pisos
// Uso educacional — Ingeniería Civil / Análisis Sísmico
//
// Mejoras v4:
//  • Separación real de pisos como bloques independientes con física
//  • Colapso progresivo: falla piso a piso desde el nivel crítico
//  • Pancake: cada losa cae y aplasta la inferior visiblemente
//  • Volcamiento: partición en la base, caída como árbol
//  • Escombros grandes con física real (gravedad, rebote, rotación)
//  • Nube de polvo densa que se expande desde el impacto
//  • Grietas rojas que aparecen antes del colapso
//  • Colores de daño progresivo (amarillo → naranja → rojo)
// ═══════════════════════════════════════════════════════════════════════════

class BuildingCollapseSimulator {
    constructor(THREE, model, scene, config = {}) {
        this.THREE = THREE;
        this.model = model;
        this.scene = scene;
        this.config = {
            active:           false,
            collapseType:     config.collapseType     || 'progressive',
            criticalDrift:    config.criticalDrift     || 0.08,
            gravity:          config.gravity           || 9.81,
            debrisGeneration: config.debrisGeneration  !== false,
            dustEffect:       config.dustEffect        !== false,
            showCracks:       config.showCracks        !== false,
            onPhaseChange:    config.onPhaseChange     || null,
            onElementFail:    config.onElementFail     || null,
            onComplete:       config.onComplete        || null,
        };
        this.state = {
            phase: 'stable', collapseProgress: 0, collapseTime: 0,
            collapseInitiated: false, collapseDirection: { x: 0, z: 0 },
        };

        this.allMeshes       = [];
        this.floorBlocks     = [];
        this.debrisParticles = [];
        this.dustParticles   = [];
        this.crackLines      = [];
        this.debrisGroup     = null;
        this.dustGroup       = null;
        this.crackGroup      = null;

        this.origModelPos    = null;
        this.origModelRot    = null;
        this._origScale      = 1;
        this._buildingH      = 12;
        this._minY           = 0;
        this._lastPhase      = null;
        this._crackedSpawned  = false;
        this._floorsSeparated = false;
        this._numFloors      = 8;
    }

    // ─────────────────────────────────────────────
    //  INICIALIZACIÓN
    // ─────────────────────────────────────────────
    initialize(earthquakeSimulator) {
        const T = this.THREE;
        this.allMeshes    = earthquakeSimulator.getMeshes();
        this.origModelPos = this.model.position.clone();
        this.origModelRot = this.model.rotation.clone();
        this._origScale   = this.model.scale.x;

        const bb = new T.Box3().setFromObject(this.model);
        this._buildingH = bb.max.y - bb.min.y;
        this._minY      = bb.min.y;

        this.debrisGroup = new T.Group(); this.debrisGroup.name = 'debris';
        this.dustGroup   = new T.Group(); this.dustGroup.name   = 'dust';
        this.crackGroup  = new T.Group(); this.crackGroup.name  = 'cracks';
        this.scene.add(this.debrisGroup);
        this.scene.add(this.dustGroup);
        this.scene.add(this.crackGroup);

        console.log(`💥 Collapse v4: ${this.allMeshes.length} meshes, H=${this._buildingH.toFixed(2)}`);
    }

    // ─────────────────────────────────────────────
    //  DAÑO PROGRESIVO (amarillo → naranja → rojo)
    // ─────────────────────────────────────────────
    applyDamage(mesh, amount) {
        if (!mesh || !mesh.material) return;
        mesh._dmg = Math.min(1.0, (mesh._dmg || 0) + amount * 0.008);
        if (!this.config.showCracks) return;
        const d   = mesh._dmg;
        const mat = mesh.material;
        if (d < 0.05) return;

        const baseColor = mat._origColor || new this.THREE.Color(0.6, 0.6, 0.6);
        if (d < 0.4) {
            mat.color.setRGB(
                Math.min(1, baseColor.r + d * 0.8),
                Math.min(1, baseColor.g + d * 0.3),
                Math.max(0, baseColor.b - d * 0.6)
            );
        } else if (d < 0.7) {
            mat.color.setRGB(0.9, 0.35, 0.05);
        } else {
            mat.color.setRGB(0.55 + d * 0.1, 0.05, 0.02);
        }

        if (mat.emissive) {
            mat.emissive.setRGB(d * 0.4, d * 0.08, 0);
            mat.emissiveIntensity = d * 0.6;
        }
    }

    // ─────────────────────────────────────────────
    //  INICIAR COLAPSO
    // ─────────────────────────────────────────────
    initiateCollapse(trigger = 'seismic') {
        if (this.state.collapseInitiated) return;
        this.state.collapseInitiated = true;
        this.config.active           = true;
        this.state.collapseTime      = 0;
        this.state.collapseDirection = {
            x: (Math.random() - 0.5) * 2,
            z: (Math.random() - 0.5) * 2,
        };
        this._setPhase('cracking');
        this._spawnCracks();
        console.log(`💥 Colapso (${this.config.collapseType}) iniciado`);
    }

    _setPhase(p) {
        if (p !== this._lastPhase) {
            this._lastPhase  = p;
            this.state.phase = p;
            if (this.config.onPhaseChange) this.config.onPhaseChange(p);
        }
    }

    // ─────────────────────────────────────────────
    //  SEPARAR PISOS EN BLOQUES FÍSICOS
    // ─────────────────────────────────────────────
    _separateFloors() {
        if (this._floorsSeparated) return;
        this._floorsSeparated = true;
        const T = this.THREE;

        this.model.visible = false;

        const bb      = new T.Box3().setFromObject(this.model);
        const floorH  = this._buildingH / this._numFloors;

        const floorMap = {};
        for (const mesh of this.allMeshes) {
            const f = mesh._floor !== undefined ? mesh._floor : 0;
            if (!floorMap[f]) floorMap[f] = [];
            floorMap[f].push(mesh);
        }

        const numFloors = Object.keys(floorMap).length || this._numFloors;

        for (let fi = 0; fi < numFloors; fi++) {
            const meshes = floorMap[fi] || [];

            let pMin = new T.Vector3( Infinity,  Infinity,  Infinity);
            let pMax = new T.Vector3(-Infinity, -Infinity, -Infinity);

            if (meshes.length > 0) {
                const fb = new T.Box3();
                meshes.forEach(m => {
                    m.updateMatrixWorld(true);
                    fb.setFromObject(m);
                    pMin.min(fb.min);
                    pMax.max(fb.max);
                });
            } else {
                pMin.set(bb.min.x, bb.min.y + fi * floorH,       bb.min.z);
                pMax.set(bb.max.x, bb.min.y + (fi + 1) * floorH, bb.max.z);
            }

            const sz = pMax.clone().sub(pMin);
            if (sz.x <= 0 || sz.y <= 0 || sz.z <= 0) continue;

            const floorCenter = pMin.clone().add(pMax).multiplyScalar(0.5);

            const geo = new T.BoxGeometry(
                Math.max(sz.x, 0.5),
                Math.max(sz.y, 0.3),
                Math.max(sz.z, 0.5)
            );

            const avgDmg = meshes.reduce((s, m) => s + (m._dmg || 0), 0) / Math.max(meshes.length, 1);
            let floorColor;
            if      (avgDmg > 0.6) floorColor = new T.Color(0.6,  0.08, 0.02);
            else if (avgDmg > 0.3) floorColor = new T.Color(0.85, 0.35, 0.05);
            else if (avgDmg > 0.1) floorColor = new T.Color(0.9,  0.7,  0.1);
            else {
                const types = meshes.map(m => m._type || 'other');
                floorColor  = this._typeColor(this._dominantType(types));
            }

            const mat = new T.MeshStandardMaterial({
                color:             floorColor,
                roughness:         0.75,
                metalness:         0.05,
                emissive:          floorColor.clone().multiplyScalar(0.12),
                emissiveIntensity: 0.3,
            });

            const block = new T.Mesh(geo, mat);
            block.position.copy(floorCenter);
            block.castShadow    = true;
            block.receiveShadow = true;

            block._floorIdx  = fi;
            block._origPos   = floorCenter.clone();
            block._vel       = new T.Vector3(0, 0, 0);
            block._rot       = new T.Vector3(0, 0, 0);
            block._falling   = false;
            block._onGround  = false;

            this.scene.add(block);
            this.floorBlocks.push(block);
        }

        console.log(`🏗️ ${this.floorBlocks.length} bloques de piso creados`);
    }

    _dominantType(types) {
        const count = {};
        types.forEach(t => { count[t] = (count[t] || 0) + 1; });
        return Object.keys(count).sort((a, b) => count[b] - count[a])[0] || 'other';
    }

    _typeColor(type) {
        const T   = this.THREE;
        const map = {
            column:     new T.Color(1.00, 0.42, 0.00),
            shear_wall: new T.Color(1.00, 0.13, 0.26),
            core:       new T.Color(0.00, 0.40, 1.00),
            slab:       new T.Color(0.67, 0.87, 0.00),
            roof:       new T.Color(0.00, 0.87, 1.00),
            beam:       new T.Color(1.00, 0.85, 0.00),
            foundation: new T.Color(0.60, 0.20, 1.00),
            other:      new T.Color(0.55, 0.60, 0.65),
        };
        return map[type] || map.other;
    }

    // ─────────────────────────────────────────────
    //  UPDATE PRINCIPAL
    // ─────────────────────────────────────────────
    update(dt) {
        if (!this.config.active) return;
        dt = Math.min(dt, 0.05);
        this.state.collapseTime += dt;

        switch (this.config.collapseType) {
            case 'progressive': this._progressive(dt); break;
            case 'pancake':     this._pancake(dt);     break;
            case 'toppling':    this._toppling(dt);    break;
        }

        this._updateFloorPhysics(dt);
        this._updateDebris(dt);
        this._updateDust(dt);
        this._updateCracks(dt);

        if (this.state.collapseProgress >= 1.0) {
            this.state.phase = 'collapsed';
            if (this.config.onPhaseChange) this.config.onPhaseChange('collapsed');
            if (this.config.onComplete)    this.config.onComplete({ type: this.config.collapseType, time: this.state.collapseTime });
            this.config.active = false;
        }
    }

    // ─────────────────────────────────────────────
    //  FÍSICA DE BLOQUES
    // ─────────────────────────────────────────────
    _updateFloorPhysics(dt) {
        const g       = this.config.gravity;
        const groundY = this._minY;

        for (const block of this.floorBlocks) {
            if (!block._falling) continue;

            block._vel.y -= g * dt * 1.8;
            block._vel.x *= 0.995;
            block._vel.z *= 0.995;

            block.position.x += block._vel.x * dt;
            block.position.y += block._vel.y * dt;
            block.position.z += block._vel.z * dt;

            block.rotation.x += block._rot.x * dt;
            block.rotation.y += block._rot.y * dt;
            block.rotation.z += block._rot.z * dt;
            block._rot.x *= 0.98;
            block._rot.z *= 0.98;

            const halfH = (block.geometry.parameters.height || 0.5) / 2;
            if (block.position.y - halfH < groundY) {
                block.position.y = groundY + halfH;
                block._vel.y     = -block._vel.y * 0.18;
                block._vel.x    *= 0.55;
                block._vel.z    *= 0.55;
                block._rot.x    *= 0.3;
                block._rot.z    *= 0.3;

                if (!block._onGround) {
                    block._onGround = true;
                    this._spawnImpactDust(block.position, 8);
                    this._spawnDebrisAt(block.position, 4);
                }

                if (Math.abs(block._vel.y) < 0.05) {
                    block._vel.set(0, 0, 0);
                    block._rot.set(0, 0, 0);
                }
            }
        }
    }

    // ─────────────────────────────────────────────
    //  COLAPSO PROGRESIVO (soft story)
    // ─────────────────────────────────────────────
    _progressive(dt) {
        const t = this.state.collapseTime;

        if (t < 4.0) {
            this.state.collapseProgress = (t / 4.0) * 0.12;
            const tremor = t / 4.0;
            this.model.position.x = this.origModelPos.x + Math.sin(t * 18) * 0.025 * tremor;
            this.model.position.z = this.origModelPos.z + Math.cos(t * 14) * 0.025 * tremor;

            for (const m of this.allMeshes) {
                if (m._eqNormH < 0.35) this.applyDamage(m, dt * 18);
                else                   this.applyDamage(m, dt * 4);
            }

            if (!this._crackedSpawned && t > 2.0) {
                this._crackedSpawned = true;
                this._spawnCracks();
                this._spawnDebrisAt(this.origModelPos, 5);
            }
            return;
        }

        this._setPhase('collapsing');
        if (!this._floorsSeparated) {
            this._separateFloors();
            this._triggerProgressiveCollapse();
        }

        const fallen = this.floorBlocks.filter(b => b._onGround).length;
        const total  = this.floorBlocks.length || 1;
        this.state.collapseProgress = Math.min(0.12 + (fallen / total) * 0.88, 0.99);
        if (fallen === total && total > 0 && t > 6) this.state.collapseProgress = 1.0;
    }

    _triggerProgressiveCollapse() {
        const dir    = this.state.collapseDirection;
        const blocks = [...this.floorBlocks].sort((a, b) => a._floorIdx - b._floorIdx);
        const critFloor = Math.floor(blocks.length * 0.28);

        blocks.forEach((block, i) => {
            const delay = i < critFloor
                ? (critFloor - i) * 0.15
                : (i - critFloor) * 0.25 + 0.3;

            setTimeout(() => {
                if (!block) return;
                block._falling = true;
                const relH = block._floorIdx / (blocks.length || 1);
                const lateralForce = 1.5 + relH * 2.5;

                block._vel.set(
                    dir.x * lateralForce + (Math.random() - 0.5) * 1.2,
                    -0.5 - relH * 2.0,
                    dir.z * lateralForce + (Math.random() - 0.5) * 1.2
                );
                block._rot.set(
                    (Math.random() - 0.5) * 3.0,
                    (Math.random() - 0.5) * 1.5,
                    (Math.random() - 0.5) * 3.0
                );

                if (block.material) {
                    block.material.color.set(0x8a0f03);
                    block.material.emissive.setRGB(0.3, 0.04, 0);
                    block.material.emissiveIntensity = 0.5;
                }

                this._spawnDebrisAt(block.position, 3);
                if (i % 2 === 0) this._spawnImpactDust(block.position, 5);
            }, delay * 1000);
        });
    }

    // ─────────────────────────────────────────────
    //  COLAPSO PANCAKE
    // ─────────────────────────────────────────────
    _pancake(dt) {
        const t = this.state.collapseTime;

        if (t < 2.5) {
            this.state.collapseProgress = (t / 2.5) * 0.10;
            const tremor = t / 2.5;
            this.model.position.x = this.origModelPos.x + Math.sin(t * 22) * 0.02 * tremor;
            this.model.position.z = this.origModelPos.z + Math.cos(t * 19) * 0.02 * tremor;
            for (const m of this.allMeshes) this.applyDamage(m, dt * 14);

            if (!this._crackedSpawned && t > 1.5) {
                this._crackedSpawned = true;
                this._spawnCracks();
            }
            return;
        }

        this._setPhase('collapsing');
        if (!this._floorsSeparated) {
            this._separateFloors();
            this._triggerPancakeCollapse();
        }

        const fallen = this.floorBlocks.filter(b => b._onGround).length;
        const total  = this.floorBlocks.length || 1;
        this.state.collapseProgress = Math.min(0.10 + (fallen / total) * 0.90, 0.99);
        if (fallen === total && total > 0 && t > 5) this.state.collapseProgress = 1.0;
    }

    _triggerPancakeCollapse() {
        const blocks = [...this.floorBlocks].sort((a, b) => b._floorIdx - a._floorIdx);

        blocks.forEach((block, i) => {
            const delay = i * 0.20;
            setTimeout(() => {
                if (!block) return;
                block._falling = true;
                block._vel.set(
                    (Math.random() - 0.5) * 0.8,
                    -1.5 - i * 0.3,
                    (Math.random() - 0.5) * 0.8
                );
                block._rot.set(
                    (Math.random() - 0.5) * 1.5,
                    (Math.random() - 0.5) * 0.8,
                    (Math.random() - 0.5) * 1.5
                );
                if (block.material) {
                    block.material.color.set(0x800803);
                    block.material.emissive.setRGB(0.25, 0.03, 0);
                    block.material.emissiveIntensity = 0.45;
                }
                this._spawnDebrisAt(block.position, 4);
                this._spawnImpactDust(block.position, 6);
            }, delay * 1000);
        });
    }

    // ─────────────────────────────────────────────
    //  COLAPSO VOLCAMIENTO
    // ─────────────────────────────────────────────
    _toppling(dt) {
        const t   = this.state.collapseTime;
        const dir = this.state.collapseDirection;
        const mag = Math.sqrt(dir.x ** 2 + dir.z ** 2) || 1;
        const nd  = { x: dir.x / mag, z: dir.z / mag };

        if (t < 3.5) {
            this.state.collapseProgress = (t / 3.5) * 0.15;
            const tilt = (t / 3.5) * 0.04;
            this.model.rotation.x = this.origModelRot.x + nd.z * tilt;
            this.model.rotation.z = this.origModelRot.z - nd.x * tilt;
            this.model.position.x = this.origModelPos.x + nd.x * Math.sin(tilt) * 0.5;
            this.model.position.z = this.origModelPos.z + nd.z * Math.sin(tilt) * 0.5;

            for (const m of this.allMeshes) this.applyDamage(m, dt * 10 * (1 - m._eqNormH));

            if (!this._crackedSpawned && t > 2.0) {
                this._crackedSpawned = true;
                this._spawnCracks();
            }
            return;
        }

        this._setPhase('collapsing');
        if (!this._floorsSeparated) {
            this._separateFloors();
            this._triggerTopplingCollapse(nd);
        }

        const fallen = this.floorBlocks.filter(b => b._onGround).length;
        const total  = this.floorBlocks.length || 1;
        this.state.collapseProgress = Math.min(0.15 + (fallen / total) * 0.85, 0.99);
        if (fallen === total && total > 0 && t > 7) this.state.collapseProgress = 1.0;
    }

    _triggerTopplingCollapse(nd) {
        const blocks = [...this.floorBlocks].sort((a, b) => a._floorIdx - b._floorIdx);
        const total  = blocks.length || 1;

        blocks.forEach((block, i) => {
            const relH  = i / total;
            const delay = relH * 0.4;

            setTimeout(() => {
                if (!block) return;
                block._falling = true;
                const lateralV = 3.5 + relH * 6.0;
                const downV    = 1.0 + relH * 2.0;

                block._vel.set(
                    nd.x * lateralV + (Math.random() - 0.5) * 1.5,
                    -downV,
                    nd.z * lateralV + (Math.random() - 0.5) * 1.5
                );
                block._rot.set(
                    nd.z  * (2.0 + relH * 3.0) + (Math.random() - 0.5) * 1.5,
                    (Math.random() - 0.5) * 1.5,
                    -nd.x * (2.0 + relH * 3.0) + (Math.random() - 0.5) * 1.5
                );

                if (block.material) {
                    block.material.color.setRGB(0.5 + relH * 0.1, 0.06 + relH * 0.02, 0.02);
                    block.material.emissive.setRGB(0.28, 0.04, 0);
                    block.material.emissiveIntensity = 0.5;
                }

                this._spawnDebrisAt(block.position, 3);
                if (i % 2 === 0) this._spawnImpactDust(block.position, 5);
            }, delay * 1000);
        });

        setTimeout(() => this._spawnMegaDust(nd), 1200);
    }

    // ─────────────────────────────────────────────
    //  GRIETAS ROJAS
    // ─────────────────────────────────────────────
    _spawnCracks() {
        if (!this.config.showCracks) return;
        const T   = this.THREE;
        const bb  = new T.Box3().setFromObject(this.model);
        const ctr = bb.getCenter(new T.Vector3());
        const h   = this._buildingH;
        const hw  = (bb.max.x - bb.min.x) * 0.5;
        const hd  = (bb.max.z - bb.min.z) * 0.5;

        for (let i = 0; i < 14; i++) {
            const crackMat = new T.LineBasicMaterial({
                color: 0xff1111, linewidth: 2,
                transparent: true, opacity: 0.0, depthWrite: false,
            });

            const side  = Math.floor(Math.random() * 4);
            const yBase = this._minY + h * (0.05 + Math.random() * 0.45);
            const len   = h * (0.08 + Math.random() * 0.18);
            let x0, z0, x1, z1;

            if      (side === 0) { x0 = -hw * 0.9; z0 = (Math.random() - 0.5) * hd * 1.8; x1 = x0 + (Math.random() - 0.5) * 0.4; z1 = z0; }
            else if (side === 1) { x0 =  hw * 0.9; z0 = (Math.random() - 0.5) * hd * 1.8; x1 = x0 + (Math.random() - 0.5) * 0.4; z1 = z0; }
            else if (side === 2) { z0 = -hd * 0.9; x0 = (Math.random() - 0.5) * hw * 1.8; z1 = z0; x1 = x0; }
            else                 { z0 =  hd * 0.9; x0 = (Math.random() - 0.5) * hw * 1.8; z1 = z0; x1 = x0; }

            const mid = new T.Vector3(
                (x0 + x1) / 2 + ctr.x + (Math.random() - 0.5) * 0.3,
                yBase + len * 0.5,
                (z0 + z1) / 2 + ctr.z + (Math.random() - 0.5) * 0.3
            );
            const pts = [
                new T.Vector3(x0 + ctr.x, yBase,       z0 + ctr.z),
                mid,
                new T.Vector3(x1 + ctr.x, yBase + len, z1 + ctr.z),
            ];
            const geo  = new T.BufferGeometry().setFromPoints(pts);
            const line = new T.Line(geo, crackMat);
            line._life = 6 + Math.random() * 4;
            line._age  = 0;
            this.crackGroup.add(line);
            this.crackLines.push(line);
        }
    }

    _updateCracks(dt) {
        for (let i = this.crackLines.length - 1; i >= 0; i--) {
            const c = this.crackLines[i];
            c._age += dt;
            if (c._age < 0.5) {
                c.material.opacity = (c._age / 0.5) * 0.9;
            } else if (c._age > c._life * 0.7) {
                c.material.opacity = 0.9 * (1 - (c._age - c._life * 0.7) / (c._life * 0.3));
            } else {
                c.material.opacity = 0.9;
            }
            if (c._age > c._life) {
                c.geometry.dispose(); c.material.dispose();
                this.crackGroup.remove(c);
                this.crackLines.splice(i, 1);
            }
        }
    }

    // ─────────────────────────────────────────────
    //  ESCOMBROS
    // ─────────────────────────────────────────────
    _spawnDebrisAt(pos, count) {
        if (!this.config.debrisGeneration) return;
        const T = this.THREE;

        for (let i = 0; i < count; i++) {
            const scale = 0.12 + Math.random() * 0.45;
            const type  = Math.random();
            let geo;
            if      (type < 0.4) geo = new T.BoxGeometry(scale, scale * 0.5, scale * 0.8);
            else if (type < 0.7) geo = new T.BoxGeometry(scale * 1.2, scale * 0.3, scale * 0.6);
            else                 geo = new T.TetrahedronGeometry(scale * 0.6, 0);

            const r   = 0.35 + Math.random() * 0.25;
            const g   = r - Math.random() * 0.08;
            const b   = g - Math.random() * 0.06;
            const mat = new T.MeshStandardMaterial({
                color: new T.Color(r, g, b), roughness: 0.92, metalness: 0.02,
            });

            const d = new T.Mesh(geo, mat);
            d.position.set(
                pos.x + (Math.random() - 0.5) * 3.5,
                pos.y + Math.random() * 1.5,
                pos.z + (Math.random() - 0.5) * 3.5
            );
            d.castShadow = true;

            const speed = 2.5 + Math.random() * 5.0;
            const angle = Math.random() * Math.PI * 2;
            d._vel = {
                x: Math.cos(angle) * speed * (0.5 + Math.random()),
                y: Math.random() * 6.0 + 2.0,
                z: Math.sin(angle) * speed * (0.5 + Math.random()),
            };
            d._rot  = {
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 8,
                z: (Math.random() - 0.5) * 10,
            };
            d._life = 6 + Math.random() * 5;
            d._age  = 0;

            this.debrisGroup.add(d);
            this.debrisParticles.push(d);
        }
    }

    _updateDebris(dt) {
        const g       = this.config.gravity * 1.4;
        const groundY = this._minY;

        for (let i = this.debrisParticles.length - 1; i >= 0; i--) {
            const d = this.debrisParticles[i];
            d._age += dt;

            if (d._age > d._life) {
                d.geometry.dispose(); d.material.dispose();
                this.debrisGroup.remove(d);
                this.debrisParticles.splice(i, 1);
                continue;
            }

            d._vel.y -= g * dt;
            d.position.x += d._vel.x * dt;
            d.position.y += d._vel.y * dt;
            d.position.z += d._vel.z * dt;
            d.rotation.x += d._rot.x * dt;
            d.rotation.y += d._rot.y * dt;
            d.rotation.z += d._rot.z * dt;

            if (d.position.y < groundY + 0.05) {
                d.position.y = groundY + 0.05;
                d._vel.y     = -d._vel.y * 0.25;
                d._vel.x    *= 0.6;
                d._vel.z    *= 0.6;
                d._rot.x    *= 0.4;
                d._rot.z    *= 0.4;
            }

            if (d._age > d._life * 0.75) {
                d.material.transparent = true;
                d.material.opacity = 1 - (d._age - d._life * 0.75) / (d._life * 0.25);
            }
        }
    }

    // ─────────────────────────────────────────────
    //  POLVO
    // ─────────────────────────────────────────────
    _spawnImpactDust(pos, count) {
        if (!this.config.dustEffect) return;
        const T = this.THREE;

        for (let i = 0; i < count; i++) {
            const c = document.createElement('canvas');
            c.width = 128; c.height = 128;
            const ctx = c.getContext('2d');
            const gr  = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
            const alpha = 0.55 + Math.random() * 0.25;
            gr.addColorStop(0,   `rgba(210,200,185,${alpha})`);
            gr.addColorStop(0.4, `rgba(185,175,160,${alpha * 0.6})`);
            gr.addColorStop(1,   'rgba(160,150,135,0)');
            ctx.fillStyle = gr; ctx.fillRect(0, 0, 128, 128);

            const mat = new T.SpriteMaterial({
                map: new T.CanvasTexture(c),
                transparent: true, opacity: 0.7, depthWrite: false,
            });
            const sp = new T.Sprite(mat);
            sp.position.set(
                pos.x + (Math.random() - 0.5) * 4,
                pos.y + Math.random() * 1.5,
                pos.z + (Math.random() - 0.5) * 4
            );
            const bs = 1.5 + Math.random() * 3.0;
            sp.scale.set(bs, bs, 1);

            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 3.0;
            sp._vel  = { x: Math.cos(angle) * speed, y: 0.8 + Math.random() * 2.5, z: Math.sin(angle) * speed };
            sp._life = 4 + Math.random() * 5;
            sp._age  = 0;
            sp._bs   = bs;

            this.dustGroup.add(sp);
            this.dustParticles.push(sp);
        }
    }

    _spawnMegaDust(nd) {
        if (!this.config.dustEffect) return;
        const T   = this.THREE;
        const bb  = new T.Box3().setFromObject(this.model);
        const ctr = bb.getCenter(new T.Vector3());

        for (let i = 0; i < 20; i++) {
            const c = document.createElement('canvas');
            c.width = 256; c.height = 256;
            const ctx = c.getContext('2d');
            const gr  = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
            gr.addColorStop(0,   'rgba(200,190,175,0.65)');
            gr.addColorStop(0.5, 'rgba(175,165,150,0.30)');
            gr.addColorStop(1,   'rgba(150,140,125,0)');
            ctx.fillStyle = gr; ctx.fillRect(0, 0, 256, 256);

            const mat = new T.SpriteMaterial({
                map: new T.CanvasTexture(c),
                transparent: true, opacity: 0.75, depthWrite: false,
            });
            const sp = new T.Sprite(mat);
            sp.position.set(
                ctr.x + nd.x * (2 + Math.random() * 4) + (Math.random() - 0.5) * 5,
                this._minY + Math.random() * this._buildingH * 0.6,
                ctr.z + nd.z * (2 + Math.random() * 4) + (Math.random() - 0.5) * 5
            );
            const bs = 3 + Math.random() * 6;
            sp.scale.set(bs, bs, 1);
            sp._vel  = { x: nd.x * (1 + Math.random() * 2), y: 0.5 + Math.random() * 1.5, z: nd.z * (1 + Math.random() * 2) };
            sp._life = 6 + Math.random() * 6;
            sp._age  = 0;
            sp._bs   = bs;
            this.dustGroup.add(sp);
            this.dustParticles.push(sp);
        }
    }

    _updateDust(dt) {
        for (let i = this.dustParticles.length - 1; i >= 0; i--) {
            const d = this.dustParticles[i];
            d._age += dt;

            if (d._age > d._life) {
                if (d.material.map) d.material.map.dispose();
                d.material.dispose();
                this.dustGroup.remove(d);
                this.dustParticles.splice(i, 1);
                continue;
            }

            d.position.x += d._vel.x * dt;
            d.position.y += d._vel.y * dt;
            d.position.z += d._vel.z * dt;
            d._vel.x *= 0.985; d._vel.z *= 0.985; d._vel.y *= 0.992;

            const growth = 1 + d._age * 0.35;
            d.scale.set(d._bs * growth, d._bs * growth, 1);

            const fadeIn  = Math.min(d._age / 0.4, 1.0);
            const fadeOut = d._age > d._life * 0.5
                ? 1 - (d._age - d._life * 0.5) / (d._life * 0.5)
                : 1.0;
            d.material.opacity = 0.75 * fadeIn * fadeOut;
        }
    }

    // ─────────────────────────────────────────────
    //  RESET
    // ─────────────────────────────────────────────
    reset() {
        this.config.active = false;
        this.state = {
            phase: 'stable', collapseProgress: 0, collapseTime: 0,
            collapseInitiated: false, collapseDirection: { x: 0, z: 0 },
        };
        this._lastPhase       = null;
        this._crackedSpawned  = false;
        this._floorsSeparated = false;

        this.model.visible = true;
        if (this.origModelPos) this.model.position.copy(this.origModelPos);
        if (this.origModelRot) this.model.rotation.copy(this.origModelRot);
        if (this._origScale)   this.model.scale.setScalar(this._origScale);

        for (const m of this.allMeshes) {
            m._dmg = 0;
            const mat = m.material;
            if (!mat) continue;
            if (mat._origColor    && mat.color)    mat.color.copy(mat._origColor);
            if (mat._origEmissive && mat.emissive) mat.emissive.copy(mat._origEmissive);
            if (mat._origEI !== undefined)         mat.emissiveIntensity = mat._origEI;
        }

        for (const block of this.floorBlocks) {
            block.geometry.dispose(); block.material.dispose();
            this.scene.remove(block);
        }
        this.floorBlocks = [];

        for (const d of this.debrisParticles) {
            d.geometry.dispose(); d.material.dispose(); this.debrisGroup.remove(d);
        }
        this.debrisParticles = [];

        for (const d of this.dustParticles) {
            if (d.material.map) d.material.map.dispose();
            d.material.dispose(); this.dustGroup.remove(d);
        }
        this.dustParticles = [];

        for (const c of this.crackLines) {
            c.geometry.dispose(); c.material.dispose(); this.crackGroup.remove(c);
        }
        this.crackLines = [];

        console.log('🔄 Colapso reiniciado');
    }

    setCollapseType(t) { this.config.collapseType = t; }
    stop() { this.config.active = false; }
}