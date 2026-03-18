// ═══════════════════════════════════════════════════════════════════════════
// EARTHQUAKE MOTION SIMULATOR v3.1
// Improved: Stronger motion, camera shake, aftershock pulses,
//   better wave envelopes, vertex shader deformation
// ═══════════════════════════════════════════════════════════════════════════

class EarthquakeSimulator {
    constructor(THREE, model, scene, config = {}) {
        this.THREE = THREE;
        this.model = model;
        this.scene = scene;
        this.camera = config.camera || null;
        this.config = {
            active: false, paused: false,
            buildingHeight: config.buildingHeight || 12,
            numFloors: config.numFloors || 10,
            damping: config.damping || 0.04,
            magnitude: config.magnitude || 6.5,
            duration: config.duration || 30,
            soilType: config.soilType || 'firm',
            onUpdate: config.onUpdate || null,
            onDamage: config.onDamage || null,
            onComplete: config.onComplete || null,
        };
        this.state = {
            time: 0, phase: 'idle',
            displacement: { x: 0, z: 0 }, velocity: { x: 0, z: 0 },
            acceleration: { x: 0, z: 0 },
            maxDrift: 0, currentDrift: 0, peakAcceleration: 0,
        };
        this.origPos = null;
        this.origRot = null;
        this.origCamPos = null;
        this.allMeshes = [];
        this.waveParams = this._wp();
        this._ready = false;
        this._minY = 0; this._maxY = 12; this._totalH = 12;
        this._modelScale = 1;
    }

    _wp() {
        const m = this.config.magnitude;
        const sfs = {rock:{a:.6,f:1.2,d:.8},firm:{a:1,f:1,d:1},soft:{a:1.8,f:.6,d:1.5}};
        const sf = sfs[this.config.soilType]||sfs.firm;
        // PGA scaling: M3→tiny, M5→noticeable, M6.5→strong, M8→extreme, M9→catastrophic
        // Using proper attenuation: log10(PGA) ≈ 0.4*M - 2.5 (simplified)
        const pga = Math.pow(10, 0.4*m - 2.5) * sf.a;
        const b = pga * 0.25;
        return {
            p: {s:0, d:2.5*sf.d, f:8*sf.f, a:b*0.15},
            s: {s:1.8*sf.d, d:this.config.duration*0.55*sf.d, f:2.2*sf.f, a:b*0.7},
            sf:{s:3.5*sf.d, d:this.config.duration*0.9*sf.d, f:0.7*sf.f, a:b*1.0},
            hA: 1.0 + Math.max(0, m - 5.0)*0.3, // amplification only kicks in above M5
            sf: sf,
        };
    }

