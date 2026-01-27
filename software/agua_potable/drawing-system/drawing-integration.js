const DrawingIntegration = {
    install() {
        if (window.appActions) {
            window.appActions.openDrawingMode = () => {
                DrawingCore.activate();
            };
            
            window.appActions.closeDrawingMode = () => {
                DrawingCore.deactivate();
            };
            
            window.appActions.toggleDrawingMode = () => {
                DrawingCore.toggle();
            };
            
            window.appActions.exportDrawings = () => {
                return DrawingCore.exportDrawings();
            };
            
            window.appActions.importDrawings = (elements) => {
                DrawingCore.importDrawings(elements);
            };
            
            console.log('✅ Sistema de dibujo integrado con appActions');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    DrawingIntegration.install();
});

window.DrawingIntegration = DrawingIntegration;