/* ========================================
   GENERADOR DE INFORME - CUBICACIÓN
   ======================================== */

// Generar informe completo recopilando datos de todos los planos
function generarInformeCubicacion() {
    const informe = {
        murosHormigon: [],
        murosAlbanileria: [],
        tabiquesInteriores: [],
        tabiquesExteriores: [],
        murosEstructurales: [],
        radieres: [],
        cubiertas: [],
        totales: {
            volumenHormigon: 0,
            areaAlbanileria: 0,
            areaTabiquesInteriores: 0,
            areaTabiquesExteriores: 0,
            areaCubiertas: 0,
            cementoTotal: 0,
            fierroTotal: 0,
            areaRadier: 0
        }
    };
    
    // RECOLECTAR DE TODOS LOS PLANOS
    if (window.PlanoManager && window.PlanoState) {
        const todosLosPlanos = window.PlanoState.getAllPlanos();
        
        console.log(`📊 Recopilando cubicación de ${todosLosPlanos.length} planos...`);
        
        todosLosPlanos.forEach((plano, index) => {
            console.log(`  📐 Procesando: ${plano.name}`);
            
            // 1. Muros de hormigón
            if (plano.murosHormigon && plano.murosHormigon.length > 0) {
                plano.murosHormigon.forEach(muro => {
                    if (muro.completado) {
                        informe.murosHormigon.push({
                            plano: plano.name,
                            nombre: muro.nombre,
                            largo: muro.largo,
                            altura: muro.altura,
                            espesor: muro.espesor,
                            volumen: muro.volumen
                        });
                        informe.totales.volumenHormigon += parseFloat(muro.volumen) || 0;
                    }
                });
            }
            
            // 2. Muros de albañilería
            if (plano.murosAlbanileria && plano.murosAlbanileria.length > 0) {
                plano.murosAlbanileria.forEach(muro => {
                    if (muro.completado) {
                        informe.murosAlbanileria.push({
                            plano: plano.name,
                            nombre: muro.nombre,
                            largo: muro.largo,
                            altura: muro.altura,
                            espesor: muro.espesor,
                            area: muro.area
                        });
                        informe.totales.areaAlbanileria += parseFloat(muro.area) || 0;
                    }
                });
            }
            
            // 3. Tabiques (separados por tipo)
            if (plano.tabiques && plano.tabiques.length > 0) {
                plano.tabiques.forEach(tabique => {
                    if (tabique.completado) {
                        const tabiqueData = {
                            plano: plano.name,
                            nombre: tabique.nombre,
                            tipo: tabique.tipo,
                            espesor: tabique.espesor,
                            largo: tabique.largo,
                            altura: tabique.altura,
                            separacion: tabique.separacion,
                            cantidadPiesDerechos: tabique.cantidadPiesDerechos,
                            metrosPiesDerechos: tabique.metrosPiesDerechos,
                            totalSoleras: tabique.totalSoleras,
                            areaPlacas: tabique.areaPlacas
                        };
                        
                        if (tabique.tipo === 'interior') {
                            informe.tabiquesInteriores.push(tabiqueData);
                            informe.totales.areaTabiquesInteriores += parseFloat(tabique.areaPlacas) || 0;
                        } else if (tabique.tipo === 'exterior') {
                            informe.tabiquesExteriores.push(tabiqueData);
                            informe.totales.areaTabiquesExteriores += parseFloat(tabique.areaPlacas) || 0;
                        }
                    }
                });
            }
            
            // 4. Muros estructurales
            if (plano.murosEstructurales && plano.murosEstructurales.length > 0) {
                plano.murosEstructurales.forEach(muro => {
                    if (muro.completado) {
                        informe.murosEstructurales.push({
                            plano: plano.name,
                            nombre: muro.nombre,
                            largo: muro.largo,
                            altura: muro.altura,
                            espesor: muro.espesor,
                            niveles: muro.niveles,
                            volumenHormigon: muro.volumenHormigon,
                            cemento: muro.cemento,
                            arena: muro.arena,
                            ripio: muro.ripio,
                            totalFierro: muro.totalFierro,
                            areaMoldaje: muro.areaMoldaje
                        });
                        informe.totales.volumenHormigon += parseFloat(muro.volumenHormigon) || 0;
                        informe.totales.cementoTotal += parseFloat(muro.cemento) || 0;
                        informe.totales.fierroTotal += parseFloat(muro.totalFierro) || 0;
                    }
                });
            }
            
            // 5. Radieres
            if (plano.radieres && plano.radieres.length > 0) {
                plano.radieres.forEach(radier => {
                    if (radier.completado) {
                        informe.radieres.push({
                            plano: plano.name,
                            nombre: radier.nombre,
                            area: radier.area,
                            espesor: radier.espesor,
                            volumen: radier.volumen,
                            cemento: radier.bolsas,
                            arena: radier.arena,
                            ripio: radier.ripio,
                            excavacion: radier.excavacion
                        });
                        informe.totales.areaRadier += parseFloat(radier.area) || 0;
                        informe.totales.volumenHormigon += parseFloat(radier.volumen) || 0;
                        informe.totales.cementoTotal += parseFloat(radier.bolsas) || 0;
                    }
                });
            }
            
            // 6. Cubiertas
            if (plano.cubiertas && plano.cubiertas.length > 0) {
                plano.cubiertas.forEach(cubierta => {
                    if (cubierta.completado) {
                        informe.cubiertas.push({
                            plano: plano.name,
                            nombre: cubierta.nombre,
                            area: cubierta.area,
                            perimetro: cubierta.perimetro,
                            tipo: cubierta.tipo,
                            materialCubierta: cubierta.materialCubierta
                        });
                        informe.totales.areaCubiertas += parseFloat(cubierta.area) || 0;
                    }
                });
            }
        });
        
        console.log('✅ Cubicación de todos los planos recopilada');
    } else {
        // Fallback: recopilar del plano actual (modo antiguo)
        console.log('⚠️ Sistema multi-plano no disponible, usando modo plano único');
        
        // 1. RECOPILAR MUROS DE HORMIGÓN
        if (typeof murosHormigon !== 'undefined' && murosHormigon.length > 0) {
            murosHormigon.forEach(muro => {
                if (muro.completado) {
                    informe.murosHormigon.push({
                        nombre: muro.nombre,
                        largo: muro.largo,
                        altura: muro.altura,
                        espesor: muro.espesor,
                        volumen: muro.volumen
                    });
                    informe.totales.volumenHormigon += parseFloat(muro.volumen) || 0;
                }
            });
        }
        
        // 2. RECOPILAR MUROS DE ALBAÑILERÍA
        if (typeof murosAlbanileria !== 'undefined' && murosAlbanileria.length > 0) {
            murosAlbanileria.forEach(muro => {
                if (muro.completado) {
                    informe.murosAlbanileria.push({
                        nombre: muro.nombre,
                        largo: muro.largo,
                        altura: muro.altura,
                        espesor: muro.espesor,
                        area: muro.area
                    });
                    informe.totales.areaAlbanileria += parseFloat(muro.area) || 0;
                }
            });
        }
        
        // 3. RECOPILAR TABIQUES (SEPARADOS POR TIPO)
        if (typeof tabiques !== 'undefined' && tabiques.length > 0) {
            tabiques.forEach(tabique => {
                if (tabique.completado) {
                    const tabiqueData = {
                        nombre: tabique.nombre,
                        tipo: tabique.tipo,
                        espesor: tabique.espesor,
                        largo: tabique.largo,
                        altura: tabique.altura,
                        separacion: tabique.separacion,
                        cantidadPiesDerechos: tabique.cantidadPiesDerechos,
                        metrosPiesDerechos: tabique.metrosPiesDerechos,
                        totalSoleras: tabique.totalSoleras,
                        areaPlacas: tabique.areaPlacas
                    };
                    
                    if (tabique.tipo === 'interior') {
                        informe.tabiquesInteriores.push(tabiqueData);
                        informe.totales.areaTabiquesInteriores += parseFloat(tabique.areaPlacas) || 0;
                    } else if (tabique.tipo === 'exterior') {
                        informe.tabiquesExteriores.push(tabiqueData);
                        informe.totales.areaTabiquesExteriores += parseFloat(tabique.areaPlacas) || 0;
                    }
                }
            });
        }
        
        // 4. RECOPILAR MUROS ESTRUCTURALES
        if (typeof murosEstructurales !== 'undefined' && murosEstructurales.length > 0) {
            murosEstructurales.forEach(muro => {
                if (muro.completado) {
                    informe.murosEstructurales.push({
                        nombre: muro.nombre,
                        largo: muro.largo,
                        altura: muro.altura,
                        espesor: muro.espesor,
                        niveles: muro.niveles,
                        volumenHormigon: muro.volumenHormigon,
                        cemento: muro.cemento,
                        arena: muro.arena,
                        ripio: muro.ripio,
                        totalFierro: muro.totalFierro,
                        areaMoldaje: muro.areaMoldaje
                    });
                    informe.totales.volumenHormigon += parseFloat(muro.volumenHormigon) || 0;
                    informe.totales.cementoTotal += parseFloat(muro.cemento) || 0;
                    informe.totales.fierroTotal += parseFloat(muro.totalFierro) || 0;
                }
            });
        }
        
        // 5. RECOPILAR RADIERES
        if (typeof radieres !== 'undefined' && radieres.length > 0) {
            radieres.forEach(radier => {
                if (radier.completado) {
                    informe.radieres.push({
                        nombre: radier.nombre,
                        area: radier.area,
                        espesor: radier.espesor,
                        volumen: radier.volumen,
                        cemento: radier.bolsas,
                        arena: radier.arena,
                        ripio: radier.ripio,
                        excavacion: radier.excavacion
                    });
                    informe.totales.areaRadier += parseFloat(radier.area) || 0;
                    informe.totales.volumenHormigon += parseFloat(radier.volumen) || 0;
                    informe.totales.cementoTotal += parseFloat(radier.bolsas) || 0;
                }
            });
        }
        
        // 6. RECOPILAR CUBIERTAS
        if (typeof cubiertas !== 'undefined' && cubiertas.length > 0) {
            cubiertas.forEach(cubierta => {
                if (cubierta.completado) {
                    informe.cubiertas.push({
                        nombre: cubierta.nombre,
                        area: cubierta.area,
                        perimetro: cubierta.perimetro,
                        tipo: cubierta.tipo,
                        materialCubierta: cubierta.materialCubierta
                    });
                    informe.totales.areaCubiertas += parseFloat(cubierta.area) || 0;
                }
            });
        }
    }
    
    return informe;
}

// Verificar si hay datos para generar informe
function hayDatosParaInforme() {
    const informe = generarInformeCubicacion();
    
    return (
        informe.murosHormigon.length > 0 ||
        informe.murosAlbanileria.length > 0 ||
        informe.tabiquesInteriores.length > 0 ||
        informe.tabiquesExteriores.length > 0 ||
        informe.murosEstructurales.length > 0 ||
        informe.radieres.length > 0 ||
        informe.cubiertas.length > 0
    );
}