/**
 * PHARMASIM — particle-physics.js
 * Motor de física de partículas para el mezclador farmacéutico
 */

class ParticlePhysics {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx    = this.canvas.getContext('2d');
        this.particles = [];
        this.groups    = []; // particle groups by excipient
        this.isRunning = false;
        this.isMixing  = false;
        this.mixSpeed  = 0;
        this.time      = 0;

        this._resize();
        new ResizeObserver(() => this._resize()).observe(this.canvas.parentElement);
        this._loop();
    }

    _resize() {
        const wrap = this.canvas.parentElement;
        this.canvas.width  = wrap.clientWidth  || 600;
        this.canvas.height = wrap.clientHeight || 300;
        this.W = this.canvas.width;
        this.H = this.canvas.height;
    }

    // Add a group of particles for an excipient
    addExcipient(excipient, percentage) {
        const count = Math.max(8, Math.min(60, Math.round(percentage * 0.8)));
        const color = excipient.color || '#aaaaaa';
        const group = { id: excipient.id, color, particles: [] };

        for (let i = 0; i < count; i++) {
            const p = this._makeParticle(color, excipient.category, i, count);
            this.particles.push(p);
            group.particles.push(p);
        }
        this.groups.push(group);
    }

    _makeParticle(color, category, idx, total) {
        const margin = 20;
        let r;
        switch (category) {
            case 'diluent':     r = 5 + Math.random() * 4; break;
            case 'binder':      r = 3 + Math.random() * 3; break;
            case 'disintegrant':r = 4 + Math.random() * 3; break;
            case 'lubricant':   r = 2 + Math.random() * 2; break;
            default:            r = 3 + Math.random() * 3;
        }

        return {
            x: margin + Math.random() * (this.W - margin * 2),
            y: margin + Math.random() * (this.H - margin * 2),
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            r,
            color,
            category,
            alpha: 0,        // fade in
            targetAlpha: 0.85,
            trail: [],
            angle: Math.random() * Math.PI * 2,
            angleSpeed: (Math.random() - 0.5) * 0.05,
        };
    }

    removeExcipient(excipientId) {
        const group = this.groups.find(g => g.id === excipientId);
        if (!group) return;
        group.particles.forEach(p => { p.targetAlpha = 0; p._remove = true; });
        setTimeout(() => {
            this.particles = this.particles.filter(p => !p._remove);
            this.groups = this.groups.filter(g => g.id !== excipientId);
        }, 600);
    }

    clear() {
        this.particles.forEach(p => { p.targetAlpha = 0; });
        setTimeout(() => {
            this.particles = [];
            this.groups = [];
        }, 500);
    }

    startMixing(speed = 50) {
        this.isMixing = true;
        this.mixSpeed = speed / 50; // normalized
    }

    stopMixing() {
        this.isMixing = false;
        this.mixSpeed = 0;
    }

    _loop() {
        requestAnimationFrame(() => this._loop());
        this.time += 0.016;
        this._update();
        this._draw();
    }

    _update() {
        const W = this.W, H = this.H;
        const margin = 8;

        this.particles.forEach(p => {
            // Fade in/out
            p.alpha += (p.targetAlpha - p.alpha) * 0.06;

            if (this.isMixing) {
                // Vortex mixing motion
                const cx = W / 2, cy = H / 2;
                const dx = p.x - cx, dy = p.y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;

                // Circular + turbulent velocity
                const vortexStrength = this.mixSpeed * 2.5;
                const tangentX =  -dy / dist * vortexStrength;
                const tangentY =   dx / dist * vortexStrength;
                const turbulence = (Math.random() - 0.5) * this.mixSpeed * 1.5;

                p.vx += (tangentX - p.vx) * 0.15 + turbulence * 0.3;
                p.vy += (tangentY - p.vy) * 0.15 + turbulence * 0.3;

                // Speed limit
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                const maxSpeed = 4 * this.mixSpeed;
                if (speed > maxSpeed) {
                    p.vx = (p.vx / speed) * maxSpeed;
                    p.vy = (p.vy / speed) * maxSpeed;
                }
            } else {
                // Brownian motion
                p.vx += (Math.random() - 0.5) * 0.3;
                p.vy += (Math.random() - 0.5) * 0.3 + 0.05; // slight gravity

                // Damping
                p.vx *= 0.97;
                p.vy *= 0.97;

                // Speed limit brownian
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > 1.5) {
                    p.vx = (p.vx / speed) * 1.5;
                    p.vy = (p.vy / speed) * 1.5;
                }
            }

            // Move
            p.x += p.vx;
            p.y += p.vy;
            p.angle += p.angleSpeed;

            // Trail
            if (this.isMixing) {
                p.trail.push({ x: p.x, y: p.y });
                if (p.trail.length > 8) p.trail.shift();
            } else {
                p.trail = [];
            }

            // Boundary collision with bounce
            if (p.x - p.r < margin) { p.x = margin + p.r; p.vx = Math.abs(p.vx) * 0.7; }
            if (p.x + p.r > W - margin) { p.x = W - margin - p.r; p.vx = -Math.abs(p.vx) * 0.7; }
            if (p.y - p.r < margin) { p.y = margin + p.r; p.vy = Math.abs(p.vy) * 0.7; }
            if (p.y + p.r > H - margin) { p.y = H - margin - p.r; p.vy = -Math.abs(p.vy) * 0.7; }
        });
    }

    _draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.W, this.H);

        if (this.particles.length === 0) return;

        // Background subtle grid
        ctx.strokeStyle = 'rgba(255,255,255,0.025)';
        ctx.lineWidth = 1;
        for (let x = 0; x < this.W; x += 30) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.H); ctx.stroke();
        }
        for (let y = 0; y < this.H; y += 30) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(this.W, y); ctx.stroke();
        }

        // Draw connections between nearby particles of same type
        if (this.isMixing) {
            this.particles.forEach((p, i) => {
                if (p.alpha < 0.1) return;
                for (let j = i + 1; j < Math.min(i + 20, this.particles.length); j++) {
                    const q = this.particles[j];
                    if (q.color !== p.color) continue;
                    const dx = p.x - q.x, dy = p.y - q.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 40) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
                        const alpha = (1 - dist / 40) * 0.15 * p.alpha;
                        ctx.strokeStyle = p.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', 'rgba(').replace(/([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/, (_, r, g, b) => `${parseInt(r,16)},${parseInt(g,16)},${parseInt(b,16)}`);
                        // simpler approach:
                        ctx.globalAlpha = alpha;
                        ctx.strokeStyle = p.color;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            });
        }

        // Draw trails
        this.particles.forEach(p => {
            if (p.trail.length < 2 || p.alpha < 0.1) return;
            ctx.beginPath();
            ctx.moveTo(p.trail[0].x, p.trail[0].y);
            for (let i = 1; i < p.trail.length; i++) {
                ctx.lineTo(p.trail[i].x, p.trail[i].y);
            }
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = p.alpha * 0.2;
            ctx.lineWidth = p.r * 0.5;
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.globalAlpha = 1;
        });

        // Draw particles
        this.particles.forEach(p => {
            if (p.alpha < 0.01) return;

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);

            const shape = p.category;
            if (shape === 'lubricant') {
                // Thin platelets
                ctx.beginPath();
                ctx.ellipse(0, 0, p.r * 1.8, p.r * 0.6, 0, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            } else if (shape === 'binder') {
                // Irregular blob
                ctx.beginPath();
                const pts = 6;
                for (let i = 0; i <= pts; i++) {
                    const a = (i / pts) * Math.PI * 2;
                    const rr = p.r * (0.8 + Math.sin(a * 3 + p.angle * 2) * 0.25);
                    i === 0 ? ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr)
                             : ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
                }
                ctx.closePath();
                ctx.fillStyle = p.color;
                ctx.fill();
            } else if (shape === 'disintegrant') {
                // Fibrous shape
                ctx.beginPath();
                ctx.rect(-p.r * 0.5, -p.r * 1.5, p.r, p.r * 3);
                ctx.fillStyle = p.color;
                ctx.fill();
            } else {
                // Standard sphere with glow
                const grad = ctx.createRadialGradient(-p.r * 0.3, -p.r * 0.3, 0, 0, 0, p.r);
                grad.addColorStop(0, 'white');
                grad.addColorStop(0.3, p.color);
                grad.addColorStop(1, p.color + '80');
                ctx.beginPath();
                ctx.arc(0, 0, p.r, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // Rim
                ctx.strokeStyle = 'rgba(255,255,255,0.2)';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            ctx.restore();
        });

        // Mixing vortex visual
        if (this.isMixing) {
            const cx = this.W / 2, cy = this.H / 2;
            const rings = 3;
            for (let i = 0; i < rings; i++) {
                const r = (i + 1) * (Math.min(this.W, this.H) / (rings * 2.5));
                const offset = this.time * (i % 2 === 0 ? 1 : -1) * 0.5;
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(34,197,94,${0.04 + i * 0.015})`;
                ctx.lineWidth = 1;
                ctx.setLineDash([8, 12]);
                ctx.lineDashOffset = -offset * 20;
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }
    }

    // Get mixing uniformity score (0-100)
    getUniformityScore() {
        if (this.particles.length === 0) return 0;
        if (!this.isMixing && this.time < 2) return 30;

        // Divide canvas into grid, check distribution
        const gridSize = 5;
        const cellW = this.W / gridSize;
        const cellH = this.H / gridSize;
        const grid = new Array(gridSize * gridSize).fill(0).map(() => new Set());

        this.particles.forEach(p => {
            const gx = Math.floor(p.x / cellW);
            const gy = Math.floor(p.y / cellH);
            const idx = gy * gridSize + gx;
            if (grid[idx]) grid[idx].add(p.color);
        });

        const uniqueColors = new Set(this.particles.map(p => p.color)).size;
        const coveredCells = grid.filter(s => s.size > 0).length;
        const wellMixedCells = grid.filter(s => s.size >= Math.min(2, uniqueColors)).length;

        return Math.round((wellMixedCells / (gridSize * gridSize)) * 100);
    }
}

window.ParticlePhysics = ParticlePhysics;
