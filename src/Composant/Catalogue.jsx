/**
 * Composant Catalogue - Page de recherche et affichage des produits
 * 
 * Hooks utilisés :
 * - useState : Gère la valeur de recherche et la liste filtrée des produits
 * - useEffect : Applique le filtre de recherche quand la valeur change
 * - useContext : Accède au contexte global pour ajouter des produits au panier
 */

import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import './Catalogue.css';
import BottomNavigation from './BottomNavigation';

const Catalogue = () => {
  // État de la valeur de recherche
  // useState est idéal ici car on doit gérer la valeur de l'input de recherche
  // qui change à chaque frappe de l'utilisateur et déclenche un re-render
  const [searchTerm, setSearchTerm] = useState('');

  // État des produits filtrés
  // useState stocke la liste des produits correspondant à la recherche
  // Permet de mettre à jour l'affichage dynamiquement
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Récupération de la fonction addToCart depuis le contexte
  // useContext permet d'accéder directement à la fonction sans passer par les props
  const { addToCart } = useApp();

  /**
   * Filtrage des produits selon le terme de recherche
   * useEffect est parfait ici car on veut filtrer automatiquement
   * à chaque changement du terme de recherche, sans avoir à appeler manuellement
   * une fonction de filtre à chaque onChange
   */
  useEffect(() => {
    if (!searchTerm.trim()) {
      // Si la recherche est vide, afficher tous les produits
      setFilteredProducts(products);
    } else {
      // Filtrer les produits dont le nom contient le terme de recherche (insensible à la casse)
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]); // Dépendance sur searchTerm : exécuté à chaque changement

  /**
   * Gestion du changement de valeur dans l'input de recherche
   * Fonction simple qui met à jour l'état, déclenchant automatiquement
   * le useEffect ci-dessus
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Ajout d'un produit au panier
   * Utilise la fonction du contexte pour mettre à jour l'état global
   */
  const handleAddToCart = (product) => {
    addToCart(product);
    // Optionnel : afficher un message de confirmation
    alert(`${product.name} ajouté au panier !`);
  };

  return (
    <div className="catalogue-container">
      {/* Barre de recherche */}
      <div className="catalogue-header">
        <input
          type="text"
          className="search-bar"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Liste des produits */}
      <div className="products-container">
        {filteredProducts.length === 0 ? (
          // Message si aucun produit trouvé
          <div className="no-products">
            <p>Aucun produit ne correspond à "{searchTerm}"</p>
          </div>
        ) : (
          // Grille de produits
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price.toFixed(2)} EUR</p>
                  <div className="product-actions">
                    <button
                      className="btn-add-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      Ajouter au Panier
                    </button>
                    <button className="btn-details">Détails</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Barre de navigation inférieure */}
      <BottomNavigation />
    </div>
  );
};

export default Catalogue;
