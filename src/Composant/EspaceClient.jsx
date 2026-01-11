/**
 * Composant EspaceClient - Page de gestion du compte utilisateur
 * 
 * Hooks utilisés :
 * - useContext : Accède aux données utilisateur et à la fonction de déconnexion
 * - useNavigate : Pour rediriger après la déconnexion
 * - useEffect : Pour rediriger si l'utilisateur n'est pas connecté
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './EspaceClient.css';
import BottomNavigation from './BottomNavigation';

const EspaceClient = () => {
  // Récupération de l'utilisateur et de la fonction de déconnexion depuis le contexte
  // useContext est parfait ici car on a besoin d'accéder à l'état global
  // sans avoir à passer les données en props
  const { user, logout } = useApp();

  // Hook de navigation pour rediriger l'utilisateur
  const navigate = useNavigate();

  /**
   * Vérification de l'authentification et redirection si nécessaire
   * useEffect est idéal ici pour vérifier l'état de connexion au montage
   * et rediriger automatiquement si l'utilisateur n'est pas connecté
   */
  useEffect(() => {
    if (!user) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      navigate('/login');
    }
  }, [user, navigate]); // Dépendances : exécuté quand user ou navigate change

  /**
   * Gestion de la déconnexion
   * Déconnecte l'utilisateur et redirige vers la page d'accueil
   */
  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      logout();
      navigate('/');
    }
  };

  // Si l'utilisateur n'est pas chargé, ne rien afficher
  // (le useEffect redirigera vers /login)
  if (!user) {
    return null;
  }

  // Données utilisateur avec valeurs par défaut si manquantes
  const userName = user.nom || 'Client';
  const userEmail = user.email || 'client@gmail.com';
  const userPhone = user.telephone || '06xxxxxxxx';

  return (
    <div className="espace-client-container">
      <div className="espace-client-card">
        <div className="client-header">
          <div className="client-icon">👤</div>
          <h2>Espace Client</h2>
        </div>

        <div className="client-content">
          <h3 className="section-title">Informations personnelles</h3>

          <div className="info-group">
            <label className="info-label">Nom:</label>
            <div className="info-value">{userName}</div>
          </div>

          <div className="info-group">
            <label className="info-label">Email:</label>
            <div className="info-value">{userEmail}</div>
          </div>

          <div className="info-group">
            <label className="info-label">Téléphone:</label>
            <div className="info-value">{userPhone}</div>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Se déconnecter
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default EspaceClient;