    initialize() {
        const T = this.THREE;
        if (!this.model || this._ready) return;
        this.model.updateMatrixWorld(true);
        this.origPos = this.model.position.clone();
        this.origRot = this.model.rotation.clone();
        this._modelScale = this.model.scale.x;

        const bb = new T.Box3().setFromObject(this.model);
        this._minY = bb.min.y; this._maxY = bb.max.y;
        this._totalH = bb.max.y - bb.min.y;

        this.allMeshes = [];
        this.model.traverse(c => {
            if (!c.isMesh) return;
            this.allMeshes.push(c);
            const wp = new T.Vector3();
            c.getWorldPosition(wp);
            c._eqNormH = Math.max(0, (wp.y - this._minY) / this._totalH);

            const oldMat = c.material;
            const newMat = new T.MeshStandardMaterial();
            if (oldMat.color) newMat.color.copy(oldMat.color);
            newMat.roughness = oldMat.roughness !== undefined ? oldMat.roughness : 0.6;
            newMat.metalness = oldMat.metalness !== undefined ? oldMat.metalness : 0.1;
            if (oldMat.emissive) newMat.emissive.copy(oldMat.emissive);
            newMat.emissiveIntensity = oldMat.emissiveIntensity || 0;
            newMat.envMapIntensity = oldMat.envMapIntensity || 1.0;
            newMat.side = oldMat.side || T.FrontSide;

            newMat.onBeforeCompile = (shader) => {
                shader.uniforms.eqDX = { value: 0 };
                shader.uniforms.eqDZ = { value: 0 };
                shader.uniforms.eqDY = { value: 0 };
                shader.uniforms.eqMinY = { value: this._minY };
                shader.uniforms.eqTotalH = { value: this._totalH };
                shader.uniforms.eqHA = { value: 1.0 };
                shader.uniforms.eqRX = { value: 0 };
                shader.uniforms.eqRZ = { value: 0 };
                shader.uniforms.eqTime = { value: 0 };
                newMat._eqShader = shader;

                shader.vertexShader = shader.vertexShader.replace(
                    '#include <common>',
                    `#include <common>
                    uniform float eqDX, eqDZ, eqDY, eqMinY, eqTotalH, eqHA, eqRX, eqRZ, eqTime;`
                );
                shader.vertexShader = shader.vertexShader.replace(
                    '#include <begin_vertex>',
                    `#include <begin_vertex>
                    vec4 wp4 = modelMatrix * vec4(transformed, 1.0);
                    float nH = clamp((wp4.y - eqMinY) / eqTotalH, 0.0, 1.0);
                    
                    // Multi-mode amplification
                    float mode1 = nH * eqHA;
                    float mode2 = sin(nH * 3.14159) * 0.25;
                    float mode3 = sin(nH * 6.28318) * 0.1;
                    float totalAmp = mode1 + mode2 + mode3;
                    
                    // Main displacement
                    transformed.x += eqDX * totalAmp;
                    transformed.z += eqDZ * totalAmp;
                    transformed.y += eqDY * nH;
                    
                    // Inter-story drift rotation effect
                    float driftRot = nH * nH * 0.6;
                    transformed.x += eqRZ * driftRot * (wp4.y - eqMinY);
                    transformed.z += eqRX * driftRot * (wp4.y - eqMinY);
                    
                    // High-frequency micro-vibration (adds realism)
                    float microVib = sin(eqTime * 40.0 + wp4.y * 5.0) * 0.0003 * totalAmp * eqTotalH;
                    transformed.x += microVib;
                    transformed.z += microVib * 0.7;
                    `
                );
            };

            newMat._origColor = oldMat.color ? oldMat.color.clone() : new T.Color(.6,.6,.6);
            newMat._origEmissive = oldMat.emissive ? oldMat.emissive.clone() : new T.Color(0,0,0);
            newMat._origEI = oldMat.emissiveIntensity || 0;
            c.material = newMat;
        });

        this._ready = true;
        console.log(`🌍 EQ v3.1: ${this.allMeshes.length} meshes con vertex displacement + camera shake`);
    }

