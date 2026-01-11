/**
 * Composant Header - En-tête de l'application avec logo et menu
 * 
 * Hooks utilisés :
 * - useState : Gère l'état d'ouverture/fermeture du drawer
 * - useContext : Accède à l'utilisateur pour afficher des informations conditionnelles
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import DrawerNavigator from './DrawerNavigator';
import logoImage from '../assets/Magasin Dan Shop.webp';
import './Header.css';

function Header() {
  // État pour contrôler l'ouverture du drawer (menu latéral)
  // useState est idéal ici car on doit gérer l'état local d'ouverture
  // qui change quand l'utilisateur clique sur le bouton menu
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Récupération de l'utilisateur depuis le contexte
  // useContext permet d'afficher différentes informations selon l'état de connexion
  const { user } = useApp();

  /**
   * Gestion de l'ouverture/fermeture du drawer
   */
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Bouton menu hamburger pour ouvrir le drawer */}
          <button
            className="menu-toggle"
            onClick={handleDrawerToggle}
            aria-label="Ouvrir le menu"
          >
            ☰
          </button>

          {/* Logo et titre */}
          <Link to="/" className="header-logo">
            <img src={logoImage} alt="DanShop Logo" className="logo-image" />
            <h1 className="header-title">DanShop</h1>
          </Link>

          {/* Barre de recherche (optionnelle) */}
          <div className="header-search">
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher..."
              onClick={() => {
                // Redirige vers le catalogue avec focus sur la recherche
                window.location.href = '/catalogue';
              }}
            />
          </div>

          {/* Informations utilisateur (optionnel) */}
          {user && (
            <div className="header-user">
              <span className="user-name">{user.nom || 'Utilisateur'}</span>
            </div>
          )}
        </div>
      </header>

      {/* Drawer Navigator (menu latéral) */}
      <DrawerNavigator isOpen={drawerOpen} onClose={handleDrawerClose} />
    </>
  );
}

export default Header;
