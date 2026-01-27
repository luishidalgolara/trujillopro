// js/database.js - COMPLETO CORREGIDO
export const EMPRESAS_SANITARIAS = {
    'aguas_andinas': {
        nombre: 'Aguas Andinas',
        servicio: 'Agua potable y alcantarillado',
        regiones: ['metropolitana', 'rm', 'santiago', 'región metropolitana'],
        comunas_incluidas: [
            'santiago', 'providencia', 'las condes', 'vitacura', 'ñuñoa', 'la reina', 
            'peñalolén', 'macul', 'san joaquín', 'san miguel', 'pedro aguirre cerda', 
            'lo espejo', 'independencia', 'recoleta', 'conchalí', 'huechuraba', 
            'quilicura', 'renca', 'quinta normal', 'lo prado', 'pudahuel', 
            'la cisterna', 'el bosque', 'san ramón', 'la granja', 'la pintana', 
            'puente alto', 'pirque', 'san josé de maipo', 'colina', 'lampa', 'tiltil'
        ],
        comunas_excluidas: ['maipú', 'cerrillos'],
        palabras_clave: [
            'santiago', 'providencia', 'las condes', 'ñuñoa', 'vitacura', 'la reina',
            'peñalolén', 'macul', 'puente alto', 'metropolitana', 'rm', 'independencia',
            'recoleta', 'conchalí', 'huechuraba', 'quilicura', 'renca'
        ],
        contacto: 'www.aguasandinas.cl',
        telefono: '600 623 3333'
    },
    'aguas_antofagasta': {
        nombre: 'Aguas Antofagasta',
        servicio: 'Potabilización, alcantarillado y disposición de aguas servidas',
        regiones: ['antofagasta', 'segunda región', 'ii región', 'segunda', 'norte'],
        comunas_incluidas: ['antofagasta', 'calama', 'tocopilla', 'taltal', 'mejillones'],
        palabras_clave: ['antofagasta', 'calama', 'tocopilla', 'norte', 'mejillones', 'taltal'],
        contacto: 'www.aguasantofagasta.cl',
        telefono: '600 600 3310'
    },
    'aguas_del_valle': {
        nombre: 'Aguas del Valle',
        servicio: 'Agua potable y alcantarillado',
        regiones: ['coquimbo', 'cuarta región', 'iv región', 'cuarta'],
        comunas_incluidas: ['la serena', 'coquimbo', 'ovalle', 'vicuña', 'paihuano', 'illapel', 'salamanca', 'los vilos', 'combarbalá'],
        palabras_clave: ['la serena', 'coquimbo', 'ovalle', 'vicuña', 'serena', 'illapel'],
        contacto: 'www.aguasdelvalle.cl',
        telefono: '600 623 3700'
    },
    'essbio': {
        nombre: 'Essbio (Empresa de Servicios Sanitarios del Biobío)',
        servicio: 'Ciclo integral del agua',
        regiones: ['o\'higgins', 'ñuble', 'biobío', 'maule', 'sexta región', 'séptima región', 'octava región', 'vi región', 'vii región', 'viii región', 'ohiggins'],
        comunas_incluidas: [
            'rancagua', 'machalí', 'graneros', 'doñihue', 'coltauco', 'olivar', 'requínoa', 
            'rengo', 'malloa', 'quinta de tilcoco', 'san vicente', 'pichidegua', 'peumo', 
            'las cabras', 'concepción', 'talcahuano', 'chillán', 'los ángeles', 
            'talca', 'curicó', 'linares', 'constitución', 'cauquenes'
        ],
        palabras_clave: ['rancagua', 'concepción', 'talca', 'chillán', 'curicó', 'biobío', 'maule', 'ohiggins', 'talcahuano'],
        contacto: 'www.essbio.cl',
        telefono: '600 331 1000'
    },
    'essal': {
        nombre: 'ESSAL (Empresa de Servicios Sanitarios de Los Lagos)',
        servicio: 'Agua potable y alcantarillado',
        regiones: ['los ríos', 'los lagos', 'décima región', 'decimocuarta región', 'x región', 'xiv región', 'sur', 'lagos', 'ríos'],
        comunas_incluidas: [
            'valdivia', 'puerto montt', 'osorno', 'puerto varas', 'frutillar', 'llanquihue', 
            'puerto octay', 'purranque', 'río negro', 'san pablo', 'san juan de la costa', 
            'panguipulli', 'máfil', 'mariquina', 'lanco', 'los lagos', 'futrono', 
            'lago ranco', 'río bueno', 'la unión', 'corral'
        ],
        palabras_clave: ['valdivia', 'puerto montt', 'osorno', 'puerto varas', 'sur', 'lagos', 'frutillar', 'montt'],
        contacto: 'www.essal.cl',
        telefono: '600 600 3772'
    }
};

