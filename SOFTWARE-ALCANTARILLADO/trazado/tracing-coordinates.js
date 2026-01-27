// trazado-inteligente/tracing-coordinates.js

function forceCorrectViewBox() {
    const tracingSvg = document.getElementById('tracingSvg');
    const currentFormat = plans[currentPlanIndex].format;
    const formatData = formats[currentFormat];
    
    tracingSvg.setAttribute('viewBox', `0 0 ${formatData.width} ${formatData.height}`);
    
    currentViewBox = { 
        x: 0, 
        y: 0, 
        width: formatData.width, 
        height: formatData.height 
    };
    
    return { width: formatData.width, height: formatData.height };
}

function screenToSVGCoords(screenX, screenY) {
    const tracingSvg = document.getElementById('tracingSvg');
    if (!tracingSvg) return { x: 0, y: 0 };
    
    try {
        forceCorrectViewBox();
        
        const pt = tracingSvg.createSVGPoint();
        pt.x = screenX;
        pt.y = screenY;
        
        const svgMatrix = tracingSvg.getScreenCTM().inverse();
        const svgPoint = pt.matrixTransform(svgMatrix);
        
        return { x: svgPoint.x, y: svgPoint.y };
    } catch (error) {
        console.warn('Error converting coordinates:', error);
        return { x: screenX, y: screenY };
    }
}