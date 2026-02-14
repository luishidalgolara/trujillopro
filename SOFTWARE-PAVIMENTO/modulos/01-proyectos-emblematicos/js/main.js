// MÓDULO 01: PROYECTOS EMBLEMÁTICOS - CONTENIDO COMPLETO
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('module-content');
    if (!container) return;
    container.innerHTML = generarContenido();
});

function generarContenido() {
    return `
        <div class="section-header">
            <span class="icon">🏗️</span>
            <h2>Proyectos Emblemáticos de Chile</h2>
        </div>
        
        <div class="alert alert-info">
            <span>📊</span>
            <div>
                <strong>Red Vial de Chile</strong>
                <p>85.984 km totales | 24.447 km pavimentados (28.4%) | USD $25.000 millones invertidos (últimos 20 años)</p>
            </div>
        </div>

        ${generarProyectosCarreteras()}
        ${generarProyectosTuneles()}
        ${generarProyectosUrbanos()}
        ${generarTablaComparativa()}
    `;
}

function generarProyectosCarreteras() {
    const proyectos = [
        {
            nombre: "Ruta 5 - Carretera Panamericana",
            tipo: "Flexible (Asfalto)",
            longitud: "3.363 km en Chile",
            ubicacion: "Arica a Quellón",
            añoInicio: 1960,
            inversion: "USD $15.000 millones (histórico)",
            trafico: "2.000-40.000 veh/día según tramo",
            capas: "Carpeta 8-12cm + Base 20-25cm + Subbase 20-30cm",
            datos: [
                "Atraviesa 7 regiones de Chile",
                "Soporta el 60% del transporte de carga nacional",
                "Incluye 5 túneles principales",
                "Más de 40 mejoras desde su construcción"
            ]
        },
        {
            nombre: "Autopista Central",
            tipo: "Flexible (Alto rendimiento)",
            longitud: "42 km (35km vía expresa)",
            ubicacion: "Santiago - Norte a Sur",
            añoInicio: 1997,
            inversion: "USD $800 millones",
            trafico: "200.000 veh/día",
            capas: "Carpeta 10cm + Base asfáltica 8cm + Base granular 20cm",
            datos: [
                "Primera autopista urbana concesionada",
                "Sistema Free Flow (sin barreras)",
                "Reduce tiempo de viaje en 40%",
                "18 enlaces con otras vías"
            ]
        },
        {
            nombre: "Ruta 68 (Santiago-Valparaíso)",
            tipo: "Flexible",
            longitud: "120 km",
            ubicacion: "Santiago - Valparaíso",
            añoInicio: 1960,
            inversion: "USD $600 millones (ampliación)",
            trafico: "30.000-50.000 veh/día",
            capas: "Carpeta 10cm + Base 25cm + Subbase 25cm",
            datos: [
                "Une capital con principal puerto",
                "Túnel Lo Prado de 2.670 metros",
                "Tráfico se triplica en verano",
                "Duplicación completa en 2010"
            ]
        },
        {
            nombre: "Ruta Interportuaria Biobío",
            tipo: "Rígido (Hormigón)",
            longitud: "23 km",
            ubicacion: "Talcahuano - Penco",
            añoInicio: 2015,
            inversion: "USD $280 millones",
            trafico: "15.000 veh/día (alto % camiones)",
            capas: "Losa hormigón 25cm H-40 + Base 15cm",
            datos: [
                "Primera ruta rígida por concesión en Chile",
                "Vida útil proyectada: 40 años",
                "Diseñada para 20 millones ESAL",
                "Barras de transferencia cada 5m"
            ]
        }
    ];

    let html = `
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">🛣️</span>
                <h2>Principales Carreteras</h2>
            </div>
            <div class="card-grid">
    `;

    proyectos.forEach(p => {
        html += `
            <div class="card">
                <h3 style="color: #2563eb; margin-bottom: 1rem;">${p.nombre}</h3>
                <p><strong>📍 Ubicación:</strong> ${p.ubicacion}</p>
                <p><strong>📏 Longitud:</strong> ${p.longitud}</p>
                <p><strong>🏗️ Tipo:</strong> ${p.tipo}</p>
                <p><strong>📅 Año:</strong> ${p.añoInicio}</p>
                <p><strong>💰 Inversión:</strong> ${p.inversion}</p>
                <p><strong>🚗 Tráfico:</strong> ${p.trafico}</p>
                <p><strong>📐 Estructura:</strong> ${p.capas}</p>
                
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #e5e7eb;">
                    <strong>✨ Datos destacados:</strong>
                    <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">
                        ${p.datos.map(d => `<li style="margin-bottom: 0.3rem;">${d}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });

    html += `</div></div>`;
    return html;
}

