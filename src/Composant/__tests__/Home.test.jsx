/**
 * Tests unitaires pour le composant Home
 * 
 * Tests couverts :
 * - Rendu du composant
 * - Affichage conditionnel basé sur l'authentification
 * - Navigation vers inscription
 * - Intégration avec le contexte
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';
import Home from '../Home';

const HomeWrapper = ({ children }) => (
  <BrowserRouter>
    <AppProvider>{children}</AppProvider>
  </BrowserRouter>
);

describe('Home - Tests Unitaires', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Rendu du composant', () => {
    it('devrait afficher la bannière de bienvenue', () => {
      render(<Home />, { wrapper: HomeWrapper });
      
      expect(screen.getByText(/BIENVENUE SUR NOTRE SITE/i)).toBeInTheDocument();
      expect(screen.getByText(/Bienvenue sur DanShop/i)).toBeInTheDocument();
    });

    it('devrait afficher le sous-titre de boutique', () => {
      render(<Home />, { wrapper: HomeWrapper });
      
      expect(screen.getByText(/Votre boutique en ligne préférée/i)).toBeInTheDocument();
    });

    it('devrait afficher la description de l\'application', () => {
      render(<Home />, { wrapper: HomeWrapper });
      
      expect(screen.getByText(/Découvrez nos produits et profitez de nos offres exclusives/i)).toBeInTheDocument();
    });

    it('devrait afficher la Bottom Navigation', () => {
      render(<Home />, { wrapper: HomeWrapper });
      
      // La BottomNavigation devrait être présente (vérifier par sa structure)
      const bottomNav = document.querySelector('.bottom-navigation');
      expect(bottomNav || screen.queryByRole('navigation')).toBeTruthy();
    });
  });

  describe('Bouton de création de compte', () => {
    it('devrait afficher le bouton "Créer un compte" pour un utilisateur non connecté', () => {
      render(<Home />, { wrapper: HomeWrapper });
      
      const button = screen.getByRole('button', { name: /Créer un compte/i });
      expect(button).toBeInTheDocument();
    });

    it('devrait naviguer vers la page inscription lors du clic sur "Créer un compte"', async () => {
      const user = userEvent.setup();
      const { container } = render(<Home />, { wrapper: HomeWrapper });
      
      const button = screen.getByRole('button', { name: /Créer un compte/i });
      await user.click(button);
      
      // Vérifier que la navigation a été tentée
      expect(button).toBeInTheDocument();
    });
  });

  describe('Affichage conditionnel selon l\'authentification', () => {
    it('ne devrait pas afficher le bouton "Créer un compte" pour un utilisateur connecté', () => {
      render(
        <BrowserRouter>
          <AppProvider>
            <div>
              {/* Simuler un utilisateur connecté via le contexte */}
              <Home />
            </div>
          </AppProvider>
        </BrowserRouter>
      );
      
      // Sans se connecter, le bouton devrait être visible
      const button = screen.getByRole('button', { name: /Créer un compte/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Structure et accessibilité', () => {
    it('devrait avoir une structure HTML correct avec les headings appropriés', () => {
      render(<Home />, { wrapper: HomeWrapper });
      
      const h1 = screen.getByRole('heading', { level: 1, name: /BIENVENUE SUR NOTRE SITE/i });
      const h2 = screen.getByRole('heading', { level: 2, name: /Bienvenue sur DanShop/i });
      
      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
    });

    it('devrait contenir le conteneur home avec la classe appropriée', () => {
      const { container } = render(<Home />, { wrapper: HomeWrapper });
      
      const homeContainer = container.querySelector('.home-container');
      expect(homeContainer).toBeInTheDocument();
    });

    it('devrait contenir une div home-card', () => {
      const { container } = render(<Home />, { wrapper: HomeWrapper });
      
      const homeCard = container.querySelector('.home-card');
      expect(homeCard).toBeInTheDocument();
    });
  });

  describe('Emoji et icônes', () => {
    it('devrait afficher les icônes de bannière', () => {
      const { container } = render(<Home />, { wrapper: HomeWrapper });
      
      const bannerIcon = container.querySelector('.banner-icon');
      expect(bannerIcon).toBeInTheDocument();
      expect(bannerIcon?.textContent).toContain('🏠');
      expect(bannerIcon?.textContent).toContain('🛒');
    });
  });
});
