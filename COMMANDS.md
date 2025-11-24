# Commandes utiles - BURBAN E-commerce

## Installation et démarrage

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Accéder à l'application
# Frontend: http://localhost:3000
# Admin: http://localhost:3000/admin
```

## Build et production

```bash
# Build pour production
npm run build

# Démarrer le serveur production
npm start

# Linting
npm run lint
```

## Déploiement

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer sur Vercel
vercel deploy

# Déployer en production
vercel deploy --prod
```

## Firebase

```bash
# Installer Firebase CLI
npm i -g firebase-tools

# Se connecter à Firebase
firebase login

# Déployer les règles Firestore
firebase deploy --only firestore:rules

# Voir les logs
firebase functions:log
```

## Stripe

```bash
# Installer Stripe CLI
# macOS
brew install stripe/stripe-cli/stripe

# Écouter les webhooks localement
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Déclencher un événement de test
stripe trigger payment_intent.succeeded
```

## Développement

```bash
# Nettoyer le cache Next.js
rm -rf .next

# Reconstruire
npm run build

# Vérifier les types TypeScript
npx tsc --noEmit

# Formater le code
npx prettier --write .

# Linter
npm run lint -- --fix
```

## Base de données

```bash
# Exporter les données Firestore
firebase firestore:export ./backup

# Importer les données
firebase firestore:import ./backup

# Supprimer une collection
firebase firestore:delete --recursive collection_name
```

## Debugging

```bash
# Activer les logs détaillés
DEBUG=* npm run dev

# Vérifier les variables d'environnement
node -e "console.log(process.env)"

# Tester la connexion Firebase
node -e "require('./lib/firebase')"
```

## Performance

```bash
# Analyser la taille du bundle
npm run build -- --analyze

# Vérifier les Core Web Vitals
npx lighthouse http://localhost:3000

# Profiler les performances
node --prof app.js
```

## Sécurité

```bash
# Vérifier les vulnérabilités
npm audit

# Corriger les vulnérabilités
npm audit fix

# Vérifier les secrets
npm install -g detect-secrets
detect-secrets scan
```

## Maintenance

```bash
# Mettre à jour les dépendances
npm update

# Vérifier les dépendances obsolètes
npm outdated

# Nettoyer les dépendances inutilisées
npm prune

# Vérifier l'espace disque
du -sh node_modules
```

## Utilitaires

```bash
# Générer un UUID
node -e "console.log(require('crypto').randomUUID())"

# Encoder en base64
node -e "console.log(Buffer.from('text').toString('base64'))"

# Décoder base64
node -e "console.log(Buffer.from('dGV4dA==', 'base64').toString())"

# Hasher avec SHA256
node -e "console.log(require('crypto').createHash('sha256').update('text').digest('hex'))"
```

## Git

```bash
# Initialiser le repo
git init

# Ajouter les fichiers
git add .

# Commit initial
git commit -m "Initial commit: BURBAN e-commerce"

# Ajouter remote
git remote add origin https://github.com/username/burban.git

# Pousser
git push -u origin main
```

## Docker (optionnel)

```bash
# Créer une image Docker
docker build -t burban .

# Lancer le conteneur
docker run -p 3000:3000 burban

# Voir les logs
docker logs container_id
```

## Monitoring

```bash
# Voir les logs Vercel
vercel logs

# Voir les logs Firebase
firebase functions:log

# Voir les logs Stripe
stripe logs list
```

## Troubleshooting

```bash
# Vérifier la connexion réseau
curl -I https://api.stripe.com

# Vérifier les ports utilisés
lsof -i :3000

# Tuer un processus
kill -9 process_id

# Vérifier les variables d'environnement
env | grep NEXT_PUBLIC
```

## Raccourcis utiles

```bash
# Alias pour démarrage rapide
alias burban-dev="cd ~/Downloads/Burban\ V4 && npm run dev"

# Alias pour build
alias burban-build="cd ~/Downloads/Burban\ V4 && npm run build"

# Alias pour déploiement
alias burban-deploy="cd ~/Downloads/Burban\ V4 && vercel deploy --prod"
```

## Ressources

- [Next.js CLI](https://nextjs.org/docs/app/api-reference/next-cli)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Vercel CLI](https://vercel.com/docs/cli)
- [npm Commands](https://docs.npmjs.com/cli/v8/commands)
