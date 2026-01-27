// ================================
// EDITOR COORDINATES
// Sistema de conversión de coordenadas
// ================================

function pantallaASVGCoords(pantallaX, pantallaY) {
    const tracingSvg = document.getElementById('tracingSvg');
    if (!tracingSvg) return { x: 0, y: 0 };
    
    try {
        if (typeof forceCorrectViewBox === 'function') {
            forceCorrectViewBox();
        }
        
        const pt = tracingSvg.createSVGPoint();
        pt.x = pantallaX;
        pt.y = pantallaY;
        
        const svgMatrix = tracingSvg.getScreenCTM().inverse();
        const svgPoint = pt.matrixTransform(svgMatrix);
        
        return { x: svgPoint.x, y: svgPoint.y };
    } catch (error) {
        console.warn('Error converting coordinates in pantallaASVGCoords:', error);
        
        const rect = tracingSvg.getBoundingClientRect();
        const viewBox = tracingSvg.viewBox.baseVal;
        
        const x = ((pantallaX - rect.left) / rect.width) * viewBox.width + viewBox.x;
        const y = ((pantallaY - rect.top) / rect.height) * viewBox.height + viewBox.y;
        
        return { x, y };
    }
}

function obtenerCoordsRelativas(e) {
    const tracingSvg = document.getElementById('tracingSvg');
    if (!tracingSvg) {
        const drawingBoard = document.getElementById('drawingBoard');
        const rect = drawingBoard.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    
    try {
        if (typeof forceCorrectViewBox === 'function') {
            forceCorrectViewBox();
        }
        
        const pt = tracingSvg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        
        const svgMatrix = tracingSvg.getScreenCTM().inverse();
        const svgPoint = pt.matrixTransform(svgMatrix);
        
        return { x: svgPoint.x, y: svgPoint.y };
    } catch (error) {
        console.warn('Error converting coordinates for image manipulation:', error);
        const tracingSvg = document.getElementById('tracingSvg');
        const rect = tracingSvg.getBoundingClientRect();
        const viewBox = tracingSvg.viewBox.baseVal;
        
        const x = ((e.clientX - rect.left) / rect.width) * viewBox.width + viewBox.x;
        const y = ((e.clientY - rect.top) / rect.height) * viewBox.height + viewBox.y;
        
        return { x, y };
    }
}

// Aliases para compatibilidad
window.screenToSVGCoords = pantallaASVGCoords;
window.getRelativeCoords = obtenerCoordsRelativas;

// Exportar
window.EditorCoordinates = {
    pantallaASVGCoords,
    obtenerCoordsRelativas,
    screenToSVGCoords: pantallaASVGCoords,
    getRelativeCoords: obtenerCoordsRelativas
};

console.log('✅ editor-coordinates.js cargado');