/* ==========================================================================
   BARRE DE PROGRESSION ET HEURE D'ÉPINAC
   ========================================================================== */
(function () {
    'use strict';

    /* ---- la barre de lecture ---- */
    var barre = document.querySelector('.progression span');
    if (barre) {
        var attente = false;
        function avance() {
            var h = document.documentElement.scrollHeight - window.innerHeight;
            var p = h > 0 ? window.scrollY / h : 0;
            barre.style.transform = 'scaleX(' + Math.min(Math.max(p, 0), 1) + ')';
        }
        window.addEventListener('scroll', function () {
            if (attente) { return; }
            attente = true;
            requestAnimationFrame(function () { avance(); attente = false; });
        }, { passive: true });
        window.addEventListener('resize', avance);
        avance();
    }

    /* ---- l'heure qu'il est à Épinac, et le compte à rebours ---- */
    var pendule = document.getElementById('pendule');
    if (!pendule) { return; }

    var OUVERTURE = new Date('2026-10-01T15:00:00+02:00');

    function heure() {
        try {
            return new Intl.DateTimeFormat('fr-FR', {
                timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hour12: false
            }).format(new Date()).replace(':', ' h ');
        } catch (e) { return null; }
    }

    function jour() {
        try {
            return new Intl.DateTimeFormat('fr-FR', {
                timeZone: 'Europe/Paris', weekday: 'long', day: 'numeric', month: 'long'
            }).format(new Date());
        } catch (e) { return null; }
    }

    function etat() {
        var reste = Math.ceil((OUVERTURE - new Date()) / 86400000);
        if (reste > 1) { return 'Ouverture dans ' + reste + ' jours'; }
        if (reste === 1) { return 'Ouverture demain'; }
        if (reste === 0) { return 'Ouverture aujourd’hui'; }
        return 'Nous écrire pour réserver';
    }

    function maj() {
        var h = heure(), j = jour();
        if (!h || !j) { pendule.hidden = true; return; }
        pendule.innerHTML =
            '<span class="point" aria-hidden="true"></span>' +
            '<span>' + j.charAt(0).toUpperCase() + j.slice(1) + '</span>' +
            '<span class="sep" aria-hidden="true">·</span>' +
            '<span>il est <b>' + h + '</b> à Épinac</span>' +
            '<span class="sep" aria-hidden="true">·</span>' +
            '<span class="etat">' + etat() + '</span>';
    }

    maj();
    setInterval(maj, 30000);
})();

/* ==========================================================================
   FAQ REPLIÉE
   Seize questions affichées d'un bloc noient l'essentiel. On n'en montre
   que les premières et le reste s'ouvre à la demande. Sans JavaScript,
   tout reste visible : rien n'est caché par le HTML lui-même.
   ========================================================================== */