function generarProyectosTuneles() {
    return `
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">🚇</span>
                <h2>Túneles Principales</h2>
            </div>
            <div class="card-grid">
                <div class="card">
                    <h3 style="color: #2563eb;">Túnel El Melón</h3>
                    <p><strong>📏 Longitud:</strong> 2.470 metros</p>
                    <p><strong>📍 Ubicación:</strong> Ruta 5 Norte, Valparaíso</p>
                    <p><strong>🏗️ Pavimento:</strong> Losa hormigón 28cm H-40</p>
                    <p><strong>💰 Inversión:</strong> USD $120 millones</p>
                    <p><strong>📅 Inauguración:</strong> 1995</p>
                    <p style="margin-top: 1rem;"><strong>✨ Impacto:</strong></p>
                    <ul style="padding-left: 1.2rem;">
                        <li>Reemplazó cuesta de 37 curvas peligrosas</li>
                        <li>Reduce tiempo de viaje en 20 minutos</li>
                        <li>Salvó más de 1.000 vidas desde apertura</li>
                        <li>Sistema de ventilación forzada</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3 style="color: #2563eb;">Túnel San Cristóbal</h3>
                    <p><strong>📏 Longitud:</strong> 1.580 metros</p>
                    <p><strong>📍 Ubicación:</strong> Costanera Norte, Santiago</p>
                    <p><strong>🏗️ Pavimento:</strong> Asfalto modificado 12cm</p>
                    <p><strong>💰 Inversión:</strong> USD $300 millones</p>
                    <p><strong>📅 Inauguración:</strong> 2006</p>
                    <p style="margin-top: 1rem;"><strong>✨ Tecnología:</strong></p>
                    <ul style="padding-left: 1.2rem;">
                        <li>Construido con tuneladora TBM</li>
                        <li>2 tubos paralelos de 3 pistas c/u</li>
                        <li>40 metros bajo el cerro</li>
                        <li>Monitoreo sísmico 24/7</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function generarProyectosUrbanos() {
    return `
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">🏙️</span>
                <h2>Proyectos Urbanos</h2>
            </div>
            <div class="card-grid">
                <div class="card">
                    <h3 style="color: #2563eb;">Costanera Norte</h3>
                    <p><strong>📏 Total:</strong> 43 km</p>
                    <p><strong>🚇 Túneles:</strong> 4.8 km bajo Río Mapocho</p>
                    <p><strong>💰 Inversión:</strong> USD $1.050 millones</p>
                    <p><strong>🚗 Tráfico:</strong> 150.000 veh/día</p>
                    <p><strong>✨ Innovación:</strong> Primer túnel urbano bajo río en Chile</p>
                </div>
                
                <div class="card">
                    <h3 style="color: #2563eb;">Américo Vespucio Oriente (AVO)</h3>
                    <p><strong>📏 Longitud:</strong> 9.3 km (40% en túneles)</p>
                    <p><strong>💰 Inversión:</strong> USD $1.400 millones</p>
                    <p><strong>🚇 Túneles:</strong> 5 túneles (3.7 km)</p>
                    <p><strong>✨ Logro:</strong> Completa anillo Américo Vespucio</p>
                </div>
            </div>
        </div>
    `;
}

function generarTablaComparativa() {
    return `
        <div style="margin-top: 3rem;">
            <div class="section-header">
                <span class="icon">📊</span>
                <h2>Comparación de Proyectos</h2>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Proyecto</th>
                        <th>Tipo</th>
                        <th>Longitud</th>
                        <th>Inversión</th>
                        <th>Vida Útil</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Ruta 5</strong></td>
                        <td>Flexible</td>
                        <td>3.363 km</td>
                        <td>$15.000 M</td>
                        <td>15-20 años</td>
                    </tr>
                    <tr>
                        <td><strong>Autopista Central</strong></td>
                        <td>Flexible</td>
                        <td>42 km</td>
                        <td>$800 M</td>
                        <td>15-20 años</td>
                    </tr>
                    <tr>
                        <td><strong>Interportuaria</strong></td>
                        <td>Rígido</td>
                        <td>23 km</td>
                        <td>$280 M</td>
                        <td>40 años</td>
                    </tr>
                    <tr>
                        <td><strong>Costanera Norte</strong></td>
                        <td>Flexible/Rígido</td>
                        <td>43 km</td>
                        <td>$1.050 M</td>
                        <td>20-30 años</td>
                    </tr>
                    <tr>
                        <td><strong>AVO</strong></td>
                        <td>Flexible</td>
                        <td>9.3 km</td>
                        <td>$1.400 M</td>
                        <td>15-20 años</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}
