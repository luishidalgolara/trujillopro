/**
 * Clase que representa un plano eléctrico individual
 * Cada plano tiene su propia configuración, elementos, circuitos, etc.
 */
class PlanoElectricoInstance {
    constructor(id, nombre = null) {
        this.id = id;
        this.nombre = nombre || `Plano Eléctrico ${id}`;
        this.formato = 'A1'; // A1 o A0
        this.escala = '1:50'; // 1:50, 1:75, 1:100, etc.
        
        // SVG y canvas
        this.svgElement = null;
        this.svgInnerHTML = ''; // HTML interno del SVG para guardar/restaurar
        this.canvasContainer = null;
        
        // Elementos eléctricos del plano
        this.elementos = []; // Array de elementos eléctricos
        this.circuitos = []; // Array de circuitos
        this.conexiones = []; // Array de conexiones
        
        // PDF/Imagen de fondo
        this.backgroundPDF = null;
        this.backgroundImage = null;
        this.pdfTotalPages = 1;
        this.pdfCurrentPage = 1;
        
        // Sistema de trazado automático
        this.trazado = {
            paths: [],
            enabled: false,
            color: '#FF0000'
        };
        
        // Dibujos libres
        this.dibujos = {
            lineas: [],
            circulos: [],
            rectangulos: [],
            polilineas: [],
            enabled: false
        };
        
        // Etiquetas
        this.etiquetas = [];
        this.etiquetasEnabled = false;
        
        // Tablero eléctrico
        this.tablero = {
            elementos: [],
            configurado: false
        };
        
        // Isométrico 3D
        this.isometrico = {
            elementos: [],
            generado: false
        };
        
        // Viñeta eléctrica
        this.vineta = {
            datos: {},
            integrada: false
        };
        
        // Simbología
        this.simbologia = {
            integrada: false,
            elementos: []
        };
        
        // Cuadro de cargas
        this.cuadroCargas = {
            datos: [],
            integrado: false
        };
        
        // Esquema unifilar
        this.esquemaUnifilar = {
            elementos: [],
            integrado: false
        };
        
        // Memoria de cálculo
        this.memoriaCalculo = {
            datos: {},
            generada: false
        };
        
        // Especificaciones técnicas
        this.especificacionesTecnicas = {
            datos: {},
            generadas: false
        };
        
        // Dirección del proyecto
        this.direccionProyecto = '';
        this.nombreProyecto = '';
        this.propietario = '';
        
        // Modo de interacción
        this.modo = 'edit'; // 'edit' o 'navigation'
        
        // Herramienta seleccionada
        this.herramientaActual = null;
        
        // Estado de zoom y pan
        this.viewState = {
            zoom: 1,
            panX: 0,
            panY: 0
        };
        
        // Color y grosor actuales
        this.dibujoConfig = {
            color: '#000000',
            grosor: 2
        };
        
        // Timestamps
        this.creadoEn = new Date();
        this.modificadoEn = new Date();
    }
    
    // ========================================
    // MÉTODOS PARA GESTIONAR ELEMENTOS
    // ========================================
    
    agregarElemento(elemento) {
        this.elementos.push(elemento);
        this.actualizarModificacion();
    }
    
    eliminarElemento(elementoId) {
        this.elementos = this.elementos.filter(el => el.id !== elementoId);
        this.actualizarModificacion();
    }
    
    obtenerElementos() {
        return this.elementos;
    }
    
    limpiarElementos() {
        this.elementos = [];
        this.actualizarModificacion();
    }
    
    // ========================================
    // MÉTODOS PARA FORMATO
    // ========================================
    
    setFormato(formato) {
        if (formato === 'A0' || formato === 'A1') {
            this.formato = formato;
            this.actualizarModificacion();
            return true;
        }
        return false;
    }
    
    getFormato() {
        return this.formato;
    }
    
    // ========================================
    // MÉTODOS PARA ESCALA
    // ========================================
    
    setEscala(escala) {
        this.escala = escala;
        this.actualizarModificacion();
    }
    
