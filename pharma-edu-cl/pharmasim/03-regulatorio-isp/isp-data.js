/**
 * PHARMASIM — isp-data.js
 * Datos regulatorios basados en normativa ISP Chile (D.S. 03/2010)
 */

// ── CTD STRUCTURE (Common Technical Document) ─────────────────────────────
window.CTD_STRUCTURE = [
    {
        id: 'm1', num: '1', name: 'Información Administrativa',
        sections: [
            { id: 'm1s1', name: 'Portada del Expediente',        ref: 'CTD M1.1', required: true  },
            { id: 'm1s2', name: 'Datos del Solicitante',         ref: 'CTD M1.2', required: true  },
            { id: 'm1s3', name: 'Información del Medicamento',   ref: 'CTD M1.3', required: true  },
            { id: 'm1s4', name: 'Declaraciones y Certificados',  ref: 'CTD M1.4', required: true  },
        ]
    },
    {
        id: 'm2', num: '2', name: 'Información Química/Farmacéutica',
        sections: [
            { id: 'm2s1', name: 'Composición Cuali-Cuantitativa', ref: 'CTD M2.1', required: true  },
            { id: 'm2s2', name: 'Descripción del Proceso Fabricación', ref: 'CTD M2.2', required: true },
            { id: 'm2s3', name: 'Control del Principio Activo',   ref: 'CTD M2.3', required: true  },
            { id: 'm2s4', name: 'Control del Producto Terminado', ref: 'CTD M2.4', required: true  },
            { id: 'm2s5', name: 'Estudios de Estabilidad',        ref: 'CTD M2.5', required: true  },
        ]
    },
    {
        id: 'm3', num: '3', name: 'Información No Clínica',
        sections: [
            { id: 'm3s1', name: 'Farmacología No Clínica',        ref: 'CTD M4.2', required: false },
            { id: 'm3s2', name: 'Farmacocinética No Clínica',     ref: 'CTD M4.3', required: false },
            { id: 'm3s3', name: 'Toxicología',                    ref: 'CTD M4.4', required: false },
        ]
    },
    {
        id: 'm4', num: '4', name: 'Información Clínica',
        sections: [
            { id: 'm4s1', name: 'Farmacología Clínica',           ref: 'CTD M5.1', required: true  },
            { id: 'm4s2', name: 'Estudios de Bioequivalencia',     ref: 'CTD M5.2', required: true  },
            { id: 'm4s3', name: 'Ensayos Clínicos (Eficacia)',     ref: 'CTD M5.3', required: false },
            { id: 'm4s4', name: 'Literatura Científica',           ref: 'CTD M5.4', required: false },
        ]
    },
    {
        id: 'm5', num: '5', name: 'Etiquetado e Información',
        sections: [
            { id: 'm5s1', name: 'Proyecto de Etiqueta Primaria',   ref: 'ISP-ET-01', required: true  },
            { id: 'm5s2', name: 'Proyecto de Etiqueta Secundaria', ref: 'ISP-ET-02', required: true  },
            { id: 'm5s3', name: 'Prospecto del Paciente',          ref: 'ISP-ET-03', required: true  },
            { id: 'm5s4', name: 'Ficha Técnica (HCP)',             ref: 'ISP-ET-04', required: false },
        ]
    }
];

