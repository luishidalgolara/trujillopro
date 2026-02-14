// MÓDULO 08: SUSTENTABILIDAD
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('module-content').innerHTML = `
        <div class="section-header"><span class="icon">🌱</span><h2>Pavimentos Sustentables</h2></div>
        
        <div class="card-grid">
            <div class="card"><h3 style="color:#059669;">RAP (Reciclaje Asfalto)</h3>
            <p><strong>Concepto:</strong> Reutilización pavimento fresado en mezclas nuevas</p>
            <p><strong>Contenido típico:</strong> 20-30% RAP en Chile</p>
            <p><strong>Beneficios:</strong></p>
            <ul style="padding-left:1.2rem;"><li>Ahorro 30-50% en materiales</li>
            <li>Reducción 40% huella carbono</li><li>Menor explotación canteras</li></ul>
            <p style="margin-top:1rem;background:#fef3c7;padding:0.75rem;border-radius:6px;">
            <strong>Proyecto:</strong> Ruta G-21 (2021) - 100% reciclado in-situ</p>
            </div>
            
            <div class="card"><h3 style="color:#059669;">Mezclas Tibias (WMA)</h3>
            <p><strong>Temperatura:</strong> 120-140°C vs 160-180°C tradicional</p>
            <p><strong>Beneficios:</strong></p>
            <ul style="padding-left:1.2rem;"><li>20-40% menos energía</li>
            <li>50% menos emisiones CO₂</li><li>Mejor condiciones trabajo</li></ul>
            <p><strong>Tecnologías:</strong> Aditivos químicos, Asfalto espumado, Ceras sintéticas</p>
            </div>
            
            <div class="card"><h3 style="color:#059669;">Pavimentos Permeables</h3>
            <p><strong>Aplicación:</strong> Ciclovías, estacionamientos, vías bajas cargas</p>
            <p><strong>Beneficios:</strong></p>
            <ul style="padding-left:1.2rem;"><li>Recarga napas subterráneas</li>
            <li>Reduce escorrentía urbana</li><li>Mitiga islas calor</li></ul>
            <p style="margin-top:1rem;background:#fef3c7;padding:0.75rem;border-radius:6px;">
            <strong>Caso:</strong> Ciclovía Las Condes (2019) - Asfalto permeable</p>
            </div>
        </div>
        
        <div style="margin-top:2rem;"><h3>Huella Carbono</h3>
        <p>Pavimento Flexible: 35-50 kg CO₂/m²</p>
        <p>Pavimento Rígido: 60-80 kg CO₂/m²</p>
        <p>Con 30% RAP: Reducción 25-35% emisiones</p></div>
    `;
});
