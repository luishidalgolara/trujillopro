/**
 * brain_postprocessing.js — Composer, Bloom, Shader SSS/Vignette, SMAA
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';

(function waitEngine() {
    const B = window.__BRAIN3D;
    if (!B || !B.scene || !B.camera || !B.renderer) { requestAnimationFrame(waitEngine); return; }

    const { scene, camera, renderer, setLoad } = B;

    setLoad(40, 'Post-processing...');
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(
        new THREE.Vector2(innerWidth, innerHeight), 0.15, 0.6, 0.85
    );
    composer.addPass(bloom);

    const cgShader = {
        uniforms: { tDiffuse: { value: null }, sss: { value: 0.3 }, vign: { value: 0.3 } },
        vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: `uniform sampler2D tDiffuse;uniform float sss;uniform float vign;varying vec2 vUv;
        void main(){
            vec4 tx=texture2D(tDiffuse,vUv);vec3 c=tx.rgb;
            float lum=dot(c,vec3(.299,.587,.114));
            float sm=smoothstep(.1,.5,lum)*(1.-smoothstep(.5,.9,lum));
            c+=vec3(.9,.45,.35)*sss*sm*.15;
            c.r+=.03;c.b-=.015;
            float g=dot(c,vec3(.2126,.7152,.0722));c=mix(vec3(g),c,1.1);
            c=(c-.5)*1.05+.5;
            vec2 u=vUv*2.-1.;c*=1.-dot(u,u)*vign*.4;
            gl_FragColor=vec4(clamp(c,0.,1.),tx.a);}`
    };
    const cgPass = new ShaderPass(cgShader);
    composer.addPass(cgPass);
    composer.addPass(new SMAAPass(innerWidth, innerHeight));

    // Exponer
    B.composer = composer;
    B.bloom = bloom;
    B.cgPass = cgPass;
})();
