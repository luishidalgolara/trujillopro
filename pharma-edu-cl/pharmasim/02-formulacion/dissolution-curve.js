/**
 * PHARMASIM — dissolution-curve.js
 * Cálculo y renderizado de curva de disolución USP
 */

class DissolutionCurve {
    constructor() {
        this.timePoints = [0, 5, 10, 15, 20, 30, 45, 60, 90, 120]; // minutes
    }

    /**
     * Generate dissolution profile based on formulation parameters
     * @param {Object} api - API data
     * @param {Array}  excipients - added excipients with percentages
     * @param {Object} granParams - {temp, speed, time, solvent}
     * @param {Object} compParams - {force, coating}
     * @returns {Object} { curve, params, quality }
     */
    calculate(api, excipients, granParams, compParams) {
        let profile = [...this.timePoints].map(t => 0);
        const target = api.targetDissolution;

        // Base curve using Weibull model: Q(t) = 100 * (1 - exp(-(t/T)^b))
        let T = target.t85 * 0.6; // characteristic time
        let b = 1.5;             // shape factor

        // ── Excipient effects ──
        const excMap = {};
        excipients.forEach(e => { excMap[e.id] = e.percentage; });

        // Superdisintegrants: speed up
        if (excMap['crosscarmellose']) T *= (1 - excMap['crosscarmellose'] / 100 * 1.5);
        if (excMap['crosspovidone'])   T *= (1 - excMap['crosspovidone']   / 100 * 1.8);
        if (excMap['starch'])          T *= (1 - excMap['starch']          / 100 * 0.8);

        // Solubilizer for BCS II
        if (excMap['poloxamer'] && api.solubilityClass === 'BCS Clase II') {
            T *= (1 - excMap['poloxamer'] / 100 * 2);
            b += 0.3;
        }

        // HPMC > 15% = sustained release
        if (excMap['hpmc'] && excMap['hpmc'] >= 15) {
            T *= 4; b = 0.8; // biphasic
        }

        // Lubricant overdose
        if (excMap['magnesium_stearate'] > 1) T *= (1 + (excMap['magnesium_stearate'] - 1) * 0.8);

        // Incompatibilities reduce Qmax
        let Qmax = 100;
        if (excMap['dcp'] && (api.id === 'aspirin' || api.id === 'ibuprofen')) Qmax *= 0.72;
        if (excMap['lactose'] && api.id === 'amoxicillin') Qmax *= 0.85;

        // ── Granulation effects ──
        const tempScore  = 1 - Math.abs(granParams.temp  - 50) / 40;
        const speedScore = 1 - Math.abs(granParams.speed - 50) / 50;
        const timeScore  = 1 - Math.abs(granParams.time  - 22) / 22;
        const granQuality = (tempScore + speedScore + timeScore) / 3;
        T *= (1.5 - granQuality);
        b += (granQuality - 0.5) * 0.5;

        // ── Compression effects ──
        const optForce = 12;
        const forceDeviation = Math.abs(compParams.force - optForce) / optForce;
        T *= (1 + forceDeviation * 0.8);
        b = Math.max(0.5, b - forceDeviation * 0.3);

        // ── Coating effects ──
        if (compParams.coating === 'enteric') {
            // No dissolution in stomach (first 30 min)
            this.timePoints.forEach((t, i) => {
                profile[i] = t < 30 ? 0 : Math.min(Qmax, Qmax * (1 - Math.exp(-Math.pow((t-30)/T, b))));
            });
        } else if (compParams.coating === 'extended') {
            T *= 2.5; b = 0.7;
            this.timePoints.forEach((t, i) => {
                profile[i] = Math.min(Qmax, Qmax * (1 - Math.exp(-Math.pow(t/T, b))));
            });
        } else {
            this.timePoints.forEach((t, i) => {
                profile[i] = Math.min(Qmax, Qmax * (1 - Math.exp(-Math.pow(t/T, b))));
            });
        }

        // Add slight randomness (biological variability simulation)
        profile = profile.map((v, i) => {
            if (i === 0) return 0;
            const noise = (Math.random() - 0.5) * 3;
            return Math.max(0, Math.min(100, v + noise));
        });
        profile[0] = 0;

        // Ensure monotone increasing
        for (let i = 1; i < profile.length; i++) {
            profile[i] = Math.max(profile[i], profile[i-1]);
        }

        // ── Parameters ──
        const t50  = this._interpolateTime(profile, 50);
        const t85  = this._interpolateTime(profile, 85);
        const q30  = this._interpolateQ(profile, 30);
        const f2   = this._calcF2(profile, api);

        return {
            curve: profile,
            timePoints: this.timePoints,
            params: { t50, t85, q30: Math.round(q30), f2: Math.round(f2) },
            quality: { Qmax, T, b, f2 }
        };
    }

    _interpolateTime(profile, targetQ) {
        for (let i = 1; i < profile.length; i++) {
            if (profile[i] >= targetQ) {
                const frac = (targetQ - profile[i-1]) / (profile[i] - profile[i-1]);
                const t = this.timePoints[i-1] + frac * (this.timePoints[i] - this.timePoints[i-1]);
                return Math.round(t);
            }
        }
        return '>120';
    }

