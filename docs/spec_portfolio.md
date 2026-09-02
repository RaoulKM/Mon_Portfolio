# SPECIFICATION — Portfolio Full-Stack Next.js avec Dashboard Admin

**Nom du document :** `spec_portfolio.md`  
**Projet :** Portfolio personnel professionnel + Dashboard d'administration  
**Stack principale :** Next.js (Frontend + Backend), TypeScript, PostgreSQL  
**Objectif :** construire un portfolio moderne, professionnel, administrable à 100 %, performant, responsive et évolutif.

---

# 1. Vision du projet

Le portfolio doit être une véritable **application web personnelle**, et non une simple page vitrine.

Il doit présenter le profil professionnel, les compétences, les projets, les expériences, les formations, les certifications, les services, les réalisations et les moyens de contact.

Une partie publique permettra aux visiteurs, recruteurs, entreprises et clients de découvrir le profil.

Une partie privée `/admin` permettra de gérer l'ensemble du contenu sans modifier le code.

### Principe central

> Tout ce qui apparaît sur le portfolio public doit pouvoir être créé, modifié, publié, masqué ou supprimé depuis le Dashboard Admin.

Le système doit également fournir des statistiques sur les visiteurs et les interactions afin de mesurer les performances du portfolio.

---

# 2. Objectifs

## 2.1 Objectifs principaux

- Construire une identité professionnelle forte.
- Présenter clairement le profil Full-Stack.
- Mettre en valeur Laravel, Next.js, React, TypeScript et l'écosystème moderne.
- Présenter les projets réalisés avec leurs technologies et résultats.
- Permettre la gestion complète du contenu depuis l'administration.
- Suivre les visiteurs et interactions.
- Faciliter le contact professionnel.
- Améliorer la visibilité SEO.
- Permettre une évolution future vers un véritable personal brand / site professionnel.

## 2.2 Objectifs secondaires

- Ajouter un blog technique.
- Publier des articles.
- Recevoir des demandes de contact.
- Gérer des témoignages.
- Afficher les statistiques.
- Gérer plusieurs langues à terme.
- Préparer le système à une future intégration IA.

---

# 3. Positionnement du portfolio

Le portfolio doit refléter un profil de :

**Développeur Full-Stack / Software Engineer orienté produits numériques, SaaS, architecture logicielle et IA.**

Le design doit transmettre :

- sérieux ;
- modernité ;
- expertise technique ;
- créativité ;
- ambition ;
- simplicité ;
- confiance.

Le portfolio ne doit pas ressembler à un template étudiant générique.

Il doit avoir une identité visuelle propre.

---

# 4. Architecture générale

L'application sera construite entièrement avec Next.js.

```text
                    VISITEUR
                       |
                       v
              +----------------+
              |   Next.js App  |
              +----------------+
                       |
          +------------+------------+
          |                         |
          v                         v
   PUBLIC WEBSITE              ADMIN DASHBOARD
          |                         |
          +------------+------------+
                       |
                       v
                NEXT.JS BACKEND
              Route Handlers / API
                       |
                       v
                 PostgreSQL
                       |
        +--------------+--------------+
        |              |              |
        v              v              v
     Storage        Analytics       Email
```

---

# 5. Stack technique

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Framer Motion
- Recharts

## Backend

- Next.js Route Handlers
- Server Actions lorsque pertinent
- TypeScript
- Authentification sécurisée
- Validation avec Zod

## Base de données

- PostgreSQL
- Prisma ORM

## Authentification

- Auth.js / système d'authentification équivalent
- Session sécurisée
- Protection des routes `/admin`
- Hash sécurisé des mots de passe si authentification classique

## Médias

Prévoir une abstraction de stockage permettant d'utiliser :

- Cloudinary ;
- S3 compatible ;
- ou un autre stockage externe.

Ne pas dépendre du stockage local du serveur pour les images importantes.

## Déploiement

Architecture compatible avec :

- Vercel ;
- VPS ;
- Docker ;
- PostgreSQL managé.

---

# 6. Structure des routes

## 6.1 Routes publiques

```text
/
├── /about
├── /projects
├── /projects/[slug]
├── /skills
├── /experience
├── /education
├── /certifications
├── /services
├── /blog
├── /blog/[slug]
├── /contact
└── /resume
```

Selon le design final, plusieurs sections peuvent être regroupées sur la homepage.

## 6.2 Routes administration

