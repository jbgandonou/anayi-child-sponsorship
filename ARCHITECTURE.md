# 🏗️ Architecture du Projet

## Vue d'Ensemble

```
┌──────────────────────────────────────────────────┐
│                   UTILISATEUR                     │
│                  (Navigateur Web)                 │
└───────────────────┬────────────────────────x──────┘
                    │
                    │ HTTP
                    ▼
┌──────────────────────────────────────────────────┐
│              FRONTEND (Vue.js)                    │
│          http://localhost:5173                    │
│                                                   │
│  ┌─────────────────────────────────────────┐    │
│  │ FormView.vue (4 étapes)                 │    │
│  │  - Informations Personnelles            │    │
│  │  - Contexte Familial                    │    │
│  │  - Éducation & Santé                    │    │
│  │  - Parrainage & Identification          │    │
│  └─────────────────────────────────────────┘    │
│                     │                             │
│  ┌─────────────────▼───────────────────────┐    │
│  │ Pinia Store (formStore.js)              │    │
│  │  - Gestion de l'état                    │    │
│  │  - Validation des étapes                │    │
│  └─────────────────┬───────────────────────┘    │
│                     │                             │
│  ┌─────────────────▼───────────────────────┐    │
│  │ API Service (api.js)                    │    │
│  │  - HTTP requests (Axios)                │    │
│  └─────────────────────────────────────────┘    │
└───────────────────┬──────────────────────────────┘
                    │
                    │ REST API
                    │ (JSON)
                    ▼
┌──────────────────────────────────────────────────┐
│             BACKEND (NestJS)                      │
│          http://localhost:3000                    │
│                                                   │
│  ┌─────────────────────────────────────────┐    │
│  │ ChildController                          │    │
│  │  POST   /children                        │    │
│  │  GET    /children                        │    │
│  │  GET    /children/:id                    │    │
│  │  PATCH  /children/:id                    │    │
│  │  DELETE /children/:id                    │    │
│  │  POST   /children/upload                 │    │
│  └─────────────────┬───────────────────────┘    │
│                     │                             │
│  ┌─────────────────▼───────────────────────┐    │
│  │ ChildService                             │    │
│  │  - Business Logic                        │    │
│  │  - Validation                            │    │
│  └─────────────────┬───────────────────────┘    │
│                     │                             │
│  ┌─────────────────▼───────────────────────┐    │
│  │ TypeORM                                  │    │
│  │  - ORM Layer                             │    │
│  │  - Entity Mapping                        │    │
│  └─────────────────┬───────────────────────┘    │
└───────────────────┬──────────────────────────────┘
                    │
                    │ SQL
                    ▼
┌──────────────────────────────────────────────────┐
│            DATABASE (PostgreSQL)                  │
│          localhost:5432                           │
│                                                   │
│  ┌─────────────────────────────────────────┐    │
│  │ Table: children                          │    │
│  │  - id (UUID)                             │    │
│  │  - full_name                             │    │
│  │  - date_of_birth                         │    │
│  │  - gender                                │    │
│  │  - ... (tous les champs)                 │    │
│  │  - created_at                            │    │
│  │  - updated_at                            │    │
│  └─────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
```

## Flux de Données

### 1. Soumission du Formulaire

```
Utilisateur remplit formulaire
          ↓
FormView collecte les données
          ↓
Store valide les données
          ↓
Upload des fichiers (si présents)
          ↓
API Service envoie POST /children
          ↓
ChildController reçoit la requête
          ↓
Validation DTO (class-validator)
          ↓
ChildService traite les données
          ↓
TypeORM insère dans PostgreSQL
          ↓
Réponse JSON avec l'enfant créé
          ↓
Redirection vers SuccessView
```

### 2. Upload de Fichiers

```
Utilisateur sélectionne fichier
          ↓
FormView crée FormData
          ↓
API Service POST /children/upload
          ↓
Multer stocke dans /uploads
          ↓
Retour du chemin du fichier
          ↓
Chemin inclus dans la soumission finale
```

## Technologies Utilisées

### Frontend
- **Vue.js 3**: Framework JavaScript réactif
- **Vite**: Build tool moderne et rapide
- **Pinia**: State management (alternative à Vuex)
- **Vue Router**: Routing (FormView ↔ SuccessView)
- **Axios**: Client HTTP pour les API calls
- **jsPDF**: Génération de PDF côté client

