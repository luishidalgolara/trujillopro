/**
 * ============================================
 * ASISTENTE RIDAA - CORE LÓGICA
 * Procesamiento de preguntas con FAQs organizadas por categorías
 * ============================================
 */

const AsistenteCore = {
    
    faqsDisponibles: [],
    categorias: [],

    init() {
        this.cargarFAQs();
        this.organizarCategorias();
        console.log('🤖 Core inicializado con', this.faqsDisponibles.length, 'preguntas en', this.categorias.length, 'categorías');
    },

    cargarFAQs() {
        this.faqsDisponibles = [];

        // Cargar todas las partes
        const partes = [
            RIDAA_FAQ_PARTE1,
            RIDAA_FAQ_PARTE2,
            RIDAA_FAQ_PARTE3,
            RIDAA_FAQ_PARTE4,
            RIDAA_FAQ_PARTE5,
            RIDAA_FAQ_PARTE6,
            RIDAA_FAQ_PARTE7
        ];

        partes.forEach(parte => {
            if (typeof parte !== 'undefined') {
                this.faqsDisponibles.push(...parte.preguntas);
                console.log(`✅ ${parte.categoria} cargado: ${parte.preguntas.length} preguntas`);
            }
        });
    },

    organizarCategorias() {
        this.categorias = [
            {
                id: 'cat_1',
                nombre: 'Definiciones y Disposiciones Generales',
                icono: '📖',
                descripcion: 'Conceptos básicos, definiciones legales y disposiciones generales del RIDAA',
                preguntas: this.faqsDisponibles.filter(faq => faq.id.startsWith('p1_'))
            },
            {
                id: 'cat_2',
                nombre: 'Procedimientos Administrativos',
                icono: '📋',
                descripcion: 'Trámites, factibilidades, proyectos, plazos y certificados',
                preguntas: this.faqsDisponibles.filter(faq => faq.id.startsWith('p2_'))
            },
            {
                id: 'cat_3',
                nombre: 'Instaladores y Normas Técnicas',
                icono: '👷',
                descripcion: 'Habilitación profesional, certificación de materiales y normas técnicas',
                preguntas: this.faqsDisponibles.filter(faq => faq.id.startsWith('p3_'))
            },
            {
                id: 'cat_4',
                nombre: 'Proyectos y Diseño de Agua Potable',
                icono: '💧',
                descripcion: 'Diseño, cálculos, diámetros, presiones, medidores y QMP',
                preguntas: this.faqsDisponibles.filter(faq => faq.id.startsWith('p4_'))
            },
            {
                id: 'cat_5',
                nombre: 'Red de Incendio y Estanques',
                icono: '🔥',
                descripcion: 'Red húmeda, red seca, estanques de agua potable y requisitos',
                preguntas: this.faqsDisponibles.filter(faq => faq.id.startsWith('p5_'))
            },
            {
                id: 'cat_6',
                nombre: 'Elevación de Agua y Alcantarillado',
                icono: '⚙️',
                descripcion: 'Sistemas de bombeo, sala de bombas, diámetros y pendientes',
                preguntas: this.faqsDisponibles.filter(faq => faq.id.startsWith('p6_'))
            },
            {
                id: 'cat_7',
                nombre: 'Construcción, Pruebas y Finales',
                icono: '🔧',
                descripcion: 'Instalación, excavaciones, pruebas hidráulicas y de humo',
                preguntas: this.faqsDisponibles.filter(faq => faq.id.startsWith('p7_'))
            }
        ];
    },

    obtenerTodasLasPreguntas() {
        return this.faqsDisponibles;
    },

    obtenerCategorias() {
        return this.categorias;
    },

    obtenerPreguntasPorCategoria(categoriaId) {
        const categoria = this.categorias.find(cat => cat.id === categoriaId);
        return categoria ? categoria.preguntas : [];
    },

    buscarPreguntaPorId(id) {
        return this.faqsDisponibles.find(faq => faq.id === id);
    },

    procesarPreguntaSeleccionada(preguntaId) {
        const faq = this.buscarPreguntaPorId(preguntaId);
        
        if (!faq) {
            AsistenteUI.agregarMensaje('No encontré información sobre esa pregunta.', 'asistente');
            return;
        }

        let respuesta = `📖 **${faq.pregunta}**\n\n`;
        respuesta += `${faq.respuesta}\n\n`;
        respuesta += `📋 *Fuente: ${faq.articulo}*`;

        AsistenteUI.agregarMensaje(respuesta, 'asistente');
        
        setTimeout(() => {
            AsistenteUI.mostrarOpcionesPostRespuesta();
        }, 500);
    },

    procesarPregunta(pregunta) {
        console.log('🤖 Procesando pregunta:', pregunta);
        
        const resultados = this.buscarPorPalabrasClave(pregunta.toLowerCase());
        
        if (resultados.length > 0) {
            const faq = resultados[0];
            let respuesta = `Encontré esto que podría ayudarte:\n\n`;
            respuesta += `📖 **${faq.pregunta}**\n\n`;
            respuesta += `${faq.respuesta}\n\n`;
            respuesta += `📋 *Fuente: ${faq.articulo}*`;
            
            AsistenteUI.agregarMensaje(respuesta, 'asistente');
            
            if (resultados.length > 1) {
                setTimeout(() => {
                    AsistenteUI.agregarMensaje(
                        `También encontré ${resultados.length - 1} pregunta(s) relacionada(s).`,
                        'asistente'
                    );
                }, 500);
            }
            
            setTimeout(() => {
                AsistenteUI.mostrarOpcionesPostRespuesta();
            }, 800);
        } else {
            const respuesta = 'No encontré información específica sobre tu pregunta en el reglamento.';
            AsistenteUI.agregarMensaje(respuesta, 'asistente');
            
            setTimeout(() => {
                AsistenteUI.mostrarOpcionesPostRespuesta();
            }, 500);
        }
    },

    buscarPorPalabrasClave(textoUsuario) {
        const palabrasUsuario = textoUsuario.toLowerCase().split(' ').filter(p => p.length > 3);
        
        return this.faqsDisponibles.filter(faq => {
            const textoBusqueda = (
                faq.pregunta + ' ' + 
                faq.respuesta + ' ' + 
                faq.tags.join(' ')
            ).toLowerCase();
            
            return palabrasUsuario.some(palabra => textoBusqueda.includes(palabra));
        });
    },

    obtenerPreguntasPorTag(tag) {
        return this.faqsDisponibles.filter(faq => faq.tags.includes(tag));
    }
};

window.AsistenteCore = AsistenteCore;