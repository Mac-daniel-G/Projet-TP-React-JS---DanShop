/**
 * Composant BottomNavigation - Barre de navigation inférieure
 * 
 * Hooks utilisés :
 * - useContext : Accède au panier pour afficher le badge avec le nombre d'articles
 * - useNavigate : Pour naviguer entre les pages
 * - useLocation : Pour déterminer quelle page est active et mettre en surbrillance l'icône correspondante
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './BottomNavigation.css';

const BottomNavigation = () => {
  // Navigation entre les pages
  const navigate = useNavigate();

  // Localisation actuelle pour mettre en surbrillance la page active
  // useLocation permet de connaître l'URL actuelle sans avoir à passer de props
  const location = useLocation();

  // Récupération du nombre d'articles dans le panier depuis le contexte
  // useContext permet d'accéder directement au panier global
  // sans avoir à le passer en props depuis un composant parent
  const { getCartItemCount } = useApp();

  // Calcul du nombre d'articles dans le panier pour le badge
  const cartItemCount = getCartItemCount();

  /**
   * Gestion du clic sur une icône de navigation
   * Navigue vers la route correspondante
   */
  const handleNavigation = (path) => {
    navigate(path);
  };

  /**
   * Vérifie si une route est active
   * Utile pour mettre en surbrillance l'icône de la page actuelle
   */
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-navigation">
      {/* Icône Catalogue/Documents */}
      <button
        className={`nav-item ${isActive('/catalogue') ? 'active' : ''}`}
        onClick={() => handleNavigation('/catalogue')}
        aria-label="Catalogue"
      >
        <span className="nav-icon">📄</span>
        <span className="nav-label">Catalogue</span>
      </button>

      {/* Icône Panier avec badge */}
      <button
        className={`nav-item ${isActive('/panier') ? 'active' : ''}`}
        onClick={() => handleNavigation('/panier')}
        aria-label="Panier"
      >
        <div className="nav-icon-wrapper">
          <span className="nav-icon">🛒</span>
          {cartItemCount > 0 && (
            <span className="nav-badge">{cartItemCount}</span>
          )}
        </div>
        <span className="nav-label">Panier</span>
      </button>

      {/* Icône Profil/Utilisateur */}
      <button
        className={`nav-item ${isActive('/espace-client') ? 'active' : ''}`}
        onClick={() => handleNavigation('/espace-client')}
        aria-label="Mon compte"
      >
        <span className="nav-icon">👤</span>
        <span className="nav-label">Compte</span>
      </button>

      {/* Icône Accueil */}
      <button
        className={`nav-item ${isActive('/') && location.pathname !== '/catalogue' && location.pathname !== '/panier' && location.pathname !== '/espace-client' ? 'active' : ''}`}
        onClick={() => handleNavigation('/')}
        aria-label="Accueil"
      >
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Accueil</span>
      </button>
    </nav>
  );
};

export default BottomNavigation;
