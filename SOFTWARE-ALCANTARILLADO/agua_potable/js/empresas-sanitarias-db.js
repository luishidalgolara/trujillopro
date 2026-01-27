// js/empresas-sanitarias-db.js
// ============================================================
// BASE DE DATOS COMPLETA: EMPRESAS SANITARIAS DE CHILE
// ============================================================

export const EMPRESAS_SANITARIAS_DB = {
    "AGUAS_ANDINAS": {
        nombre: "Aguas Andinas S.A.",
        telefono: "600 623 3333",
        contacto: "www.aguasandinas.cl",
        regiones: ["Región Metropolitana"],
        comunas: [
            "Santiago", "Providencia", "Las Condes", "Vitacura", "Lo Barnechea",
            "Ñuñoa", "La Reina", "Peñalolén", "Macul", "La Florida",
            "San Joaquín", "La Granja", "San Miguel", "San Ramón", "La Cisterna",
            "El Bosque", "Pedro Aguirre Cerda", "Lo Espejo", "Estación Central", "Cerrillos",
            "Maipú", "Pudahuel", "Cerro Navia", "Lo Prado", "Quinta Normal",
            "Independencia", "Recoleta", "Conchalí", "Huechuraba", "Quilicura",
            "Renca", "Lampa", "Colina", "Til Til", "Puente Alto",
            "San José de Maipo", "Pirque", "San Bernardo", "Calera de Tango", "Buin",
            "Paine", "Padre Hurtado", "Peñaflor", "Talagante", "El Monte",
            "Isla de Maipo", "Melipilla", "Alhué", "Curacaví", "María Pinto",
            "San Pedro"
        ]
    },
    
    "ESSBIO": {
        nombre: "ESSBIO S.A.",
        telefono: "600 331 1800",
        contacto: "www.essbio.cl",
        regiones: ["Región del Biobío", "Región de Ñuble", "Región de La Araucanía", "Región de Los Ríos"],
        comunas: [
            // Región del Biobío
            "Concepción", "Talcahuano", "Hualpén", "San Pedro de la Paz", "Chiguayante",
            "Penco", "Tomé", "Coronel", "Lota", "Santa Juana",
            "Hualqui", "Florida", "Cabrero", "Yumbel", "Los Ángeles",
            "Nacimiento", "Negrete", "Mulchén", "Quilaco", "Santa Bárbara",
            "Tucapel", "Antuco", "Laja", "San Rosendo", "Arauco",
            "Curanilahue", "Lebu", "Cañete", "Contulmo", "Tirúa",
            
            // Región de Ñuble
            "Chillán", "Chillán Viejo", "Bulnes", "Quillón", "Coihueco",
            "San Carlos", "Ñiquén", "San Fabián", "Quirihue", "Ninhue",
            "Cobquecura", "Portezuelo", "Coelemu", "Treguaco", "Ranquil",
            "Pemuco", "San Nicolás", "El Carmen", "Yungay", "Pemuco",
            
            // Región de La Araucanía
            "Temuco", "Padre Las Casas", "Lautaro", "Vilcún", "Freire",
            "Pitrufquén", "Gorbea", "Loncoche", "Villarrica", "Pucón",
            "Cunco", "Melipeuco", "Curarrehue", "Angol", "Renaico",
            "Collipulli", "Ercilla", "Los Sauces", "Lumaco", "Purén",
            "Traiguén", "Victoria", "Curacautín", "Lonquimay",
            
            // Región de Los Ríos
            "Valdivia", "Corral", "Los Lagos", "Máfil", "Mariquina",
            "Paillaco", "Lanco", "Futrono", "Río Bueno", "La Unión",
            "Panguipulli", "Lago Ranco"
        ]
    },
    
    "NUEVOSUR": {
        nombre: "NUEVOSUR S.A.",
        telefono: "600 600 9000",
        contacto: "www.nuevosur.cl",
        regiones: ["Región de Los Lagos", "Región de Los Ríos"],
        comunas: [
            // Región de Los Lagos
            "Puerto Montt", "Puerto Varas", "Llanquihue", "Frutillar", "Fresia",
            "Los Muermos", "Maullín", "Calbuco", "Cochamó", "Castro",
            "Ancud", "Quemchi", "Dalcahue", "Curaco de Vélez", "Quinchao",
            "Puqueldón", "Chonchi", "Queilén", "Quellón", "Osorno",
            "San Pablo", "San Juan de la Costa", "Río Negro", "Purranque", "Puerto Octay",
            "Chaitén", "Futaleufú", "Palena", "Hualaihué"
        ]
    },
    
    "AGUAS_DEL_VALLE": {
        nombre: "Aguas del Valle S.A.",
        telefono: "600 585 2000",
        contacto: "www.aguasdelvalle.cl",
        regiones: ["Región de Coquimbo"],
        comunas: [
            "La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano",
            "Vicuña", "Ovalle", "Monte Patria", "Combarbalá", "Punitaqui",
            "Río Hurtado", "Illapel", "Salamanca", "Los Vilos", "Canela"
        ]
    },
    
    "AGUAS_ANTOFAGASTA": {
        nombre: "Aguas Antofagasta S.A.",
        telefono: "600 623 7700",
        contacto: "www.aguasantofagasta.cl",
        regiones: ["Región de Antofagasta"],
        comunas: [
            "Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama",
            "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"
        ]
    },
    
    "AGUAS_CHAÑAR": {
        nombre: "Aguas Chañar S.A.",
        telefono: "600 835 0000",
        contacto: "www.aguaschanar.cl",
        regiones: ["Región de Atacama"],
        comunas: [
            "Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro",
            "Vallenar", "Freirina", "Huasco", "Alto del Carmen"
        ]
    },
    
    "ESVAL": {
        nombre: "ESVAL S.A.",
        telefono: "600 623 7000",
        contacto: "www.esval.cl",
        regiones: ["Región de Valparaíso"],
        comunas: [
            "Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana",
            "Casablanca", "Quintero", "Puchuncaví", "Quillota", "La Calera",
            "Hijuelas", "La Cruz", "Nogales", "San Felipe", "Los Andes",
            "Calle Larga", "Rinconada", "San Esteban", "Putaendo", "Santa María",
            "Panquehue", "Llaillay", "Catemu", "Limache", "Olmué",
            "Isla de Pascua"
        ]
    },
    
    "AGUAS_ARAUCANÍA": {
        nombre: "Aguas Araucanía S.A.",
        telefono: "600 600 2000",
        contacto: "www.aguasaraucania.cl",
        regiones: ["Región de La Araucanía"],
        comunas: [
            "Carahue", "Teodoro Schmidt", "Saavedra", "Toltén", "Nueva Imperial",
            "Galvarino", "Perquenco", "Cholchol"
        ]
    },
    
    "AGUAS_MAGALLANES": {
        nombre: "Aguas Magallanes S.A.",
        telefono: "600 623 9000",
        contacto: "www.aguasmagallanes.cl",
        regiones: ["Región de Magallanes"],
        comunas: [
            "Punta Arenas", "Puerto Natales", "Porvenir", "Puerto Williams",
            "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine",
            "Laguna Blanca", "Primavera", "Cabo de Hornos", "Antártica"
        ]
    },
    
    "AGUAS_DECIMALES": {
        nombre: "Aguas Décimas S.A.",
        telefono: "600 600 1100",
        contacto: "www.aguasdecimas.cl",
        regiones: ["Región de Los Lagos"],
        comunas: [
            "Quellón", "Chonchi", "Queilén", "Puqueldón", "Quinchao",
            "Curaco de Vélez", "Dalcahue", "Castro", "Quemchi"
        ]
    },
    
    "AGUAS_CORDILLERA": {
        nombre: "Aguas Cordillera S.A.",
        telefono: "600 623 1111",
        contacto: "www.aguascordillera.cl",
        regiones: ["Región Metropolitana"],
        comunas: [
            "Peñaflor", "Padre Hurtado", "Curacaví", "María Pinto"
        ]
    },
    
    "AGUAS_MANQUEHUE": {
        nombre: "Aguas Manquehue S.A.",
        telefono: "600 623 4444",
        contacto: "www.aguasmanquehue.cl",
        regiones: ["Región Metropolitana"],
        comunas: [
            "Colina", "Lampa", "Til Til"
        ]
    },
    
    "SMAPA": {
        nombre: "SMAPA (Servicio Municipal de Agua Potable y Alcantarillado)",
        telefono: "600 300 7000",
        contacto: "www.smapa.cl",
        regiones: ["Región de Valparaíso"],
        comunas: [
            "Petorca", "La Ligua", "Cabildo", "Zapallar", "Papudo"
        ]
    },
    
    "AGUAS_AYSÉN": {
        nombre: "Aguas Patagonia de Aysén S.A.",
        telefono: "600 585 0800",
        contacto: "www.aguasaysen.cl",
        regiones: ["Región de Aysén"],
        comunas: [
            "Coyhaique", "Aysén", "Puerto Aysén", "Chile Chico", "Cochrane",
            "Cisnes", "Guaitecas", "Lago Verde", "O'Higgins", "Río Ibáñez",
            "Tortel"
        ]
    },
    
    "AGUAS_NUEVO_SUR": {
        nombre: "Cooperativas y Servicios Rurales",
        telefono: "Contacto Local",
        contacto: "Servicio Local",
        regiones: ["Todas las regiones"],
        comunas: [
            "Zonas rurales", "Localidades aisladas"
        ]
    }
};

