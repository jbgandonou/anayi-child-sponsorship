# 🔐 Authentication & Draft System - Documentation

## Vue d'ensemble

L'application dispose maintenant d'un système complet d'authentification et de sauvegarde de brouillons.

## 🎯 Fonctionnalités Ajoutées

### 1. Authentification

#### Inscription (Register)
- Formulaire avec nom, prénom, email, mot de passe
- Champs optionnels : téléphone, organisation
- Validation côté backend et frontend
- Token JWT généré automatiquement
- Redirection automatique vers le formulaire

#### Connexion (Login)
- Email et mot de passe
- Token JWT stocké dans localStorage
- Session persistante (7 jours)
- Protection contre les comptes inactifs

#### Déconnexion (Logout)
- Nettoyage du token
- Redirection vers la page de connexion

#### Profil Utilisateur
- Consultation du profil
- Modification des informations
- Changement de mot de passe

### 2. Sauvegarde de Brouillons

#### Sauvegarde Automatique
- Auto-save toutes les 30 secondes
- Ne se déclenche que si des données sont présentes
- Sauvegarde silencieuse en arrière-plan

#### Sauvegarde Manuelle
- Bouton "Save" dans le header
- Icône de disquette
- Feedback visuel lors de la sauvegarde

#### Gestion des Brouillons
- Liste de tous les brouillons
- Reprendre un brouillon où on l'a laissé
- Supprimer des brouillons
- Marquer comme complété

## 📡 API Endpoints

### Authentication

```
POST   /auth/register          - Créer un compte
POST   /auth/login             - Se connecter
GET    /auth/profile           - Obtenir le profil
PATCH  /auth/profile           - Modifier le profil
POST   /auth/change-password   - Changer le mot de passe
GET    /auth/me                - Utilisateur actuel
GET    /auth/users             - Liste des utilisateurs (admin)
```

### Drafts

```
POST   /drafts                 - Créer un brouillon
GET    /drafts                 - Liste des brouillons
GET    /drafts/:id             - Obtenir un brouillon
PATCH  /drafts/:id             - Mettre à jour un brouillon
DELETE /drafts/:id             - Supprimer un brouillon
PATCH  /drafts/:id/complete    - Marquer comme complété
GET    /drafts/completed       - Brouillons complétés
```

## 🔒 Sécurité

### Backend

- **Hachage des mots de passe** : bcrypt avec 10 rounds
- **JWT Tokens** : Expiration 7 jours
- **Guards** : Protection automatique des routes
- **Validation** : class-validator sur tous les DTOs
- **Relations** : Chaque enfant lié à son créateur

### Frontend

- **Token Storage** : localStorage
- **Auto-injection** : Header Authorization automatique
- **Route Guards** : Protection des pages authentifiées
- **Session Persistence** : Token vérifié au chargement

## 🚀 Utilisation

### Première Utilisation

1. **Créer un compte**
```bash
# Accéder à http://localhost:5173/register
```

2. **Se connecter**
```bash
# Email et mot de passe du compte créé
```

3. **Remplir le formulaire**
```bash
# Formulaire sauvegardé automatiquement
```

### Tester l'API

```bash
# Inscription
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Connexion
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Avec le token reçu
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 💾 Schéma de Base de Données

### Table: users
```sql
id              UUID PRIMARY KEY
email           VARCHAR UNIQUE NOT NULL
password        VARCHAR NOT NULL
first_name      VARCHAR NOT NULL
last_name       VARCHAR NOT NULL
role            ENUM (admin, coordinator, volunteer)
is_active       BOOLEAN DEFAULT true
phone           VARCHAR
organization    VARCHAR
last_login      TIMESTAMP
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### Table: drafts
```sql
id              UUID PRIMARY KEY
draft_number    VARCHAR UNIQUE
form_data       JSON
current_step    INTEGER DEFAULT 1
is_completed    BOOLEAN DEFAULT false
user_id         UUID FOREIGN KEY
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### Table: children (mise à jour)
```sql
...champs existants...
created_by      UUID FOREIGN KEY (users.id)
```

## 🎨 Interface Utilisateur

### Page de Connexion
- Design moderne avec gradient
- Formulaire centré
- Validation en temps réel
- Messages d'erreur clairs

### Page d'Inscription
- Formulaire en 2 colonnes sur desktop
- Champs optionnels clairement indiqués
- Validation du mot de passe (min 6 caractères)

### Header Amélioré
- Bouton "Save Draft" visible
- Menu utilisateur avec avatar
- Dropdown pour déconnexion
- Affichage nom et rôle de l'utilisateur

## 📋 Rôles Utilisateurs

### Volunteer (par défaut)
- Créer des formulaires
- Sauvegarder des brouillons
- Voir ses propres enfants

### Coordinator
- Toutes les permissions de Volunteer
- Voir les enfants de son équipe
- Approuver les demandes

### Admin
- Toutes les permissions
- Gérer les utilisateurs
- Accès complet aux données

## 🔄 Flux de Travail

### Scénario 1 : Nouvel Utilisateur
1. Accède à `/register`
2. Crée un compte
3. Redirigé automatiquement vers le formulaire
4. Commence à remplir
5. Sauvegarde automatique toutes les 30s

### Scénario 2 : Utilisateur Existant
1. Accède à `/login`
2. Se connecte
3. Voit ses brouillons en cours
4. Reprend là où il s'était arrêté

### Scénario 3 : Sauvegarde
1. Remplit le formulaire
2. Clique sur "Save" ou attend 30s
3. Brouillon sauvegardé avec numéro unique
4. Peut fermer et revenir plus tard
5. Retrouve ses données intactes

## 🐛 Résolution de Problèmes

### Token Expiré
```javascript
// Le guard redirige automatiquement vers /login
// L'utilisateur doit se reconnecter
```

### Sauvegarde Échoue
```javascript
// Vérifier que l'utilisateur est connecté
// Vérifier la connexion au backend
// Consulter les logs backend
```

### Mot de Passe Oublié
```javascript
// Fonctionnalité à implémenter
// Pour l'instant : contacter un admin
```

## 📝 Variables d'Environnement

```bash
# Backend
JWT_SECRET=your-super-secret-key
JWT_EXPIRATION=7d

# Frontend
VITE_API_URL=http://localhost:3000
```

## 🔜 Améliorations Futures

- [ ] Réinitialisation de mot de passe
- [ ] Authentification à deux facteurs (2FA)
- [ ] OAuth (Google, Facebook)
- [ ] Gestion des sessions multiples
- [ ] Historique des modifications
- [ ] Notification de sauvegarde réussie
- [ ] Synchronisation temps réel
- [ ] Mode hors ligne

## 🎓 Conseils de Développement

### Tester l'Authentification
```bash
# 1. Créer un utilisateur test
# 2. Vérifier le token dans DevTools > Application > LocalStorage
# 3. Tester les routes protégées
# 4. Vérifier la déconnexion
```

### Déboguer les Brouillons
```bash
# 1. Activer les logs dans le store
# 2. Vérifier les payloads dans Network
# 3. Consulter la table drafts dans la DB
```

### Personnaliser les Rôles
```typescript
// backend/src/auth/user.entity.ts
export enum UserRole {
  ADMIN = 'admin',
  COORDINATOR = 'coordinator',
  VOLUNTEER = 'volunteer',
  CUSTOM_ROLE = 'custom' // Ajouter ici
}
```

---

**Système d'authentification complet et sécurisé !** 🔐✨
