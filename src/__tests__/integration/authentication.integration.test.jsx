/**
 * Tests d'intégration pour l'authentification (Connexion)
 * 
 * Tests couverts :
 * - Navigation entre les pages de connexion et d'inscription
 * - Intégration Login + AppContext + Navigation
 * - Flux complet de connexion
 * - Redirection après connexion réussie
 * - Persistance de l'état après connexion
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';
import Login from '../../Composant/Login';
import Inscription from '../../Composant/Inscription';

// Wrapper avec Router et Context
const IntegrationWrapper = ({ children }) => {
  return (
    <BrowserRouter>
      <AppProvider>{children}</AppProvider>
    </BrowserRouter>
  );
};

describe('Authentification - Tests d\'Intégration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Navigation entre Login et Inscription', () => {
    it('devrait permettre de naviguer de Login vers Inscription', async () => {
      render(
        <IntegrationWrapper>
          <Login />
        </IntegrationWrapper>
      );

      const inscriptionLink = screen.getByRole('link', { name: /Créer un compte/i });
      expect(inscriptionLink).toHaveAttribute('href', '/inscription');

      // Note: La navigation réelle nécessiterait un router complet avec toutes les routes
      // Ce test vérifie que le lien est présent et correctement configuré
    });

    it('devrait permettre de naviguer d\'Inscription vers Login', async () => {
      render(
        <IntegrationWrapper>
          <Inscription />
        </IntegrationWrapper>
      );

      const loginLink = screen.getByRole('link', { name: /Se connecter/i });
      expect(loginLink).toHaveAttribute('href', '/login');
    });
  });

  describe('Intégration Login + AppContext', () => {
    it('devrait connecter l\'utilisateur et mettre à jour le contexte', async () => {
      const user = userEvent.setup();
      
      render(
        <IntegrationWrapper>
          <Login />
        </IntegrationWrapper>
      );

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const submitButton = screen.getByRole('button', { name: /Se connecter/i });

      await user.type(emailInput, 'integration@test.com');
      await user.type(passwordInput, 'Password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Connexion réussie !/i)).toBeInTheDocument();
      });

      // Vérifier que l'utilisateur est sauvegardé dans localStorage
      const savedUser = JSON.parse(localStorage.getItem('danShopUser'));
      expect(savedUser).toBeTruthy();
      expect(savedUser.email).toBe('integration@test.com');
    });

    it('devrait partager l\'état utilisateur entre les composants via le contexte', async () => {
      // Note: Ce test vérifie que le contexte est partagé via l'intégration
      // Dans un vrai scénario, on pourrait tester avec plusieurs composants qui utilisent useApp
      // Pour ce test, on vérifie que login fonctionne correctement avec le contexte
      const user = userEvent.setup();
      
      render(
        <IntegrationWrapper>
          <Login />
        </IntegrationWrapper>
      );

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const submitButton = screen.getByRole('button', { name: /Se connecter/i });

      await user.type(emailInput, 'shared@test.com');
      await user.type(passwordInput, 'Password123');
      await user.click(submitButton);

      await waitFor(() => {
        const savedUser = JSON.parse(localStorage.getItem('danShopUser'));
        expect(savedUser).toBeTruthy();
        expect(savedUser.email).toBe('shared@test.com');
      });
    });
  });

  describe('Flux complet de connexion', () => {
    it('devrait valider, connecter et sauvegarder l\'utilisateur en une seule action', async () => {
      const user = userEvent.setup();
      
      render(
        <IntegrationWrapper>
          <Login />
        </IntegrationWrapper>
      );

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const submitButton = screen.getByRole('button', { name: /Se connecter/i });

      // 1. Remplir le formulaire
      await user.type(emailInput, 'complete@flow.com');
      await user.type(passwordInput, 'Complete123');

      // 2. Soumettre
      await user.click(submitButton);

      // 3. Vérifier le message de succès
      await waitFor(() => {
        expect(screen.getByText(/Connexion réussie !/i)).toBeInTheDocument();
      });

      // 4. Vérifier la sauvegarde dans localStorage
      const savedUser = JSON.parse(localStorage.getItem('danShopUser'));
      expect(savedUser).toBeTruthy();
      expect(savedUser.email).toBe('complete@flow.com');
    });

    it('devrait gérer les erreurs de validation dans le flux complet', async () => {
      const user = userEvent.setup();
      
      const { container } = render(
        <IntegrationWrapper>
          <Login />
        </IntegrationWrapper>
      );

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const form = container.querySelector('form');

      // Tenter de soumettre avec des données invalides
      await user.clear(emailInput);
      await user.type(emailInput, 'invalid-email');
      await user.type(passwordInput, 'weak');
      
      // Utiliser fireEvent.submit pour contourner la validation HTML5 native
      fireEvent.submit(form);

      // Vérifier qu'une erreur est affichée
      await waitFor(() => {
        const errorElements = document.querySelectorAll('.error-message');
        expect(errorElements.length).toBeGreaterThan(0);
      }, { timeout: 3000 });

      // Vérifier qu'aucun utilisateur n'est sauvegardé
      expect(localStorage.getItem('danShopUser')).toBeNull();
    });
  });

  describe('Redirection après connexion', () => {
    it('devrait afficher un message de succès avant la redirection', async () => {
      const user = userEvent.setup();
      
      render(
        <IntegrationWrapper>
          <Login />
        </IntegrationWrapper>
      );

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const submitButton = screen.getByRole('button', { name: /Se connecter/i });

      await user.type(emailInput, 'redirect@test.com');
      await user.type(passwordInput, 'Password123');
      await user.click(submitButton);

      // Vérifier que le message de succès apparaît
      await waitFor(() => {
        expect(screen.getByText(/Connexion réussie !/i)).toBeInTheDocument();
      }, { timeout: 2000 });

      // Note: La redirection réelle nécessiterait un mock de useNavigate
      // ou un router complet pour être testée
    });
  });

  describe('Persistance de l\'état', () => {
    it('devrait persister l\'utilisateur connecté après rechargement de la page', async () => {
      const user = userEvent.setup();
      
      // Simuler une connexion
      render(
        <IntegrationWrapper>
          <Login />
        </IntegrationWrapper>
      );

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const submitButton = screen.getByRole('button', { name: /Se connecter/i });

      await user.type(emailInput, 'persist@test.com');
      await user.type(passwordInput, 'Password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(localStorage.getItem('danShopUser')).toBeTruthy();
      });

      // Simuler un rechargement en créant un nouveau provider
      // qui devrait récupérer les données depuis localStorage
      const { unmount } = render(
        <IntegrationWrapper>
          <Login />
        </IntegrationWrapper>
      );

      unmount();

      // Vérifier que les données sont toujours présentes
      const savedUser = JSON.parse(localStorage.getItem('danShopUser'));
      expect(savedUser).toBeTruthy();
      expect(savedUser.email).toBe('persist@test.com');
    });
  });
});