```text
/admin
/admin/login
/admin/dashboard

/admin/profile
/admin/projects
/admin/projects/new
/admin/projects/[id]
/admin/skills
/admin/experience
/admin/education
/admin/certifications
/admin/services
/admin/blog
/admin/blog/new
/admin/blog/[id]
/admin/testimonials
/admin/messages
/admin/media
/admin/analytics
/admin/settings
/admin/users
```

---

# 7. Homepage publique

La homepage doit être la page la plus travaillée.

## Section 1 — Hero

Afficher :

- photo/avatar ou illustration ;
- nom ;
- titre professionnel ;
- courte présentation ;
- CTA principal ;
- CTA secondaire ;
- liens sociaux ;
- technologies principales.

Exemple de structure :

```text
KOM MBOUME PIERRE RAOUL

Full-Stack Developer
Laravel • Next.js • React • TypeScript

Je conçois des applications web modernes,
des SaaS et des solutions numériques évolutives.

[Voir mes projets] [Me contacter]
```

Prévoir une animation légère et professionnelle.

---

# 8. Section About

Contenu administrable :

- présentation ;
- parcours ;
- philosophie ;
- objectifs ;
- localisation générale ;
- disponibilité ;
- années d'expérience ;
- nombre de projets ;
- nombre de technologies maîtrisées.

Possibilité d'afficher des statistiques :

```text
20+ Projets
10+ Technologies
X Certifications
X Années de pratique
```

Toutes ces données doivent être modifiables depuis l'administration.

---

# 9. Section Skills

Afficher les compétences par catégories.

## Frontend

- Next.js
- React
- TypeScript
- JavaScript
- Tailwind CSS
- React Native

## Backend

- Laravel
- Node.js
- NestJS
- REST API
- Authentication
- API Architecture

## Database

- PostgreSQL
- MySQL
- MariaDB
- Prisma

## DevOps / Cloud

- Docker
- Git
- GitHub
- VPS
- Vercel
- Render
- CI/CD

## AI

- OpenAI
- Groq
- Gemini
- AI APIs
- AI moderation
- AI assistants

Chaque compétence doit avoir :

```text
name
category
level
years
icon
color
description
displayOrder
isVisible
```

---

# 10. Section Projects

Cette section est fondamentale.

Chaque projet doit comporter :

```text
id
title
slug
shortDescription
description
coverImage
gallery
technologies
category
githubUrl
liveUrl
startDate
endDate
status
featured
isPublished
displayOrder
```

## Exemple de projets à mettre en avant

### AgriPulse

Plateforme communautaire agricole SaaS.

Technologies :

- Next.js
- Laravel
- PostgreSQL
- PostGIS
- AI
- Docker

Modules :

- communauté ;
- marketplace ;
- missions ;
- messagerie ;
- notifications ;
- IA ;
- modération ;
- cartographie.

### Autres projets

Prévoir la possibilité d'ajouter :

- systèmes de réservation ;
- applications e-commerce ;
- applications SaaS ;
- applications mobiles ;
- projets académiques ;
- expérimentations IA.

---

# 11. Page détail d'un projet

URL :

```text
/projects/[slug]
```

Afficher :

- titre ;
- image principale ;
- galerie ;
- description ;
- problème ;
- solution ;
- architecture ;
- fonctionnalités ;
- technologies ;
- défis techniques ;
- résultats ;
- GitHub ;
- démo ;
- captures d'écran ;
- vidéos éventuellement.

Prévoir un bouton :

```text
← Projet précédent
Projet suivant →
```

---

# 12. Expériences professionnelles

Chaque expérience :

```text
company
position
location
startDate
endDate
description
responsibilities
technologies
logo
isCurrent
isVisible
displayOrder
```

Afficher une timeline.

---

# 13. Formation

Chaque formation :

```text
institution
degree
field
startDate
endDate
description
location
logo
isVisible
```

Exemples :

- DUT Génie Logiciel ;
- Licence Technologique Génie Logiciel ;
- formations complémentaires.

---

# 14. Certifications

Chaque certification :

```text
name
issuer
issueDate
expirationDate
credentialId
credentialUrl
certificateImage
description
isVisible
```

Possibilité d'afficher :

```text
Certification
Organisme
Date
Credential
[Voir la certification]
```

---

# 15. Services

Créer une section présentant les services professionnels.

Exemples :

### Développement Web

