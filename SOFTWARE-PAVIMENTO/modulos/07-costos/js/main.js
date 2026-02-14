// MÓDULO 07: COSTOS
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('module-content').innerHTML = `
        <div class="section-header"><span class="icon">💰</span><h2>Análisis de Costos 2025</h2></div>
        
        <div class="card-grid">
            <div class="card"><h3 style="color:#2563eb;">Pavimento Flexible</h3>
            <table style="width:100%;margin-top:1rem;font-size:0.9rem;">
            <tr style="border-bottom:1px solid #e5e7eb;"><td>Carpeta asfáltica 8cm</td><td align="right">$8.500/m²</td></tr>
            <tr style="border-bottom:1px solid #e5e7eb;"><td>Base asfáltica 10cm</td><td align="right">$7.000/m²</td></tr>
            <tr style="border-bottom:1px solid #e5e7eb;"><td>Base granular 20cm</td><td align="right">$4.500/m²</td></tr>
            <tr style="border-bottom:1px solid #e5e7eb;"><td>Subbase 25cm</td><td align="right">$3.500/m²</td></tr>
            <tr style="border-bottom:1px solid #e5e7eb;"><td>Imprimación + riegos</td><td align="right">$1.500/m²</td></tr>
            <tr style="border-bottom:1px solid #e5e7eb;"><td>Preparación terreno</td><td align="right">$5.000/m²</td></tr>
            <tr style="background:#f3f4f6;"><td><strong>TOTAL</strong></td><td align="right"><strong>$30.000/m²</strong></td></tr>
            </table>
            </div>
            
            <div class="card"><h3 style="color:#059669;">Pavimento Rígido</h3>
            <table style="width:100%;margin-top:1rem;font-size:0.9rem;">
            <tr style="border-bottom:1px solid #e5e7eb;"><td>Losa hormigón 25cm H-40</td><td align="right">$28.000/m²</td></tr>
            <tr style="border-bottom:1px solid #e5e7eb;"><td>Base granular 15cm</td><td align="right">$5.500/m²</td></tr>
            <tr style="border-bottom:1px solid #e5e7eb;"><td>Subbase 20cm</td><td align="right">$3.000/m²</td></tr>
            <tr style="border-bottom:1px solid #e5e7eb;"><td>Barras transferencia</td><td align="right">$2.500/m²</td></tr>
            <tr style="border-bottom:1px solid #e5e7eb;"><td>Preparación + curado</td><td align="right">$6.000/m²</td></tr>
            <tr style="background:#f3f4f6;"><td><strong>TOTAL</strong></td><td align="right"><strong>$45.000/m²</strong></td></tr>
            </table>
            </div>
        </div>
        
        <div style="margin-top:2rem;"><h3>Costos Mantenimiento</h3>
        <table class="data-table"><thead><tr><th>Actividad</th><th>Costo/m²</th><th>Frecuencia</th></tr></thead>
        <tbody>
        <tr><td>Sellado fisuras</td><td>$800</td><td>Cada 3-5 años</td></tr>
        <tr><td>Bacheo superficial</td><td>$12.000</td><td>Según necesidad</td></tr>
        <tr><td>Bacheo profundo</td><td>$25.000</td><td>Según necesidad</td></tr>
        <tr><td>Recarpeteo 5cm</td><td>$15.000</td><td>15-20 años</td></tr>
        <tr><td>Sello lechada</td><td>$3.500</td><td>8-10 años</td></tr>
        </tbody></table></div>
    `;
});
