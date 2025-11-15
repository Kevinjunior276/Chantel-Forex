// Initialisation du carrousel de témoignages
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si Owl Carousel est chargé
    if (typeof jQuery !== 'undefined' && jQuery.fn.owlCarousel) {
        $('.testimonial-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                768: {
                    items: 2,
                    nav: false
                },
                1200: {
                    items: 3,
                    nav: true
                }
            },
            navText: [
                '<i class="fa fa-chevron-left"></i>',
                '<i class="fa fa-chevron-right"></i>'
            ]
        });
    } else {
        console.error('Owl Carousel n\'est pas chargé correctement');
    }
});
