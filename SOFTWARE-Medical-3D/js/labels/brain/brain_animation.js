/**
 * brain_animation.js — Loop RAF, FPS counter, sssLight pulse, resize
 */

(function waitEngine() {
    const B = window.__BRAIN3D;
    if (!B || !B.ctrl || !B.composer || !B.sssLight || !B.camera || !B.renderer || !B.bloom) {
        requestAnimationFrame(waitEngine); return;
    }

    const { ctrl, sssLight, composer, camera, renderer, bloom, $ } = B;

    // Animation loop
    let lt = performance.now(), fc = 0;
    (function anim(t) {
        requestAnimationFrame(anim);
        fc++;
        if (t - lt >= 1000) { $('fps').textContent = fc + ' FPS'; fc = 0; lt = t }
        ctrl.update();
        sssLight.intensity = 0.5 + Math.sin(t * 0.001 * 0.8) * 0.1;
        composer.render();
    })(0);

    // Resize
    addEventListener('resize', () => {
        const w = innerWidth, h = innerHeight - 52;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h); composer.setSize(w, h); bloom.setSize(w, h);
    });
})();
