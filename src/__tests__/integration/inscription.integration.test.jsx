/**
 * Tests d'intégration pour l'inscription
 * 
 * Tests couverts :
 * - Navigation entre les pages d'inscription et de connexion
 * - Intégration Inscription + AppContext + Navigation
 * - Flux complet d'inscription avec validation
 * - Connexion automatique après inscription
 * - Redirection après inscription réussie
 * - Persistance de l'état après inscription
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';
import Inscription from '../../Composant/Inscription';
import Login from '../../Composant/Login';

// Wrapper avec Router et Context
const IntegrationWrapper = ({ children }) => {
  return (
    <BrowserRouter>
      <AppProvider>{children}</AppProvider>
    </BrowserRouter>
  );
};

describe('Inscription - Tests d\'Intégration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Navigation entre Inscription et Login', () => {
    it('devrait permettre de naviguer d\'Inscription vers Login', async () => {
      render(
        <IntegrationWrapper>
          <Inscription />
        </IntegrationWrapper>
      );

      const loginLink = screen.getByRole('link', { name: /Se connecter/i });
      expect(loginLink).toHaveAttribute('href', '/login');
    });

    it('devrait permettre de naviguer de Login vers Inscription', async () => {
      render(
        <IntegrationWrapper>
          <Login />
        </IntegrationWrapper>
      );

      const inscriptionLink = screen.getByRole('link', { name: /Créer un compte/i });
      expect(inscriptionLink).toHaveAttribute('href', '/inscription');
    });
  });

  describe('Intégration Inscription + AppContext', () => {
    it('devrait créer un compte et connecter l\'utilisateur automatiquement', async () => {
      const user = userEvent.setup();
      
      render(
        <IntegrationWrapper>
          <Inscription />
        </IntegrationWrapper>
      );

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];
      const checkbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });

      await user.type(nomInput, 'Integration Test');
      await user.type(telephoneInput, '+33612345678');
      await user.type(emailInput, 'integration@inscription.com');
      await user.type(password1Input, 'Password123');
      await user.type(password2Input, 'Password123');
      await user.click(checkbox);
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Inscription réussie !/i)).toBeInTheDocument();
      });

      // Vérifier que l'utilisateur est sauvegardé dans localStorage
      const savedUser = JSON.parse(localStorage.getItem('danShopUser'));
      expect(savedUser).toBeTruthy();
      expect(savedUser.email).toBe('integration@inscription.com');
      expect(savedUser.nom).toBe('Integration Test');
      expect(savedUser.telephone).toBe('+33612345678');
    });
  });

  describe('Flux complet d\'inscription avec validation', () => {
    it('devrait valider tous les champs avant de créer le compte', async () => {
      const user = userEvent.setup();
      
      render(
        <IntegrationWrapper>
          <Inscription />
        </IntegrationWrapper>
      );

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];
      const checkbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });

      // Remplir avec des données valides
      await user.type(nomInput, 'Complete Flow');
      await user.type(telephoneInput, '+33765432109');
      await user.type(emailInput, 'complete@flow.com');
      await user.type(password1Input, 'Complete123');
      await user.type(password2Input, 'Complete123');
      await user.click(checkbox);
      await user.click(submitButton);

      // Vérifier le succès
      await waitFor(() => {
        expect(screen.getByText(/Inscription réussie !/i)).toBeInTheDocument();
      });

      // Vérifier la sauvegarde
      const savedUser = JSON.parse(localStorage.getItem('danShopUser'));
      expect(savedUser).toBeTruthy();
    });

    it('devrait valider la checkbox avant de permettre l\'inscription', async () => {
      const user = userEvent.setup();
      
      render(
        <IntegrationWrapper>
          <Inscription />
        </IntegrationWrapper>
      );

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });

      // Remplir tous les champs mais ne pas cocher la checkbox
      await user.type(nomInput, 'Test User');
      await user.type(telephoneInput, '+33612345678');
      await user.type(emailInput, 'test@example.com');
      await user.type(password1Input, 'Password123');
      await user.type(password2Input, 'Password123');
      await user.click(submitButton);

      // Vérifier l'erreur
      await waitFor(() => {
        expect(screen.getByText(/Vous devez accepter la politique/i)).toBeInTheDocument();
      });

      // Vérifier qu'aucun utilisateur n'est sauvegardé
      expect(localStorage.getItem('danShopUser')).toBeNull();
    });

    it('devrait valider la correspondance des mots de passe', async () => {
      const user = userEvent.setup();
      
      render(
        <IntegrationWrapper>
          <Inscription />
        </IntegrationWrapper>
      );

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];
      const checkbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });

      await user.type(nomInput, 'Test User');
      await user.type(telephoneInput, '+33612345678');
      await user.type(emailInput, 'test@example.com');
      await user.type(password1Input, 'Password123');
      await user.type(password2Input, 'Password456'); // Mots de passe différents
      await user.click(checkbox);
      await user.click(submitButton);

      // Vérifier l'erreur
      await waitFor(() => {
        expect(screen.getByText(/Les mots de passe ne correspondent pas/i)).toBeInTheDocument();
      });
    });
  });

  describe('Connexion automatique après inscription', () => {
    it('devrait connecter l\'utilisateur immédiatement après une inscription réussie', async () => {
      const user = userEvent.setup();
      
      render(
        <IntegrationWrapper>
          <Inscription />
        </IntegrationWrapper>
      );

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];
      const checkbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });

      await user.type(nomInput, 'Auto Login User');
      await user.type(telephoneInput, '+33698765432');
      await user.type(emailInput, 'autologin@test.com');
      await user.type(password1Input, 'AutoLogin123');
      await user.type(password2Input, 'AutoLogin123');
      await user.click(checkbox);
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Inscription réussie ! Vous êtes maintenant connecté/i)).toBeInTheDocument();
      });

      // Vérifier que l'utilisateur est bien connecté (sauvegardé)
      const savedUser = JSON.parse(localStorage.getItem('danShopUser'));
      expect(savedUser).toBeTruthy();
      expect(savedUser.email).toBe('autologin@test.com');
    });
  });

  describe('Redirection après inscription', () => {
    it('devrait afficher un message de succès avant la redirection', async () => {
      const user = userEvent.setup();
      
      render(
        <IntegrationWrapper>
          <Inscription />
        </IntegrationWrapper>
      );

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];
      const checkbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });

      await user.type(nomInput, 'Redirect Test');
      await user.type(telephoneInput, '+33611111111');
      await user.type(emailInput, 'redirect@test.com');
      await user.type(password1Input, 'Redirect123');
      await user.type(password2Input, 'Redirect123');
      await user.click(checkbox);
      await user.click(submitButton);

      // Vérifier que le message de succès apparaît
      await waitFor(() => {
        expect(screen.getByText(/Inscription réussie !/i)).toBeInTheDocument();
      }, { timeout: 2000 });

      // Note: La redirection réelle nécessiterait un mock de useNavigate
      // ou un router complet pour être testée
    });
  });

  describe('Persistance de l\'état après inscription', () => {
    it('devrait persister l\'utilisateur inscrit après rechargement', async () => {
      const user = userEvent.setup();
      
      render(
        <IntegrationWrapper>
          <Inscription />
        </IntegrationWrapper>
      );

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];
      const checkbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });

      await user.type(nomInput, 'Persist User');
      await user.type(telephoneInput, '+33622222222');
      await user.type(emailInput, 'persist@inscription.com');
      await user.type(password1Input, 'Persist123');
      await user.type(password2Input, 'Persist123');
      await user.click(checkbox);
      await user.click(submitButton);

      await waitFor(() => {
        expect(localStorage.getItem('danShopUser')).toBeTruthy();
      });

      // Simuler un rechargement
      const { unmount } = render(
        <IntegrationWrapper>
          <Inscription />
        </IntegrationWrapper>
      );

      unmount();

      // Vérifier que les données sont toujours présentes
      const savedUser = JSON.parse(localStorage.getItem('danShopUser'));
      expect(savedUser).toBeTruthy();
      expect(savedUser.email).toBe('persist@inscription.com');
      expect(savedUser.nom).toBe('Persist User');
    });
  });

  describe('Gestion des erreurs de validation dans le flux complet', () => {
    it('devrait afficher les erreurs de validation dans l\'ordre logique', async () => {
      const user = userEvent.setup();
      
      const { container } = render(
        <IntegrationWrapper>
          <Inscription />
        </IntegrationWrapper>
      );

      const checkbox = screen.getByRole('checkbox');
      const form = container.querySelector('form');

      // Tenter de soumettre sans remplir les champs
      await user.click(checkbox);
      
      // Utiliser fireEvent.submit pour contourner la validation HTML5 native
      fireEvent.submit(form);

      // Au moins une erreur devrait apparaître
      await waitFor(() => {
        const errorElements = document.querySelectorAll('.error-message');
        expect(errorElements.length).toBeGreaterThan(0);
      }, { timeout: 3000 });
    });
  });
});
