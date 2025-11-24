# Guide de Configuration - BURBAN E-commerce

## 1. Configuration Firebase

### Créer un projet Firebase
1. Aller sur [Firebase Console](https://console.firebase.google.com)
2. Créer un nouveau projet
3. Activer Firestore Database
4. Activer Firebase Authentication (Email/Password + Google OAuth)

### Récupérer les credentials
1. Aller dans Paramètres du projet → Comptes de service
2. Générer une nouvelle clé privée
3. Copier les valeurs dans `.env.local` :
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

### Créer les collections Firestore
```
collections:
  - products
  - categories
  - banners
  - pages
  - orders
  - users
  - sizeGuides
```

## 2. Configuration Stripe

### Créer un compte Stripe
1. Aller sur [Stripe Dashboard](https://dashboard.stripe.com)
2. Créer une clé API
3. Copier dans `.env.local` :
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`

### Configurer le Webhook
1. Aller dans Webhooks
2. Ajouter un endpoint : `https://votre-domaine.com/api/webhooks/stripe`
3. Sélectionner l'événement : `checkout.session.completed`
4. Copier le secret dans `STRIPE_WEBHOOK_SECRET`

## 3. Déploiement sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel deploy

# Ajouter les variables d'environnement dans Vercel Dashboard
```

## 4. Configuration du CMS Admin

### Accès Admin
- URL : `/admin`
- Auth : Firebase (email/password)
- Rôle : À implémenter avec custom claims Firebase

### Ajouter un utilisateur admin
```javascript
// Via Firebase Console ou fonction Cloud Function
admin.auth().setCustomUserClaims(uid, { admin: true })
```

## 5. Intégration SendGrid (Email)

```bash
npm install @sendgrid/mail
```

Ajouter à `.env.local` :
```
SENDGRID_API_KEY=<votre_clé>
SENDGRID_FROM_EMAIL=noreply@burban.com
```

## 6. Optimisation Images

Les images sont optimisées automatiquement via Next.js Image :
- WebP/AVIF avec fallback
- Lazy-loading
- Responsive sizes

## 7. SEO

### Vérifier le sitemap
```
https://votre-domaine.com/api/sitemap.xml
```

### Soumettre à Google Search Console
1. Aller sur [Google Search Console](https://search.google.com/search-console)
2. Ajouter la propriété
3. Soumettre le sitemap

## 8. Accessibilité

Vérifier avec :
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- Lecteur d'écran (NVDA, JAWS)

## 9. Performance

Monitorer avec :
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

## 10. Sécurité

- ✅ HTTPS obligatoire
- ✅ CSP headers
- ✅ CORS configuré
- ✅ Validation des données côté serveur
- ✅ Pas de données sensibles en frontend

## Commandes Utiles

```bash
# Développement
npm run dev

# Build
npm run build

# Production
npm start

# Linting
npm run lint
```

## Troubleshooting

### Erreur Firebase
- Vérifier les credentials dans `.env.local`
- Vérifier les règles Firestore

### Erreur Stripe
- Vérifier les clés API
- Vérifier le webhook secret

### Images non chargées
- Vérifier les URLs dans Firestore
- Vérifier les permissions CORS

## Support

Pour toute question, consulter :
- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Stripe Docs](https://stripe.com/docs)
