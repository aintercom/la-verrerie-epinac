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

> ⚠️ Il n'y a pas de version de test : ce qui est publié est en ligne
> immédiatement. La fenêtre d'attente protège jusqu'au 1er octobre, mais
> après cette date, une erreur sera visible tout de suite.

## 5. Le jour de l'ouverture, le 1er octobre

Deux choses à retirer. Dans VS Code, **Cmd+Maj+F** (ou **Ctrl+Maj+F**) ouvre
la recherche dans tous les fichiers du projet.

**a) La fenêtre d'attente.** Chercher `VOILE`. Dans chaque page, supprimer le
bloc qui commence par `<!-- VOILE` et va jusqu'à la fin du `<div class="voile">`.

**b) Le blocage Google.** Chercher `NOINDEX`. Dans chaque page, supprimer le
commentaire et la ligne `<meta name="robots" content="noindex, follow">`.

Tant que le noindex est là, Google n'enregistre pas le site. Il faut donc
bien le retirer le jour J, sinon le site n'apparaîtra jamais dans les
résultats de recherche.

## 6. Ce qui reste à faire

- **Les photos des deux chambres.** Elles affichent aujourd'hui un aplat de
  couleur avec la mention « Photographies à venir ».
- **Le lien Booking.** Une fois la fiche créée, coller son adresse dans
  `assets/js/reserver.js`, ligne 29, entre les guillemets de `var BOOKING = ''`.
  Tous les boutons « Réserver » du site basculent alors vers Booking.
- **Le médiateur de la consommation**, si vous décidez d'y souscrire. La
  section a été retirée des mentions légales.
