/**
 * ═══════════════════════════════════════════════════
 *  HEART — Hábitos y Salud Cardíaca
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__HEART_DATA = window.__HEART_DATA || {};

window.__HEART_DATA.habitos = {
    title: 'Hábitos y Salud Cardíaca',
    icon: '💪',
    color: '#5cc8d4',
    items: [
        {
            name: 'Ejercicio y Remodelado Cardíaco',
            region: 'Ventrículos — Miocardio',
            desc: 'El ejercicio aeróbico regular produce hipertrofia fisiológica excéntrica: aumento del volumen telediastólico del VI con grosor parietal proporcionado. El volumen sistólico aumenta a 100-120 mL, permitiendo un gasto cardíaco máximo de 30-40 L/min en atletas (vs 20 L/min en sedentarios).',
            datos: [
                { l: 'Recomendación', v: '150 min/sem mod.' },
                { l: 'GC máx atleta', v: '30-40 L/min' },
                { l: 'FC reposo atleta', v: '40-60 bpm' },
                { l: '↓ Riesgo CV', v: '~30-40%' }
            ]
        },
        {
            name: 'Estrés Crónico y Cortisol',
            region: 'Eje HPA — Sistema Simpático',
            desc: 'El estrés crónico activa el eje hipotálamo-hipofisario-adrenal y el sistema simpático, elevando cortisol, catecolaminas y presión arterial. El síndrome de Takotsubo (miocardiopatía por estrés) simula un infarto con disfunción apical transitoria del VI por exceso de catecolaminas.',
            datos: [
                { l: '↑ Cortisol', v: '↑ PA, ↑ Glucosa' },
                { l: 'Takotsubo', v: 'Disfunción apical' },
                { l: 'Técnicas', v: 'Meditación, yoga' },
                { l: '↑ Riesgo CV', v: '~40% estrés crón.' }
            ]
        },
        {
            name: 'Sueño y Riesgo Cardiovascular',
            region: 'SNA — Regulación Circadiana',
            desc: 'Dormir <6 horas aumenta el riesgo de infarto un 20% y de IC un 17%. La apnea obstructiva del sueño (AOS) causa hipoxia intermitente, activación simpática y estrés oxidativo endotelial. El cambio de hora (horario de verano) se asocia a un aumento del 24% de infartos el lunes siguiente.',
            datos: [
                { l: 'Óptimo', v: '7-9 horas' },
                { l: '<6h → IAM', v: '↑20% riesgo' },
                { l: 'AOS prevalencia', v: '~25% adultos' },
                { l: 'AOS → HTA', v: '~50% asociación' }
            ]
        },
        {
            name: 'Cesación Tabáquica',
            region: 'Endotelio — Plaquetas — CO',
            desc: 'El tabaco daña el endotelio vascular, aumenta agregación plaquetaria, eleva fibrinógeno y carboxihemoglobina (reduce O₂ miocárdico). Fumar duplica el riesgo de infarto. A los 2-3 años de dejar de fumar, el riesgo CV baja a niveles similares a no fumadores. Es la intervención más coste-efectiva.',
            datos: [
                { l: 'Riesgo IAM', v: '×2 fumadores' },
                { l: 'Tras 1 año', v: '↓50% riesgo' },
                { l: 'Tras 2-3 años', v: '≈ No fumador' },
                { l: 'CO hemoglobina', v: '↓ O₂ miocárdico' }
            ]
        },
        {
            name: 'Control de Peso y Grasa Visceral',
            region: 'Adipocitos — Inflamación Sistémica',
            desc: 'La obesidad visceral (perímetro abdominal >102 cm hombres, >88 cm mujeres) es un factor de riesgo CV independiente. El tejido adiposo visceral secreta adipoquinas proinflamatorias (TNF-α, IL-6), promueve resistencia a insulina, dislipidemia aterogénica y estado protrombótico.',
            datos: [
                { l: 'Perímetro H', v: '<102 cm' },
                { l: 'Perímetro M', v: '<88 cm' },
                { l: 'IMC ideal', v: '18.5-24.9' },
                { l: 'Adipoquinas', v: 'TNF-α, IL-6' }
            ]
        },
        {
            name: 'Automonitoreo Domiciliario',
            region: 'Prevención — Detección Precoz',
            desc: 'La toma de presión arterial domiciliaria (AMPA) con dispositivo validado es más predictiva de riesgo CV que la medición en consulta. Se recomienda 2 mediciones matutinas y 2 vespertinas durante 7 días. Dispositivos wearables pueden detectar fibrilación auricular con sensibilidad del 97%.',
            datos: [
                { l: 'AMPA protocolo', v: '2+2 × 7 días' },
                { l: 'Meta PA dom.', v: '<135/85 mmHg' },
                { l: 'Wearable FA', v: '~97% sensibil.' },
                { l: 'Frecuencia', v: 'Semanal/mensual' }
            ]
        }
    ]
};

console.log('✅ Heart Data: Hábitos cargados');
