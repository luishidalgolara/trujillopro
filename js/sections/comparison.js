document.getElementById('section-comparison').innerHTML = `
<section class="comparison-section" id="comparison">
    <div class="container">
        <div class="section-header">
            <span class="section-tag">COMPARACIÓN</span>
            <h2 class="section-title">Productividad<br>Real</h2>
        </div>
        <div class="comparison-table">
            <div class="comparison-header">
                <div class="comparison-cell">Tarea</div>
                <div class="comparison-cell">Software Genérico</div>
                <div class="comparison-cell comparison-highlight">TRUJILLO</div>
                <div class="comparison-cell comparison-highlight">Ahorro</div>
            </div>
            <div class="comparison-row">
                <div class="comparison-cell">Trazado de instalación</div>
                <div class="comparison-cell">4-6 horas</div>
                <div class="comparison-cell comparison-good">15-30 min</div>
                <div class="comparison-cell comparison-good">85-94%</div>
            </div>
            <div class="comparison-row">
                <div class="comparison-cell">Isométricos</div>
                <div class="comparison-cell">2-3 horas</div>
                <div class="comparison-cell comparison-good">Instantáneo</div>
                <div class="comparison-cell comparison-good">100%</div>
            </div>
            <div class="comparison-row">
                <div class="comparison-cell">Cuadros de cálculo</div>
                <div class="comparison-cell">3-4 horas</div>
                <div class="comparison-cell comparison-good">Automático</div>
                <div class="comparison-cell comparison-good">100%</div>
            </div>
            <div class="comparison-row">
                <div class="comparison-cell">Memoria técnica</div>
                <div class="comparison-cell">40 min-1.50 horas</div>
                <div class="comparison-cell comparison-good">Automático</div>
                <div class="comparison-cell comparison-good">100%</div>
            </div>
            <div class="comparison-row comparison-total">
                <div class="comparison-cell"><strong>Proyecto Completo</strong></div>
                <div class="comparison-cell"><strong>15-25 horas</strong></div>
                <div class="comparison-cell comparison-good"><strong>40 min-1.50 horas</strong></div>
                <div class="comparison-cell comparison-good"><strong>85-94%</strong></div>
            </div>
        </div>
        <div class="comparison-visual">
            <div class="time-bar time-bar-old">
                <span class="time-label">Software Tradicional</span>
                <div class="time-fill" style="width:100%">15-25 horas</div>
            </div>
            <div class="time-bar time-bar-new">
                <span class="time-label">TRUJILLO</span>
                <div class="time-fill time-fill-good" style="width:20%">40 min-1.50 horas</div>
            </div>
        </div>
    </div>
</section>
`;
