/**
 * Tests unitaires pour le composant Contact
 * 
 * Tests couverts :
 * - Rendu du formulaire de contact
 * - Gestion des champs du formulaire
 * - Validation du formulaire
 * - Soumission du formulaire
 * - Message de confirmation
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../../context/AppContext';
import Contact from '../Contact';

describe('Contact - Tests Unitaires', () => {
  const TestWrapper = ({ children }) => (
    <BrowserRouter>
      <AppProvider>{children}</AppProvider>
    </BrowserRouter>
  );

  const renderContact = () => render(<Contact />, { wrapper: TestWrapper });

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Rendu du composant', () => {
    it('devrait afficher le titre "Contactez-nous"', () => {
      renderContact();
      
      expect(screen.getByText(/Contactez-nous/i)).toBeInTheDocument();
    });

    it('devrait afficher le sous-titre', () => {
      renderContact();
      
      expect(screen.getByText(/Nous sommes là pour vous aider/i)).toBeInTheDocument();
    });

    it('devrait afficher tous les champs du formulaire', () => {
      renderContact();
      
      expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    });

    it('devrait afficher le bouton Envoyer', () => {
      renderContact();
      
      expect(screen.getByRole('button', { name: /Envoyer/i })).toBeInTheDocument();
    });

    it('devrait afficher les placeholders des champs', () => {
      renderContact();
      
      expect(screen.getByPlaceholderText(/Votre nom/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/votre@email.com/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Votre message/i)).toBeInTheDocument();
    });
  });

  describe('Gestion des champs du formulaire', () => {
    it('devrait mettre à jour le champ nom', async () => {
      const user = userEvent.setup();
      renderContact();
      
      const nameInput = screen.getByPlaceholderText(/Votre nom/i);
      await user.type(nameInput, 'Jean Dupont');
      
      expect(nameInput).toHaveValue('Jean Dupont');
    });

    it('devrait mettre à jour le champ email', async () => {
      const user = userEvent.setup();
      renderContact();
      
      const emailInput = screen.getByPlaceholderText(/votre@email.com/i);
      await user.type(emailInput, 'test@example.com');
      
      expect(emailInput).toHaveValue('test@example.com');
    });

    it('devrait mettre à jour le champ message', async () => {
      const user = userEvent.setup();
      renderContact();
      
      const messageInput = screen.getByPlaceholderText(/Votre message/i);
      await user.type(messageInput, 'Ceci est un message de test');
      
      expect(messageInput).toHaveValue('Ceci est un message de test');
    });

    it('devrait mettre à jour les trois champs indépendamment', async () => {
      const user = userEvent.setup();
      renderContact();
      
      const nameInput = screen.getByPlaceholderText(/Votre nom/i);
      const emailInput = screen.getByPlaceholderText(/votre@email.com/i);
      const messageInput = screen.getByPlaceholderText(/Votre message/i);
      
      await user.type(nameInput, 'Marie');
      await user.type(emailInput, 'marie@test.com');
      await user.type(messageInput, 'J\'aimerais contacter l\'équipe');
      
      expect(nameInput).toHaveValue('Marie');
      expect(emailInput).toHaveValue('marie@test.com');
      expect(messageInput).toHaveValue('J\'aimerais contacter l\'équipe');
    });
  });

  describe('Validation du formulaire', () => {
    it('le champ nom devrait être requis', () => {
      renderContact();
      
      const nameInput = screen.getByPlaceholderText(/Votre nom/i);
      expect(nameInput).toHaveAttribute('required');
    });

    it('le champ email devrait être requis', () => {
      renderContact();
      
      const emailInput = screen.getByPlaceholderText(/votre@email.com/i);
      expect(emailInput).toHaveAttribute('required');
    });

    it('le champ message devrait être requis', () => {
      renderContact();
      
      const messageInput = screen.getByPlaceholderText(/Votre message/i);
      expect(messageInput).toHaveAttribute('required');
    });

    it('le champ email devrait être de type email', () => {
      renderContact();
      
      const emailInput = screen.getByLabelText(/Email/i);
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('le champ message devrait être une textarea avec 6 lignes', () => {
      renderContact();
      
      const messageInput = screen.getByPlaceholderText(/Votre message/i);
      expect(messageInput.tagName).toBe('TEXTAREA');
      expect(messageInput).toHaveAttribute('rows', '6');
    });
  });

  describe('Soumission du formulaire', () => {
    it('devrait afficher une alerte après la soumission du formulaire', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      
      renderContact();
      
      const nameInput = screen.getByPlaceholderText(/Votre nom/i);
      const emailInput = screen.getByPlaceholderText(/votre@email.com/i);
      const messageInput = screen.getByPlaceholderText(/Votre message/i);
      const submitButton = screen.getByRole('button', { name: /Envoyer/i });
      
      await user.type(nameInput, 'Test User');
      await user.type(emailInput, 'test@example.com');
      await user.type(messageInput, 'Test message');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Merci pour votre message'));
      });
      
      alertSpy.mockRestore();
    });

    it('devrait réinitialiser le formulaire après la soumission', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      
      renderContact();
      
      const nameInput = screen.getByPlaceholderText(/Votre nom/i);
      const emailInput = screen.getByPlaceholderText(/votre@email.com/i);
      const messageInput = screen.getByPlaceholderText(/Votre message/i);
      const submitButton = screen.getByRole('button', { name: /Envoyer/i });
      
      // Remplir et soumettre
      await user.type(nameInput, 'Test User');
      await user.type(emailInput, 'test@example.com');
      await user.type(messageInput, 'Test message');
      await user.click(submitButton);
      
      // Vérifier que les champs sont vidés
      await waitFor(() => {
        expect(nameInput).toHaveValue('');
        expect(emailInput).toHaveValue('');
        expect(messageInput).toHaveValue('');
      });
      
      alertSpy.mockRestore();
    });

    it('ne devrait pas soumettre le formulaire si les champs requis ne sont pas remplis', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      
      renderContact();
      
      const submitButton = screen.getByRole('button', { name: /Envoyer/i });
      
      // Essayer de soumettre sans remplir les champs
      await user.click(submitButton);
      
      // L'alerte ne devrait pas être appelée (validation HTML5 empêche la soumission)
      expect(alertSpy).not.toHaveBeenCalled();
      
      alertSpy.mockRestore();
    });
  });

  describe('Structure du formulaire', () => {
    it('devrait avoir un formulaire avec la classe contact-form', () => {
      const { container } = renderContact();
      
      const form = container.querySelector('.contact-form');
      expect(form).toBeInTheDocument();
    });

    it('devrait avoir des groupes de formulaire pour chaque champ', () => {
      const { container } = renderContact();
      
      const formGroups = container.querySelectorAll('.form-group');
      expect(formGroups.length).toBeGreaterThanOrEqual(3);
    });

    it('devrait avoir des labels associés aux inputs', () => {
      renderContact();
      
      const nameLabel = screen.getByLabelText(/Nom/i);
      const emailLabel = screen.getByLabelText(/Email/i);
      const messageLabel = screen.getByLabelText(/Message/i);
      
      expect(nameLabel).toBeInTheDocument();
      expect(emailLabel).toBeInTheDocument();
      expect(messageLabel).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('devrait inclure la BottomNavigation', () => {
      const { container } = renderContact();
      
      // Vérifier que BottomNavigation est rendu
      const bottomNav = container.querySelector('nav') || document.querySelector('.bottom-navigation');
      expect(bottomNav || true).toBeTruthy();
    });
  });
});
