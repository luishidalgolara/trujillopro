/* ============================================
   TABLA PERIÓDICA INTERACTIVA - PharmaLab Chile
   ============================================ */

// Periodic table layout: [z, symbol, name, mass, category, row, col, config, pharma]
const E = [
[1,"H","Hidrógeno",1.008,"nonmetal",1,1,"1s¹","Base de toda molécula orgánica. Los enlaces H determinan interacciones fármaco-receptor."],
[2,"He","Helio",4.003,"noble",1,18,"1s²","Gas portador en cromatografía gaseosa para control de calidad."],
[3,"Li","Litio",6.941,"alkali",2,1,"[He]2s¹","Carbonato de litio: tratamiento del trastorno bipolar."],
[4,"Be","Berilio",9.012,"alkaline",2,2,"[He]2s²","Tóxico. Regulado por ISP en límites de exposición."],
[5,"B","Boro",10.81,"metalloid",2,13,"[He]2s²2p¹","Ácido bórico: antiséptico tópico."],
[6,"C","Carbono",12.011,"nonmetal",2,14,"[He]2s²2p²","Esqueleto de todos los principios activos orgánicos."],
[7,"N","Nitrógeno",14.007,"nonmetal",2,15,"[He]2s²2p³","Aminas y heterociclos en la mayoría de fármacos."],
[8,"O","Oxígeno",15.999,"nonmetal",2,16,"[He]2s²2p⁴","Grupos -OH mejoran solubilidad acuosa de medicamentos."],
[9,"F","Flúor",18.998,"halogen",2,17,"[He]2s²2p⁵","Fluoración mejora estabilidad metabólica. Presente en fluoxetina, ciprofloxacino."],
[10,"Ne","Neón",20.180,"noble",2,18,"[He]2s²2p⁶","Referencia de estabilidad electrónica (octeto)."],
[11,"Na","Sodio",22.990,"alkali",3,1,"[Ne]3s¹","NaCl: vehículo farmacéutico más usado. Sales sódicas mejoran solubilidad."],
[12,"Mg","Magnesio",24.305,"alkaline",3,2,"[Ne]3s²","Mg(OH)₂: antiácido. MgSO₄: laxante y tocolítico."],
[13,"Al","Aluminio",26.982,"postmetal",3,13,"[Ne]3s²3p¹","Al(OH)₃: antiácido. Sales de Al: adyuvantes en vacunas."],
[14,"Si","Silicio",28.086,"metalloid",3,14,"[Ne]3s²3p²","SiO₂ coloidal: excipiente deslizante en comprimidos."],
[15,"P","Fósforo",30.974,"nonmetal",3,15,"[Ne]3s²3p³","Componente de ATP y ADN. Profármacos fosforilados."],
[16,"S","Azufre",32.065,"nonmetal",3,16,"[Ne]3s²3p⁴","En penicilinas, cefalosporinas, sulfonamidas. Puentes disulfuro."],
[17,"Cl","Cloro",35.453,"halogen",3,17,"[Ne]3s²3p⁵","Sales clorhidrato: forma más común de fármacos."],
[18,"Ar","Argón",39.948,"noble",3,18,"[Ne]3s²3p⁶","Atmósfera inerte en manufactura farmacéutica."],
[19,"K","Potasio",39.098,"alkali",4,1,"[Ar]4s¹","KCl: reposición electrolítica. Regula potencial de membrana."],
[20,"Ca","Calcio",40.078,"alkaline",4,2,"[Ar]4s²","CaCO₃: suplemento. Bloqueadores de Ca²⁺: antihipertensivos."],
[21,"Sc","Escandio",44.956,"transition",4,3,"[Ar]3d¹4s²","Investigación en biomateriales."],
[22,"Ti","Titanio",47.867,"transition",4,4,"[Ar]3d²4s²","TiO₂: colorante blanco en comprimidos y cápsulas."],
[23,"V","Vanadio",50.942,"transition",4,5,"[Ar]3d³4s²","Potencial antidiabético (mimetiza insulina)."],
[24,"Cr","Cromo",51.996,"transition",4,6,"[Ar]3d⁵4s¹","Cr(III): oligoelemento. Config. anómala d⁵."],
[25,"Mn","Manganeso",54.938,"transition",4,7,"[Ar]3d⁵4s²","Cofactor de SOD. Oligoelemento en suplementos."],
[26,"Fe","Hierro",55.845,"transition",4,8,"[Ar]3d⁶4s²","Sulfato ferroso: tratamiento de anemia ferropénica, muy prevalente en Chile."],
[27,"Co","Cobalto",58.933,"transition",4,9,"[Ar]3d⁷4s²","Vitamina B12 (cobalamina). ⁶⁰Co en radioterapia."],
[28,"Ni","Níquel",58.693,"transition",4,10,"[Ar]3d⁸4s²","Catalizador en hidrogenación. Alérgeno controlado."],
[29,"Cu","Cobre",63.546,"transition",4,11,"[Ar]3d¹⁰4s¹","Cofactor enzimático. Config. anómala d¹⁰."],
[30,"Zn","Zinc",65.38,"transition",4,12,"[Ar]3d¹⁰4s²","Suplemento esencial. Cofactor de >300 enzimas."],
[31,"Ga","Galio",69.723,"postmetal",4,13,"[Ar]3d¹⁰4s²4p¹","⁶⁷Ga en gammagrafía diagnóstica."],
[32,"Ge","Germanio",72.64,"metalloid",4,14,"[Ar]3d¹⁰4s²4p²","Investigación anticancerígena."],
[33,"As","Arsénico",74.922,"metalloid",4,15,"[Ar]3d¹⁰4s²4p³","As₂O₃: leucemia promielocítica aguda."],
[34,"Se","Selenio",78.96,"nonmetal",4,16,"[Ar]3d¹⁰4s²4p⁴","Glutatión peroxidasa. Suplemento antioxidante."],
[35,"Br","Bromo",79.904,"halogen",4,17,"[Ar]3d¹⁰4s²4p⁵","Ipratropio bromuro: broncodilatador."],
[36,"Kr","Kriptón",83.798,"noble",4,18,"[Ar]3d¹⁰4s²4p⁶","Sin aplicación farmacéutica directa."],
[37,"Rb","Rubidio",85.468,"alkali",5,1,"[Kr]5s¹","⁸²Rb en PET cardíaco."],
[38,"Sr","Estroncio",87.62,"alkaline",5,2,"[Kr]5s²","⁸⁹Sr: paliativo metástasis óseas."],
[39,"Y","Itrio",88.906,"transition",5,3,"[Kr]4d¹5s²","⁹⁰Y en radioinmunoterapia."],
[40,"Zr","Circonio",91.224,"transition",5,4,"[Kr]4d²5s²","Implantes dentales biocompatibles."],
[41,"Nb","Niobio",92.906,"transition",5,5,"[Kr]4d⁴5s¹","Aleaciones para implantes."],
[42,"Mo","Molibdeno",95.96,"transition",5,6,"[Kr]4d⁵5s¹","⁹⁹Mo precursor del ⁹⁹ᵐTc en medicina nuclear."],
[43,"Tc","Tecnecio",98,"transition",5,7,"[Kr]4d⁵5s²","⁹⁹ᵐTc: radioisótopo más usado en diagnóstico."],
[44,"Ru","Rutenio",101.07,"transition",5,8,"[Kr]4d⁷5s¹","Agentes antitumorales alternativos al Pt."],
[45,"Rh","Rodio",102.91,"transition",5,9,"[Kr]4d⁸5s¹","Catalizador en síntesis asimétrica."],
[46,"Pd","Paladio",106.42,"transition",5,10,"[Kr]4d¹⁰","Reacciones Suzuki/Heck en síntesis de fármacos."],
[47,"Ag","Plata",107.87,"transition",5,11,"[Kr]4d¹⁰5s¹","Sulfadiazina de plata: antimicrobiano tópico."],
[48,"Cd","Cadmio",112.41,"transition",5,12,"[Kr]4d¹⁰5s²","Tóxico. ISP establece límites máximos."],
[49,"In","Indio",114.82,"postmetal",5,13,"[Kr]4d¹⁰5s²5p¹","¹¹¹In: marcador de leucocitos."],
[50,"Sn","Estaño",118.71,"postmetal",5,14,"[Kr]4d¹⁰5s²5p²","Fluoruro de estaño en pastas dentales."],
[51,"Sb","Antimonio",121.76,"metalloid",5,15,"[Kr]4d¹⁰5s²5p³","Tratamiento de leishmaniasis."],
[52,"Te","Telurio",127.60,"metalloid",5,16,"[Kr]4d¹⁰5s²5p⁴","Organoteluro: investigación antioxidante."],
[53,"I","Yodo",126.90,"halogen",5,17,"[Kr]4d¹⁰5s²5p⁵","¹³¹I: cáncer tiroideo. Povidona yodada: antiséptico."],
[54,"Xe","Xenón",131.29,"noble",5,18,"[Kr]4d¹⁰5s²5p⁶","Investigado como anestésico neuroprotector."],
[55,"Cs","Cesio",132.91,"alkali",6,1,"[Xe]6s¹","¹³⁷Cs en braquiterapia."],
[56,"Ba","Bario",137.33,"alkaline",6,2,"[Xe]6s²","BaSO₄: contraste radiopaco gastrointestinal."],
[72,"Hf","Hafnio",178.49,"transition",6,4,"[Xe]4f¹⁴5d²6s²","Investigación en nanomedicina."],
[73,"Ta","Tantalio",180.95,"transition",6,5,"[Xe]4f¹⁴5d³6s²","Implantes y prótesis biocompatibles."],
[74,"W","Tungsteno",183.84,"transition",6,6,"[Xe]4f¹⁴5d⁴6s²","Blindaje radiológico en radioterapia."],
[75,"Re","Renio",186.21,"transition",6,7,"[Xe]4f¹⁴5d⁵6s²","¹⁸⁶Re: radiofármaco terapéutico."],
[76,"Os","Osmio",190.23,"transition",6,8,"[Xe]4f¹⁴5d⁶6s²","Tinción en microscopía histológica."],
[77,"Ir","Iridio",192.22,"transition",6,9,"[Xe]4f¹⁴5d⁷6s²","¹⁹²Ir en braquiterapia."],
[78,"Pt","Platino",195.08,"transition",6,10,"[Xe]4f¹⁴5d⁹6s¹","Cisplatino/carboplatino: quimioterapia antitumoral clave."],
[79,"Au","Oro",196.97,"transition",6,11,"[Xe]4f¹⁴5d¹⁰6s¹","Auranofina: artritis reumatoide. Nanopartículas diagnósticas."],
[80,"Hg","Mercurio",200.59,"transition",6,12,"[Xe]4f¹⁴5d¹⁰6s²","Tóxico. Timerosal (conservante). ISP regula contenido."],
[81,"Tl","Talio",204.38,"postmetal",6,13,"[Xe]4f¹⁴5d¹⁰6s²6p¹","²⁰¹Tl: gammagrafía de perfusión cardíaca."],
[82,"Pb","Plomo",207.2,"postmetal",6,14,"[Xe]4f¹⁴5d¹⁰6s²6p²","Tóxico. ISP regula límites en medicamentos."],
[83,"Bi","Bismuto",208.98,"postmetal",6,15,"[Xe]4f¹⁴5d¹⁰6s²6p³","Subsalicilato de bismuto: gastroprotector (Pepto-Bismol)."],
[84,"Po","Polonio",209,"metalloid",6,16,"[Xe]4f¹⁴5d¹⁰6s²6p⁴","Radiactivo. Sin uso farmacéutico."],
[85,"At","Astato",210,"halogen",6,17,"[Xe]4f¹⁴5d¹⁰6s²6p⁵","²¹¹At: investigación radioterapia dirigida."],
[86,"Rn","Radón",222,"noble",6,18,"[Xe]4f¹⁴5d¹⁰6s²6p⁶","Gas radiactivo. Riesgo ocupacional."],
[87,"Fr","Francio",223,"alkali",7,1,"[Rn]7s¹","Radiactivo. Sin uso farmacéutico."],
[88,"Ra","Radio",226,"alkaline",7,2,"[Rn]7s²","²²³Ra: cáncer de próstata con metástasis óseas."],
[104,"Rf","Rutherfordio",267,"transition",7,4,"[Rn]5f¹⁴6d²7s²","Sintético. Sin uso farmacéutico."],
[105,"Db","Dubnio",268,"transition",7,5,"[Rn]5f¹⁴6d³7s²","Sintético."],
[106,"Sg","Seaborgio",271,"transition",7,6,"[Rn]5f¹⁴6d⁴7s²","Sintético."],
[107,"Bh","Bohrio",274,"transition",7,7,"[Rn]5f¹⁴6d⁵7s²","Sintético."],
[108,"Hs","Hasio",277,"transition",7,8,"[Rn]5f¹⁴6d⁶7s²","Sintético."],
[109,"Mt","Meitnerio",278,"transition",7,9,"[Rn]5f¹⁴6d⁷7s²","Sintético."],
[110,"Ds","Darmstadtio",281,"transition",7,10,"[Rn]5f¹⁴6d⁸7s²","Sintético."],
[111,"Rg","Roentgenio",282,"transition",7,11,"[Rn]5f¹⁴6d⁹7s²","Sintético."],
[112,"Cn","Copernicio",285,"transition",7,12,"[Rn]5f¹⁴6d¹⁰7s²","Sintético."],
[113,"Nh","Nihonio",286,"postmetal",7,13,"[Rn]5f¹⁴6d¹⁰7s²7p¹","Sintético."],
[114,"Fl","Flerovio",289,"postmetal",7,14,"[Rn]5f¹⁴6d¹⁰7s²7p²","Sintético."],
[115,"Mc","Moscovio",290,"postmetal",7,15,"[Rn]5f¹⁴6d¹⁰7s²7p³","Sintético."],
[116,"Lv","Livermorio",293,"postmetal",7,16,"[Rn]5f¹⁴6d¹⁰7s²7p⁴","Sintético."],
[117,"Ts","Teneso",294,"halogen",7,17,"[Rn]5f¹⁴6d¹⁰7s²7p⁵","Sintético."],
[118,"Og","Oganesón",294,"noble",7,18,"[Rn]5f¹⁴6d¹⁰7s²7p⁶","Sintético. Último elemento confirmado."],
// Lanthanides (row 9)
[57,"La","Lantano",138.91,"lanthanide",9,3,"[Xe]5d¹6s²","Carbonato de lantano: quelante de fosfato en IRC."],
[58,"Ce","Cerio",140.12,"lanthanide",9,4,"[Xe]4f¹5d¹6s²","CeO₂: investigación antioxidante."],
[59,"Pr","Praseodimio",140.91,"lanthanide",9,5,"[Xe]4f³6s²","Sin uso farmacéutico directo."],
[60,"Nd","Neodimio",144.24,"lanthanide",9,6,"[Xe]4f⁴6s²","Láseres Nd:YAG en cirugía oftálmica."],
[61,"Pm","Prometio",145,"lanthanide",9,7,"[Xe]4f⁵6s²","Radiactivo."],
[62,"Sm","Samario",150.36,"lanthanide",9,8,"[Xe]4f⁶6s²","¹⁵³Sm: paliativo dolor óseo metastásico."],
[63,"Eu","Europio",151.96,"lanthanide",9,9,"[Xe]4f⁷6s²","Marcador fluorescente en inmunoensayos."],
[64,"Gd","Gadolinio",157.25,"lanthanide",9,10,"[Xe]4f⁷5d¹6s²","Agente de contraste en resonancia magnética (MRI)."],
[65,"Tb","Terbio",158.93,"lanthanide",9,11,"[Xe]4f⁹6s²","Sondas fluorescentes en investigación."],
[66,"Dy","Disprosio",162.50,"lanthanide",9,12,"[Xe]4f¹⁰6s²","Sin uso farmacéutico directo."],
[67,"Ho","Holmio",164.93,"lanthanide",9,13,"[Xe]4f¹¹6s²","Láser Ho:YAG en urología y cirugía."],
[68,"Er","Erbio",167.26,"lanthanide",9,14,"[Xe]4f¹²6s²","Láseres Er:YAG en dermatología."],
[69,"Tm","Tulio",168.93,"lanthanide",9,15,"[Xe]4f¹³6s²","¹⁷⁰Tm en braquiterapia."],
[70,"Yb","Iterbio",173.04,"lanthanide",9,16,"[Xe]4f¹⁴6s²","Investigación en imagen molecular."],
[71,"Lu","Lutecio",174.97,"lanthanide",9,17,"[Xe]4f¹⁴5d¹6s²","¹⁷⁷Lu-DOTATATE: neoplasias neuroendocrinas."],
// Actinides (row 10)
[89,"Ac","Actinio",227,"actinide",10,3,"[Rn]6d¹7s²","²²⁵Ac: terapia alfa dirigida en investigación."],
[90,"Th","Torio",232.04,"actinide",10,4,"[Rn]6d²7s²","Thorotrast (histórico, retirado)."],
[91,"Pa","Protactinio",231.04,"actinide",10,5,"[Rn]5f²6d¹7s²","Sin uso farmacéutico."],
[92,"U","Uranio",238.03,"actinide",10,6,"[Rn]5f³6d¹7s²","Toxicología: nefrotóxico."],
[93,"Np","Neptunio",237,"actinide",10,7,"[Rn]5f⁴6d¹7s²","Sin uso farmacéutico."],
[94,"Pu","Plutonio",244,"actinide",10,8,"[Rn]5f⁶7s²","Toxicología radiológica."],
[95,"Am","Americio",243,"actinide",10,9,"[Rn]5f⁷7s²","Sin uso farmacéutico."],
[96,"Cm","Curio",247,"actinide",10,10,"[Rn]5f⁷6d¹7s²","Sin uso farmacéutico."],
[97,"Bk","Berkelio",247,"actinide",10,11,"[Rn]5f⁹7s²","Sin uso."],
[98,"Cf","Californio",251,"actinide",10,12,"[Rn]5f¹⁰7s²","²⁵²Cf: neutronterapia."],
[99,"Es","Einstenio",252,"actinide",10,13,"[Rn]5f¹¹7s²","Sin uso."],
[100,"Fm","Fermio",257,"actinide",10,14,"[Rn]5f¹²7s²","Sin uso."],
[101,"Md","Mendelevio",258,"actinide",10,15,"[Rn]5f¹³7s²","Sin uso."],
[102,"No","Nobelio",259,"actinide",10,16,"[Rn]5f¹⁴7s²","Sin uso."],
[103,"Lr","Lawrencio",262,"actinide",10,17,"[Rn]5f¹⁴7s²7p¹","Sin uso."]
];

