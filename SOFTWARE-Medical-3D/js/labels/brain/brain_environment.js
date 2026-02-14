/**
 * brain_environment.js — Environment Map + Luces
 */
import * as THREE from 'three';

(function waitEngine() {
    const B = window.__BRAIN3D;
    if (!B || !B.scene || !B.renderer) { requestAnimationFrame(waitEngine); return; }

    const { scene, renderer, setLoad } = B;

    // Environment Map
    setLoad(20, 'Generando environment...');
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envSc = new THREE.Scene();
    envSc.add(new THREE.Mesh(
        new THREE.SphereGeometry(10, 32, 32),
        new THREE.ShaderMaterial({
            side: THREE.BackSide,
            vertexShader: `varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
            fragmentShader: `varying vec3 vP;void main(){
                vec3 d=normalize(vP);float y=d.y*.5+.5;
                vec3 c=mix(vec3(.05,.06,.08),mix(vec3(.1,.12,.18),vec3(.15,.18,.25),smoothstep(.4,1.,y)),smoothstep(0.,.4,y));
                c+=vec3(.3,.15,.1)*pow(max(0.,dot(d,normalize(vec3(1.,.3,.5)))),8.)*.3;
                c+=vec3(.1,.15,.25)*pow(max(0.,dot(d,normalize(vec3(-.8,.2,-.5)))),6.)*.2;
                gl_FragColor=vec4(c,1.);}`
        })
    ));
    scene.environment = pmrem.fromScene(envSc, 0.04).texture;
    pmrem.dispose();

    // Lights
    setLoad(30, 'Iluminación...');
    scene.add(new THREE.HemisphereLight(0x8090b0, 0x332211, 0.4));

    const keyLight = new THREE.DirectionalLight(0xffeedd, 3.0);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -3;
    keyLight.shadow.camera.right = 3;
    keyLight.shadow.camera.top = 3;
    keyLight.shadow.camera.bottom = -3;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x6688bb, 1.2);
    fillLight.position.set(-5, 3, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffc8a0, 1.5);
    rimLight.position.set(-1, -2, -5);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xddeeff, 0.6);
    topLight.position.set(0, 8, 0);
    scene.add(topLight);

    const specLight = new THREE.PointLight(0xffffff, 1.0, 15);
    specLight.position.set(2, 3, 3);
    scene.add(specLight);

    const sssLight = new THREE.PointLight(0xff8866, 0.5, 10);
    sssLight.position.set(0, -3, 2);
    scene.add(sssLight);

    // Exponer sssLight
    B.sssLight = sssLight;
})();
