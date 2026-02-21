/**
 * PHARMASIM — tablet-builder.js
 * Renderizado 3D de tableta en canvas 2D + granulación visualizer
 */

class TabletBuilder {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.color = '#e8e8e8';
        this.coating = 'none';
        this.force = 12;
        this.cracked = false;
        this.time = 0;
        this._resize();
        new ResizeObserver(() => this._resize()).observe(this.canvas.parentElement);
        this._loop();
    }

    _resize() {
        const w = this.canvas.parentElement.clientWidth || 400;
        const h = this.canvas.parentElement.clientHeight || 260;
        this.canvas.width = w;
        this.canvas.height = h;
        this.W = w; this.H = h;
    }

    setColor(hex) { this.color = hex; }
    setCoating(type) { this.coating = type; }
    setForce(kN) { this.force = kN; this.cracked = kN < 3 || kN > 28; }

    _loop() {
        requestAnimationFrame(() => this._loop());
        this.time += 0.015;
        this._draw();
    }

    _draw() {
        const ctx = this.ctx;
        const W = this.W, H = this.H;
        ctx.clearRect(0, 0, W, H);

        // Background
        ctx.fillStyle = '#06090f';
        ctx.fillRect(0, 0, W, H);

        // Shadow grid
        ctx.strokeStyle = 'rgba(255,255,255,0.025)';
        ctx.lineWidth = 1;
        for (let x = 0; x < W; x += 30) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
        for (let y = 0; y < H; y += 30) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

        const cx = W / 2, cy = H / 2;

        // Tablet dimensions based on force
        const hardness = this._getHardness();
        const baseW = 80 + (this.force - 1) * 0.5;
        const tabH = 28 - (this.force - 1) * 0.3;
        const rx = baseW / 2;
        const ry = Math.max(tabH * 0.3, tabH / 2);

        // Floating animation
        const floatY = Math.sin(this.time) * 3;

        if (this.cracked && this.force > 28) {
            this._drawCrackedTablet(ctx, cx, cy + floatY, rx, ry);
            return;
        }
        if (this.cracked && this.force < 3) {
            this._drawFragmentedTablet(ctx, cx, cy + floatY);
            return;
        }

        // Tablet shadow
        ctx.save();
        ctx.translate(cx, cy + floatY + ry + 8);
        ctx.scale(1, 0.25);
        const shadowGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, rx);
        shadowGrad.addColorStop(0, 'rgba(0,0,0,0.6)');
        shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx * 0.9, rx * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw 3D tablet
        ctx.save();
        ctx.translate(cx, cy + floatY);

        // Side face (3D effect)
        const depth = tabH * 0.6;
        const col = this._parseColor(this.color);
        const darkerCol = `rgba(${Math.max(0,col.r-40)},${Math.max(0,col.g-40)},${Math.max(0,col.b-40)},1)`;
        
        // Bottom edge
        ctx.beginPath();
        ctx.ellipse(depth * 0.3, depth * 0.15, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = darkerCol;
        ctx.fill();

        // Main face with gradient
        const faceGrad = ctx.createLinearGradient(-rx, -ry, rx, ry);
        faceGrad.addColorStop(0, this._lighten(this.color, 40));
        faceGrad.addColorStop(0.4, this.color);
        faceGrad.addColorStop(1, this._darken(this.color, 30));

        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = faceGrad;
        ctx.fill();

        // Highlight
        const hlGrad = ctx.createRadialGradient(-rx * 0.3, -ry * 0.4, 2, 0, 0, rx);
        hlGrad.addColorStop(0, 'rgba(255,255,255,0.6)');
        hlGrad.addColorStop(0.4, 'rgba(255,255,255,0.1)');
        hlGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = hlGrad;
        ctx.fill();

        // Score line
        ctx.beginPath();
        ctx.moveTo(-rx * 0.6, 0); ctx.lineTo(rx * 0.6, 0);
        ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = 1.5; ctx.stroke();

        // Coating effect overlay
        if (this.coating !== 'none') {
            ctx.beginPath();
            ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
            if (this.coating === 'enteric') {
                ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3;
                ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]);
            } else if (this.coating === 'extended') {
                ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 4; ctx.stroke();
            } else {
                ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2; ctx.stroke();
            }
        }

        // Imprint text
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.font = 'bold 11px IBM Plex Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('PS-02', 0, -ry * 0.25);

        ctx.restore();

        // Labels
        ctx.fillStyle = 'rgba(139,156,184,0.7)';
        ctx.font = '10px DM Sans, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`∅ ${(rx * 2 * 0.12).toFixed(1)} mm`, 12, H - 12);
        ctx.textAlign = 'right';
        ctx.fillText(this.coating !== 'none' ? `+ ${this.coating} coating` : 'Sin recubrimiento', W - 12, H - 12);

        // Coating type badge
        if (this.coating !== 'none') {
            const badges = { film: '🎨 Film', enteric: '🛡️ Entérico', extended: '⏱️ Ext. Release' };
            ctx.fillStyle = 'rgba(34,197,94,0.8)';
            ctx.font = 'bold 11px DM Sans, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(badges[this.coating], cx, 20);
        }
    }

    _drawCrackedTablet(ctx, cx, cy, rx, ry) {
        ctx.save(); ctx.translate(cx, cy);
        ctx.fillStyle = 'rgba(239,68,68,0.1)';
        ctx.beginPath(); ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2); ctx.fill();
        // Crack lines
        ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
        const cracks = [[[-20,-ry],[0,0],[20,ry]], [[-rx,0],[0,5],[rx,-8]]];
        cracks.forEach(pts => {
            ctx.beginPath(); pts.forEach((p,i) => i===0?ctx.moveTo(p[0],p[1]):ctx.lineTo(p[0],p[1])); ctx.stroke();
        });
        ctx.restore();
        ctx.fillStyle = '#ef4444'; ctx.font = 'bold 12px DM Sans'; ctx.textAlign = 'center';
        ctx.fillText('⚠ DEMASIADA PRESIÓN — Tableta agrietada', cx, cy + ry + 20);
    }

    _drawFragmentedTablet(ctx, cx, cy) {
        const pieces = [
            {x:-15,y:-5,r:12,a:0.3}, {x:10,y:-8,r:9,a:-0.2},
            {x:-5,y:8,r:8,a:0.5}, {x:18,y:6,r:6,a:-0.4}, {x:-20,y:5,r:7,a:0.1}
        ];
        pieces.forEach(p => {
            ctx.save(); ctx.translate(cx+p.x, cy+p.y); ctx.rotate(p.a);
            ctx.fillStyle = this.color; ctx.beginPath();
            ctx.arc(0,0,p.r,0,Math.PI*2); ctx.fill(); ctx.restore();
        });
        ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 12px DM Sans'; ctx.textAlign = 'center';
        ctx.fillText('⚠ PRESIÓN INSUFICIENTE — Tableta friable', cx, cy + 30);
    }

    _parseColor(hex) {
        const r = parseInt(hex.slice(1,3),16)||200;
        const g = parseInt(hex.slice(3,5),16)||200;
        const b = parseInt(hex.slice(5,7),16)||200;
        return {r,g,b};
    }
    _lighten(hex, amt) {
        const c = this._parseColor(hex);
        return `rgb(${Math.min(255,c.r+amt)},${Math.min(255,c.g+amt)},${Math.min(255,c.b+amt)})`;
    }
    _darken(hex, amt) {
        const c = this._parseColor(hex);
        return `rgb(${Math.max(0,c.r-amt)},${Math.max(0,c.g-amt)},${Math.max(0,c.b-amt)})`;
    }
    _getHardness() {
        return Math.round(this.force * 8 + 20);
    }
    getMetrics() {
        const h = this._getHardness();
        return {
            diameter: (80 + this.force * 0.5) * 0.12,
            weight:   200 + this.force * 15,
            hardness: h,
            friability: Math.max(0, 2.5 - (this.force - 1) * 0.12).toFixed(2)
        };
    }
}

