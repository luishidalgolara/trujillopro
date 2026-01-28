/* INTERFAZ DE USUARIO */

const EarthquakeUI = {
    panelCreado: false,

    // Crear panel de controles
    crearPanel() {
        if (this.panelCreado) return;

        const panelHTML = `
        <div class="earthquake-panel" id="earthquakePanel">
            <div class="eq-header">
                <span class="eq-title">🌊 SIMULADOR TERREMOTO</span>
                <button class="eq-toggle" onclick="EarthquakeUI.togglePanel()">−</button>
            </div>
            
            <div class="eq-body" id="eqBody">
                <div class="eq-control">
                    <label>Intensidad (Richter):</label>
                    <div class="eq-slider-container">
                        <input type="range" id="eqIntensidad" min="3" max="8" step="1" value="5" 
                               oninput="EarthquakeUI.actualizarIntensidad(this.value)">
                        <span id="eqIntensidadValor" class="eq-valor">5.0</span>
                    </div>
                    <div id="eqIntensidadNombre" class="eq-nombre">Moderado</div>
                </div>

                <div class="eq-control">
                    <label>Duración (segundos):</label>
                    <div class="eq-slider-container">
                        <input type="range" id="eqDuracion" min="5" max="60" step="5" value="20"
                               oninput="EarthquakeUI.actualizarDuracion(this.value)">
                        <span id="eqDuracionValor" class="eq-valor">20s</span>
                    </div>
                </div>

                <div class="eq-buttons">
                    <button class="eq-btn eq-btn-start" id="eqBtnIniciar" onclick="EarthquakeUI.iniciar()">
                        ▶️ Iniciar
                    </button>
                    <button class="eq-btn eq-btn-pause" id="eqBtnPausar" onclick="EarthquakeUI.pausar()" disabled>
                        ⏸️ Pausar
                    </button>
                    <button class="eq-btn eq-btn-stop" id="eqBtnDetener" onclick="EarthquakeUI.detener()" disabled>
                        ⏹️ Detener
                    </button>
                </div>

                <div class="eq-progress" id="eqProgress" style="display: none;">
                    <div class="eq-progress-bar" id="eqProgressBar"></div>
                </div>

                <div class="eq-checkbox">
                    <label>
                        <input type="checkbox" id="eqSacudidaCamara" checked onchange="EarthquakeUI.toggleCamara()">
                        Sacudida de cámara
                    </label>
                </div>

                <div class="eq-advanced-section">
                    <div class="eq-section-title">⚡ EFECTOS AVANZADOS</div>
                    <div class="eq-checkbox">
                        <label>
                            <input type="checkbox" id="eqOndasSuelo" checked onchange="EarthquakeUI.toggleOndasSuelo()">
                            Ondas en el suelo
                        </label>
                    </div>
                    <div class="eq-checkbox">
                        <label>
                            <input type="checkbox" id="eqGrietas" checked onchange="EarthquakeUI.toggleGrietas()">
                            Grietas dinámicas
                        </label>
                    </div>
                    <div class="eq-checkbox">
                        <label>
                            <input type="checkbox" id="eqResonancia" checked onchange="EarthquakeUI.toggleResonancia()">
                            Resonancia estructural
                        </label>
                    </div>
                    <div class="eq-checkbox">
                        <label>
                            <input type="checkbox" id="eqTorsion" checked onchange="EarthquakeUI.toggleTorsion()">
                            Torsión del edificio
                        </label>
                    </div>
                </div>
            </div>
        </div>
        `;

        const container = document.querySelector('.vista-3d-canvas-wrapper');
        if (container) {
            container.insertAdjacentHTML('beforeend', panelHTML);
            this.panelCreado = true;
            console.log('✅ Panel de terremoto creado');
        }
    },

    // Toggle panel
    togglePanel() {
        const body = document.getElementById('eqBody');
        const toggle = document.querySelector('.eq-toggle');
        if (body.style.display === 'none') {
            body.style.display = 'block';
            toggle.textContent = '−';
        } else {
            body.style.display = 'none';
            toggle.textContent = '+';
        }
    },

    // Actualizar intensidad
    actualizarIntensidad(valor) {
        const intensidad = parseFloat(valor);
        document.getElementById('eqIntensidadValor').textContent = intensidad.toFixed(1);
        
        const config = EarthquakeConfig.intensidades[intensidad];
        const nombreEl = document.getElementById('eqIntensidadNombre');
        nombreEl.textContent = config.nombre;
        nombreEl.style.color = config.color;

        // Si está activo, cambiar en tiempo real
        if (EarthquakeController.activo) {
            EarthquakeController.cambiarIntensidad(intensidad);
        }
    },

    // Actualizar duración
    actualizarDuracion(valor) {
        document.getElementById('eqDuracionValor').textContent = `${valor}s`;
    },

    // Iniciar
    iniciar() {
        const intensidad = parseFloat(document.getElementById('eqIntensidad').value);
        const duracion = parseInt(document.getElementById('eqDuracion').value);

        EarthquakeController.iniciar(intensidad, duracion);

        // Actualizar botones
        document.getElementById('eqBtnIniciar').disabled = true;
        document.getElementById('eqBtnPausar').disabled = false;
        document.getElementById('eqBtnDetener').disabled = false;
        document.getElementById('eqProgress').style.display = 'block';
    },

    // Pausar
    pausar() {
        const pausado = EarthquakeController.pausar();
        const btn = document.getElementById('eqBtnPausar');
        btn.textContent = pausado ? '▶️ Reanudar' : '⏸️ Pausar';
    },

    // Detener
    detener() {
        EarthquakeController.detener();
        this.resetearUI();
    },

    // Resetear UI
    resetearUI() {
        document.getElementById('eqBtnIniciar').disabled = false;
        document.getElementById('eqBtnPausar').disabled = true;
        document.getElementById('eqBtnPausar').textContent = '⏸️ Pausar';
        document.getElementById('eqBtnDetener').disabled = true;
        document.getElementById('eqProgress').style.display = 'none';
        document.getElementById('eqProgressBar').style.width = '0%';
    },

    // Actualizar progreso
    actualizarProgreso(porcentaje) {
        const bar = document.getElementById('eqProgressBar');
        if (bar) {
            bar.style.width = `${Math.min(porcentaje, 100)}%`;
        }
    },

    // Toggle cámara
    toggleCamara() {
        const checked = document.getElementById('eqSacudidaCamara').checked;
        EarthquakeEffects.sacudidaCamara = checked;
    },

    // Toggle ondas suelo
    toggleOndasSuelo() {
        if (window.EarthquakeVisualEffects) {
            const checked = document.getElementById('eqOndasSuelo').checked;
            EarthquakeVisualEffects.ondasSuelo = checked;
        }
    },

    // Toggle grietas
    toggleGrietas() {
        if (window.EarthquakeVisualEffects) {
            const checked = document.getElementById('eqGrietas').checked;
            EarthquakeVisualEffects.grietas = checked;
        }
    },

    // Toggle resonancia
    toggleResonancia() {
        if (window.EarthquakeStructuralFX) {
            const checked = document.getElementById('eqResonancia').checked;
            EarthquakeStructuralFX.resonanciaEnabled = checked;
        }
    },

    // Toggle torsión
    toggleTorsion() {
        if (window.EarthquakeStructuralFX) {
            const checked = document.getElementById('eqTorsion').checked;
            EarthquakeStructuralFX.torsionEnabled = checked;
        }
    }
};

window.EarthquakeUI = EarthquakeUI;
