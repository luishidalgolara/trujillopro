// ARCHIVO: undo-redo.js

const UndoRedoSystem = {
    undoStack: [],
    redoStack: [],
    maxHistorySize: 50,
    observer: null,

    init() {
        setTimeout(() => {
            this.createButtons();
            this.updateButtonStates();
            this.startObserving();
        }, 500);
    },

    createButtons() {
        const panelDibujoCAD = Array.from(document.querySelectorAll('.panel-group'))
            .find(panel => panel.textContent.includes('Dibujo CAD:'));

        if (!panelDibujoCAD) {
            console.warn('⚠️ Panel de Dibujo CAD no encontrado, reintentando...');
            setTimeout(() => this.createButtons(), 500);
            return;
        }

        if (document.getElementById('undoBtn')) return;

        const undoRedoContainer = document.createElement('div');
        undoRedoContainer.style.cssText = `
            display: inline-flex;
            gap: 5px;
            margin-left: 10px;
            align-items: center;
        `;

        undoRedoContainer.innerHTML = `
            <button id="undoBtn" class="undo-redo-btn" title="Deshacer (Ctrl+Z)" style="
                background: #34495e;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                transition: all 0.2s;
            ">←</button>
            <button id="redoBtn" class="undo-redo-btn" title="Rehacer (Ctrl+Y)" style="
                background: #34495e;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                transition: all 0.2s;
            ">→</button>
        `;

        panelDibujoCAD.appendChild(undoRedoContainer);

        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());

        const style = document.createElement('style');
        style.textContent = `
            .undo-redo-btn:hover:not(:disabled) {
                background: #2c3e50 !important;
                transform: scale(1.05);
            }
            .undo-redo-btn:disabled {
                background: #95a5a6 !important;
                cursor: not-allowed;
                opacity: 0.5;
            }
        `;
        document.head.appendChild(style);

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault();
                this.undo();
            }
            if (e.ctrlKey && e.key === 'y') {
                e.preventDefault();
                this.redo();
            }
        });

        console.log('✅ Botones UNDO/REDO creados');
    },

    startObserving() {
        const tracingSvg = document.getElementById('tracingSvg');
        const drawingBoard = document.getElementById('drawingBoard');
        
        if (!tracingSvg || !drawingBoard) {
            setTimeout(() => this.startObserving(), 500);
            return;
        }

        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && this.shouldTrackElement(node)) {
                        this.addAction(node, 'add');
                    }
                });
            });
        });

        this.observer.observe(tracingSvg, { childList: true, subtree: true });
        this.observer.observe(drawingBoard, { childList: true, subtree: true });

        console.log('✅ Observer UNDO/REDO activo');
    },

    shouldTrackElement(element) {
        const tagName = element.tagName?.toLowerCase();
        if (!tagName) return false;

        const trackableTags = ['line', 'polyline', 'circle', 'ellipse', 'rect', 'path', 'polygon', 'g', 'text'];
        if (trackableTags.includes(tagName)) return true;

        if (element.classList?.contains('artifact-marker')) return true;
        if (element.classList?.contains('draggable-text')) return true;
        if (element.classList?.contains('detalle-integrado')) return true;

        return false;
    },

    addAction(element, action = 'add') {
        if (!element || !element.parentElement) return;

        if (this.undoStack.length >= this.maxHistorySize) {
            this.undoStack.shift();
        }

        const actionData = {
            element: element,
            action: action,
            parent: element.parentElement,
            nextSibling: element.nextSibling,
            display: element.style.display,
            timestamp: Date.now()
        };

        this.undoStack.push(actionData);
        this.redoStack = [];
        this.updateButtonStates();
    },

    undo() {
        if (this.undoStack.length === 0) {
            showStatus('⚠️ No hay acciones para deshacer');
            return;
        }

        const lastAction = this.undoStack.pop();
        
        if (lastAction.element && lastAction.element.parentElement) {
            lastAction.previousDisplay = lastAction.element.style.display;
            lastAction.element.style.display = 'none';
            
            this.redoStack.push(lastAction);
            this.updateButtonStates();
            
            showStatus('↶ Deshacer');
        }
    },

    redo() {
        if (this.redoStack.length === 0) {
            showStatus('⚠️ No hay acciones para rehacer');
            return;
        }

        const lastUndo = this.redoStack.pop();
        
        if (lastUndo.element) {
            lastUndo.element.style.display = lastUndo.previousDisplay || '';
            
            this.undoStack.push(lastUndo);
            this.updateButtonStates();
            
            showStatus('↷ Rehacer');
        }
    },

    updateButtonStates() {
        const undoBtn = document.getElementById('undoBtn');
        const redoBtn = document.getElementById('redoBtn');

        if (undoBtn) {
            undoBtn.disabled = this.undoStack.length === 0;
        }
        if (redoBtn) {
            redoBtn.disabled = this.redoStack.length === 0;
        }
    },

    clear() {
        this.undoStack = [];
        this.redoStack = [];
        this.updateButtonStates();
        showStatus('🗑️ Historial limpiado');
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UndoRedoSystem.init());
} else {
    UndoRedoSystem.init();
}

window.UndoRedoSystem = UndoRedoSystem;

console.log('✅ undo-redo.js cargado');