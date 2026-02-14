// MÓDULO 03: NORMATIVA CHILENA - CONTENIDO COMPLETO MOP Y SERVIU

document.addEventListener('DOMContentLoaded', () => {
    // Cargar contenido MOP (original)
    const container = document.getElementById('module-content');
    if (container) {
        container.innerHTML = generarContenido();
    }
    
    // Inicializar pestañas y cargar contenido SERVIU (nuevo)
    inicializarPestanasSERVIU();
    cargarContenidoSERVIU();
});

// ========== CÓDIGO ORIGINAL MOP (NO MODIFICADO) ==========

function generarContenido() {
    return `
        <div class="section-header">
            <span class="icon">📋</span>
            <h2>Normativa Chilena de Pavimentación</h2>
        </div>
        
        <div class="alert alert-info">
            <span>⚖️</span>
            <div>
                <strong>Marco Regulatorio</strong>
                <p>La pavimentación en Chile se rige por el Manual de Carreteras del MOP (Ministerio de Obras Públicas) y normas técnicas del Instituto Nacional de Normalización (INN).</p>
            </div>
        </div>

        ${generarManualCarreteras()}
        ${generarNormasINN()}
        ${generarProcesoDiseno()}
        ${generarCatalogoEstructuras()}
        ${generarEspecificacionesMateriales()}
    `;
}

