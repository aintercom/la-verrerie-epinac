/* ==========================================================================
   EN-TÊTE FLOTTANTE
   Transparente tant qu'elle survole le bandeau sombre du haut de page,
   puis fond clair. Les deux logos sont dans le document et se croisent
   en fondu, pour qu'aucune image ne se charge pendant la bascule.
   ========================================================================== */
(function () {
    'use strict';

    var entete = document.querySelector('.entete');
    var principal = document.querySelector('main');
    if (!entete || !principal) { return; }

    var premier = principal.firstElementChild;
    while (premier && premier.nodeType === 1 && !premier.classList.length) {
        premier = premier.nextElementSibling;
    }
    /* sur l'accueil, le hero est enveloppé avec le bandeau de réassurance
       pour former un premier écran : on descend chercher le hero lui-même,
       sans quoi l'en-tête se croit sur une page claire et le contenu
       se décale de la hauteur de l'en-tête. */
    if (premier && premier.classList.contains('ouverture')) {
        premier = premier.querySelector('.hero') || premier;
    }
    var sombre = premier && (premier.classList.contains('hero') ||
                             premier.classList.contains('page-titre'));

    function pret() {
        /* deux images successives : le premier rendu a eu lieu, on peut
           autoriser les transitions sans qu'elles se déclenchent au chargement */
        requestAnimationFrame(function () {
            requestAnimationFrame(function () { document.documentElement.classList.add('pret'); });
        });
    }

    function publieHauteur() {
        document.documentElement.style.setProperty('--h-entete', entete.offsetHeight + 'px');
    }

    /* pas de bandeau sombre : l'en-tête reste pleine et le contenu descend.
       On publie quand même sa hauteur réelle : c'est elle qui dégage le
       contenu, et la valeur par défaut du CSS ne suit pas les réglages
       d'espacement de l'en-tête. */
    if (!sombre) {
        document.documentElement.classList.add('page-claire');
        entete.classList.remove('entete--flottante');
        publieHauteur();
        window.addEventListener('resize', publieHauteur);
        window.addEventListener('load', publieHauteur);
        pret();
        return;
    }

    var seuil = 0, attente = false;

    function mesure() {
        /* la hauteur réelle de l'en-tête sert aux dégagements du CSS :
           elle dépend de la taille du logo, qui varie avec l'écran */
        var h = entete.offsetHeight;
        document.documentElement.style.setProperty('--h-entete', h + 'px');
        /* on bascule quand le bas du bandeau sombre atteint l'en-tête */
        seuil = Math.max(premier.offsetHeight - h, 10);
    }

    function suit() {
        entete.classList.toggle('entete--flottante', window.scrollY < seuil);
    }

    function auDefilement() {
        if (attente) { return; }
        attente = true;
        requestAnimationFrame(function () { suit(); attente = false; });
    }

    mesure(); suit();
    pret();
    window.addEventListener('scroll', auDefilement, { passive: true });
    window.addEventListener('resize', function () { mesure(); suit(); });
    window.addEventListener('load', function () { mesure(); suit(); });
})();