(function () {
    'use strict';
    var VISIBLES = 6;
    var faq = document.querySelector('.faq');
    if (!faq) { return; }

    var items = [].slice.call(faq.querySelectorAll(':scope > details'));
    if (items.length <= VISIBLES + 1) { return; }

    var caches = items.slice(VISIBLES);
    caches.forEach(function (d) { d.hidden = true; });

    var bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = 'faq-plus';
    bouton.setAttribute('aria-expanded', 'false');
    var reste = caches.length;

    function libelle(ouvert) {
        return ouvert ? 'Replier les questions'
                      : 'Voir les ' + reste + ' autres questions';
    }
    bouton.textContent = libelle(false);
    faq.insertAdjacentElement('afterend', bouton);

    bouton.addEventListener('click', function () {
        var ouvert = bouton.getAttribute('aria-expanded') === 'true';
        caches.forEach(function (d) {
            d.hidden = ouvert;
            if (ouvert) { d.open = false; }
        });
        bouton.setAttribute('aria-expanded', String(!ouvert));
        bouton.textContent = libelle(!ouvert);
        if (ouvert) { faq.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
        else { caches[0].querySelector('summary').focus({ preventScroll: true }); }
    });
})();

/* ==========================================================================
   PELLICULE DU PARC
   Flèches de défilement et voile de bord. Rien n'est indispensable : sans
   JavaScript la bande se parcourt au doigt, à la molette et au clavier.
   ========================================================================== */
(function () {
    'use strict';
    var piste = document.querySelector('.galerie-piste');
    var bande = piste && piste.querySelector('.galerie');
    if (!bande) { return; }

    function fleche(sens, libelle) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'galerie-fleche galerie-fleche--' + (sens < 0 ? 'avant' : 'apres');
        b.setAttribute('aria-label', libelle);
        b.innerHTML = '<span aria-hidden="true">' + (sens < 0 ? '‹' : '›') + '</span>';
        b.addEventListener('click', function () {
            bande.scrollBy({ left: sens * Math.round(bande.clientWidth * 0.8), behavior: 'smooth' });
        });
        return b;
    }
    var avant = fleche(-1, 'Photos précédentes');
    var apres = fleche(1, 'Photos suivantes');
    piste.appendChild(avant);
    piste.appendChild(apres);

    function etat() {
        var max = bande.scrollWidth - bande.clientWidth;
        var x = bande.scrollLeft;
        var utile = max > 4;
        piste.classList.toggle('a-defiler', utile);
        avant.disabled = !utile || x <= 2;
        apres.disabled = !utile || x >= max - 2;
        piste.classList.toggle('bord-gauche', utile && x > 2);
        piste.classList.toggle('bord-droit', utile && x < max - 2);
    }
    /* Barre de progression dessinée : les barres natives de macOS sont en
       surimpression et s'effacent dès qu'on cesse de faire défiler, donc
       elles n'indiquent rien au repos. Celle-ci reste visible et se tire
       à la souris. */
    var rail = document.createElement('div');
    rail.className = 'galerie-rail';
    var curseur = document.createElement('div');
    curseur.className = 'galerie-curseur';
    rail.appendChild(curseur);
    piste.appendChild(rail);
    document.documentElement.classList.add('rail-dessine');

    function rafraichitRail() {
        var max = bande.scrollWidth - bande.clientWidth;
        if (max <= 4) { return; }
        var part = bande.clientWidth / bande.scrollWidth;
        curseur.style.width = Math.max(part * 100, 8) + '%';
        var libre = 100 - Math.max(part * 100, 8);
        curseur.style.left = (bande.scrollLeft / max) * libre + '%';
    }

    var tire = false;
    function versPosition(e) {
        var r = rail.getBoundingClientRect();
        var ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        bande.scrollLeft = ratio * (bande.scrollWidth - bande.clientWidth);
    }
    rail.addEventListener('pointerdown', function (e) {
        tire = true; rail.setPointerCapture(e.pointerId);
        bande.style.scrollBehavior = 'auto'; versPosition(e);
    });
    rail.addEventListener('pointermove', function (e) { if (tire) { versPosition(e); } });
    rail.addEventListener('pointerup', function () { tire = false; bande.style.scrollBehavior = ''; });
    rail.addEventListener('pointercancel', function () { tire = false; bande.style.scrollBehavior = ''; });

    var etatInitial = etat;
    etat = function () { etatInitial(); rafraichitRail(); };

    bande.addEventListener('scroll', etat, { passive: true });
    window.addEventListener('resize', etat);
    if (window.ResizeObserver) { new ResizeObserver(etat).observe(bande); }
    etat();
})();


/* ==========================================================================
   REPÈRE DE SECTION
   Marque dans le menu la section qu'on est en train de lire. Purement
   indicatif : sans JavaScript, les liens fonctionnent comme avant.
   ========================================================================== */
(function () {
    'use strict';
    var liens = [].slice.call(document.querySelectorAll('.entete nav a[href*="#"]'));
    if (!liens.length || !('IntersectionObserver' in window)) { return; }

    var paires = [];
    liens.forEach(function (a) {
        var id = (a.getAttribute('href') || '').split('#')[1];
        var cible = id && document.getElementById(id);
        if (cible) { paires.push({ lien: a, section: cible }); }
    });
    if (!paires.length) { return; }

    var vues = new Map();
    function actualise() {
        var courante = null, meilleur = 0;
        paires.forEach(function (p) {
            var part = vues.get(p.section) || 0;
            if (part > meilleur) { meilleur = part; courante = p.lien; }
        });
        liens.forEach(function (a) {
            if (a === courante) { a.setAttribute('aria-current', 'true'); }
            else { a.removeAttribute('aria-current'); }
        });
    }
    var oeil = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (e) { vues.set(e.target, e.isIntersecting ? e.intersectionRatio : 0); });
        actualise();
    }, { threshold: [0, .15, .35, .6, .85], rootMargin: '-25% 0px -45% 0px' });
    paires.forEach(function (p) { oeil.observe(p.section); });
})();
