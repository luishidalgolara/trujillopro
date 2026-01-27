// draggable-texts/index.js - PUNTO DE ENTRADA PRINCIPAL
export { createTextWithDivider, createCompactVerticalTextDraggable } from './text-creation.js';
export { makeTextGroupEditable } from './text-editing.js';
export { makeTextGroupDraggable, startTextGroupDrag, dragTextGroup, endTextGroupDrag } from './text-dragging.js';
export { createElasticLeaderLine, updateElasticLeaderLine } from './leader-line.js';
export { addDeleteButtonToTextGroup, deleteTextLabel, toggleLabelOnPipeClick } from './text-actions.js';
export { createArranqueDomTextDraggable, makeArranqueTextEditable } from './arranque-text.js';

console.log('✅ Módulo draggable-texts cargado completamente');