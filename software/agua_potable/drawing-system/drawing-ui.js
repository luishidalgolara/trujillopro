const DrawingUI = {
    createToolbar() {
        const toolbar = document.createElement('div');
        toolbar.className = 'drawing-toolbar';
        toolbar.id = 'drawingToolbar';
        
        const title = document.createElement('div');
        title.className = 'drawing-toolbar-title';
        title.textContent = '🎨 HERRAMIENTAS DE DIBUJO';
        toolbar.appendChild(title);
        
        const toolsSection = document.createElement('div');
        toolsSection.className = 'drawing-tools-section';
        
        Object.values(DrawingTools).forEach(tool => {
            const btn = document.createElement('button');
            btn.className = 'drawing-tool-btn';
            btn.innerHTML = `${tool.icon} ${tool.label}`;
            btn.setAttribute('data-tool', tool.name);
            
            btn.addEventListener('click', () => {
                this.selectTool(tool.name);
            });
            
            toolsSection.appendChild(btn);
        });
        
        toolbar.appendChild(toolsSection);
        
        const textControlsSection = document.createElement('div');
        textControlsSection.className = 'drawing-text-controls';
        
        const textLabel = document.createElement('div');
        textLabel.className = 'drawing-text-label';
        textLabel.textContent = 'FORMATO TEXTO:';
        textControlsSection.appendChild(textLabel);
        
        // SELECTOR DE FUENTE
        const fontFamilyControl = document.createElement('div');
        fontFamilyControl.className = 'drawing-font-family-control';
        
        const fontFamilyLabel = document.createElement('span');
        fontFamilyLabel.textContent = 'Fuente:';
        fontFamilyLabel.className = 'drawing-font-label';
        fontFamilyControl.appendChild(fontFamilyLabel);
        
        const fontFamilyBtn = document.createElement('button');
        fontFamilyBtn.className = 'drawing-font-family-btn';
        fontFamilyBtn.id = 'currentFontFamily';
        fontFamilyBtn.textContent = DrawingText.fontFamily;
        fontFamilyControl.appendChild(fontFamilyBtn);
        
        const fontFamilyDropdown = document.createElement('div');
        fontFamilyDropdown.className = 'drawing-font-dropdown';
        
        DrawingText.fontFamilies.forEach(font => {
            const option = document.createElement('button');
            option.className = 'drawing-font-option';
            option.textContent = font;
            option.style.fontFamily = font;
            option.addEventListener('click', () => {
                DrawingText.setFontFamily(font);
                fontFamilyDropdown.style.display = 'none';
            });
            fontFamilyDropdown.appendChild(option);
        });
        
        fontFamilyBtn.addEventListener('click', () => {
            fontFamilyDropdown.style.display = 
                fontFamilyDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        fontFamilyControl.appendChild(fontFamilyDropdown);
        textControlsSection.appendChild(fontFamilyControl);
        
        // SELECTOR DE TAMAÑO
        const fontSizeControl = document.createElement('div');
        fontSizeControl.className = 'drawing-font-size-control';
        
        const fontSizeLabel = document.createElement('span');
        fontSizeLabel.textContent = 'Tamaño:';
        fontSizeLabel.className = 'drawing-font-label';
        fontSizeControl.appendChild(fontSizeLabel);
        
        const fontSizeBtn = document.createElement('button');
        fontSizeBtn.className = 'drawing-font-size-btn';
        fontSizeBtn.id = 'currentFontSize';
        fontSizeBtn.textContent = `${DrawingText.fontSize}px`;
        fontSizeControl.appendChild(fontSizeBtn);
        
        const fontSizeDropdown = document.createElement('div');
        fontSizeDropdown.className = 'drawing-font-dropdown';
        
        DrawingText.fontSizes.forEach(size => {
            const option = document.createElement('button');
            option.className = 'drawing-font-option';
            option.textContent = `${size}px`;
            option.addEventListener('click', () => {
                DrawingText.setFontSize(size);
                fontSizeDropdown.style.display = 'none';
            });
            fontSizeDropdown.appendChild(option);
        });
        
        fontSizeBtn.addEventListener('click', () => {
            fontSizeDropdown.style.display = 
                fontSizeDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        fontSizeControl.appendChild(fontSizeDropdown);
        textControlsSection.appendChild(fontSizeControl);
        
        // CONTROLES DE ESTILO
        const styleControls = document.createElement('div');
        styleControls.className = 'drawing-style-controls';
        
        const boldBtn = document.createElement('button');
        boldBtn.className = 'drawing-style-btn';
        boldBtn.id = 'btnBold';
        boldBtn.innerHTML = '<strong>B</strong>';
        boldBtn.title = 'Negrita';
        boldBtn.addEventListener('click', () => {
            DrawingText.toggleBold();
        });
        
        const italicBtn = document.createElement('button');
        italicBtn.className = 'drawing-style-btn';
        italicBtn.id = 'btnItalic';
        italicBtn.innerHTML = '<em>I</em>';
        italicBtn.title = 'Cursiva';
        italicBtn.addEventListener('click', () => {
            DrawingText.toggleItalic();
        });
        
        styleControls.appendChild(boldBtn);
        styleControls.appendChild(italicBtn);
        textControlsSection.appendChild(styleControls);
        
        toolbar.appendChild(textControlsSection);
        
        const orthoSection = document.createElement('div');
        orthoSection.className = 'drawing-ortho-section';
        
        const orthoBtn = document.createElement('button');
        orthoBtn.className = 'drawing-ortho-btn';
        orthoBtn.id = 'btnOrtho';
        orthoBtn.innerHTML = '🔲 ORTHO (F8)';
        orthoBtn.addEventListener('click', () => {
            DrawingOrtho.toggle();
        });
        
        orthoSection.appendChild(orthoBtn);
        toolbar.appendChild(orthoSection);
        
        const colorPicker = DrawingColors.createColorPicker();
        toolbar.appendChild(colorPicker);
        
        const actionsSection = document.createElement('div');
        actionsSection.className = 'drawing-actions-section';
        
        const clearBtn = document.createElement('button');
        clearBtn.className = 'drawing-action-btn drawing-clear-btn';
        clearBtn.innerHTML = '🗑️ Limpiar Todo';
        clearBtn.addEventListener('click', () => {
            this.clearAll();
        });
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'drawing-action-btn drawing-close-btn';
        closeBtn.innerHTML = '✕ Cerrar';
        closeBtn.addEventListener('click', () => {
            this.closeDrawing();
        });
        
        actionsSection.appendChild(clearBtn);
        actionsSection.appendChild(closeBtn);
        toolbar.appendChild(actionsSection);
        
        return toolbar;
    },
    
    selectTool(toolName) {
        DrawingState.setTool(toolName);
        
        document.querySelectorAll('.drawing-tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const btn = document.querySelector(`[data-tool="${toolName}"]`);
        if (btn) {
            btn.classList.add('active');
        }
    },
    
    clearAll() {
        if (confirm('¿Estás seguro de que quieres eliminar todos los dibujos?')) {
            document.querySelectorAll('.drawing-element').forEach(el => el.remove());
            DrawingState.drawnElements = [];
            DrawingState.reset();
        }
    },
    
    closeDrawing() {
        DrawingCore.deactivate();
    },
    
    show() {
        const toolbar = document.getElementById('drawingToolbar');
        if (toolbar) {
            toolbar.style.display = 'block';
        }
    },
    
    hide() {
        const toolbar = document.getElementById('drawingToolbar');
        if (toolbar) {
            toolbar.style.display = 'none';
        }
    }
};

window.DrawingUI = DrawingUI;