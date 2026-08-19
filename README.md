# Site touristique

Site vitrine touristique (React + TypeScript + Vite + Tailwind + shadcn/ui). Frontend statique, sans base de données — seul le formulaire de contact passe par un petit script PHP côté serveur pour l'envoi d'email (aucune donnée n'est stockée).

## Pages

- `/` — Accueil
- `/about` — À propos
- `/contact` — Contact (formulaire, email, téléphone, WhatsApp, réseaux sociaux)

## Développement

Node.js et npm requis — [installer avec nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone git@github.com:GathonX/site-jac.git
cd site-jac
npm i
npm run dev
```

## Déploiement (hébergement PHP, ex. Hostinger)

1. `npm run build` → uploader le contenu de `dist/` à la racine du site (`public_html`).
2. Copier `public/api/.env.example` vers `.env` sur le serveur (dans `public_html/api/.env`) et renseigner les vraies valeurs SMTP. Ce fichier ne doit **jamais** être commité dans git.
3. Le `.htaccess` (inclus dans `dist/`) bloque l'accès direct aux fichiers `.env` et gère le routing des pages React — vérifier que `mod_rewrite` est actif sur l'hébergement.
4. Le formulaire de contact poste vers `/api/send_email.php`, qui doit rester sur le même domaine (pas de CORS configuré).

## Branches

- `prod` — production
- `develop` — développement
