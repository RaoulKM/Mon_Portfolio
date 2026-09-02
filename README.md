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

## Prochaines phases

- **Phase 2** — Portfolio public (contenu réel des sections)
- **Phase 3** — Dashboard (CRUD complet, médias, settings)
- **Phase 4** — Analytics (tracking, graphiques)
- **Phase 5** — SEO & performance
- **Phase 6** — Tests, Docker, CI/CD, déploiement