// ─── GRANULATION CANVAS ──────────────────────────────────────────────────

class GranulationVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.granules  = [];
        this.phase = 'idle'; // idle | mixing | granulating | done
        this.progress = 0;
        this.time = 0;
        this.params = { temp: 50, speed: 50, time: 20 };
        this._resize();
        new ResizeObserver(() => this._resize()).observe(this.canvas.parentElement);
        this._loop();
        this._initParticles();
    }

    _resize() {
        const w = this.canvas.parentElement.clientWidth || 600;
        const h = this.canvas.parentElement.clientHeight || 300;
        this.canvas.width = w; this.canvas.height = h;
        this.W = w; this.H = h;
    }

    _initParticles() {
        this.particles = [];
        for (let i = 0; i < 120; i++) {
            this.particles.push({
                x: 20 + Math.random() * (this.W - 40),
                y: 20 + Math.random() * (this.H - 40),
                r: 1.5 + Math.random() * 2,
                vx: (Math.random()-0.5)*0.5,
                vy: (Math.random()-0.5)*0.5,
                color: `hsl(${200+Math.random()*60},40%,${55+Math.random()*25}%)`,
                bonded: false,
                granuleId: null
            });
        }
    }

    setParams(temp, speed, time) { this.params = { temp, speed, time }; }

    startGranulation(onProgress, onComplete) {
        this.phase = 'granulating';
        this.progress = 0;
        this.granules = [];
        const duration = 4000; // 4s simulation
        const start = performance.now();

        const tick = (now) => {
            this.progress = Math.min(1, (now - start) / duration);
            onProgress && onProgress(Math.round(this.progress * 100));

            if (this.progress >= 1) {
                this.phase = 'done';
                const results = this.calculateResults();
                onComplete && onComplete(results);
            } else {
                requestAnimationFrame(tick);
            }
        };
        requestAnimationFrame(tick);
    }

    calculateResults() {
        const { temp, speed, time } = this.params;
        // Optimal: temp 40-60, speed 30-70, time 15-30
        const tempScore  = 1 - Math.abs(temp - 50) / 40;
        const speedScore = 1 - Math.abs(speed - 50) / 50;
        const timeScore  = 1 - Math.abs(time - 22) / 22;
        const quality = (tempScore + speedScore + timeScore) / 3;

        const baseSize = 200 + (temp - 20) * 4 + speed * 1.5;
        const size = Math.max(80, Math.min(800, baseSize));
        const uniformity = Math.round(60 + quality * 38);
        const moisture = Math.max(0.5, 5 - (temp - 20) * 0.06);
        const flowGrade = quality > 0.75 ? 'Excelente' : quality > 0.5 ? 'Buena' : 'Regular';

        return { size: Math.round(size), uniformity, moisture: moisture.toFixed(1), flow: flowGrade, quality };
    }

    _loop() {
        requestAnimationFrame(() => this._loop());
        this.time += 0.016;
        this._update();
        this._draw();
    }

    _update() {
        const W = this.W, H = this.H;
        const speed = this.phase === 'granulating' ? this.params.speed / 30 : 0.3;

        this.particles.forEach(p => {
            if (this.phase === 'granulating') {
                const cx = W/2, cy = H/2;
                const dx = p.x - cx, dy = p.y - cy;
                const d = Math.sqrt(dx*dx+dy*dy)+0.1;
                p.vx += (-dy/d * speed - p.vx) * 0.12 + (Math.random()-.5)*speed*0.4;
                p.vy += ( dx/d * speed - p.vy) * 0.12 + (Math.random()-.5)*speed*0.4;

                // Bonding probability
                if (this.progress > 0.3 && Math.random() < 0.003 * this.progress) {
                    p.bonded = true;
                    p.r = Math.min(p.r + 0.5 * this.progress, 6);
                }
            } else {
                p.vx += (Math.random()-.5)*0.2; p.vy += (Math.random()-.5)*0.2;
                p.vx *= 0.95; p.vy *= 0.95;
            }

            const maxV = speed * 2 + 1;
            const v = Math.sqrt(p.vx*p.vx+p.vy*p.vy);
            if (v > maxV) { p.vx=(p.vx/v)*maxV; p.vy=(p.vy/v)*maxV; }

            p.x += p.vx; p.y += p.vy;
            if (p.x<p.r) { p.x=p.r; p.vx=Math.abs(p.vx); }
            if (p.x>W-p.r) { p.x=W-p.r; p.vx=-Math.abs(p.vx); }
            if (p.y<p.r) { p.y=p.r; p.vy=Math.abs(p.vy); }
            if (p.y>H-p.r) { p.y=H-p.r; p.vy=-Math.abs(p.vy); }
        });
    }

    _draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.W, this.H);
        ctx.fillStyle = '#06090f'; ctx.fillRect(0,0,this.W,this.H);

        // Temperature heatmap
        if (this.phase === 'granulating') {
            const t = this.params.temp;
            const heatAlpha = (t - 20) / 60 * 0.15;
            const heat = ctx.createRadialGradient(this.W/2,this.H/2,20,this.W/2,this.H/2,Math.min(this.W,this.H)*0.5);
            heat.addColorStop(0, `rgba(239,68,68,${heatAlpha})`);
            heat.addColorStop(1, 'rgba(239,68,68,0)');
            ctx.fillStyle = heat; ctx.fillRect(0,0,this.W,this.H);
        }

        this.particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
            if (p.bonded) {
                const g = ctx.createRadialGradient(p.x-p.r*.3,p.y-p.r*.3,0,p.x,p.y,p.r);
                g.addColorStop(0,'rgba(255,255,255,0.8)');
                g.addColorStop(0.4, p.color);
                g.addColorStop(1, '#16a34a');
                ctx.fillStyle = g;
            } else {
                ctx.fillStyle = p.color;
            }
            ctx.fill();
        });

        // Progress ring
        if (this.phase === 'granulating') {
            ctx.beginPath();
            ctx.arc(this.W/2, this.H/2, 60, -Math.PI/2, -Math.PI/2 + this.progress * Math.PI*2);
            ctx.strokeStyle = 'rgba(34,197,94,0.3)'; ctx.lineWidth = 3; ctx.stroke();
        }
    }
}

