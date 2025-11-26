(function ($) {
    "use strict";

    // Options d'investissement
    const investmentOptions = {
        XAF: [
            { amount: 20000, return: 270000 },
            { amount: 50000, return: 350000 },
            { amount: 80000, return: 560000 },
            { amount: 100000, return: 750000 },
            { amount: 150000, return: 900000 },
            { amount: 200000, return: 1000000 },
            { amount: 300000, return: 1600000 },
            { amount: 500000, return: 2200000 },
            { amount: 800000, return: 3100000 }
        ],
        USD: [
            { amount: 50, return: 350 },
            { amount: 60, return: 430 },
            { amount: 100, return: 825 },
            { amount: 150, return: 1350 },
            { amount: 250, return: 1825 },
            { amount: 350, return: 2350 },
            { amount: 500, return: 3450 },
            { amount: 1000, return: 5975 }
        ]
    };

    // Fonction pour mettre à jour le préfixe téléphonique et le modèle de validation
    function updatePhonePrefix() {
        const countrySelect = document.getElementById('country');
        const phoneInput = document.getElementById('phone');
        const prefixSpan = document.getElementById('country-prefix');
        if (!countrySelect) return;
        const selectedOption = countrySelect.options[countrySelect.selectedIndex];

        if (selectedOption && selectedOption.dataset.prefix) {
            const prefix = selectedOption.dataset.prefix;
            if (prefixSpan) prefixSpan.textContent = prefix;

            // Mettre à jour le modèle de validation en fonction du pays
            const country = selectedOption.value;

            // Mettre à jour le placeholder avec l'exemple de numéro
            const example = getPhoneExample(country);
            if (phoneInput) {
                phoneInput.title = `Format attendu: ${prefix} ${example}`;
                phoneInput.placeholder = `Ex: ${example}`;

                // Mettre à jour le texte d'aide
                const helpText = phoneInput.nextElementSibling;
                if (helpText && helpText.classList.contains('form-text')) {
                    helpText.textContent = `Exemple: ${example}`;
                }

                // Réinitialiser les classes de validation
                phoneInput.classList.remove('is-valid', 'is-invalid');

                // Déclencher la validation si un numéro est déjà saisi
                if (phoneInput.value) {
                    const event = new Event('input');
                    phoneInput.dispatchEvent(event);
                }
            }
        } else if (phoneInput) {
            // Si aucun pays n'est sélectionné, réinitialiser les champs
            phoneInput.value = '';
            phoneInput.placeholder = 'Sélectionnez d\'abord un pays';
            phoneInput.classList.remove('is-valid', 'is-invalid');
        }
    }

    // Fonction pour obtenir un exemple de numéro par pays
    function getPhoneExample(country) {
        const examples = {
            'Cameroun': '6 12 34 56 78',
            'Côte d\'Ivoire': '01 23 45 67',
            'Sénégal': '77 123 45 67',
            'Burkina Faso': '70 12 34 56',
            'Mali': '65 12 34 56',
            'Togo': '90 12 34 56',
            'Bénin': '97 12 34 56',
            'Tchad': '63 01 23 45',
            'Gabon': '06 01 23 45',
            'Congo Brazzaville': '05 123 4567',
            'Congo Kinshasa': '81 12 34 567'
        };
        return examples[country] || '12345678';
    }

    // Fonction pour valider un numéro de téléphone selon le pays
    function validatePhoneNumber(phoneNumber, country) {
        const phone = phoneNumber.replace(/\D/g, ''); // Supprimer tout ce qui n'est pas un chiffre

        // Vérifier la longueur minimale
        if (phone.length < 8) return false;

        // Validation spécifique par pays
        switch (country) {
            case 'Cameroun':
                return /^[2367]\d{7,8}$/.test(phone);
            case 'Côte d\'Ivoire':
                return /^[0-57-9]\d{7}$/.test(phone);
            case 'Sénégal':
                return /^(7[0-9]|30|33|76|77|78)\d{7}$/.test(phone);
            case 'Burkina Faso':
            case 'Mali':
                return /^[67]\d{7}$/.test(phone);
            case 'Togo':
            case 'Bénin':
                return /^\d{8}$/.test(phone);
            case 'Tchad':
                return /^[679]\d{7}$/.test(phone);
            case 'Gabon':
                return /^(0[1-9]|[67]\d)\d{6}$/.test(phone);
            case 'Congo Brazzaville':
                return /^0\d{8}$/.test(phone);
            case 'Congo Kinshasa':
                return /^[89]\d{8}$/.test(phone);
            default:
                return /^\d{8,10}$/.test(phone);
        }
    }

    // Valider le numéro de téléphone lors de la saisie
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            const phoneInput = e.target;
            const countrySelect = document.getElementById('country');
            const selectedOption = countrySelect.options[countrySelect.selectedIndex];

            if (!selectedOption.dataset.prefix) {
                phoneInput.setCustomValidity('Veuillez d\'abord sélectionner un pays');
                return;
            }

            const country = selectedOption.value;
            const phoneNumber = phoneInput.value;

            if (validatePhoneNumber(phoneNumber, country)) {
                phoneInput.setCustomValidity('');
                phoneInput.classList.remove('is-invalid');
                phoneInput.classList.add('is-valid');
            } else {
                phoneInput.setCustomValidity('Format de numéro invalide pour ' + country);
                phoneInput.classList.remove('is-valid');
                phoneInput.classList.add('is-invalid');
            }

            // Mettre à jour l'affichage de l'aide
            const helpText = phoneInput.nextElementSibling;
            if (helpText && helpText.classList.contains('form-text')) {
                helpText.textContent = `Exemple: ${getPhoneExample(country)}`;
            }
        });
    }

    // Fonction pour formater les nombres avec des espaces
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    // Fonction pour mettre à jour les calculs
    function updateCalculations() {
        const amountSelect = document.getElementById('amount');
        if (!amountSelect) return;

        const amount = parseFloat(amountSelect.value) || 0;
        const currencyInput = document.querySelector('input[name="currency"]:checked');
        const currency = currencyInput ? currencyInput.value : 'XAF';
        const symbol = currency === 'XAF' ? 'FCFA' : '$';

        if (amount === 0) return;

        const options = investmentOptions[currency];
        const selectedOption = options.find(opt => opt.amount === amount);

        if (selectedOption) {
            const total = selectedOption.return;
            const profit = total - amount;

            document.getElementById('investedAmount').textContent = formatNumber(amount) + ' ' + symbol;
            document.getElementById('estimatedProfit').textContent = formatNumber(profit) + ' ' + symbol;
            document.getElementById('totalReturn').textContent = formatNumber(total) + ' ' + symbol;
        }
    }

    // Initialiser la validation au chargement de la page
    document.addEventListener('DOMContentLoaded', function () {
        // Initialiser la validation du numéro de téléphone
        const countrySelect = document.getElementById('country');
        if (countrySelect) {
            // Déclencher la mise à jour du préfixe au chargement
            updatePhonePrefix();

            // Ajouter l'écouteur d'événement pour le changement de pays
            countrySelect.addEventListener('change', updatePhonePrefix);
        }

        // Initialiser les calculs d'investissement si la page contient ces éléments
        if (document.getElementById('amount')) {
            // Wait for inline script to populate amounts if needed, or just attach listeners
            // Since inline script handles population, we just attach listeners for calculation updates
            // But inline script ALSO handles calculation. 
            // We'll attach it anyway as a fallback or parallel update.

            document.getElementById('amount').addEventListener('change', updateCalculations);

            const currencyInputs = document.querySelectorAll('input[name="currency"]');
            currencyInputs.forEach(input => {
                input.addEventListener('change', updateCalculations);
            });
        }
    });

    // Gestion de la soumission du formulaire
    document.getElementById('investmentForm').addEventListener('submit', function (e) {
        e.preventDefault();
        // Ici, vous pouvez ajouter le code pour envoyer les données du formulaire
        alert('Votre demande d\'investissement a été soumise avec succès ! Notre équipe vous contactera bientôt.');
        this.reset();
        document.getElementById('investedAmount').textContent = '0 FCFA';
        document.getElementById('estimatedProfit').textContent = '0 FCFA';
        document.getElementById('totalReturn').textContent = '0 FCFA';
    });

    // Initiate the wowjs
    new WOW().init();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Team carousel
    var $teamCarousel = $(".team-carousel");
    var teamItems = $teamCarousel.find('.team-item').length;
    $teamCarousel.owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: teamItems > 1, // Désactive la boucle si un seul profil
        margin: 50,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Testimonial carousel

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav: true,
        navText: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Fact Counter

    $(document).ready(function () {
        $('.counter-value').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });



})(jQuery);

