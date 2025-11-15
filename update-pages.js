// Script pour mettre à jour toutes les pages avec la correction du spinner
const fs = require('fs');
const path = require('path');

// Liste des fichiers HTML à mettre à jour
const htmlFiles = [
    'about.html',
    'contact.html',
    'investissement.html',
    'testimonial.html',
    'index.html'
];

// Code du script de correction du spinner
const spinnerFixScript = `
<!-- Correction du spinner -->
<script>
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
style.textContent = \`
    #spinner {
        display: none !important;
        pointer-events: none !important;
    }
    
    body.loading {
        overflow: auto !important;
    }
\`;
document.head.appendChild(style);

document.body.classList.remove('loading');
document.body.style.overflow = 'auto';
</script>`;

// Fonction pour mettre à jour un fichier HTML
function updateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Supprimer les anciens scripts de spinner s'ils existent
        content = content.replace(/<script[^>]*>\s*var\s+spinner[\s\S]*?<\/script>/gi, '');
        content = content.replace(/<script[^>]*>\s*function\s+spinner[\s\S]*?<\/script>/gi, '');
        
        // Ajouter le script de correction juste avant la fermeture du body
        if (!content.includes('hideSpinner()')) {
            content = content.replace('</body>', spinnerFixScript + '\n</body>');
        }
        
        // Sauvegarder les modifications
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${filePath} mis à jour avec succès`);
    } catch (error) {
        console.error(`❌ Erreur lors de la mise à jour de ${filePath}:`, error.message);
    }
}

// Mettre à jour tous les fichiers HTML
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        updateFile(filePath);
    } else {
        console.log(`⚠️ Fichier non trouvé: ${file}`);
    }
});

console.log('\n✅ Toutes les pages ont été mises à jour avec la correction du spinner.');