    _interpolateQ(profile, targetT) {
        for (let i = 1; i < this.timePoints.length; i++) {
            if (this.timePoints[i] >= targetT) {
                const frac = (targetT - this.timePoints[i-1]) / (this.timePoints[i] - this.timePoints[i-1]);
                return profile[i-1] + frac * (profile[i] - profile[i-1]);
            }
        }
        return profile[profile.length - 1];
    }

    _calcF2(testProfile, api) {
        // f2 = 50 * log10(100 / sqrt(1/n * sum((R-T)^2)))
        const ref = this._generateReference(api);
        const n = this.timePoints.length;
        let sumSq = 0;
        for (let i = 0; i < n; i++) {
            sumSq += Math.pow(ref[i] - testProfile[i], 2);
        }
        const f2 = 50 * Math.log10(100 / Math.sqrt(sumSq / n));
        return Math.max(10, Math.min(100, f2));
    }

    _generateReference(api) {
        const T = api.targetDissolution.t85 * 0.6;
        return this.timePoints.map((t, i) => {
            if (i === 0) return 0;
            return Math.min(100, 100 * (1 - Math.exp(-Math.pow(t/T, 1.5))));
        });
    }

    /**
     * Draw dissolution curve on canvas
     */
    draw(canvasId, data, api) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || !data) return;

        // Set canvas size
        const wrap = canvas.parentElement;
        const W = (wrap ? wrap.clientWidth : 560) - 36;
        canvas.width  = Math.min(W, 560);
        canvas.height = 260;

        const ctx = canvas.getContext('2d');
        const cW = canvas.width, cH = canvas.height;
        const pad = { l: 46, r: 20, t: 16, b: 36 };
        const plotW = cW - pad.l - pad.r;
        const plotH = cH - pad.t - pad.b;

        ctx.clearRect(0,0,cW,cH);
        ctx.fillStyle = '#06090f'; ctx.fillRect(0,0,cW,cH);

        const tx = (t)  => pad.l + (t / 120) * plotW;
        const ty = (pct) => pad.t + plotH - (pct / 100) * plotH;

        // Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
        [0,20,40,60,80,100].forEach(pct => {
            ctx.beginPath(); ctx.moveTo(pad.l, ty(pct)); ctx.lineTo(pad.l+plotW, ty(pct)); ctx.stroke();
        });
        [0,30,60,90,120].forEach(t => {
            ctx.beginPath(); ctx.moveTo(tx(t), pad.t); ctx.lineTo(tx(t), pad.t+plotH); ctx.stroke();
        });

        // Axis labels
        ctx.fillStyle = 'rgba(139,156,184,0.7)';
        ctx.font = '10px IBM Plex Mono, monospace';
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        [0,25,50,75,100].forEach(pct => {
            ctx.fillText(pct+'%', pad.l-6, ty(pct));
        });
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        [0,30,60,90,120].forEach(t => {
            ctx.fillText(t+'min', tx(t), pad.t+plotH+5);
        });

        // Reference (innovator) curve
        const ref = this._generateReference(api);
        ctx.beginPath();
        ref.forEach((v,i) => {
            const x = tx(data.timePoints[i]);
            const y = ty(v);
            i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        });
        ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.5;
        ctx.setLineDash([6,6]); ctx.stroke(); ctx.setLineDash([]);

        // Acceptance window (f2 zone)
        ctx.beginPath();
        ctx.fillStyle = 'rgba(34,197,94,0.04)';
        const upper = ref.map(v => Math.min(100, v + 10));
        const lower = ref.map(v => Math.max(0, v - 10));
        upper.forEach((v,i) => {
            const x = tx(data.timePoints[i]), y = ty(v);
            i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        });
        for (let i = lower.length-1; i >= 0; i--) {
            ctx.lineTo(tx(data.timePoints[i]), ty(lower[i]));
        }
        ctx.closePath(); ctx.fill();

        // Test curve gradient fill
        const gradFill = ctx.createLinearGradient(0, pad.t, 0, pad.t+plotH);
        gradFill.addColorStop(0, 'rgba(34,197,94,0.2)');
        gradFill.addColorStop(1, 'rgba(34,197,94,0.01)');
        ctx.beginPath();
        data.curve.forEach((v,i) => {
            const x = tx(data.timePoints[i]), y = ty(v);
            i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        });
        ctx.lineTo(tx(120), ty(0)); ctx.lineTo(tx(0), ty(0));
        ctx.closePath(); ctx.fillStyle = gradFill; ctx.fill();

        // Test curve line
        ctx.beginPath();
        data.curve.forEach((v,i) => {
            const x = tx(data.timePoints[i]), y = ty(v);
            i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        });
        ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2.5; ctx.stroke();

        // Data points
        data.curve.forEach((v,i) => {
            ctx.beginPath();
            ctx.arc(tx(data.timePoints[i]), ty(v), 3.5, 0, Math.PI*2);
            ctx.fillStyle = '#22c55e'; ctx.fill();
            ctx.strokeStyle = '#06090f'; ctx.lineWidth = 1; ctx.stroke();
        });

        // f2 annotation
        const f2 = data.params.f2;
        const f2Color = f2 >= 50 ? '#22c55e' : f2 >= 35 ? '#f59e0b' : '#ef4444';
        ctx.fillStyle = f2Color;
        ctx.font = 'bold 11px IBM Plex Mono, monospace';
        ctx.textAlign = 'right'; ctx.textBaseline = 'top';
        ctx.fillText(`f₂ = ${f2}${f2 >= 50 ? ' ✓' : ' ✗'}`, cW - pad.r, pad.t);

        // Axis titles
        ctx.save(); ctx.translate(10, pad.t + plotH/2); ctx.rotate(-Math.PI/2);
        ctx.fillStyle = 'rgba(139,156,184,0.5)'; ctx.font = '10px DM Sans, sans-serif';
        ctx.textAlign = 'center'; ctx.fillText('Disolución (%)', 0, 0); ctx.restore();
    }

    /**
     * Calculate overall formulation score (0-100)
     */
    scoreFormulation(dissolutionData, qcData, excipients, api) {
        let score = 0;
        const issues = [];
        const achievements = [];

        // f2 score (40 pts)
        const f2 = dissolutionData.params.f2;
        if (f2 >= 50) { score += 40; achievements.push(`Factor f₂ = ${f2} ≥ 50 — Perfiles similares al innovador ✓`); }
        else if (f2 >= 35) { score += 20; issues.push(`Factor f₂ = ${f2} < 50 — Perfil no equivalente al innovador`); }
        else { score += 5;  issues.push(`Factor f₂ = ${f2} muy bajo — Perfil muy diferente al innovador`); }

        // Q30 (20 pts)
        const q30 = dissolutionData.params.q30;
        if (q30 >= api.targetDissolution.q30) { score += 20; achievements.push(`Q₃₀ = ${q30}% — Supera criterio de disolución a 30 min ✓`); }
        else if (q30 >= api.targetDissolution.q30 * 0.7) { score += 10; issues.push(`Q₃₀ = ${q30}% — Por debajo del criterio (${api.targetDissolution.q30}%)`); }
        else { issues.push(`Q₃₀ = ${q30}% — Muy inferior al criterio (${api.targetDissolution.q30}%)`); }

        // QC tests (30 pts)
        const passedQC = qcData.filter(t => t.pass).length;
        score += passedQC * 7.5;
        if (passedQC === 4) achievements.push('Todos los tests de QC aprobados ✓');
        else issues.push(`${4 - passedQC} test(s) de QC fallidos`);

        // Formulation completeness (10 pts)
        const hasDisintegrant = excipients.some(e => e.category === 'disintegrant');
        const hasLubricant    = excipients.some(e => e.category === 'lubricant');
        const hasBinder       = excipients.some(e => e.category === 'binder');
        if (hasDisintegrant && hasLubricant) { score += 5; achievements.push('Excipientes esenciales incluidos ✓'); }
        else { issues.push('Faltan excipientes esenciales (disgregante y/o lubricante)'); }
        if (hasBinder) { score += 5; achievements.push('Aglutinante incluido para robustez del gránulo ✓'); }

        return {
            score: Math.round(Math.min(100, score)),
            issues, achievements,
            concept: window.FORMULATION_CONCEPTS[Math.floor(Math.random() * window.FORMULATION_CONCEPTS.length)]
        };
    }
}

