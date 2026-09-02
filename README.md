# Mon Portfolio — Portfolio CMS Full-Stack (Next.js)

Portfolio professionnel + Dashboard d'administration.
Stack : **Next.js 16 · React 19 · TypeScript · Tailwind v4 · Prisma · PostgreSQL · Auth.js v5**.

Spécification complète : [`docs/spec_portfolio.md`](docs/spec_portfolio.md).

## Phase 1 — Foundation (état actuel)

- [x] Next.js (App Router, `src/`, TypeScript, ESLint, React Compiler)
- [x] Tailwind CSS v4 + design system (§31) + dark mode (`next-themes`)
- [x] shadcn/ui configuré (`components.json`) — composants ajoutés à la demande
- [x] Prisma + schéma complet (§36) : 20+ modèles, enums, index
- [x] Auth.js v5 — Credentials, sessions JWT 8 h, `/admin/**` protégé par middleware Edge
- [x] Rôles & permissions (`SUPER_ADMIN`, `EDITOR`)
- [x] Architecture des dossiers (§47) : `lib/{auth,db,analytics,storage,email,validation,api}`
- [x] Routes publiques + admin (squelette navigable)
- [x] Route Handlers de référence : `/api/contact`, `/api/analytics/events`, `/api/projects`, `/api/health`
- [x] Validation Zod, rate limiting, envelopes d'erreur (§38, §39, §40)
- [x] SEO de base : `metadata`, `robots.ts`, `sitemap.ts`
- [x] Seed Prisma (§49)

## Phase 2 — Public Portfolio

- [x] Couche données `src/lib/queries` (Prisma + `cache()`, tolérante à une DB vide)
- [x] Primitives UI : Button, Card, Badge, Section
- [x] Home : hero, stats, aperçu compétences, projets en vedette, services, CTA
- [x] Pages : about, skills, projects (filtre techno), **détail projet** (§11 : problème/
      solution/architecture/défis/résultats, galerie, précédent/suivant), expérience
      (timeline), formation, certifications, services, contact (formulaire réel),
      CV (téléchargement tracké)
- [x] Tracking analytics : PAGE_VIEW, PROJECT_VIEW, clics sortants (GitHub, social, démo, CV)
- [x] SEO : metadata par page, JSON-LD (Person, WebSite, BreadcrumbList, CreativeWork),
      sitemap dynamique
- [x] ISR : le groupe public se revalide chaque heure

## Phase 3 — Admin

- [x] Boîte à outils `src/lib/admin` : `runAction()` (permission + Zod(FormData) +
      audit log + `revalidatePath`), fabriques `makeToggle/Delete/ReorderAction`,
      `logAudit()` → table `AuditLog` (§35)
- [x] UI partagée : `AdminForm` (`useActionState` + toasts sonner + redirection),
      champs de formulaire, `AdminTable`, `InlineToggle`, `DeleteButton` (`<dialog>`)
- [x] CRUD complet (liste + création + édition + toggle publier/visible + suppression) :
      **projets** (statut, catégorie, technologies, SEO, galerie), **compétences**,
      **expériences**, **formations**, **certifications**, **services**
- [x] **Profil** : enregistrement unique + liens sociaux répétables (§8, §25)
- [x] **Paramètres** : général / SEO / réseaux / contact — `SiteSetting` (§27)
- [x] **Messages** : onglets UNREAD/READ/ARCHIVED/SPAM + compteurs + réponse `mailto` (§19)
- [x] **Médias** : enregistrement d'URL externe + copie + suppression (§26 — l'upload
      direct nécessite un fournisseur de stockage)
- [x] Dashboard : tuiles KPI réelles + panneau messages récents
- [x] Chaque mutation : permission vérifiée, journalisée, revalidation des pages publiques

> Testimonials, blog, utilisateurs, audit-logs (lecture) et recherche globale ⌘K
> restent des placeholders (V2, §51).

## Phase 4 — Analytics

- [x] `src/lib/analytics/range.ts` — fenêtres aujourd'hui / 7j / 30j / 90j / 1 an
      avec comparaison à la période précédente
- [x] `src/lib/analytics/ua.ts` — détection appareil / navigateur ; `/api/analytics/events`
      enregistre désormais `device` + `browser`
- [x] `src/lib/queries/analytics.ts` — KPI + deltas, série temporelle (`date_trunc`),
      pages les plus vues, projets les plus consultés, répartition interactions & appareils
- [x] `src/components/charts` — Recharts : `TrendArea`, `InteractionsBar`, `DeviceDonut`
- [x] `/admin/analytics` — filtre temporel, 5 cartes KPI, graphe de trafic, tops, donut
- [x] `/admin/dashboard` retravaillé (StatCard count-up + tendance 30 j)
- [x] Design du dashboard admin aligné sur l'identité retro-tech

