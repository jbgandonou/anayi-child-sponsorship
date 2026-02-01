# 🚀 Guide de Déploiement sur Vercel

## 📋 Configuration Frontend (Vercel)

### Étape 1: Installer la CLI Vercel

```bash
npm install -g vercel
```

### Étape 2: Authentifier avec Vercel

```bash
vercel login
```

Cela ouvrira une page pour te connecter à ton compte Vercel (crée-le si nécessaire sur [vercel.com](https://vercel.com))

### Étape 3: Configurer les Variables d'Environnement

**Sur le dashboard Vercel:**

1. Va à ton projet → **Settings** → **Environment Variables**
2. Ajoute cette variable:
   - **Name**: `VITE_API_URL`
   - **Value**: L'URL de ton backend (ex: `https://your-backend.railway.app`)

### Étape 4: Déployer le Frontend

```bash
cd frontend
vercel
```

**Réponses suggérées:**

- `Set up and deploy "..."`? → **y**
- Scope? → Choisir ton account Vercel
- Link to existing project? → **n** (première fois)
- Project name? → `anayi-child-sponsorship-frontend`
- Framework? → **Vite** (ou sélectionner automatiquement)

---

## 🔧 Configuration Backend (Autres Options)

Choisis une plateforme parmi:

### Option A: Railway (Recommandé - Gratuit et Simple)

1. **Créer un compte** sur [railway.app](https://railway.app)
2. **Nouveau projet** → Ajouter une base de données **PostgreSQL**
3. **Connecter ton repo GitHub** ou déployer manuellement
4. **Variables d'environnement:**
   ```
   DATABASE_URL=postgresql://user:password@host:port/db
   JWT_SECRET=ta_clé_secrète_aléatoire
   NODE_ENV=production
   FRONTEND_URL=https://ton-frontend-vercel.vercel.app
   ```

### Option B: Render (Gratuit)

1. Va sur [render.com](https://render.com)
2. **New Web Service** → Connecter repo GitHub
3. **Build Command**: `npm run build`
4. **Start Command**: `npm run start:prod`
5. Ajouter même variables d'environnement

### Option C: Heroku (Payant - €7/mois)

1. Va sur [heroku.com](https://heroku.com)
2. `heroku login`
3. `heroku create anayi-backend`
4. `git push heroku main`

---

## 🔐 Configuration CORS (Important!)

Dans ton backend (`backend/src/main.ts`), ajoute ceci avant le démarrage:

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

---

## ✅ Étapes Finales

1. ✅ Frontend déployé sur Vercel
2. ✅ Backend déployé (Railway/Render)
3. ✅ Variables d'environnement configurées
4. ✅ CORS configuré sur le backend
5. ✅ Tester: `curl https://ton-backend.url/children`

---

## 🐛 Dépannage

**"API non trouvée"** → Vérifie `VITE_API_URL` sur Vercel

**"CORS error"** → Ajoute ton URL Vercel dans `enableCors()` du backend

**"Base de données introuvable"** → Vérifie `DATABASE_URL` sur ton serveur backend
