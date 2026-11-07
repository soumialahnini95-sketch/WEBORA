# Webora — version statique pour GitHub Pages

Cette version comprend le site complet, prêt à être hébergé comme site statique. Elle utilise HTML, CSS et JavaScript vanilla ; aucun serveur Node.js ni compilation n’est nécessaire pour la publication.

## Contenu

- `index.html` : structure de la page et balises SEO locales.
- `styles.css` : design responsive, animations et styles 3D.
- `app.js` : navigation mobile, apparitions au défilement et inclinaison interactive des packs.
- `assets/` : logo et six captures WebP des projets.

Gardez `assets/` à côté de `index.html`. Les chemins sont relatifs, donc le site fonctionne à la racine d’un dépôt ou sous `nom-utilisateur.github.io/nom-du-repo/`.

## Tester dans Visual Studio Code

1. Décompressez l’archive puis ouvrez le dossier dans Visual Studio Code.
2. Pour tester localement, utilisez l’extension **Live Server** et cliquez sur **Go Live**.

## Publier avec GitHub Pages

1. Déposez le contenu de cette archive à la racine de votre dépôt : `index.html`, `styles.css`, `app.js` et `assets/` doivent être au premier niveau.
2. Envoyez le contenu sur la branche `main`.
3. Dans GitHub, ouvrez **Settings → Pages** et sélectionnez **Deploy from a branch**, branche `main`, dossier `/ (root)`, puis enregistrez.
4. GitHub affichera l’adresse du site dans cette section ; pour un dépôt de projet, elle ressemble à `https://nom-utilisateur.github.io/nom-du-repo/`.

Le formulaire prépare le contact sur WhatsApp et ne nécessite pas de backend.

## Animations et compatibilité

Le hero et les sections apparaissent au défilement. Les cartes des six packs suivent subtilement la souris en 3D sur ordinateur. Le tilt est désactivé sur les appareils tactiles et lorsque « réduire les animations » est activé.
