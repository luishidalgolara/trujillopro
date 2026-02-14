// MÓDULO 12: COMPARADOR
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('module-content').innerHTML = `
        <div class="section-header"><span class="icon">⚖️</span><h2>Comparador de Pavimentos</h2></div>
        
        <table class="data-table"><thead><tr><th>Característica</th><th>Flexible</th><th>Rígido</th><th>Semirrígido</th></tr></thead>
        <tbody>
        <tr><td><strong>Material principal</strong></td><td>Asfalto + agregados</td><td>Hormigón</td><td>Base tratada + asfalto</td></tr>
        <tr><td><strong>Costo inicial</strong></td><td>$30.000/m²</td><td>$45.000/m²</td><td>$35.000/m²</td></tr>
        <tr><td><strong>Vida útil</strong></td><td>15-20 años</td><td>30-40 años</td><td>20-25 años</td></tr>
        <tr><td><strong>Mantenimiento</strong></td><td>Frecuente (3-5 años)</td><td>Bajo (10-15 años)</td><td>Moderado (5-8 años)</td></tr>
        <tr><td><strong>Costo mantenimiento</strong></td><td>$2.000/m²/año</td><td>$500/m²/año</td><td>$1.200/m²/año</td></tr>
        <tr><td><strong>Construcción</strong></td><td>Rápida (días)</td><td>Lenta (28 días)</td><td>Media (7-14 días)</td></tr>
        <tr><td><strong>Clima caluroso</strong></td><td>Regular (ahuellamiento)</td><td>Excelente</td><td>Bueno</td></tr>
        <tr><td><strong>Clima frío</strong></td><td>Bueno (flexible)</td><td>Regular (fisuras)</td><td>Bueno</td></tr>
        <tr><td><strong>Lluvia intensa</strong></td><td>Regular (infiltración)</td><td>Excelente</td><td>Bueno</td></tr>
        <tr><td><strong>Tráfico ligero</strong></td><td>Ideal</td><td>Sobredimensionado</td><td>Aceptable</td></tr>
        <tr><td><strong>Tráfico pesado</strong></td><td>Aceptable</td><td>Ideal</td><td>Bueno</td></tr>
        <tr><td><strong>Rehabilitación</strong></td><td>Fácil (recarpeteo)</td><td>Difícil (demolición)</td><td>Media</td></tr>
        <tr><td><strong>Reciclaje</strong></td><td>100% (RAP)</td><td>Limitado</td><td>Parcial</td></tr>
        <tr><td><strong>Costo 20 años</strong></td><td>$70.000/m²</td><td>$55.000/m²</td><td>$59.000/m²</td></tr>
        </tbody></table>
        
        <div style="margin-top:2rem;"><h3>Criterios de Selección</h3>
        <div class="card-grid">
            <div class="card"><h4>Elige FLEXIBLE si:</h4>
            <ul style="padding-left:1.2rem;"><li>Tráfico < 10M ESAL</li><li>Presupuesto inicial limitado</li>
            <li>Clima templado (zona central)</li><li>Requieres apertura rápida</li></ul>
            </div>
            
            <div class="card"><h4>Elige RÍGIDO si:</h4>
            <ul style="padding-left:1.2rem;"><li>Tráfico > 10M ESAL</li><li>Análisis largo plazo (30+ años)</li>
            <li>Zona muy lluviosa (sur Chile)</li><li>Bajo mantenimiento futuro</li></ul>
            </div>
            
            <div class="card"><h4>Elige SEMIRRÍGIDO si:</h4>
            <ul style="padding-left:1.2rem;"><li>Tráfico 5-15M ESAL</li><li>Clima variable</li>
            <li>Balance costo-desempeño</li><li>Buena subrasante (CBR > 10%)</li></ul>
            </div>
        </div>
        </div>
    `;
});
