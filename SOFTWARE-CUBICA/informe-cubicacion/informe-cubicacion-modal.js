/* ========================================
   MODAL INFORME DE CUBICACIÓN
   ======================================== */

function abrirInformeCubicacion() {
    // Guardar estado del plano actual ANTES de generar el informe
    if (window.PlanoManager) {
        window.PlanoManager.saveCurrentPlanoState();
        console.log('💾 Estado del plano actual guardado antes de generar informe');
    }
    
    // Verificar si hay datos
    if (!hayDatosParaInforme()) {
        alert('⚠️ No hay elementos cubicados para generar el informe.\n\nDibuja y completa al menos un elemento en el plano.');
        return;
    }
    
    // Crear modal si no existe
    crearModalInformeCubicacion();
    
    // Generar contenido del informe
    const informe = generarInformeCubicacion();
    generarContenidoInforme(informe);
    
    // Mostrar modal
    const modal = document.getElementById('modalInformeCubicacion');
    if (modal) {
        modal.classList.add('active');
        informeCubicacionActivo = true;
    }
}

function crearModalInformeCubicacion() {
    if (document.getElementById('modalInformeCubicacion')) return;
    
    const modalHTML = `
    <div class="modal" id="modalInformeCubicacion">
        <div class="modal-informe-window">
            <div class="modal-informe-header">
                <div class="modal-informe-title">
                    📊 INFORME DE CUBICACIÓN
                </div>
                <button class="btn-close" onclick="cerrarInformeCubicacion()">✕</button>
            </div>
            
            <div class="informe-container" id="informeContainer">
                <!-- Aquí se genera el contenido dinámicamente -->
            </div>
            
            <div class="modal-informe-actions">
                <button class="btn-informe btn-informe-excel" onclick="exportarInformeExcel()">
                    📥 Exportar Excel
                </button>
                <button class="btn-informe btn-informe-pdf" onclick="exportarInformePDF()">
                    📄 Exportar PDF
                </button>
                <button class="btn-informe btn-informe-cerrar" onclick="cerrarInformeCubicacion()">
                    ✕ Cerrar
                </button>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function generarContenidoInforme(informe) {
    const container = document.getElementById('informeContainer');
    if (!container) return;
    
    // Obtener datos del proyecto
    const nombreProyecto = document.getElementById('projectName')?.value || 'SIN NOMBRE';
    const codigoProyecto = document.getElementById('projectCode')?.value || 'SIN CÓDIGO';
    
    let html = `
    <div class="informe-hoja">
        <div class="informe-header">
            <h1>INFORME DE CUBICACIÓN</h1>
            <div class="proyecto-info">
                <div><strong>Proyecto:</strong> ${nombreProyecto}</div>
                <div><strong>Código:</strong> ${codigoProyecto}</div>
                <div><strong>Fecha:</strong> ${datosProyecto.fecha}</div>
                <div><strong>Sistema:</strong> TRUKILLO</div>
            </div>
        </div>
    `;
    
    // 1. MUROS DE HORMIGÓN
    if (informe.murosHormigon.length > 0) {
        html += `
        <div class="categoria-section">
            <div class="categoria-titulo">🧱 MUROS DE HORMIGÓN</div>
            <table class="tabla-cubicacion">
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>LARGO (m)</th>
                        <th>ALTURA (m)</th>
                        <th>ESPESOR (m)</th>
                        <th>VOLUMEN (m³)</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        let subtotalVolumen = 0;
        informe.murosHormigon.forEach(muro => {
            const planoInfo = muro.plano ? `<span style="color: #3498db; font-size: 10px;">[${muro.plano}]</span>` : '';
            html += `
                <tr>
                    <td>${muro.nombre} ${planoInfo}</td>
                    <td>${parseFloat(muro.largo).toFixed(2)}</td>
                    <td>${parseFloat(muro.altura).toFixed(2)}</td>
                    <td>${parseFloat(muro.espesor).toFixed(2)}</td>
                    <td>${parseFloat(muro.volumen).toFixed(3)}</td>
                </tr>
            `;
            subtotalVolumen += parseFloat(muro.volumen);
        });
        
        html += `
                    <tr class="subtotal-row">
                        <td colspan="4">SUBTOTAL</td>
                        <td>${subtotalVolumen.toFixed(3)} m³</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }
    
    // 2. MUROS DE ALBAÑILERÍA
    if (informe.murosAlbanileria.length > 0) {
        html += `
        <div class="categoria-section">
            <div class="categoria-titulo">🧱 MUROS DE ALBAÑILERÍA</div>
            <table class="tabla-cubicacion">
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>LARGO (m)</th>
                        <th>ALTURA (m)</th>
                        <th>ESPESOR (m)</th>
                        <th>ÁREA (m²)</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        let subtotalArea = 0;
        informe.murosAlbanileria.forEach(muro => {
            html += `
                <tr>
                    <td>${muro.nombre}</td>
                    <td>${parseFloat(muro.largo).toFixed(2)}</td>
                    <td>${parseFloat(muro.altura).toFixed(2)}</td>
                    <td>${parseFloat(muro.espesor).toFixed(2)}</td>
                    <td>${parseFloat(muro.area).toFixed(2)}</td>
                </tr>
            `;
            subtotalArea += parseFloat(muro.area);
        });
        
        html += `
                    <tr class="subtotal-row">
                        <td colspan="4">SUBTOTAL</td>
                        <td>${subtotalArea.toFixed(2)} m²</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }
    
    // 3. TABIQUERÍA INTERIOR
    if (informe.tabiquesInteriores.length > 0) {
        html += `
        <div class="categoria-section">
            <div class="categoria-titulo">🏠 TABIQUERÍA INTERIOR</div>
            <table class="tabla-cubicacion">
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>ESPESOR (m)</th>
                        <th>LARGO (m)</th>
                        <th>ALTURA (m)</th>
                        <th>PIES DERECHOS</th>
                        <th>SOLERAS (m)</th>
                        <th>PLACAS (m²)</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        let subtotalPlacas = 0;
        informe.tabiquesInteriores.forEach(tabique => {
            html += `
                <tr>
                    <td>${tabique.nombre}</td>
                    <td>${parseFloat(tabique.espesor).toFixed(2)}</td>
                    <td>${parseFloat(tabique.largo).toFixed(2)}</td>
                    <td>${parseFloat(tabique.altura).toFixed(2)}</td>
                    <td>${tabique.cantidadPiesDerechos}</td>
                    <td>${parseFloat(tabique.totalSoleras).toFixed(2)}</td>
                    <td>${parseFloat(tabique.areaPlacas).toFixed(2)}</td>
                </tr>
            `;
            subtotalPlacas += parseFloat(tabique.areaPlacas);
        });
        
        html += `
                    <tr class="subtotal-row">
                        <td colspan="6">SUBTOTAL</td>
                        <td>${subtotalPlacas.toFixed(2)} m²</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }
    
    // 4. TABIQUERÍA EXTERIOR
    if (informe.tabiquesExteriores.length > 0) {
        html += `
        <div class="categoria-section">
            <div class="categoria-titulo">🌤️ TABIQUERÍA EXTERIOR</div>
            <table class="tabla-cubicacion">
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>ESPESOR (m)</th>
                        <th>LARGO (m)</th>
                        <th>ALTURA (m)</th>
                        <th>PIES DERECHOS</th>
                        <th>SOLERAS (m)</th>
                        <th>PLACAS (m²)</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        let subtotalPlacas = 0;
        informe.tabiquesExteriores.forEach(tabique => {
            html += `
                <tr>
                    <td>${tabique.nombre}</td>
                    <td>${parseFloat(tabique.espesor).toFixed(2)}</td>
                    <td>${parseFloat(tabique.largo).toFixed(2)}</td>
                    <td>${parseFloat(tabique.altura).toFixed(2)}</td>
                    <td>${tabique.cantidadPiesDerechos}</td>
                    <td>${parseFloat(tabique.totalSoleras).toFixed(2)}</td>
                    <td>${parseFloat(tabique.areaPlacas).toFixed(2)}</td>
                </tr>
            `;
            subtotalPlacas += parseFloat(tabique.areaPlacas);
        });
        
        html += `
                    <tr class="subtotal-row">
                        <td colspan="6">SUBTOTAL</td>
                        <td>${subtotalPlacas.toFixed(2)} m²</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }
    
    // 5. MUROS ESTRUCTURALES
    if (informe.murosEstructurales.length > 0) {
        html += `
        <div class="categoria-section">
            <div class="categoria-titulo">🗿️ MUROS ESTRUCTURALES</div>
            <table class="tabla-cubicacion">
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>HORMIGÓN (m³)</th>
                        <th>CEMENTO (scs)</th>
                        <th>ARENA (m³)</th>
                        <th>RIPIO (m³)</th>
                        <th>FIERRO (kg)</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        let subtotalHormigon = 0, subtotalCemento = 0, subtotalFierro = 0;
        informe.murosEstructurales.forEach(muro => {
            html += `
                <tr>
                    <td>${muro.nombre}</td>
                    <td>${parseFloat(muro.volumenHormigon).toFixed(2)}</td>
                    <td>${parseFloat(muro.cemento).toFixed(1)}</td>
                    <td>${parseFloat(muro.arena).toFixed(2)}</td>
                    <td>${parseFloat(muro.ripio).toFixed(2)}</td>
                    <td>${parseFloat(muro.totalFierro).toFixed(1)}</td>
                </tr>
            `;
            subtotalHormigon += parseFloat(muro.volumenHormigon);
            subtotalCemento += parseFloat(muro.cemento);
            subtotalFierro += parseFloat(muro.totalFierro);
        });
        
        html += `
                    <tr class="subtotal-row">
                        <td>SUBTOTAL</td>
                        <td>${subtotalHormigon.toFixed(2)} m³</td>
                        <td>${subtotalCemento.toFixed(1)} scs</td>
                        <td colspan="2">-</td>
                        <td>${subtotalFierro.toFixed(1)} kg</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }
    
    // 6. RADIERES
    if (informe.radieres.length > 0) {
        html += `
        <div class="categoria-section">
            <div class="categoria-titulo">🔲 RADIERES</div>
            <table class="tabla-cubicacion">
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>ÁREA (m²)</th>
                        <th>VOLUMEN (m³)</th>
                        <th>CEMENTO (scs)</th>
                        <th>ARENA (m³)</th>
                        <th>RIPIO (m³)</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        let subtotalArea = 0, subtotalVolumen = 0, subtotalCemento = 0, subtotalArena = 0, subtotalRipio = 0;
        informe.radieres.forEach(radier => {
            html += `
                <tr>
                    <td>${radier.nombre}</td>
                    <td>${parseFloat(radier.area).toFixed(2)}</td>
                    <td>${parseFloat(radier.volumen).toFixed(3)}</td>
                    <td>${radier.cemento || 0}</td>
                    <td>${parseFloat(radier.arena || 0).toFixed(2)}</td>
                    <td>${parseFloat(radier.ripio || 0).toFixed(2)}</td>
                </tr>
            `;
            subtotalArea += parseFloat(radier.area);
            subtotalVolumen += parseFloat(radier.volumen);
            subtotalCemento += parseFloat(radier.cemento || 0);
            subtotalArena += parseFloat(radier.arena || 0);
            subtotalRipio += parseFloat(radier.ripio || 0);
        });
        
        html += `
                    <tr class="subtotal-row">
                        <td>SUBTOTAL</td>
                        <td>${subtotalArea.toFixed(2)} m²</td>
                        <td>${subtotalVolumen.toFixed(3)} m³</td>
                        <td>${subtotalCemento} scs</td>
                        <td>${subtotalArena.toFixed(2)} m³</td>
                        <td>${subtotalRipio.toFixed(2)} m³</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }
    
    // RESUMEN GENERAL
    html += `
        <div class="resumen-general">
            <h3>📊 RESUMEN GENERAL</h3>
            <div class="resumen-grid">
                <div class="resumen-item">
                    <span>Total Hormigón:</span>
                    <strong>${informe.totales.volumenHormigon.toFixed(3)} m³</strong>
                </div>
                <div class="resumen-item">
                    <span>Total Cemento:</span>
                    <strong>${informe.totales.cementoTotal.toFixed(1)} sacos</strong>
                </div>
                <div class="resumen-item">
                    <span>Total Fierro:</span>
                    <strong>${informe.totales.fierroTotal.toFixed(1)} kg</strong>
                </div>
                <div class="resumen-item">
                    <span>Total Albañilería:</span>
                    <strong>${informe.totales.areaAlbanileria.toFixed(2)} m²</strong>
                </div>
                <div class="resumen-item">
                    <span>Total Tabiques Interior:</span>
                    <strong>${informe.totales.areaTabiquesInteriores.toFixed(2)} m²</strong>
                </div>
                <div class="resumen-item">
                    <span>Total Tabiques Exterior:</span>
                    <strong>${informe.totales.areaTabiquesExteriores.toFixed(2)} m²</strong>
                </div>
                <div class="resumen-item">
                    <span>Total Radier:</span>
                    <strong>${informe.totales.areaRadier.toFixed(2)} m²</strong>
                </div>
            </div>
        </div>
    `;
    
    // PIE DE PÁGINA
    html += `
        <div class="informe-footer">
            Generado por TRUKILLO - Sistema de Cubicación Profesional | ${datosProyecto.fecha}
        </div>
    </div>
    `;
    
    container.innerHTML = html;
}

function cerrarInformeCubicacion() {
    const modal = document.getElementById('modalInformeCubicacion');
    if (modal) {
        modal.classList.remove('active');
        informeCubicacionActivo = false;
    }
}