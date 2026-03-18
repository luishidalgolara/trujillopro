document.getElementById('section-problem').innerHTML = `
<section class="problem-section" id="problem">
    <div class="container">
        <div class="section-header">
            <span class="section-tag">EL PROBLEMA</span>
            <h2 class="section-title">Software Genérico<br>vs. Especialización</h2>
        </div>
        <div class="problem-grid">
            <div class="problem-card problem-bad">
                <div class="card-icon">❌</div>
                <h3>AutoCAD / Revit</h3>
                <p class="card-subtitle">Herramientas Genéricas</p>
                <ul class="feature-list">
                    <li>Diseñado para cualquier disciplina</li>
                    <li>Cientos de pasos manuales</li>
                    <li>Sin automatización especializada</li>
                    <li>12-24 meses de aprendizaje</li>
                    <li>Sin normativa local</li>
                </ul>
            </div>
            <div class="problem-card problem-good">
                <div class="card-icon card-icon-good">✓</div>
                <h3>TRUJILLO</h3>
                <p class="card-subtitle">Sistema Especializado</p>
                <ul class="feature-list">
                    <li>100% especializado por área</li>
                    <li>Automatización total del proceso</li>
                    <li>Trazados e isométricos automáticos</li>
                    <li>Productivo desde día 1</li>
                    <li>Normativa chilena integrada</li>
                </ul>
            </div>
        </div>
    </div>
</section>
`;
