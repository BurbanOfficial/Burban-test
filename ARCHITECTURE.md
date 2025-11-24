# Architecture BURBAN E-commerce

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 14)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Pages: Home, Products, Product Detail, Cart, Account │   │
│  │ Components: Header, Footer, ProductCard, Gallery     │   │
│  │ State: Zustand (Cart, Wishlist)                      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend (Vercel Functions)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ /api/search - Recherche full-text                    │   │
│  │ /api/checkout - Création session Stripe             │   │
│  │ /api/webhooks/stripe - Traitement paiements         │   │
│  │ /api/sitemap.xml - Sitemap dynamique                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Services Externes                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Firebase: Auth + Firestore (données)                │   │
│  │ Stripe: Paiements sécurisés                         │   │
│  │ SendGrid: Emails (optionnel)                        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Structure des données Firestore

### Collections

#### `products`
```typescript
{
  id: string;
  slug: string;
  title: string;
  description: string;
  sku: string;
  price: number;
  stripePrice: string;
  images: string[];
  colors: Color[];
  sizes: string[];
  category: string;
  subcategory?: string;
  tags: string[];
  featured: boolean;
  stock: number;
  seo: { title, description, ogImage };
  createdAt: number;
  updatedAt: number;
}
```

#### `categories`
```typescript
{
  id: string;
  slug: string;
  name: string;
  description?: string;
  parent?: string;
}
```

#### `banners`
```typescript
{
  id: string;
  type: 'text' | 'image';
  content: string;
  buttonText?: string;
  buttonLink?: string;
  duration: number;
  active: boolean;
  order: number;
}
```

#### `users`
```typescript
{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  birthDate?: number;
  wishlist: string[];
  createdAt: number;
}
```

#### `orders`
```typescript
{
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'shipped' | 'delivered' | 'cancelled';
  stripeSessionId: string;
  shippingAddress: Address;
  createdAt: number;
  updatedAt: number;
}
```

#### `pages`
```typescript
{
  id: string;
  slug: string;
  title: string;
  content: string;
  type: 'about' | 'contact' | 'size-guide' | 'faq';
}
```

#### `sizeGuides`
```typescript
{
  id: string;
  slug: string;
  title: string;
  content: string;
  image?: string;
  linkedProducts: string[];
}
```

## Flux de paiement

```
1. Utilisateur ajoute produits au panier (Zustand store)
2. Clique sur "Passer la commande"
3. Frontend appelle /api/checkout avec les articles
4. Backend crée une session Stripe Checkout
5. Utilisateur redirigé vers Stripe Checkout
6. Après paiement, Stripe envoie webhook à /api/webhooks/stripe
7. Backend crée la commande dans Firestore
8. Email de confirmation envoyé (optionnel)
9. Utilisateur redirigé vers /order-success
```

## Flux d'authentification

```
1. Utilisateur se connecte via /login ou /signup
2. Firebase Auth gère email/password ou Google OAuth
3. Token JWT stocké dans les cookies (géré par Firebase)
4. Pages protégées vérifient onAuthStateChanged()
5. Données utilisateur stockées dans Firestore
```

## Flux CMS Admin

```
1. Admin se connecte via /admin/login
2. Vérifie le custom claim "admin" dans Firebase
3. Accède au dashboard /admin
4. CRUD sur collections Firestore
5. Changements reflétés en temps réel sur le site
```

## Performance

### Images
- Optimisation automatique via Next.js Image
- Formats WebP/AVIF avec fallback
- Lazy-loading par défaut
- Responsive sizes

### Caching
- Static Generation (SSG) pour pages produits
- Revalidation on-demand via ISR
- Client-side caching avec Zustand

### SEO
- JSON-LD Product schema
- Sitemap XML dynamique
- Meta tags dynamiques
- Open Graph images

## Sécurité

### Frontend
- Validation des données côté client
- Pas de données sensibles en localStorage
- HTTPS obligatoire

### Backend
- Validation des données côté serveur
- Stripe PCI compliant (pas de données sensibles)
- Webhook signature verification
- Firestore security rules

### Données
- Firestore rules par rôle
- Utilisateurs ne peuvent voir que leurs données
- Admin uniquement pour modifications

## Accessibilité (WCAG AA)

- Navigation au clavier complète
- Labels ARIA sur tous les éléments interactifs
- Contraste minimum 4.5:1
- Focus visible sur tous les éléments
- Sémantique HTML correcte
- Lecteur d'écran compatible

## Internationalisation

Structure pour FR/EN :
```
/fr/products
/en/products
/fr/product/[slug]
/en/product/[slug]
```

À implémenter avec `next-i18n-router`

## Déploiement

### Vercel
- Déploiement automatique depuis Git
- Serverless functions pour API
- Edge caching
- Analytics intégrés

### Firebase
- Firestore en production
- Security rules activées
- Backups automatiques

### Stripe
- Webhook configuré
- Clés API sécurisées
- Mode test/production

## Monitoring

- Vercel Analytics
- Firebase Console
- Stripe Dashboard
- Google Search Console
- Lighthouse CI

## Coûts estimés

- Vercel: $20-100/mois
- Firebase: $0-50/mois (pay-as-you-go)
- Stripe: 2.9% + 0.30€ par transaction
- SendGrid: $0-100/mois (optionnel)
- Domaine: $10-15/an
