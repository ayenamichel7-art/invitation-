document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Gestion des paramètres d'URL sécurisés et fallback propre
    const urlParams = new URLSearchParams(window.location.search);
    const nomInvite = urlParams.get('nom')?.trim() || "Mon cher ami(e)";
    
    const elementsNom = document.querySelectorAll('#nom-invite');
    elementsNom.forEach(el => el.textContent = nomInvite);
    
    // Configuration WhatsApp Bénin (Format international strict)
    const numeroWhatsApp = "2290169242459";
    const messageWhatsApp = `Bonjour, je suis ${nomInvite}. C'est un immense honneur ! Je tiens à te confirmer personnellement ma présence d'honneur à la grande croisade du 28 juin. À très bientôt !`;
    
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if(whatsappBtn) {
        whatsappBtn.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(messageWhatsApp)}`;
    }

    // 2. Logique du Carrousel par étapes (Timeline séquentielle)
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

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
            
            // Relancer le chronomètre de la slide courante
            launchTimeline();
        }
    }

    // Tableau de configuration des temps d'affichage pour chaque slide (en ms)
    const slideDurations = [
        4500, // Temps d'affichage Slide 1 (Introduction)
        6500, // Temps d'affichage Slide 2 (Nom de l'invité)
        6500, // Temps d'affichage Slide 3 (Le Thème épuré)
        8500, // Temps d'affichage Slide 4 (Le Programme)
        6500  // Temps d'affichage Slide 5 (Logistique) -> Bloque ensuite sur la Slide 6 (RSVP)
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
            // Démarrage de la timeline immédiatement après l'ouverture visuelle
            launchTimeline();
        }
    }, 1500);

});