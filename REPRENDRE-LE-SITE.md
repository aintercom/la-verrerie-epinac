# Voir et modifier le site depuis VS Code

## 1. Récupérer la dernière version

### Si le dossier du site est déjà sur l'ordinateur

Ouvrir le dossier dans VS Code, puis dans la barre tout en bas de la fenêtre,
cliquer sur les **deux flèches en rond** à côté du nom de la branche
(`master`). C'est le bouton « synchroniser » : il récupère les dernières
modifications.

Autre chemin : menu **Affichage → Palette de commandes**, taper `Git: Pull`,
valider.

### Si le dossier n'est pas encore là

Palette de commandes (**Cmd+Maj+P** sur Mac, **Ctrl+Maj+P** sur Windows),
taper `Git: Clone`, valider, puis coller :

    https://github.com/Epinac/la-verrerie-epinac.git

VS Code demande où enregistrer le dossier, puis propose de l'ouvrir.

## 2. Voir le site en local

### Installer Live Server, une seule fois

Dans VS Code, icône **Extensions** dans la barre de gauche (les quatre carrés),
chercher **Live Server**, cliquer sur **Installer**.

### Lancer le site

Dans la liste des fichiers à gauche, **clic droit sur `index.html`** →
**Open with Live Server**.

Le navigateur s'ouvre tout seul sur une adresse du type :

    http://127.0.0.1:5500

**La fenêtre d'attente ne s'affiche pas en local.** Le site apparaît dans sa
version complète, telle qu'elle sera visible le 1er octobre.

> ⚠️ Ne pas ouvrir `index.html` par un double-clic depuis le Finder ou
> l'Explorateur. Les menus et les images ne fonctionneraient pas. Il faut
> passer par Live Server.

Chaque fois qu'un fichier est enregistré, la page se recharge toute seule.

## 3. Voir le site en ligne malgré la fenêtre d'attente

    https://domainedelaverrerie.fr/?preview=verrerie2026

La clé reste active tant que le navigateur est ouvert : une fois entrée, on
navigue normalement sur toutes les pages. Ce lien peut se partager.

## 4. Publier une modification

Dans VS Code, icône **Contrôle de code source** dans la barre de gauche
(la petite ramification) :

1. Écrire en haut ce qui a été changé, par exemple « Ajoute les photos des
   chambres »
2. Cliquer sur **Valider** (Commit)
3. Cliquer sur **Synchroniser** (Sync Changes)

Le site en ligne se met à jour **une à deux minutes plus tard**.

> 💡 Après une modification d'un fichier `.css` ou `.js` (dans `assets/`),
> les navigateurs peuvent garder l'ancienne version en mémoire. Pour les
> forcer à recharger, chercher `?v=` dans tout le projet (**Cmd+Maj+F**)
> et remplacer partout la valeur qui suit (aujourd'hui `20260930l`) par la
> date du jour, par exemple `?v=20261015`.

> ⚠️ Il n'y a pas de version de test : ce qui est publié est en ligne
> immédiatement. La fenêtre d'attente protège jusqu'au 1er octobre, mais
> après cette date, une erreur sera visible tout de suite.

## 5. Le jour de l'ouverture, le 1er octobre

Deux choses à retirer. Dans VS Code, **Cmd+Maj+F** (ou **Ctrl+Maj+F**) ouvre
la recherche dans tous les fichiers du projet.

**a) La fenêtre d'attente.** Elle se lève toute seule le 1er octobre 2026 à 0 h (heure de Paris) : rien à faire ce soir-là. Pour alléger le code ensuite, on peut la retirer pour de bon : chercher `VOILE`. Dans chaque page, supprimer le
bloc qui commence par `<!-- VOILE` et va jusqu'à la fin du `<div class="voile">`.

**b) Le blocage Google.** Chercher `NOINDEX`. Dans chaque page, supprimer le
commentaire et la ligne `<meta name="robots" content="noindex, follow">`.

Tant que le noindex est là, Google n'enregistre pas le site. Il faut donc
bien le retirer le jour J, sinon le site n'apparaîtra jamais dans les
résultats de recherche.

## 6. Ce qui reste à faire

- **Le lien Booking.** Une fois la fiche créée, coller son adresse dans
  `assets/js/reserver.js`, ligne 29, entre les guillemets de `var BOOKING = ''`.
  Tous les boutons « Réserver » du site basculent alors vers Booking.
- **Le médiateur de la consommation**, si vous décidez d'y souscrire. La
  section a été retirée des mentions légales.

## 7. Le carnet et la page Patrimoine industriel, mis de côté

Le 30 septembre 2026, le carnet (ses dix articles) et la page
« Patrimoine industriel » (`aux-alentours/le-feu/`) ont été retirés du site.
Rien n'est perdu : tout est sauvegardé sur GitHub, dans la branche
`sauvegarde-carnet-patrimoine`, qui n'est pas publiée.

Pour les remettre, il faudra :

1. récupérer les deux dossiers depuis la sauvegarde :

       git checkout sauvegarde-carnet-patrimoine -- carnet aux-alentours/le-feu

2. remettre les liens retirés en même temps : la carte « Les éléments
   fondateurs » et « Cinq thèmes » → « Six thèmes » sur la page Aux
   alentours, les deux lignes « Patrimoine industriel » et « Le carnet » du
   pied de page de chaque page, le lien « Le carnet » du menu mobile
   (`assets/js/menu.js`), la phrase « Nous tenons un carnet » de la FAQ de
   l'accueil, et les adresses dans `sitemap.xml`.

Le plus simple : demander à Claude de « remettre le carnet et la page
Patrimoine industriel depuis la branche de sauvegarde ».

## 8. La version anglaise

Le site existe en français et en anglais. Chaque page a son double anglais
dans le dossier `en/` :

| Page française | Page anglaise |
|---|---|
| `index.html` (accueil) | `en/index.html` |
| `sejour/` | `en/stay/` |
| `mariages/` | `en/weddings/` |
| `seminaires/` | `en/seminars/` |
| `tournages/` | `en/film-shoots/` |
| `aux-alentours/` | `en/surroundings/` |
| `aux-alentours/activites/` | `en/surroundings/activities/` |
| `aux-alentours/chateaux/` | `en/surroundings/chateaux/` |
| `aux-alentours/nature/` | `en/surroundings/nature/` |
| `aux-alentours/tables-et-marches/` | `en/surroundings/food-and-markets/` |
| `aux-alentours/villages/` | `en/surroundings/villages/` |

**Quand on modifie un texte en français, il faut aussi modifier la page
anglaise correspondante**, sinon les deux versions ne disent plus la même
chose. Le plus simple : demander à Claude de « reporter la modification
dans la version anglaise ».

Le choix de langue (drapeau français, drapeau britannique) est en haut de chaque page, à côté du bouton Réserver, et
en bas du menu sur téléphone. Il mène directement à la même page dans
l'autre langue.

Les demandes envoyées depuis le site anglais arrivent comme les autres,
avec la mention « Demande de séjour (en anglais) » dans l'objet et une
ligne « Langue : Anglais (répondre en anglais) ».

Le jour de l'ouverture, la fenêtre d'attente est aussi à retirer des pages
anglaises : la recherche `VOILE` les trouve avec les autres.