    _ga(t) {
        const w = this.waveParams, P = Math.PI, sin = Math.sin, cos = Math.cos;
        let ax = 0, az = 0;

        // P-wave (compresional, high freq, low amp, first to arrive)
        if (t >= w.p.s && t < w.p.s+w.p.d) {
            const l=(t-w.p.s)/w.p.d, e=sin(l*P)*sin(l*P*0.5);
            az += w.p.a*e*(sin(2*P*w.p.f*t) + sin(17.3*t)*.35 + sin(23.7*t)*.18 + sin(31.1*t)*.08);
            ax += w.p.a*e*sin(2*P*w.p.f*1.1*t+0.5)*.2;
        }

        // S-wave (shear, main destructive wave)
        if (t >= w.s.s && t < w.s.s+w.s.d) {
            const l=(t-w.s.s)/w.s.d;
            // Envelope with rapid rise and slow decay
            const rise = Math.min(l/0.15, 1.0);
            const sustain = l < 0.5 ? 1.0 : Math.pow(1-(l-0.5)/0.5, 0.8);
            const e = rise * sustain;
            const f = w.s.f;
            // Multiple frequencies for richness
            const wave = sin(2*P*f*t) + sin(2*P*f*1.47*t+.8)*.65 + sin(2*P*f*2.13*t+1.7)*.35
                       + sin(2*P*f*0.73*t+2.1)*.4 + sin(11.1*t)*.22 + sin(7.3*t+2.1)*.18;
            ax += w.s.a*wave*e*.9;
            az += w.s.a*wave*e*.6;
            // Cross-axis coupling (makes motion more circular/elliptical)
            ax += w.s.a*cos(2*P*f*0.8*t+1.0)*e*.3;
        }

        // Surface wave (Rayleigh + Love, slow, high amp, long duration)
        if (t >= w.sf.s && t < w.sf.s+w.sf.d) {
            const l=(t-w.sf.s)/w.sf.d;
            const e = Math.min(l/.2,1) * (l>.35 ? Math.pow(1-(l-.35)/.65,1.3) : 1);
            const f = w.sf.f;
            // Rayleigh: retrograde elliptical
            ax += w.sf.a*e*(sin(2*P*f*t) + sin(2*P*f*1.3*t+1.2)*.55 + sin(2*P*.25*t)*.45 + sin(2*P*.12*t+.7)*.3);
            az += w.sf.a*e*(cos(2*P*f*t)*.75 + sin(2*P*.15*t+.9)*.3 + cos(2*P*f*0.6*t+2.0)*.35);
        }

        // Aftershock pulses (random high-freq bursts during S and surface waves)
        const aftershockT = t - w.s.s;
        if (aftershockT > 0 && t < this.config.duration) {
            // Periodic strong pulses
            const pulseFreq = 0.3; // pulses per second
            const pulsePhase = sin(aftershockT * pulseFreq * 2 * P);
            if (pulsePhase > 0.85) {
                const pulseAmp = w.s.a * 0.4 * pulsePhase;
                ax += pulseAmp * sin(aftershockT * 15.7);
                az += pulseAmp * cos(aftershockT * 12.3);
            }
        }

        // Decay
        const dur = this.config.duration;
        if (t > dur*.7) {
            const d = Math.pow(1-(t-dur*.7)/(dur*.3), 2.5);
            ax*=d; az*=d;
        }
        return {x:ax, z:az};
    }

