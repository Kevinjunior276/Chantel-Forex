// Script pour corriger le problème du spinner sur toutes les pages

// Fonction pour masquer le spinner
function hideSpinner() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.style.display = 'none';
        spinner.classList.remove('show');
    }
}

// Masquer le spinner quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    hideSpinner();
    
    // Fallback au cas où le DOM est chargé mais le spinner est toujours visible
    setTimeout(hideSpinner, 1000);
});

// Fallback supplémentaire pour s'assurer que le spinner est masqué
window.addEventListener('load', function() {
    hideSpinner();
    
    // Dernier recours - forcer le masquage après 3 secondes
    setTimeout(hideSpinner, 3000);
});

// Désactiver le comportement par défaut du spinner
const style = document.createElement('style');
style.textContent = `
    #spinner {
        display: none !important;
        pointer-events: none !important;
    }
    
    body.loading {
        overflow: auto !important;
    }
`;
document.head.appendChild(style);

// S'assurer que le corps n'est pas en mode chargement
document.body.classList.remove('loading');
document.body.style.overflow = 'auto';

// Supprimer les écouteurs d'événements problématiques
const spinner = document.getElementById('spinner');
if (spinner) {
    const newSpinner = spinner.cloneNode(true);
    spinner.parentNode.replaceChild(newSpinner, spinner);
}

// Nettoyer les styles en ligne problématiques
const elements = document.querySelectorAll('*');
elements.forEach(el => {
    if (el.style && el.style.pointerEvents === 'none') {
        el.style.pointerEvents = 'auto';
    }
});
