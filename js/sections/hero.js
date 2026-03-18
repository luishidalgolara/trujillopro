document.getElementById('section-hero').innerHTML = `
<section class="hero" id="hero">
    <div class="hero-bg"><div class="hero-grid"></div></div>

    <!-- TIMBRE 1 -->
    <svg class="patent-seal" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" onclick="openCertificate1()">
        <defs><radialGradient id="stampGradient"><stop offset="0%" style="stop-color:#dc2626;stop-opacity:1"/><stop offset="100%" style="stop-color:#991b1b;stop-opacity:1"/></radialGradient></defs>
        <circle cx="100" cy="100" r="95" fill="none" stroke="#dc2626" stroke-width="4" opacity="0.95"/>
        <circle cx="100" cy="100" r="88" fill="none" stroke="#dc2626" stroke-width="2.5" opacity="0.9"/>
        <path id="curveTop" d="M 35,70 A 65,50 0 0,1 165,70" fill="none"/>
        <text font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626" letter-spacing="3"><textPath href="#curveTop" startOffset="50%" text-anchor="middle">PRODUCTO PATENTADO</textPath></text>
        <path id="curveBottom" d="M 20,100 A 80,80 0 0,0 180,100" fill="none"/>
        <text font-family="Arial, sans-serif" font-size="7" font-weight="600" fill="#dc2626" letter-spacing="1"><textPath href="#curveBottom" startOffset="50%" text-anchor="middle">DEPARTAMENTO DE DERECHOS INTELECTUALES</textPath></text>
        <text x="100" y="80"  font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">SERVICIO NACIONAL</text>
        <text x="100" y="96"  font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">DEL PATRIMONIO</text>
        <text x="100" y="112" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">CULTURAL</text>
        <line x1="50" y1="122" x2="150" y2="122" stroke="#dc2626" stroke-width="1.5" opacity="0.7"/>
        <text x="100" y="134" font-family="Arial, sans-serif" font-size="6.5" font-weight="600" fill="#dc2626" text-anchor="middle">(MINISTERIO DE LAS CULTURAS,</text>
        <text x="100" y="144" font-family="Arial, sans-serif" font-size="6.5" font-weight="600" fill="#dc2626" text-anchor="middle">LAS ARTES Y EL PATRIMONIO)</text>
        <text x="100" y="162" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#dc2626" text-anchor="middle">Nº 2026-A-425</text>
        <circle cx="100" cy="100" r="92" fill="none" stroke="#dc2626" stroke-width="0.8" opacity="0.4"/>
    </svg>

    <!-- TIMBRE 2 -->
    <svg class="patent-seal-2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" onclick="openCertificate2()">
        <defs><radialGradient id="stampGradient2"><stop offset="0%" style="stop-color:#dc2626;stop-opacity:1"/><stop offset="100%" style="stop-color:#991b1b;stop-opacity:1"/></radialGradient></defs>
        <circle cx="100" cy="100" r="95" fill="none" stroke="#dc2626" stroke-width="4" opacity="0.95"/>
        <circle cx="100" cy="100" r="88" fill="none" stroke="#dc2626" stroke-width="2.5" opacity="0.9"/>
        <path id="curveTop2" d="M 35,70 A 65,50 0 0,1 165,70" fill="none"/>
        <text font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626" letter-spacing="3"><textPath href="#curveTop2" startOffset="50%" text-anchor="middle">PRODUCTO PATENTADO</textPath></text>
        <path id="curveBottom2" d="M 20,100 A 80,80 0 0,0 180,100" fill="none"/>
        <text font-family="Arial, sans-serif" font-size="7" font-weight="600" fill="#dc2626" letter-spacing="1"><textPath href="#curveBottom2" startOffset="50%" text-anchor="middle">DEPARTAMENTO DE DERECHOS INTELECTUALES</textPath></text>
        <text x="100" y="80"  font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">SERVICIO NACIONAL</text>
        <text x="100" y="96"  font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">DEL PATRIMONIO</text>
        <text x="100" y="112" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">CULTURAL</text>
        <line x1="50" y1="122" x2="150" y2="122" stroke="#dc2626" stroke-width="1.5" opacity="0.7"/>
        <text x="100" y="134" font-family="Arial, sans-serif" font-size="6.5" font-weight="600" fill="#dc2626" text-anchor="middle">(MINISTERIO DE LAS CULTURAS,</text>
        <text x="100" y="144" font-family="Arial, sans-serif" font-size="6.5" font-weight="600" fill="#dc2626" text-anchor="middle">LAS ARTES Y EL PATRIMONIO)</text>
        <text x="100" y="162" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#dc2626" text-anchor="middle">Nº 2026-A-256</text>
        <circle cx="100" cy="100" r="92" fill="none" stroke="#dc2626" stroke-width="0.8" opacity="0.4"/>
    </svg>

    <!-- TIMBRE 3 -->
    <svg class="patent-seal-3" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" onclick="openCertificate3()">
        <defs><radialGradient id="stampGradient3"><stop offset="0%" style="stop-color:#dc2626;stop-opacity:1"/><stop offset="100%" style="stop-color:#991b1b;stop-opacity:1"/></radialGradient></defs>
        <circle cx="100" cy="100" r="95" fill="none" stroke="#dc2626" stroke-width="4" opacity="0.95"/>
        <circle cx="100" cy="100" r="88" fill="none" stroke="#dc2626" stroke-width="2.5" opacity="0.9"/>
        <path id="curveTop3" d="M 35,70 A 65,50 0 0,1 165,70" fill="none"/>
        <text font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626" letter-spacing="3"><textPath href="#curveTop3" startOffset="50%" text-anchor="middle">PRODUCTO PATENTADO</textPath></text>
        <path id="curveBottom3" d="M 20,100 A 80,80 0 0,0 180,100" fill="none"/>
        <text font-family="Arial, sans-serif" font-size="7" font-weight="600" fill="#dc2626" letter-spacing="1"><textPath href="#curveBottom3" startOffset="50%" text-anchor="middle">DEPARTAMENTO DE DERECHOS INTELECTUALES</textPath></text>
        <text x="100" y="80"  font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">SERVICIO NACIONAL</text>
        <text x="100" y="96"  font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">DEL PATRIMONIO</text>
        <text x="100" y="112" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626" text-anchor="middle">CULTURAL</text>
        <line x1="50" y1="122" x2="150" y2="122" stroke="#dc2626" stroke-width="1.5" opacity="0.7"/>
        <text x="100" y="134" font-family="Arial, sans-serif" font-size="6.5" font-weight="600" fill="#dc2626" text-anchor="middle">(MINISTERIO DE LAS CULTURAS,</text>
        <text x="100" y="144" font-family="Arial, sans-serif" font-size="6.5" font-weight="600" fill="#dc2626" text-anchor="middle">LAS ARTES Y EL PATRIMONIO)</text>
        <text x="100" y="162" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#dc2626" text-anchor="middle">Nº 2026-A-1519</text>
        <circle cx="100" cy="100" r="92" fill="none" stroke="#dc2626" stroke-width="0.8" opacity="0.4"/>
    </svg>

    <div class="hero-content">
        <div class="hero-label">SOFTWARE PROFESIONAL</div>
        <h1 class="hero-title">
            <span class="hero-title-line">TRUJILLO</span>
            <span class="hero-title-line hero-title-accent">INNOVACIÓN REAL</span>
        </h1>
        <p class="hero-subtitle">Sistema automatizado especializado en diseño de instalaciones domiciliarias</p>
        <div class="hero-stats">
            <div class="stat-item"><div class="stat-number">12</div><div class="stat-label">Módulos<br>Especializados</div></div>
            <div class="stat-item"><div class="stat-number">85</div><div class="stat-label">Ahorro de<br>Tiempo (%)</div></div>
            <div class="stat-item"><div class="stat-number">50</div><div class="stat-label">Licencias<br>Simultáneas</div></div>
        </div>
        <div class="hero-cta">
            <button class="btn-primary">Solicitar Demo</button>
            <button class="btn-secondary">Ver Presentación</button>
        </div>
    </div>
    <div class="scroll-indicator">
        <div class="scroll-line"></div>
        <span>Scroll</span>
    </div>
</section>
`;
