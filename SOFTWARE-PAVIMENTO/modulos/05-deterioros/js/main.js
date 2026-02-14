// MÓDULO 05: DETERIOROS - COMPLETO
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('module-content').innerHTML = `
        <div class="section-header"><span class="icon">⚠️</span><h2>Deterioros en Pavimentos</h2></div>
        
        <div class="alert alert-info"><span>📊</span><div><strong>Índice PCI (Pavement Condition Index)</strong>
        <p>Escala 0-100: Excelente (85-100), Muy Bueno (70-85), Bueno (55-70), Regular (40-55), Malo (25-40), Muy Malo (10-25), Fallado (0-10)</p></div></div>
        
        ${generarDeterioros()}
        ${generarTablaPCI()}
    `;
});

function generarDeterioros() {
    const fallas = [
        {
            nombre: "Piel de Cocodrilo",
            severidad: "Alta - Estructural",
            causas: ["Fatiga del pavimento por repetición de cargas", "Espesor insuficiente de carpeta", "Debilitamiento de base por infiltración agua"],
            solucion: ["Rehabilitación completa (fresado + recarpeteo mínimo 10cm)", "Si es severo: reconstrucción de base", "Reparación bacheo profundo en áreas puntuales"],
            prevencion: "Diseño adecuado para tráfico, buen drenaje, mantenimiento oportuno"
        },
        {
            nombre: "Ahuellamiento",
            severidad: "Media-Alta - Funcional/Estructural",
            causas: ["Deformación plástica por tráfico pesado", "Mezcla asfáltica con bajo contenido ligante", "Altas temperaturas (> 35°C)"],
            solucion: ["Fresado y recarpeteo si profundidad > 2cm", "Refuerzo estructural si es profundo", "Uso asfalto modificado (PG superior)"],
            prevencion: "Asfalto modificado SBS en zonas cálidas, control calidad mezcla, espesor adecuado"
        },
        {
            nombre: "Baches",
            severidad: "Alta - Seguridad vial",
            causas: ["Infiltración agua por fisuras no selladas", "Falla localizada piel de cocodrilo", "Pérdida material por disgregación"],
            solucion: ["Bacheo con mezcla en caliente", "Riego adherencia previo", "Compactación mínima 95%", "Sellado perímetro"],
            prevencion: "Sellado oportuno fisuras, mantención drenajes, inspección regular"
        }
    ];
    
    let html = '<div class="card-grid">';
    fallas.forEach(f => {
        html += `<div class="card"><h3 style="color:#dc2626;">${f.nombre}</h3>
        <p><strong>Severidad:</strong> ${f.severidad}</p>
        <p><strong>Causas:</strong></p><ul style="padding-left:1.2rem;">
        ${f.causas.map(c=>`<li>${c}</li>`).join('')}</ul>
        <p><strong>Solución:</strong></p><ul style="padding-left:1.2rem;">
        ${f.solucion.map(s=>`<li>${s}</li>`).join('')}</ul>
        <p style="margin-top:1rem;padding:0.75rem;background:#fef3c7;border-radius:6px;">
        <strong>Prevención:</strong> ${f.prevencion}</p></div>`;
    });
    return html + '</div>';
}

function generarTablaPCI() {
    return `<div style="margin-top:2rem;"><div class="section-header"><span class="icon">📊</span>
    <h2>Tabla PCI y Acciones</h2></div>
    <table class="data-table"><thead><tr><th>PCI</th><th>Condición</th><th>Acción</th><th>Costo</th></tr></thead>
    <tbody>
    <tr><td>85-100</td><td>Excelente</td><td>Solo mantenimiento rutinario</td><td>$500-1.000/m²</td></tr>
    <tr><td>70-85</td><td>Muy Bueno</td><td>Sellado fisuras preventivo</td><td>$800-1.500/m²</td></tr>
    <tr><td>55-70</td><td>Bueno</td><td>Tratamiento superficial</td><td>$3.000-5.000/m²</td></tr>
    <tr><td>40-55</td><td>Regular</td><td>Recarpeteo delgado 3-5cm</td><td>$8.000-12.000/m²</td></tr>
    <tr><td>25-40</td><td>Malo</td><td>Rehabilitación media</td><td>$15.000-20.000/m²</td></tr>
    <tr><td>10-25</td><td>Muy Malo</td><td>Rehabilitación profunda</td><td>$25.000-35.000/m²</td></tr>
    <tr><td>0-10</td><td>Fallado</td><td>Reconstrucción completa</td><td>$40.000-50.000/m²</td></tr>
    </tbody></table></div>`;
}
