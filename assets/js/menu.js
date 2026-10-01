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

/* ==========================================================================
   CHOIX DE LANGUE REPLIÉ (téléphone)
   Sur petit écran, l'en-tête ne montre que le drapeau de la langue en cours,
   suivi d'une flèche ; un appui déroule l'autre langue en dessous. Sur grand
   écran, ces deux éléments restent cachés et les drapeaux s'affichent côte à
   côte comme avant.
   ========================================================================== */
(function () {
    'use strict';
    var bloc = document.querySelector('.entete .langues');
    if (!bloc || bloc.querySelector('.langues-bascule')) { return; }
    var EN = /^en\b/i.test(document.documentElement.lang);
    var courant = bloc.querySelector('a.drapeau[aria-current]');
    var autres = [].slice.call(bloc.querySelectorAll('a.drapeau:not([aria-current])'));
    if (!courant || !autres.length) { return; }
    var NOMS = { fr: 'Français', en: 'English' };
    function code(a) { return a.classList.contains('drapeau--en') ? 'en' : 'fr'; }

    var bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = 'langues-bascule';
    bouton.setAttribute('aria-expanded', 'false');
    bouton.setAttribute('aria-label', EN ? 'Choose the language' : 'Choisir la langue');
    bouton.innerHTML = '<span class="drapeau drapeau--' + code(courant) + '" aria-hidden="true"></span>' +
                       '<span class="langues-chevron" aria-hidden="true"></span>';

    var liste = document.createElement('div');
    liste.className = 'langues-liste';
    liste.innerHTML = autres.map(function (a) {
        var c = code(a);
        return '<a class="langues-choix" href="' + a.getAttribute('href') + '" hreflang="' + c + '" lang="' + c + '">' +
               '<span class="drapeau drapeau--' + c + '" aria-hidden="true"></span>' + NOMS[c] + '</a>';
    }).join('');

    bloc.appendChild(bouton);
    bloc.appendChild(liste);

    function bascule(ouvrir) {
        bloc.classList.toggle('ouvert', ouvrir);
        bouton.setAttribute('aria-expanded', String(ouvrir));
    }
    bouton.addEventListener('click', function (e) {
        e.stopPropagation();
        bascule(!bloc.classList.contains('ouvert'));
    });
    document.addEventListener('click', function (e) {
        if (!bloc.contains(e.target)) { bascule(false); }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && bloc.classList.contains('ouvert')) { bascule(false); bouton.focus(); }
    });
})();