function generarManualCarreteras() {
    return `
        <div style="margin-top: 2rem;">
            <div class="section-header">
                <span class="icon">📘</span>
                <h2>Manual de Carreteras MOP</h2>
            </div>
            
            <div class="card-grid">
                <div class="card">
                    <h3 style="color: #2563eb;">Volumen 3: MC-V3 (Diseño)</h3>
                    <p><strong>📖 Título:</strong> Instrucciones y Criterios de Diseño</p>
                    <p><strong>🎯 Aplicación:</strong> Diseño estructural de pavimentos</p>
                    
                    <div style="margin-top: 1rem;">
                        <strong>Contenido principal:</strong>
                        <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                            <li><strong>Capítulo 3.400:</strong> Método AASHTO 93 para diseño</li>
                            <li><strong>Catálogo de estructuras:</strong> Según tráfico y CBR</li>
                            <li><strong>Parámetros de diseño:</strong> Confiabilidad, serviciabilidad</li>
                            <li><strong>Consideraciones climáticas:</strong> Por zona geográfica</li>
                        </ul>
                    </div>
                    
                    <div style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 8px;">
                        <strong>🔢 Método AASHTO 93:</strong>
                        <p style="margin-top: 0.5rem; font-size: 0.9rem;">
                            SN = Número Estructural requerido<br>
                            W₁₈ = ESALs de diseño (8.2 ton)<br>
                            ZR = Confiabilidad (90-99%)<br>
                            So = Desviación estándar (0.35-0.45)<br>
                            MR = Módulo resiliente subrasante
                        </p>
                    </div>
                </div>
                
                <div class="card">
                    <h3 style="color: #2563eb;">Volumen 8: MC-V8 (Construcción)</h3>
                    <p><strong>📖 Título:</strong> Especificaciones y Métodos de Muestreo</p>
                    <p><strong>🎯 Aplicación:</strong> Control de obra y aceptación</p>
                    
                    <div style="margin-top: 1rem;">
                        <strong>Especificaciones clave:</strong>
                        <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                            <li><strong>8.302.1:</strong> Bases estabilizadas con cemento</li>
                            <li><strong>8.303.2:</strong> Mezclas asfálticas en caliente</li>
                            <li><strong>8.304.1:</strong> Pavimentos de hormigón</li>
                            <li><strong>8.201.3:</strong> Subbase granular</li>
                        </ul>
                    </div>
                    
                    <div style="margin-top: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px;">
                        <strong>⚠️ Tolerancias de Construcción:</strong>
                        <p style="margin-top: 0.5rem; font-size: 0.9rem;">
                            Espesor: ±10% (flexible), ±5% (rígido)<br>
                            Densidad: ≥95% Proctor (subrasante)<br>
                            Densidad asfalto: ≥97% Marshall<br>
                            Resistencia hormigón: ≥100% f'c a 28 días
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generarNormasINN() {
    return `
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">📏</span>
                <h2>Normas INN (Instituto Nacional de Normalización)</h2>
            </div>
            
            <div class="card-grid">
                <div class="card">
                    <h3 style="color: #16a34a;">NCh 148 - Cemento</h3>
                    <p><strong>Título:</strong> Cemento - Terminología, clasificación y especificaciones</p>
                    <p><strong>Aplicación:</strong> Pavimentos rígidos y bases tratadas</p>
                    <p style="margin-top: 1rem;"><strong>Tipos de cemento:</strong></p>
                    <ul style="padding-left: 1.2rem;">
                        <li>Grado Corriente: Uso general</li>
                        <li>Grado Alta Resistencia: Pavimentos</li>
                        <li>Resistencia mínima: 25-45 MPa (7-28 días)</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3 style="color: #16a34a;">NCh 163 - Áridos</h3>
                    <p><strong>Título:</strong> Áridos para morteros y hormigones</p>
                    <p><strong>Aplicación:</strong> Control de agregados pétreos</p>
                    <p style="margin-top: 1rem;"><strong>Requisitos:</strong></p>
                    <ul style="padding-left: 1.2rem;">
                        <li>Granulometría según banda especificada</li>
                        <li>Desgaste Los Ángeles < 35%</li>
                        <li>Caras fracturadas ≥ 75%</li>
                        <li>Material fino < 3%</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3 style="color: #16a34a;">NCh 1117 - Hormigón</h3>
                    <p><strong>Título:</strong> Hormigón - Preparación y curado de probetas</p>
                    <p><strong>Aplicación:</strong> Ensayos de resistencia</p>
                    <p style="margin-top: 1rem;"><strong>Procedimiento:</strong></p>
                    <ul style="padding-left: 1.2rem;">
                        <li>Probetas cilíndricas 15×30 cm</li>
                        <li>Curado húmedo 7-28 días</li>
                        <li>Ensayo compresión según NCh 1037</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3 style="color: #16a34a;">NCh 1852 - CBR</h3>
                    <p><strong>Título:</strong> Relación soporte California (CBR)</p>
                    <p><strong>Aplicación:</strong> Diseño de pavimentos</p>
                    <p style="margin-top: 1rem;"><strong>Interpretación CBR:</strong></p>
                    <ul style="padding-left: 1.2rem;">
                        <li>CBR < 5%: Subrasante pobre</li>
                        <li>CBR 5-10%: Subrasante regular</li>
                        <li>CBR 10-20%: Subrasante buena</li>
                        <li>CBR > 20%: Subrasante excelente</li>
                        <li>CBR > 80%: Apto para base</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function generarProcesoDiseno() {
    return `
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">⚙️</span>
                <h2>Proceso de Diseño según MC-V3</h2>
            </div>
            
            <div class="alert alert-warning">
                <span>📋</span>
                <div>
                    <strong>6 Etapas del Diseño de Pavimentos</strong>
                    <p>Metodología oficial MOP para diseño estructural de pavimentos nuevos</p>
                </div>
            </div>
            
            <div class="card-grid">
                <div class="card">
                    <h3>1. Estudio de Tráfico</h3>
                    <p><strong>Objetivo:</strong> Determinar ESALs de diseño</p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Conteo clasificado vehicular (7 días)</li>
                        <li>Pesaje de ejes (camiones)</li>
                        <li>Factor de equivalencia (LEF)</li>
                        <li>Proyección 20 años (tasa crecimiento 3-5%)</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3>2. Estudio de Suelos</h3>
                    <p><strong>Objetivo:</strong> Caracterizar subrasante</p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Calicatas cada 500-1000 m</li>
                        <li>Ensayos: CBR, Proctor, Granulometría</li>
                        <li>Clasificación AASHTO y USCS</li>
                        <li>CBR de diseño (percentil 75-85%)</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3>3. Selección de Estructura</h3>
                    <p><strong>Método:</strong> Catálogo MC-V3 o AASHTO 93</p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Ingresar ESALs y CBR al catálogo</li>
                        <li>Definir confiabilidad (R = 90-95%)</li>
                        <li>Elegir flexible, rígido o semirrígido</li>
                        <li>Considerar disponibilidad de materiales</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3>4. Diseño de Mezclas</h3>
                    <p><strong>Laboratorio:</strong> Formulación óptima</p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Marshall (asfalto): % óptimo ligante</li>
                        <li>Dosificación hormigón: f'c objetivo</li>
                        <li>Ensayos durabilidad (desgaste, absorción)</li>
                        <li>Verificación especificaciones MC-V8</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3>5. Proyecto de Ingeniería</h3>
                    <p><strong>Documentos:</strong> Planos y especificaciones</p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Planta general y perfiles longitudinales</li>
                        <li>Secciones tipo con espesores</li>
                        <li>Detalles constructivos (juntas, drenaje)</li>
                        <li>Especificaciones técnicas especiales</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function generarCatalogoEstructuras() {
    return `
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">📊</span>
                <h2>Catálogo de Estructuras MC-V3</h2>
            </div>
            
            <p style="margin-bottom: 1.5rem;">
                El Manual de Carreteras proporciona estructuras tipo según nivel de tráfico y CBR de subrasante.
            </p>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Tráfico (ESAL)</th>
                        <th>CBR Subrasante</th>
                        <th>Carpeta Asfáltica</th>
                        <th>Base Granular</th>
                        <th>Subbase</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>T1:</strong> < 10⁵</td>
                        <td>5-10%</td>
                        <td>5 cm</td>
                        <td>15 cm</td>
                        <td>20 cm</td>
                    </tr>
                    <tr>
                        <td><strong>T1:</strong> < 10⁵</td>
                        <td>10-20%</td>
                        <td>5 cm</td>
                        <td>15 cm</td>
                        <td>15 cm</td>
                    </tr>
                    <tr>
                        <td><strong>T2:</strong> 10⁵-10⁶</td>
                        <td>5-10%</td>
                        <td>7 cm</td>
                        <td>20 cm</td>
                        <td>25 cm</td>
                    </tr>
                    <tr>
                        <td><strong>T2:</strong> 10⁵-10⁶</td>
                        <td>10-20%</td>
                        <td>7 cm</td>
                        <td>20 cm</td>
                        <td>20 cm</td>
                    </tr>
                    <tr>
                        <td><strong>T3:</strong> 10⁶-10⁷</td>
                        <td>5-10%</td>
                        <td>10 cm</td>
                        <td>25 cm</td>
                        <td>30 cm</td>
                    </tr>
                    <tr>
                        <td><strong>T3:</strong> 10⁶-10⁷</td>
                        <td>10-20%</td>
                        <td>10 cm</td>
                        <td>25 cm</td>
                        <td>25 cm</td>
                    </tr>
                    <tr>
                        <td><strong>T4:</strong> > 10⁷</td>
                        <td>Variable</td>
                        <td>12-15 cm</td>
                        <td>30 cm</td>
                        <td>30 cm</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="alert alert-info" style="margin-top: 1.5rem;">
                <span>💡</span>
                <div>
                    <strong>Nota técnica:</strong>
                    <p>Para CBR < 5%, se requiere mejoramiento de subrasante. Para tráfico > 10⁷ ESAL, considerar pavimento rígido o semirrígido.</p>
                </div>
            </div>
        </div>
    `;
}

function generarEspecificacionesMateriales() {
    return `
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">🧪</span>
                <h2>Especificaciones de Materiales</h2>
            </div>
            
            <div class="card-grid">
                <div class="card">
                    <h3 style="color: #2563eb;">Asfaltos Convencionales</h3>
                    <table style="width: 100%; margin-top: 1rem; font-size: 0.9rem;">
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;"><strong>CA 40-50</strong></td>
                            <td style="padding: 0.5rem;">Tráfico muy pesado, climas cálidos</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;"><strong>CA 60-70</strong></td>
                            <td style="padding: 0.5rem;">Uso general, más común en Chile</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem;"><strong>CA 85-100</strong></td>
                            <td style="padding: 0.5rem;">Climas fríos, menor tráfico</td>
                        </tr>
                    </table>
                </div>
                
                <div class="card">
                    <h3 style="color: #2563eb;">Asfaltos Modificados</h3>
                    <ul style="padding-left: 1.2rem; margin-top: 1rem;">
                        <li><strong>SBS (Caucho):</strong> Elasticidad, resiste ahuellamiento</li>
                        <li><strong>EVA (Polímero):</strong> Durabilidad, tráfico pesado</li>
                        <li><strong>Crumb Rubber:</strong> Caucho reciclado, sostenible</li>
                    </ul>
                    <p style="margin-top: 1rem; padding: 0.75rem; background: #fef3c7; border-radius: 6px; font-size: 0.9rem;">
                        <strong>Uso:</strong> Autopistas urbanas, zonas climáticas extremas
                    </p>
                </div>
                
                <div class="card">
                    <h3 style="color: #2563eb;">Grados PG (Performance Grade)</h3>
                    <p style="margin-top: 0.5rem;">Sistema de clasificación por temperatura:</p>
                    <ul style="padding-left: 1.2rem; margin-top: 1rem;">
                        <li><strong>PG 70-22:</strong> Norte de Chile (desierto)</li>
                        <li><strong>PG 64-22:</strong> Zona central (Santiago)</li>
                        <li><strong>PG 58-28:</strong> Zona sur (lluvioso)</li>
                        <li><strong>PG 58-34:</strong> Zona austral (frío extremo)</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3 style="color: #2563eb;">Hormigón para Pavimentos</h3>
                    <table style="width: 100%; margin-top: 1rem; font-size: 0.9rem;">
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;"><strong>H-30</strong></td>
                            <td style="padding: 0.5rem;">Tráfico ligero-medio</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;"><strong>H-35</strong></td>
                            <td style="padding: 0.5rem;">Tráfico medio-pesado</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem;"><strong>H-40</strong></td>
                            <td style="padding: 0.5rem;">Tráfico muy pesado (autopistas)</td>
                        </tr>
                    </table>
                    <p style="margin-top: 1rem; font-size: 0.9rem;">
                        <strong>Requisitos adicionales:</strong> Módulo de rotura ≥ 4.5 MPa, Asentamiento 2-5 cm
                    </p>
                </div>
            </div>
        </div>
    `;
}

// ========== NUEVO CÓDIGO SERVIU ==========

function inicializarPestanasSERVIU() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Remover active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Activar seleccionado
            btn.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
}

function cargarContenidoSERVIU() {
    const container = document.getElementById('serviu-content');
    if (!container || !moduleData.serviu) return;

    const serviu = moduleData.serviu;

    let html = `
        <div class="serviu-header">
            <h2>${serviu.icono} ${serviu.nombre}</h2>
            <p>${serviu.subtitulo}</p>
            <p>${serviu.descripcion}</p>
        </div>

        <h3 style="color: #047857; font-size: 1.8rem; margin-bottom: 1.5rem;">📚 Normas Principales SERVIU</h3>
        <div class="normas-grid">
    `;

    // Normas principales
    serviu.normasPrincipales.forEach(norma => {
        html += `
            <div class="norma-card">
                <h3>${norma.nombre}</h3>
                <span class="entidad">${norma.entidad}</span>
                <p>${norma.descripcion}</p>
                ${norma.contenido ? `
                    <ul>
                        ${norma.contenido.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                ` : ''}
                ${norma.aplicacion ? `<p><strong>Aplicación:</strong> ${norma.aplicacion}</p>` : ''}
                ${norma.vigencia ? `<span class="vigencia">✅ ${norma.vigencia}</span>` : ''}
            </div>
        `;
    });

    html += `</div>`;

    // Tipos de pavimento urbano
    html += `
        <h3 style="color: #047857; font-size: 1.8rem; margin: 2rem 0 1.5rem 0;">🛣️ Tipos de Pavimento Urbano</h3>
        <div class="tipos-pavimento-grid">
    `;

    serviu.tiposPavimentoUrbano.forEach(tipo => {
        html += `
            <div class="tipo-pavimento-card">
                <h4>${tipo.tipo}</h4>
                <span class="uso-badge">${tipo.uso}</span>
                <p><strong>Estructura:</strong> ${tipo.estructura}</p>
                <p><strong>Ventajas:</strong> ${tipo.ventajas}</p>
                <p><strong>Aplicación:</strong> ${tipo.aplicacion}</p>
            </div>
        `;
    });

    html += `</div>`;

    // Programas viales
    html += `
        <h3 style="color: #047857; font-size: 1.8rem; margin: 2rem 0 1.5rem 0;">🚧 Programas Viales SERVIU</h3>
        <div class="programas-serviu-grid">
    `;

    serviu.programasViales.forEach(programa => {
        html += `
            <div class="programa-serviu-card">
                <h4>${programa.nombre}</h4>
                <p>${programa.descripcion}</p>
                ${programa.aportes ? `<p><strong>Aportes:</strong> ${programa.aportes}</p>` : ''}
                ${programa.financiamiento ? `<p><strong>Financiamiento:</strong> ${programa.financiamiento}</p>` : ''}
                ${programa.incluye ? `<p><strong>Incluye:</strong> ${programa.incluye}</p>` : ''}
                ${programa.tipos ? `<p><strong>Tipos:</strong> ${programa.tipos.join(', ')}</p>` : ''}
                ${programa.beneficio ? `<p><em>💡 ${programa.beneficio}</em></p>` : ''}
                ${programa.aplicacion ? `<p><em>📍 ${programa.aplicacion}</em></p>` : ''}
                ${programa.meta2026 ? `<p><strong>🎯 Meta 2026:</strong> ${programa.meta2026}</p>` : ''}
            </div>
        `;
    });

    html += `</div>`;

    // Proyectos de referencia
    html += `
        <h3 style="color: #047857; font-size: 1.8rem; margin: 2rem 0 1.5rem 0;">🏗️ Proyectos de Referencia SERVIU</h3>
        <div class="proyectos-serviu-grid">
    `;

    serviu.proyectosReferencia.forEach(proyecto => {
        html += `
            <div class="proyecto-serviu-card">
                <span class="ciudad-badge">📍 ${proyecto.ciudad}</span>
                <h4>${proyecto.proyecto}</h4>
                ${proyecto.extension ? `<p><strong>Extensión:</strong> ${proyecto.extension}</p>` : ''}
                ${proyecto.alcance ? `<p><strong>Alcance:</strong> ${proyecto.alcance}</p>` : ''}
                <p><strong>Tipo:</strong> ${proyecto.tipo}</p>
                ${proyecto.año ? `<p><strong>Año:</strong> ${proyecto.año}</p>` : ''}
                ${proyecto.periodo ? `<p><strong>Período:</strong> ${proyecto.periodo}</p>` : ''}
                ${proyecto.caracteristica ? `<p><em>✨ ${proyecto.caracteristica}</em></p>` : ''}
                ${proyecto.beneficiarios ? `<p><strong>Beneficiarios:</strong> ${proyecto.beneficiarios}</p>` : ''}
            </div>
        `;
    });

    html += `</div>`;

    container.innerHTML = html;
    console.log('✅ Contenido SERVIU cargado correctamente');
}