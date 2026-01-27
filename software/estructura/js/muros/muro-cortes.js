/**
 * MURO-CORTES.JS
 * Sistema independiente de cortes técnicos A-A y B-B para muro de contención
 * Inspirado en el sistema de cortes de piscina
 */

class CorteMuro {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas ${canvasId} no encontrado`);
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    /**
     * Dibujar Corte A-A (Vista Longitudinal - Perfil del muro)
     */
    dibujarCorteAA(datos) {
        this.clear();
        
        const H = datos.H;
        const B = datos.B;
        const t_base = datos.t_base;
        const t_corona = datos.t_corona;
        const h_zapata = datos.h_zapata;
        const puntera = 0.3;
        const talon = B - t_base - puntera;
        
        // Calcular escala (dejando más espacio para la leyenda)
        const margenIzq = 250; // Espacio para la leyenda
        const margenDer = 80;
        const margenVert = 80;
        const anchoDisponible = this.width - margenIzq - margenDer;
        const altoDisponible = this.height - 2 * margenVert;
        
        const escalaX = anchoDisponible / (B + 0.5);
        const escalaY = altoDisponible / (H + h_zapata + 0.5);
        this.scale = Math.min(escalaX, escalaY);
        
        // Mover el dibujo más a la derecha (después de la leyenda)
        this.offsetX = margenIzq;
        this.offsetY = this.height - margenVert;
        
        // Título
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('CORTE A-A - Vista Longitudinal (Perfil del Muro)', this.width / 2, 40);
        
        // Dibujar sección
        this.dibujarSeccionLongitudinal(H, B, t_base, t_corona, h_zapata, puntera, talon);
        
        // Dibujar acero
        this.dibujarAceroLongitudinal(datos, H, B, t_base, t_corona, h_zapata, puntera, talon);
        
        // Dimensiones
        this.dibujarDimensionesLongitudinal(H, B, t_base, t_corona, h_zapata, puntera);
        
        // Leyenda
        this.dibujarLeyendaAcero(datos);
    }

    /**
     * Dibujar Corte B-B (Vista Transversal - Corte perpendicular)
     */
    dibujarCorteBB(datos) {
        this.clear();
        
        const H = datos.H;
        const t_base = datos.t_base;
        const t_corona = datos.t_corona;
        const h_zapata = datos.h_zapata;
        const profundidad = 1.5; // Profundidad típica del corte
        
        // Calcular escala
        const margen = 80;
        const anchoDisponible = this.width - 2 * margen;
        const altoDisponible = this.height - 2 * margen;
        
        const escalaX = anchoDisponible / (t_base + 1.0);
        const escalaY = altoDisponible / (H + h_zapata + 0.5);
        this.scale = Math.min(escalaX, escalaY);
        
        // Centrar el dibujo
        this.offsetX = this.width / 2 - (t_base * this.scale / 2);
        this.offsetY = this.height - margen;
        
        // Título
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('CORTE B-B - Vista Transversal', this.width / 2, 40);
        
        // Dibujar sección
        this.dibujarSeccionTransversal(H, t_base, t_corona, h_zapata);
        
        // Dibujar acero
        this.dibujarAceroTransversal(datos, H, t_base, t_corona, h_zapata);
        
        // Dimensiones
        this.dibujarDimensionesTransversal(H, t_base, t_corona, h_zapata);
        
        // Leyenda
        this.dibujarLeyendaAcero(datos);
    }

    /**
     * Dibujar sección longitudinal (hormigón)
     */
    dibujarSeccionLongitudinal(H, B, t_base, t_corona, h_zapata, puntera, talon) {
        const ctx = this.ctx;
        
        // Coordenadas base
        const x_inicio = this.offsetX;
        const y_base = this.offsetY;
        const y_top = y_base - (H + h_zapata) * this.scale;
        
        // ZAPATA (base gris)
        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(
            x_inicio,
            y_base - h_zapata * this.scale,
            B * this.scale,
            h_zapata * this.scale
        );
        
        // Contorno zapata
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            x_inicio,
            y_base - h_zapata * this.scale,
            B * this.scale,
            h_zapata * this.scale
        );
        
        // SHEAR KEY (llave de corte)
        const shear_x = x_inicio + puntera * this.scale + t_base * this.scale / 2 - 0.15 * this.scale;
        const shear_width = 0.3 * this.scale;
        const shear_height = 0.3 * this.scale;
        
        ctx.fillStyle = '#95a5a6';
        ctx.fillRect(
            shear_x,
            y_base,
            shear_width,
            shear_height
        );
        ctx.strokeRect(shear_x, y_base, shear_width, shear_height);
        
        // MURO TRAPEZOIDAL (gris más claro)
        ctx.fillStyle = '#95a5a6';
        ctx.beginPath();
        
        // Calcular posiciones del muro
        const x_base_muro = x_inicio + puntera * this.scale;
        const x_top_muro = x_base_muro + (t_base - t_corona) * this.scale / 2;
        const y_zapata = y_base - h_zapata * this.scale;
        
        // Dibujar trapecio
        ctx.moveTo(x_base_muro, y_zapata); // Base izquierda
        ctx.lineTo(x_base_muro + t_base * this.scale, y_zapata); // Base derecha
        ctx.lineTo(x_top_muro + t_corona * this.scale, y_zapata - H * this.scale); // Corona derecha
        ctx.lineTo(x_top_muro, y_zapata - H * this.scale); // Corona izquierda
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // SUELO RETENIDO (marrón transparente)
        ctx.fillStyle = 'rgba(139, 69, 19, 0.4)';
        const x_suelo = x_base_muro + t_base * this.scale;
        const ancho_suelo = talon * this.scale + 0.5 * this.scale;
        
        ctx.fillRect(
            x_suelo,
            y_zapata - H * this.scale,
            ancho_suelo,
            H * this.scale
        );
        
        // Línea de superficie del suelo
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(x_suelo, y_zapata - H * this.scale);
        ctx.lineTo(x_suelo + ancho_suelo, y_zapata - H * this.scale);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // PRESIÓN DEL SUELO (flechas rojas)
        ctx.strokeStyle = '#e74c3c';
        ctx.fillStyle = '#e74c3c';
        ctx.lineWidth = 2;
        
        const numFlechas = 5;
        for (let i = 1; i <= numFlechas; i++) {
            const y_flecha = y_zapata - (H * this.scale * i / numFlechas);
            const longitud_flecha = (H * this.scale * i / numFlechas) * 0.15; // Presión triangular
            
            // Línea de flecha
            ctx.beginPath();
            ctx.moveTo(x_suelo + ancho_suelo * 0.3, y_flecha);
            ctx.lineTo(x_suelo + ancho_suelo * 0.3 - longitud_flecha, y_flecha);
            ctx.stroke();
            
            // Punta de flecha
            ctx.beginPath();
            ctx.moveTo(x_suelo + ancho_suelo * 0.3 - longitud_flecha, y_flecha);
            ctx.lineTo(x_suelo + ancho_suelo * 0.3 - longitud_flecha + 8, y_flecha - 4);
            ctx.lineTo(x_suelo + ancho_suelo * 0.3 - longitud_flecha + 8, y_flecha + 4);
            ctx.closePath();
            ctx.fill();
        }
        
        // Etiqueta presión
        ctx.font = 'italic 12px Arial';
        ctx.fillStyle = '#e74c3c';
        ctx.textAlign = 'center';
        ctx.fillText('Presión del suelo', x_suelo + ancho_suelo * 0.5, y_zapata - H * this.scale / 2);
    }

    /**
     * Dibujar acero en corte longitudinal
     */
    dibujarAceroLongitudinal(datos, H, B, t_base, t_corona, h_zapata, puntera, talon) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_base = this.offsetY;
        const y_zapata = y_base - h_zapata * this.scale;
        const x_base_muro = x_inicio + puntera * this.scale;
        
        const radioBarra = 4;
        const radioBarraGrande = 5;
        const recubrimiento = 0.05; // 5cm de recubrimiento
        
        // ========================================
        // 1. ACERO VERTICAL DEL MURO (ROJO - CARA INTERIOR)
        // ========================================
        ctx.fillStyle = '#e74c3c';
        const numBarrasVert = 8;
        
        for (let i = 0; i <= numBarrasVert; i++) {
            const y = y_zapata - (i / numBarrasVert) * H * this.scale;
            const proporcion = i / numBarrasVert;
            const x_barra = x_base_muro + recubrimiento * this.scale; // 5cm desde borde interior
            
            // Barra vertical
            ctx.beginPath();
            ctx.arc(x_barra, y, radioBarra, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Gancho superior en corona
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        const x_corona = x_base_muro + (t_base - t_corona) * this.scale / 2;
        ctx.beginPath();
        ctx.moveTo(x_corona + recubrimiento * this.scale, y_zapata - H * this.scale);
        ctx.lineTo(x_corona + recubrimiento * this.scale + 0.15 * this.scale, y_zapata - H * this.scale);
        ctx.stroke();
        
        // Anclaje en zapata (DENTRO de la zapata)
        ctx.beginPath();
        ctx.moveTo(x_base_muro + recubrimiento * this.scale, y_zapata);
        ctx.lineTo(x_base_muro + recubrimiento * this.scale, y_zapata + (h_zapata * 0.6) * this.scale);
        ctx.stroke();
        
        // Gancho horizontal en zapata (DENTRO de la zapata)
        ctx.beginPath();
        ctx.moveTo(x_base_muro + recubrimiento * this.scale, y_zapata + (h_zapata * 0.6) * this.scale);
        ctx.lineTo(x_base_muro + recubrimiento * this.scale + 0.20 * this.scale, y_zapata + (h_zapata * 0.6) * this.scale);
        ctx.stroke();
        
        // ========================================
        // 2. ACERO VERTICAL DEL MURO (AZUL - CARA EXTERIOR)
        // ========================================
        ctx.fillStyle = '#3498db';
        
        for (let i = 0; i <= numBarrasVert; i++) {
            const y = y_zapata - (i / numBarrasVert) * H * this.scale;
            const proporcion = i / numBarrasVert;
            const espesor_actual = t_base - (t_base - t_corona) * proporcion;
            const x_barra = x_base_muro + espesor_actual * this.scale - recubrimiento * this.scale; // 5cm desde borde exterior
            
            // Barra vertical
            ctx.beginPath();
            ctx.arc(x_barra, y, radioBarra, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Gancho superior (hacia afuera)
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        const x_corona_ext = x_base_muro + (t_base - t_corona) * this.scale / 2 + t_corona * this.scale;
        ctx.beginPath();
        ctx.moveTo(x_corona_ext - recubrimiento * this.scale, y_zapata - H * this.scale);
        ctx.lineTo(x_corona_ext - recubrimiento * this.scale - 0.15 * this.scale, y_zapata - H * this.scale);
        ctx.stroke();
        
        // ========================================
        // 3. ESTRIBOS HORIZONTALES (NARANJA)
        // ========================================
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2.5;
        const numEstribos = 6;
        
        for (let i = 0; i <= numEstribos; i++) {
            const y = y_zapata - (i / numEstribos) * H * this.scale;
            const proporcion = i / numEstribos;
            const espesor_actual = t_base - (t_base - t_corona) * proporcion;
            const x_ini = x_base_muro + recubrimiento * this.scale;
            const x_fin = x_base_muro + espesor_actual * this.scale - recubrimiento * this.scale;
            
            ctx.beginPath();
            ctx.moveTo(x_ini, y);
            ctx.lineTo(x_fin, y);
            ctx.stroke();
        }
        
        // ========================================
        // 4. ACERO DE LA ZAPATA (VERDE - CAPA INFERIOR)
        // ========================================
        ctx.fillStyle = '#27ae60';
        const numBarrasZapata = 10;
        const y_capa_inferior = y_base - h_zapata * this.scale + recubrimiento * this.scale + 0.01 * this.scale; // Capa inferior DENTRO
        
        for (let i = 0; i < numBarrasZapata; i++) {
            const x = x_inicio + (i / (numBarrasZapata - 1)) * B * this.scale;
            
            ctx.beginPath();
            ctx.arc(x, y_capa_inferior, radioBarra, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Anclajes verticales en talón (DENTRO del muro)
        ctx.strokeStyle = '#27ae60';
        ctx.lineWidth = 3;
        const x_talon = x_base_muro + t_base * this.scale;
        
        for (let i = 0; i < 3; i++) {
            const x = x_talon + (i / 2) * talon * this.scale * 0.8;
            ctx.beginPath();
            ctx.moveTo(x, y_capa_inferior);
            ctx.lineTo(x, y_zapata + 0.3 * this.scale); // Anclaje hacia arriba DENTRO del muro
            ctx.stroke();
        }
        
        // ========================================
        // 5. ACERO DE ZAPATA (CAPA SUPERIOR - AMARILLO)
        // ========================================
        ctx.fillStyle = '#f1c40f';
        const y_capa_superior = y_base - h_zapata * this.scale * 0.3; // Capa superior DENTRO
        
        for (let i = 0; i < numBarrasZapata; i++) {
            const x = x_inicio + (i / (numBarrasZapata - 1)) * B * this.scale;
            
            ctx.beginPath();
            ctx.arc(x, y_capa_superior, radioBarra * 0.8, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // ========================================
        // 6. ACERO DEL SHEAR KEY (VIOLETA)
        // ========================================
        ctx.fillStyle = '#9b59b6';
        const shear_x = x_inicio + puntera * this.scale + t_base * this.scale / 2 - 0.15 * this.scale;
        const shear_center_x = shear_x + 0.15 * this.scale;
        const shear_height = 0.3;
        
        // 3 barras verticales DENTRO del shear key
        for (let i = 0; i < 3; i++) {
            const x = shear_center_x + (i - 1) * 0.08 * this.scale;
            const y = y_base + (shear_height / 2) * this.scale; // CENTRO del shear key
            
            ctx.beginPath();
            ctx.arc(x, y, radioBarra * 0.9, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Estribos del shear key DENTRO
        ctx.strokeStyle = '#9b59b6';
        ctx.lineWidth = 2;
        const shear_width = 0.3;
        for (let i = 0; i < 2; i++) {
            const y = y_base + (i * shear_height / 3 + shear_height / 6) * this.scale;
            ctx.strokeRect(
                shear_center_x - (shear_width * 0.4) * this.scale,
                y - 0.03 * this.scale,
                (shear_width * 0.8) * this.scale,
                0.06 * this.scale
            );
        }
    }

    /**
     * Dibujar sección transversal (corte perpendicular del muro)
     */
    dibujarSeccionTransversal(H, t_base, t_corona, h_zapata) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_base = this.offsetY;
        const y_zapata = y_base - h_zapata * this.scale;
        
        // ZAPATA (vista de perfil - ancho t_base)
        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(
            x_inicio,
            y_base - h_zapata * this.scale,
            t_base * this.scale,
            h_zapata * this.scale
        );
        
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            x_inicio,
            y_base - h_zapata * this.scale,
            t_base * this.scale,
            h_zapata * this.scale
        );
        
        // MURO TRAPEZOIDAL
        ctx.fillStyle = '#95a5a6';
        ctx.beginPath();
        
        const x_base_izq = x_inicio;
        const x_base_der = x_inicio + t_base * this.scale;
        const desplazamiento = (t_base - t_corona) * this.scale / 2;
        const x_corona_izq = x_base_izq + desplazamiento;
        const x_corona_der = x_base_der - desplazamiento;
        
        ctx.moveTo(x_base_izq, y_zapata);
        ctx.lineTo(x_base_der, y_zapata);
        ctx.lineTo(x_corona_der, y_zapata - H * this.scale);
        ctx.lineTo(x_corona_izq, y_zapata - H * this.scale);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Indicar profundidad (líneas punteadas)
        ctx.strokeStyle = '#7f8c8d';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        const prof_offset = 0.3 * this.scale;
        
        // Líneas de profundidad zapata
        ctx.beginPath();
        ctx.moveTo(x_inicio, y_base - h_zapata * this.scale);
        ctx.lineTo(x_inicio - prof_offset, y_base - h_zapata * this.scale - prof_offset);
        ctx.moveTo(x_base_der, y_base - h_zapata * this.scale);
        ctx.lineTo(x_base_der + prof_offset, y_base - h_zapata * this.scale - prof_offset);
        ctx.stroke();
        
        ctx.setLineDash([]);
    }

    /**
     * Dibujar acero en corte transversal
     */
    dibujarAceroTransversal(datos, H, t_base, t_corona, h_zapata) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_base = this.offsetY;
        const y_zapata = y_base - h_zapata * this.scale;
        
        const radioBarra = 4;
        
        // ========================================
        // 1. BARRAS VERTICALES (distribuidas en el espesor)
        // ========================================
        
        // Cara interior (ROJO)
        ctx.fillStyle = '#e74c3c';
        const numBarrasProf = 6;
        
        for (let i = 0; i < numBarrasProf; i++) {
            const x = x_inicio + 0.07 * this.scale + (i * (t_base - 0.14) * this.scale / (numBarrasProf - 1));
            
            // Barras verticales a diferentes alturas
            for (let j = 0; j <= 5; j++) {
                const y = y_zapata - (j / 5) * H * this.scale;
                ctx.beginPath();
                ctx.arc(x, y, radioBarra, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // ========================================
        // 2. ESTRIBOS (vista frontal - círculos)
        // ========================================
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2.5;
        const numEstribosVista = 4;
        
        for (let i = 0; i <= numEstribosVista; i++) {
            const y = y_zapata - (i / numEstribosVista) * H * this.scale;
            const proporcion = i / numEstribosVista;
            const espesor_actual = t_base - (t_base - t_corona) * proporcion;
            
            // Estribo rectangular
            const x_centro = x_inicio + espesor_actual * this.scale / 2;
            const ancho_estribo = (espesor_actual - 0.10) * this.scale;
            const alto_estribo = 0.08 * this.scale;
            
            ctx.strokeRect(
                x_centro - ancho_estribo / 2,
                y - alto_estribo / 2,
                ancho_estribo,
                alto_estribo
            );
        }
        
        // ========================================
        // 3. ACERO DE ZAPATA (vista de corte)
        // ========================================
        
        // Capa inferior (VERDE)
        ctx.fillStyle = '#27ae60';
        for (let i = 0; i < numBarrasProf; i++) {
            const x = x_inicio + 0.05 * this.scale + (i * (t_base - 0.10) * this.scale / (numBarrasProf - 1));
            const y = y_base - h_zapata * this.scale * 0.25;
            
            ctx.beginPath();
            ctx.arc(x, y, radioBarra, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Capa superior (AMARILLO)
        ctx.fillStyle = '#f1c40f';
        for (let i = 0; i < numBarrasProf; i++) {
            const x = x_inicio + 0.05 * this.scale + (i * (t_base - 0.10) * this.scale / (numBarrasProf - 1));
            const y = y_base - h_zapata * this.scale * 0.75;
            
            ctx.beginPath();
            ctx.arc(x, y, radioBarra * 0.8, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    /**
     * Dibujar dimensiones longitudinales
     */
    dibujarDimensionesLongitudinal(H, B, t_base, t_corona, h_zapata, puntera) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_base = this.offsetY;
        const y_zapata = y_base - h_zapata * this.scale;
        
        ctx.strokeStyle = '#2c3e50';
        ctx.fillStyle = '#2c3e50';
        ctx.lineWidth = 1.5;
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'center';
        
        // Dimensión B (ancho total zapata)
        const y_dim_B = y_base + 30;
        this.dibujarLineaDimension(
            x_inicio,
            y_dim_B,
            x_inicio + B * this.scale,
            y_dim_B,
            `B = ${B.toFixed(2)} m`
        );
        
        // Dimensión H (altura muro)
        const x_dim_H = x_inicio + B * this.scale + 40;
        this.dibujarLineaDimension(
            x_dim_H,
            y_zapata,
            x_dim_H,
            y_zapata - H * this.scale,
            `H = ${H.toFixed(2)} m`
        );
        
        // Dimensión h_zapata
        const x_dim_zapata = x_inicio - 30;
        this.dibujarLineaDimension(
            x_dim_zapata,
            y_base,
            x_dim_zapata,
            y_zapata,
            `${(h_zapata * 100).toFixed(0)} cm`
        );
        
        // Espesores
        ctx.font = '11px Arial';
        const x_base_muro = x_inicio + puntera * this.scale;
        
        // Espesor base
        ctx.fillText(
            `t = ${(t_base * 100).toFixed(0)} cm`,
            x_base_muro + t_base * this.scale / 2,
            y_zapata + 15
        );
        
        // Espesor corona
        const x_corona = x_base_muro + (t_base - t_corona) * this.scale / 2;
        ctx.fillText(
            `t = ${(t_corona * 100).toFixed(0)} cm`,
            x_corona + t_corona * this.scale / 2,
            y_zapata - H * this.scale - 8
        );
    }

    /**
     * Dibujar dimensiones transversales
     */
    dibujarDimensionesTransversal(H, t_base, t_corona, h_zapata) {
        const ctx = this.ctx;
        
        const x_inicio = this.offsetX;
        const y_base = this.offsetY;
        const y_zapata = y_base - h_zapata * this.scale;
        
        ctx.strokeStyle = '#2c3e50';
        ctx.fillStyle = '#2c3e50';
        ctx.lineWidth = 1.5;
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'center';
        
        // Dimensión t_base (ancho en base)
        const y_dim_base = y_base + 30;
        this.dibujarLineaDimension(
            x_inicio,
            y_dim_base,
            x_inicio + t_base * this.scale,
            y_dim_base,
            `t_base = ${(t_base * 100).toFixed(0)} cm`
        );
        
        // Dimensión H (altura)
        const x_dim_H = x_inicio + t_base * this.scale + 40;
        this.dibujarLineaDimension(
            x_dim_H,
            y_zapata,
            x_dim_H,
            y_zapata - H * this.scale,
            `H = ${H.toFixed(2)} m`
        );
        
        // Espesor corona
        const desplazamiento = (t_base - t_corona) * this.scale / 2;
        const x_corona_izq = x_inicio + desplazamiento;
        const x_corona_der = x_inicio + t_base * this.scale - desplazamiento;
        
        const y_dim_corona = y_zapata - H * this.scale - 20;
        this.dibujarLineaDimension(
            x_corona_izq,
            y_dim_corona,
            x_corona_der,
            y_dim_corona,
            `t_corona = ${(t_corona * 100).toFixed(0)} cm`
        );
        
        // Nota de profundidad
        ctx.font = 'italic 11px Arial';
        ctx.fillText('Profundidad = 1.5 m (típico)', x_inicio + t_base * this.scale / 2, y_zapata + 40);
    }

    /**
     * Dibujar línea de dimensión con flechas
     */
    dibujarLineaDimension(x1, y1, x2, y2, texto) {
        const ctx = this.ctx;
        
        // Línea principal
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Flechas
        const tamFlecha = 8;
        
        if (x1 === x2) { // Vertical
            // Flecha superior
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 - tamFlecha/2, y1 + tamFlecha);
            ctx.lineTo(x1 + tamFlecha/2, y1 + tamFlecha);
            ctx.closePath();
            ctx.fill();
            
            // Flecha inferior
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - tamFlecha/2, y2 - tamFlecha);
            ctx.lineTo(x2 + tamFlecha/2, y2 - tamFlecha);
            ctx.closePath();
            ctx.fill();
            
            // Texto (rotado)
            ctx.save();
            ctx.translate(x1 + 20, (y1 + y2) / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(texto, 0, 0);
            ctx.restore();
        } else { // Horizontal
            // Flecha izquierda
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + tamFlecha, y1 - tamFlecha/2);
            ctx.lineTo(x1 + tamFlecha, y1 + tamFlecha/2);
            ctx.closePath();
            ctx.fill();
            
            // Flecha derecha
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - tamFlecha, y2 - tamFlecha/2);
            ctx.lineTo(x2 - tamFlecha, y2 + tamFlecha/2);
            ctx.closePath();
            ctx.fill();
            
            // Texto
            ctx.fillText(texto, (x1 + x2) / 2, y1 - 10);
        }
    }

    /**
     * Dibujar leyenda del acero
     */
    dibujarLeyendaAcero(datos) {
        const ctx = this.ctx;
        const x = 50;
        const y = 80;
        const lineHeight = 22;
        
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'left';
        ctx.fillText('ARMADURA:', x, y);
        
        ctx.font = '11px Arial';
        let yPos = y + lineHeight;
        
        // Acero muro vertical
        if (datos.dist_muro) {
            ctx.fillStyle = '#e74c3c';
            ctx.fillText(`● Muro vert. interior: φ${datos.dist_muro.diametro} @ ${datos.dist_muro.espaciamiento} cm`, x, yPos);
            yPos += lineHeight;
            
            ctx.fillStyle = '#3498db';
            ctx.fillText(`● Muro vert. exterior: φ${datos.dist_muro.diametro} @ ${datos.dist_muro.espaciamiento} cm`, x, yPos);
            yPos += lineHeight;
            
            ctx.fillStyle = '#f39c12';
            ctx.fillText(`● Estribos horizontales: φ10 @ 15 cm`, x, yPos);
            yPos += lineHeight;
        }
        
        // Acero zapata
        if (datos.dist_talon) {
            ctx.fillStyle = '#27ae60';
            ctx.fillText(`● Zapata capa inferior: φ${datos.dist_talon.diametro} @ ${datos.dist_talon.espaciamiento} cm`, x, yPos);
            yPos += lineHeight;
            
            ctx.fillStyle = '#f1c40f';
            ctx.fillText(`● Zapata capa superior: φ${datos.dist_talon.diametro} @ ${datos.dist_talon.espaciamiento} cm`, x, yPos);
            yPos += lineHeight;
        }
        
        // Shear key
        ctx.fillStyle = '#9b59b6';
        ctx.fillText(`● Shear key: φ12 + estribos φ8 @ 10 cm`, x, yPos);
    }
}