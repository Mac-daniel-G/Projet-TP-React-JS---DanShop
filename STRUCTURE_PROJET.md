# 📁 Structure du Projet DanShop

## Arborescence du projet

```
mon-projet/
│
├── 📄 Configuration et Documentation
│   ├── package.json              # Dépendances et scripts npm
│   ├── pnpm-lock.yaml           # Lock file pour pnpm
│   ├── vite.config.js           # Configuration Vite
│   ├── eslint.config.js         # Configuration ESLint
│   ├── index.html               # Point d'entrée HTML
│   ├── README.md                # Documentation complète
│   ├── TESTS.md                 # Documentation des tests
│   └── STRUCTURE_PROJET.md      # Vous êtes ici
│
├── 📁 public/                    # Fichiers statiques publics
│
├── 📁 src/
│   ├── 🎯 Fichiers principaux
│   │   ├── main.jsx             # Point d'entrée React (chargement dans index.html)
│   │   ├── index.css            # Styles globaux de l'application
│   │   └── main.jsx             # ⚠️ [SUPPRIMÉ] App.jsx (template Vite)
│   │   └── ⚠️ [SUPPRIMÉ] App.css (styles App inutilisés)
│   │
│   ├── 🔧 Contexte et État global
│   │   └── context/
│   │       ├── AppContext.jsx       # Context global (authentification, panier)
│   │       └── __tests__/
│   │           └── AppContext.test.jsx
│   │
│   ├── 📦 Données statiques
│   │   └── data/
│   │       └── products.js          # Catalogue de produits
│   │
│   ├── 🎨 Composants (structure modulaire)
│   │   ├── Composant/
│   │   │
│   │   │   ✅ LAYOUT & NAVIGATION
│   │   │   ├── Header.jsx + Header.css          # En-tête avec logo et menu
│   │   │   ├── Footer.jsx + Footer.css          # Pied de page
│   │   │   ├── Menu.jsx                          # Menu de navigation (ancien, en attente de refactor)
│   │   │   ├── BottomNavigation.jsx + .css      # Barre de navigation inférieure
│   │   │   ├── DrawerNavigator.jsx + .css       # Menu latéral/Drawer
│   │   │   ├── MyAPP2.jsx + MyAPP2.css          # Composant racine principal
│   │   │   └── main2.jsx                         # Configuration des routes
│   │   │
│   │   │   ✅ PAGES PRINCIPALES
│   │   │   ├── Home.jsx + Home.css              # Page d'accueil
│   │   │   ├── Catalogue.jsx + Catalogue.css    # Catalogue produits avec recherche
│   │   │   ├── Panier.jsx + Panier.css          # Gestion du panier
│   │   │   ├── Contact.jsx + Contact.css        # Formulaire de contact
│   │   │   ├── EspaceClient.jsx + .css          # Espace client (authentifié)
│   │   │   ├── Login.jsx + Login.css            # Page de connexion
│   │   │   └── Inscription.jsx + inscription.css # Page d'inscription
│   │   │
│   │   │   ❌ COMPOSANTS INUTILISÉS (à supprimer)
│   │   │   ├── Exemple.jsx                       # ⚠️ Composant exemple simple
│   │   │   ├── MyAPP.jsx                         # ⚠️ Ancien parent (remplacé par MyAPP2)
│   │   │   ├── MapageWeb2.jsx + .css            # ⚠️ Orphelin
│   │   │   ├── Page.jsx + page.css              # ⚠️ Orphelin
│   │   │   └── Milieu.jsx + Milieux.css         # ? À vérifier
│   │   │
│   │   └── __tests__/
│   │       ├── Inscription.test.jsx
│   │       ├── Login.test.jsx
│   │       └── integration/
│   │
│   ├── 📚 Tests
│   │   ├── __tests__/
│   │   │   ├── integration/
│   │   │   │   ├── authentication.integration.test.jsx
│   │   │   │   └── inscription.integration.test.jsx
│   │   │   └── ...
│   │   │
│   │   └── Test/
│   │       ├── setup.js                 # Configuration Vitest
│   │       └── utils/
│   │           └── testUtils.jsx        # Utilitaires de test
│   │
│   └── 📦 assets/
│       └── [Images, SVG, ressources]
```

---

## 🎯 Points d'entrée clés

| Fichier | Rôle | Status |
|---------|------|--------|
| `index.html` | Feuille HTML principale | ✅ Actif |
| `src/main.jsx` | Charge React et enveloppe avec AppProvider | ✅ Actif |
| `src/Composant/MyAPP2.jsx` | Composant racine principal (routes) | ✅ Actif |
| `src/Composant/main2.jsx` | Configuration de toutes les routes | ✅ Actif |

---

## 📊 Résumé des changements

### ✅ À conserver (fichiers utilisés)
- ✓ Tous les composants dans `src/Composant/` sauf ceux marqués ❌
- ✓ Context, data, tests
- ✓ Fichiers de configuration

### ❌ À SUPPRIMER

| Fichier | Raison |
|---------|--------|
| `src/App.jsx` | Template Vite par défaut, jamais importé |
| `src/App.css` | CSS associé à App.jsx inutilisé |
| `src/Exemple.jsx` | Composant d'exemple, jamais utilisé |
| `src/Composant/MyAPP.jsx` | Ancien parent remplacé par MyAPP2 |
| `src/Composant/MapageWeb2.jsx` | Orphelin, jamais importé |
| `src/Composant/MapageWeb2.css` | CSS associé inutilisé |
| `src/Composant/Page.jsx` | Orphelin, jamais importé |
| `src/Composant/page.css` | CSS associé inutilisé |

---

## 🧹 Nettoyage effectué

✅ Fichier d'arborescence créé  
⏳ Suppression des fichiers inutilisés en cours...

---

## 📚 Recommandations supplémentaires

1. **Refactor Menu.jsx** - Fusionner avec Header ou DrawerNavigator pour éviter la redondance
2. **Vérifier Milieu.jsx** - Déterminer son utilité réelle
3. **Code mort** - Utiliser ESLint pour détecter les imports inutilisés
4. **Organisation** - Grouper les tests à côté des composants (co-location)

---

**Généré le:** 13 avril 2026
