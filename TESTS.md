# Documentation des Tests - DanShop

Documentation complète des tests unitaires et d'intégration pour l'application DanShop, avec un focus particulier sur les fonctionnalités d'authentification (Connexion) et d'inscription (Création de comptes).

## Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Configuration des tests](#configuration-des-tests)
- [Structure des tests](#structure-des-tests)
- [Tests unitaires](#tests-unitaires)
- [Tests d'intégration](#tests-dintégration)
- [Exécution des tests](#exécution-des-tests)
- [Couverture des tests](#couverture-des-tests)
- [Intégration avec GitLab CI](#intégration-avec-gitlab-ci)

## Vue d'ensemble

Cette suite de tests couvre les fonctionnalités critiques d'authentification et d'inscription de l'application DanShop. Les tests sont organisés en deux catégories principales :

1. **Tests unitaires** : Validation des méthodes, fonctions et composants isolés
2. **Tests d'intégration** : Validation des interactions entre composants, formulaires et navigation

### Technologies utilisées

- **Vitest** ^4.0.16 - Framework de test moderne et rapide
- **@testing-library/react** ^16.0.1 - Utilitaires pour tester les composants React
- **@testing-library/jest-dom** ^6.5.0 - Matchers personnalisés pour le DOM
- **@testing-library/user-event** ^14.5.2 - Simulation d'interactions utilisateur
- **jsdom** ^25.0.1 - Environnement DOM pour les tests

## Configuration des tests

### Fichiers de configuration

- **vite.config.js** : Configuration Vitest avec environnement jsdom
- **src/Test/setup.js** : Configuration globale des tests (matchers, cleanup, mocks)
- **src/Test/utils/testUtils.jsx** : Utilitaires et wrappers pour les tests

### Installation des dépendances

```bash
npm install
```

Les dépendances suivantes sont nécessaires (déjà configurées dans `package.json`) :

```json
{
  "devDependencies": {
    "@testing-library/react": "^16.0.1",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/user-event": "^14.5.2",
    "@vitest/ui": "^4.0.16",
    "jsdom": "^25.0.1",
    "vitest": "^4.0.16"
  }
}
```

## Structure des tests

```
src/
├── Test/
│   ├── setup.js                    # Configuration globale
│   └── utils/
│       └── testUtils.jsx           # Utilitaires de test
├── Composant/
│   └── __tests__/
│       ├── Login.test.jsx          # Tests unitaires Login
│       └── Inscription.test.jsx    # Tests unitaires Inscription
├── context/
│   └── __tests__/
│       └── AppContext.test.jsx     # Tests unitaires AppContext
└── __tests__/
    └── integration/
        ├── authentication.integration.test.jsx  # Tests d'intégration Login
        └── inscription.integration.test.jsx     # Tests d'intégration Inscription
```

## Tests unitaires

### Login.test.jsx

Tests unitaires pour le composant `Login` couvrant :

#### Rendu du composant
- ✅ Rendu du formulaire avec tous les éléments
- ✅ Affichage du lien vers la page d'inscription

#### Gestion des champs du formulaire
- ✅ Mise à jour de l'email lors de la saisie
- ✅ Mise à jour du mot de passe lors de la saisie
- ✅ Mise à jour indépendante des deux champs

#### Validation du formulaire
- ✅ Rejet des emails invalides
- ✅ Rejet des mots de passe trop courts
- ✅ Rejet des mots de passe sans majuscule
- ✅ Rejet des mots de passe sans chiffre
- ✅ Acceptation des données valides

#### Soumission du formulaire
- ✅ Appel de la fonction login du contexte avec les bonnes données
- ✅ Prévention de la soumission si validation échoue
- ✅ Affichage du message de succès
- ✅ Effacement des messages d'erreur lors d'une soumission réussie

#### Intégration avec le contexte
- ✅ Utilisation correcte de la fonction login du contexte AppContext

### Inscription.test.jsx

Tests unitaires pour le composant `Inscription` couvrant :

#### Rendu du composant
- ✅ Rendu du formulaire avec tous les éléments
- ✅ Affichage du lien vers la page de connexion
- ✅ Affichage de la checkbox d'acceptation des conditions

#### Gestion des champs du formulaire
- ✅ Mise à jour de tous les champs lors de la saisie

#### Validation du formulaire - Nom
- ✅ Acceptation des noms valides avec lettres
- ✅ Rejet des noms contenant des chiffres
- ✅ Acceptation des caractères accentués

#### Validation du formulaire - Téléphone
- ✅ Acceptation des numéros valides
- ✅ Rejet des numéros sans préfixe +
- ✅ Rejet des numéros trop courts

#### Validation du formulaire - Email
- ✅ Acceptation des emails valides
- ✅ Rejet des emails invalides

#### Validation du formulaire - Mot de passe
- ✅ Acceptation des mots de passe valides
- ✅ Rejet des mots de passe trop courts
- ✅ Rejet des mots de passe sans majuscule
- ✅ Rejet des mots de passe sans chiffre
- ✅ Rejet si les mots de passe ne correspondent pas
- ✅ Acceptation si les mots de passe correspondent

#### Gestion de la checkbox
- ✅ Mise à jour de l'état de la checkbox
- ✅ Prévention de la soumission si la checkbox n'est pas cochée

#### Soumission du formulaire
- ✅ Appel de la fonction login du contexte avec les bonnes données
- ✅ Prévention de la soumission si validation échoue
- ✅ Affichage du message de succès

#### Intégration avec le contexte
- ✅ Utilisation correcte de la fonction login du contexte AppContext

### AppContext.test.jsx

Tests unitaires pour le contexte `AppContext` couvrant :

#### Initialisation du contexte
- ✅ Fourniture d'un utilisateur null par défaut
- ✅ Fourniture d'un panier vide par défaut
- ✅ Fourniture de toutes les fonctions nécessaires

#### Fonction login
- ✅ Connexion d'un utilisateur avec les données fournies
- ✅ Sauvegarde de l'utilisateur dans localStorage
- ✅ Remplacement d'un utilisateur connecté

#### Fonction logout
- ✅ Déconnexion de l'utilisateur
- ✅ Suppression de l'utilisateur du localStorage
- ✅ Vidage du panier lors de la déconnexion
- ✅ Suppression du panier du localStorage

#### Récupération depuis localStorage
- ✅ Récupération de l'utilisateur au démarrage
- ✅ Récupération du panier au démarrage
- ✅ Gestion de l'absence de données

#### Gestion de l'état utilisateur
- ✅ Mise à jour immédiate après login
- ✅ Mise à jour immédiate après logout

## Tests d'intégration

### authentication.integration.test.jsx

Tests d'intégration pour le flux d'authentification (Connexion) couvrant :

#### Navigation entre Login et Inscription
- ✅ Navigation de Login vers Inscription
- ✅ Navigation d'Inscription vers Login

#### Intégration Login + AppContext
- ✅ Connexion et mise à jour du contexte
- ✅ Partage de l'état utilisateur entre composants

#### Flux complet de connexion
- ✅ Validation, connexion et sauvegarde en une action
- ✅ Gestion des erreurs de validation dans le flux complet

#### Redirection après connexion
- ✅ Affichage du message de succès avant redirection

#### Persistance de l'état
- ✅ Persistance de l'utilisateur après rechargement

### inscription.integration.test.jsx

Tests d'intégration pour le flux d'inscription couvrant :

#### Navigation entre Inscription et Login
- ✅ Navigation d'Inscription vers Login
- ✅ Navigation de Login vers Inscription

#### Intégration Inscription + AppContext
- ✅ Création de compte et connexion automatique

#### Flux complet d'inscription avec validation
- ✅ Validation de tous les champs avant création
- ✅ Validation de la checkbox avant inscription
- ✅ Validation de la correspondance des mots de passe

#### Connexion automatique après inscription
- ✅ Connexion immédiate après inscription réussie

#### Redirection après inscription
- ✅ Affichage du message de succès avant redirection

#### Persistance de l'état après inscription
- ✅ Persistance de l'utilisateur après rechargement

#### Gestion des erreurs de validation
- ✅ Affichage des erreurs dans l'ordre logique

## Exécution des tests

### Commandes disponibles

```bash
# Exécuter tous les tests
npm test

# Exécuter les tests en mode watch (surveillance)
npm test -- --watch

# Exécuter les tests avec interface utilisateur
npm run test:ui

# Exécuter les tests avec couverture de code
npm run test:coverage

# Exécuter un fichier de test spécifique
npm test Login.test.jsx

# Exécuter les tests en mode verbose
npm test -- --reporter=verbose
```

### Options de configuration

Les tests sont configurés dans `vite.config.js` :

```javascript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
});
```

## Couverture des tests

### Fonctionnalités couvertes

#### Authentification (Connexion)
- ✅ Validation des champs (email, mot de passe)
- ✅ Soumission du formulaire
- ✅ Intégration avec AppContext
- ✅ Messages d'erreur et de succès
- ✅ Navigation
- ✅ Persistance dans localStorage

#### Inscription (Création de comptes)
- ✅ Validation de tous les champs (nom, téléphone, email, mot de passe)
- ✅ Validation de la checkbox d'acceptation
- ✅ Validation de la correspondance des mots de passe
- ✅ Soumission du formulaire
- ✅ Connexion automatique après inscription
- ✅ Intégration avec AppContext
- ✅ Messages d'erreur et de succès
- ✅ Navigation
- ✅ Persistance dans localStorage

#### AppContext
- ✅ Gestion de l'état utilisateur
- ✅ Fonctions login et logout
- ✅ Persistance dans localStorage
- ✅ Récupération depuis localStorage

### Statistiques de couverture

Pour obtenir les statistiques de couverture :

```bash
npm run test:coverage
```

Cela génère un rapport détaillé de la couverture de code pour :
- Lignes de code
- Fonctions
- Branches
- Statements

## Intégration avec GitLab CI

### Configuration recommandée pour .gitlab-ci.yml

```yaml
stages:
  - test

test:
  stage: test
  image: node:18
  before_script:
    - npm ci
  script:
    - npm run test -- --run --reporter=junit --outputFile=test-results.xml
    - npm run test:coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    when: always
    reports:
      junit: test-results.xml
    paths:
      - coverage/
    expire_in: 1 week
  only:
    - merge_requests
    - main
    - develop
```

### Variables d'environnement

Aucune variable d'environnement supplémentaire n'est requise pour les tests, car l'application utilise localStorage pour la persistance.

### Notes importantes pour GitLab CI

1. **Temps d'exécution** : Les tests peuvent prendre quelques secondes. Ajustez les timeouts si nécessaire.

2. **Cache npm** : Configurez le cache npm pour accélérer les builds :
```yaml
cache:
  paths:
    - node_modules/
```

3. **Parallélisation** : Vitest supporte l'exécution parallèle des tests par défaut.

4. **Rapports** : Les rapports de couverture sont générés dans le dossier `coverage/`.

## Bonnes pratiques

### Écriture de tests

1. **Nommage descriptif** : Utilisez des noms de tests qui décrivent clairement ce qui est testé
2. **Arrange-Act-Assert** : Structurez vos tests en trois phases
3. **Isolation** : Chaque test doit être indépendant
4. **Nettoyage** : Utilisez `beforeEach` et `afterEach` pour nettoyer l'état

### Maintenance des tests

1. **Mise à jour régulière** : Mettez à jour les tests lors de modifications du code
2. **Documentation** : Documentez les tests complexes
3. **Révision** : Réviser les tests lors des code reviews
4. **Couverture** : Maintenir une couverture de code élevée (>80%)

## Résolution de problèmes

### Problèmes courants

1. **Tests qui échouent à cause de localStorage**
   - Solution : Utiliser `beforeEach(() => localStorage.clear())`

2. **Problèmes de timing avec async/await**
   - Solution : Utiliser `waitFor` de @testing-library/react

3. **Erreurs liées au router**
   - Solution : Wrapper les composants avec `BrowserRouter` dans les tests

4. **Problèmes avec useContext**
   - Solution : Utiliser le `AllProvidersWrapper` fourni dans testUtils

## Évolutions futures

- [ ] Tests end-to-end (E2E) avec Playwright ou Cypress
- [ ] Tests de performance
- [ ] Tests d'accessibilité
- [ ] Tests visuels avec Chromatic ou Percy
- [ ] Tests de charge pour l'authentification

## Licence

Ce projet de tests fait partie du projet DanShop et est développé dans un cadre éducatif.

---

**Dernière mise à jour** : 2024

**Version des tests** : 1.0.0