// ── FORM DEFINITIONS ──────────────────────────────────────────────────────
window.FORM_DEFINITIONS = {

    'm1s1': {
        title: 'Portada del Expediente',
        breadcrumb: 'Módulo 1 — Información Administrativa',
        desc: 'Datos principales de identificación del producto y la solicitud',
        ref: 'CTD M1.1 — Formulario ISP FA-101',
        groups: [
            {
                id: 'g1', num: '1.1', title: 'Identificación del Medicamento', mandatory: true,
                fields: [
                    { id: 'brand_name', label: 'Nombre de Fantasía (Marca)', type: 'text', required: true,
                      placeholder: 'Ej. ALGIDOL®', hint: 'Nombre comercial del producto. Debe ser diferente al nombre del principio activo.',
                      tooltip: 'El nombre de fantasía no puede ser igual al DCI (denominación común internacional)',
                      validate: ['nonempty', 'no_api_name'] },
                    { id: 'inn_name', label: 'DCI / Nombre Genérico', type: 'text', required: true,
                      placeholder: 'Ej. Paracetamol', hint: 'Denominación Común Internacional según OPS/OMS',
                      validate: ['nonempty'] },
                    { id: 'drug_form', label: 'Forma Farmacéutica', type: 'select', required: true,
                      options: ['— Seleccionar —', 'Comprimido', 'Comprimido Recubierto', 'Cápsula', 'Solución Oral', 'Suspensión Oral', 'Solución Inyectable', 'Polvo Liofilizado', 'Crema', 'Ungüento', 'Parche Transdérmico'],
                      validate: ['select'] },
                    { id: 'potency', label: 'Concentración / Potencia', type: 'text', required: true,
                      placeholder: 'Ej. 500 mg', hint: 'Cantidad de API por unidad de dosis',
                      validate: ['nonempty', 'has_unit'] },
                ]
            },
            {
                id: 'g2', num: '1.2', title: 'Clasificación del Producto', mandatory: true,
                fields: [
                    { id: 'drug_type', label: 'Tipo de Registro', type: 'radio', required: true,
                      options: [
                          { val: 'innovador', label: 'Medicamento Innovador (Referencia)', sub: 'Primera vez en el mercado chileno' },
                          { val: 'generico', label: 'Medicamento Genérico (Similar)', sub: 'Requiere estudio de bioequivalencia' },
                          { val: 'bioequivalente', label: 'Medicamento Bioequivalente', sub: 'Con estudio BE completado' },
                      ],
                      validate: ['radio'] },
                    { id: 'rx_class', label: 'Clasificación de Venta', type: 'select', required: true,
                      options: ['— Seleccionar —', 'Venta Libre (OTC)', 'Venta Bajo Receta', 'Venta Bajo Receta Retenida (Psicotrópicos)', 'Medicamento Magistral'],
                      validate: ['select'] },
                    { id: 'atc_code', label: 'Código ATC', type: 'text', required: true,
                      placeholder: 'Ej. N02BE01', hint: 'Clasificación Anatómica-Terapéutica-Química (WHO)',
                      validate: ['nonempty', 'atc_format'] },
                ]
            },
        ]
    },

    'm1s2': {
        title: 'Datos del Solicitante y Fabricante',
        breadcrumb: 'Módulo 1 — Información Administrativa',
        desc: 'Información legal del laboratorio solicitante y fabricante del producto',
        ref: 'CTD M1.2 — Formulario ISP FA-102',
        groups: [
            {
                id: 'g3', num: '2.1', title: 'Laboratorio Solicitante', mandatory: true,
                fields: [
                    { id: 'lab_name', label: 'Razón Social del Laboratorio', type: 'text', required: true,
                      placeholder: 'Ej. Laboratorio Recalcine S.A.', validate: ['nonempty'] },
                    { id: 'lab_rut', label: 'RUT del Laboratorio', type: 'text', required: true,
                      placeholder: 'Ej. 90.123.456-7', hint: 'Formato: XX.XXX.XXX-X',
                      validate: ['nonempty', 'rut_format'] },
                    { id: 'lab_address', label: 'Dirección de la Planta', type: 'text', required: true,
                      placeholder: 'Calle, número, ciudad', validate: ['nonempty'] },
                    { id: 'lab_phone', label: 'Teléfono de Contacto', type: 'text', required: true,
                      placeholder: '+56 2 XXXX XXXX', validate: ['nonempty', 'phone_format'] },
                    { id: 'lab_email', label: 'Correo Electrónico Oficial', type: 'text', required: true,
                      placeholder: 'registro@laboratorio.cl', validate: ['nonempty', 'email_format'] },
                ]
            },
            {
                id: 'g4', num: '2.2', title: 'Dirección Técnica', mandatory: true,
                fields: [
                    { id: 'dt_name', label: 'Nombre del Director Técnico', type: 'text', required: true,
                      placeholder: 'Nombre completo', validate: ['nonempty'] },
                    { id: 'dt_rut', label: 'RUT del Director Técnico', type: 'text', required: true,
                      placeholder: 'Ej. 12.345.678-9', validate: ['nonempty', 'rut_format'] },
                    { id: 'dt_license', label: 'N° Registro Profesional', type: 'text', required: true,
                      placeholder: 'Ej. CQF-12345', hint: 'Debe ser Químico Farmacéutico con registro vigente en el CQF',
                      validate: ['nonempty'] },
                    { id: 'dt_profession', label: 'Título Profesional', type: 'select', required: true,
                      options: ['— Seleccionar —', 'Químico Farmacéutico', 'Bioquímico', 'Doctor en Farmacia'],
                      validate: ['select'] },
                ]
            },
            {
                id: 'g5', num: '2.3', title: 'Certificaciones de Planta', mandatory: true,
                fields: [
                    { id: 'bpm_cert', label: 'Certificado BPM vigente', type: 'upload',
                      hint: 'Certificado de Buenas Prácticas de Manufactura emitido por ISP o autoridad equivalente', required: true,
                      validate: ['upload'] },
                    { id: 'bpm_expiry', label: 'Fecha de Vencimiento BPM', type: 'text', required: true,
                      placeholder: 'DD/MM/AAAA', validate: ['nonempty', 'date_future'] },
                    { id: 'iso_cert', label: 'Certificado ISO 9001/GMP (opcional)', type: 'upload', required: false },
                ]
            }
        ]
    },

    'm1s3': {
        title: 'Información Detallada del Medicamento',
        breadcrumb: 'Módulo 1 — Información Administrativa',
        desc: 'Características farmacológicas y terapéuticas del producto',
        ref: 'CTD M1.3 — Formulario ISP FA-103',
        groups: [
            {
                id: 'g6', num: '3.1', title: 'Características Farmacológicas', mandatory: true,
                fields: [
                    { id: 'indication', label: 'Indicaciones Terapéuticas', type: 'textarea', required: true,
                      placeholder: 'Describa las indicaciones aprobadas o propuestas para el medicamento...',
                      validate: ['nonempty', 'min_length_50'] },
                    { id: 'contraindication', label: 'Contraindicaciones', type: 'textarea', required: true,
                      placeholder: 'Ej. Hipersensibilidad al principio activo, insuficiencia hepática grave...',
                      validate: ['nonempty'] },
                    { id: 'dosage', label: 'Posología y Modo de Administración', type: 'textarea', required: true,
                      placeholder: 'Ej. Adultos: 500 mg cada 6-8 horas. Dosis máxima: 4 g/día...',
                      validate: ['nonempty'] },
                ]
            },
            {
                id: 'g7', num: '3.2', title: 'Vía de Administración', mandatory: true,
                fields: [
                    { id: 'route', label: 'Vía(s) de Administración', type: 'checkbox',
                      options: ['Oral', 'Sublingual', 'Intramuscular', 'Intravenosa', 'Subcutánea', 'Tópica', 'Rectal', 'Inhalatoria', 'Transdérmica'],
                      required: true, validate: ['checkbox_min1'] },
                    { id: 'target_pop', label: 'Población Objetivo', type: 'select', required: true,
                      options: ['— Seleccionar —', 'Adultos (≥18 años)', 'Pediátrico (2-11 años)', 'Adolescentes (12-17 años)', 'Neonatos/Lactantes (<2 años)', 'Adultos mayores (≥65 años)', 'Todas las edades'],
                      validate: ['select'] },
                    { id: 'pregnancy_cat', label: 'Categoría de Embarazo (FDA)', type: 'select', required: true,
                      options: ['— Seleccionar —', 'Categoría A — Estudios adecuados no han demostrado riesgo', 'Categoría B — Sin evidencia de riesgo en humanos', 'Categoría C — No puede descartarse el riesgo', 'Categoría D — Evidencia positiva de riesgo humano', 'Categoría X — Contraindicado en embarazo'],
                      validate: ['select'] },
                ]
            }
        ]
    },

    'm1s4': {
        title: 'Declaraciones y Certificados Legales',
        breadcrumb: 'Módulo 1 — Información Administrativa',
        desc: 'Documentos legales requeridos para la presentación del expediente',
        ref: 'CTD M1.4 — Formulario ISP FA-104',
        groups: [
            {
                id: 'g8', num: '4.1', title: 'Documentos Legales Obligatorios', mandatory: true,
                fields: [
                    { id: 'dec_originality', label: 'Declaración de Originalidad y Veracidad', type: 'upload', required: true,
                      hint: 'Declaración jurada notarial que certifica la veracidad de toda la información presentada', validate: ['upload'] },
                    { id: 'power_of_attorney', label: 'Poder Notarial (si aplica)', type: 'upload', required: false,
                      hint: 'Requerido si el solicitante actúa en representación del titular' },
                    { id: 'cpn_cert', label: 'Certificado de Producto No Patentado', type: 'upload', required: true,
                      hint: 'Certificado del laboratorio fabricante origen', validate: ['upload'] },
                ]
            },
            {
                id: 'g9', num: '4.2', title: 'Declaración del Director Técnico', mandatory: true,
                fields: [
                    { id: 'dt_declaration', label: 'Declaración de Responsabilidad Técnica', type: 'upload', required: true,
                      hint: 'Firmada por el Director Técnico responsable del producto', validate: ['upload'] },
                    { id: 'declare_truth', label: 'Acepto que todos los datos son verídicos y que el laboratorio es responsable de mantener las condiciones bajo las cuales se autorizó el registro', type: 'checkbox_single', required: true, validate: ['required_check'] },
                    { id: 'declare_bpm', label: 'Declaro que el producto cumple con las Buenas Prácticas de Manufactura (BPM) según ICH Q7 y normativa ISP', type: 'checkbox_single', required: true, validate: ['required_check'] },
                    { id: 'declare_vigilance', label: 'Me comprometo a realizar vigilancia post-comercialización y notificar RAM al CENABAST-ISP', type: 'checkbox_single', required: true, validate: ['required_check'] },
                ]
            },
        ]
    },

    'm2s1': {
        title: 'Composición Cuali-Cuantitativa',
        breadcrumb: 'Módulo 2 — Información Farmacéutica',
        desc: 'Composición completa del producto incluyendo principio activo y excipientes',
        ref: 'CTD M2.1 — Formulario ISP FA-201',
        groups: [
            {
                id: 'g10', num: '5.1', title: 'Principio Activo', mandatory: true,
                fields: [
                    { id: 'api_inn', label: 'Nombre DCI del Principio Activo', type: 'text', required: true,
                      placeholder: 'Denominación Común Internacional', validate: ['nonempty'] },
                    { id: 'api_cas', label: 'Número CAS', type: 'text', required: true,
                      placeholder: 'Ej. 103-90-2', hint: 'Chemical Abstracts Service Number',
                      validate: ['nonempty', 'cas_format'] },
                    { id: 'api_quantity', label: 'Cantidad por Unidad de Dosis (mg)', type: 'text', required: true,
                      placeholder: 'Ej. 500', validate: ['nonempty', 'is_number'] },
                    { id: 'api_spec', label: 'Especificación de Calidad del API', type: 'select', required: true,
                      options: ['— Seleccionar —', 'Farmacopea de EE.UU. (USP)', 'Farmacopea Europea (EP)', 'Farmacopea Británica (BP)', 'Farmacopea de Chile (FCh)', 'Especificación Interna Aprobada'],
                      validate: ['select'] },
                ]
            },
            {
                id: 'g11', num: '5.2', title: 'Excipientes', mandatory: true,
                fields: [
                    { id: 'excipients_table', label: 'Lista de Excipientes con Función y Cantidad', type: 'textarea', required: true,
                      placeholder: 'Celulosa microcristalina (diluyente): 100 mg\nCroscarmelosa sódica (disgregante): 8 mg\nEstearato de magnesio (lubricante): 5 mg\nTalco (deslizante): 3 mg...',
                      validate: ['nonempty', 'min_length_30'] },
                    { id: 'has_lactose', label: 'El producto contiene lactosa (advertir en etiqueta)', type: 'checkbox_single', required: false },
                    { id: 'has_gluten', label: 'El producto contiene gluten o derivados de trigo', type: 'checkbox_single', required: false },
                    { id: 'has_allergens', label: 'Declaración de alérgenos relevantes en etiqueta', type: 'text', required: false,
                      placeholder: 'Ej. Contiene aceite de soya (lecitina de soya)' },
                ]
            },
            {
                id: 'g12', num: '5.3', title: 'Especificación del Producto Terminado', mandatory: true,
                fields: [
                    { id: 'batch_size', label: 'Tamaño de Lote de Fabricación', type: 'text', required: true,
                      placeholder: 'Ej. 100.000 comprimidos', validate: ['nonempty'] },
                    { id: 'shelf_life', label: 'Vida Útil Propuesta', type: 'select', required: true,
                      options: ['— Seleccionar —', '12 meses', '18 meses', '24 meses', '36 meses', '48 meses', '60 meses'],
                      validate: ['select'] },
                    { id: 'storage_cond', label: 'Condiciones de Almacenamiento', type: 'select', required: true,
                      options: ['— Seleccionar —', 'Temperatura ambiente (15-30°C)', 'Lugar fresco y seco (<25°C)', 'Refrigerado (2-8°C)', 'Congelado (-20°C)', 'Protegido de la luz'],
                      validate: ['select'] },
                ]
            }
        ]
    },

    'm2s5': {
        title: 'Estudios de Estabilidad',
        breadcrumb: 'Módulo 2 — Información Farmacéutica',
        desc: 'Resultados de estudios de estabilidad acelerada y a largo plazo (ICH Q1A)',
        ref: 'CTD M2.5 — Formulario ISP FA-205',
        groups: [
            {
                id: 'g13', num: '6.1', title: 'Protocolo de Estabilidad', mandatory: true,
                fields: [
                    { id: 'stability_type', label: 'Tipo de Estudio Realizado', type: 'checkbox',
                      options: ['Estabilidad Acelerada (40°C/75%HR)', 'Largo Plazo Zona IV (30°C/70%HR)', 'Largo Plazo (25°C/60%HR)', 'Intermedia (30°C/65%HR)', 'Ciclos Congelamiento-Descongelamiento'],
                      required: true, validate: ['checkbox_min1'] },
                    { id: 'stability_months', label: 'Meses de Datos Disponibles', type: 'select', required: true,
                      options: ['— Seleccionar —', '3 meses', '6 meses', '12 meses', '18 meses', '24 meses', '36 meses'],
                      validate: ['select'] },
                    { id: 'stability_result', label: 'Resultado General de Estabilidad', type: 'select', required: true,
                      options: ['— Seleccionar —', 'Estable en todas las condiciones', 'Estable con restricción de temperatura', 'Requiere protección de la humedad', 'Requiere protección de la luz', 'Con observaciones — Ver informe'],
                      validate: ['select'] },
                ]
            },
            {
                id: 'g14', num: '6.2', title: 'Resultados Analíticos', mandatory: true,
                fields: [
                    { id: 'assay_initial', label: 'Ensayo (Potencia) Inicial — %', type: 'text', required: true,
                      placeholder: 'Ej. 100.2', hint: 'Debe estar entre 98.0-102.0% según Farmacopea',
                      validate: ['nonempty', 'assay_range'] },
                    { id: 'assay_final', label: 'Ensayo (Potencia) Final — %', type: 'text', required: true,
                      placeholder: 'Ej. 99.1', validate: ['nonempty', 'assay_range'] },
                    { id: 'degradation', label: 'Nivel Máximo de Productos de Degradación — %', type: 'text', required: true,
                      placeholder: 'Ej. 0.15', hint: 'Límite ICH Q3B: identificar si >0.1%, calificar si >0.15%',
                      validate: ['nonempty', 'is_number'] },
                    { id: 'stability_file', label: 'Informe Completo de Estabilidad', type: 'upload', required: true,
                      validate: ['upload'] },
                ]
            }
        ]
    },

    'm4s2': {
        title: 'Estudios de Bioequivalencia',
        breadcrumb: 'Módulo 4 — Información Clínica',
        desc: 'Para medicamentos genéricos: demostración de bioequivalencia con el producto de referencia (ISP)',
        ref: 'CTD M5.2 — Reglamento BE ISP (Decreto 1876)',
        groups: [
            {
                id: 'g15', num: '7.1', title: 'Diseño del Estudio', mandatory: true,
                fields: [
                    { id: 'be_reference', label: 'Producto de Referencia ISP', type: 'text', required: true,
                      placeholder: 'Nombre Innovador (N° Registro ISP)', hint: 'Debe ser el producto de referencia listado en el Decreto ISP 1876',
                      validate: ['nonempty'] },
                    { id: 'be_design', label: 'Diseño del Estudio', type: 'select', required: true,
                      options: ['— Seleccionar —', 'Cruzado 2x2 (estándar)', 'Cruzado 2x4 (productos de alta variabilidad)', 'Paralelo (dosis única)', 'Estado Estacionario'],
                      validate: ['select'] },
                    { id: 'be_subjects', label: 'N° de Sujetos', type: 'text', required: true,
                      placeholder: 'Ej. 24', hint: 'Mínimo 12 voluntarios sanos según normativa ISP',
                      validate: ['nonempty', 'be_min_subjects'] },
                    { id: 'be_fed_fasted', label: 'Condición de Administración', type: 'select', required: true,
                      options: ['— Seleccionar —', 'Ayunas (fasted)', 'Postprandial (fed)', 'Ambas condiciones'],
                      validate: ['select'] },
                ]
            },
            {
                id: 'g16', num: '7.2', title: 'Resultados Farmacocinéticos', mandatory: true,
                fields: [
                    { id: 'be_auc_ratio', label: 'Relación AUC (T/R) — %', type: 'text', required: true,
                      placeholder: 'Ej. 102.3', hint: 'IC 90% debe estar dentro de 80-125% para aprobación ISP',
                      validate: ['nonempty', 'be_range'] },
                    { id: 'be_cmax_ratio', label: 'Relación Cmax (T/R) — %', type: 'text', required: true,
                      placeholder: 'Ej. 98.7', validate: ['nonempty', 'be_range'] },
                    { id: 'be_ci_lower', label: 'Límite Inferior IC 90% AUC', type: 'text', required: true,
                      placeholder: 'Ej. 94.2', validate: ['nonempty', 'be_ci_low'] },
                    { id: 'be_ci_upper', label: 'Límite Superior IC 90% AUC', type: 'text', required: true,
                      placeholder: 'Ej. 110.8', validate: ['nonempty', 'be_ci_high'] },
                    { id: 'be_report', label: 'Informe Completo del Estudio BE', type: 'upload', required: true,
                      validate: ['upload'] },
                ]
            }
        ]
    },

    'm5s1': {
        title: 'Proyecto de Etiqueta — Envase Primario',
        breadcrumb: 'Módulo 5 — Etiquetado',
        desc: 'Diseño del etiquetado primario según norma ISP NT-15',
        ref: 'ISP NT-15 — Norma de Etiquetado de Medicamentos',
        groups: [
            {
                id: 'g17', num: '8.1', title: 'Información Obligatoria de la Etiqueta', mandatory: true,
                fields: [
                    { id: 'label_name', label: 'Nombre del Medicamento en Etiqueta', type: 'text', required: true,
                      placeholder: 'Nombre fantasía + DCI + concentración + forma farmacéutica',
                      validate: ['nonempty'] },
                    { id: 'label_quantity', label: 'Cantidad de Unidades por Envase', type: 'text', required: true,
                      placeholder: 'Ej. 20 comprimidos', validate: ['nonempty'] },
                    { id: 'label_lot', label: 'Lugar para N° de Lote', type: 'checkbox_single', required: true,
                      validate: ['required_check'] },
                    { id: 'label_expiry', label: 'Lugar para Fecha de Vencimiento', type: 'checkbox_single', required: true,
                      validate: ['required_check'] },
                    { id: 'label_keep_children', label: 'Frase "Mantener fuera del alcance de los niños" incluida', type: 'checkbox_single', required: true,
                      validate: ['required_check'] },
                    { id: 'label_rx', label: 'Indicación de condición de venta (Receta / Venta Libre)', type: 'checkbox_single', required: true,
                      validate: ['required_check'] },
                ]
            },
            {
                id: 'g18', num: '8.2', title: 'Diseño de Arte Final', mandatory: true,
                fields: [
                    { id: 'label_file', label: 'Arte de Etiqueta Primaria (PDF/AI)', type: 'upload', required: true,
                      hint: 'Formato: PDF vectorial o archivo editable. Resolución mínima 300 dpi',
                      validate: ['upload'] },
                    { id: 'label_language', label: 'Idioma de la Etiqueta', type: 'select', required: true,
                      options: ['— Seleccionar —', 'Español (Chile)', 'Español + otro idioma', 'Solo inglés (requiere aprobación especial)'],
                      validate: ['select'] },
                    { id: 'bar_code', label: 'Código de Barras (GS1) incluido en diseño', type: 'checkbox_single', required: true,
                      validate: ['required_check'] },
                ]
            }
        ]
    },
};

