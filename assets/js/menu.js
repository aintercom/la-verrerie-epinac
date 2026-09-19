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

    var burger = document.createElement('button');
    burger.className = 'burger';
    burger.type = 'button';
    burger.setAttribute('aria-label', 'Ouvrir le menu');
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
        '<a href="/carnet/">Le carnet</a>' +
        '<a class="btn" href="/#reserver">Demander un séjour</a>' +
        '<a class="appel" href="tel:+33783349554">Ou nous appeler : 07 83 34 95 54</a>';

    /* le bouton se place après l'appel à réserver, contre le bord droit */
    var cta = entete.querySelector('.btn');
    if (cta) { cta.insertAdjacentElement('afterend', burger); }
    else { entete.appendChild(burger); }
    document.body.appendChild(panneau);

    function bascule(ouvrir) {
        burger.setAttribute('aria-expanded', String(ouvrir));
        burger.setAttribute('aria-label', ouvrir ? 'Fermer le menu' : 'Ouvrir le menu');
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
