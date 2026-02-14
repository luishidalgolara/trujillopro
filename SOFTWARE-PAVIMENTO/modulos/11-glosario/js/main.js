// MÓDULO 11: GLOSARIO
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('module-content').innerHTML = `
        <div class="section-header"><span class="icon">📖</span><h2>Glosario Técnico</h2></div>
        
        <div style="display:grid;gap:1rem;margin-top:1.5rem;">
            <div class="card"><h4>AASHTO</h4>
            <p>American Association of State Highway and Transportation Officials. Método de diseño AASHTO 93 es el estándar en Chile.</p>
            </div>
            
            <div class="card"><h4>CBR (California Bearing Ratio)</h4>
            <p>Ensayo que mide capacidad portante del suelo. Valores: <5% pobre, 5-10% regular, 10-20% bueno, >80% apto para base.</p>
            </div>
            
            <div class="card"><h4>ESAL</h4>
            <p>Equivalent Single Axle Load. Eje estándar de 8.2 toneladas. Todos los ejes se convierten a ESAL para diseño.</p>
            </div>
            
            <div class="card"><h4>IRI (International Roughness Index)</h4>
            <p>Índice de rugosidad internacional. Mide confort de rodadura. IRI < 2 m/km = excelente, > 4 m/km = malo.</p>
            </div>
            
            <div class="card"><h4>MC-V3</h4>
            <p>Manual de Carreteras Volumen 3. Documento oficial MOP para diseño de pavimentos en Chile.</p>
            </div>
            
            <div class="card"><h4>PCI (Pavement Condition Index)</h4>
            <p>Índice de condición de pavimento (0-100). Evalúa tipo, severidad y extensión de deterioros. >85 excelente, <25 muy malo.</p>
            </div>
            
            <div class="card"><h4>PG (Performance Grade)</h4>
            <p>Clasificación asfalto por temperatura. Ejemplo: PG 64-22 funciona entre 64°C (verano) y -22°C (invierno).</p>
            </div>
            
            <div class="card"><h4>RAP (Reclaimed Asphalt Pavement)</h4>
            <p>Pavimento asfáltico reciclado. Se usa 20-30% en mezclas nuevas en Chile. Sostenible y económico.</p>
            </div>
            
            <div class="card"><h4>Subrasante</h4>
            <p>Terreno natural preparado que soporta estructura del pavimento. Requiere CBR mínimo 5-10% y compactación ≥95% Proctor.</p>
            </div>
            
            <div class="card"><h4>TMDA (Tránsito Medio Diario Anual)</h4>
            <p>Promedio vehículos/día en un año. Base para cálculo de ESAL de diseño.</p>
            </div>
        </div>
    `;
});
