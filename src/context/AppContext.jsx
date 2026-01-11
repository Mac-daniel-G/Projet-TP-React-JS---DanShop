/**
 * Context global de l'application DanShop
 * Gère l'état partagé entre tous les composants (authentification, panier, produits)
 * 
 * Pourquoi useContext ici ?
 * - Évite le "prop drilling" (passage de props à travers plusieurs niveaux)
 * - Permet un accès direct aux données depuis n'importe quel composant
 * - Centralise la logique métier (gestion du panier, authentification)
 * - Facilite la maintenance et les tests
 */

import { createContext, useState, useEffect, useCallback, useContext } from 'react';

// Création du contexte
export const AppContext = createContext();

/**
 * Provider du contexte qui enveloppe l'application
 * Contient toute la logique de gestion d'état
 */
export const AppProvider = ({ children }) => {
  // État de l'utilisateur connecté
  // useState est idéal ici car on a besoin de gérer un état local qui change
  // et qui déclenche des re-renders lors de la connexion/déconnexion
  const [user, setUser] = useState(null);

  // État du panier
  // useState permet de gérer la liste des articles dans le panier
  // et de déclencher des mises à jour UI automatiques
  const [cart, setCart] = useState([]);

  // État de chargement global
  const [loading, setLoading] = useState(false);

  /**
   * Vérification de l'authentification au chargement
   * useEffect est idéal ici pour exécuter du code au montage du composant
   * et restaurer l'état de l'utilisateur depuis localStorage
   */
  useEffect(() => {
    const storedUser = localStorage.getItem('danShopUser');
    const storedCart = localStorage.getItem('danShopCart');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []); // Tableau vide = exécution uniquement au montage

  /**
   * Sauvegarde du panier dans localStorage à chaque modification
   * useEffect surveille les changements du panier et les persiste
   * Permet de conserver le panier même après actualisation de la page
   */
  useEffect(() => {
    localStorage.setItem('danShopCart', JSON.stringify(cart));
  }, [cart]); // Exécuté à chaque modification du panier

  /**
   * Connexion d'un utilisateur
   * useCallback mémorise la fonction pour éviter des re-renders inutiles
   * des composants enfants qui utiliseraient cette fonction comme dépendance
   */
  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('danShopUser', JSON.stringify(userData));
  }, []);

  /**
   * Déconnexion de l'utilisateur
   */
  const logout = useCallback(() => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('danShopUser');
    localStorage.removeItem('danShopCart');
  }, []);

  /**
   * Ajout d'un produit au panier
   * Logique optimisée pour éviter les doublons et gérer les quantités
   */
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Si le produit existe déjà, augmenter la quantité
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Sinon, ajouter le produit avec une quantité de 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }, []);

  /**
   * Suppression d'un produit du panier
   */
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  /**
   * Modification de la quantité d'un produit dans le panier
   */
  const updateCartQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  /**
   * Calcul du nombre total d'articles dans le panier
   * Calcul optimisé qui évite de recalculer à chaque render
   */
  const getCartItemCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  /**
   * Calcul du total du panier
   */
  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  // Valeurs exposées par le contexte
  const value = {
    user,
    cart,
    loading,
    setLoading,
    login,
    logout,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartItemCount,
    getCartTotal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook personnalisé pour utiliser le contexte facilement
 * Évite d'importer useContext et AppContext dans chaque composant
 * Fournit aussi une vérification que le contexte est bien utilisé dans le Provider
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp doit être utilisé à l\'intérieur d\'AppProvider');
  }
  return context;
};
