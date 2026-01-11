# DanShop - Application E-commerce React

Application e-commerce moderne développée avec React et Vite, respectant le design React Native avec un thème vert/blanc.

##  Table des matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Lancement](#lancement)
- [Structure du projet](#structure-du-projet)
- [Hooks React utilisés](#hooks-react-utilisés)
- [Navigation](#navigation)

##  Description

DanShop est une application e-commerce complète permettant aux utilisateurs de :
- Parcourir un catalogue de produits
- Ajouter des produits au panier
- Gérer leur compte utilisateur
- Effectuer des achats en ligne

L'application utilise React avec des hooks modernes pour une gestion d'état optimale et une navigation fluide avec React Router.

##  Fonctionnalités

### Pages principales

- **Page d'accueil** : Présentation de l'application avec bouton d'inscription
- **Catalogue** : Recherche et affichage des produits avec fonctionnalité de recherche en temps réel
- **Panier** : Gestion du panier avec modification des quantités et calcul du total
- **Espace Client** : Affichage et gestion des informations personnelles
- **Contact** : Formulaire de contact pour communiquer avec le support
- **Connexion/Inscription** : Authentification utilisateur avec validation des formulaires

### Fonctionnalités techniques

-  Gestion d'état globale avec Context API
-  Navigation avec React Router
-  Menu latéral (Drawer Navigator) conditionnel selon l'état de connexion
-  Barre de navigation inférieure (Bottom Navigation) avec badge du panier
-  Persistance des données (panier et utilisateur) dans localStorage
-  Design responsive adapté aux mobiles et tablettes
-  Thème vert/blanc cohérent sur toute l'application

## 🛠 Technologies utilisées

- **React** ^19.1.1 - Bibliothèque JavaScript pour construire des interfaces utilisateur
- **React Router DOM** ^7.9.4 - Navigation entre les pages
- **Vite** ^7.1.7 - Outil de build rapide et moderne
- **ESLint** - Linter pour maintenir la qualité du code

##  Installation

### Prérequis

- Node.js (version 18 ou supérieure recommandée)
- npm ou yarn

### Étapes d'installation

1. **Cloner ou télécharger le projet**

2. **Installer les dépendances**

   ```bash
   npm install
   ```

   ou avec yarn :

   ```bash
   yarn install
   ```

3. **Vérifier l'installation**

   Les dépendances suivantes doivent être installées :
   - react
   - react-dom
   - react-router-dom

##  Lancement

### Mode développement

Pour lancer l'application en mode développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

Le serveur de développement supporte le Hot Module Replacement (HMR) pour un rechargement automatique lors des modifications.

### Mode production

Pour construire l'application pour la production :

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

Pour prévisualiser la version de production :

```bash
npm run preview
```

### Linting

Pour vérifier le code avec ESLint :

```bash
npm run lint
```

##  Structure du projet

```
mon-projet/
├── public/              # Fichiers statiques publics
├── src/
│   ├── assets/         # Images et autres ressources
│   │   └── Magasin Dan Shop.webp  # Logo de l'application
│   ├── Composant/      # Composants React
│   │   ├── BottomNavigation.jsx   # Barre de navigation inférieure
│   │   ├── Catalogue.jsx          # Page catalogue avec recherche
│   │   ├── Contact.jsx            # Page de contact
│   │   ├── DrawerNavigator.jsx    # Menu latéral
│   │   ├── EspaceClient.jsx       # Page compte utilisateur
│   │   ├── Header.jsx             # En-tête avec logo et menu
│   │   ├── Home.jsx               # Page d'accueil
│   │   ├── Inscription.jsx        # Page d'inscription
│   │   ├── Login.jsx              # Page de connexion
│   │   ├── main2.jsx              # Configuration des routes
│   │   ├── MyAPP2.jsx             # Composant racine
│   │   └── Panier.jsx             # Page panier
│   ├── context/
│   │   └── AppContext.jsx         # Context global (état, panier, auth)
│   ├── data/
│   │   └── products.js            # Données des produits
│   ├── App.jsx                    # Composant App (par défaut)
│   ├── main.jsx                   # Point d'entrée principal
│   ├── index.css                  # Styles globaux
│   └── App.css                    # Styles du composant App
├── index.html                     # Fichier HTML principal
├── package.json                   # Dépendances et scripts
├── vite.config.js                 # Configuration Vite
└── README.md                      # Documentation du projet
```

## 🎣 Hooks React utilisés

Le projet utilise plusieurs hooks React pour optimiser la gestion d'état et les performances :

### useState
- **Utilisation** : Gestion de l'état local des composants (formulaires, menus, etc.)
- **Exemples** : Formulaire de connexion, état d'ouverture du drawer, recherche de produits
- **Pourquoi** : Hook de base pour gérer l'état local qui change et déclenche des re-renders

### useEffect
- **Utilisation** : Effets de bord (synchronisation avec localStorage, filtrage des produits, fermeture du drawer)
- **Exemples** : Sauvegarde du panier, filtrage automatique lors de la recherche, vérification d'authentification
- **Pourquoi** : Permet d'exécuter du code en réaction aux changements d'état ou au cycle de vie du composant

### useContext
- **Utilisation** : Accès au contexte global (utilisateur, panier, fonctions de gestion)
- **Exemples** : Accès aux données utilisateur, ajout au panier, fonctions de connexion/déconnexion
- **Pourquoi** : Évite le "prop drilling" et permet un accès direct aux données globales depuis n'importe quel composant

### useRef
- **Utilisation** : Références aux éléments DOM et optimisations de performance
- **Exemples** : Référence au conteneur de scroll dans le panier
- **Pourquoi** : Permet de conserver une référence sans déclencher de re-render

### useNavigate
- **Utilisation** : Navigation programmatique entre les pages
- **Exemples** : Redirection après connexion, navigation depuis les boutons
- **Pourquoi** : Fourni par React Router pour gérer la navigation de manière déclarative

### useLocation
- **Utilisation** : Connaissance de la route actuelle pour la mise en surbrillance
- **Exemples** : Mise en évidence de l'item actif dans le drawer et la bottom navigation
- **Pourquoi** : Permet d'adapter l'UI selon la page actuelle

##  Navigation

L'application utilise **React Router** pour la navigation entre les pages.

### Routes disponibles

- `/` - Page d'accueil
- `/login` - Page de connexion
- `/inscription` - Page d'inscription
- `/catalogue` - Catalogue des produits
- `/panier` - Panier d'achat
- `/espace-client` - Espace client (requiert une connexion)
- `/contact` - Page de contact

### Navigation conditionnelle

- Le **Drawer Navigator** (menu latéral) affiche différents items selon l'état de connexion
- L'**Espace Client** redirige automatiquement vers `/login` si l'utilisateur n'est pas connecté
- La **Bottom Navigation** reste visible sur toutes les pages principales

##  Design

L'application utilise un thème vert/blanc cohérent :
- **Couleur principale** : Vert (#4CAF50)
- **Fond** : Blanc et gris clair (#f5f5f5)
- **Design responsive** : Adapté aux écrans mobile, tablette et desktop

##  Notes de développement

- Les données utilisateur et le panier sont persistés dans `localStorage`
- Les produits sont stockés dans un fichier de données statique (`src/data/products.js`)
- Dans un projet réel, ces données viendraient d'une API backend
- Le code est entièrement commenté pour faciliter la compréhension des hooks et de leur utilisation

##  Évolutions possibles

- Intégration d'une API backend pour les produits et l'authentification
- Système de paiement
- Historique des commandes
- Favoris/Wishlist
- Recherche avancée avec filtres
- Mode sombre
- Tests unitaires et d'intégration

##  Licence

Ce projet est développé dans un cadre éducatif.

---

**Développé avec Amour en utilisant React et Vite**


#### Identifiant pour Tester lapplication 
    Email : marcoghotu01@gmail.com
    Mot de passe : Daniel1234

        *Merci*