    getEscala() {
        return this.escala;
    }
    
    // ========================================
    // MÉTODOS PARA PDF/IMAGEN DE FONDO
    // ========================================
    
    setBackgroundPDF(pdfData, totalPages = 1) {
        this.backgroundPDF = pdfData;
        this.pdfTotalPages = totalPages;
        this.pdfCurrentPage = 1;
        this.actualizarModificacion();
    }
    
    setBackgroundImage(imageData) {
        this.backgroundImage = imageData;
        this.actualizarModificacion();
    }
    
    removeBackground() {
        this.backgroundPDF = null;
        this.backgroundImage = null;
        this.pdfTotalPages = 1;
        this.pdfCurrentPage = 1;
        this.actualizarModificacion();
    }
    
    // ========================================
    // MÉTODOS PARA MODO
    // ========================================
    
    setModo(modo) {
        if (modo === 'edit' || modo === 'navigation') {
            this.modo = modo;
            return true;
        }
        return false;
    }
    
    getModo() {
        return this.modo;
    }
    
    // ========================================
    // MÉTODOS PARA HERRAMIENTA
    // ========================================
    
    setHerramienta(herramienta) {
        this.herramientaActual = herramienta;
    }
    
    getHerramienta() {
        return this.herramientaActual;
    }
    
    // ========================================
    // MÉTODOS PARA TRAZADO
    // ========================================
    
    setTrazadoData(data) {
        this.trazado = { ...this.trazado, ...data };
        this.actualizarModificacion();
    }
    
    getTrazadoData() {
        return this.trazado;
    }
    
    limpiarTrazado() {
        this.trazado.paths = [];
        this.actualizarModificacion();
    }
    
    // ========================================
    // MÉTODOS PARA DIBUJOS
    // ========================================
    
    agregarDibujo(dibujo) {
        if (dibujo.tipo === 'linea') {
            this.dibujos.lineas.push(dibujo);
        } else if (dibujo.tipo === 'circulo') {
            this.dibujos.circulos.push(dibujo);
        } else if (dibujo.tipo === 'rectangulo') {
            this.dibujos.rectangulos.push(dibujo);
        } else if (dibujo.tipo === 'polilinea') {
            this.dibujos.polilineas.push(dibujo);
        }
        this.actualizarModificacion();
    }
    
    limpiarDibujos() {
        this.dibujos.lineas = [];
        this.dibujos.circulos = [];
        this.dibujos.rectangulos = [];
        this.dibujos.polilineas = [];
        this.actualizarModificacion();
    }
    
    // ========================================
    // MÉTODOS PARA ETIQUETAS
    // ========================================
    
    agregarEtiqueta(etiqueta) {
        this.etiquetas.push(etiqueta);
        this.actualizarModificacion();
    }
    
    eliminarEtiqueta(etiquetaId) {
        this.etiquetas = this.etiquetas.filter(e => e.id !== etiquetaId);
        this.actualizarModificacion();
    }
    
    // ========================================
    // MÉTODOS PARA DATOS DEL PROYECTO
    // ========================================
    
    setDatosProyecto(datos) {
        if (datos.direccion) this.direccionProyecto = datos.direccion;
        if (datos.nombre) this.nombreProyecto = datos.nombre;
        if (datos.propietario) this.propietario = datos.propietario;
        this.actualizarModificacion();
    }
    
    // ========================================
    // MÉTODO PARA ACTUALIZAR ÚLTIMA MODIFICACIÓN
    // ========================================
    
    actualizarModificacion() {
        this.modificadoEn = new Date();
    }
    
    // ========================================
    // MÉTODO PARA OBTENER MINIATURA
    // ========================================
    
    obtenerMiniatura() {
        if (this.svgInnerHTML && this.svgInnerHTML.length > 0) {
            // Crear SVG temporal con el contenido guardado
            const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            
            // Ajustar viewBox según formato
            if (this.formato === 'A1') {
                tempSvg.setAttribute('viewBox', '0 0 841 594');
            } else {
                tempSvg.setAttribute('viewBox', '0 0 1189 841');
            }
            
            tempSvg.innerHTML = this.svgInnerHTML;
            
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(tempSvg);
            return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
        }
        return null;
    }
    
