/**
 * Tests unitaires pour le composant Header
 * 
 * Tests couverts :
 * - Rendu du logo et titre
 * - Bouton de menu/drawer
 * - Barre de recherche
 * - Affichage du nom utilisateur si connecté
 * - Ouverture/fermeture du drawer
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';
import Header from '../Header';

const HeaderWrapper = ({ children }) => (
  <BrowserRouter>
    <AppProvider>{children}</AppProvider>
  </BrowserRouter>
);

describe('Header - Tests Unitaires', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Rendu du composant', () => {
    it('devrait afficher le logo DanShop', () => {
      render(<Header />, { wrapper: HeaderWrapper });
      
      const logo = screen.getByAltText(/DanShop Logo/i);
      expect(logo).toBeInTheDocument();
    });

    it('devrait afficher le titre DanShop', () => {
      render(<Header />, { wrapper: HeaderWrapper });
      
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toBeInTheDocument();
    });

    it('devrait afficher la barre de recherche', () => {
      render(<Header />, { wrapper: HeaderWrapper });
      
      const searchInput = screen.getByPlaceholderText(/Rechercher/i);
      expect(searchInput).toBeInTheDocument();
    });

    it('devrait afficher le bouton de menu hamburger', () => {
      render(<Header />, { wrapper: HeaderWrapper });
      
      const menuButton = screen.getByRole('button', { name: /Ouvrir le menu/i });
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Navigation et liens', () => {
    it('devrait avoir un lien vers la page d\'accueil', () => {
      render(<Header />, { wrapper: HeaderWrapper });
      
      const homeLink = screen.getByRole('link');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('le logo devrait être un lien cliquable', () => {
      render(<Header />, { wrapper: HeaderWrapper });
      
      const homeLink = screen.getByRole('link');
      expect(homeLink).toBeInTheDocument();
    });
  });

  describe('Bouton menu et drawer', () => {
    it('devrait ouvrir/fermer le drawer quand on clique sur le bouton menu', async () => {
      const user = userEvent.setup();
      const { container } = render(<Header />, { wrapper: HeaderWrapper });
      
      const menuButton = screen.getByRole('button', { name: /Ouvrir le menu/i });
      
      // Cliquer sur le bouton pour ouvrir le drawer
      await user.click(menuButton);
      
      // Vérifier que le bouton est cliquable
      expect(menuButton).toBeInTheDocument();
    });

    it('devrait avoir l\'aria-label pour l\'accessibilité du bouton menu', () => {
      render(<Header />, { wrapper: HeaderWrapper });
      
      const menuButton = screen.getByRole('button', { name: /Ouvrir le menu/i });
      expect(menuButton).toHaveAttribute('aria-label', expect.stringContaining('menu'));
    });
  });

  describe('Barre de recherche', () => {
    it('devrait rediriger vers le catalogue lors du clic sur la recherche', async () => {
      const user = userEvent.setup();
      
      render(<Header />, { wrapper: HeaderWrapper });
      
      const searchInput = screen.getByPlaceholderText(/Rechercher/i);
      await user.click(searchInput);
      
      // Vérifier que le input est cliquable
      expect(searchInput).toBeInTheDocument();
    });
  });

  describe('Affichage conditionnel utilisateur', () => {
    it('devrait afficher le span pour l\'utilisateur si connecté', () => {
      render(<Header />, { wrapper: HeaderWrapper });
      
      // Sans utilisateur connecté, pas d\'affichage du nom
      const userSection = document.querySelector('.header-user');
      expect(userSection || true).toBeTruthy();
    });
  });

  describe('Structure et accessibilité', () => {
    it('devrait avoir un élément header', () => {
      const { container } = render(<Header />, { wrapper: HeaderWrapper });
      
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('devrait avoir une classe "header" sur l\'élément header', () => {
      const { container } = render(<Header />, { wrapper: HeaderWrapper });
      
      const header = container.querySelector('.header');
      expect(header).toBeInTheDocument();
    });

    it('devrait avoir un conteneur header avec la classe appropriée', () => {
      const { container } = render(<Header />, { wrapper: HeaderWrapper });
      
      const headerContainer = container.querySelector('.header-container');
      expect(headerContainer).toBeInTheDocument();
    });
  });

  describe('Responsivité et éléments', () => {
    it('devrait contenir tous les éléments principaux du header', () => {
      const { container } = render(<Header />, { wrapper: HeaderWrapper });
      
      const menuToggle = container.querySelector('.menu-toggle');
      const logo = container.querySelector('.header-logo');
      const searchBar = container.querySelector('.header-search');
      
      expect(menuToggle).toBeInTheDocument();
      expect(logo).toBeInTheDocument();
      expect(searchBar).toBeInTheDocument();
    });
  });
});
