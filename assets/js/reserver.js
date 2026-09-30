/* ==========================================================================
   PANNEAU DE RÉSERVATION
   --------------------------------------------------------------------------
   Le tiroir est construit ici plutôt que recopié dans chaque page : une
   seule source, et tous les boutons « Réserver » du site l'ouvrent.
   L'envoi passe par Web3Forms et arrive dans la boîte du domaine.
   ========================================================================== */
(function () {
    'use strict';

    /* ══════════════════════════════════════════════════════════════════
       BASCULE VERS BOOKING
       ------------------------------------------------------------------
       Le jour où la fiche Booking est active, coller son adresse entre
       les guillemets ci-dessous. Il n'y a rien d'autre à toucher : les
       quelque soixante boutons « Réserver » du site basculent d'un coup
       et s'ouvrent dans un nouvel onglet. Laisser vide garde le
       formulaire de demande.

       Exemple :
       var BOOKING = 'https://www.booking.com/hotel/fr/domaine-de-la-verrerie.fr.html';

       Il restera deux textes à reprendre, qui deviendront faux :
         · index.html, section #reserver  : « Pas de centrale de
           réservation : votre demande arrive directement chez nous »
         · index.html, FAQ               : les réponses qui renvoient
           au formulaire de demande
       ══════════════════════════════════════════════════════════════════ */
    var BOOKING = '';

    var CLE = 'f3e9d88f-3181-45d0-afd5-3c005e7b9db5';
    var EMAIL = 'contact@domainedelaverrerie.fr';
    var TEL = '+33783349554';

    /* Booking renseigné : on n'installe pas le tiroir, on redirige. */
    if (BOOKING) {
        var SELECTEUR = 'a[href="#reserver"], a[href="/#reserver"], a[href$="#reserver"], [data-reserver]';
        var pointe = function () {
            [].slice.call(document.querySelectorAll(SELECTEUR)).forEach(function (a) {
                a.setAttribute('href', BOOKING);
                a.setAttribute('target', '_blank');
                a.setAttribute('rel', 'noopener');
            });
        };
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', pointe);
        } else { pointe(); }
        /* Le menu mobile est construit par menu.js, parfois après nous : on
           repasse une fois la page chargée, et on garde un filet au clic
           pour tout lien ajouté plus tard. */
        window.addEventListener('load', pointe);
        document.addEventListener('click', function (e) {
            var a = e.target.closest && e.target.closest(SELECTEUR);
            if (a) { e.preventDefault(); window.open(BOOKING, '_blank', 'noopener'); }
        });
        return;
    }

    /* ---- construction du tiroir ---- */
    var fond = document.createElement('div');
    fond.className = 'tiroir-fond';

    var tiroir = document.createElement('aside');
    tiroir.className = 'tiroir';
    tiroir.id = 'tiroir-reservation';
    tiroir.setAttribute('role', 'dialog');
    tiroir.setAttribute('aria-modal', 'true');
    tiroir.setAttribute('aria-labelledby', 'tiroir-titre');
    tiroir.setAttribute('aria-hidden', 'true');

    tiroir.innerHTML = [
    '<div class="tiroir-tete">',
    '  <div>',
    '    <h2 id="tiroir-titre">Demander un séjour</h2>',
    '    <p>Dites-nous vos dates, nous revenons vers vous.</p>',
    '  </div>',
    '  <button class="tiroir-fermer" type="button" aria-label="Fermer la demande">&times;</button>',
    '</div>',

    '<form class="tiroir-corps" novalidate>',
    '  <p class="erreur" hidden role="alert"></p>',
    '  <p class="mention-requis"><span class="requis" aria-hidden="true">*</span> Champs obligatoires</p>',

    '  <div class="champ">',
    '    <label for="r-objet">Votre demande</label>',
    '    <select id="r-objet" name="Type de demande">',
    '      <option>Une ou plusieurs nuitées</option>',
    '      <option>Un mariage ou une réception</option>',
    '      <option>Un tournage ou une séance photo</option>',
    '      <option>Un séminaire ou une réunion</option>',
    '      <option>Autre chose</option>',
    '    </select>',
    '  </div>',

    '  <div class="champ" id="r-bloc-chambre">',
    '    <label for="r-chambre">Chambre souhaitée</label>',
    '    <select id="r-chambre" name="Chambre">',
    '      <option>Peu importe</option>',
    '      <option>Cul de Bouteille</option>',
    '      <option>Bleu et Silice</option>',
    '      <option>Les deux chambres</option>',
    '    </select>',
    '  </div>',

    '  <div class="duo-champ">',
    '    <div class="champ"><label for="r-arrivee">Arrivée</label>',
    '      <input id="r-arrivee" name="Arrivée" type="date"></div>',
    '    <div class="champ"><label for="r-depart">Départ</label>',
    '      <input id="r-depart" name="Départ" type="date"></div>',
    '  </div>',

    '  <div class="duo-champ">',
    '    <div class="champ"><label for="r-adultes">Adultes</label>',
    '      <input id="r-adultes" name="Adultes" type="number" min="1" value="2" inputmode="numeric"></div>',
    '    <div class="champ"><label for="r-enfants">Enfants</label>',
    '      <input id="r-enfants" name="Enfants" type="number" min="0" value="0" inputmode="numeric"></div>',
    '  </div>',

    '  <div class="champ"><label for="r-nom">Nom <span class="requis" aria-hidden="true">*</span></label>',
    '    <input id="r-nom" name="Nom" type="text" autocomplete="family-name" required aria-describedby="r-nom-aide">',
    '    <p class="aide-erreur" id="r-nom-aide">Indiquez votre nom.</p></div>',
    '  <div class="champ"><label for="r-email">Email <span class="requis" aria-hidden="true">*</span></label>',
    '    <input id="r-email" name="Email" type="email" autocomplete="email" required aria-describedby="r-email-aide">',
    '    <p class="aide-erreur" id="r-email-aide">Indiquez un email valide, pour que nous puissions vous répondre.</p></div>',
    '  <div class="champ"><label for="r-tel">Téléphone <span class="requis" aria-hidden="true">*</span></label>',
    '    <input id="r-tel" name="Téléphone" type="tel" autocomplete="tel" required aria-describedby="r-tel-aide">',
    '    <p class="aide-erreur" id="r-tel-aide">Indiquez votre numéro de téléphone (au moins dix chiffres).</p></div>',
    '  <div class="champ"><label for="r-message">Votre message <span class="obligatoire">(facultatif)</span></label>',
    '    <textarea id="r-message" name="Message" rows="3" placeholder="Une occasion particulière, une question…"></textarea></div>',
    '</form>',

    '<div class="tiroir-pied">',
    '  <button class="btn" type="submit" form="" id="r-envoi">Envoyer ma demande</button>',
    '  <p class="secours">Ou écrivez-nous&nbsp;: <a href="mailto:' + EMAIL + '">' + EMAIL + '</a></p>',
    '</div>',

    '<div class="tiroir-merci">',
    '  <div class="coche" aria-hidden="true">&#10003;</div>',
    '  <h3>Votre demande est partie</h3>',
    '  <p>Nous revenons vers vous personnellement. Si c\'est urgent, appelez-nous au <a href="tel:' + TEL + '">07 83 34 95 54</a>.</p>',
    '  <button class="btn btn--ligne" type="button" id="r-nouvelle">Faire une nouvelle demande</button>',
    '</div>'
    ].join('\n');

    document.body.appendChild(fond);
    document.body.appendChild(tiroir);

    var form    = tiroir.querySelector('form');
    var erreur  = tiroir.querySelector('.erreur');
    var envoi   = tiroir.querySelector('#r-envoi');
    var fermer  = tiroir.querySelector('.tiroir-fermer');
    var objet   = tiroir.querySelector('#r-objet');
    var blocCh  = tiroir.querySelector('#r-bloc-chambre');
    var arrivee = tiroir.querySelector('#r-arrivee');
    var depart  = tiroir.querySelector('#r-depart');
    var nom     = tiroir.querySelector('#r-nom');
    var email   = tiroir.querySelector('#r-email');
    var tel     = tiroir.querySelector('#r-tel');
    var rendu   = null;

    /* pas de date passée */
    var auj = new Date().toISOString().slice(0, 10);
    arrivee.min = auj; depart.min = auj;
    arrivee.addEventListener('change', function () {
        depart.min = arrivee.value || auj;
        if (depart.value && depart.value < arrivee.value) { depart.value = ''; }
    });

    /* la chambre ne concerne qu'un séjour */
    objet.addEventListener('change', function () {
        blocCh.hidden = objet.value !== 'Une ou plusieurs nuitées';
    });

    /* ---- ouverture et fermeture ---- */
    function focalisables() {
        return [].slice.call(tiroir.querySelectorAll(
            'button, [href], input, select, textarea')).filter(function (e) {
            return !e.disabled && e.offsetParent !== null;
        });
    }

    /* Préremplissage.
       · « Demander cette chambre » porte data-chambre : la chambre est choisie.
       · Sur les pages mariages, tournages et séminaires, le type de demande
         est celui de la page.
       · Nom, email et téléphone d'une demande déjà envoyée depuis ce
         navigateur sont repris (gardés sur l'appareil du visiteur seulement). */
    var OBJET_PAGE = {
        '/mariages/':   'Un mariage ou une réception',
        '/tournages/':  'Un tournage ou une séance photo',
        '/seminaires/': 'Un séminaire ou une réunion'
    };
    var MEMOIRE = 'verrerie-coordonnees';

    function choisit(select, valeur) {
        [].slice.call(select.options).forEach(function (o) { o.selected = o.text === valeur; });
    }

    function preremplit(depuis) {
        var chambre = depuis && depuis.getAttribute && depuis.getAttribute('data-chambre');
        var type = chambre ? 'Une ou plusieurs nuitées' : OBJET_PAGE[location.pathname];
        if (type) { choisit(objet, type); }
        if (chambre) { choisit(form.querySelector('#r-chambre'), chambre); }
        blocCh.hidden = objet.value !== 'Une ou plusieurs nuitées';
        try {
            var m = JSON.parse(localStorage.getItem(MEMOIRE) || 'null');
            if (m) {
                if (!nom.value) { nom.value = m.nom || ''; }
                if (!email.value) { email.value = m.email || ''; }
                if (!tel.value) { tel.value = m.tel || ''; }
            }
        } catch (e) { /* stockage indisponible : on laisse vide */ }
    }

    /* après un envoi : formulaire vierge, coordonnées gardées */
    function nouvelle() {
        [arrivee, depart, form.querySelector('#r-message')].forEach(function (c) { c.value = ''; });
        form.querySelector('#r-adultes').value = '2';
        form.querySelector('#r-enfants').value = '0';
        objet.selectedIndex = 0;
        form.querySelector('#r-chambre').selectedIndex = 0;
        blocCh.hidden = false;
        erreur.hidden = true;
        [nom, email, tel].forEach(function (c) { marque(c, true); });
        envoi.disabled = false;
        envoi.textContent = 'Envoyer ma demande';
        tiroir.classList.remove('envoye');
        form.scrollTop = 0;
    }

    function ouvre(depuis) {
        rendu = depuis || document.activeElement;
        if (tiroir.classList.contains('envoye')) { nouvelle(); }
        preremplit(depuis);
        fond.classList.add('ouvert');
        tiroir.classList.add('ouvert');
        tiroir.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(function () {
            var p = focalisables();
            if (p.length > 1) { p[1].focus(); }   /* on saute la croix */
        }, 60);
    }

    function ferme() {
        fond.classList.remove('ouvert');
        tiroir.classList.remove('ouvert');
        tiroir.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (rendu && rendu.focus) { rendu.focus(); }
    }

    fermer.addEventListener('click', ferme);
    fond.addEventListener('click', ferme);
    document.addEventListener('keydown', function (e) {
        if (!tiroir.classList.contains('ouvert')) { return; }
        if (e.key === 'Escape') { ferme(); return; }
        if (e.key !== 'Tab') { return; }
        var p = focalisables();
        if (!p.length) { return; }
        var premier = p[0], dernier = p[p.length - 1];
        if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
        else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    });

    /* tous les appels à réserver du site ouvrent le tiroir */
    function brancher() {
        var cibles = [].slice.call(document.querySelectorAll(
            'a[href="#reserver"], a[href="/#reserver"], a[href$="#reserver"], [data-reserver]'));
        cibles.forEach(function (a) {
            if (a.dataset.branche) { return; }
            a.dataset.branche = '1';
            a.addEventListener('click', function (e) { e.preventDefault(); ouvre(a); });
        });
    }
    brancher();

    /* ---- envoi ---- */
    envoi.addEventListener('click', function () {
        erreur.hidden = true;

        var fautifs = [nom, email, tel].filter(function (c) { return !marque(c, valide(c)); });
        if (fautifs.length) {
            montreErreur(fautifs.length > 1
                ? 'Merci de compléter les champs en rouge.'
                : 'Merci de compléter le champ en rouge.', fautifs[0]);
            return;
        }

        var donnees = { access_key: CLE, subject: 'Demande de séjour · Domaine de la Verrerie', from_name: 'Site du Domaine' };
        [].slice.call(form.querySelectorAll('input, select, textarea')).forEach(function (c) {
            if (c.name && !(c.id === 'r-chambre' && blocCh.hidden)) { donnees[c.name] = c.value; }
        });

        envoi.disabled = true;
        envoi.textContent = 'Envoi…';

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(donnees)
        }).then(function (r) { return r.json(); })
          .then(function (d) {
              if (d && d.success) {
                  try {
                      localStorage.setItem(MEMOIRE, JSON.stringify({
                          nom: nom.value.trim(), email: email.value.trim(), tel: tel.value.trim() }));
                  } catch (e) { /* stockage indisponible : tant pis */ }
                  tiroir.classList.add('envoye');
                  tiroir.querySelector('.tiroir-merci h3').focus();
              }
              else { throw new Error('refus'); }
          })
          .catch(function () {
              envoi.disabled = false;
              envoi.textContent = 'Envoyer ma demande';
              montreErreur('L\'envoi n\'a pas abouti. Écrivez-nous directement à ' + EMAIL + '.');
          });
    });

    /* au moins dix chiffres pour le téléphone : un numéro français, ou étranger avec son indicatif */
    function valide(c) {
        var v = c.value.trim();
        if (c === email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
        if (c === tel) { return v.replace(/\D/g, '').length >= 10; }
        return v.length > 0;
    }

    function marque(c, ok) {
        c.closest('.champ').classList.toggle('invalide', !ok);
        if (ok) { c.removeAttribute('aria-invalid'); } else { c.setAttribute('aria-invalid', 'true'); }
        return ok;
    }

    /* le rouge s'en va dès que le champ est correct */
    [nom, email, tel].forEach(function (c) {
        c.addEventListener('input', function () {
            if (c.closest('.champ').classList.contains('invalide') && valide(c)) {
                marque(c, true);
                if (!tiroir.querySelector('.champ.invalide')) { erreur.hidden = true; }
            }
        });
    });

    tiroir.querySelector('#r-nouvelle').addEventListener('click', function () {
        nouvelle();
        preremplit(null);
        nom.focus();
    });

    function montreErreur(txt, champ) {
        erreur.textContent = txt;
        erreur.hidden = false;
        erreur.scrollIntoView({ block: 'nearest' });
        if (champ) { champ.focus(); }
    }

    /* le formulaire n'est pas soumis par le navigateur : c'est fetch qui parle */
    form.addEventListener('submit', function (e) { e.preventDefault(); envoi.click(); });
    tiroir.querySelector('.tiroir-merci h3').setAttribute('tabindex', '-1');
})();
