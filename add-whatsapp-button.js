const fs = require('fs');
const path = require('path');

// Liste des fichiers HTML à mettre à jour
const htmlFiles = [
    'index.html',
    'about.html',
    'contact.html',
    'investissement.html',
    'testimonial.html'
];

// Vérifier si le fichier existe et est accessible
function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

// Fonction pour ajouter le script du bouton WhatsApp
function addWhatsAppButton(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Vérifier si le script WhatsApp est déjà présent
        if (content.includes('whatsapp-button.js')) {
            console.log(`Le bouton WhatsApp est déjà présent dans ${filePath}`);
            return;
        }
        
        // Ajouter le script avant la fermeture du body
        content = content.replace(
            '</body>',
            `    <!-- Bouton WhatsApp flottant -->
    <script src="js/whatsapp-button.js"></script>
</body>`
        );
        
        // Écrire les modifications
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Bouton WhatsApp ajouté avec succès à ${filePath}`);
    } catch (error) {
        console.error(`❌ Erreur lors de la mise à jour de ${filePath}:`, error.message);
    }
}

// Vérifier et mettre à jour chaque fichier
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fileExists(filePath)) {
        addWhatsAppButton(filePath);
    } else {
        console.log(`⚠️ Fichier non trouvé: ${file}`);
    }
});

console.log('\n✅ Toutes les pages ont été mises à jour avec le bouton WhatsApp flottant.');
