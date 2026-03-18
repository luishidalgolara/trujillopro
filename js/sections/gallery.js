document.getElementById('section-gallery').innerHTML = `
<section class="gallery-section" id="gallery">
    <div class="container">
        <div class="section-header">
            <span class="section-tag">CAPTURAS DE PANTALLA</span>
            <h2 class="section-title">El Software<br>en Acción</h2>
        </div>
        <div class="gallery-tabs">
            <button class="gallery-tab" data-tab="medical3d">🏥 Medical 3D</button>
            <button class="gallery-tab" data-tab="medvision">🔬 MedVision</button>
            <button class="gallery-tab active" data-tab="electric">⚡ Eléctrico</button>
            <button class="gallery-tab" data-tab="water">💧 Agua Potable</button>
            <button class="gallery-tab" data-tab="sewer">🚿 Alcantarillado</button>
            <button class="gallery-tab" data-tab="structure">🏗️ Estructural</button>
            <button class="gallery-tab" data-tab="ingelab">🏗️ ingeLAB</button>
            <button class="gallery-tab" data-tab="ingelab2">🏗️ ingeLAB 2.0</button>
            <button class="gallery-tab" data-tab="tank">🔵💧 Estanques AP</button>
            <button class="gallery-tab" data-tab="cubicacion">📐 Cubicaciones</button>
            <button class="gallery-tab" data-tab="pavimento">🛣️ Pavimentación</button>
            <button class="gallery-tab" data-tab="videos">🎥 Videos</button>
        </div>
        <div class="gallery-grid" id="galleryGrid"></div>
    </div>
</section>
`;