// ─── SCORE RING CANVAS ────────────────────────────────────────────────────
window.drawScoreRing = function(canvasId, score) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W/2, cy = H/2, r = W * 0.38;

    ctx.clearRect(0,0,W,H);

    // Track
    ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
    ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=8; ctx.stroke();

    // Score arc
    const color = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
    const end = -Math.PI/2 + (score/100) * Math.PI * 2;
    ctx.beginPath(); ctx.arc(cx,cy,r,-Math.PI/2,end);
    ctx.strokeStyle=color; ctx.lineWidth=8; ctx.lineCap='round'; ctx.stroke();
};

// ─── PIE CHART ────────────────────────────────────────────────────────────
window.drawPieChart = function(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !data.length) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W/2, cy = H/2, r = Math.min(W,H)*0.42;

    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = '#06090f'; ctx.fillRect(0,0,W,H);

    const total = data.reduce((s,d) => s + d.pct, 0);
    let angle = -Math.PI/2;

    data.forEach(d => {
        const slice = (d.pct / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.arc(cx,cy,r,angle,angle+slice);
        ctx.closePath();
        ctx.fillStyle = d.color; ctx.fill();
        ctx.strokeStyle = '#06090f'; ctx.lineWidth = 2; ctx.stroke();

        // Label if slice > 10%
        if (d.pct / total > 0.1) {
            const mid = angle + slice/2;
            const lx = cx + Math.cos(mid)*r*0.65;
            const ly = cy + Math.sin(mid)*r*0.65;
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.font = 'bold 9px IBM Plex Mono, monospace';
            ctx.textAlign='center'; ctx.textBaseline='middle';
            ctx.fillText(d.pct+'%', lx, ly);
        }
        angle += slice;
    });
};

window.DissolutionCurve = DissolutionCurve;
