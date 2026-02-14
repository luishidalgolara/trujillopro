// MÓDULO 09: PROCESO CONSTRUCTIVO
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('module-content').innerHTML = `
        <div class="section-header"><span class="icon">👷</span><h2>Proceso Constructivo</h2></div>
        
        <div class="alert alert-warning"><span>⚙️</span><div><strong>Etapas Pavimento Flexible</strong>
        <p>7 fases desde preparación terreno hasta señalización final</p></div></div>
        
        <div style="display:grid;gap:1rem;margin-top:1.5rem;">
            <div style="padding:1rem;background:white;border-left:4px solid #3b82f6;border-radius:8px;">
            <h4>1️⃣ Preparación Terreno</h4>
            <ul style="padding-left:1.2rem;"><li>Limpieza vegetación</li><li>Excavación según planos</li>
            <li>Compactación subrasante ≥95% Proctor</li><li>Verificación CBR mínimo</li></ul>
            </div>
            
            <div style="padding:1rem;background:white;border-left:4px solid #10b981;border-radius:8px;">
            <h4>2️⃣ Subbase Granular</h4>
            <p>Espesor: 15-30cm | CBR > 40%</p>
            <ul style="padding-left:1.2rem;"><li>Extensión con motoniveladora</li>
            <li>Riegos agua para compactación</li><li>Compactación 100% Proctor Modificado</li>
            <li>Control densidad cada 100m</li></ul>
            </div>
            
            <div style="padding:1rem;background:white;border-left:4px solid #f59e0b;border-radius:8px;">
            <h4>3️⃣ Base Granular</h4>
            <p>Espesor: 15-25cm | CBR > 80%</p>
            <ul style="padding-left:1.2rem;"><li>Material según granulometría MOP</li>
            <li>Compactación 100% Proctor</li><li>Desgaste Los Ángeles < 35%</li></ul>
            </div>
            
            <div style="padding:1rem;background:white;border-left:4px solid #8b5cf6;border-radius:8px;">
            <h4>4️⃣ Imprimación</h4>
            <p>Dosis: 0.5-1.5 L/m²</p>
            <ul style="padding-left:1.2rem;"><li>Emulsión asfáltica diluida</li>
            <li>Aplicación con camión imprimador</li><li>Curado mínimo 24 horas</li></ul>
            </div>
            
            <div style="padding:1rem;background:white;border-left:4px solid #ec4899;border-radius:8px;">
            <h4>5️⃣ Carpeta Asfáltica</h4>
            <p>Temperatura colocación: 130-160°C</p>
            <ul style="padding-left:1.2rem;"><li>Extensión con pavimentadora</li>
            <li>Compactación rodillo liso + neumático</li><li>Densidad final ≥97-98% Marshall</li>
            <li>Espesor según diseño (5-12cm)</li></ul>
            </div>
            
            <div style="padding:1rem;background:white;border-left:4px solid #06b6d4;border-radius:8px;">
            <h4>6️⃣ Curado y Acabado</h4>
            <ul style="padding-left:1.2rem;"><li>Enfriamiento 2-4 horas</li>
            <li>Verificación rugosidad IRI</li><li>Corrección irregularidades</li></ul>
            </div>
        </div>
        
        <div style="margin-top:2rem;"><div class="section-header"><h3>Pavimento Rígido - Diferencias</h3></div>
        <ul style="padding-left:1.2rem;"><li>Encofrado metálico fijo</li>
        <li>Colocación barras transferencia Ø25mm cada 30cm</li>
        <li>Hormigonado con regla vibrante</li>
        <li>Texturizado superficial (antideslizante)</li>
        <li>Curado húmedo 7 días</li>
        <li>Corte juntas 12-24h (1/3 espesor)</li>
        <li>Sellado juntas a 28 días</li></ul></div>
    `;
});