// ============================================================
// FUNCIÓN AUXILIAR: NORMALIZAR TEXTO
// ============================================================

export function normalizarTexto(texto) {
    if (!texto) return '';
    
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Eliminar tildes
        .replace(/ñ/g, 'n')
        .trim();
}

// ============================================================
// FUNCIÓN: BUSCAR COMUNA
// ============================================================

export function buscarComuna(textoUsuario) {
    const textoNormalizado = normalizarTexto(textoUsuario);
    
    if (textoNormalizado.length < 2) {
        return [];
    }
    
    const resultados = [];
    
    for (const [empresaKey, empresa] of Object.entries(EMPRESAS_SANITARIAS_DB)) {
        empresa.comunas.forEach(comuna => {
            const comunaNormalizada = normalizarTexto(comuna);
            
            // Coincidencia exacta o parcial
            if (comunaNormalizada.includes(textoNormalizado) || 
                textoNormalizado.includes(comunaNormalizada)) {
                
                resultados.push({
                    comuna: comuna,
                    comunaNormalizada: comunaNormalizada,
                    empresa: empresa.nombre,
                    empresaKey: empresaKey,
                    region: empresa.regiones[0],
                    telefono: empresa.telefono,
                    contacto: empresa.contacto,
                    score: comunaNormalizada.startsWith(textoNormalizado) ? 10 : 5
                });
            }
        });
    }
    
    // Ordenar por score y alfabéticamente
    resultados.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.comuna.localeCompare(b.comuna);
    });
    
    // Eliminar duplicados
    const unicos = [];
    const comunasVistas = new Set();
    
    resultados.forEach(resultado => {
        if (!comunasVistas.has(resultado.comunaNormalizada)) {
            comunasVistas.add(resultado.comunaNormalizada);
            unicos.push(resultado);
        }
    });
    
    return unicos.slice(0, 10); // Máximo 10 resultados
}

