# Quick Start - BURBAN E-commerce

## Installation rapide (5 minutes)

### 1. Cloner et installer
```bash
cd Burban\ V4
npm install
```

### 2. Configurer les variables d'environnement
```bash
cp .env.local.example .env.local
# Éditer .env.local avec vos credentials
```

### 3. Démarrer le serveur de développement
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Accès aux différentes sections

### Frontend
- **Accueil**: http://localhost:3000
- **Produits**: http://localhost:3000/products
- **Panier**: http://localhost:3000/cart
- **Compte**: http://localhost:3000/account
- **Connexion**: http://localhost:3000/login
- **Inscription**: http://localhost:3000/signup

### Admin
- **Dashboard**: http://localhost:3000/admin
- **Connexion Admin**: http://localhost:3000/admin/login

## Commandes utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer production
npm start

# Linting
npm run lint

# Déployer sur Vercel
vercel deploy
```

## Configuration Firebase (5 minutes)

1. Aller sur [Firebase Console](https://console.firebase.google.com)
2. Créer un nouveau projet
3. Activer Firestore Database
4. Activer Authentication (Email/Password + Google)
5. Copier les credentials dans `.env.local`

### Créer les collections
```javascript
// Dans Firebase Console, créer ces collections:
- products
- categories
- banners
- pages
- orders
- users
- sizeGuides
```

## Configuration Stripe (5 minutes)

1. Aller sur [Stripe Dashboard](https://dashboard.stripe.com)
2. Créer une clé API
3. Copier dans `.env.local`:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
4. Configurer le webhook:
   - Endpoint: `http://localhost:3000/api/webhooks/stripe`
   - Événement: `checkout.session.completed`

## Ajouter des produits (via CMS)

1. Se connecter à `/admin/login`
2. Aller dans l'onglet "Products"
3. Cliquer "Ajouter un produit"
4. Remplir le formulaire
5. Cliquer "Créer"

## Tester le paiement

1. Ajouter un produit au panier
2. Aller à `/cart`
3. Cliquer "Passer la commande"
4. Utiliser les cartes de test Stripe:
   - **Succès**: 4242 4242 4242 4242
   - **Décliné**: 4000 0000 0000 0002
   - Expiration: 12/25
   - CVC: 123

## Dépannage

### Erreur Firebase
```
Error: Firebase config not found
```
→ Vérifier `.env.local` avec les bonnes credentials

### Erreur Stripe
```
Error: Stripe key not found
```
→ Vérifier `STRIPE_SECRET_KEY` dans `.env.local`

### Port 3000 déjà utilisé
```bash
# Utiliser un autre port
npm run dev -- -p 3001
```

### Erreur de build
```bash
# Nettoyer et reconstruire
rm -rf .next
npm run build
```

## Structure du projet

```
Burban V4/
├── app/                    # Pages Next.js
├── components/             # Composants réutilisables
├── admin/                  # CMS Admin
├── pages/api/              # Routes API
├── lib/                    # Utilitaires
├── styles/                 # CSS global
├── public/                 # Fichiers statiques
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Prochaines étapes

1. ✅ Installation et configuration
2. → Ajouter des produits via CMS
3. → Tester le panier et paiement
4. → Personnaliser le design
5. → Déployer sur Vercel

## Ressources

- [Documentation complète](./README.md)
- [Architecture](./ARCHITECTURE.md)
- [Setup détaillé](./SETUP.md)
- [Prochaines étapes](./NEXT_STEPS.md)

## Support

Pour toute question:
- Consulter la documentation
- Vérifier les logs dans la console
- Vérifier Firebase Console
- Vérifier Stripe Dashboard

Bon développement ! 🚀