export const ESPECIFICACIONES_AGUA_POTABLE = {
    'wc': {
        tuberia_diametro_fria: 20,
        tuberia_diametro_caliente: 0,
        symbol: '🚽',
        caudal_diseño: 0.2,
        presion_trabajo: 20,
        temperatura_maxima: 25,
        requiere_caliente: false,
        color_fria: '#ef4444',
        precio_unitario: 450,
        categoria_demanda: 'estandar'
    },
    'lavatorio': {
        tuberia_diametro_fria: 20,
        tuberia_diametro_caliente: 20,
        symbol: '🚰',
        caudal_diseño: 0.15,
        presion_trabajo: 20,
        temperatura_maxima: 65,
        requiere_caliente: true,
        color_fria: '#ef4444',
        color_caliente: '#ef4444',
        precio_unitario: 320,
        categoria_demanda: 'estandar'
    },
    'bano-tina': {
        tuberia_diametro_fria: 25,
        tuberia_diametro_caliente: 25,
        symbol: '🛁',
        caudal_diseño: 0.3,
        presion_trabajo: 20,
        temperatura_maxima: 70,
        requiere_caliente: true,
        color_fria: '#10b981',
        color_caliente: '#10b981',
        precio_unitario: 1200,
        categoria_demanda: 'alta'
    },
    'ducha': {
        tuberia_diametro_fria: 25,
        tuberia_diametro_caliente: 25,
        symbol: '🚿',
        caudal_diseño: 0.2,
        presion_trabajo: 20,
        temperatura_maxima: 65,
        requiere_caliente: true,
        color_fria: '#10b981',
        color_caliente: '#10b981',
        precio_unitario: 450,
        categoria_demanda: 'alta'
    },
    'bidet': {
        tuberia_diametro_fria: 20,
        tuberia_diametro_caliente: 20,
        symbol: '🪑',
        caudal_diseño: 0.1,
        presion_trabajo: 20,
        temperatura_maxima: 60,
        requiere_caliente: true,
        color_fria: '#ef4444',
        color_caliente: '#ef4444',
        precio_unitario: 680,
        categoria_demanda: 'estandar'
    },
    'urinario': {
        tuberia_diametro_fria: 20,
        tuberia_diametro_caliente: 0,
        symbol: '🚹',
        caudal_diseño: 0.15,
        presion_trabajo: 20,
        temperatura_maxima: 25,
        requiere_caliente: false,
        color_fria: '#ef4444',
        precio_unitario: 750,
        categoria_demanda: 'estandar'
    },
    'lavaplatos': {
        tuberia_diametro_fria: 20,
        tuberia_diametro_caliente: 20,
        symbol: '🍽️',
        caudal_diseño: 0.2,
        presion_trabajo: 20,
        temperatura_maxima: 80,
        requiere_caliente: true,
        color_fria: '#ef4444',
        color_caliente: '#ef4444',
        precio_unitario: 380,
        categoria_demanda: 'estandar'
    },
    'lavacopas': {
        tuberia_diametro_fria: 20,
        tuberia_diametro_caliente: 20,
        symbol: '🍷',
        caudal_diseño: 0.1,
        presion_trabajo: 20,
        temperatura_maxima: 70,
        requiere_caliente: true,
        color_fria: '#ef4444',
        color_caliente: '#ef4444',
        precio_unitario: 280,
        categoria_demanda: 'estandar'
    },
    'lavadora': {
        tuberia_diametro_fria: 25,
        tuberia_diametro_caliente: 25,
        symbol: '🧺',
        caudal_diseño: 0.25,
        presion_trabajo: 20,
        temperatura_maxima: 60,
        requiere_caliente: true,
        color_fria: '#10b981',
        color_caliente: '#10b981',
        precio_unitario: 520,
        categoria_demanda: 'alta'
    },
    'lavadero': {
        tuberia_diametro_fria: 20,
        tuberia_diametro_caliente: 20,
        symbol: '🧽',
        caudal_diseño: 0.15,
        presion_trabajo: 20,
        temperatura_maxima: 65,
        requiere_caliente: true,
        color_fria: '#ef4444',
        color_caliente: '#ef4444',
        precio_unitario: 420,
        categoria_demanda: 'estandar'
    },
    'llave-jardin': {
        tuberia_diametro_fria: 20,
        tuberia_diametro_caliente: 0,
        symbol: '🌿',
        caudal_diseño: 0.2,
        presion_trabajo: 20,
        temperatura_maxima: 25,
        requiere_caliente: false,
        color_fria: '#ef4444',
        precio_unitario: 280,
        categoria_demanda: 'estandar'
    },
    'conexion-nivel-1': {
        tuberia_diametro_fria: 25,
        tuberia_diametro_caliente: 0,
        symbol: '🟢',
        caudal_diseño: 0.25,
        presion_trabajo: 25,
        temperatura_maxima: 25,
        requiere_caliente: false,
        color_fria: '#10b981',
        precio_unitario: 0,
        categoria_demanda: 'alta'
    }
};