    update(dt) {
        if (!this.config.active || this.config.paused || !this._ready) return;
        dt = Math.min(dt, 0.05);
        this.state.time += dt;
        const t = this.state.time, w = this.waveParams;

        if(t<w.p.s+w.p.d) this.state.phase='p-wave';
        else if(t<w.s.s+w.s.d) this.state.phase='s-wave';
        else if(t<w.sf.s+w.sf.d) this.state.phase='surface';
        else this.state.phase='decay';

        const ga = this._ga(t), dmp = this.config.damping;
        this.state.velocity.x += (ga.x - dmp*this.state.velocity.x)*dt;
        this.state.velocity.z += (ga.z - dmp*this.state.velocity.z)*dt;
        this.state.displacement.x += this.state.velocity.x*dt;
        this.state.displacement.z += this.state.velocity.z*dt;
        const mx = this.config.buildingHeight*0.2;
        this.state.displacement.x = Math.max(-mx, Math.min(mx, this.state.displacement.x));
        this.state.displacement.z = Math.max(-mx, Math.min(mx, this.state.displacement.z));
        this.state.acceleration = ga;
        this.state.peakAcceleration = Math.max(this.state.peakAcceleration, Math.sqrt(ga.x**2+ga.z**2));

        const dx = this.state.displacement.x, dz = this.state.displacement.z;

        // ═══ A) BASE SHAKING ═══
        this.model.position.x = this.origPos.x + dx * 0.35;
        this.model.position.z = this.origPos.z + dz * 0.35;
        // Whole-building tilt
        this.model.rotation.x = this.origRot.x + dz * 0.003;
        this.model.rotation.z = this.origRot.z - dx * 0.003;

        // ═══ B) CAMERA SHAKE ═══
        if (this.camera && this.origCamPos) {
            const shakeIntensity = Math.sqrt(ga.x**2 + ga.z**2) * 0.15;
            const camShakeX = Math.sin(t*25.7) * shakeIntensity;
            const camShakeY = Math.sin(t*19.3 + 1.2) * shakeIntensity * 0.5;
            const camShakeZ = Math.cos(t*22.1 + 0.7) * shakeIntensity;
            this.camera.position.x = this.origCamPos.x + camShakeX;
            this.camera.position.y = this.origCamPos.y + camShakeY;
            this.camera.position.z = this.origCamPos.z + camShakeZ;
        }

        // ═══ C) VERTEX DISPLACEMENT ═══
        const invS = 1.0 / this._modelScale;
        const displaceX = dx * invS * 2.5;
        const displaceZ = dz * invS * 2.5;
        let displaceY = 0;
        if (t < w.p.s + w.p.d + 2) {
            const pL = Math.max(0, t - w.p.s);
            displaceY = Math.sin(2*Math.PI*w.p.f*1.5*pL) * w.p.a * invS * 0.8;
        }
        const rotX = dz * 0.00015;
        const rotZ = -dx * 0.00015;

        for (const mesh of this.allMeshes) {
            const mat = mesh.material;
            if (!mat._eqShader) continue;
            const u = mat._eqShader.uniforms;
            u.eqDX.value = displaceX;
            u.eqDZ.value = displaceZ;
            u.eqDY.value = displaceY;
            u.eqHA.value = w.hA;
            u.eqRX.value = rotX;
            u.eqRZ.value = rotZ;
            u.eqTime.value = t;
        }

        // Drift
        const topD = Math.sqrt(dx**2+dz**2)*w.hA;
        this.state.currentDrift = topD/this.config.buildingHeight;
        this.state.maxDrift = Math.max(this.state.maxDrift, this.state.currentDrift);

        if(this.config.onUpdate) this.config.onUpdate({
            time:this.state.time, phase:this.state.phase,
            drift:this.state.currentDrift, driftPercent:(this.state.currentDrift*100).toFixed(2),
            maxDrift:this.state.maxDrift, displacement:{...this.state.displacement},
            acceleration:{...this.state.acceleration}, peakAcceleration:this.state.peakAcceleration,
        });
        if(this.state.currentDrift>.05 && this.config.onDamage) this.config.onDamage(this.state.currentDrift);
        if(this.state.time >= this.config.duration){
            this.config.active=false;
            // Restore camera
            if(this.camera && this.origCamPos) this.camera.position.copy(this.origCamPos);
            if(this.config.onComplete) this.config.onComplete();
        }
    }

    start() {
        this.waveParams = this._wp();
        this.config.active=true; this.config.paused=false;
        this.state={time:0,phase:'idle',displacement:{x:0,z:0},velocity:{x:0,z:0},acceleration:{x:0,z:0},maxDrift:0,currentDrift:0,peakAcceleration:0};
        // Save camera position for shake
        if(this.camera) this.origCamPos = this.camera.position.clone();
        console.log(`🌊 Terremoto M${this.config.magnitude} iniciado (suelo: ${this.config.soilType})`);
    }
    pause(){this.config.paused=!this.config.paused;}
    stop(){
        this.config.active=false;
        if(this.camera && this.origCamPos) this.camera.position.copy(this.origCamPos);
    }
    reset(){
        this.config.active=false;this.config.paused=false;
        this.state={time:0,phase:'idle',displacement:{x:0,z:0},velocity:{x:0,z:0},acceleration:{x:0,z:0},maxDrift:0,currentDrift:0,peakAcceleration:0};
        if(this.origPos)this.model.position.copy(this.origPos);
        if(this.origRot)this.model.rotation.copy(this.origRot);
        if(this.camera&&this.origCamPos)this.camera.position.copy(this.origCamPos);
        for(const mesh of this.allMeshes){
            const mat=mesh.material;
            if(!mat._eqShader)continue;
            const u=mat._eqShader.uniforms;
            u.eqDX.value=0;u.eqDZ.value=0;u.eqDY.value=0;u.eqRX.value=0;u.eqRZ.value=0;u.eqTime.value=0;
        }
    }
    getMeshes(){return this.allMeshes;}
    setMagnitude(m){this.config.magnitude=m;this.waveParams=this._wp();}
    setDuration(d){this.config.duration=d;this.waveParams=this._wp();}
    setSoilType(s){this.config.soilType=s;this.waveParams=this._wp();}
}
