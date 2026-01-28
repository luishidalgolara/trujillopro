/**
 * Funciones Auxiliares
 */
const PlanoManagerHelpers = {
    
    updateProjectInfo(plano) {
        const projectName = document.getElementById('projectName');
        const projectCode = document.getElementById('projectCode');
        
        if (projectName && plano) {
            projectName.value = plano.projectName || '';
        }
        if (projectCode && plano) {
            projectCode.value = plano.projectCode || '';
        }
    },
    
    getElementCount(plano) {
        if (!plano) return 0;
        
        let count = 0;
        count += (plano.murosHormigon || []).length;
        count += (plano.murosAlbanileria || []).length;
        count += (plano.tabiques || []).length;
        count += (plano.murosEstructurales || []).length;
        count += (plano.radieres || []).length;
        count += (plano.cubiertas || []).length;
        
        return count;
    },
    
    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('es-CL');
    }
};

window.PlanoManagerHelpers = PlanoManagerHelpers;
