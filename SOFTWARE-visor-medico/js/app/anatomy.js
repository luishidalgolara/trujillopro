// ===== ANATOMY.JS — Atlas Anatómico =====

function renderAnatomySystems() {
  const systems = [
    { icon: '🫁', name: 'Aparato Respiratorio',     id: 'respiratory'   },
    { icon: '❤️', name: 'Aparato Cardiovascular',   id: 'cardiovascular' },
    { icon: '🫀', name: 'Aparato Digestivo',         id: 'digestive'      },
    { icon: '🫘', name: 'Aparato Urinario',           id: 'urinary'        },
    { icon: '🦴', name: 'Sistema Musculoesquelético', id: 'skeletal'       },
    { icon: '🧠', name: 'Sistema Nervioso',           id: 'nervous'        },
  ];

  document.getElementById('anatomy-systems').innerHTML = systems.map(s => `
    <div class="system-card" onclick="showAnatomyDetail('${s.id}', this)">
      <div class="system-icon">${s.icon}</div>
      <div class="system-name">${s.name}</div>
    </div>
  `).join('');

  document.getElementById('anatomy-detail').innerHTML = `
    <div style="text-align:center;color:var(--text3);padding:40px">
      <div style="font-size:48px;margin-bottom:16px">☝️</div>
      <p>Selecciona un sistema anatómico para ver sus estructuras en imagen</p>
    </div>
  `;
}

