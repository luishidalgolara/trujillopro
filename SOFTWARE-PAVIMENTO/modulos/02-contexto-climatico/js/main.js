// ============================================
// MÓDULO: CONTEXTO CLIMÁTICO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initModule();
});

function initModule() {
    const container = document.getElementById('module-content');
    if (!container) return;
    
    container.innerHTML = generateContent();
}

function generateContent() {
    return `
        <div class="section-header">
            <span class="icon">🌦️</span>
            <h2>Zonas Climáticas de Chile</h2>
        </div>
        
        <div class="alert alert-info">
            <span>ℹ️</span>
            <div>
                <strong>Chile: Un país de contrastes climáticos</strong>
                <p>Chile se extiende por más de 4.300 km de norte a sur, atravesando múltiples zonas climáticas que afectan significativamente el diseño y comportamiento de los pavimentos.</p>
            </div>
        </div>

        <div class="card-grid">
            <!-- ZONA NORTE -->
            <div class="card" style="border-left: 4px solid #ff6b6b;">
                <div class="card-header">
                    <span class="icon">🏜️</span>
                    <h3>Zona Norte (Desértica)</h3>
                </div>
                <div class="card-content">
                    <p><strong>Ubicación:</strong> Arica - Copiapó</p>
                    <p><strong>Temperatura:</strong> 18-25°C promedio</p>
                    <p><strong>Precipitación:</strong> < 50 mm anuales</p>
                    <p><strong>Humedad:</strong> Baja (40-60%)</p>
                    
                    <h4 style="margin-top: 1rem; color: #e74c3c;">⚠️ Desafíos para pavimentos:</h4>
                    <ul style="list-style: none; padding: 0;">
                        <li>• Ahuellamiento por altas temperaturas (>35°C)</li>
                        <li>• Envejecimiento acelerado del asfalto</li>
                        <li>• Grandes cambios térmicos día-noche (ΔT > 30°C)</li>
                    </ul>
                    
                    <h4 style="margin-top: 1rem; color: #27ae60;">✅ Recomendación:</h4>
                    <p><strong>Asfalto PG 70-22 o superior</strong> con modificadores de polímeros (SBS)</p>
                </div>
            </div>

            <!-- ZONA CENTRO -->
            <div class="card" style="border-left: 4px solid #f39c12;">
                <div class="card-header">
                    <span class="icon">☀️</span>
                    <h3>Zona Centro (Mediterránea)</h3>
                </div>
                <div class="card-content">
                    <p><strong>Ubicación:</strong> Santiago - Talca</p>
                    <p><strong>Temperatura:</strong> 14-18°C promedio</p>
                    <p><strong>Precipitación:</strong> 300-800 mm anuales</p>
                    <p><strong>Humedad:</strong> Media (60-75%)</p>
                    
                    <h4 style="margin-top: 1rem; color: #e74c3c;">⚠️ Desafíos para pavimentos:</h4>
                    <ul style="list-style: none; padding: 0;">
                        <li>• Ciclos térmicos estacionales marcados</li>
                        <li>• Degradación por agua en invierno</li>
                        <li>• Ahuellamiento leve en verano</li>
                    </ul>
                    
                    <h4 style="margin-top: 1rem; color: #27ae60;">✅ Recomendación:</h4>
                    <p><strong>Asfalto PG 64-22</strong> con buen sistema de drenaje</p>
                </div>
            </div>

            <!-- ZONA SUR -->
            <div class="card" style="border-left: 4px solid #3498db;">
                <div class="card-header">
                    <span class="icon">🌧️</span>
                    <h3>Zona Sur (Templado Lluvioso)</h3>
                </div>
                <div class="card-content">
                    <p><strong>Ubicación:</strong> Concepción - Puerto Montt</p>
                    <p><strong>Temperatura:</strong> 10-14°C promedio</p>
                    <p><strong>Precipitación:</strong> 1.200-2.500 mm anuales</p>
                    <p><strong>Humedad:</strong> Alta (75-90%)</p>
                    
                    <h4 style="margin-top: 1rem; color: #e74c3c;">⚠️ Desafíos para pavimentos:</h4>
                    <ul style="list-style: none; padding: 0;">
                        <li>• Degradación acelerada por humedad</li>
                        <li>• Stripping (desprendimiento de agregados)</li>
                        <li>• Formación de baches por infiltración</li>
                        <li>• Piel de cocodrilo prematura</li>
                    </ul>
                    
                    <h4 style="margin-top: 1rem; color: #27ae60;">✅ Recomendación:</h4>
                    <p><strong>Pavimento Rígido</strong> o Flexible con aditivos anti-stripping</p>
                </div>
            </div>

            <!-- ZONA AUSTRAL -->
            <div class="card" style="border-left: 4px solid #9b59b6;">
                <div class="card-header">
                    <span class="icon">❄️</span>
                    <h3>Zona Austral (Frío Extremo)</h3>
                </div>
                <div class="card-content">
                    <p><strong>Ubicación:</strong> Aysén - Magallanes</p>
                    <p><strong>Temperatura:</strong> 6-10°C promedio</p>
                    <p><strong>Precipitación:</strong> 800-3.000 mm anuales</p>
                    <p><strong>Humedad:</strong> Muy alta (80-95%)</p>
                    
                    <h4 style="margin-top: 1rem; color: #e74c3c;">⚠️ Desafíos para pavimentos:</h4>
                    <ul style="list-style: none; padding: 0;">
                        <li>• Fisuras térmicas por bajas temperaturas</li>
                        <li>• Rigidización del asfalto</li>
                        <li>• Daño por ciclos hielo-deshielo</li>
                        <li>• Levantamiento por congelación (frost heave)</li>
                    </ul>
                    
                    <h4 style="margin-top: 1rem; color: #27ae60;">✅ Recomendación:</h4>
                    <p><strong>Asfalto PG 58-34</strong> con mayor flexibilidad a bajas temperaturas</p>
                </div>
            </div>
        </div>

        <!-- TABLA COMPARATIVA -->
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">📊</span>
                <h2>Tabla Comparativa</h2>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Característica</th>
                        <th>Norte</th>
                        <th>Centro</th>
                        <th>Sur</th>
                        <th>Austral</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Lluvia Anual</strong></td>
                        <td>&lt;50 mm</td>
                        <td>300-800 mm</td>
                        <td>1.200-2.500 mm</td>
                        <td>800-3.000 mm</td>
                    </tr>
                    <tr>
                        <td><strong>Temperatura Media</strong></td>
                        <td>18-25°C</td>
                        <td>14-18°C</td>
                        <td>10-14°C</td>
                        <td>6-10°C</td>
                    </tr>
                    <tr>
                        <td><strong>Desafío Principal</strong></td>
                        <td>Calor extremo</td>
                        <td>Ciclos térmicos</td>
                        <td>Humedad</td>
                        <td>Frío y hielo</td>
                    </tr>
                    <tr>
                        <td><strong>Pavimento Común</strong></td>
                        <td>Flexible/Rígido</td>
                        <td>Flexible</td>
                        <td>Rígido/Flexible</td>
                        <td>Flexible</td>
                    </tr>
                    <tr>
                        <td><strong>Vida Útil Esperada</strong></td>
                        <td>15-20 años</td>
                        <td>15-20 años</td>
                        <td>12-18 años</td>
                        <td>10-15 años</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- CASOS DE ESTUDIO -->
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">📝</span>
                <h2>Casos de Estudio Chilenos</h2>
            </div>
            
            <div class="card-grid">
                <div class="card">
                    <h3>🏜️ Ruta 5 Desierto de Atacama</h3>
                    <p><strong>Problema:</strong> Temperaturas superficiales de hasta 70°C generaban ahuellamiento severo</p>
                    <p><strong>Solución:</strong> Cambio a asfalto PG 76-22 con polímeros SBS</p>
                    <p><strong>Resultado:</strong> Reducción del ahuellamiento en 80%, vida útil de 12 a 18 años</p>
                </div>
                
                <div class="card">
                    <h3>🌧️ Ruta 160 Región de Los Lagos</h3>
                    <p><strong>Problema:</strong> Stripping (desprendimiento) masivo por infiltración de agua</p>
                    <p><strong>Solución:</strong> Asfalto con aditivo anti-stripping + drenaje subsuperficial</p>
                    <p><strong>Resultado:</strong> Eliminación de stripping, vida útil de 8 a 15 años</p>
                </div>
            </div>
        </div>
    `;
}
