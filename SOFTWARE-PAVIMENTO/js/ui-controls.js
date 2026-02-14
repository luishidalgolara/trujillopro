// Controlador de la interfaz de usuario
class UIController {
    constructor() {
        this.currentTipo = 'flexible';
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Botones de tipo de pavimento
        const tipoBtns = document.querySelectorAll('.tipo-btn');
        tipoBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tipo = btn.getAttribute('data-tipo');
                this.cambiarTipo(tipo);
                
                // Actualizar botón activo
                tipoBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Botón explotar capas
        document.getElementById('btn-explotar').addEventListener('click', () => {
            if (viewer3D) {
                viewer3D.explotar();
                const btn = document.getElementById('btn-explotar');
                btn.classList.toggle('active');
            }
        });

        // Botón rotar
        document.getElementById('btn-rotar').addEventListener('click', () => {
            if (viewer3D) {
                viewer3D.toggleRotacion();
                const btn = document.getElementById('btn-rotar');
                btn.classList.toggle('active');
            }
        });

        // Botón reset
        document.getElementById('btn-reset').addEventListener('click', () => {
            if (viewer3D) {
                viewer3D.resetVista();
                document.getElementById('btn-explotar').classList.remove('active');
                document.getElementById('btn-rotar').classList.remove('active');
            }
        });

        // Evento personalizado de selección de capa
        window.addEventListener('capaSelected', (e) => {
            this.mostrarInfoCapa(e.detail);
        });
    }

    cambiarTipo(tipo) {
        this.currentTipo = tipo;
        
        if (viewer3D) {
            viewer3D.cargarPavimento(tipo);
        }
        
        this.actualizarInfoPanel(tipo);
        this.actualizarCheckboxesCapas(tipo);
    }

    actualizarInfoPanel(tipo) {
        const datos = pavimentosData[tipo];
        
        // Actualizar título
        document.getElementById('info-title').textContent = datos.nombre;
        
        // Actualizar descripción
        document.getElementById('info-descripcion').textContent = datos.descripcion;
        
        // Actualizar material
        document.getElementById('info-material').textContent = datos.material;
        
        // Actualizar estructura
        document.getElementById('info-estructura').textContent = datos.estructura;
        
        // Actualizar capas
        const capasHTML = datos.capas.map((capa, index) => `
            <div class="capa-item">
                <div class="capa-color" style="background-color: ${capa.color}"></div>
                <div class="capa-info">
                    <strong>${capa.nombre}</strong>
                    <span class="capa-espesor">${capa.espesor}</span>
                </div>
            </div>
        `).join('');
        document.getElementById('info-capas').innerHTML = capasHTML;
        
        // Actualizar ventajas
        const ventajasHTML = datos.ventajas.map(v => `<li>${v}</li>`).join('');
        document.getElementById('info-ventajas').innerHTML = ventajasHTML;
        
        // Actualizar desventajas
        const desventajasHTML = datos.desventajas.map(d => `<li>${d}</li>`).join('');
        document.getElementById('info-desventajas').innerHTML = desventajasHTML;
        
        // Actualizar datos de Chile
        this.actualizarDatosChile(datos.datosChile);
    }

    actualizarDatosChile(datosChile) {
        const chileHTML = `
            <div class="chile-info">
                <div class="info-item">
                    <strong>📋 Normas aplicables:</strong>
                    <ul>
                        ${datosChile.normas.map(norma => `<li>${norma}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="info-item">
                    <strong>📊 Uso en Chile:</strong>
                    <p>${datosChile.usoComun}</p>
                </div>
                
                <div class="info-item">
                    <strong>🏗️ Ejemplos en Chile:</strong>
                    <ul>
                        ${datosChile.ejemplos.map(ej => `<li>${ej}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="info-item">
                    <strong>🌡️ Consideraciones climáticas:</strong>
                    <p>${datosChile.clima}</p>
                </div>
                
                <div class="info-item">
                    <strong>💰 Costo referencial:</strong>
                    <p>${datosChile.costoReferencial}</p>
                </div>
            </div>
        `;
        
        document.getElementById('info-chile').innerHTML = chileHTML;
    }

    actualizarCheckboxesCapas(tipo) {
        const datos = pavimentosData[tipo];
        const container = document.getElementById('capas-checkboxes');
        
        const checkboxesHTML = datos.capas.map((capa, index) => `
            <div class="capa-checkbox">
                <input type="checkbox" id="capa-${index}" checked data-index="${index}">
                <label for="capa-${index}">
                    <span class="checkbox-color" style="background-color: ${capa.color}"></span>
                    ${capa.nombre}
                </label>
            </div>
        `).join('');
        
        container.innerHTML = checkboxesHTML;
        
        // Agregar event listeners a los checkboxes
        datos.capas.forEach((capa, index) => {
            const checkbox = document.getElementById(`capa-${index}`);
            checkbox.addEventListener('change', (e) => {
                if (viewer3D) {
                    viewer3D.toggleCapaVisibility(index, e.target.checked);
                }
            });
        });
    }

    mostrarInfoCapa(capaData) {
        // Crear tooltip o modal con información de la capa
        const existingTooltip = document.querySelector('.capa-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        const tooltip = document.createElement('div');
        tooltip.className = 'capa-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-header">
                <h4>${capaData.nombre}</h4>
                <button class="tooltip-close">&times;</button>
            </div>
            <div class="tooltip-body">
                <p>${capaData.descripcion}</p>
                <p><strong>Espesor típico:</strong> ${capaData.espesor}</p>
            </div>
        `;
        
        document.body.appendChild(tooltip);
        
        // Cerrar tooltip
        tooltip.querySelector('.tooltip-close').addEventListener('click', () => {
            tooltip.remove();
        });
        
        // Auto cerrar después de 5 segundos
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 5000);
    }

    ocultarLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }
    }
}

// Instancia global del controlador UI
let uiController = null;