### Backend
- **NestJS**: Framework Node.js avec TypeScript
- **TypeORM**: ORM pour PostgreSQL
- **class-validator**: Validation des DTOs
- **class-transformer**: Transformation des données
- **Multer**: Upload de fichiers
- **Passport**: Authentification (préparé pour le futur)

### Database
- **PostgreSQL 15**: Base de données relationnelle
- **pg**: Driver PostgreSQL pour Node.js

### DevOps
- **Docker**: Conteneurisation
- **Docker Compose**: Orchestration des services

## Modèle de Données

### Entity: Child

```typescript
{
  id: UUID,                          // Identifiant unique
  
  // Personal Info
  fullName: string,                  // Nom complet
  childPhoto: string,                // Chemin photo
  gender: string,                    // Genre
  dateOfBirth: Date,                 // Date de naissance
  placeOfBirth: string,              // Lieu de naissance
  currentVillage: string,            // Village actuel
  nationality: string,               // Nationalité
  otherNationality: string?,         // Autre nationalité
  
  // Family
  familyStatus: string,              // Statut familial
  otherFamilyStatus: string?,        // Autre statut
  numberOfSiblings: number,          // Nombre frères/sœurs
  
  // Education
  school: string,                    // École
  currentLevel: string,              // Niveau actuel
  otherLevel: string?,               // Autre niveau
  attendance: string,                // Fréquence
  schoolNeeds: string[],             // Besoins scolaires
  otherSchoolNeeds: string?,         // Autres besoins
  
  // Health
  healthStatus: string,              // État de santé
  vaccinationsUpToDate: string,      // Vaccins à jour
  specificHealthProblems: string?,   // Problèmes santé
  
  // Living Conditions
  housingType: string,               // Type logement
  otherHousingType: string?,         // Autre type
  accessToWater: string,             // Accès eau
  accessToElectricity: string,       // Accès électricité
  sufficientFood: string,            // Alimentation
  guardianActivity: string,          // Activité tuteur
  
  // Sponsorship
  wishesToBeSponsored: string,       // Souhait parrainage
  guardianConsent: string,           // Consentement
  specificComments: string?,         // Commentaires
  
  // Documents
  birthCertificate: string?,         // Acte naissance
  schoolCertificate: string?,        // Certificat scolaire
  recentPhoto: string?,              // Photo récente
  
  // Volunteer
  volunteerName: string,             // Nom volontaire
  volunteerContact: string,          // Contact volontaire
  surveyDate: Date,                  // Date enquête
  
  // Meta
  status: string,                    // pending/approved/rejected
  createdAt: Date,                   // Date création
  updatedAt: Date                    // Date màj
}
```

## Sécurité

### Actuellement Implémenté
- ✅ Validation des entrées (DTO)
- ✅ Typage fort (TypeScript)
- ✅ CORS configuré
- ✅ Validation des fichiers uploadés
- ✅ Limite de taille des fichiers (10MB)

### À Ajouter en Production
- [ ] Authentification JWT
- [ ] Rate limiting
- [ ] HTTPS/SSL
- [ ] Sanitization des entrées
- [ ] Chiffrement des données sensibles
- [ ] Logs d'audit
- [ ] Backup automatique de la DB

## Performance

### Frontend
- Lazy loading des routes
- Optimisation Vite
- Compression des assets
- Code splitting automatique

### Backend
- Connection pooling PostgreSQL
- Indexation de la DB
- Caching (à implémenter)

### Docker
- Multi-stage builds (à optimiser)
- Volumes pour persistance des données
- Network isolation

## Évolution Future

### Phase 2
- Dashboard administrateur
- Système d'authentification complet
- Gestion des utilisateurs
- Notifications par email

### Phase 3
- Export Excel/CSV
- Recherche avancée
- Filtres multiples
- Statistiques et rapports

### Phase 4
- API REST documentation (Swagger)
- Tests automatisés (Jest, Cypress)
- CI/CD Pipeline
- Déploiement cloud (AWS, Azure, GCP)

## Conventions de Code

### Frontend (Vue.js)
- Composition API
- Script setup
- Scoped CSS
- Naming: camelCase pour variables, PascalCase pour composants

### Backend (NestJS)
- Decorators TypeScript
- Dependency Injection
- DTOs pour validation
- Services pour business logic
- Naming: PascalCase pour classes, camelCase pour méthodes

### Database
- snake_case pour noms de colonnes
- UUIDs pour IDs
- Timestamps automatiques
- Soft deletes (à implémenter)

---

**Architecture scalable et maintenable** ✨
