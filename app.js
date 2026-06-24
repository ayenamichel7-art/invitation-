document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Gestion des paramètres d'URL sécurisés et fallback propre
    const urlParams = new URLSearchParams(window.location.search);
    const nomInvite = urlParams.get('nom')?.trim() || "ton cher ami(e)";
    
    const elementsNom = document.querySelectorAll('#nom-invite');
    elementsNom.forEach(el => el.textContent = nomInvite);
    
    // Configuration WhatsApp Bénin (Format international strict)
    const numeroWhatsApp = "2290149278318";
    const messageWhatsApp = `Bonjour, je suis ${nomInvite}. C'est un immense honneur ! Je tiens à te confirmer personnellement ma présence d'honneur à la grande croisade du 28 juin. À très bientôt !`;
    
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if(whatsappBtn) {
        whatsappBtn.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(messageWhatsApp)}`;
    }

    // 2. Logique du Carrousel par étapes (Timeline séquentielle)
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    // Configuration des arrière-plans d'enjaillement pour chaque diapositive
    const backgrounds = [
        "",                 // Slide 1 (Pas de fond)
        "url('po1.jpg')",   // Slide 2 (Enjaillement 1)
        "",                 // Slide 3 (Pas de fond)
        "url('po2.jpg')",   // Slide 4 (Enjaillement 2)
        "",                 // Slide 5 (Pas de fond)
        "url('po3.jpeg')"   // Slide 6 (Enjaillement 3)
    ];

    const cardBg = document.getElementById('card-bg');

    function updateBackground(index) {
        if (cardBg) {
            const bg = backgrounds[index];
            if (bg) {
                cardBg.style.backgroundImage = bg;
                cardBg.classList.add('active');
            } else {
                cardBg.classList.remove('active');
                // Effacer l'image après la transition de fondu sortant (1s)
                setTimeout(() => {
                    if (!cardBg.classList.contains('active')) {
                        cardBg.style.backgroundImage = 'none';
                    }
                }, 1000);
            }
        }
    }

    function nextSlide() {
        if (currentSlideIndex < slides.length - 1) {
            const currentSlide = slides[currentSlideIndex];
            const nextSlide = slides[currentSlideIndex + 1];

            // Étape 1 : Animation CSS de sortie vers le haut 
            currentSlide.classList.add('exit');
            currentSlide.classList.remove('active');

            // Étape 2 : Transition fluide et activation de la slide suivante
            setTimeout(() => {
                currentSlide.classList.remove('exit'); // Nettoie la classe pour éviter les conflits
                nextSlide.classList.add('active');
            }, 600); // Synchronisé avec le timing de transition CSS

            currentSlideIndex++;
            updateBackground(currentSlideIndex);
            
            // Relancer le chronomètre de la slide courante
            launchTimeline();
        }
    }

    // Tableau de configuration des temps d'affichage pour chaque slide (en ms)
    const slideDurations = [
        6000,  // Temps d'affichage Slide 1 (Introduction) - augmenté pour donner du temps
        9500,  // Temps d'affichage Slide 2 (Nom de l'invité) - augmenté pour lecture confortable
        8500,  // Temps d'affichage Slide 3 (Le Thème épuré) - augmenté
        12000, // Temps d'affichage Slide 4 (Le Programme) - augmenté pour lire les 5 éléments
        9500   // Temps d'affichage Slide 5 (Logistique) -> Bloque ensuite sur la Slide 6 (RSVP)
    ];

    function launchTimeline() {
        if (currentSlideIndex < slideDurations.length) {
            setTimeout(nextSlide, slideDurations[currentSlideIndex]);
        }
    }

    // --- INITIALISATION DE L'APPLICATION ---
    
    // Déclenchement automatique de l'ouverture de l'enveloppe (1.5s après chargement)
    setTimeout(() => {
        const envelope = document.getElementById('envelope');
        if(envelope) {
            envelope.classList.add('open');
            // Initialise le premier fond d'écran
            updateBackground(0);
            // Démarrage de la timeline immédiatement après l'ouverture visuelle
            launchTimeline();
        }
    }, 1500);

});