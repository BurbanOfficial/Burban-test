# BURBAN - E-commerce Streetwear

E-commerce minimaliste et moderne pour marque streetwear avec CMS auto-hébergé.

## Stack Technique

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Vercel Functions (serverless)
- **Base de données**: Firebase (Auth + Firestore)
- **Paiements**: Stripe Checkout
- **CMS Admin**: React auto-hébergé

## Installation

```bash
npm install
```

## Configuration

1. Créer un projet Firebase et copier les credentials dans `.env.local`
2. Configurer Stripe et ajouter les clés API
3. Déployer sur Vercel

```bash
npm run dev
```

## Structure du Projet

```
├── app/                    # Pages Next.js
│   ├── page.tsx           # Accueil
│   ├── product/[slug]/    # Page produit dynamique
│   ├── cart/              # Panier
│   ├── wishlist/          # Favoris
│   └── account/           # Compte utilisateur
├── components/            # Composants réutilisables
├── admin/                 # CMS Admin
│   └── components/        # Gestionnaires (produits, catégories, etc.)
├── pages/api/             # Routes API
│   ├── search.ts          # Recherche full-text
│   ├── checkout.ts        # Création session Stripe
│   ├── webhooks/stripe.ts # Webhook Stripe
│   └── sitemap.xml.ts     # Sitemap dynamique
├── lib/
│   ├── firebase.ts        # Config Firebase
│   ├── store.ts           # Zustand stores (cart, wishlist)
│   └── types.ts           # Types TypeScript
└── styles/
    └── globals.css        # Styles globaux
```

## Fonctionnalités

### Frontend
- ✅ Navigation responsive avec sous-menus
- ✅ Recherche full-text avec autocomplete
- ✅ Galerie produit avec sélection couleur/taille
- ✅ Panier persistant (Zustand)
- ✅ Wishlist synchronisée Firebase
- ✅ Checkout Stripe sécurisé
- ✅ Espace client Firebase Auth
- ✅ Bannière carousel avec progress bar

### CMS Admin
- ✅ CRUD produits (titre, description, SKU, prix, images, variantes)
- ✅ CRUD catégories et sous-catégories
- ✅ CRUD bannières (texte/image, durée, ordre)
- ✅ CRUD pages (About, Contact, Guides des tailles)
- ✅ Gestion SEO (title, meta description, OG image)

### SEO & Performance
- ✅ JSON-LD Product schema
- ✅ Sitemap XML dynamique
- ✅ Robots.txt
- ✅ Images optimisées (WebP/AVIF)
- ✅ Lazy-loading
- ✅ Meta tags dynamiques

### Accessibilité
- ✅ Navigation au clavier
- ✅ Labels ARIA
- ✅ Contraste WCAG AA
- ✅ Focus visible

### Internationalisation
- ✅ Support FR/EN (à implémenter avec next-i18n-router)

## Déploiement

```bash
npm run build
npm start
```

Déployer sur Vercel :
```bash
vercel deploy
```

## Variables d'Environnement

Voir `.env.local` pour la liste complète.

## Webhook Stripe

Configurer l'endpoint webhook dans Stripe Dashboard :
```
https://votre-domaine.com/api/webhooks/stripe
```

## Licence

Propriétaire