export const FUENTES_CALENTAMIENTO = {
    'medidor-agua': {
        symbol: '💧',
        color: '#059669',
        diametro_entrada: 32,
        presion_trabajo: 25,
        precio_unitario: 0,
        es_medidor_principal: true
    },
    'conexion-nivel-2': {
        symbol: '🔵',
        color: '#2563eb',
        diametro_entrada: 25,
        presion_trabajo: 25,
        precio_unitario: 0,
        es_conexion_nivel_2: true,
        descripcion_default: 'CAÑERÍA D=25mm'
    },
    'calefon': {
        symbol: '🔥',
        color: '#f59e0b',
        diametro_entrada: 25,
        diametro_salida: 25,
        capacidad: '12-16 L/min',
        temperatura_salida: 65,
        precio_unitario: 3500,
        categoria_demanda: 'fuente_calor'
    },
    'termo-electrico': {
        symbol: '⚡',
        color: '#8b5cf6',
        diametro_entrada: 25,
        diametro_salida: 25,
        capacidad: '50-150 L',
        temperatura_salida: 70,
        precio_unitario: 4200,
        categoria_demanda: 'fuente_calor'
    },
    'caldera': {
        symbol: '🏠',
        color: '#dc2626',
        diametro_entrada: 25,
        diametro_salida: 25,
        capacidad: '20+ L/min',
        temperatura_salida: 80,
        precio_unitario: 15000,
        categoria_demanda: 'fuente_calor'
    }
};

export const INFRAESTRUCTURA_AGUA = {
    'valvula-corte': {
        symbol: '🔴',
        color: '#dc2626',
        diametro_standard: 20,
        precio_unitario: 450
    },
    'union-tee': {
        symbol: '⚫',
        color: '#1f2937',
        diametro_standard: 20,
        precio_unitario: 280
    },
    'punto-conexion': {
        symbol: '----/----/',
        color: '#000000',
        tipo: 'matriz-existente',
        diametro: 110,
        precio_unitario: 0,
        descripcion: 'MATRIZ EXISTENTE AGUA FRIA D=110mm'
    }
};