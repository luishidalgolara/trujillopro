const SalaBombasAccesorios = {
    crear: function(datos, posiciones) {
        const grupo = new THREE.Group();
        grupo.name = 'Accesorios';
        posiciones.manometros.forEach((man) => {
            const manometro = this.crearManometro(man, datos.presion);
            grupo.add(manometro);
        });
        return grupo;
    },
    crearManometro: function(pos, presMax) {
        const grupo = new THREE.Group();
        const specs = SalaBombasDimensiones.accesorios.manometro;
        const brazo = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, specs.largoBrazo, 8), SalaBombasMateriales.tuberia());
        brazo.rotation.z = -Math.PI / 4;
        brazo.position.x = specs.largoBrazo * Math.cos(Math.PI / 4) / 2;
        brazo.position.y = specs.largoBrazo * Math.sin(Math.PI / 4) / 2;
        grupo.add(brazo);
        const caratula = new THREE.Mesh(new THREE.CylinderGeometry(specs.diametroCaratula / 2, specs.diametroCaratula / 2, specs.profundidad, 16), SalaBombasMateriales.manometro());
        caratula.rotation.z = Math.PI / 2;
        caratula.position.x = specs.largoBrazo * Math.cos(Math.PI / 4);
        caratula.position.y = specs.largoBrazo * Math.sin(Math.PI / 4);
        caratula.castShadow = true;
        grupo.add(caratula);
        const escala = this.crearEscalaManometro(specs.diametroCaratula, presMax);
        escala.position.x = specs.largoBrazo * Math.cos(Math.PI / 4) + specs.profundidad / 2 + 0.01;
        escala.position.y = specs.largoBrazo * Math.sin(Math.PI / 4);
        grupo.add(escala);
        grupo.position.set(pos.x, pos.y, pos.z);
        return grupo;
    },
    crearEscalaManometro: function(diam, pMax) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 256; canvas.height = 256;
        ctx.fillStyle = 'white'; ctx.fillRect(0, 0, 256, 256);
        ctx.strokeStyle = 'black'; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(128, 128, 110, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = 'black'; ctx.lineWidth = 2;
        for (let i = 0; i <= 10; i++) {
            const ang = (i / 10) * Math.PI * 1.5 - Math.PI * 0.75;
            const x1 = 128 + Math.cos(ang) * 100, y1 = 128 + Math.sin(ang) * 100;
            const x2 = 128 + Math.cos(ang) * 85, y2 = 128 + Math.sin(ang) * 85;
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
            if (i % 2 === 0) {
                ctx.fillStyle = 'black'; ctx.font = '16px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                const val = Math.round((i / 10) * pMax * 1.2);
                ctx.fillText(val.toString(), 128 + Math.cos(ang) * 70, 128 + Math.sin(ang) * 70);
            }
        }
        ctx.fillStyle = 'blue'; ctx.font = 'Bold 14px Arial'; ctx.textAlign = 'center'; ctx.fillText('m.c.a', 128, 180);
        const angAguja = -Math.PI * 0.75 + (Math.PI * 1.5) * 0.6;
        ctx.strokeStyle = 'red'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(128, 128); ctx.lineTo(128 + Math.cos(angAguja) * 80, 128 + Math.sin(angAguja) * 80); ctx.stroke();
        ctx.fillStyle = 'red'; ctx.beginPath(); ctx.arc(128, 128, 8, 0, Math.PI * 2); ctx.fill();
        const texture = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: false }));
        sprite.scale.set(diam * 0.9, diam * 0.9, 1);
        return sprite;
    }
};
