# Déploiement sur Vercel (offre gratuite « Hobby »)

Le dépôt est déjà prêt : `vercel.json`, script `vercel-build` (migrations Prisma
automatiques), pool `pg` réduit en serverless, `trustHost` activé.

---

## 1. Base de données PostgreSQL gratuite (Neon)

Vercel Hobby n'héberge pas de base. Utiliser **Neon** (ou Supabase) — offre gratuite.

1. Créer un compte sur https://neon.tech → nouveau projet, région proche de l'Europe
   (ex. `AWS eu-central-1` Francfort).
2. Récupérer **deux** chaînes de connexion dans *Connection Details* :
   - **Pooled** (host `...-pooler...`) → pour Vercel (`DATABASE_URL`).
     Ajouter à la fin : `&pgbouncer=true&connection_limit=1`
   - **Direct** (sans `-pooler`) → pour lancer les migrations depuis ta machine.

> Pourquoi deux : le runtime serverless ouvre beaucoup de connexions courtes →
> il faut le *pooler* en prod. Prisma Migrate a besoin d'une connexion **directe**
> (verrous d'avis incompatibles avec pgbouncer). Ce projet ne lance **pas** les
> migrations pendant le build Vercel — elles se font à la main (étape 4).

---

## 2. Cloudinary (stockage des images)

Le système de fichiers de Vercel est éphémère : `STORAGE_PROVIDER=local` ne marche
pas. Garder `cloudinary`.

- Créer un compte gratuit https://cloudinary.com → *Dashboard* → *API Keys*.
- Relever `Cloud name`, `API Key`, `API Secret`.
- ⚠️ L'ancien secret Cloudinary (`R1_QgP…`) a été exposé dans l'historique git
  (commit `d3d5180`). **Le régénérer** dans Cloudinary → Settings → Security →
  *Invalidate previous API secret*, et utiliser le nouveau ci-dessous.

---

## 3. Importer le projet dans Vercel

Le dépôt GitHub `RaoulKM/Mon_Portfolio` est déjà à jour (branche `main`).

1. https://vercel.com → *Add New… → Project* → *Import* le dépôt GitHub.
2. Framework : **Next.js** (auto-détecté).
3. **Ne rien changer** aux commandes : Vercel voit le script `vercel-build`
   (`prisma generate && next build`) et l'utilise.
4. Avant de cliquer *Deploy*, ouvrir *Environment Variables* et coller la liste
   de l'étape 4.
5. *Settings → Functions* : choisir la région **Frankfurt (fra1)** (même zone que
   Neon) pour réduire la latence DB.

---

## 4. Variables d'environnement (Production + Preview)

| Variable | Valeur |
|---|---|
| `DATABASE_URL` | chaîne **pooled** Neon + `&pgbouncer=true&connection_limit=1` |
| `AUTH_SECRET` | `npx auth secret` en local, coller la valeur |
| `AUTH_URL` | `https://<ton-app>.vercel.app` |
| `AUTH_TRUST_HOST` | `true` |
| `NEXT_PUBLIC_SITE_URL` | `https://<ton-app>.vercel.app` |
| `STORAGE_PROVIDER` | `cloudinary` |
| `CLOUDINARY_CLOUD_NAME` | depuis le dashboard Cloudinary |
| `CLOUDINARY_API_KEY` | idem |
| `CLOUDINARY_API_SECRET` | le **nouveau** secret régénéré |
| `CLOUDINARY_FOLDER` | `portfolio` |
| `EMAIL_FROM` | `no-reply@<ton-domaine>` (ou garder `no-reply@localhost`) |
| `SEED_ADMIN_EMAIL` | `kommboumepierreraoul@gmail.com` |
| `SEED_ADMIN_PASSWORD` | un mot de passe fort (sert une seule fois au seed) |
| `SEED_ADMIN_NAME` | `KOM MBOUME PIERRE RAOUL` |

> Après le 1er déploiement, si l'URL réelle diffère, mettre à jour `AUTH_URL` et
> `NEXT_PUBLIC_SITE_URL` puis *Redeploy*.

### Migrations + seed (une fois, depuis ta machine)

`prisma.config.ts` lit `DATABASE_URL` depuis `.env.local`. Utiliser la chaîne
**directe** Neon le temps de cette opération :

```powershell
# PowerShell, à la racine du projet
$env:DATABASE_URL = "<chaîne DIRECTE Neon>"
npx prisma migrate deploy      # crée toutes les tables
npm run db:seed                # KOM MBOUME…, technologies, AgriPulse, settings
```

À refaire (même commande) à chaque nouvelle migration Prisma, avant de pousser.

---

## 5. Premier déploiement

1. Faire l'étape 4 (migrate + seed vers Neon) **avant** de déployer.
2. Cliquer *Deploy* dans Vercel. Le build : `npm install` → `prisma generate` →
   `next build`.
3. Ouvrir `https://<ton-app>.vercel.app` → le portfolio public s'affiche.
4. `/admin/login` → se connecter avec `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`,
   puis changer le mot de passe dans *Mon compte*.

---

## 6. Limites & points d'attention (Hobby)

- **Images `/uploads/*` cassées** : le seed et d'anciennes lignes `Media` /
  `Project` pointent vers des fichiers locaux (`public/uploads/…`, gitignorés)
  absents sur Vercel : logo IUT FOTSO Victor, CV PDF, galerie AgriPulse (9 images).
  → Les re-téléverser depuis l'admin (uploads Cloudinary) après connexion, ou
  éditer les URL pour pointer vers Cloudinary.
- **E-mail** : sans `EMAIL_SERVER`, les envois sont seulement loggés (console).
  Pour activer l'envoi réel (réponse aux messages depuis `/admin/messages`,
  notification de contact), définir `EMAIL_SERVER` (URL SMTP — Gmail + App
  Password, cf. `.env.example`) et `EMAIL_FROM` dans Vercel, puis *Redeploy*.
  Le formulaire de contact enregistre toujours le message en base (+ badge
  « non lus ») même sans email configuré.
- **Cold starts** : la 1re requête après inactivité réveille la fonction + la
  base Neon (~1 s). Normal en gratuit.
- **Neon free** : la base se met en veille après inactivité et a un quota de
  compute mensuel — suffisant pour un portfolio.
- **Pas de cron** en Hobby au-delà d'1/jour ; l'app n'en utilise pas.

---

## 7. Redéploiements

Chaque `git push` sur `main` redéploie automatiquement. Pour un changement de
schéma Prisma : lancer `npx prisma migrate deploy` en local contre Neon (chaîne
directe) **avant** le push, sinon le nouveau code attendra des colonnes absentes.
