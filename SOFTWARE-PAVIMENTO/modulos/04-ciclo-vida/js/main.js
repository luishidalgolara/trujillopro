// MÓDULO 04: CICLO DE VIDA - CONTENIDO COMPLETO
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('module-content');
    if (!container) return;
    container.innerHTML = generarContenido();
});

function generarContenido() {
    return `
        <div class="section-header">
            <span class="icon">♻️</span>
            <h2>Ciclo de Vida de Pavimentos</h2>
        </div>
        
        <div class="alert alert-info">
            <span>📊</span>
            <div>
                <strong>Concepto de Ciclo de Vida</strong>
                <p>Análisis completo desde diseño hasta rehabilitación, considerando costos totales y desempeño a largo plazo.</p>
            </div>
        </div>

        ${generarFasesCiclo()}
        ${generarComparacionTipos()}
        ${generarCostoCicloVida()}
        ${generarMantenimientoPreventivo()}
    `;
}

function generarFasesCiclo() {
    return `
        <div style="margin-top: 2rem;">
            <div class="section-header">
                <span class="icon">🔄</span>
                <h2>Fases del Ciclo de Vida</h2>
            </div>
            
            <div class="card-grid">
                <div class="card" style="border-left: 4px solid #3b82f6;">
                    <h3 style="color: #2563eb;">1. Diseño y Proyecto</h3>
                    <p><strong>⏱️ Duración:</strong> 6-12 meses</p>
                    <p><strong>💰 Costo:</strong> 3-5% del total</p>
                    <p><strong>📋 Actividades:</strong></p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Estudios de tráfico (TMDA, ESAL)</li>
                        <li>Estudios geotécnicos (CBR, clasificación)</li>
                        <li>Diseño estructural (AASHTO 93)</li>
                        <li>Diseño de mezclas y especificaciones</li>
                        <li>Planos constructivos y presupuesto</li>
                    </ul>
                    <p style="margin-top: 1rem; padding: 0.75rem; background: #eff6ff; border-radius: 6px;">
                        <strong>✨ Impacto:</strong> Un buen diseño puede extender la vida útil en 30-50%
                    </p>
                </div>
                
                <div class="card" style="border-left: 4px solid #10b981;">
                    <h3 style="color: #059669;">2. Construcción</h3>
                    <p><strong>⏱️ Duración:</strong> 12-24 meses</p>
                    <p><strong>💰 Costo:</strong> 70-80% del total</p>
                    <p><strong>📋 Etapas:</strong></p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Preparación terreno y movimiento tierras</li>
                        <li>Compactación subrasante (≥95% Proctor)</li>
                        <li>Construcción subbase y base</li>
                        <li>Imprimación y riego de liga</li>
                        <li>Colocación carpeta/losa</li>
                        <li>Curado, juntas, señalización</li>
                    </ul>
                    <p style="margin-top: 1rem; padding: 0.75rem; background: #d1fae5; border-radius: 6px;">
                        <strong>⚠️ Crítico:</strong> Control de calidad estricto en esta fase
                    </p>
                </div>
                
                <div class="card" style="border-left: 4px solid #f59e0b;">
                    <h3 style="color: #d97706;">3. Operación y Uso</h3>
                    <p><strong>⏱️ Duración:</strong> Variable según tipo</p>
                    <p><strong>💰 Costo:</strong> Bajo (vigilancia)</p>
                    <p><strong>📊 Monitoreo:</strong></p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Inspecciones visuales periódicas</li>
                        <li>Medición IRI (rugosidad)</li>
                        <li>Evaluación PCI (condición)</li>
                        <li>Deflectometría (capacidad estructural)</li>
                    </ul>
                    <p style="margin-top: 1rem;"><strong>Vida útil típica Chile:</strong></p>
                    <ul style="padding-left: 1.2rem;">
                        <li>Flexible: 15-20 años</li>
                        <li>Rígido: 30-40 años</li>
                        <li>Semirrígido: 20-25 años</li>
                    </ul>
                </div>
                
                <div class="card" style="border-left: 4px solid #8b5cf6;">
                    <h3 style="color: #7c3aed;">4. Mantenimiento Preventivo</h3>
                    <p><strong>⏱️ Inicio:</strong> Años 5-10</p>
                    <p><strong>💰 Costo:</strong> 5-10% del inicial</p>
                    <p><strong>🔧 Actividades:</strong></p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Sellado de fisuras (< 3mm)</li>
                        <li>Parcheo superficial puntual</li>
                        <li>Riego neblina rejuvenecedor</li>
                        <li>Micro-fresado superficial</li>
                        <li>Limpieza y mantenimiento drenajes</li>
                    </ul>
                    <p style="margin-top: 1rem; padding: 0.75rem; background: #f5f3ff; border-radius: 6px;">
                        <strong>💡 Beneficio:</strong> Extiende vida útil 5-7 años adicionales
                    </p>
                </div>
                
                <div class="card" style="border-left: 4px solid #ec4899;">
                    <h3 style="color: #db2777;">5. Rehabilitación</h3>
                    <p><strong>⏱️ Momento:</strong> Años 15-20</p>
                    <p><strong>💰 Costo:</strong> 40-60% del inicial</p>
                    <p><strong>🔨 Opciones:</strong></p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li><strong>Recarpeteo:</strong> Capa 5-10cm nueva</li>
                        <li><strong>Reciclado in-situ:</strong> RAP + emulsión</li>
                        <li><strong>Whitetopping:</strong> Losa sobre asfalto</li>
                        <li><strong>Fresado + recarpeteo:</strong> Más común</li>
                    </ul>
                    <p style="margin-top: 1rem;"><strong>Criterio decisión:</strong></p>
                    <p style="font-size: 0.9rem;">PCI < 55 o IRI > 4 m/km requiere rehabilitación</p>
                </div>
                
                <div class="card" style="border-left: 4px solid #ef4444;">
                    <h3 style="color: #dc2626;">6. Reconstrucción</h3>
                    <p><strong>⏱️ Momento:</strong> Años 20-40</p>
                    <p><strong>💰 Costo:</strong> 80-100% del inicial</p>
                    <p><strong>🏗️ Proceso:</strong></p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Demolición pavimento existente</li>
                        <li>Evaluación y mejora subrasante</li>
                        <li>Nuevo diseño estructural</li>
                        <li>Construcción completa nueva</li>
                    </ul>
                    <p style="margin-top: 1rem; padding: 0.75rem; background: #fee2e2; border-radius: 6px;">
                        <strong>⚠️ Indica:</strong> Falla estructural completa, PCI < 25
                    </p>
                </div>
            </div>
        </div>
    `;
}

