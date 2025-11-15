# Script pour mettre à jour le footer sur toutes les pages HTML

# Liste des fichiers HTML à mettre à jour
$htmlFiles = @(
    "about.html",
    "contact.html",
    "investissement.html",
    "testimonial.html",
    "index.html"
)

# Lire le contenu du nouveau footer
$newFooter = Get-Content -Path "includes\footer.html" -Raw

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Write-Host "Mise à jour de $file..."
        
        # Lire le contenu actuel du fichier
        $content = Get-Content -Path $file -Raw
        
        # Remplacer l'ancien footer par le nouveau
        $content = $content -replace '(?s)<!-- Footer Start -->.*?<!-- Footer End -->', $newFooter
        
        # Supprimer les doublons de chargement de bibliothèques JavaScript
        $content = $content -replace '(?s)<!-- JavaScript Libraries -->.*?<script src=".*?main\.js"></script>', ''
        
        # Sauvegarder les modifications
        $content | Set-Content -Path $file -Encoding UTF8
        
        Write-Host "$file mis à jour avec succès!" -ForegroundColor Green
    } else {
        Write-Host "Fichier non trouvé : $file" -ForegroundColor Yellow
    }
}

Write-Host "\nMise à jour terminée pour tous les fichiers!" -ForegroundColor Cyan