Applications modernes avec Next.js, React et Laravel.

### API & Backend

Conception d'API REST robustes et sécurisées.

### SaaS

Conception d'architectures SaaS complètes.

### UI / UX Implementation

Transformation de designs Figma en interfaces web.

### AI Integration

Intégration d'assistants IA, automatisation et modération.

### DevOps

Docker, déploiement, VPS et CI/CD.

Chaque service :

```text
title
slug
description
icon
features
priceOptional
featured
isVisible
displayOrder
```

---

# 16. Blog technique

Le blog doit permettre de publier des articles techniques.

Un article :

```text
title
slug
excerpt
content
coverImage
category
tags
author
status
publishedAt
readingTime
views
likes
seoTitle
seoDescription
```

Statuts :

```text
DRAFT
PUBLISHED
ARCHIVED
```

Fonctionnalités :

- éditeur Markdown ou rich text ;
- aperçu ;
- brouillon ;
- publication ;
- programmation ;
- catégories ;
- tags ;
- recherche ;
- statistiques.

---

# 17. Témoignages

Créer un système de témoignages.

```text
name
position
company
avatar
content
rating
featured
isPublished
```

Possibilité d'afficher :

```text
"Très bon développeur..."
— Nom, Fonction
```

---

# 18. Contact

Formulaire :

```text
name
email
company
subject
message
```

Protection :

- validation ;
- rate limiting ;
- honeypot ;
- CAPTCHA si nécessaire ;
- protection anti-spam.

Après soumission :

```text
Visiteur
   |
   v
Contact API
   |
   +--> Database
   |
   +--> Notification Admin
   |
   +--> Email
```

---

# 19. Gestion des messages

Dashboard :

```text
Messages
├── Non lus
├── Lus
├── Archivés
└── Spam
```

Chaque message peut être :

- ouvert ;
- marqué lu ;
- archivé ;
- supprimé ;
- répondu.

---

# 20. Dashboard Admin

Le dashboard est le centre de contrôle du portfolio.

## Vue générale

Afficher :

```text
+----------------+----------------+----------------+
| Visiteurs      | Projets        | Articles       |
| 12,450         | 18             | 24             |
+----------------+----------------+----------------+

+----------------+----------------+----------------+
| Messages       | Vues projets   | CV téléchargés |
| 32             | 8,420          | 156            |
+----------------+----------------+----------------+
```

---

# 21. Analytics

Le dashboard doit permettre de visualiser :

## Visiteurs

- visiteurs totaux ;
- visiteurs uniques ;
- visiteurs aujourd'hui ;
- visiteurs cette semaine ;
- visiteurs ce mois.

## Pages

- pages les plus visitées ;
- projets les plus consultés ;
- articles les plus lus.

## Interactions

- clics sur GitHub ;
- clics sur LinkedIn ;
- clics sur CV ;
- clics sur contact ;
- clics sur projets.

## Graphiques

Utiliser Recharts.

Types :

- Line Chart ;
- Bar Chart ;
- Area Chart ;
- Pie/Donut Chart.

Exemple :

```text
Visiteurs

150 |                 █
125 |             █   █
100 |        █    █   █
 75 |    █   █    █   █
 50 | █  █   █    █   █
    +--------------------
      Lun Mar Mer Jeu Ven
```

Filtres :

```text
Aujourd'hui
7 jours
30 jours
90 jours
1 an
```

---

# 22. Tracking Analytics

Créer un système interne simple.

Événements :

```text
PAGE_VIEW
PROJECT_VIEW
ARTICLE_VIEW
GITHUB_CLICK
LIVE_DEMO_CLICK
CV_DOWNLOAD
CONTACT_SUBMIT
SOCIAL_CLICK
```

Table :

```text
analytics_events
```

Champs :

```text
id
eventType
path
entityId
sessionId
country
device
browser
referrer
createdAt
```

Éviter de stocker inutilement des données personnelles.

---

# 23. Dashboard — Gestion des projets

Interface CRUD complète :

```text
Projects

[+ Nouveau projet]

-------------------------------------------------
Projet       Status       Featured       Actions
-------------------------------------------------
AgriPulse    Published    Yes            Edit
ZChat        Published    No             Edit
Shop SaaS    Draft        Yes            Edit
-------------------------------------------------
```

Actions :

- créer ;
- modifier ;
- supprimer ;
- dupliquer ;
- publier ;
- dépublier ;
- mettre en vedette ;
- réordonner.

