/**
 * SelectTool.js - Herramienta para seleccionar objetos
 * Permite seleccionar y destacar entidades en el canvas
 */

class SelectTool extends Tool {
    constructor() {
        super('select');
        this.selectedEntities = [];
        this.allEntities = [];
    }

    onActivate() {
        this.updateStatus('SELECCIÓN: Haga clic en un objeto para seleccionarlo');
        this.clearSelection();
    }

    onDeactivate() {
        this.clearSelection();
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
            this.selectEntity(hitResult.item);
        } else {
            this.clearSelection();
        }
    }

    onKeyDown(event) {
        // Delete o Backspace para borrar seleccionados
        if (event.key === 'Delete' || event.key === 'Backspace') {
            this.deleteSelected();
        }
        // Escape para deseleccionar
        else if (event.key === 'Escape') {
            this.clearSelection();
        }
        // Ctrl+A para seleccionar todo
        else if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
            event.preventDefault();
            this.selectAll();
        }
    }

    /**
     * Selecciona una entidad
     */
    selectEntity(item) {
        // Limpiar selección anterior si no hay Ctrl presionado
        if (!event.ctrlKey && !event.metaKey) {
            this.clearSelection();
        }

        // Evitar seleccionar el grid
        if (item.strokeColor && 
            (item.strokeColor.toCSS(true) === 'rgba(255,255,255,0.08)' ||
             item.strokeColor.toCSS(true) === 'rgba(0,168,255,0.3)')) {
            return;
        }

        // Verificar si ya está seleccionado
        const index = this.selectedEntities.indexOf(item);
        if (index > -1) {
            // Deseleccionar si ya estaba seleccionado
            this.deselectEntity(item);
        } else {
            // Seleccionar
            this.selectedEntities.push(item);
            this.highlightEntity(item);
            this.updateStatus(`SELECCIÓN: ${this.selectedEntities.length} objeto(s) seleccionado(s) - [Delete] para borrar`);
        }
    }

    /**
     * Deselecciona una entidad específica
     */
    deselectEntity(item) {
        const index = this.selectedEntities.indexOf(item);
        if (index > -1) {
            this.unhighlightEntity(item);
            this.selectedEntities.splice(index, 1);
        }
    }

    /**
     * Resalta una entidad
     */
    highlightEntity(item) {
        if (item) {
            item.selected = true;
            // Guardar color original si no existe
            if (!item.data.originalColor) {
                item.data.originalColor = item.strokeColor ? item.strokeColor.clone() : null;
                item.data.originalWidth = item.strokeWidth;
            }
            item.strokeColor = '#00a8ff';
            item.strokeWidth = (item.data.originalWidth || 1.5) + 1;
        }
    }

    /**
     * Quita el resaltado de una entidad
     */
    unhighlightEntity(item) {
        if (item) {
            item.selected = false;
            if (item.data.originalColor) {
                item.strokeColor = item.data.originalColor;
                item.strokeWidth = item.data.originalWidth;
            }
        }
    }

    /**
     * Limpia toda la selección
     */
    clearSelection() {
        this.selectedEntities.forEach(item => {
            this.unhighlightEntity(item);
        });
        this.selectedEntities = [];
        this.updateStatus('SELECCIÓN: Haga clic en un objeto para seleccionarlo');
    }

    /**
     * Selecciona todos los objetos
     */
    selectAll() {
        this.clearSelection();
        
        // Seleccionar todos los items excepto el grid
        paper.project.activeLayer.children.forEach(item => {
            if (item.strokeColor && 
                item.strokeColor.toCSS(true) !== 'rgba(255,255,255,0.08)' &&
                item.strokeColor.toCSS(true) !== 'rgba(0,168,255,0.3)') {
                this.selectedEntities.push(item);
                this.highlightEntity(item);
            }
        });

        this.updateStatus(`SELECCIÓN: ${this.selectedEntities.length} objeto(s) seleccionado(s) - [Delete] para borrar`);
    }

    /**
     * Borra las entidades seleccionadas
     */
    deleteSelected() {
        if (this.selectedEntities.length === 0) {
            this.updateStatus('SELECCIÓN: No hay objetos seleccionados');
            return;
        }

        const count = this.selectedEntities.length;
        
        // Eliminar cada entidad
        this.selectedEntities.forEach(item => {
            item.remove();
        });

        this.selectedEntities = [];
        this.updateStatus(`SELECCIÓN: ${count} objeto(s) eliminado(s)`);
        
        console.log(`✓ ${count} objeto(s) eliminado(s)`);
    }

    /**
     * Obtiene las entidades seleccionadas
     */
    getSelectedEntities() {
        return this.selectedEntities;
    }
}
