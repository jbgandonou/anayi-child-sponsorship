#!/bin/bash

# Script de démarrage automatisé pour Child Sponsorship App
# Usage: ./start.sh [commande]

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logo
echo -e "${GREEN}"
echo "╔════════════════════════════════════╗"
echo "║  Child Sponsorship Application     ║"
echo "║  Powered by Anayi                  ║"
echo "╚════════════════════════════════════╝"
echo -e "${NC}"

# Vérifier Docker
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker n'est pas installé${NC}"
        echo "Téléchargez Docker Desktop: https://www.docker.com/products/docker-desktop/"
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        echo -e "${RED}❌ Docker n'est pas démarré${NC}"
        echo "Veuillez démarrer Docker Desktop"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Docker est prêt${NC}"
}

# Commandes
case "$1" in
    start|"")
        echo -e "${BLUE}🚀 Démarrage de l'application...${NC}"
        check_docker
        docker-compose up --build
        ;;
    
    start-d)
        echo -e "${BLUE}🚀 Démarrage en arrière-plan...${NC}"
        check_docker
        docker-compose up -d --build
        echo -e "${GREEN}✅ Application démarrée!${NC}"
        echo -e "${YELLOW}Frontend: http://localhost:5173${NC}"
        echo -e "${YELLOW}Backend:  http://localhost:3000${NC}"
        ;;
    
    stop)
        echo -e "${YELLOW}⏹️  Arrêt de l'application...${NC}"
        docker-compose down
        echo -e "${GREEN}✅ Application arrêtée${NC}"
        ;;
    
    restart)
        echo -e "${YELLOW}🔄 Redémarrage...${NC}"
        docker-compose down
        docker-compose up -d --build
        echo -e "${GREEN}✅ Application redémarrée${NC}"
        ;;
    
    logs)
        echo -e "${BLUE}📋 Logs de l'application...${NC}"
        docker-compose logs -f
        ;;
    
    clean)
        echo -e "${RED}🗑️  Nettoyage complet (données incluses)...${NC}"
        read -p "Êtes-vous sûr? (y/N) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker-compose down -v
            echo -e "${GREEN}✅ Nettoyage terminé${NC}"
        fi
        ;;
    
    db)
        echo -e "${BLUE}💾 Connexion à la base de données...${NC}"
        docker-compose exec postgres psql -U admin -d child_sponsorship
        ;;
    
    test)
        echo -e "${BLUE}🧪 Test de l'API...${NC}"
        curl -s http://localhost:3000/children | json_pp || echo "[]"
        ;;
    
    status)
        echo -e "${BLUE}📊 Statut des services...${NC}"
        docker-compose ps
        ;;
    
    help|*)
        echo "Commandes disponibles:"
        echo ""
        echo -e "${GREEN}./start.sh${NC}          - Démarrer l'application"
        echo -e "${GREEN}./start.sh start-d${NC}  - Démarrer en arrière-plan"
        echo -e "${GREEN}./start.sh stop${NC}     - Arrêter l'application"
        echo -e "${GREEN}./start.sh restart${NC}  - Redémarrer"
        echo -e "${GREEN}./start.sh logs${NC}     - Voir les logs"
        echo -e "${GREEN}./start.sh clean${NC}    - Nettoyage complet"
        echo -e "${GREEN}./start.sh db${NC}       - Accéder à la DB"
        echo -e "${GREEN}./start.sh test${NC}     - Tester l'API"
        echo -e "${GREEN}./start.sh status${NC}   - Voir le statut"
        echo ""
        ;;
esac