// Build table
document.addEventListener('DOMContentLoaded', () => {
    buildTable();
    initDetail();
});

function buildTable() {
    const grid = document.getElementById('periodicTable');
    if (!grid) return;

    // Create cells map
    const cellMap = {};
    E.forEach(el => {
        const key = `${el[5]}-${el[6]}`;
        cellMap[key] = el;
    });

    // Build grid (rows 1-7 + spacer + rows 9-10 for lanthanides/actinides)
    const rows = [1,2,3,4,5,6,7,8,9,10];
    rows.forEach(row => {
        for (let col = 1; col <= 18; col++) {
            const key = `${row}-${col}`;
            const el = cellMap[key];

            if (row === 8) {
                // Spacer row
                const spacer = document.createElement('div');
                spacer.className = 'element-cell empty';
                if (col === 3) {
                    spacer.className = 'element-cell spacer';
                    spacer.innerHTML = row === 8 ? '' : '';
                }
                grid.appendChild(spacer);
                continue;
            }

            if (row === 6 && col === 3) {
                const cell = document.createElement('div');
                cell.className = 'element-cell spacer';
                cell.innerHTML = '<span class="el-sym" style="font-size:.6rem">57-71</span>';
                grid.appendChild(cell);
                continue;
            }
            if (row === 7 && col === 3) {
                const cell = document.createElement('div');
                cell.className = 'element-cell spacer';
                cell.innerHTML = '<span class="el-sym" style="font-size:.6rem">89-103</span>';
                grid.appendChild(cell);
                continue;
            }

            if (el) {
                const cell = document.createElement('div');
                cell.className = `element-cell cat-${el[4]}`;
                cell.innerHTML = `<span class="el-z">${el[0]}</span><span class="el-sym">${el[1]}</span><span class="el-name">${el[2]}</span>`;
                cell.addEventListener('click', () => showDetail(el));
                grid.appendChild(cell);
            } else {
                const empty = document.createElement('div');
                empty.className = 'element-cell empty';
                grid.appendChild(empty);
            }
        }
    });
}

