// Création du bouton WhatsApp flottant
document.addEventListener('DOMContentLoaded', function() {
    // Créer l'élément du bouton
    const whatsappButton = document.createElement('a');
    whatsappButton.href = 'https://wa.me/237682738566';
    whatsappButton.className = 'whatsapp-float';
    whatsappButton.target = '_blank';
    whatsappButton.title = 'Contactez-nous sur WhatsApp';
    whatsappButton.setAttribute('aria-label', 'Contactez-nous sur WhatsApp');
    
    // Ajouter l'icône WhatsApp
    const whatsappIcon = document.createElement('i');
    whatsappIcon.className = 'fab fa-whatsapp';
    whatsappButton.appendChild(whatsappIcon);
    
    // Ajouter le bouton au corps du document
    document.body.appendChild(whatsappButton);
    
    // Ajouter la feuille de style si elle n'existe pas déjà
    if (!document.querySelector('link[href*="whatsapp-button.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/whatsapp-button.css';
        document.head.appendChild(link);
    }
});
