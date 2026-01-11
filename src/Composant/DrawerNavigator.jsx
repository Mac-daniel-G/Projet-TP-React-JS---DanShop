/**
 * Composant DrawerNavigator - Menu de navigation latéral
 * 
 * Hooks utilisés :
 * - useState : Gère l'état d'ouverture/fermeture du drawer
 * - useEffect : Ferme le drawer lors de changements de route (amélioration UX)
 * - useContext : Accède à l'état de connexion pour afficher différents menus
 * - useNavigate : Pour naviguer entre les pages
 * - useLocation : Pour mettre en surbrillance l'item actif
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './DrawerNavigator.css';

const DrawerNavigator = ({ isOpen, onClose }) => {
  // État local pour le drawer (en plus de la prop isOpen pour contrôle externe)
  // useState peut être utile ici si on veut gérer des animations
  const [isClosing, setIsClosing] = useState(false);

  // Navigation et localisation
  const navigate = useNavigate();
  const location = useLocation();

  // Récupération de l'utilisateur depuis le contexte
  // useContext permet de savoir si l'utilisateur est connecté
  // pour afficher différents menus selon l'état de connexion
  const { user, logout } = useApp();

  /**
   * Fermeture automatique du drawer lors des changements de route
   * useEffect est idéal ici pour écouter les changements de location
   * et améliorer l'expérience utilisateur en fermant le menu après navigation
   */
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]); // Ferme le drawer quand la route change

  /**
   * Gestion de la fermeture avec animation
   * Permet une transition plus douce avant la fermeture complète
   */
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200); // Délai pour l'animation
  };

  /**
   * Gestion de la navigation avec fermeture du drawer
   */
  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  /**
   * Gestion de la déconnexion
   */
  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      logout();
      handleNavigation('/');
    }
  };

  /**
   * Vérifie si une route est active pour la mise en surbrillance
   */
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Si le drawer n'est pas ouvert, ne rien afficher
  if (!isOpen && !isClosing) {
    return null;
  }

  // Menu pour utilisateur connecté
  const authenticatedMenu = [
    { path: '/', label: 'Accueil', icon: '🏠' },
    { path: '/espace-client', label: 'Mon Compte', icon: '👤' },
    { path: '/catalogue', label: 'Catalogue', icon: '📄' },
    { path: '/panier', label: 'Panier', icon: '🛒' },
    { path: '/contact', label: 'Contact', icon: '📧' },
  ];

  // Menu pour utilisateur non connecté (plus limité)
  const guestMenu = [
    { path: '/', label: 'Accueil', icon: '🏠' },
    { path: '/contact', label: 'Contact', icon: '📧' },
  ];

  // Sélection du menu selon l'état de connexion
  const menuItems = user ? authenticatedMenu : guestMenu;

  return (
    <>
      {/* Overlay sombre en arrière-plan */}
      <div
        className={`drawer-overlay ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer (menu latéral) */}
      <nav className={`drawer ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}>
        <div className="drawer-header">
          <h2>DanShop</h2>
          <button className="drawer-close-btn" onClick={handleClose} aria-label="Fermer le menu">
            ×
          </button>
        </div>

        <ul className="drawer-menu">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                className={`drawer-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
              >
                <span className="drawer-icon">{item.icon}</span>
                <span className="drawer-label">{item.label}</span>
              </button>
            </li>
          ))}

          {/* Item de déconnexion pour les utilisateurs connectés */}
          {user && (
            <li>
              <button className="drawer-item drawer-item-logout" onClick={handleLogout}>
                <span className="drawer-icon">🚪</span>
                <span className="drawer-label">Déconnexion</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default DrawerNavigator;
