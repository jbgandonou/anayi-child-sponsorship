# 🚀 Guide de Démarrage Rapide

## ⚡ Installation en 5 Minutes

### 1️⃣ Vérifier les Prérequis

```bash
# Vérifier Docker
docker --version

# Vérifier Docker Compose
docker-compose --version
```

Si pas installé : [Télécharger Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 2️⃣ Démarrer l'Application

```bash
cd child-sponsorship-app
docker-compose up --build
```

**Temps d'installation:** ~3-5 minutes (première fois)

### 3️⃣ Accéder à l'Application

- **Frontend (Formulaire):** http://localhost:5173
- **Backend (API):** http://localhost:3000
- **Base de données:** localhost:5432

## ✅ Vérification

### Tester le Backend
```bash
curl http://localhost:3000/children
```

Réponse attendue: `[]` (liste vide)

### Tester le Frontend
1. Ouvrir http://localhost:5173
2. Vous devriez voir "New Child Intake"
3. Remplir le formulaire étape par étape

## 📝 Utilisation du Formulaire

### Étape 1: Informations Personnelles
- Remplir tous les champs marqués d'une astérisque *
- Cliquer "Suivant →"

### Étape 2: Contexte Familial
- Sélectionner les options
- Continuer avec "Suivant →"

### Étape 3: Éducation & Santé  
- Renseigner l'école et la santé
- Cliquer "Suivant →"

### Étape 4: Parrainage
- Compléter les derniers champs
- Cliquer "Soumettre"
- ✅ Page de succès avec possibilité de télécharger le PDF

## 🔧 Commandes Utiles

```bash
# Arrêter l'application
docker-compose down

# Redémarrer
docker-compose up

# Voir les logs
docker-compose logs -f

# Voir les logs d'un service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend

# Supprimer tout et recommencer
docker-compose down -v
docker-compose up --build
```

## 🐛 Problèmes Courants

### Port déjà utilisé

**Erreur:** `port is already allocated`

**Solution:** Arrêter l'application qui utilise le port ou changer le port dans `docker-compose.yml`

```yaml
ports:
  - "5174:5173"  # Frontend sur port 5174 au lieu de 5173
```

### Le frontend ne charge pas

1. Vérifier que le backend fonctionne: `curl http://localhost:3000/children`
2. Vérifier les logs: `docker-compose logs frontend`
3. Vider le cache du navigateur (Ctrl+Shift+R)

### Erreur de base de données

```bash
# Supprimer les données et recommencer
docker-compose down -v
docker-compose up --build
```

## 📱 Test Complet

1. **Remplir un formulaire complet**
   - Nom: Test Enfant
   - Date naissance: 2015-01-15
   - Sexe: Masculin
   - Lieu: Cotonou
   - Village: Abomey-Calavi
   - Nationalité: Béninoise
   - Statut: Enfant vulnérable
   - École: École Test
   - Niveau: CE2
   - etc.

2. **Soumettre et vérifier**
   - Aller sur la page de succès
   - Télécharger le PDF
   - Retourner à l'accueil et voir le formulaire vide

3. **Vérifier dans la base**
   ```bash
   docker-compose exec postgres psql -U admin -d child_sponsorship
   SELECT full_name, gender FROM children;
   ```

## 🎯 Prochaines Étapes

- ✅ Tester toutes les étapes du formulaire
- ✅ Upload de fichiers (photos, certificats)
- ✅ Génération de PDF
- ✅ Consulter le README.md pour plus de détails

## 💡 Astuces

- **Développement rapide:** Les modifications du code sont automatiquement rechargées
- **Accès DB:** Username: `admin`, Password: `admin123`
- **API Documentation:** http://localhost:3000/children (liste JSON)

## 📞 Aide

Si vous rencontrez un problème :

1. Consulter les logs: `docker-compose logs -f`
2. Vérifier le README.md
3. Supprimer et recréer: `docker-compose down -v && docker-compose up --build`

---

**Temps total de setup:** 5-10 minutes ⏱️

**Prêt à l'emploi!** 🎉
