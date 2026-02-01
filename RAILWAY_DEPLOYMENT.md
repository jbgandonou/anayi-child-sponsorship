# 🚀 Guide de Déploiement Backend sur Railway

## 📋 Étape 1: Créer un compte Railway

1. Va sur [railway.app](https://railway.app)
2. Clique **Sign up**
3. Authentifie-toi avec GitHub (recommandé)

---

## 🗄️ Étape 2: Créer une Base de Données PostgreSQL

1. Sur le dashboard Railway, clique **+ New Project**
2. Clique **Provision PostgreSQL**
3. Une base de données va être créée automatiquement
4. Note la **DATABASE_URL** (tu la verras dans les variables d'environnement)

---

## 📦 Étape 3: Déployer le Backend NestJS

### Option A: Via GitHub (Recommandé - Auto-deploy)

1. **Push ton code sur GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tonusername/anayi-backend.git
   git branch -M main
   git push -u origin main
   ```

2. **Connecter le repo à Railway**
   - Va dans **+ New Service** → **GitHub Repo**
   - Sélectionne ton repo qui contient la structure complète (frontend + backend)
   - Railway va détecter le Dockerfile dans le dossier backend

3. **Configurer le chemin du Dockerfile (IMPORTANT)**
   - Va dans **Settings** → **Build**
   - Change le **Dockerfile path** en: `backend/Dockerfile`
   - Change le **Build context** en: `backend/`

4. **Configurer les variables d'environnement**
   - Va dans **Settings** → **Variables**
   - Railway crée automatiquement **DATABASE_URL** (ne pas modifier)
   - Ajoute les variables suivantes:
     ```
     NODE_ENV=production
     JWT_SECRET=genere_une_clé_aléatoire_complexe_minimum_32_caracteres
     FRONTEND_URL=https://ton-frontend-vercel.vercel.app
     PORT=3000
     ```

5. **Vérifier les logs de déploiement**
   - Va dans l'onglet **Deploy Logs**
   - Assure-toi qu'il n'y a pas d'erreur Docker
   - Vérifie que la migration de la base de données est réussie

6. **Déployer**
   - Railway va automatiquement construire et déployer
   - Attends ~2-3 minutes
   - Tu verras l'URL de ton backend dans **Settings** → **Domains**

### Option B: Déploiement Manuel (CLI Railway)

1. **Installer la CLI Railway**

   ```bash
   npm install -g @railway/cli
   ```

2. **Authentifier**

   ```bash
   railway login
   ```

3. **Initialiser le projet**

   ```bash
   cd backend
   railway init
   ```

4. **Créer les variables d'environnement**

   ```bash
   railway variables set NODE_ENV production
   railway variables set JWT_SECRET "genere_une_clé_secrète"
   railway variables set FRONTEND_URL "https://ton-frontend-vercel.vercel.app"
   ```

5. **Déployer**
   ```bash
   railway up
   ```

---

## 🔐 Étape 4: Vérifier la Base de Données

Railway crée automatiquement ces variables:

- `DATABASE_URL` → Lien complet pour TypeORM
- `PGHOST` → Hostname
- `PGPORT` → Port (5432)
- `PGUSER` → Utilisateur
- `PGPASSWORD` → Mot de passe
- `PGDATABASE` → Nom de la base

**Ton backend utilise `DATABASE_URL` automatiquement?**

Vérifie dans [backend/src/config/](../backend/src/config/) que TypeORM utilise:

```typescript
ormconfig.host: process.env.DATABASE_URL || 'localhost'
```

---

## ✅ Étape 5: Tester le Déploiement

Une fois déployé, Railway te donne une URL (ex: `https://anayi-backend-production.railway.app`)

```bash
# Tester l'API
curl https://ton-backend-railway.app/children

# Réponse attendue: []
```

Si erreur **"Cannot connect to database"**, c'est que `DATABASE_URL` n'est pas bien configurée.

---

## 🔧 Configuration TypeORM pour Production

Si tu utilises TypeORM, assure-toi que `database.module.ts` ou `app.module.ts` contient:

```typescript
TypeOrmModule.forRoot({
  type: "postgres",
  url: process.env.DATABASE_URL, // Railway fourni automatiquement
  entities: ["dist/**/*.entity.js"],
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV === "development",
});
```

---

## 🎯 Configurer CORS sur Vercel

**Étape finale importante:**

- Va sur **Vercel Dashboard** → Ton projet frontend
- **Settings** → **Environment Variables**
- Ajoute: `VITE_API_URL` = `https://ton-backend-railway.app`
- **Redéploie** le frontend: `vercel --prod`

---

## 🐛 Dépannage

| Problème                          | Solution                                                    |
| --------------------------------- | ----------------------------------------------------------- |
| **"Database connection refused"** | Attends 30s, Railway initialise la BD                       |
| **"Can't find module X"**         | Exécute `npm install` avant de déployer                     |
| **Port 3000 déjà utilisé**        | Railway gère le port automatiquement via `process.env.PORT` |
| **CORS error**                    | Vérifie que `FRONTEND_URL` est configurée                   |
| **Base de données vide**          | Utilise `synchronize: true` en dev, `false` en prod         |

---

## 📱 Dashboard Railway

Une fois déployé, tu peux:

- 📊 Voir les logs: **Deployments** → **View Logs**
- 🔄 Redéployer: Click **Deploy**
- 📈 Monitorer: Onglet **Monitoring**
- 🗄️ Gérer la BD: Onglet **PostgreSQL** → **Connect**

---

## ✨ Résumé: Frontend + Backend

- ✅ Frontend sur Vercel (auto-déploie à chaque commit)
- ✅ Backend sur Railway (auto-déploie à chaque commit)
- ✅ PostgreSQL sur Railway (gratuit)
- ✅ Variables d'environnement configurées
- ✅ CORS configuré pour la communication
