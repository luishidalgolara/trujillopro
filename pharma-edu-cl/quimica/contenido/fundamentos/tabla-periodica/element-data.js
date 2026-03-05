/* ============================================
   ELEMENT DATA COMPLETO — PharmaLab Chile
   Datos extendidos de los 118 elementos
   ============================================ */

const ELEMENT_DATA = {
  1:  { en: 2.20, radius: 53, state: "Gas", melt: -259.16, boil: -252.87, shells: [1], block: "s" },
  2:  { en: null, radius: 31, state: "Gas", melt: -272.2, boil: -268.93, shells: [2], block: "s" },
  3:  { en: 0.98, radius: 167, state: "Sólido", melt: 180.54, boil: 1342, shells: [2,1], block: "s" },
  4:  { en: 1.57, radius: 112, state: "Sólido", melt: 1287, boil: 2470, shells: [2,2], block: "s" },
  5:  { en: 2.04, radius: 87, state: "Sólido", melt: 2075, boil: 4000, shells: [2,3], block: "p" },
  6:  { en: 2.55, radius: 77, state: "Sólido", melt: 3550, boil: 4027, shells: [2,4], block: "p" },
  7:  { en: 3.04, radius: 75, state: "Gas", melt: -210.0, boil: -195.79, shells: [2,5], block: "p" },
  8:  { en: 3.44, radius: 73, state: "Gas", melt: -218.79, boil: -182.96, shells: [2,6], block: "p" },
  9:  { en: 3.98, radius: 71, state: "Gas", melt: -219.67, boil: -188.11, shells: [2,7], block: "p" },
  10: { en: null, radius: 69, state: "Gas", melt: -248.59, boil: -246.08, shells: [2,8], block: "p" },
  11: { en: 0.93, radius: 190, state: "Sólido", melt: 97.72, boil: 883, shells: [2,8,1], block: "s" },
  12: { en: 1.31, radius: 145, state: "Sólido", melt: 650, boil: 1090, shells: [2,8,2], block: "s" },
  13: { en: 1.61, radius: 118, state: "Sólido", melt: 660.32, boil: 2519, shells: [2,8,3], block: "p" },
  14: { en: 1.90, radius: 111, state: "Sólido", melt: 1414, boil: 3265, shells: [2,8,4], block: "p" },
  15: { en: 2.19, radius: 106, state: "Sólido", melt: 44.15, boil: 280.5, shells: [2,8,5], block: "p" },
  16: { en: 2.58, radius: 102, state: "Sólido", melt: 115.21, boil: 444.6, shells: [2,8,6], block: "p" },
  17: { en: 3.16, radius: 99, state: "Gas", melt: -101.5, boil: -34.04, shells: [2,8,7], block: "p" },
  18: { en: null, radius: 97, state: "Gas", melt: -189.34, boil: -185.85, shells: [2,8,8], block: "p" },
  19: { en: 0.82, radius: 243, state: "Sólido", melt: 63.38, boil: 759, shells: [2,8,8,1], block: "s" },
  20: { en: 1.00, radius: 194, state: "Sólido", melt: 842, boil: 1484, shells: [2,8,8,2], block: "s" },
  21: { en: 1.36, radius: 184, state: "Sólido", melt: 1541, boil: 2836, shells: [2,8,9,2], block: "d" },
  22: { en: 1.54, radius: 176, state: "Sólido", melt: 1668, boil: 3287, shells: [2,8,10,2], block: "d" },
  23: { en: 1.63, radius: 171, state: "Sólido", melt: 1910, boil: 3407, shells: [2,8,11,2], block: "d" },
  24: { en: 1.66, radius: 166, state: "Sólido", melt: 1907, boil: 2671, shells: [2,8,13,1], block: "d" },
  25: { en: 1.55, radius: 161, state: "Sólido", melt: 1246, boil: 2061, shells: [2,8,13,2], block: "d" },
  26: { en: 1.83, radius: 156, state: "Sólido", melt: 1538, boil: 2862, shells: [2,8,14,2], block: "d" },
  27: { en: 1.88, radius: 152, state: "Sólido", melt: 1495, boil: 2927, shells: [2,8,15,2], block: "d" },
  28: { en: 1.91, radius: 149, state: "Sólido", melt: 1455, boil: 2913, shells: [2,8,16,2], block: "d" },
  29: { en: 1.90, radius: 145, state: "Sólido", melt: 1084.62, boil: 2562, shells: [2,8,18,1], block: "d" },
  30: { en: 1.65, radius: 142, state: "Sólido", melt: 419.53, boil: 907, shells: [2,8,18,2], block: "d" },
  31: { en: 1.81, radius: 136, state: "Sólido", melt: 29.76, boil: 2204, shells: [2,8,18,3], block: "p" },
  32: { en: 2.01, radius: 125, state: "Sólido", melt: 938.25, boil: 2833, shells: [2,8,18,4], block: "p" },
  33: { en: 2.18, radius: 114, state: "Sólido", melt: 817, boil: 614, shells: [2,8,18,5], block: "p" },
  34: { en: 2.55, radius: 103, state: "Sólido", melt: 221, boil: 685, shells: [2,8,18,6], block: "p" },
  35: { en: 2.96, radius: 94, state: "Líquido", melt: -7.2, boil: 58.8, shells: [2,8,18,7], block: "p" },
  36: { en: 3.00, radius: 88, state: "Gas", melt: -157.36, boil: -153.22, shells: [2,8,18,8], block: "p" },
  37: { en: 0.82, radius: 265, state: "Sólido", melt: 39.31, boil: 688, shells: [2,8,18,8,1], block: "s" },
  38: { en: 0.95, radius: 219, state: "Sólido", melt: 777, boil: 1382, shells: [2,8,18,8,2], block: "s" },
  39: { en: 1.22, radius: 212, state: "Sólido", melt: 1526, boil: 3345, shells: [2,8,18,9,2], block: "d" },
  40: { en: 1.33, radius: 206, state: "Sólido", melt: 1855, boil: 4409, shells: [2,8,18,10,2], block: "d" },
  41: { en: 1.60, radius: 198, state: "Sólido", melt: 2477, boil: 4744, shells: [2,8,18,12,1], block: "d" },
  42: { en: 2.16, radius: 190, state: "Sólido", melt: 2623, boil: 4639, shells: [2,8,18,13,1], block: "d" },
  43: { en: 1.90, radius: 183, state: "Sólido", melt: 2157, boil: 4265, shells: [2,8,18,13,2], block: "d" },
  44: { en: 2.20, radius: 178, state: "Sólido", melt: 2334, boil: 4150, shells: [2,8,18,15,1], block: "d" },
  45: { en: 2.28, radius: 173, state: "Sólido", melt: 1964, boil: 3695, shells: [2,8,18,16,1], block: "d" },
  46: { en: 2.20, radius: 169, state: "Sólido", melt: 1554.9, boil: 2963, shells: [2,8,18,18,0], block: "d" },
  47: { en: 1.93, radius: 165, state: "Sólido", melt: 961.78, boil: 2162, shells: [2,8,18,18,1], block: "d" },
  48: { en: 1.69, radius: 161, state: "Sólido", melt: 321.07, boil: 767, shells: [2,8,18,18,2], block: "d" },
  49: { en: 1.78, radius: 156, state: "Sólido", melt: 156.6, boil: 2072, shells: [2,8,18,18,3], block: "p" },
  50: { en: 1.96, radius: 145, state: "Sólido", melt: 231.93, boil: 2602, shells: [2,8,18,18,4], block: "p" },
  51: { en: 2.05, radius: 133, state: "Sólido", melt: 630.63, boil: 1587, shells: [2,8,18,18,5], block: "p" },
  52: { en: 2.10, radius: 123, state: "Sólido", melt: 449.51, boil: 988, shells: [2,8,18,18,6], block: "p" },
  53: { en: 2.66, radius: 115, state: "Sólido", melt: 113.7, boil: 184.3, shells: [2,8,18,18,7], block: "p" },
  54: { en: 2.60, radius: 108, state: "Gas", melt: -111.75, boil: -108.1, shells: [2,8,18,18,8], block: "p" },
  55: { en: 0.79, radius: 298, state: "Sólido", melt: 28.44, boil: 671, shells: [2,8,18,18,8,1], block: "s" },
  56: { en: 0.89, radius: 253, state: "Sólido", melt: 727, boil: 1870, shells: [2,8,18,18,8,2], block: "s" },
  57: { en: 1.10, radius: 195, state: "Sólido", melt: 920, boil: 3464, shells: [2,8,18,18,9,2], block: "f" },
  58: { en: 1.12, radius: 185, state: "Sólido", melt: 798, boil: 3443, shells: [2,8,18,19,9,2], block: "f" },
  59: { en: 1.13, radius: 247, state: "Sólido", melt: 931, boil: 3520, shells: [2,8,18,21,8,2], block: "f" },
  60: { en: 1.14, radius: 206, state: "Sólido", melt: 1021, boil: 3074, shells: [2,8,18,22,8,2], block: "f" },
  61: { en: 1.13, radius: 205, state: "Sólido", melt: 1042, boil: 3000, shells: [2,8,18,23,8,2], block: "f" },
  62: { en: 1.17, radius: 238, state: "Sólido", melt: 1074, boil: 1794, shells: [2,8,18,24,8,2], block: "f" },
  63: { en: 1.20, radius: 231, state: "Sólido", melt: 822, boil: 1529, shells: [2,8,18,25,8,2], block: "f" },
  64: { en: 1.20, radius: 233, state: "Sólido", melt: 1313, boil: 3273, shells: [2,8,18,25,9,2], block: "f" },
  65: { en: 1.10, radius: 225, state: "Sólido", melt: 1356, boil: 3230, shells: [2,8,18,27,8,2], block: "f" },
  66: { en: 1.22, radius: 228, state: "Sólido", melt: 1412, boil: 2567, shells: [2,8,18,28,8,2], block: "f" },
  67: { en: 1.23, radius: 226, state: "Sólido", melt: 1474, boil: 2700, shells: [2,8,18,29,8,2], block: "f" },
  68: { en: 1.24, radius: 226, state: "Sólido", melt: 1529, boil: 2868, shells: [2,8,18,30,8,2], block: "f" },
  69: { en: 1.25, radius: 222, state: "Sólido", melt: 1545, boil: 1950, shells: [2,8,18,31,8,2], block: "f" },
  70: { en: 1.10, radius: 222, state: "Sólido", melt: 819, boil: 1196, shells: [2,8,18,32,8,2], block: "f" },
  71: { en: 1.27, radius: 217, state: "Sólido", melt: 1663, boil: 3402, shells: [2,8,18,32,9,2], block: "d" },
  72: { en: 1.30, radius: 208, state: "Sólido", melt: 2233, boil: 4603, shells: [2,8,18,32,10,2], block: "d" },
  73: { en: 1.50, radius: 200, state: "Sólido", melt: 3017, boil: 5458, shells: [2,8,18,32,11,2], block: "d" },
  74: { en: 2.36, radius: 193, state: "Sólido", melt: 3422, boil: 5555, shells: [2,8,18,32,12,2], block: "d" },
  75: { en: 1.90, radius: 188, state: "Sólido", melt: 3186, boil: 5596, shells: [2,8,18,32,13,2], block: "d" },
  76: { en: 2.20, radius: 185, state: "Sólido", melt: 3033, boil: 5012, shells: [2,8,18,32,14,2], block: "d" },
  77: { en: 2.20, radius: 180, state: "Sólido", melt: 2446, boil: 4428, shells: [2,8,18,32,15,2], block: "d" },
  78: { en: 2.28, radius: 177, state: "Sólido", melt: 1768.3, boil: 3825, shells: [2,8,18,32,17,1], block: "d" },
  79: { en: 2.54, radius: 174, state: "Sólido", melt: 1064.18, boil: 2856, shells: [2,8,18,32,18,1], block: "d" },
  80: { en: 2.00, radius: 171, state: "Líquido", melt: -38.83, boil: 356.73, shells: [2,8,18,32,18,2], block: "d" },
  81: { en: 1.62, radius: 156, state: "Sólido", melt: 304, boil: 1473, shells: [2,8,18,32,18,3], block: "p" },
  82: { en: 2.33, radius: 154, state: "Sólido", melt: 327.46, boil: 1749, shells: [2,8,18,32,18,4], block: "p" },
  83: { en: 2.02, radius: 143, state: "Sólido", melt: 271.4, boil: 1564, shells: [2,8,18,32,18,5], block: "p" },
  84: { en: 2.00, radius: 135, state: "Sólido", melt: 254, boil: 962, shells: [2,8,18,32,18,6], block: "p" },
  85: { en: 2.20, radius: 127, state: "Sólido", melt: 302, boil: 337, shells: [2,8,18,32,18,7], block: "p" },
  86: { en: null, radius: 120, state: "Gas", melt: -71, boil: -61.7, shells: [2,8,18,32,18,8], block: "p" },
  87: { en: 0.70, radius: 348, state: "Sólido", melt: 27, boil: 677, shells: [2,8,18,32,18,8,1], block: "s" },
  88: { en: 0.90, radius: 283, state: "Sólido", melt: 700, boil: 1737, shells: [2,8,18,32,18,8,2], block: "s" },
  89: { en: 1.10, radius: 260, state: "Sólido", melt: 1050, boil: 3198, shells: [2,8,18,32,18,9,2], block: "f" },
  90: { en: 1.30, radius: 175, state: "Sólido", melt: 1750, boil: 4788, shells: [2,8,18,32,18,10,2], block: "f" },
  91: { en: 1.50, radius: 169, state: "Sólido", melt: 1572, boil: 4027, shells: [2,8,18,32,20,9,2], block: "f" },
  92: { en: 1.38, radius: 170, state: "Sólido", melt: 1135, boil: 4131, shells: [2,8,18,32,21,9,2], block: "f" },
  93: { en: 1.36, radius: 171, state: "Sólido", melt: 644, boil: 3902, shells: [2,8,18,32,22,9,2], block: "f" },
  94: { en: 1.28, radius: 172, state: "Sólido", melt: 640, boil: 3228, shells: [2,8,18,32,24,8,2], block: "f" },
  95: { en: 1.30, radius: 166, state: "Sólido", melt: 1176, boil: 2011, shells: [2,8,18,32,25,8,2], block: "f" },
  96: { en: 1.30, radius: 166, state: "Sólido", melt: 1345, boil: 3110, shells: [2,8,18,32,25,9,2], block: "f" },
  97: { en: 1.30, radius: 166, state: "Sólido", melt: 1050, boil: 2627, shells: [2,8,18,32,27,8,2], block: "f" },
  98: { en: 1.30, radius: 168, state: "Sólido", melt: 900, boil: 1472, shells: [2,8,18,32,28,8,2], block: "f" },
  99: { en: 1.30, radius: 165, state: "Sólido", melt: 860, boil: null, shells: [2,8,18,32,29,8,2], block: "f" },
  100:{ en: 1.30, radius: 167, state: "Sólido", melt: 1527, boil: null, shells: [2,8,18,32,30,8,2], block: "f" },
  101:{ en: 1.30, radius: 173, state: "Sólido", melt: 827, boil: null, shells: [2,8,18,32,31,8,2], block: "f" },
  102:{ en: 1.30, radius: 176, state: "Sólido", melt: 827, boil: null, shells: [2,8,18,32,32,8,2], block: "f" },
  103:{ en: 1.30, radius: 161, state: "Sólido", melt: 1627, boil: null, shells: [2,8,18,32,32,9,2], block: "d" },
  104:{ en: null, radius: 157, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,10,2], block: "d" },
  105:{ en: null, radius: 149, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,11,2], block: "d" },
  106:{ en: null, radius: 143, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,12,2], block: "d" },
  107:{ en: null, radius: 141, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,13,2], block: "d" },
  108:{ en: null, radius: 134, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,14,2], block: "d" },
  109:{ en: null, radius: 129, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,15,2], block: "d" },
  110:{ en: null, radius: 128, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,16,2], block: "d" },
  111:{ en: null, radius: 121, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,17,2], block: "d" },
  112:{ en: null, radius: 122, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,18,2], block: "d" },
  113:{ en: null, radius: 136, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,18,3], block: "p" },
  114:{ en: null, radius: 143, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,18,4], block: "p" },
  115:{ en: null, radius: 162, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,18,5], block: "p" },
  116:{ en: null, radius: 175, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,18,6], block: "p" },
  117:{ en: null, radius: 165, state: "Sólido", melt: null, boil: null, shells: [2,8,18,32,32,18,7], block: "p" },
  118:{ en: null, radius: 152, state: "Gas", melt: null, boil: null, shells: [2,8,18,32,32,18,8], block: "p" }
};
window.ELEMENT_DATA = ELEMENT_DATA;