const anatomyData = {
  respiratory: {
    title: 'Aparato Respiratorio en TC',
    structures: [
      { name: 'Tráquea', desc: 'Estructura aérea central que divide en los bronquios principales a nivel de la carina (T4-T5). En TC aparece como imagen hipodensa (negro) de contorno regular. Diámetro normal <21mm en hombres y <19mm en mujeres.', window: 'Ventana pulmón: C:-600 W:1500', value: 'Hipodenso (-1000 UH)' },
      { name: 'Bronquios principales', desc: 'El bronquio derecho es más vertical (25°) y corto que el izquierdo (45°), lo que explica la mayor frecuencia de aspiraciones derechas. Se visualizan como estructuras tubulares aéreas con pared visible.', window: 'Ventana pulmón: C:-600 W:1500', value: 'Lumen aéreo (-900 UH)' },
      { name: 'Parénquima pulmonar', desc: 'Tejido alveolar del pulmón. En TC aparece uniformemente oscuro por el contenido aéreo. La densidad normal es -700 a -900 UH. Aumento de densidad indica consolidación, vidrio deslustrado o fibrosis.', window: 'Ventana pulmón: C:-600 W:1500', value: '-700 a -900 UH' },
      { name: 'Cisuras pulmonares', desc: 'La cisura oblicua separa los lóbulos superiores de los inferiores en ambos pulmones. La cisura menor separa el lóbulo medio derecho del superior. Se visualizan como líneas hiperdensas en HRCT.', window: 'HRCT: C:-700 W:1500', value: 'Línea hiperdensa' },
      { name: 'Vasos pulmonares', desc: 'Las arterias pulmonares siguen a los bronquios (haz broncoarterial). Las venas drenan hacia la aurícula izquierda. El calibre disminuye hacia la periferia. Con contraste: arteria pulmonar > 29mm sugiere hipertensión.', window: 'Mediastino: C:40 W:350', value: '+250 a +350 UH (con contraste)' },
    ]
  },
  cardiovascular: {
    title: 'Aparato Cardiovascular en TC',
    structures: [
      { name: 'Corazón', desc: 'Órgano muscular que ocupa el mediastino medio. El índice cardiotorácico normal es <0.5. En TC sin contraste, la densidad miocárdica es de 45-55 UH. Con contraste, el miocardio viable realza uniformemente.', window: 'Mediastino: C:40 W:400', value: '45-55 UH sin contraste' },
      { name: 'Aorta', desc: 'La aorta ascendente tiene diámetro normal <3.7cm, la aorta torácica descendente <2.5cm. Valores >5cm en aorta torácica implican riesgo de disección. La angioTC es el gold standard para su estudio.', window: 'AngioTC: C:150 W:600', value: '>300 UH con contraste' },
      { name: 'Arteria pulmonar', desc: 'El tronco de la arteria pulmonar tiene diámetro normal <29mm. Su dilatación sugiere hipertensión pulmonar. El defecto de llenado intraluminal en angioTC define el embolismo pulmonar.', window: 'AngioTC: C:150 W:600', value: 'Fase arterial pulmonar' },
      { name: 'Venas pulmonares', desc: 'Cuatro venas pulmonares (2 derechas, 2 izquierdas) drenan en la aurícula izquierda. Su anatomía es variable. Son importantes en el mapeo pre-ablación de fibrilación auricular.', window: 'AngioTC: C:100 W:400', value: 'Fase venosa pulmonar' },
    ]
  },
  digestive: {
    title: 'Aparato Digestivo en TC',
    structures: [
      { name: 'Hígado', desc: 'El hígado ocupa el hipocondrio derecho. Densidad normal: 50-70 UH. La esteatosis hepática se define como densidad hepática <48 UH o 10 UH menor que el bazo. Volumen normal <1500cc.', window: 'Abdomen: C:60 W:350', value: '50-70 UH (sin contraste)' },
      { name: 'Páncreas', desc: 'El páncreas tiene densidad homogénea en adultos jóvenes (40-50 UH). La dilatación del conducto de Wirsung >3mm es anormal. La cabeza mide normalmente <3cm.', window: 'Abdomen: C:60 W:350', value: '40-50 UH' },
      { name: 'Bazo', desc: 'El bazo tiene densidad levemente inferior al hígado (40-60 UH). Tamaño normal <12cm en eje largo. El realce en fase arterial es heterogéneo (patrón en "arcada").', window: 'Abdomen: C:60 W:350', value: '40-60 UH' },
      { name: 'Vesícula biliar', desc: 'La vesícula biliar tiene densidad de bilis: 0-30 UH. La pared normal es <3mm. Los cálculos pueden ser hiperdensos (calcificados), isodensos o hipodensos (colesterol).', window: 'Abdomen: C:60 W:350', value: 'Bilis: 0-30 UH' },
    ]
  },
  urinary: {
    title: 'Aparato Urinario en TC',
    structures: [
      { name: 'Riñones', desc: 'Los riñones miden normalmente 10-12cm de eje longitudinal. La corteza (70-90 UH sin contraste) es más densa que la médula. En fase corticomedular, la corteza realza intensamente (>200 UH).', window: 'Nefrográfico: C:100 W:300', value: 'Corteza: 70-90 UH' },
      { name: 'Seno renal', desc: 'El seno renal contiene grasa (densidad negativa), vasos y sistema colector. La invasión del seno por tumores renales determina pT3a en la estadificación TNM.', window: 'Abdomen: C:60 W:350', value: 'Grasa: -20 a -120 UH' },
      { name: 'Uréteres', desc: 'Los uréteres son difícilmente visibles en TC sin contraste. En fase excretora, el contraste los rellena. Dilatación >7mm sugiere obstrucción.', window: 'Excretor: C:200 W:600', value: '>400 UH (fase excretora)' },
      { name: 'Vejiga urinaria', desc: 'La vejiga tiene pared fina (<3mm cuando distendida). El engrosamiento asimétrico focal orienta a neoplasia vesical.', window: 'Excretor: C:200 W:600', value: 'Orina: 0-20 UH' },
    ]
  },
  skeletal: {
    title: 'Sistema Musculoesquelético en TC',
    structures: [
      { name: 'Hueso cortical', desc: 'La cortical ósea tiene densidad muy alta (700-1900 UH). Su integridad se evalúa mejor con ventana ósea (C:350 W:1500). La lisis cortical por tumor maligno aparece como interrupción de la hiperdensidad cortical.', window: 'Ósea: C:350 W:1500', value: '700-1900 UH' },
      { name: 'Hueso trabecular', desc: 'El hueso trabecular (esponjoso) tiene densidad variable: 100-400 UH. La osteoporosis se asocia a disminución de densidad (<100 UH en vértebras). La médula ósea grasa tiene densidad negativa.', window: 'Ósea: C:350 W:1500', value: '100-400 UH' },
      { name: 'Músculo', desc: 'El músculo estriado tiene densidad de 40-80 UH en TC sin contraste. La degeneración grasa muscular (lipomatosis) aparece como áreas de baja densidad.', window: 'Partes blandas: C:60 W:400', value: '40-80 UH' },
      { name: 'Grasa subcutánea', desc: 'La grasa tiene densidad negativa (-30 a -120 UH), fácilmente distinguible de otros tejidos. La presencia de densidad grasa dentro de una lesión indica componente lipídico.', window: 'Partes blandas: C:60 W:400', value: '-30 a -120 UH' },
    ]
  },
  nervous: {
    title: 'Sistema Nervioso en TC',
    structures: [
      { name: 'Sustancia blanca', desc: 'La sustancia blanca tiene densidad de 20-30 UH en TC sin contraste. Es levemente hipodensa respecto a la sustancia gris. La leucoencefalopatía aparece como hipodensidad difusa.', window: 'Cerebro: C:35 W:80', value: '20-30 UH' },
      { name: 'Sustancia gris', desc: 'La sustancia gris (córtex, ganglios basales) tiene densidad de 35-45 UH, ligeramente hiperdensa respecto a la sustancia blanca. La diferenciación gris-blanca se pierde en edema cerebral difuso.', window: 'Cerebro: C:35 W:80', value: '35-45 UH' },
      { name: 'LCR', desc: 'El líquido cefalorraquídeo (LCR) tiene densidad de 0-10 UH, similar al agua. Rellena los ventrículos y cisternas subaracnoideas. La sangre en LCR (hemorragia subaracnoidea) aumenta su densidad a 40-60 UH.', window: 'Cerebro: C:35 W:80', value: '0-10 UH' },
      { name: 'Hemorragia aguda', desc: 'La hemorragia intracraneal aguda es hiperdensa en TC sin contraste (50-80 UH) por la proteína de la hemoglobina. La TC sin contraste es el gold standard para su diagnóstico. Se vuelve isodensa a los 7-10 días.', window: 'Cerebro: C:35 W:80', value: '50-80 UH (aguda)' },
    ]
  }
};

function showAnatomyDetail(id, card) {
  document.querySelectorAll('.system-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  const data = anatomyData[id];
  if (!data) return;
  document.getElementById('anatomy-detail').innerHTML = `
    <h3 style="font-family:var(--font-display);font-size:22px;font-weight:800;margin-bottom:24px">${data.title}</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px">
      ${data.structures.map(s => `
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:20px">
          <div style="font-weight:700;font-size:15px;margin-bottom:8px;color:var(--accent)">${s.name}</div>
          <div style="font-size:13px;color:var(--text2);line-height:1.7;margin-bottom:12px">${s.desc}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <span style="font-family:var(--font-mono);font-size:10px;background:var(--surface2);border:1px solid var(--border);padding:2px 8px;border-radius:4px;color:var(--text3)">${s.window}</span>
            <span style="font-family:var(--font-mono);font-size:10px;background:var(--accent3);border:1px solid var(--accent);padding:2px 8px;border-radius:4px;color:var(--accent)">${s.value}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