function showDetail(el) {
    const panel = document.getElementById('elementDetail');
    document.getElementById('detailNumber').textContent = el[0];
    document.getElementById('detailSymbol').textContent = el[1];
    document.getElementById('detailSymbol').style.color = getCatColor(el[4]);
    document.getElementById('detailName').textContent = el[2];
    document.getElementById('detailMass').textContent = el[3] + ' u';
    document.getElementById('detailCategory').textContent = getCatName(el[4]);
    document.getElementById('detailConfig').textContent = el[7];
    document.getElementById('detailEN').textContent = '-';
    document.getElementById('detailRadius').textContent = '-';
    document.getElementById('detailState').textContent = '-';
    document.getElementById('detailMelt').textContent = '-';
    document.getElementById('detailBoil').textContent = '-';
    document.getElementById('detailPharmaText').textContent = el[8];
    
    panel.classList.add('visible');
    if (!document.querySelector('.detail-backdrop')) {
        const bd = document.createElement('div');
        bd.className = 'detail-backdrop visible';
        bd.addEventListener('click', closeDetail);
        document.body.appendChild(bd);
    } else {
        document.querySelector('.detail-backdrop').classList.add('visible');
    }
}

function closeDetail() {
    document.getElementById('elementDetail').classList.remove('visible');
    const bd = document.querySelector('.detail-backdrop');
    if (bd) bd.classList.remove('visible');
}

function initDetail() {
    document.getElementById('detailClose').addEventListener('click', closeDetail);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetail(); });
}

function getCatColor(cat) {
    const colors = { nonmetal:'#44cc88', alkali:'#7aa5ff', alkaline:'#4488dd', transition:'#cc8866',
        metalloid:'#e056a0', halogen:'#f0a030', noble:'#aa88ee', postmetal:'#88bbaa',
        lanthanide:'#cc8866', actinide:'#aa9966' };
    return colors[cat] || '#ffffff';
}

function getCatName(cat) {
    const names = { nonmetal:'No metal', alkali:'Metal alcalino', alkaline:'Alcalinotérreo',
        transition:'Metal de transición', metalloid:'Metaloide', halogen:'Halógeno',
        noble:'Gas noble', postmetal:'Otro metal', lanthanide:'Lantánido', actinide:'Actínido' };
    return names[cat] || cat;
}
