/* Propiedades Periódicas - Interactive Charts */
const DATA = {
    radius: {
        labels:["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca"],
        values:[53,31,167,112,87,77,75,73,71,38,190,145,125,117,110,104,99,71,243,194],
        color:'#00e5a0',caption:'Radio atómico (pm) vs número atómico. Aumenta bajando en un grupo y disminuye avanzando en un período.'
    },
    en: {
        labels:["H","Li","Be","B","C","N","O","F","Na","Mg","Al","Si","P","S","Cl","K","Ca","Br","I"],
        values:[2.20,0.98,1.57,2.04,2.55,3.04,3.44,3.98,0.93,1.31,1.61,1.90,2.19,2.58,3.16,0.82,1.00,2.96,2.66],
        color:'#5b8dee',caption:'Electronegatividad (escala de Pauling). Aumenta hacia la derecha y hacia arriba. F es el más electronegativo (3.98).'
    },
    ie: {
        labels:["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca"],
        values:[1312,2372,520,900,801,1086,1402,1314,1681,2081,496,738,578,786,1012,1000,1251,1521,419,590],
        color:'#e056a0',caption:'Primera energía de ionización (kJ/mol). Los gases nobles tienen los valores más altos en cada período.'
    },
    ea: {
        labels:["H","Li","B","C","N","O","F","Na","Al","Si","P","S","Cl","K","Br","I"],
        values:[-73,-60,-27,-122,0,-141,-328,-53,-42,-134,-72,-200,-349,-48,-325,-295],
        color:'#f0a030',caption:'Afinidad electrónica (kJ/mol). Valores más negativos = mayor tendencia a ganar electrones. Los halógenos tienen los valores más negativos.'
    }
};

let currentProp = 'radius';
let chart = null;

document.addEventListener('DOMContentLoaded', () => {
    drawChart('radius');
    document.querySelectorAll('.chart-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.chart-tab').forEach(t=>t.classList.remove('active'));
            tab.classList.add('active');
            drawChart(tab.dataset.prop);
        });
    });
});

function drawChart(prop) {
    const canvas = document.getElementById('propChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const d = DATA[prop];
    document.getElementById('chartCaption').textContent = d.caption;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 400 * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width, H = 400;

    ctx.clearRect(0,0,W,H);

    const padding = {top:30,right:30,bottom:50,left:60};
    const chartW = W - padding.left - padding.right;
    const chartH = H - padding.top - padding.bottom;

    const vals = d.values;
    const maxV = Math.max(...vals) * 1.1;
    const minV = Math.min(...vals.filter(v=>v!==0), 0) * (Math.min(...vals)<0 ? 1.1 : 0);

    const range = maxV - minV;
    const barW = Math.min(chartW / vals.length * 0.7, 30);
    const gap = chartW / vals.length;

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding.top + (chartH * i / 5);
        ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(W-padding.right, y); ctx.stroke();
        const val = maxV - (range * i / 5);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '11px JetBrains Mono';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(val), padding.left - 8, y + 4);
    }

    // Zero line if needed
    if (minV < 0) {
        const zeroY = padding.top + chartH * (maxV / range);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.setLineDash([4,4]);
        ctx.beginPath(); ctx.moveTo(padding.left, zeroY); ctx.lineTo(W-padding.right, zeroY); ctx.stroke();
        ctx.setLineDash([]);
    }

    // Bars with animation
    vals.forEach((v, i) => {
        const x = padding.left + i * gap + (gap - barW) / 2;
        const barH = (v - minV) / range * chartH;
        const y = padding.top + chartH - barH;

        // Bar
        const grad = ctx.createLinearGradient(x, y, x, padding.top + chartH);
        grad.addColorStop(0, d.color);
        grad.addColorStop(1, d.color + '33');
        ctx.fillStyle = grad;
        ctx.beginPath();
        const r = Math.min(barW/2, 4);
        ctx.moveTo(x+r, y); ctx.lineTo(x+barW-r, y);
        ctx.quadraticCurveTo(x+barW, y, x+barW, y+r);
        ctx.lineTo(x+barW, padding.top+chartH);
        ctx.lineTo(x, padding.top+chartH);
        ctx.lineTo(x, y+r);
        ctx.quadraticCurveTo(x, y, x+r, y);
        ctx.fill();

        // Label
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '10px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText(d.labels[i], x + barW/2, padding.top + chartH + 18);

        // Value on top
        ctx.fillStyle = d.color;
        ctx.font = 'bold 9px JetBrains Mono';
        ctx.fillText(v, x + barW/2, y - 6);
    });
}

window.addEventListener('resize', () => drawChart(document.querySelector('.chart-tab.active').dataset.prop));
