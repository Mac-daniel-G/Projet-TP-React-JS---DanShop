/**
 * Tests unitaires pour le composant Inscription
 * 
 * Tests couverts :
 * - Rendu du composant
 * - Gestion des champs du formulaire
 * - Validation des données (nom, téléphone, email, mot de passe)
 * - Gestion de la checkbox de confirmation
 * - Soumission du formulaire
 * - Messages d'erreur et de succès
 * - Intégration avec le contexte
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Inscription from '../Inscription';
import { AllProvidersWrapper } from '../../Test/utils/testUtils';

describe('Inscription - Tests Unitaires', () => {
  beforeEach(() => {
    // Nettoyer localStorage avant chaque test
    localStorage.clear();
  });

  const fillValidInscriptionForm = async (user, overrides = {}) => {
    const nomInput = screen.getByPlaceholderText(/John Doe/i);
    const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
    const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
    const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
    const password1Input = passwordInputs[0];
    const password2Input = passwordInputs[1];

    await user.type(nomInput, overrides.nom ?? 'Jean Dupont');
    await user.type(telephoneInput, overrides.telephone ?? '+33612345678');
    await user.type(emailInput, overrides.email ?? 'test@example.com');
    await user.type(password1Input, overrides.password1 ?? 'Password123');
    await user.type(password2Input, overrides.password2 ?? (overrides.password1 ?? 'Password123'));

    return { nomInput, telephoneInput, emailInput, password1Input, password2Input };
  };

  describe('Rendu du composant', () => {
    it('devrait rendre le formulaire d\'inscription avec tous les éléments', () => {
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      // Vérifier que le titre est présent
      expect(screen.getByText('DanShop')).toBeInTheDocument();
      expect(screen.getByText(/Bienvenue !/)).toBeInTheDocument();

      // Vérifier que tous les champs sont présents
      // Vérifier que les champs sont présents (utiliser getByPlaceholderText)
      expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/\+33612345678/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/exemple123@gmail.com/i)).toBeInTheDocument();
      expect(screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i).length).toBeGreaterThan(0);
      expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
    });

    it('devrait afficher le lien vers la page de connexion', () => {
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const loginLink = screen.getByRole('link', { name: /Se connecter/i });
      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveAttribute('href', '/login');
    });

    it('devrait afficher la checkbox d\'acceptation des conditions', () => {
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const checkbox = screen.getByLabelText(/Accepter la politique de confidentialité/i);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('Gestion des champs du formulaire', () => {
    it('devrait mettre à jour tous les champs lorsque l\'utilisateur tape', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];

      await user.type(nomInput, 'John Doe');
      await user.type(telephoneInput, '+33612345678');
      await user.type(emailInput, 'john@example.com');
      await user.type(password1Input, 'Password123');
      await user.type(password2Input, 'Password123');

      expect(nomInput).toHaveValue('John Doe');
      expect(telephoneInput).toHaveValue('+33612345678');
      expect(emailInput).toHaveValue('john@example.com');
      expect(password1Input).toHaveValue('Password123');
      expect(password2Input).toHaveValue('Password123');
    });
  });

  describe('Validation du formulaire - Nom', () => {
    it('devrait accepter un nom valide avec des lettres', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      await user.type(nomInput, 'Jean Dupont');

      expect(nomInput).toHaveValue('Jean Dupont');
    });

    it('devrait rejeter un nom contenant des chiffres', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const { nomInput, telephoneInput, emailInput, password1Input, password2Input } = await fillValidInscriptionForm(user, {
        nom: 'Jean123'
      });
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      await user.click(submitButton);

      await waitFor(() => {
        const errorMessage = screen.queryByText(/Le nom et prénom ne doivent pas contenir de chiffres/i);
        expect(errorMessage).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('devrait accepter des caractères accentués dans le nom', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      await user.type(nomInput, 'José García');

      expect(nomInput).toHaveValue('José García');
    });
  });

  describe('Validation du formulaire - Téléphone', () => {
    it('devrait accepter un numéro de téléphone valide', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      await user.type(telephoneInput, '+33612345678');

      expect(telephoneInput).toHaveValue('+33612345678');
    });

    it('devrait rejeter un numéro de téléphone sans le préfixe +', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      await fillValidInscriptionForm(user, {
        telephone: '0612345678'
      });
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      await user.click(submitButton);

      await waitFor(() => {
        const errorMessage = screen.queryByText(/Le numéro doit commencer par '\+' et ne contenir que des chiffres/i);
        expect(errorMessage).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('devrait rejeter un numéro de téléphone trop court', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      await fillValidInscriptionForm(user, {
        telephone: '+33612'
      });
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      await user.click(submitButton);

      await waitFor(() => {
        const errorMessage = screen.queryByText(/Le numéro doit commencer par '\+' et ne contenir que des chiffres/i);
        expect(errorMessage).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Validation du formulaire - Email', () => {
    it('devrait accepter un email valide', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      await user.type(emailInput, 'test@example.com');

      expect(emailInput).toHaveValue('test@example.com');
    });

    it('devrait rejeter un email invalide', async () => {
      const user = userEvent.setup();
      const { container } = render(<Inscription />, { wrapper: AllProvidersWrapper });

      await fillValidInscriptionForm(user, {
        email: 'email-invalide'
      });
      const checkbox = screen.getByRole('checkbox');
      const form = container.querySelector('form');

      await user.click(checkbox);
      fireEvent.submit(form);

      await waitFor(() => {
        const errorMessage = screen.queryByText(/Veuillez entrer un email valide/i);
        expect(errorMessage).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Validation du formulaire - Mot de passe', () => {
    it('devrait accepter un mot de passe valide', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const passwordInput = passwordInputs[0];
      await user.type(passwordInput, 'Password123');

      expect(passwordInput).toHaveValue('Password123');
    });

    it('devrait rejeter un mot de passe trop court', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      await fillValidInscriptionForm(user, {
        password1: 'Pass1',
        password2: 'Pass1'
      });
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      await user.click(submitButton);

      await waitFor(() => {
        const errorMessage = screen.queryByText(/Le mot de passe doit contenir/i);
        expect(errorMessage).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('devrait rejeter un mot de passe sans majuscule', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      await fillValidInscriptionForm(user, {
        password1: 'password123',
        password2: 'password123'
      });
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      await user.click(submitButton);

      await waitFor(() => {
        const errorMessage = screen.queryByText(/Le mot de passe doit contenir/i);
        expect(errorMessage).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('devrait rejeter un mot de passe sans chiffre', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      await fillValidInscriptionForm(user, {
        password1: 'Password',
        password2: 'Password'
      });
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);
      await user.click(submitButton);

      const errorMessage = await screen.findByText(/Le mot de passe doit contenir/i, { timeout: 3000 });
      expect(errorMessage).toBeInTheDocument();
    });

    it('devrait rejeter si les deux mots de passe ne correspondent pas', async () => {
      const user = userEvent.setup();
      const { container } = render(<Inscription />, { wrapper: AllProvidersWrapper });

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];
      const checkbox = screen.getByRole('checkbox');
      const form = container.querySelector('form');

      await user.type(nomInput, 'John Doe');
      await user.type(telephoneInput, '+33612345678');
      await user.type(emailInput, 'test@example.com');
      await user.type(password1Input, 'Password123');
      await user.type(password2Input, 'Password456');
      await user.click(checkbox);
      
      // Utiliser fireEvent.submit pour contourner la validation HTML5 native
      fireEvent.submit(form);

      await waitFor(() => {
        const errorMessage = screen.queryByText(/Les mots de passe ne correspondent pas/i);
        expect(errorMessage).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('devrait accepter si les deux mots de passe correspondent', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];

      await user.type(password1Input, 'Password123');
      await user.type(password2Input, 'Password123');

      expect(password1Input).toHaveValue('Password123');
      expect(password2Input).toHaveValue('Password123');
    });
  });

  describe('Gestion de la checkbox', () => {
    it('devrait mettre à jour l\'état de la checkbox lorsque l\'utilisateur clique', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('devrait empêcher la soumission si la checkbox n\'est pas cochée', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });

      await user.type(nomInput, 'John Doe');
      await user.type(telephoneInput, '+33612345678');
      await user.type(emailInput, 'john@example.com');
      await user.type(password1Input, 'Password123');
      await user.type(password2Input, 'Password123');

      // Ne pas cocher la checkbox
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Vous devez accepter la politique de confidentialité/i)).toBeInTheDocument();
      });
    });
  });

  describe('Soumission du formulaire', () => {
    it('devrait appeler la fonction login du contexte avec les bonnes données', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });
      const checkbox = screen.getByRole('checkbox');

      await user.type(nomInput, 'John Doe');
      await user.type(telephoneInput, '+33612345678');
      await user.type(emailInput, 'john@example.com');
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
      expect(savedUser.email).toBe('john@example.com');
      expect(savedUser.nom).toBe('John Doe');
      expect(savedUser.telephone).toBe('+33612345678');
    });

    it('ne devrait pas soumettre le formulaire si la validation échoue', async () => {
      const user = userEvent.setup();
      const { container } = render(<Inscription />, { wrapper: AllProvidersWrapper });

      const checkbox = screen.getByRole('checkbox');
      const form = container.querySelector('form');

      await user.click(checkbox);
      
      // Utiliser fireEvent.submit pour contourner la validation HTML5 native
      fireEvent.submit(form);

      await waitFor(() => {
        // Vérifier qu'au moins un message d'erreur est affiché
        const errorElements = document.querySelectorAll('.error-message');
        expect(errorElements.length).toBeGreaterThan(0);
      }, { timeout: 3000 });

      // Ne devrait pas avoir de message de succès
      expect(screen.queryByText(/Inscription réussie !/i)).not.toBeInTheDocument();
    });

    it('devrait afficher un message de succès après une inscription réussie', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });
      const checkbox = screen.getByRole('checkbox');

      await user.type(nomInput, 'John Doe');
      await user.type(telephoneInput, '+33612345678');
      await user.type(emailInput, 'john@example.com');
      await user.type(password1Input, 'Password123');
      await user.type(password2Input, 'Password123');
      await user.click(checkbox);
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Inscription réussie !/i)).toBeInTheDocument();
      });
    });
  });

  describe('Intégration avec le contexte', () => {
    it('devrait utiliser la fonction login du contexte AppContext', async () => {
      const user = userEvent.setup();
      render(<Inscription />, { wrapper: AllProvidersWrapper });

      const nomInput = screen.getByPlaceholderText(/John Doe/i);
      const telephoneInput = screen.getByPlaceholderText(/\+33612345678/i);
      const emailInput = screen.getByPlaceholderText(/exemple123@gmail.com/i);
      const passwordInputs = screen.getAllByPlaceholderText(/•••••••••••••••••••••••••/i);
      const password1Input = passwordInputs[0];
      const password2Input = passwordInputs[1];
      const submitButton = screen.getByRole('button', { name: /S'inscrire/i });
      const checkbox = screen.getByRole('checkbox');

      await user.type(nomInput, 'Jane Smith');
      await user.type(telephoneInput, '+33798765432');
      await user.type(emailInput, 'jane@example.com');
      await user.type(password1Input, 'SecurePass123');
      await user.type(password2Input, 'SecurePass123');
      await user.click(checkbox);
      await user.click(submitButton);

      await waitFor(() => {
        const savedUser = JSON.parse(localStorage.getItem('danShopUser'));
        expect(savedUser).toBeTruthy();
        expect(savedUser.email).toBe('jane@example.com');
        expect(savedUser.nom).toBe('Jane Smith');
        expect(savedUser.telephone).toBe('+33798765432');
      });
    });
  });
});
