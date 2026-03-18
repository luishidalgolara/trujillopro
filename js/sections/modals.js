document.getElementById('section-modals').innerHTML = `
<!-- Modal PDF Viewer -->
<div id="pdfModal" class="pdf-modal">
    <div class="pdf-modal-content">
        <div class="pdf-modal-header">
            <h3>Modelo de Licenciamiento TRUJILLO</h3>
            <span class="pdf-modal-close">&times;</span>
        </div>
        <div class="pdf-modal-body">
            <iframe id="pdfViewer" src="" frameborder="0"></iframe>
        </div>
        <div class="pdf-modal-footer">
            <a href="PDF/Modelo_Licenciamiento.pdf" download class="btn-download-pdf">
                <span>⬇️</span> Descargar PDF
            </a>
        </div>
    </div>
</div>

<!-- Lightbox -->
<div id="lightbox" class="lightbox">
    <span class="lightbox-close">&times;</span>
    <span class="lightbox-prev">&#10094;</span>
    <span class="lightbox-next">&#10095;</span>
    <img class="lightbox-content" id="lightbox-img">
    <div class="lightbox-caption"></div>
    <div class="lightbox-counter"></div>
</div>

<!-- Video Modal -->
<div id="videoModal" class="video-modal">
    <div class="video-modal-content">
        <div class="video-modal-header">
            <h3>Video Demostrativo</h3>
            <span class="video-modal-close">&times;</span>
        </div>
        <div class="video-modal-body">
            <span class="video-nav video-nav-prev">&#10094;</span>
            <video id="videoPlayer" controls controlsList="nodownload">
                Tu navegador no soporta el elemento de video.
            </video>
            <span class="video-nav video-nav-next">&#10095;</span>
            <div class="video-counter">1 / 2</div>
        </div>
        <div class="video-modal-footer">
            <div class="video-info">
                <div class="video-icon">🎥</div>
                <div class="video-details">
                    <h4>Título del Video</h4>
                    <p>Descripción del video</p>
                </div>
            </div>
            <div class="video-controls">
                <button class="btn-video-control" onclick="toggleVideoPlayPause()">
                    <span>⏯️</span> Play/Pause
                </button>
                <button class="btn-video-control primary" onclick="toggleVideoFullscreen()">
                    <span>⛶</span> Pantalla Completa
                </button>
            </div>
        </div>
    </div>
</div>
`;
