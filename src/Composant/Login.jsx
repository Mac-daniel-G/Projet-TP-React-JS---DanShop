/**
 * Composant Login - Page de connexion
 * 
 * Hooks utilisés :
 * - useState : Gère les valeurs du formulaire et les messages d'erreur/succès
 * - useContext : Accède à la fonction login pour connecter l'utilisateur
 * - useNavigate : Pour rediriger après la connexion réussie
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from '../context/AppContext';
import './Login.css';

function Login() {
  // Navigation pour rediriger après la connexion
  const navigate = useNavigate();

  // Récupération de la fonction login depuis le contexte
  // useContext permet d'accéder directement à la fonction de connexion
  // sans avoir à la passer en props
  const { login } = useApp();

  // État du formulaire
  // useState est idéal ici pour gérer les valeurs des champs
  // qui changent à chaque frappe de l'utilisateur
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // États pour les messages d'erreur et de succès
  // useState permet de gérer l'affichage conditionnel des messages
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");

  /**
   * Gestion du changement dans les champs du formulaire
   * Met à jour l'état local à chaque frappe
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Validation du formulaire
   * Vérifie que l'email et le mot de passe respectent les règles
   */
  const validateFormAuthentif = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(formData.email)) {
      setErreur("Veuillez entrer un email valide (ex: exemple@gmail.com).");
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErreur("Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre.");
      return false;
    }

    return true;
  };

  /**
   * Gestion de la soumission du formulaire
   * Valide le formulaire, connecte l'utilisateur et redirige
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFormAuthentif()) {
      setMessage("");
      return;
    }

    // Simuler une connexion réussie
    // Dans un vrai projet, on ferait une requête API ici
    const userData = {
      email: formData.email,
      nom: formData.email.split('@')[0], // Nom par défaut
      telephone: '+33600000000' // Téléphone par défaut
    };

    // Utilisation de la fonction login du contexte
    login(userData);

    setErreur("");
    setMessage("Connexion réussie !");

    // Redirection vers la page d'accueil après un court délai
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>DanShop</h2>

        <p className="welcome">
          <strong>Bienvenue !</strong>
          <br />
          Connectez-vous pour continuer
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <div className="input-group">
            <input
              type="email"
              placeholder="exemple123@gmail.com"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>

          <label>Mot de passe</label>
          <div className="input-group">
            <input
              type="password"
              placeholder="•••••••••••••••••••••••••"
              value={formData.password}
              onChange={handleChange}
              name="password"
              required
            />
          </div>

          <div className="options">
            <label className="checkbox-label">
              <input type="checkbox" /> Se souvenir de moi
            </label>
            <Link to="/contact">Mot de passe oublié ?</Link>
          </div>

          {erreur && <p className="error-message">{erreur}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit" className="submit-btn">Se connecter</button>
        </form>

        <p className="signup">
          <b>Pas encore de compte ? </b>
          <Link to="/inscription" className="connect-account">
            <b>Créer un compte</b>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