function generarComparacionTipos() {
    return `
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">⚖️</span>
                <h2>Comparación por Tipo de Pavimento</h2>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Fase</th>
                        <th>Flexible</th>
                        <th>Rígido</th>
                        <th>Semirrígido</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Diseño</strong></td>
                        <td>4-6 meses</td>
                        <td>6-9 meses</td>
                        <td>5-7 meses</td>
                    </tr>
                    <tr>
                        <td><strong>Construcción</strong></td>
                        <td>Rápida (días)</td>
                        <td>Lenta (28 días curado)</td>
                        <td>Media (7-14 días)</td>
                    </tr>
                    <tr>
                        <td><strong>Vida útil</strong></td>
                        <td>15-20 años</td>
                        <td>30-40 años</td>
                        <td>20-25 años</td>
                    </tr>
                    <tr>
                        <td><strong>Mantenimiento</strong></td>
                        <td>Frecuente (3-5 años)</td>
                        <td>Bajo (10-15 años)</td>
                        <td>Moderado (5-8 años)</td>
                    </tr>
                    <tr>
                        <td><strong>Rehabilitación</strong></td>
                        <td>Año 15-18</td>
                        <td>Año 30-35</td>
                        <td>Año 20-22</td>
                    </tr>
                    <tr>
                        <td><strong>Reconstrucción</strong></td>
                        <td>Año 20-25</td>
                        <td>Año 40-50</td>
                        <td>Año 25-30</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function generarCostoCicloVida() {
    return `
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">💰</span>
                <h2>Análisis de Costo de Ciclo de Vida</h2>
            </div>
            
            <div class="alert alert-warning">
                <span>📈</span>
                <div>
                    <strong>Costo Total de Propiedad</strong>
                    <p>Incluye inversión inicial, mantenimiento, rehabilitación y valor residual a 20-30 años.</p>
                </div>
            </div>
            
            <div class="card-grid" style="margin-top: 1.5rem;">
                <div class="card">
                    <h3 style="color: #2563eb;">Pavimento Flexible</h3>
                    <p><strong>Período análisis:</strong> 20 años</p>
                    
                    <table style="width: 100%; margin-top: 1rem; font-size: 0.9rem;">
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Construcción inicial</td>
                            <td style="padding: 0.5rem; text-align: right;"><strong>$30.000/m²</strong></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Mantenimiento (5 años)</td>
                            <td style="padding: 0.5rem; text-align: right;">$2.000/m²</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Mantenimiento (10 años)</td>
                            <td style="padding: 0.5rem; text-align: right;">$2.500/m²</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Rehabilitación (15 años)</td>
                            <td style="padding: 0.5rem; text-align: right;">$18.000/m²</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Mantenimiento (18 años)</td>
                            <td style="padding: 0.5rem; text-align: right;">$1.500/m²</td>
                        </tr>
                        <tr style="background: #f3f4f6;">
                            <td style="padding: 0.5rem;"><strong>TOTAL 20 AÑOS</strong></td>
                            <td style="padding: 0.5rem; text-align: right;"><strong>$54.000/m²</strong></td>
                        </tr>
                    </table>
                </div>
                
                <div class="card">
                    <h3 style="color: #059669;">Pavimento Rígido</h3>
                    <p><strong>Período análisis:</strong> 30 años</p>
                    
                    <table style="width: 100%; margin-top: 1rem; font-size: 0.9rem;">
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Construcción inicial</td>
                            <td style="padding: 0.5rem; text-align: right;"><strong>$45.000/m²</strong></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Sellado juntas (10 años)</td>
                            <td style="padding: 0.5rem; text-align: right;">$1.500/m²</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Reparación losas (15 años)</td>
                            <td style="padding: 0.5rem; text-align: right;">$3.000/m²</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Sellado juntas (20 años)</td>
                            <td style="padding: 0.5rem; text-align: right;">$1.500/m²</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Mantenimiento (25 años)</td>
                            <td style="padding: 0.5rem; text-align: right;">$2.000/m²</td>
                        </tr>
                        <tr style="background: #f3f4f6;">
                            <td style="padding: 0.5rem;"><strong>TOTAL 30 AÑOS</strong></td>
                            <td style="padding: 0.5rem; text-align: right;"><strong>$53.000/m²</strong></td>
                        </tr>
                    </table>
                </div>
                
                <div class="card">
                    <h3 style="color: #7c3aed;">Pavimento Semirrígido</h3>
                    <p><strong>Período análisis:</strong> 25 años</p>
                    
                    <table style="width: 100%; margin-top: 1rem; font-size: 0.9rem;">
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Construcción inicial</td>
                            <td style="padding: 0.5rem; text-align: right;"><strong>$35.000/m²</strong></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Mantenimiento (6 años)</td>
                            <td style="padding: 0.5rem; text-align: right;">$1.800/m²</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Mantenimiento (12 años)</td>
                            <td style="padding: 0.5rem; text-align: right;">$2.200/m²</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Rehabilitación (18 años)</td>
                            <td style="padding: 0.5rem; text-align: right;">$15.000/m²</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 0.5rem;">Mantenimiento (22 años)</td>
                            <td style="padding: 0.5rem; text-align: right;">$1.500/m²</td>
                        </tr>
                        <tr style="background: #f3f4f6;">
                            <td style="padding: 0.5rem;"><strong>TOTAL 25 AÑOS</strong></td>
                            <td style="padding: 0.5rem; text-align: right;"><strong>$55.500/m²</strong></td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <div class="alert alert-info" style="margin-top: 2rem;">
                <span>💡</span>
                <div>
                    <strong>Conclusión del Análisis</strong>
                    <p>Aunque el pavimento rígido tiene mayor costo inicial (+50%), su costo de ciclo de vida es similar o menor que el flexible debido a menores necesidades de mantenimiento. La decisión debe considerar tráfico, clima y disponibilidad financiera.</p>
                </div>
            </div>
        </div>
    `;
}

function generarMantenimientoPreventivo() {
    return `
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">🔧</span>
                <h2>Estrategias de Mantenimiento Preventivo</h2>
            </div>
            
            <div class="card-grid">
                <div class="card">
                    <h3>📋 Inspección y Evaluación</h3>
                    <p><strong>Frecuencia:</strong> Cada 2-3 años</p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Evaluación visual (fallas superficiales)</li>
                        <li>Medición IRI con perfilómetro</li>
                        <li>Cálculo índice PCI</li>
                        <li>Deflectometría (cada 5 años)</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3>✅ Intervenciones Menores</h3>
                    <p><strong>Costo:</strong> $800-3.000/m²</p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Sellado fisuras (< 3mm ancho)</li>
                        <li>Bacheo superficial puntual</li>
                        <li>Limpieza y mantenimiento juntas</li>
                        <li>Reparación bermas y drenajes</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3>🔄 Tratamientos Superficiales</h3>
                    <p><strong>Costo:</strong> $5.000-12.000/m²</p>
                    <ul style="padding-left: 1.2rem; margin-top: 0.5rem;">
                        <li>Riego neblina (fog seal)</li>
                        <li>Sello de lechada (slurry seal)</li>
                        <li>Microsurfacing</li>
                        <li>Tratamiento superficial simple/doble</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}
