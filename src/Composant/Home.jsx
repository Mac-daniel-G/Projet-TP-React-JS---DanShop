/**
 * Composant Home - Page d'accueil de DanShop
 * 
 * Hooks utilisés :
 * - useState : Gère l'état d'affichage des animations ou interactions
 * - useContext : Accède à l'état de connexion pour afficher différents contenus
 * - useNavigate : Pour rediriger vers la page d'inscription
 */

import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Home.css';
import BottomNavigation from './BottomNavigation';

function Home() {
  // Navigation pour rediriger vers la page d'inscription
  const navigate = useNavigate();

  // Récupération de l'utilisateur depuis le contexte
  // useContext permet de savoir si l'utilisateur est connecté
  // pour personnaliser le contenu de la page d'accueil
  const { user } = useApp();

  /**
   * Gestion du clic sur le bouton "Créer un compte"
   * Redirige vers la page d'inscription
   */
  const handleCreateAccount = () => {
    navigate('/inscription');
  };

  return (
    <div className="home-container">
      {/* Carte principale avec le contenu */}
      <div className="home-card">
        {/* Bannière de bienvenue */}
        <div className="home-banner">
          <div className="banner-content">
            <h1 className="banner-title">BIENVENUE SUR NOTRE SITE</h1>
            <div className="banner-icon">🏠🛒</div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="home-content">
          <h2 className="home-title">Bienvenue sur DanShop</h2>
          <p className="home-subtitle">Votre boutique en ligne préférée</p>

          {/* Bouton d'action principal */}
          {!user && (
            <button className="btn-create-account" onClick={handleCreateAccount}>
              Créer un compte
            </button>
          )}

          {/* Description */}
          <p className="home-description">
            Découvrez nos produits et profitez de nos offres exclusives
          </p>
        </div>
      </div>

      {/* Barre de navigation inférieure */}
      <BottomNavigation />
    </div>
  );
}

export default Home;