## Phase 5 — SEO & Performance

- [x] Métadonnées pilotées par la BDD : `getSiteSettings()` alimente le
      `generateMetadata` racine (titre, description, mots-clés, image OG)
- [x] `pageMetadata()` — canonical + Open Graph + Twitter cohérents sur toutes
      les pages publiques
- [x] Images OG dynamiques : `/opengraph-image` (carte du site) et
      `/projects/[slug]/opengraph-image` (par projet) via `next/og`
- [x] `manifest.webmanifest`, `icon` + `apple-icon` générés (`next/og`)
- [x] JSON-LD : Person, WebSite, BreadcrumbList, CreativeWork
- [x] `sitemap.xml` avec `lastModified` réel des projets ; `robots.txt`
- [x] `next.config` : AVIF/WebP, `optimizePackageImports` (lucide / framer /
      recharts), `poweredByHeader: false`, en-têtes de sécurité + cache long
      sur `/uploads`
- [x] ISR 1 h sur les pages publiques (revalidation ciblée aux mutations)
- [x] Accessibilité : lien d'évitement « Aller au contenu », `<main id>`,
      `prefers-reduced-motion` respecté partout

## Design

Identité **retro-tech immersive** (dark-first « CRT ») : grilles, cadres terminal,
scanlines, halos, JetBrains Mono. Primitives `src/components/motion` (Reveal,
Typewriter, Counter, Marquee, Magnetic, TiltCard) + `src/components/retro`
(backdrop, cursor glow) + transition de route (`(public)/template.tsx`). Tout
respecte `prefers-reduced-motion`.

## Démarrage

```bash
# 1. Dépendances
npm install

# 2. Environnement
cp .env.example .env.local
#   -> renseigner DATABASE_URL (PostgreSQL local) et AUTH_SECRET (`npx auth secret`)

# 3. Base de données
npm run prisma:migrate      # crée le schéma
npm run db:seed             # données initiales + compte admin

# 4. Développement
npm run dev                 # http://localhost:3000
```

Admin : `http://localhost:3000/admin/login` — identifiants dans `.env.local`
(`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).

### PostgreSQL via Docker (optionnel)

```bash
docker compose up -d
```

## Scripts

| Script | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` / `start` | Build et exécution de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run prisma:migrate` | Migration de développement |
| `npm run prisma:studio` | Explorateur Prisma |
| `npm run db:seed` | Seed de la base |

## Structure

```
src/
├── app/
│   ├── (public)/        # site public
│   ├── admin/           # login + (dashboard) protégé
│   └── api/             # Route Handlers
├── components/{ui,public,admin,charts,forms}/
├── config/              # config du site, navigation
├── hooks/
├── lib/{auth,db,analytics,storage,email,validation,api,utils,env}/
└── types/
prisma/                  # schema.prisma + seed.ts
```

## Phase 6 — Production

### Tests

```bash
npm test            # Vitest — 33 tests unitaires (lib pures)
npm run test:watch
npm run test:e2e    # Playwright — parcours visiteur + garde admin + /api/health
```

`npm run test:e2e` démarre un serveur (`next dev`, ou `next start` si
`E2E_START=1`) ; pointe `E2E_BASE_URL` sur un serveur déjà lancé pour l'éviter.
Installe le navigateur une fois : `npx playwright install chromium`.

### Docker

```bash
docker compose up -d --build     # app (image standalone) + PostgreSQL
docker compose up -d postgres    # base seule, app en `npm run dev`
```

`Dockerfile` multi-stage (`node:22-alpine`, sortie `standalone`, user non-root,
`HEALTHCHECK` sur `/api/health`). Au démarrage : `prisma migrate deploy` puis
`node server.js`. L'`AUTH_SECRET` doit être fourni (shell ou fichier `.env`).

### CI — `.github/workflows/ci.yml`

| Job | Étapes |
| --- | --- |
| **quality** | install · `prisma generate` · lint · typecheck · `npm test` · `next build` |
| **e2e** | service PostgreSQL · `migrate deploy` · `db:seed` · `playwright install` · build · `test:e2e` |
| **docker** | `docker build` (cache GHA) |

### Déploiement

- **Vercel** : connecter le repo, définir `DATABASE_URL` (Postgres managé),
  `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`, `STORAGE_PROVIDER` + creds Cloudinary.
  Migrations : `npx prisma migrate deploy` en build command ou via un job.
- **VPS / Docker** : `docker compose up -d --build`, reverse-proxy (Caddy/Nginx)
  vers le port 3000, `AUTH_SECRET` dans l'environnement.
- **Monitoring** : `GET /api/health` renvoie `{ status, db }` (200 si la base
  répond) — à brancher sur un uptime-checker.
