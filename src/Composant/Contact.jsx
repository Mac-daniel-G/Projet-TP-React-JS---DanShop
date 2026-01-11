/**
 * Composant Contact - Page de contact
 * 
 * Hooks utilisés :
 * - useState : Gère les valeurs du formulaire de contact
 */

import { useState } from 'react';
import './Contact.css';
import BottomNavigation from './BottomNavigation';

const Contact = () => {
  // État du formulaire de contact
  // useState est idéal ici pour gérer les valeurs des champs du formulaire
  // qui changent à chaque frappe de l'utilisateur
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  /**
   * Gestion du changement dans les champs du formulaire
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Gestion de la soumission du formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Merci pour votre message ! Nous vous répondrons bientôt.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>Contactez-nous</h2>
        <p className="contact-subtitle">Nous sommes là pour vous aider</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Votre nom"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Votre message..."
            />
          </div>

          <button type="submit" className="submit-btn">
            Envoyer
          </button>
        </form>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Contact;
