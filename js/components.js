// Fonction pour charger la navigation
function loadNavigation() {
    const navHTML = `
    <!-- Navbar Start -->
    <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
        <div class="container">
            <a href="index.html" class="navbar-brand">
                <h1 class="m-0 text-uppercase text-white"><i class="fa fa-laptop-code me-2"></i>HighTechIT</h1>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav ms-auto py-0">
                    <a href="index.html" class="nav-item nav-link ${window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/') ? 'active' : ''}">Accueil</a>
                    <a href="about.html" class="nav-item nav-link ${window.location.pathname.includes('about.html') ? 'active' : ''}">À propos</a>
                    <a href="testimonial.html" class="nav-item nav-link ${window.location.pathname.includes('testimonial.html') ? 'active' : ''}">Témoignages</a>
                    <a href="contact.html" class="nav-item nav-link ${window.location.pathname.includes('contact.html') ? 'active' : ''}">Contact</a>
                </div>
            </div>
        </div>
    </nav>
    <!-- Navbar End -->
    `;
    a
    // Insérer la navigation au début du body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
}

// Fonction pour charger le footer
function loadFooter() {
    const footerHTML = `
    <!-- Footer Start -->
    <div class="container-fluid bg-primary text-white-50 footer mt-5">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-4 col-md-6">
                    <h5 class="text-white mb-4">Notre Adresse</h5>
                    <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>123 Rue de la Technologie, 75000 Paris</p>
                    <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+33 1 23 45 67 89</p>
                    <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@hightechit.com</p>
                </div>
                <div class="col-lg-4 col-md-6">
                    <h5 class="text-white mb-4">Liens Rapides</h5>
                    <a class="btn btn-link text-white-50" href="about.html">À propos de nous</a>
                    <a class="btn btn-link text-white-50" href="contact.html">Contactez-nous</a>
                    <a class="btn btn-link text-white-50" href="testimonial.html">Témoignages</a>
                </div>
                <div class="col-lg-4 col-md-6">
                    <h5 class="text-white mb-4">Newsletter</h5>
                    <p>Abonnez-vous à notre newsletter pour les dernières mises à jour.</p>
                    <div class="position-relative">
                        <input class="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Votre email">
                        <button type="button" class="btn btn-secondary py-2 position-absolute top-0 end-0 mt-2 me-2">S'inscrire</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="copyright">
                <div class="row">
                    <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a class="border-bottom" href="#">HighTechIT</a>, Tous droits réservés.
                    </div>
                    <div class="col-md-6 text-center text-md-end">
                        <div class="footer-menu">
                            <a href="">Accueil</a>
                            <a href="">Cookies</a>
                            <a href="">Aide</a>
                            <a href="">FAQs</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Footer End -->
    `;
    
    // Insérer le footer avant la fermeture du body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Charger la navigation et le footer lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    loadNavigation();
    loadFooter();
});
