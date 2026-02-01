# 🚀 Guide Complet de Déploiement - Étapes Finales

## ✅ Status Actuel

- ✅ Code local initialisé dans git
- ✅ Backend configuré pour Railway (DATABASE_URL support)
- ✅ Frontend configuré pour Vercel
- ✅ CORS et variables d'environnement prêts

---

## 📋 PLAN D'ACTION

### Phase 1: Créer un repo GitHub (5 min)

**1.1 Créer un repo sur GitHub**

- Va sur [github.com/new](https://github.com/new)
- Nom: `anayi-child-sponsorship` (ou ce que tu veux)
- Description: "Child Sponsorship Application"
- Fais-le **public** (pour Railway gratuit)
- Clique **Create repository**

**1.2 Connecter ton code local à GitHub**

Copie les commandes de GitHub et exécute-les dans ton terminal:

```bash
cd /Users/jean-baptistegandonou/Documents/perso/anayi.projet

# Remplace par ton repo GitHub
git remote add origin https://github.com/TONUSERNAME/anayi-child-sponsorship.git
git branch -M main
git push -u origin main
```

✅ Ton code est maintenant sur GitHub!

---

### Phase 2: Déployer le Backend sur Railway (10 min)

**2.1 Créer un compte Railway**

- Va sur [railway.app](https://railway.app)
- Clique **Sign in with GitHub** (c'est plus rapide)

**2.2 Créer un nouveau projet**

- Dashboard → **+ New Project**
- Clique **Deploy from GitHub repo**
- Sélectionne ton repo `anayi-child-sponsorship`
- Railway va auto-détecter que c'est un projet Node.js

**2.3 Ajouter PostgreSQL**

- Dans ton projet, clique **+ Add**
- Sélectionne **Add PostgreSQL**
- Railway va créer la base automatiquement

**2.4 Configurer les variables d'environnement**

Dans le **Web Service** (ton backend), va à **Settings** → **Variables**

Ajoute ces 3 variables:

```
NODE_ENV=production
JWT_SECRET=genere-une-clé-secrète-complexe-ici
FRONTEND_URL=https://ton-frontend-vercel.vercel.app
```

**Note:** `DATABASE_URL` est créée automatiquement par Railway ✅

**2.5 Déployer**

- Railway va automatiquement builder et déployer
- Attends 2-3 minutes
- Tu verras l'URL dans **Deployments** (ex: `https://anayi-backend-production.railway.app`)

**Note cet URL!** 👉 Tu en auras besoin pour Vercel

---

### Phase 3: Déployer le Frontend sur Vercel (5 min)

**3.1 Installer Vercel CLI**

```bash
npm install -g vercel
```

**3.2 Authentifier avec Vercel**

```bash
vercel login
```

**3.3 Déployer depuis le dossier frontend**

```bash
cd /Users/jean-baptistegandonou/Documents/perso/anayi.projet/frontend
vercel
```

Réponds aux questions:

- **Set up and deploy?** → `y` (yes)
- **Scope?** → Choisis ton account
- **Link to existing project?** → `n` (no) - première fois
- **Project name?** → `anayi-child-sponsorship-frontend`
- **Framework?** → `Vite` (sélectionne automatiquement)
- **Root directory?** → `.` (laisser blanc)

Vercel va:

- Builder le projet
- Créer une URL (ex: `https://anayi-child-sponsorship-frontend.vercel.app`)
- Te montrer l'URL à la fin ✅

**Note cet URL aussi!**

---

### Phase 4: Configurer les Variables d'Environnement Finales (2 min)

**4.1 Sur Vercel (Frontend)**

Dashboard Vercel → Ton projet → **Settings** → **Environment Variables**

Clique **Add**:

- **Name:** `VITE_API_URL`
- **Value:** `https://ton-backend-railway.app` (l'URL de Railway)
- Clique **Save**

**4.2 Redéployer le Frontend**

Pour que la nouvelle variable soit utilisée:

```bash
vercel --prod
```

Attends la fin du déploiement ✅

---

## 🎉 Ton App est en Ligne!

**Frontend:** https://ton-frontend-vercel.vercel.app  
**Backend:** https://ton-backend-railway.app

---

## 🧪 Tester

### Tester le Backend

```bash
curl https://ton-backend-railway.app/api
# Devrait retourner la Swagger doc
```

### Tester le Frontend

1. Ouvre https://ton-frontend-vercel.vercel.app
2. Tu devrais voir le formulaire "New Child Intake"
3. Essaie de créer un enfant

### Si erreur CORS

C'est qu'il y a un problème de configuration. Va à:

- [backend/src/main.ts](../backend/src/main.ts#L10-L15)
- Assure-toi que ton URL Vercel est dedans

---

## ⚙️ Auto-Déploiement (Bonus)

Maintenant, chaque fois que tu fais un commit:

```bash
git push origin main
```

**Railway va automatiquement:**

- Récupérer le dernier code
- Rebuild et redéployer

**Vercel va automatiquement:**

- Récupérer le dernier code
- Rebuild et redéployer

C'est la magie de GitHub + Vercel + Railway! 🚀

---

## 🐛 Si quelque chose ne marche pas

### "API not found" (depuis le frontend)

→ Vérifie que `VITE_API_URL` est configurée sur Vercel et redéploie

### "Database connection refused"

→ Va sur Railway, vérifie que PostgreSQL est running

### "CORS error"

→ Ajoute l'URL du frontend dans [backend/src/main.ts](../backend/src/main.ts#L10-L15)

### "Module not found"

→ Sur Railway, va dans Logs et cherche l'erreur

---

## 📱 Gérer après déploiement

### Voir les logs du backend

- Railway Dashboard → Ton service → **View Logs**

### Voir les logs du frontend

- Vercel Dashboard → Ton projet → **Logs** (onglet)

### Accéder à la base de données

- Railway Dashboard → PostgreSQL → **Connect**

---

## ✨ Prochaines étapes (après déploiement)

1. Créer des utilisateurs sur l'app
2. Tester le formulaire complet
3. Configurer un domaine custom (si tu veux)
4. Ajouter des validations email
5. Mettre en place des notifications

Besoin d'aide? C'est quoi ta prochaine priorité? 🎯
