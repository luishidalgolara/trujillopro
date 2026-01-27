/**
 * MURO-MAIN.JS
 * Controlador principal del módulo de muros de contención
 * Coordina todos los submódulos de forma liviana y modular
 */

// Variables globales
let threeScene = null;
let datosMuroActual = null;
let vistaActual = '3d';
let corteMuroA = null;
let corteMuroB = null;

/**
 * Inicialización al cargar el DOM
 */
window.addEventListener('DOMContentLoaded', () => {
    // Inicializar escena 3D principal
    threeScene = new ThreeConfig('canvas3d');
    
    // Inicializar sistema de cortes A-A y B-B
    corteMuroA = new CorteMuro('canvasCorteA');
    corteMuroB = new CorteMuro('canvasCorteB');
    
    console.log('✅ Módulo de muro de contención inicializado');
    console.log('✅ Cortes A-A y B-B listos');
});

/**
 * Función principal de cálculo (llamada desde el HTML)
 */
function calcularMuroContencion() {
    // Obtener valores de entrada
    const datos = obtenerDatosEntrada();
    
    // Validar datos
    if (!validarDatos(datos)) {
        alert('Por favor ingrese valores válidos');
        return;
    }
    
    // Realizar cálculos
    const resultados = realizarCalculos(datos);
    
    // Mostrar resultados
    MuroResultados.mostrar(resultados);
    
    // Guardar datos para vistas
    datosMuroActual = {
        H: datos.H,
        B: datos.B,
        t_base: datos.t_base,
        t_corona: datos.t_corona,
        h_zapata: datos.h_zapata,
        dist_muro: resultados.dist_muro,
        dist_talon: resultados.dist_talon
    };
    
    // Actualizar visualización 3D
    MuroVisualizacion3D.actualizar(threeScene, {
        H: datos.H,
        B: datos.B,
        t_base: datos.t_base,
        t_corona: datos.t_corona,
        h_zapata: datos.h_zapata,
        Pa: resultados.Pa
    });
}

/**
 * Obtener datos de entrada del formulario
 */
function obtenerDatosEntrada() {
    return {
        tipo: document.getElementById('tipoMuro').value,
        H: parseFloat(document.getElementById('altura').value),
        t_base: parseFloat(document.getElementById('espesorBase').value),
        t_corona: parseFloat(document.getElementById('espesorCorona').value),
        B: parseFloat(document.getElementById('anchoZapata').value),
        h_zapata: parseFloat(document.getElementById('alturaZapata').value),
        phi: parseFloat(document.getElementById('anguloFriccion').value),
        gamma_suelo: parseFloat(document.getElementById('pesoSuelo').value),
        qadm: parseFloat(document.getElementById('qadm').value),
        q: parseFloat(document.getElementById('sobrecarga').value),
        fc: parseFloat(document.getElementById('fc').value),
        fy: parseFloat(document.getElementById('fy').value)
    };
}

/**
 * Validar datos de entrada
 */
function validarDatos(datos) {
    return datos.H > 0 && datos.B > 0 && datos.phi > 0 && datos.gamma_suelo > 0;
}

/**
 * Realizar todos los cálculos del muro
 */
function realizarCalculos(datos) {
    // 1. Calcular empuje activo
    const empuje = MuroCalculos.calcularEmpujeActivo(
        datos.H, 
        datos.phi, 
        datos.gamma_suelo, 
        datos.q
    );
    
    // 2. Calcular pesos
    const pesos = MuroCalculos.calcularPesos(
        datos.H, 
        datos.B, 
        datos.t_base, 
        datos.t_corona, 
        datos.h_zapata, 
        datos.gamma_suelo
    );
    
    // 3. Verificar volteo
    const volteo = MuroCalculos.verificarVolteo(
        pesos.W_muro,
        pesos.W_zapata,
        pesos.W_suelo,
        datos.t_base,
        datos.B,
        datos.H,
        empuje.Pa,
        empuje.h_Pa
    );
    
    // 4. Verificar deslizamiento
    const deslizamiento = MuroCalculos.verificarDeslizamiento(
        pesos.W_total,
        empuje.Pa,
        datos.phi
    );
    
    // 5. Verificar presiones
    const presiones = MuroCalculos.verificarPresiones(
        pesos.W_total,
        datos.B,
        volteo.M_estab,
        volteo.M_volteo,
        datos.qadm
    );
    
    // 6. Diseñar acero del muro
    const aceroMuro = MuroCalculos.disenarAceroMuro(
        datos.H,
        empuje.Ka,
        datos.gamma_suelo,
        datos.t_base,
        datos.fc,
        datos.fy
    );
    
    // 7. Diseñar acero de zapata
    const aceroZapata = MuroCalculos.disenarAceroZapata(
        presiones.q_max,
        pesos.ancho_talon,
        datos.h_zapata,
        datos.fc,
        datos.fy
    );
    
    // Retornar todos los resultados consolidados
    return {
        tipo: datos.tipo,
        H: datos.H,
        B: datos.B,
        t_base: datos.t_base,
        t_corona: datos.t_corona,
        h_zapata: datos.h_zapata,
        Ka: empuje.Ka,
        Pa: empuje.Pa,
        Pa_suelo: empuje.Pa_suelo,
        Pa_sobrecarga: empuje.Pa_sobrecarga,
        W_total: pesos.W_total,
        FS_volteo: volteo.FS_volteo,
        cumple_volteo: volteo.cumple_volteo,
        FS_desl: deslizamiento.FS_desl,
        cumple_desl: deslizamiento.cumple_desl,
        e: presiones.e,
        q_max: presiones.q_max,
        q_min: presiones.q_min,
        qadm: datos.qadm,
        cumple_presion: presiones.cumple_presion,
        As_muro: aceroMuro.As_muro,
        dist_muro: aceroMuro.dist_muro,
        As_talon: aceroZapata.As_talon,
        dist_talon: aceroZapata.dist_talon
    };
}