window.TabletBuilder = TabletBuilder;
window.GranulationVisualizer = GranulationVisualizer;

// ─── GAUGE CANVAS ─────────────────────────────────────────────────────────
window.drawGauge = function(canvasId, value, label, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W/2, cy = H * 0.6;
    const r = Math.min(W,H) * 0.38;

    ctx.clearRect(0,0,W,H);

    // Track
    ctx.beginPath();
    ctx.arc(cx,cy,r,Math.PI,2*Math.PI);
    ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=12; ctx.lineCap='round'; ctx.stroke();

    // Value arc
    const angle = Math.PI + (value/100) * Math.PI;
    ctx.beginPath();
    ctx.arc(cx,cy,r,Math.PI,angle);
    ctx.strokeStyle=color||'#22c55e'; ctx.lineWidth=12; ctx.stroke();

    // Center text
    ctx.fillStyle='#f0f4ff';
    ctx.font=`bold ${H*0.18}px IBM Plex Mono, monospace`;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(Math.round(value), cx, cy - H*0.06);

    ctx.font=`${H*0.09}px DM Sans, sans-serif`;
    ctx.fillStyle='rgba(139,156,184,0.8)';
    ctx.fillText(label||'%', cx, cy + H*0.1);

    // Tick marks
    for (let i=0;i<=10;i++) {
        const a = Math.PI + (i/10)*Math.PI;
        const x1 = cx + Math.cos(a)*(r-16), y1 = cy + Math.sin(a)*(r-16);
        const x2 = cx + Math.cos(a)*(r-8),  y2 = cy + Math.sin(a)*(r-8);
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
        ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=1; ctx.stroke();
    }
};
