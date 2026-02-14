// MÓDULO 10: QUIZ PRÁCTICO
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('module-content').innerHTML = `
        <div class="section-header"><span class="icon">🎯</span><h2>Quiz de Evaluación</h2></div>
        
        <div class="alert alert-info"><span>📝</span><div><strong>10 Preguntas + 2 Casos Prácticos</strong>
        <p>Evalúa tus conocimientos sobre pavimentación en Chile</p></div></div>
        
        <div style="margin-top:2rem;"><h3>Preguntas Teóricas</h3>
        <div style="display:grid;gap:1rem;">
            <div style="padding:1rem;background:#f9fafb;border-left:3px solid #3b82f6;border-radius:6px;">
            <p><strong>1. ¿Qué significa ESAL en diseño de pavimentos?</strong></p>
            <p style="margin-top:0.5rem;">R: Eje Simple Equivalente de 8.2 toneladas</p>
            </div>
            
            <div style="padding:1rem;background:#f9fafb;border-left:3px solid #3b82f6;border-radius:6px;">
            <p><strong>2. ¿Cuál es la vida útil típica de un pavimento rígido en Chile?</strong></p>
            <p style="margin-top:0.5rem;">R: 30-40 años</p>
            </div>
            
            <div style="padding:1rem;background:#f9fafb;border-left:3px solid #3b82f6;border-radius:6px;">
            <p><strong>3. ¿Qué norma regula el diseño de pavimentos del MOP?</strong></p>
            <p style="margin-top:0.5rem;">R: Manual de Carreteras Volumen 3 (MC-V3)</p>
            </div>
        </div>
        </div>
        
        <div style="margin-top:2rem;"><h3>Casos Prácticos</h3>
        <div class="card">
        <h4>Caso 1: Ruta Rural Región del Maule</h4>
        <p><strong>Datos:</strong> TMDA 1.200 veh/día, 15% camiones, CBR 12%, proyección 20 años</p>
        <p><strong>Pregunta:</strong> ¿Qué tipo de pavimento recomiendas?</p>
        <p style="margin-top:1rem;padding:1rem;background:#eff6ff;border-radius:6px;">
        <strong>Solución:</strong> ESAL ≈ 800.000 (categoría T2). Pavimento flexible: carpeta 7cm + base 20cm + subbase 20cm. Costo: $28.000/m²</p>
        </div>
        </div>
    `;
});
