/**
 * ═══════════════════════════════════════════════════
 *  ÉCORCHÉ — Anatomía Profunda
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__ECORCHE_DATA = window.__ECORCHE_DATA || {};

window.__ECORCHE_DATA.anatomia = {
    title: 'Anatomía Profunda',
    icon: '🔬',
    color: '#a78bfa',
    items: [
        {
            name: 'Unidad Motora',
            region: 'Motoneurona α → Fibras Musculares',
            desc: 'Unidad funcional mínima: una motoneurona alfa y todas las fibras musculares que inerva. La ratio de inervación varía: músculos finos del ojo tienen ~5 fibras/motoneurona (control preciso), mientras el cuádriceps tiene ~1000 fibras/motoneurona (fuerza bruta). El reclutamiento sigue el principio del tamaño de Henneman: primero unidades pequeñas (tipo I), luego grandes (tipo II).',
            datos: [
                { l: 'Ratio ojo', v: '~5 fibras/MN' },
                { l: 'Ratio cuádriceps', v: '~1000 fibras/MN' },
                { l: 'Reclutamiento', v: 'Principio del tamaño' },
                { l: 'Orden', v: 'Tipo I → II' }
            ]
        },
        {
            name: 'Sarcómero',
            region: 'Miofibrilla — Unidad Contráctil',
            desc: 'Unidad contráctil mínima (~2.2 μm en reposo), delimitada por líneas Z. Contiene filamentos gruesos de miosina (banda A, ~1.6 μm) intercalados con filamentos finos de actina (banda I). La contracción se produce por el deslizamiento de actina sobre miosina mediante puentes cruzados que consumen ATP. La titina (proteína más grande del cuerpo humano) actúa como resorte molecular.',
            datos: [
                { l: 'Longitud reposo', v: '~2.2 μm' },
                { l: 'Filamento grueso', v: 'Miosina (~1.6 μm)' },
                { l: 'Filamento fino', v: 'Actina (~1.0 μm)' },
                { l: 'Resorte', v: 'Titina (mayor proteína)' }
            ]
        },
        {
            name: 'Fascia Profunda',
            region: 'Envolturas Musculares — Compartimentos',
            desc: 'Lámina de tejido conectivo denso que envuelve los músculos y los organiza en compartimentos. En el miembro inferior la fascia lata forma el compartimento anterior, medial, posterior del muslo y los 4 compartimentos de la pierna. Los tabiques intermusculares conectan la fascia con el periostio. Los compartimentos cerrados son clínicamente relevantes por el síndrome compartimental.',
            datos: [
                { l: 'Muslo', v: '3 compartimentos' },
                { l: 'Pierna', v: '4 compartimentos' },
                { l: 'Componente', v: 'Colágeno tipo I y III' },
                { l: 'Clínica', v: 'Sínd. compartimental' }
            ]
        },
        {
            name: 'Huso Neuromuscular',
            region: 'Fibras Intrafusales — Propiocepción',
            desc: 'Receptor sensorial encapsulado dentro del vientre muscular que detecta cambios en longitud y velocidad de estiramiento. Contiene 3-12 fibras intrafusales (bolsa nuclear y cadena nuclear) inervadas por fibras aferentes Ia (primarias, dinámicas) y II (secundarias, estáticas). La motoneurona gamma ajusta la sensibilidad del huso durante la contracción (coactivación alfa-gamma).',
            datos: [
                { l: 'Fibras', v: '3-12 intrafusales' },
                { l: 'Aferente Ia', v: 'Dinámica (velocidad)' },
                { l: 'Aferente II', v: 'Estática (longitud)' },
                { l: 'Regulación', v: 'Motoneurona γ' }
            ]
        },
        {
            name: 'Órgano Tendinoso de Golgi',
            region: 'Unión Miotendinosa — Tensión',
            desc: 'Receptor proprioceptivo en serie con las fibras musculares, localizado en la unión miotendinosa. Detecta tensión (fuerza de contracción) mediante fibras aferentes Ib. Cuando la tensión excede un umbral, activa un reflejo inhibitorio (inhibición autógena) vía interneuronas inhibitorias que relajan el músculo, protegiéndolo de roturas. Umbral: ~70% de la fuerza máxima voluntaria.',
            datos: [
                { l: 'Aferente', v: 'Fibra Ib' },
                { l: 'Detecta', v: 'Tensión (fuerza)' },
                { l: 'Reflejo', v: 'Inhibición autógena' },
                { l: 'Umbral', v: '~70% MVC' }
            ]
        },
        {
            name: 'Placa Motora (Unión Neuromuscular)',
            region: 'Terminal Axónica → Sarcolema',
            desc: 'Sinapsis especializada entre la terminal axónica de la motoneurona α y el sarcolema de la fibra muscular. La acetilcolina (ACh) se libera de ~300 vesículas por impulso al hendidura sináptica (~50 nm). Se une a receptores nicotínicos (nAChR) generando un potencial de placa motora (EPP) que supera el umbral y desencadena el potencial de acción muscular. La acetilcolinesterasa degrada ACh en ~1 ms.',
            datos: [
                { l: 'Neurotransmisor', v: 'Acetilcolina' },
                { l: 'Vesículas/impulso', v: '~300' },
                { l: 'Hendidura', v: '~50 nm' },
                { l: 'Degradación', v: 'AChE (~1 ms)' }
            ]
        },
        {
            name: 'Retículo Sarcoplásmico',
            region: 'Sistema de Membranas Intracelulares',
            desc: 'Red de membranas que almacena Ca²⁺ (~10⁻³ M en su interior vs ~10⁻⁷ M en el sarcoplasma en reposo). El potencial de acción viaja por los túbulos T, activa receptores de dihidropiridina (DHPR) que abren los canales de rianodina (RyR1) liberando Ca²⁺ masivamente. El Ca²⁺ se une a troponina C, expone sitios de unión actina-miosina. La SERCA bombea Ca²⁺ de vuelta para la relajación.',
            datos: [
                { l: 'Ca²⁺ interno RS', v: '~10⁻³ M' },
                { l: 'Ca²⁺ sarcoplasma', v: '~10⁻⁷ M (reposo)' },
                { l: 'Canal liberación', v: 'Rianodina (RyR1)' },
                { l: 'Bomba recaptura', v: 'SERCA' }
            ]
        },
        {
            name: 'Vascularización Muscular',
            region: 'Arteriolas → Capilares → Vénulas',
            desc: 'Cada fibra muscular está rodeada por 3-4 capilares. En reposo solo ~5% de los capilares musculares están perfundidos; durante el ejercicio máximo se abren todos (hiperemia activa), aumentando el flujo sanguíneo muscular de ~3-4 mL/min/100g a ~80-100 mL/min/100g (×25). El óxido nítrico (NO) y los metabolitos locales (K⁺, adenosina, CO₂) median la vasodilatación.',
            datos: [
                { l: 'Capilares/fibra', v: '3-4' },
                { l: 'Flujo reposo', v: '~3-4 mL/min/100g' },
                { l: 'Flujo ejercicio', v: '~80-100 mL/min/100g' },
                { l: 'Aumento', v: '×25 (hiperemia)' }
            ]
        }
    ]
};

console.log('✅ Écorché Data: Anatomía cargada');
