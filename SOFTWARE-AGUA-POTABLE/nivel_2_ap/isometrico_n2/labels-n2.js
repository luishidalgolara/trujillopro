// nivel_2_ap/isometrico_n2/labels-n2.js

IsometricWaterGeneratorN2.prototype.setupLabelManipulation = function(svgElement) {
    if (!svgElement) return;
    
    const labels = svgElement.querySelectorAll('.pipe-label, .title-group');
    
    labels.forEach(label => {
        label.style.cursor = 'move';
        label.style.pointerEvents = 'all';
        
        let isDragging = false;
        let startX, startY;
        let currentTransform = { x: 0, y: 0 };
        
        const transform = label.getAttribute('transform');
        if (transform) {
            const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
            if (match) {
                currentTransform.x = parseFloat(match[1]);
                currentTransform.y = parseFloat(match[2]);
            }
        }
        
        const onMouseDown = function(e) {
            isDragging = true;
            
            const svgRect = svgElement.getBoundingClientRect();
            const viewBox = svgElement.viewBox.baseVal;
            const scaleX = viewBox.width / svgRect.width;
            const scaleY = viewBox.height / svgRect.height;
            
            startX = (e.clientX - svgRect.left) * scaleX + viewBox.x;
            startY = (e.clientY - svgRect.top) * scaleY + viewBox.y;
            
            label.style.cursor = 'grabbing';
            e.preventDefault();
            e.stopPropagation();
        };
        
        const onMouseMove = function(e) {
            if (!isDragging) return;
            
            const svgRect = svgElement.getBoundingClientRect();
            const viewBox = svgElement.viewBox.baseVal;
            const scaleX = viewBox.width / svgRect.width;
            const scaleY = viewBox.height / svgRect.height;
            
            const currentX = (e.clientX - svgRect.left) * scaleX + viewBox.x;
            const currentY = (e.clientY - svgRect.top) * scaleY + viewBox.y;
            
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;
            
            const newX = currentTransform.x + deltaX;
            const newY = currentTransform.y + deltaY;
            
            label.setAttribute('transform', `translate(${newX}, ${newY})`);
            
            const labelId = label.getAttribute('data-label-id');
            if (labelId) {
                const guideLine = svgElement.querySelector(`#guide-line-${labelId}`);
                if (guideLine) {
                    guideLine.setAttribute('x2', newX);
                    guideLine.setAttribute('y2', newY);
                }
            }
        };
        
        const onMouseUp = function() {
            if (!isDragging) return;
            
            isDragging = false;
            label.style.cursor = 'move';
            
            const transform = label.getAttribute('transform');
            if (transform) {
                const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
                if (match) {
                    currentTransform.x = parseFloat(match[1]);
                    currentTransform.y = parseFloat(match[2]);
                }
            }
        };
        
        label.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
};

console.log('✅ Motor Isométrico NIVEL 2 - Labels cargado');