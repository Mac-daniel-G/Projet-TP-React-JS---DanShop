/**
 * Tests unitaires pour le composant Login
 * 
 * Tests couverts :
 * - Rendu du composant
 * - Gestion des champs du formulaire
 * - Validation des données
 * - Soumission du formulaire
 * - Messages d'erreur et de succès
 * - Intégration avec le contexte
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login';
import { AllProvidersWrapper } from '../../Test/utils/testUtils';

describe('Login - Tests Unitaires', () => {
  beforeEach(() => {
    // Nettoyer localStorage avant chaque test
    localStorage.clear();
  });

  describe('Rendu du composant', () => {
    it('devrait rendre le formulaire de connexion avec tous les éléments', () => {
      render(<Login />, { wrapper: AllProvidersWrapper });

      // Vérifier que le titre est présent
      expect(screen.getByText('DanShop')).toBeInTheDocument();
      expect(screen.getByText(/Bienvenue !/)).toBeInTheDocument();

      // Vérifier que les champs sont présents (utiliser getByPlaceholderText car les labels ne sont pas associés)
      expect(screen.getByPlaceholderText(/exemple123@gmail.com/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/•••••••••••••••••••••••••/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument();
    });

    it('devrait afficher le lien vers la page d\'inscription', () => {
      render(<Login />, { wrapper: AllProvidersWrapper });

      const inscriptionLink = screen.getByRole('link', { name: /Créer un compte/i });
      expect(inscriptionLink).toBeInTheDocument();
      expect(inscriptionLink).toHaveAttribute('href', '/inscription');
    });
  });

  describe('Gestion des champs du formulaire', () => {
    it('devrait mettre à jour l\'email lorsque l\'utilisateur tape', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      await user.type(emailInput, 'test@example.com');

      expect(emailInput).toHaveValue('test@example.com');
    });

    it('devrait mettre à jour le mot de passe lorsque l\'utilisateur tape', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: AllProvidersWrapper });

      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      await user.type(passwordInput, 'Password123');

      expect(passwordInput).toHaveValue('Password123');
    });

    it('devrait mettre à jour les deux champs indépendamment', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);

      await user.type(emailInput, 'user@test.com');
      await user.type(passwordInput, 'SecurePass123');

      expect(emailInput).toHaveValue('user@test.com');
      expect(passwordInput).toHaveValue('SecurePass123');
    });
  });

  describe('Validation du formulaire', () => {
    it('devrait afficher une erreur si l\'email est invalide', async () => {
      const user = userEvent.setup();
      const { container } = render(<Login />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const form = container.querySelector('form');

      await user.clear(emailInput);
      await user.type(emailInput, 'email-invalide');
      await user.type(passwordInput, 'Password123');
      
      // Utiliser fireEvent.submit pour contourner la validation HTML5 native
      fireEvent.submit(form);

      await waitFor(() => {
        const errorMessage = screen.queryByText(/Veuillez entrer un email valide/i);
        expect(errorMessage).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('devrait afficher une erreur si le mot de passe est invalide (trop court)', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const submitButton = screen.getByRole('button', { name: /Se connecter/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'pass');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Le mot de passe doit contenir/i)).toBeInTheDocument();
      });
    });

    it('devrait afficher une erreur si le mot de passe n\'a pas de majuscule', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const submitButton = screen.getByRole('button', { name: /Se connecter/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Le mot de passe doit contenir/i)).toBeInTheDocument();
      });
    });

    it('devrait afficher une erreur si le mot de passe n\'a pas de chiffre', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const submitButton = screen.getByRole('button', { name: /Se connecter/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'Password');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Le mot de passe doit contenir/i)).toBeInTheDocument();
      });
    });

    it('devrait accepter un email et un mot de passe valides', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'Password123');

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('Password123');
    });
  });

  describe('Soumission du formulaire', () => {
    it('devrait appeler la fonction login du contexte avec les bonnes données', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const submitButton = screen.getByRole('button', { name: /Se connecter/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'Password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Connexion réussie !/i)).toBeInTheDocument();
      });

      // Vérifier que l'utilisateur est sauvegardé dans localStorage
      const savedUser = JSON.parse(localStorage.getItem('danShopUser'));
      expect(savedUser).toBeTruthy();
      expect(savedUser.email).toBe('test@example.com');
    });

    it('ne devrait pas soumettre le formulaire si la validation échoue', async () => {
      const user = userEvent.setup();
      const { container } = render(<Login />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const form = container.querySelector('form');

      await user.clear(emailInput);
      await user.type(emailInput, 'email-invalide');
      await user.type(passwordInput, 'Password123');
      
      // Utiliser fireEvent.submit pour contourner la validation HTML5 native
      fireEvent.submit(form);

      await waitFor(() => {
        const errorMessage = screen.queryByText(/Veuillez entrer un email valide/i);
        expect(errorMessage).toBeInTheDocument();
      }, { timeout: 3000 });

      // Ne devrait pas avoir de message de succès
      expect(screen.queryByText(/Connexion réussie !/i)).not.toBeInTheDocument();
    });

    it('devrait afficher un message de succès après une connexion réussie', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const submitButton = screen.getByRole('button', { name: /Se connecter/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'Password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Connexion réussie !/i)).toBeInTheDocument();
      });
    });

    it('devrait effacer les messages d\'erreur lors d\'une soumission réussie', async () => {
      const user = userEvent.setup();
      const { container } = render(<Login />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const form = container.querySelector('form');

      // D'abord, créer une erreur
      await user.clear(emailInput);
      await user.type(emailInput, 'invalid');
      await user.type(passwordInput, 'Password123');
      fireEvent.submit(form);

      await waitFor(() => {
        const errorMessage = screen.queryByText(/Veuillez entrer un email valide/i);
        expect(errorMessage).toBeInTheDocument();
      }, { timeout: 3000 });

      // Ensuite, corriger et soumettre
      await user.clear(emailInput);
      await user.clear(passwordInput);
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'Password123');
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.queryByText(/Veuillez entrer un email valide/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Connexion réussie !/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Intégration avec le contexte', () => {
    it('devrait utiliser la fonction login du contexte AppContext', async () => {
      const user = userEvent.setup();
      render(<Login />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInput = screen.getByPlaceholderText(/•••••••••••••••••••••••••/i);
      const submitButton = screen.getByRole('button', { name: /Se connecter/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'Password123');
      await user.click(submitButton);

      await waitFor(() => {
        const savedUser = JSON.parse(localStorage.getItem('danShopUser'));
        expect(savedUser).toBeTruthy();
        expect(savedUser.email).toBe('test@example.com');
      });
    });
  });
});
