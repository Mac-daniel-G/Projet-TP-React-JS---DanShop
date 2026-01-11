/**
 * Composant Panier - Gestion du panier d'achat
 * 
 * Hooks utilisés :
 * - useState : Gère l'état local des quantités (optimisation pour éviter les re-renders inutiles)
 * - useRef : Référence aux éléments DOM pour le scroll et optimisations de performance
 * - useContext : Accède au panier global, fonctions de modification et calculs
 * - useEffect : Synchronise l'état local avec le contexte global
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Panier.css';
import BottomNavigation from './BottomNavigation';

const Panier = () => {
  // Navigation pour rediriger vers la page de paiement
  const navigate = useNavigate();

  // Récupération des données et fonctions du contexte
  // useContext permet d'accéder directement au panier et aux fonctions
  // sans avoir à les passer en props depuis un composant parent
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    getCartItemCount,
    getCartTotal,
  } = useApp();

  // État local pour optimiser les interactions
  // useState est utilisé ici pour gérer les modifications de quantité
  // de manière optimisée avant de les appliquer au contexte
  const [localQuantities, setLocalQuantities] = useState({});

  // Référence au conteneur de scroll
  // useRef est idéal ici car on ne veut pas déclencher de re-render
  // quand on modifie la référence, juste garder une référence DOM
  const scrollContainerRef = useRef(null);

  /**
   * Synchronisation des quantités locales avec le panier du contexte
   * useEffect permet de mettre à jour l'état local quand le panier change
   * (ex: quand on ajoute un produit depuis une autre page)
   */
  useEffect(() => {
    const quantities = {};
    cart.forEach((item) => {
      quantities[item.id] = item.quantity;
    });
    setLocalQuantities(quantities);
  }, [cart]);

  /**
   * Gestion du changement de quantité pour un produit
   * Fonction optimisée qui met à jour d'abord l'état local (rapide)
   * puis synchronise avec le contexte (qui peut déclencher des re-renders)
   */
  const handleQuantityChange = (productId, newQuantity) => {
    // Validation : quantité minimum 1, maximum 99
    const quantity = Math.max(1, Math.min(99, parseInt(newQuantity) || 1));
    
    // Mise à jour locale immédiate (pas de re-render global)
    setLocalQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));

    // Mise à jour du contexte (déclenche le re-render global)
    updateCartQuantity(productId, quantity);
  };

  /**
   * Incrémentation de la quantité
   */
  const handleIncrease = (productId, currentQuantity) => {
    handleQuantityChange(productId, currentQuantity + 1);
  };

  /**
   * Décrémentation de la quantité
   */
  const handleDecrease = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(productId, currentQuantity - 1);
    } else {
      // Si quantité = 1, supprimer le produit
      removeFromCart(productId);
    }
  };

  /**
   * Suppression d'un produit du panier
   */
  const handleRemove = (productId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit du panier ?')) {
      removeFromCart(productId);
    }
  };

  /**
   * Calcul du nombre d'articles uniques dans le panier
   */
  const uniqueItemsCount = cart.length;

  /**
   * Calcul du total de quantité
   */
  const totalQuantity = getCartItemCount();

  /**
   * Calcul du total du panier
   */
  const total = getCartTotal();

  /**
   * Gestion du passage à la caisse
   */
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Votre panier est vide !');
      return;
    }
    // Redirection vers la page de paiement (à créer)
    alert('Redirection vers la page de paiement...');
    // navigate('/checkout');
  };

  // Si le panier est vide, afficher un message
  if (cart.length === 0) {
    return (
      <div className="panier-container">
        <div className="panier-header">
          <h2>
            <span className="cart-icon">🛒</span>
            Mon Panier
          </h2>
        </div>
        <div className="panier-vide">
          <p>Votre panier est vide.</p>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="panier-container" ref={scrollContainerRef}>
      <div className="panier-header">
        <h2>
          <span className="cart-icon">🛒</span>
          Mon Panier
        </h2>
      </div>

      <div className="panier-items">
        {cart.map((item) => (
          <div key={item.id} className="panier-item">
            <img
              src={item.image || 'https://via.placeholder.com/100x100?text=Product'}
              alt={item.name}
              className="item-image"
            />
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-price">{item.price.toFixed(2)} €</p>
            </div>
            <div className="item-quantity">
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleDecrease(item.id, localQuantities[item.id] || item.quantity)}
                  aria-label="Diminuer la quantité"
                >
                  −
                </button>
                <span className="quantity-value">
                  {localQuantities[item.id] !== undefined
                    ? localQuantities[item.id]
                    : item.quantity}
                </span>
                <button
                  className="quantity-btn"
                  onClick={() => handleIncrease(item.id, localQuantities[item.id] || item.quantity)}
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
                aria-label="Supprimer le produit"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="panier-summary">
        <div className="summary-line">
          <span>Articles uniques:</span>
          <span>{uniqueItemsCount}</span>
        </div>
        <div className="summary-line">
          <span>Total Quantité:</span>
          <span>{totalQuantity}</span>
        </div>
        <div className="summary-total">
          <span>TOTAL :</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>

      <button className="checkout-btn" onClick={handleCheckout}>
        Passer à la caisse
      </button>

      <BottomNavigation />
    </div>
  );
};

export default Panier;
