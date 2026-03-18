document.getElementById('section-modules').innerHTML = `
<section class="modules-section" id="modules">
    <div class="container">
        <div class="section-header">
            <span class="section-tag">6 MÓDULOS</span>
            <h2 class="section-title">Especialización<br>por Área</h2>
        </div>
        <div class="modules-grid">
            <div class="module-card" data-module="electric">
                <div class="module-icon">⚡</div>
                <h3>TRUJILLO ELÉCTRICO</h3>
                <p>Instalaciones eléctricas domiciliarias</p>
                <ul class="module-features">
                    <li>Trazados automáticos inteligentes</li>
                    <li>Cuadros de cargas automáticos</li>
                    <li>Normativa SEC integrada</li>
                    <li>Cálculos de protecciones</li>
                </ul>
                <button class="btn-module-app" onclick="window.open('SOFTWARE-ELECTRICO/index-electrico.html', '_blank')">Abrir aplicación</button>
            </div>
            <div class="module-card" data-module="water">
                <div class="module-icon">💧</div>
                <h3>TRUJILLO AGUA POTABLE</h3>
                <p>Redes de agua potable según RIDAA</p>
                <ul class="module-features">
                    <li>Isométricos automáticos</li>
                    <li>Cuadros de gastos automáticos</li>
                    <li>Memorias técnicas y EETT</li>
                    <li>Detalles actualizables</li>
                </ul>
                <button class="btn-module-app" onclick="window.open('SOFTWARE-AGUA-POTABLE/index.html', '_blank')">Abrir aplicación</button>
            </div>
            <div class="module-card" data-module="sewer">
                <div class="module-icon">🚿</div>
                <h3>TRUJILLO ALCANTARILLADO</h3>
                <p>Sistemas de evacuación según RIDAA</p>
                <ul class="module-features">
                    <li>Trazados automáticos</li>
                    <li>Cálculos UEH automáticos</li>
                    <li>Memorias y EETT automáticas</li>
                    <li>RIDAA integrado</li>
                </ul>
                <button class="btn-module-app" onclick="window.open('SOFTWARE-ALCANTARILLADO/index.html', '_blank')">Abrir aplicación</button>
            </div>
            <div class="module-card" data-module="structure">
                <div class="module-icon">🏗️</div>
                <h3>TRUJILLO ESTRUCTURAL</h3>
                <p>Cálculo estructural de viviendas</p>
                <ul class="module-features">
                    <li>Formularios inteligentes</li>
                    <li>Visor 3D interactivo</li>
                    <li>Alertas de errores en tiempo real</li>
                    <li>Enfierradura automática</li>
                </ul>
                <button class="btn-module-app" onclick="window.open('SOFTWARE-ESTRUCTURAL/index.html', '_blank')">Abrir aplicación</button>
            </div>
            <div class="module-card" data-module="ingelab">
                <div class="module-icon">🏗️</div>
                <h3>ingeLAB</h3>
                <p>Sistema Educativo Interactivo de Estructuras 3D</p>
                <ul class="module-features">
                    <li>Visualización 3D interactiva</li>
                    <li>Modo educativo con etiquetas</li>
                    <li>Vista explosiva de componentes</li>
                    <li>Sistemas de instalaciones integrados</li>
                </ul>
                <button class="btn-module-app" onclick="window.open('SOFTWARE-INGELAB/index.html', '_blank')">Abrir aplicación</button>
            </div>
            <div class="module-card" data-module="ingelab2">
                <div class="module-icon">🏗️</div>
                <h3>ingeLAB 2.0</h3>
                <p>Maquetas Estructurales 3D — Edificios Reales</p>
                <ul class="module-features">
                    <li>Selector de proyectos estructurales</li>
                    <li>Visor 3D con modelos GLB/GLTF</li>
                    <li>Diagramas y fundamentos estructurales</li>
                    <li>Simulación sísmica integrada</li>
                </ul>
                <button class="btn-module-app" onclick="window.open('SOFTWARE-edificio3_estructural/index.html', '_blank')">Abrir aplicación</button>
            </div>
            <div class="module-card" data-module="tank">
                <div class="module-icon">🔵💧</div>
                <h3>TRUJILLO ESTANQUES</h3>
                <p>Cálculos Estanques de Agua Potable + Bombas</p>
                <ul class="module-features">
                    <li>Dimensionamiento automático</li>
                    <li>Cálculo de bombas hidráulicas</li>
                    <li>Memorias técnicas automáticas</li>
                    <li>Normativa RIDAA integrada</li>
                </ul>
                <button class="btn-module-app" onclick="window.open('SOFTWARE-CALCULO-ESTANQUE-AP/index.html', '_blank')">Abrir aplicación</button>
            </div>
            <div class="module-card" data-module="cubica">
                <div class="module-icon">📐</div>
                <h3>TRUJILLO CUBICACIONES</h3>
                <p>Cálculo y cubicación de materiales de construcción</p>
                <ul class="module-features">
                    <li>Cálculo automático de materiales</li>
                    <li>Cubicación de hormigón y enfierradura</li>
                    <li>Reportes detallados</li>
                    <li>Exportación automática</li>
                </ul>
                <button class="btn-module-app" onclick="window.open('SOFTWARE-CUBICA/index.html', '_blank')">Abrir aplicación</button>
            </div>
            <div class="module-card" data-module="pavimento">
                <div class="module-icon">🛣️</div>
                <h3>PAVIMENTACIÓN EDUCATIVO CHILE</h3>
                <p>Sistema Educativo Interactivo de Pavimentación</p>
                <ul class="module-features">
                    <li>Visualización interactiva de pavimentos</li>
                    <li>Normativa chilena integrada</li>
                    <li>Diseño y cálculo de pavimentos</li>
                    <li>Herramientas educativas especializadas</li>
                </ul>
                <button class="btn-module-app" onclick="window.open('SOFTWARE-PAVIMENTO/index.html', '_blank')">Abrir aplicación</button>
            </div>
        </div>
    </div>
</section>
`;