---

# 24. Dashboard — Gestion des compétences

CRUD :

```text
Skills

Frontend
  React       90%
  Next.js     90%
  TypeScript  85%

Backend
  Laravel     90%
  Node.js     75%
```

Possibilité de drag & drop pour réorganiser.

---

# 25. Dashboard — Gestion du profil

Une page :

```text
Profile

Photo
Nom
Titre
Bio
Email
Téléphone
Localisation
Disponibilité
CV
LinkedIn
GitHub
Twitter/X
```

Bouton :

```text
[Enregistrer les modifications]
```

---

# 26. Dashboard — Gestion des médias

Créer une médiathèque.

Fonctionnalités :

- upload ;
- suppression ;
- recherche ;
- filtre ;
- preview ;
- copier URL ;
- informations du fichier.

Informations :

```text
filename
url
mimeType
size
width
height
alt
createdAt
```

Prévoir optimisation des images.

---

# 27. Dashboard — Paramètres

## Général

```text
Site name
Site description
Logo
Favicon
Email
Timezone
Language
```

## SEO

```text
Default title
Default description
Keywords
OG image
Twitter image
```

## Réseaux sociaux

```text
GitHub
LinkedIn
X
Instagram
YouTube
Facebook
```

## Contact

```text
Contact email
Notification email
```

---

# 28. SEO

Le portfolio doit être optimisé pour les moteurs de recherche.

Implémenter :

- Metadata API Next.js ;
- title dynamique ;
- description dynamique ;
- Open Graph ;
- Twitter Cards ;
- sitemap.xml ;
- robots.txt ;
- canonical URLs ;
- données structurées JSON-LD ;
- SEO des projets ;
- SEO des articles.

Schema.org :

```text
Person
WebSite
Article
CreativeWork
BreadcrumbList
```

---

# 29. Performance

Objectif :

```text
Lighthouse
Performance > 90
Accessibility > 90
Best Practices > 90
SEO > 90
```

Techniques :

- Server Components ;
- ISR lorsque pertinent ;
- lazy loading ;
- optimisation images ;
- WebP/AVIF ;
- code splitting ;
- cache ;
- pagination ;
- compression ;
- limitation des JavaScript côté client.

---

# 30. Responsive Design

Le site doit être entièrement responsive.

Breakpoints :

```text
Mobile
Tablet
Desktop
Large Desktop
```

Priorité :

1. Mobile ;
2. Tablet ;
3. Desktop.

Le dashboard doit également être responsive.

---

# 31. Design System

Créer un design system cohérent.

## Typographie

Préférence :

```text
Montserrat
```

ou une police moderne équivalente.

## Couleurs

Palette recommandée :

```text
Primary: Royal Blue
Secondary: Classic Blue
Accent: couleur dynamique
Background: neutral
Text: dark neutral
```

Prévoir Dark Mode.

## Composants

Créer des composants réutilisables :

```text
Button
Input
Textarea
Select
Modal
Dialog
Dropdown
Card
Badge
Tabs
Table
Pagination
Toast
Sidebar
Navbar
Chart
Avatar
Tooltip
```

---

# 32. Navigation publique

Navbar :

```text
Logo

Accueil
À propos
Projets
Compétences
Expérience
Services
Blog
Contact

[CV]
```

Mobile :

```text
☰
```

---

# 33. Navigation Admin

Sidebar :

```text
Dashboard

CONTENU
├── Profil
├── Projets
├── Compétences
├── Expériences
├── Formation
├── Certifications
├── Services
├── Blog
└── Témoignages

COMMUNICATION
├── Messages
└── Médias

ANALYTICS
└── Statistiques

SYSTÈME
├── Paramètres
├── Utilisateurs
└── Audit Logs
```

---

# 34. Authentification Admin

Sécuriser `/admin`.

Fonctionnalités :

- login ;
- logout ;
- session ;
- protection middleware/proxy ;
- changement de mot de passe ;
- récupération de compte ;
- expiration de session ;
- éventuellement 2FA.

Rôles :

```text
SUPER_ADMIN
EDITOR
```

Permissions :

```text
VIEW_DASHBOARD
MANAGE_PROFILE
MANAGE_PROJECTS
MANAGE_BLOG
MANAGE_MEDIA
VIEW_ANALYTICS
MANAGE_SETTINGS
MANAGE_USERS
```

---

# 35. Audit Logs