/**
 * Cambiar entre vistas (3D, Corte A-A, Corte B-B, Solo Acero)
 */
function cambiarVista(vista) {
    vistaActual = vista;
    
    const canvas3d = document.getElementById('canvas3d');
    const canvasCorteA = document.getElementById('canvasCorteA');
    const canvasCorteB = document.getElementById('canvasCorteB');
    const canvasAcero = document.getElementById('canvasAcero');
    const btn3d = document.getElementById('btn3d');
    const btnCorteA = document.getElementById('btnCorteA');
    const btnCorteB = document.getElementById('btnCorteB');
    const btnAcero = document.getElementById('btnAcero');
    
    // Remover clase active de todos
    if (btn3d) btn3d.classList.remove('active');
    if (btnCorteA) btnCorteA.classList.remove('active');
    if (btnCorteB) btnCorteB.classList.remove('active');
    if (btnAcero) btnAcero.classList.remove('active');
    
    if (canvas3d) {
        canvas3d.style.display = 'none';
        canvas3d.classList.remove('active');
    }
    if (canvasCorteA) {
        canvasCorteA.style.display = 'none';
        canvasCorteA.classList.remove('active');
    }
    if (canvasCorteB) {
        canvasCorteB.style.display = 'none';
        canvasCorteB.classList.remove('active');
    }
    if (canvasAcero) {
        canvasAcero.style.display = 'none';
        canvasAcero.classList.remove('active');
    }
    
    if (vista === '3d') {
        if (btn3d) btn3d.classList.add('active');
        if (canvas3d) {
            canvas3d.style.display = 'block';
            canvas3d.classList.add('active');
        }
    } else if (vista === 'corteA') {
        if (btnCorteA) btnCorteA.classList.add('active');
        if (canvasCorteA) {
            canvasCorteA.style.display = 'block';
            canvasCorteA.classList.add('active');
        }
        
        if (datosMuroActual && corteMuroA) {
            setTimeout(() => {
                corteMuroA.dibujarCorteAA(datosMuroActual);
            }, 50);
        }
    } else if (vista === 'corteB') {
        if (btnCorteB) btnCorteB.classList.add('active');
        if (canvasCorteB) {
            canvasCorteB.style.display = 'block';
            canvasCorteB.classList.add('active');
        }
        
        if (datosMuroActual && corteMuroB) {
            setTimeout(() => {
                corteMuroB.dibujarCorteBB(datosMuroActual);
            }, 50);
        }
    } else if (vista === 'acero') {
        if (btnAcero) btnAcero.classList.add('active');
        if (canvasAcero) {
            canvasAcero.style.display = 'block';
            canvasAcero.classList.add('active');
        }
        
        // Inicializar escena de acero si no está inicializada
        if (!MuroAceroVisualizacion.initialized) {
            setTimeout(() => {
                MuroAceroVisualizacion.init();
                
                if (datosMuroActual) {
                    setTimeout(() => {
                        MuroAceroVisualizacion.actualizar(datosMuroActual);
                    }, 100);
                }
            }, 50);
        } else {
            if (datosMuroActual) {
                setTimeout(() => {
                    MuroAceroVisualizacion.actualizar(datosMuroActual);
                }, 50);
            }
        }
    }
}