// ── REGULATORY GLOSSARY ────────────────────────────────────────────────────
window.ISP_GLOSSARY = [
    { term: 'CTD', def: 'Common Technical Document. Formato armonizado ICH para presentación de expedientes de registro en EE.UU., Europa y Japón, adoptado por ISP Chile.', ref: 'ICH M4' },
    { term: 'DCI', def: 'Denominación Común Internacional. Nombre genérico asignado por la OMS a los principios activos. Ejemplo: paracetamol (DCI) vs Tylenol® (marca).', ref: 'OMS/WHO' },
    { term: 'BPM / GMP', def: 'Buenas Prácticas de Manufactura. Sistema de aseguramiento de calidad que garantiza la producción bajo estándares que minimizan riesgos de contaminación.', ref: 'ICH Q7, D.S. 03/2010' },
    { term: 'Bioequivalencia', def: 'Dos formulaciones son bioequivalentes si sus parámetros farmacocinéticos (AUC, Cmax) están dentro del rango 80-125% con intervalo de confianza del 90%.', ref: 'Decreto ISP 1876' },
    { term: 'AUC', def: 'Área Bajo la Curva de concentración plasmática vs. tiempo. Mide la exposición total al fármaco. Parámetro clave en bioequivalencia.', ref: 'FDA Guidance' },
    { term: 'Cmax', def: 'Concentración plasmática máxima alcanzada después de la administración. Relacionada con la velocidad de absorción del fármaco.', ref: 'ICH E8' },
    { term: 'ICH', def: 'International Council for Harmonisation. Organización que armoniza requisitos técnicos para el registro de medicamentos a nivel mundial.', ref: 'ICH Guidelines' },
    { term: 'BCS', def: 'Sistema de Clasificación Biofarmacéutica. Clasifica fármacos según solubilidad acuosa y permeabilidad intestinal. Permite waiver BE para Clase I.', ref: 'FDA/ICH M9' },
    { term: 'RAM', def: 'Reacción Adversa a Medicamento. Respuesta nociva no intencionada a un medicamento usado a dosis normales. Debe reportarse al CENABAST-ISP.', ref: 'D.S. 03/2010' },
    { term: 'D.S. 03/2010', def: 'Decreto Supremo N°3 de 2010. Reglamento del Sistema Nacional de Control de los Productos Farmacéuticos para Uso Humano. Marco legal de registro ISP.', ref: 'MINSAL Chile' },
    { term: 'ISP', def: 'Instituto de Salud Pública de Chile. Organismo gubernamental responsable del control sanitario de medicamentos, dispositivos médicos y alimentos.', ref: 'Ley 16.744' },
    { term: 'CQF', def: 'Colegio de Químicos Farmacéuticos de Chile. Organización que regula el ejercicio profesional de los QF en el país. Otorga licencias para Directores Técnicos.', ref: 'Ley 18.695' },
    { term: 'NT-15', def: 'Norma Técnica N°15 del ISP sobre etiquetado de medicamentos. Define los requisitos mínimos de información en envases primarios y secundarios.', ref: 'ISP NT-15' },
    { term: 'HPMCP', def: 'Ftalato de Hidroxipropilmetilcelulosa. Polímero entérico que resiste pH gástrico (<5) pero se disuelve a pH intestinal (>5.5). Usado en recubrimiento entérico.', ref: 'Farmacopea USP' },
    { term: 'Vida Útil', def: 'Período durante el cual el medicamento mantiene sus propiedades dentro de las especificaciones establecidas, bajo condiciones de almacenamiento indicadas.', ref: 'ICH Q1A' },
    { term: 'Farmacovigilancia', def: 'Sistema de vigilancia post-comercialización para detectar, evaluar y prevenir efectos adversos de los medicamentos en uso clínico real.', ref: 'OMS/ISP' },
];

