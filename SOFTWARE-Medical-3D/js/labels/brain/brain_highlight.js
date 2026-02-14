/**
 * brain_highlight.js — Highlight parts + info panel data
 */

(function waitEngine() {
    const B = window.__BRAIN3D;
    if (!B || !B.$) { requestAnimationFrame(waitEngine); return; }

    const $ = B.$;

    const partInfo = {
        all: { n: 'Cerebro Humano', s: 'Sistema Nervioso Central', d: 'Centro de control del cuerpo. Compuesto por hemisferios cerebrales, cerebelo y tronco encefálico. Procesa información sensorial, motora, cognitiva y emocional.', st: [{ l: 'Peso', v: '~1.4 kg' }, { l: 'Neuronas', v: '~86×10⁹' }, { l: 'Consumo O₂', v: '20%' }, { l: 'Lóbulos', v: '4 × hemisf.' }] },
        cerebrum: { n: 'Corteza Cerebral', s: 'Telencéfalo', d: 'Capa externa de los hemisferios. Responsable del pensamiento, percepción, lenguaje, memoria y control motor voluntario. Sus circunvoluciones aumentan la superficie.', st: [{ l: 'Espesor', v: '2-4 mm' }, { l: 'Superficie', v: '~2500 cm²' }, { l: 'Neuronas', v: '~16×10⁹' }, { l: 'Lóbulos', v: 'F, P, T, O' }] },
        cerebellum: { n: 'Cerebelo', s: 'Metencéfalo', d: 'Coordina movimientos, equilibrio, postura y aprendizaje motor. Contiene más de la mitad de las neuronas del cerebro total.', st: [{ l: 'Peso', v: '~150 g' }, { l: 'Neuronas', v: '~50×10⁹' }, { l: 'Volumen', v: '~10% total' }, { l: 'Capas', v: '3 corticales' }] },
        brainstem: { n: 'Tronco Encefálico', s: 'Mesencéfalo + Puente + Bulbo', d: 'Conecta cerebro con médula espinal. Controla funciones vitales: respiración, ritmo cardíaco, presión arterial y ciclos de sueño.', st: [{ l: 'Longitud', v: '~7.5 cm' }, { l: 'Partes', v: '3 regiones' }, { l: 'N. craneales', v: '10 de 12' }, { l: 'Función', v: 'Vital/autón.' }] }
    };

    document.querySelectorAll('.hl-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.hl-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const p = btn.dataset.part, info = partInfo[p];
            $('ipN').textContent = info.n; $('ipS').textContent = info.s; $('ipD').textContent = info.d;
            $('ipSt').innerHTML = info.st.map(s => `<div class="st-card"><div class="st-label">${s.l}</div><div class="st-val">${s.v}</div></div>`).join('');

            const parts = B.parts;
            if (parts && parts.cerebrum && parts.cerebellum && parts.brainstem) {
                [parts.cerebrum, parts.cerebellum, parts.brainstem].forEach(m => {
                    if (!m || !m.material) return;
                    const isTarget = p === 'all' || m === parts[p];
                    m.material.opacity = isTarget ? 1 : 0.15;
                    m.material.transparent = !isTarget;
                    m.material.emissiveIntensity = isTarget ? (p === 'all' ? 0.08 : 0.18) : 0.02;
                });
            }
        };
    });
})();