/* ── Auto-fill detail panel using MutationObserver ── */
(function() {
  function tryInit() {
    var panel = document.getElementById('elementDetail');
    if (!panel) return setTimeout(tryInit, 200);

    new MutationObserver(function() {
      if (!panel.classList.contains('visible')) return;
      var z = parseInt(document.getElementById('detailNumber').textContent);
      if (!z || !ELEMENT_DATA[z]) return;
      var d = ELEMENT_DATA[z];
      document.getElementById('detailEN').textContent = d.en !== null ? d.en.toFixed(2) : '—';
      document.getElementById('detailRadius').textContent = d.radius ? d.radius + ' pm' : '—';
      document.getElementById('detailState').textContent = d.state || '—';
      document.getElementById('detailMelt').textContent = d.melt !== null ? d.melt + ' °C' : '—';
      document.getElementById('detailBoil').textContent = d.boil !== null ? d.boil + ' °C' : '—';

      // Inject 3D button if not present
      if (!panel.querySelector('.btn-3d-electron')) {
        var btn = document.createElement('button');
        btn.className = 'btn-3d-electron';
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg> Ver Distribución Electrónica 3D';
        btn.addEventListener('click', function() {
          if (window.openElectron3D) window.openElectron3D(z);
        });
        var pharma = panel.querySelector('.detail-pharma');
        if (pharma) pharma.after(btn);
        else panel.querySelector('.detail-body').appendChild(btn);
      } else {
        // Update existing button's click handler with new Z
        var oldBtn = panel.querySelector('.btn-3d-electron');
        var newBtn = oldBtn.cloneNode(true);
        newBtn.addEventListener('click', function() {
          if (window.openElectron3D) window.openElectron3D(z);
        });
        oldBtn.parentNode.replaceChild(newBtn, oldBtn);
      }
    }).observe(panel, { attributes: true, attributeFilter: ['class'] });
  }
  tryInit();
})();