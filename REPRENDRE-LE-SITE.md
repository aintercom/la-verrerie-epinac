# Reprendre le site en local

## Une seule fois, pour récupérer le projet

Si le dossier est déjà sur l'ordinateur, il suffit de le mettre à jour :

    cd chemin/vers/la-verrerie-epinac
    git pull

S'il n'y est pas encore :

    git clone https://github.com/Epinac/la-verrerie-epinac.git
    cd la-verrerie-epinac

## Voir le site sur son ordinateur

Dans le dossier du projet, lancer un petit serveur :

    python3 -m http.server 8080

Puis ouvrir dans le navigateur :

    http://localhost:8080

Depuis VS Code, l'extension **Live Server** fait la même chose : clic droit sur
`index.html`, « Open with Live Server ».

**La fenêtre d'attente ne s'affiche pas en local.** Le script la lève
automatiquement sur `localhost` et `127.0.0.1` : on voit donc le vrai site,
tel qu'il sera le 1er octobre.

## Voir le site en ligne, malgré la fenêtre d'attente

    https://domainedelaverrerie.fr/?preview=verrerie2026

La clé se mémorise pour toute la session : une fois entrée, on navigue
normalement sur toutes les pages.

## Publier une modification

    git add -A
    git commit -m "Ce que j'ai changé"
    git push

Le site en ligne se met à jour tout seul, une à deux minutes après.
Il n'y a pas de préproduction : ce qui est poussé est en ligne.

## Le jour de l'ouverture, le 1er octobre

Deux choses à retirer, dans cet ordre ou dans l'autre :

1. **La fenêtre d'attente** : le bloc `<div class="voile">` et le petit script
   qui le précède, dans chaque page. Chercher `VOILE` dans le projet.
2. **Le noindex** : la ligne `<meta name="robots" content="noindex, follow">`
   dans chaque page. Chercher `NOINDEX` dans le projet.

Dans VS Code, la recherche dans tous les fichiers (Cmd+Maj+F) permet de les
trouver d'un coup.

## Ce qui reste à faire

- Les photos des deux chambres, qui affichent aujourd'hui un aplat de couleur
- Le lien de la fiche Booking, à coller dans `assets/js/reserver.js` ligne 29 :
  tous les boutons du site basculent alors vers Booking
- Le médiateur de la consommation dans les mentions légales, si vous souscrivez
