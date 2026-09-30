/* ==========================================================================
   MENU MOBILE
   Construit ici pour n'exister que dans une seule source. Le panneau se
   ferme à l'échappement, au clic sur un lien, et au retour en grand écran.
   ========================================================================== */
(function () {
    'use strict';
    var entete = document.querySelector('.entete-inner');
    if (!entete || document.querySelector('.burger')) { return; }

    var nav = entete.querySelector('nav');
    if (!nav) { return; }

    var EN = /^en\b/i.test(document.documentElement.lang);
    var T = EN
        ? { ouvrir: 'Open the menu', fermer: 'Close the menu', reserver: 'Request a stay',
            appel: 'Or call us: +33 7 83 34 95 54', accueil: '/en/#reserver' }
        : { ouvrir: 'Ouvrir le menu', fermer: 'Fermer le menu', reserver: 'Demander un séjour',
            appel: 'Ou nous appeler : 07 83 34 95 54', accueil: '/#reserver' };
    /* le choix de langue de l'en-tête est repris en bas du menu */
    var langues = entete.querySelector('.langues');

    var burger = document.createElement('button');
    burger.className = 'burger';
    burger.type = 'button';
    burger.setAttribute('aria-label', T.ouvrir);
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'menu-mobile');
    burger.innerHTML = '<span></span>';

    var panneau = document.createElement('nav');
    panneau.className = 'menu-mobile';
    panneau.id = 'menu-mobile';
    panneau.setAttribute('aria-label', 'Menu');
    panneau.innerHTML =
        [].slice.call(nav.querySelectorAll('a'))
          .map(function (a) { return '<a href="' + a.getAttribute('href') + '">' + a.textContent + '</a>'; })
          .join('') +
        '<a class="btn" href="' + T.accueil + '">' + T.reserver + '</a>' +
        '<a class="appel" href="tel:+33783349554">' + T.appel + '</a>' +
        (langues ? '<div class="langues langues--menu">' + langues.innerHTML + '</div>' : '');

    /* le bouton se place après l'appel à réserver, contre le bord droit */
    var cta = entete.querySelector('.btn');
    if (cta) { cta.insertAdjacentElement('afterend', burger); }
    else { entete.appendChild(burger); }
    document.body.appendChild(panneau);

    function bascule(ouvrir) {
        burger.setAttribute('aria-expanded', String(ouvrir));
        burger.setAttribute('aria-label', ouvrir ? T.fermer : T.ouvrir);
        panneau.classList.toggle('ouvert', ouvrir);
        document.body.style.overflow = ouvrir ? 'hidden' : '';
    }

    burger.addEventListener('click', function () {
        bascule(burger.getAttribute('aria-expanded') !== 'true');
    });
    panneau.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') { bascule(false); }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
            bascule(false); burger.focus();
        }
    });
    window.addEventListener('resize', function () {
        if (window.innerWidth > 860 && burger.getAttribute('aria-expanded') === 'true') { bascule(false); }
    });
})();