// ============================================================
// FUNCIÓN: OBTENER EMPRESA POR COMUNA
// ============================================================

export function obtenerEmpresaPorComuna(comuna) {
    const comunaNormalizada = normalizarTexto(comuna);
    
    for (const [empresaKey, empresa] of Object.entries(EMPRESAS_SANITARIAS_DB)) {
        const encontrada = empresa.comunas.some(c => 
            normalizarTexto(c) === comunaNormalizada
        );
        
        if (encontrada) {
            return {
                ...empresa,
                empresaKey: empresaKey
            };
        }
    }
    
    return null;
}

// ============================================================
// FUNCIÓN: OBTENER TODAS LAS COMUNAS
// ============================================================

export function obtenerTodasLasComunas() {
    const todasLasComunas = [];
    
    for (const [empresaKey, empresa] of Object.entries(EMPRESAS_SANITARIAS_DB)) {
        empresa.comunas.forEach(comuna => {
            todasLasComunas.push({
                comuna: comuna,
                empresa: empresa.nombre,
                empresaKey: empresaKey,
                region: empresa.regiones[0]
            });
        });
    }
    
    return todasLasComunas.sort((a, b) => a.comuna.localeCompare(b.comuna));
}

console.log('✅ Base de datos de empresas sanitarias cargada:', 
    Object.keys(EMPRESAS_SANITARIAS_DB).length, 'empresas');