Toutes les actions importantes doivent être enregistrées.

Exemples :

```text
USER_LOGIN
PROJECT_CREATED
PROJECT_UPDATED
PROJECT_DELETED
ARTICLE_PUBLISHED
PROFILE_UPDATED
SETTING_UPDATED
```

Table :

```text
audit_logs
```

Champs :

```text
id
userId
action
entity
entityId
metadata
ip
createdAt
```

---

# 36. Modèle de données

Architecture Prisma indicative :

```text
User
Profile
Project
ProjectTechnology
Technology
Skill
Experience
Education
Certification
Service
Article
Category
Tag
Testimonial
ContactMessage
Media
AnalyticsEvent
SocialLink
SiteSetting
AuditLog
```

Relations principales :

```text
Project
 ├── Technologies
 ├── Gallery
 └── Category

Article
 ├── Category
 ├── Tags
 └── Author

Profile
 ├── SocialLinks
 ├── Experiences
 ├── Educations
 └── Certifications
```

---

# 37. API

Créer des endpoints propres.

Exemple :

```text
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id

GET    /api/skills
POST   /api/skills
PATCH  /api/skills/:id
DELETE /api/skills/:id

GET    /api/messages
PATCH  /api/messages/:id
DELETE /api/messages/:id

GET    /api/analytics
POST   /api/analytics/events
```

Les endpoints admin doivent être protégés.

---

# 38. Validation

Utiliser Zod.

Exemple conceptuel :

```text
ProjectSchema

title       → required
slug        → required + unique
description → required
technologies → array
status      → enum
featured    → boolean
```

Toujours valider :

- données frontend ;
- données API ;
- paramètres URL ;
- fichiers uploadés.

---

# 39. Sécurité

Mettre en place :

- validation stricte ;
- protection CSRF selon architecture ;
- rate limiting ;
- headers de sécurité ;
- sanitation ;
- contrôle d'accès ;
- protection des uploads ;
- limitation taille fichiers ;
- validation MIME ;
- sessions sécurisées ;
- secrets dans `.env`.

Ne jamais exposer :

```text
DATABASE_URL
AUTH_SECRET
API_KEYS
PRIVATE_KEYS
```

---

# 40. Gestion des erreurs

Créer un système cohérent.

Frontend :

```text
Toast
Error State
Empty State
Loading State
Skeleton
```

Backend :

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
429 Too Many Requests
500 Internal Server Error
```

---

# 41. UX du Dashboard

Le dashboard doit être agréable à utiliser.

Prévoir :

- sidebar fixe ;
- breadcrumb ;
- recherche ;
- filtres ;
- pagination ;
- tableaux ;
- actions rapides ;
- confirmations de suppression ;
- notifications toast ;
- états de chargement ;
- skeletons ;
- empty states.

---

# 42. Recherche globale

Ajouter une recherche globale dans le dashboard.

Recherche :

```text
Projects
Articles
Messages
Skills
Experiences
```

Exemple :

```text
⌘ K

Rechercher...
```

---

# 43. Notifications

Le dashboard doit afficher les événements importants.

Exemples :

```text
Nouveau message reçu
Projet publié
Article publié
Erreur système
```

---

# 44. CV

Ajouter un bouton :

```text
Télécharger mon CV
```

Le CV peut être :

- PDF ;
- version française ;
- version anglaise.

Le téléchargement doit être comptabilisé dans Analytics.

---

# 45. Internationalisation

Préparer l'architecture pour :

```text
FR
EN
```

Même si la V1 est uniquement en français.

Les contenus pourront être traduits ultérieurement.

---

# 46. Accessibilité

Respecter :

- HTML sémantique ;
- navigation clavier ;
- labels ;
- contrastes ;
- alt text ;
- focus states ;
- ARIA lorsque nécessaire ;
- réduction des animations si `prefers-reduced-motion`.

---

# 47. Architecture des dossiers

Structure recommandée :

```text
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── experience/
│   │   ├── services/
│   │   ├── blog/
│   │   └── contact/
│   │
│   ├── admin/
│   │   ├── login/
│   │   └── (dashboard)/
│   │       ├── dashboard/
│   │       ├── profile/
│   │       ├── projects/
│   │       ├── skills/
│   │       ├── experience/
│   │       ├── education/
│   │       ├── certifications/
│   │       ├── services/
│   │       ├── blog/
│   │       ├── testimonials/
│   │       ├── messages/
│   │       ├── media/
│   │       ├── analytics/
│   │       └── settings/
│   │
│   └── api/
│       ├── projects/
│       ├── skills/
│       ├── messages/
│       ├── analytics/
│       └── upload/
│
├── components/
│   ├── ui/
│   ├── public/
│   ├── admin/
│   ├── charts/
│   └── forms/
│
├── lib/
│   ├── auth/
│   ├── db/
│   ├── analytics/
│   ├── storage/
│   ├── email/
│   ├── validation/
│   └── utils/
│
├── hooks/
├── types/
└── config/
```

---

# 48. Environnement

Créer :

```text
.env.local
.env.example
```

Variables possibles :

```text
DATABASE_URL=
AUTH_SECRET=

