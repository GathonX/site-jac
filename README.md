# Nosy Be Secret Islands Tours

Site vitrine pour l'agence Nosy Be Secret Islands Tours — excursions sur l'île paradisiaque de Nosy Be (nature, mer, maki, tortues de mer, requins-baleines). React + TypeScript + Vite + Tailwind + shadcn/ui. Frontend statique, sans base de données — seul le formulaire de contact passe par un petit script PHP côté serveur pour l'envoi d'email (aucune donnée n'est stockée).

## Pages

- `/` — Accueil
- `/excursions` — Toutes les excursions
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

### Automatique (GitHub Actions)

Un push sur la branche `prod` déclenche `.github/workflows/deploy.yml` : build, puis envoi de `dist/` sur le serveur par SSH/rsync. À configurer une seule fois dans **Settings → Secrets and variables → Actions** du dépôt GitHub :

**Connexion serveur**
- `SSH_HOST` — hôte SSH Hostinger
- `SSH_PORT` — port SSH (souvent différent de 22 sur Hostinger, voir hPanel)
- `SSH_USER` — utilisateur SSH
- `SSH_PRIVATE_KEY` — la clé privée correspondant à la clé publique déjà autorisée sur le serveur (jamais la clé publique)
- `REMOTE_PATH` — dossier distant où pointe le domaine (ex. `public_html`, ou `public_html/mondomaine.com` selon la config Hostinger)

**Email (formulaire de contact)** — mêmes valeurs que `public/api/.env` :
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_ENCRYPTION`, `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME`, `MAIL_ADMIN_EMAIL`

Le workflow régénère `public/api/.env` à partir de ces secrets à chaque déploiement — il n'a donc pas besoin d'exister sur le serveur au préalable. Le rsync n'utilise pas `--delete` : il ajoute/met à jour les fichiers mais n'efface rien côté serveur, pour éviter de toucher à d'éventuels autres fichiers présents dans `REMOTE_PATH`.

Pour lancer un déploiement sans faire de commit : onglet **Actions** du dépôt → *Déploiement production* → **Run workflow**.

### Manuel

1. `npm run build` → uploader le contenu de `dist/` à la racine du site (`public_html`).
2. Copier `public/api/.env.example` vers `.env` sur le serveur (dans `public_html/api/.env`) et renseigner les vraies valeurs SMTP. Ce fichier ne doit **jamais** être commité dans git.
3. Le `.htaccess` (inclus dans `dist/`) bloque l'accès direct aux fichiers `.env` et gère le routing des pages React — vérifier que `mod_rewrite` est actif sur l'hébergement.
4. Le formulaire de contact poste vers `/api/send_email.php`, qui doit rester sur le même domaine (pas de CORS configuré).

## Branches

- `prod` — production, déploiement automatique
- `develop` — développement (branche par défaut)
