# 🌟 Child Sponsorship Application - Full Stack

Application complète pour la gestion des formulaires de prise en charge et parrainage d'enfants.

## 📋 Architecture

- **Frontend**: Vue.js 3 + Vite + Pinia
- **Backend**: NestJS + TypeORM
- **Database**: PostgreSQL
- **Deployment**: Docker Compose

## 🚀 Démarrage Rapide

### Prérequis
- Docker Desktop installé
- Git (optionnel)

### Installation en 3 commandes

```bash
# 1. Naviguer dans le dossier
cd child-sponsorship-app

# 2. Lancer toute l'application
docker-compose up --build

# 3. Ouvrir dans le navigateur
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
```

## 📊 Structure du Projet

```
child-sponsorship-app/
├── docker-compose.yml       # Configuration Docker
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── child/          # Module Child
│   │   │   ├── child.entity.ts
│   │   │   ├── child.service.ts
│   │   │   ├── child.controller.ts
│   │   │   └── dto/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── Dockerfile
├── frontend/                # Application Vue.js
│   ├── src/
│   │   ├── views/
│   │   │   ├── FormView.vue
│   │   │   └── SuccessView.vue
│   │   ├── stores/
│   │   │   └── formStore.js
│   │   ├── services/
│   │   │   └── api.js
│   │   └── router/
│   ├── package.json
│   └── Dockerfile
└── uploads/                 # Fichiers uploadés
```

## 🎯 Fonctionnalités

### Formulaire en 4 Étapes

#### Étape 1: Informations Personnelles
- Nom et prénom(s)
- Date de naissance
- Sexe (Masculin/Féminin)
- Lieu de naissance
- Village de résidence actuelle
- Nationalité
- Photo de l'enfant
- Acte de naissance

#### Étape 2: Contexte Familial
- Statut familial (orphelin, vulnérable, etc.)
- Nombre de frères et sœurs
- Type de logement
- Accès à l'eau potable
- Accès à l'électricité
- Alimentation suffisante
- Activité du tuteur

#### Étape 3: Éducation & Santé
- École fréquentée
- Niveau actuel/classe
- Fréquence de présence
- Besoins scolaires identifiés
- Certificat de scolarité
- État de santé général
- Vaccinations
- Problèmes de santé spécifiques

#### Étape 4: Parrainage & Identification
- Souhait de parrainage
- Consentement du tuteur
- Commentaires
- Photo récente
- Nom du volontaire
- Contact volontaire
- Date de l'enquête

## 🔧 Configuration

### Variables d'Environnement

Le fichier `docker-compose.yml` contient toutes les configurations :

**Base de données:**
- `POSTGRES_DB`: child_sponsorship
- `POSTGRES_USER`: admin
- `POSTGRES_PASSWORD`: admin123

**Backend:**
- `PORT`: 3000
- `DATABASE_HOST`: postgres
- `JWT_SECRET`: your-super-secret-jwt-key

**Frontend:**
- `VITE_API_URL`: http://localhost:3000

### Modifier les Configurations

Pour changer les mots de passe ou ports, éditez `docker-compose.yml`:

```yaml
environment:
  POSTGRES_PASSWORD: votre_nouveau_mot_de_passe
ports:
  - "5432:5432"  # Changez le premier port si nécessaire
```

## 📡 API Endpoints

### Children

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/children` | Créer un enfant |
| GET | `/children` | Liste tous les enfants |
| GET | `/children/:id` | Obtenir un enfant |
| PATCH | `/children/:id` | Mettre à jour |
| DELETE | `/children/:id` | Supprimer |
| GET | `/children/status/:status` | Par statut |
| POST | `/children/upload` | Upload fichiers |

### Exemple de Requête

```javascript
// Créer un enfant
POST http://localhost:3000/children
Content-Type: application/json

{
  "fullName": "Samuel Kalu",
  "gender": "Masculin",
  "dateOfBirth": "2015-03-15",
  "placeOfBirth": "Cotonou",
  "currentVillage": "Abomey-Calavi",
  "nationality": "Béninoise",
  "familyStatus": "Enfant vulnérable",
  "numberOfSiblings": 2,
  "school": "École Primaire Publique",
  "currentLevel": "CE2",
  "attendance": "Régulière",
  "schoolNeeds": ["Frais", "Fournitures"],
  "healthStatus": "Bon",
  "vaccinationsUpToDate": "OUI",
  "housingType": "En dur",
  "accessToWater": "OUI",
  "accessToElectricity": "NON",
  "sufficientFood": "OUI",
  "guardianActivity": "OUI",
  "wishesToBeSponsored": "OUI",
  "guardianConsent": "Je suis d'accord",
  "volunteerName": "Marie Dupont",
  "volunteerContact": "+229 12345678",
  "surveyDate": "2026-01-27"
}
```

## 🛠️ Développement

### Développement Local (sans Docker)

#### Backend
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Base de données
```bash
# Installer PostgreSQL localement
# Créer une base de données "child_sponsorship"
```

## 📝 Commandes Utiles

### Docker

```bash
# Démarrer les services
docker-compose up

# Démarrer en arrière-plan
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f

# Rebuild après modifications
docker-compose up --build

# Supprimer tout (données incluses)
docker-compose down -v
```

### Accès à la Base de Données

```bash
# Se connecter à PostgreSQL
docker-compose exec postgres psql -U admin -d child_sponsorship

# Commandes SQL utiles
\dt                    # Lister les tables
SELECT * FROM children;  # Voir les enfants
\q                     # Quitter
```

## 🔒 Sécurité

⚠️ **Important pour la Production:**

1. Changez tous les mots de passe dans `docker-compose.yml`
2. Utilisez des variables d'environnement externes
3. Désactivez `synchronize: true` dans TypeORM
4. Ajoutez un système d'authentification
5. Configurez HTTPS
6. Limitez les CORS

## 🐛 Dépannage

### Le frontend ne se connecte pas au backend

```bash
# Vérifier que le backend fonctionne
curl http://localhost:3000/children

# Vérifier les logs
docker-compose logs backend
```

### Erreur de base de données

```bash
# Supprimer et recréer la DB
docker-compose down -v
docker-compose up --build
```

### Port déjà utilisé

```yaml
# Changer le port dans docker-compose.yml
ports:
  - "5174:5173"  # Frontend sur 5174
  - "3001:3000"  # Backend sur 3001
```

## 📚 Technologies Utilisées

### Frontend
- Vue.js 3 - Framework JavaScript progressif
- Vite - Build tool rapide
- Pinia - State management
- Vue Router - Navigation
- Axios - HTTP client
- jsPDF - Génération PDF

### Backend
- NestJS - Framework Node.js
- TypeORM - ORM pour TypeScript
- PostgreSQL - Base de données
- Class Validator - Validation
- Multer - Upload de fichiers

### DevOps
- Docker - Conteneurisation
- Docker Compose - Orchestration

## 📄 Licence

Ce projet est destiné à un usage interne pour Anayi.

## 👥 Support

Pour toute question :
1. Vérifier les logs : `docker-compose logs`
2. Consulter la documentation
3. Contacter l'équipe de développement

## 🎉 Prochaines Fonctionnalités

- [ ] Authentification des utilisateurs
- [ ] Dashboard administrateur
- [ ] Export Excel/CSV
- [ ] Envoi d'emails automatiques
- [ ] Recherche et filtres avancés
- [ ] Historique des modifications
- [ ] Notifications en temps réel
- [ ] API REST documentation (Swagger)

---

**Développé avec ❤️ pour Anayi**