STORAGE_PROVIDER=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_SERVER=
EMAIL_FROM=

NEXT_PUBLIC_SITE_URL=
```

---

# 49. Seed Database

Créer un seed Prisma avec les données initiales :

- profil ;
- compétences ;
- projets ;
- expériences ;
- formations ;
- certifications ;
- services ;
- réseaux sociaux.

Cela permettra d'obtenir rapidement un portfolio fonctionnel après installation.

---

# 50. Version MVP

La première version doit contenir :

### Public

- Home ;
- About ;
- Skills ;
- Projects ;
- Project Details ;
- Experience ;
- Education ;
- Certifications ;
- Services ;
- Contact ;
- CV ;
- Responsive ;
- SEO ;
- Dark mode.

### Admin

- Login ;
- Dashboard ;
- Profil ;
- CRUD projets ;
- CRUD compétences ;
- CRUD expériences ;
- CRUD formations ;
- CRUD certifications ;
- CRUD services ;
- Messages ;
- Médias ;
- Settings.

### Analytics

- visiteurs ;
- pages vues ;
- projets vus ;
- téléchargements CV ;
- clics sociaux ;
- statistiques de contact.

---

# 51. V2

Ajouter :

- Blog ;
- témoignages ;
- recherche globale ;
- audit logs ;
- rôles utilisateurs ;
- analytics avancées ;
- programmation d'articles ;
- multilingue ;
- notifications ;
- système de newsletter.

---

# 52. V3

Ajouter éventuellement :

- AI Assistant ;
- chatbot portfolio ;
- recommandations de projets ;
- génération automatique de résumé ;
- génération d'articles ;
- analyse automatique des statistiques ;
- espace recruteur ;
- formulaire de demande de devis ;
- CMS complet.

---

# 53. Tests

Mettre en place :

## Unit Tests

Tester :

- validations ;
- services ;
- fonctions utilitaires ;
- calculs analytics.

## Integration Tests

Tester :

- API ;
- authentification ;
- base de données ;
- upload.

## E2E

Tester :

```text
Visiteur → projet → contact
Admin → login → création projet → publication
Admin → analytics
```

Outil recommandé :

```text
Playwright
```

---

# 54. Git

Organisation :

```text
main
develop
feature/*
fix/*
```

Convention commits :

```text
feat:
fix:
refactor:
docs:
style:
test:
chore:
```

Exemples :

```text
feat: add project management dashboard
feat: add analytics tracking
fix: protect admin routes
refactor: improve project API
```

---

# 55. Docker

Prévoir une configuration Docker pour l'environnement de développement.

Services possibles :

```text
app
postgres
```

Architecture :

```text
Docker Compose
       |
       +---- Next.js
       |
       +---- PostgreSQL
```

Le système doit fonctionner aussi sans Docker pour simplifier le développement local.

---

# 56. CI/CD

Préparer un pipeline :

```text
Git Push
   |
   v
Lint
   |
   v
Type Check
   |
   v
Tests
   |
   v
Build
   |
   v
Deploy
```

---

# 57. Critères d'acceptation

Le projet est considéré comme terminé lorsque :

- [ ] Le portfolio public fonctionne.
- [ ] Le dashboard admin fonctionne.
- [ ] L'authentification est sécurisée.
- [ ] Tous les contenus principaux sont administrables.
- [ ] Les projets sont gérables sans modifier le code.
- [ ] Les images peuvent être gérées depuis le dashboard.
- [ ] Les messages de contact sont enregistrés.
- [ ] Les statistiques fonctionnent.
- [ ] Le CV est téléchargeable.
- [ ] Le SEO est correctement configuré.
- [ ] Le site est responsive.
- [ ] Le Dark Mode fonctionne.
- [ ] Les principales routes sont protégées.
- [ ] Les erreurs sont correctement gérées.
- [ ] Le projet passe le lint.
- [ ] Le projet passe le type-check.
- [ ] Le build de production fonctionne.
- [ ] Le projet peut être déployé.

---

# 58. Priorité de développement

## Phase 1 — Foundation

- Initialisation Next.js ;
- TypeScript ;
- Tailwind ;
- shadcn/ui ;
- Prisma ;
- PostgreSQL ;
- Auth ;
- architecture.

## Phase 2 — Public Portfolio

- Home ;
- About ;
- Skills ;
- Projects ;
- Experience ;
- Education ;
- Services ;
- Contact.

## Phase 3 — Admin

- Login ;
- Dashboard ;
- CRUD ;
- médias ;
- settings.

## Phase 4 — Analytics

- tracking ;
- dashboard ;
- graphiques ;
- événements.

## Phase 5 — SEO & Performance

- metadata ;
- sitemap ;
- JSON-LD ;
- optimisation images ;
- caching ;
- Lighthouse.

## Phase 6 — Production

- tests ;
- Docker ;
- CI/CD ;
- déploiement ;
- monitoring.

---

# 59. Principe UX majeur

Le portfolio doit raconter une histoire.

Ordre recommandé :

```text
QUI SUIS-JE ?
      ↓
QUE SAIS-JE FAIRE ?
      ↓
QU'AI-JE CONSTRUIT ?
      ↓
COMMENT JE TRAVAILLE ?
      ↓
QUELLE VALEUR PUIS-JE APPORTER ?
      ↓
COMMENT ME CONTACTER ?
```

Le visiteur doit comprendre le profil en moins de 30 secondes.

---

# 60. Résultat attendu

Le résultat final doit être un **portfolio professionnel de niveau production**, pouvant servir simultanément de :

- portfolio développeur ;
- CV numérique ;
- vitrine professionnelle ;
- catalogue de projets ;
- blog technique ;
- outil de génération de contacts ;
- démonstration de compétences Full-Stack ;
- démonstration d'architecture Next.js ;
- démonstration de conception SaaS ;
- démonstration d'UX/UI ;
- démonstration d'API et de base de données ;
- démonstration d'analytics ;
- future base pour un personal brand.

---

# 61. Priorité stratégique

Le portfolio doit surtout démontrer que son propriétaire sait **construire et maintenir une application complète**, et pas uniquement écrire du code.

Il doit donc mettre en évidence :

```text
Frontend
    ↓
Next.js / React / TypeScript
    ↓
Backend
    ↓
API / Server Actions
    ↓
Database
    ↓
PostgreSQL / Prisma
    ↓
Authentication
    ↓
Security
    ↓
Storage
    ↓
Analytics
    ↓
Testing
    ↓
Docker / Deployment
```

L'administration complète est volontairement une partie majeure du projet : elle transforme le portfolio en **projet Full-Stack démonstratif à part entière**.

---

# 62. Definition of Done

Une fonctionnalité est terminée uniquement lorsqu'elle possède :

```text
UI
+
API / Server Action
+
Validation
+
Database
+
Loading State
+
Error State
+
Empty State
+
Security
+
Responsive Design
+
Accessibility
+
Tests si nécessaire
```

Le projet doit privilégier une architecture propre, maintenable et évolutive plutôt qu'une accumulation de fonctionnalités.

---

# 63. Commande de démarrage indicative

```bash
npx create-next-app@latest portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir
```

Puis installer progressivement :

```bash
npm install prisma @prisma/client zod
npm install next-auth
npm install lucide-react
npm install recharts
npm install framer-motion
```

Selon les choix finaux, compléter avec les packages d'upload, email, tests et UI.

---

# 64. Résumé final

Le projet est un **Portfolio CMS Full-Stack construit entièrement avec Next.js**.

Il combine :

```text
Portfolio public
       +
Dashboard Admin
       +
CMS
       +
Analytics
       +
Contact Management
       +
Media Management
       +
SEO
       +
Authentication
       +
PostgreSQL
       +
Prisma
       +
Docker
       +
CI/CD
```

L'objectif n'est pas seulement de présenter les compétences du développeur.

**Le portfolio lui-même doit devenir l'une des principales preuves de ces compétences.**
