/**
 * EraseTool.js - Herramienta para borrar objetos
 * Permite borrar entidades haciendo clic en ellas
 */

class EraseTool extends Tool {
    constructor() {
        super('erase');
        this.highlightedItem = null;
    }

    onActivate() {
        this.updateStatus('BORRAR: Haga clic en los objetos para borrarlos');
        this.highlightedItem = null;
    }

    onDeactivate() {
        this.removeHighlight();
    }

    onMouseDown(event) {
        const point = event.point;
        
        // Buscar entidad bajo el cursor
        const hitResult = paper.project.hitTest(point, {
            segments: true,
            stroke: true,
            fill: true,
            tolerance: 5
        });

        if (hitResult && hitResult.item) {
            this.eraseEntity(hitResult.item);
        }
    }

    onMouseMove(event) {
        const point = event.point;
        
        // Buscar entidad bajo el cursor para resaltar
        const hitResult = paper.project.hitTest(point, {
            segments: true,
            stroke: true,
            fill: true,
            tolerance: 5
        });

        // Remover resaltado anterior
        this.removeHighlight();

        if (hitResult && hitResult.item) {
            // Evitar resaltar el grid
            if (hitResult.item.strokeColor && 
                (hitResult.item.strokeColor.toCSS(true) === 'rgba(255,255,255,0.08)' ||
                 hitResult.item.strokeColor.toCSS(true) === 'rgba(0,168,255,0.3)')) {
                return;
            }

            this.highlightEntity(hitResult.item);
        }
    }

    /**
     * Borra una entidad
     */
    eraseEntity(item) {
        // Evitar borrar el grid
        if (item.strokeColor && 
            (item.strokeColor.toCSS(true) === 'rgba(255,255,255,0.08)' ||
             item.strokeColor.toCSS(true) === 'rgba(0,168,255,0.3)')) {
            return;
        }

        item.remove();
        this.updateStatus('BORRAR: Objeto eliminado. Haga clic en más objetos para borrarlos');
        console.log('✓ Objeto eliminado');
    }

    /**
     * Resalta una entidad que se puede borrar
     */
    highlightEntity(item) {
        this.highlightedItem = item;
        
        if (!item.data.originalColor) {
            item.data.originalColor = item.strokeColor ? item.strokeColor.clone() : null;
            item.data.originalWidth = item.strokeWidth;
        }
        
        item.strokeColor = '#ff4444';
        item.strokeWidth = (item.data.originalWidth || 1.5) + 1;
    }

    /**
     * Quita el resaltado
     */
    removeHighlight() {
        if (this.highlightedItem) {
            if (this.highlightedItem.data.originalColor) {
                this.highlightedItem.strokeColor = this.highlightedItem.data.originalColor;
                this.highlightedItem.strokeWidth = this.highlightedItem.data.originalWidth;
            }
            this.highlightedItem = null;
        }
    }

    onKeyDown(event) {
        // Escape cancela
        if (event.key === 'Escape') {
            this.removeHighlight();
            this.updateStatus('BORRAR: Haga clic en los objetos para borrarlos');
        }
    }
}
