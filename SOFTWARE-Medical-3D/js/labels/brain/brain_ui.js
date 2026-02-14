/**
 * brain_ui.js — Botones: rotación, reset, zoom, vistas, info panel, post-proc sliders
 */

(function waitEngine() {
    const B = window.__BRAIN3D;
    if (!B || !B.camera || !B.ctrl || !B.renderer || !B.bloom || !B.cgPass || !B.composer) {
        requestAnimationFrame(waitEngine); return;
    }

    const { camera, ctrl, renderer, bloom, cgPass, $ } = B;

    // Auto-rotation toggle
    let ar = true;
    $('bRot').onclick = e => { ar = !ar; ctrl.autoRotate = ar; e.currentTarget.classList.toggle('active', ar) };

    // Reset
    $('bRst').onclick = () => { ctrl.target.set(0, -.8, -.5); camera.position.set(3, 2, 4) };

    // Zoom
    $('bZi').onclick = () => camera.position.lerp(ctrl.target, 0.15);
    $('bZo').onclick = () => { const d = camera.position.clone().sub(ctrl.target).normalize(); camera.position.add(d.multiplyScalar(0.5)) };

    // Views
    $('bFr').onclick = () => { camera.position.set(0, -.5, 5); ctrl.target.set(0, -.8, -.5) };
    $('bTo').onclick = () => { camera.position.set(0, 6, 0); ctrl.target.set(0, -.8, -.5) };
    $('bSi').onclick = () => { camera.position.set(5, -.5, -.5); ctrl.target.set(0, -.8, -.5) };

    // Info panel toggle
    let ipVis = true;
    $('bIn').onclick = () => { ipVis = !ipVis; $('ip').classList.toggle('hide', !ipVis) };

    // Post-processing panel
    $('bPP').onclick = e => { $('ppP').classList.toggle('vis'); e.currentTarget.classList.toggle('active') };
    $('ppB').oninput = e => bloom.strength = e.target.value / 100 * 0.5;
    $('ppE').oninput = e => renderer.toneMappingExposure = e.target.value / 100;
    $('ppS').oninput = e => cgPass.uniforms.sss.value = e.target.value / 100;
    $('ppV').oninput = e => cgPass.uniforms.vign.value = e.target.value / 100;
})();
