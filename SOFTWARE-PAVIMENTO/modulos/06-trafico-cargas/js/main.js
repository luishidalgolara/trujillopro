// MÓDULO 06: TRÁFICO Y CARGAS
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('module-content').innerHTML = `
        <div class="section-header"><span class="icon">🚛</span><h2>Tráfico y Cargas Vehiculares</h2></div>
        
        <div class="alert alert-info"><span>📊</span><div><strong>ESAL (Equivalent Single Axle Load)</strong>
        <p>Eje estándar de 8.2 toneladas (18.000 libras). Todos los ejes se convierten a ESAL para diseño estructural.</p></div></div>
        
        <div class="card-grid">
            <div class="card"><h3>Concepto ESAL</h3>
            <p><strong>Fórmula básica:</strong></p>
            <p style="background:#f3f4f6;padding:1rem;border-radius:6px;margin:1rem 0;">
            ESAL = (P / P₀)⁴·²<br>P = Carga del eje (ton)<br>P₀ = 8.2 ton (estándar)</p>
            <p><strong>Ejemplo:</strong> Eje de 12 ton = (12/8.2)⁴·² = 3.2 ESAL</p>
            </div>
            
            <div class="card"><h3>Factores Camión Chile</h3>
            <table style="width:100%;font-size:0.9rem;margin-top:0.5rem;">
            <tr style="border-bottom:1px solid #e5e7eb;"><td>Auto</td><td align="right">0.0002</td></tr>
            <tr style="border-bottom:1px solid #e5e7eb;"><td>C2 (2 ejes)</td><td align="right">0.89</td></tr>
            <tr style="border-bottom:1px solid #e5e7eb;"><td>C3 (3 ejes)</td><td align="right">2.15</td></tr>
            <tr style="border-bottom:1px solid #e5e7eb;"><td>C2-R2 (4 ejes)</td><td align="right">3.85</td></tr>
            <tr><td>C3-R3 (6 ejes)</td><td align="right">5.20</td></tr>
            </table>
            </div>
            
            <div class="card"><h3>Casos Chile</h3>
            <p><strong>Autopista Central:</strong></p>
            <p>200.000 veh/día → 50M ESAL (20 años)</p>
            <p><strong>Ruta 5 Norte:</strong></p>
            <p>40.000 veh/día → 30M ESAL (20 años)</p>
            <p style="margin-top:1rem;padding:0.75rem;background:#fef3c7;border-radius:6px;">
            <strong>Criterio:</strong> > 10M ESAL considera pavimento rígido</p>
            </div>
        </div>
        
        <div style="margin-top:2rem;"><div class="section-header"><span class="icon">📊</span>
        <h2>Categorías de Tráfico MOP</h2></div>
        <table class="data-table"><thead><tr><th>Categoría</th><th>ESAL</th><th>Descripción</th><th>Tipo Pavimento</th></tr></thead>
        <tbody>
        <tr><td>T1</td><td>< 10⁵</td><td>Tráfico ligero, caminos rurales</td><td>Flexible delgado</td></tr>
        <tr><td>T2</td><td>10⁵ - 10⁶</td><td>Tráfico medio, vías interurbanas</td><td>Flexible estándar</td></tr>
        <tr><td>T3</td><td>10⁶ - 10⁷</td><td>Tráfico pesado, rutas principales</td><td>Flexible reforzado</td></tr>
        <tr><td>T4</td><td>> 10⁷</td><td>Muy pesado, autopistas urbanas</td><td>Rígido o semirrígido</td></tr>
        </tbody></table></div>
    `;
});