// ── PROCESS TIMELINE ──────────────────────────────────────────────────────
window.ISP_TIMELINE = [
    {
        id: 't1', num: '01', title: 'Revisión Administrativa',
        desc: 'El ISP verifica que el expediente esté completo y cumpla los requisitos formales de presentación.',
        duration: '15-30 días', fee: '$150.000 CLP', requirement: 'Dossier completo', optional: false,
        active: false
    },
    {
        id: 't2', num: '02', title: 'Evaluación Química-Farmacéutica',
        desc: 'Revisión de composición, proceso de fabricación, controles de calidad y estudios de estabilidad.',
        duration: '90-180 días', fee: '$350.000 CLP', requirement: 'Módulo 2 completo', optional: false,
        active: false
    },
    {
        id: 't3', num: '03', title: 'Evaluación Farmacológica-Clínica',
        desc: 'Análisis de la evidencia clínica, estudios de bioequivalencia y perfil de seguridad.',
        duration: '90-120 días', fee: '$200.000 CLP', requirement: 'Módulos 3-4', optional: false,
        active: false
    },
    {
        id: 't4', num: '04', title: 'Evaluación de Etiquetado',
        desc: 'Revisión de etiqueta primaria, secundaria, prospecto y ficha técnica según NT-15.',
        duration: '30-60 días', fee: 'Incluido', requirement: 'Módulo 5', optional: false,
        active: false
    },
    {
        id: 't5', num: '05', title: 'Solicitud de Información Adicional',
        desc: 'El ISP puede requerir aclaraciones o documentación adicional. Suspende el plazo.',
        duration: '60 días plazo respuesta', fee: 'Sin costo', requirement: 'Si aplica', optional: true,
        active: false
    },
    {
        id: 't6', num: '06', title: 'Resolución de Aprobación',
        desc: 'Emisión de la Resolución Exenta de Registro Sanitario con número ISP asignado.',
        duration: '15-30 días', fee: '$80.000 CLP', requirement: 'Sin observaciones', optional: false,
        active: false
    },
    {
        id: 't7', num: '07', title: 'Renovación (5 años)',
        desc: 'El registro tiene vigencia de 5 años. Debe renovarse con datos actualizados de farmacovigilancia.',
        duration: 'Antes del vencimiento', fee: '$120.000 CLP', requirement: 'Informe vigilancia', optional: false,
        active: false
    }
];

// ── REGISTRATION NUMBER GENERATOR ─────────────────────────────────────────
window.generateISPNumber = function(drugName, labName) {
    const year = new Date().getFullYear();
    const num  = Math.floor(10000 + Math.random() * 89999);
    const type = 'F'; // F = farmacéutico
    return `ISP.${type}.${year}.${num}`;
};