    // ========================================
    // MÉTODO PARA CLONAR PLANO
    // ========================================
    
    clonar(nuevoId) {
        const clonado = new PlanoElectricoInstance(nuevoId, `${this.nombre} (Copia)`);
        clonado.formato = this.formato;
        clonado.escala = this.escala;
        clonado.elementos = JSON.parse(JSON.stringify(this.elementos));
        clonado.circuitos = JSON.parse(JSON.stringify(this.circuitos));
        clonado.direccionProyecto = this.direccionProyecto;
        clonado.nombreProyecto = this.nombreProyecto;
        clonado.propietario = this.propietario;
        clonado.svgInnerHTML = this.svgInnerHTML;
        clonado.dibujoConfig = { ...this.dibujoConfig };
        
        // Copiar elementos integrados
        clonado.tablero = JSON.parse(JSON.stringify(this.tablero));
        clonado.vineta = JSON.parse(JSON.stringify(this.vineta));
        clonado.simbologia = JSON.parse(JSON.stringify(this.simbologia));
        
        return clonado;
    }
    
    // ========================================
    // MÉTODO PARA EXPORTAR DATOS
    // ========================================
    
    exportar() {
        return {
            id: this.id,
            nombre: this.nombre,
            formato: this.formato,
            escala: this.escala,
            elementos: this.elementos,
            circuitos: this.circuitos,
            conexiones: this.conexiones,
            trazado: this.trazado,
            dibujos: this.dibujos,
            etiquetas: this.etiquetas,
            tablero: this.tablero,
            isometrico: this.isometrico,
            vineta: this.vineta,
            simbologia: this.simbologia,
            cuadroCargas: this.cuadroCargas,
            esquemaUnifilar: this.esquemaUnifilar,
            memoriaCalculo: this.memoriaCalculo,
            especificacionesTecnicas: this.especificacionesTecnicas,
            direccionProyecto: this.direccionProyecto,
            nombreProyecto: this.nombreProyecto,
            propietario: this.propietario,
            svgInnerHTML: this.svgInnerHTML,
            dibujoConfig: this.dibujoConfig,
            creadoEn: this.creadoEn,
            modificadoEn: this.modificadoEn
        };
    }
    
    // ========================================
    // MÉTODO PARA IMPORTAR DATOS
    // ========================================
    
    importar(data) {
        this.nombre = data.nombre || this.nombre;
        this.formato = data.formato || this.formato;
        this.escala = data.escala || this.escala;
        this.elementos = data.elementos || [];
        this.circuitos = data.circuitos || [];
        this.conexiones = data.conexiones || [];
        this.trazado = data.trazado || this.trazado;
        this.dibujos = data.dibujos || this.dibujos;
        this.etiquetas = data.etiquetas || [];
        this.tablero = data.tablero || this.tablero;
        this.isometrico = data.isometrico || this.isometrico;
        this.vineta = data.vineta || this.vineta;
        this.simbologia = data.simbologia || this.simbologia;
        this.cuadroCargas = data.cuadroCargas || this.cuadroCargas;
        this.esquemaUnifilar = data.esquemaUnifilar || this.esquemaUnifilar;
        this.memoriaCalculo = data.memoriaCalculo || this.memoriaCalculo;
        this.especificacionesTecnicas = data.especificacionesTecnicas || this.especificacionesTecnicas;
        this.direccionProyecto = data.direccionProyecto || '';
        this.nombreProyecto = data.nombreProyecto || '';
        this.propietario = data.propietario || '';
        this.svgInnerHTML = data.svgInnerHTML || '';
        this.dibujoConfig = data.dibujoConfig || this.dibujoConfig;
        this.actualizarModificacion();
    }
}

// Exportar para uso global
window.PlanoElectricoInstance = PlanoElectricoInstance;

console.log('✅ PlanoElectricoInstance cargado');
