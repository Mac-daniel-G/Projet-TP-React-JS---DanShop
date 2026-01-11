/**
 * Composant Inscription - Page d'inscription
 * 
 * Hooks utilisés :
 * - useState : Gère les valeurs du formulaire, les messages d'erreur/succès et l'état de la checkbox
 * - useContext : Accède à la fonction login pour connecter l'utilisateur après inscription
 * - useNavigate : Pour rediriger après l'inscription réussie
 */

import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useApp } from '../context/AppContext';
import './inscription.css';

function Inscription() {
  // Navigation pour rediriger après l'inscription
  const navigate = useNavigate();

  // Récupération de la fonction login depuis le contexte
  // useContext permet d'accéder directement à la fonction de connexion
  // pour connecter l'utilisateur automatiquement après inscription
  const { login } = useApp();

  // État du formulaire
  // useState est idéal ici pour gérer toutes les valeurs des champs
  // qui changent à chaque frappe de l'utilisateur
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    password1: "",
    password2: ""
  });

  // États pour les messages et la validation
  // useState permet de gérer l'affichage conditionnel et l'état de la checkbox
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");
  const [valideButton, setValideButton] = useState(false);

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
   * Gestion de la checkbox d'acceptation des conditions
   * useState permet de suivre l'état de la checkbox
   */
  const acceptCondition = (e) => {
    setValideButton(e.target.checked);
  };

  /**
   * Validation complète du formulaire
   * Vérifie tous les champs selon les règles métier
   */
  const validateForm = () => {
    // Nom et prénom : pas de chiffres
    const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
    if (!nameRegex.test(formData.nom)) {
      setErreur("Le nom et prénom ne doivent pas contenir de chiffres.");
      return false;
    }

    // Téléphone : commence par + et ne contient que des chiffres ensuite
    const phoneRegex = /^\+[0-9]{6,15}$/;
    if (!phoneRegex.test(formData.telephone)) {
      setErreur("Le numéro doit commencer par '+' et ne contenir que des chiffres.");
      return false;
    }

    // Email : doit contenir @ et un domaine valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(formData.email)) {
      setErreur("Veuillez entrer un email valide (ex: exemple@gmail.com).");
      return false;
    }

    // Mot de passe : majuscule, minuscule, chiffre, min 6 caractères
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(formData.password1)) {
      setErreur("Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre.");
      return false;
    }

    // Vérification si les deux mots de passe correspondent
    if (formData.password1 !== formData.password2) {
      setErreur("Les mots de passe ne correspondent pas.");
      return false;
    }

    return true;
  };

  /**
   * Gestion de la soumission du formulaire
   * Valide le formulaire, crée le compte et connecte l'utilisateur
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!valideButton) {
      setErreur("Vous devez accepter la politique de confidentialité.");
      setMessage("");
      return;
    }

    if (!validateForm()) {
      setMessage("");
      return;
    }

    // Création des données utilisateur
    const userData = {
      nom: formData.nom,
      email: formData.email,
      telephone: formData.telephone,
    };

    // Connexion automatique après inscription
    // Dans un vrai projet, on ferait une requête API ici
    login(userData);

    setErreur("");
    setMessage("Inscription réussie ! Vous êtes maintenant connecté.");

    // Redirection vers la page d'accueil après un court délai
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>DanShop</h2>
        <p className="welcome">
          <strong>Bienvenue !</strong><br />
          Inscrivez-vous pour continuer
        </p>

        <form onSubmit={handleSubmit}>
          <label>Nom et Prénom</label>
          <div className="input-group">
            <input
              type="text"
              placeholder="John Doe"
              value={formData.nom}
              onChange={handleChange}
              name="nom"
              required
            />
          </div>

          <label>Numéro de téléphone</label>
          <div className="input-group">
            <input
              type="tel"
              placeholder="+33612345678"
              value={formData.telephone}
              onChange={handleChange}
              name="telephone"
              required
            />
          </div>

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
              value={formData.password1}
              onChange={handleChange}
              name="password1"
              required
            />
          </div>

          <label>Confirmation du Mot de passe</label>
          <div className="input-group">
            <input
              type="password"
              placeholder="•••••••••••••••••••••••••"
              value={formData.password2}
              onChange={handleChange}
              name="password2"
              required
            />
          </div>

          <div className="options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={valideButton}
                onChange={acceptCondition}
              />
              Accepter la politique de confidentialité
            </label>
            <a href="#politique">En savoir plus</a>
          </div>

          {erreur && <p className="error-message">{erreur}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit" className="submit-btn">S'inscrire</button>
        </form>

        <p className="signup">
          <b>Vous avez déjà un compte ? </b>
          <Link to="/login" className="create-account">
            <b>Se connecter</b>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Inscription;
