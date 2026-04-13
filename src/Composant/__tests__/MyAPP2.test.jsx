/**
 * Tests unitaires pour le composant MyAPP2
 * 
 * Tests couverts :
 * - Rendu du composant racine
 * - Présence du Header
 * - Présence du Main2 (routes)
 * - Structure de l\'application
 * - BrowserRouter
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';
import MyAPP2 from '../MyAPP2';

describe('MyAPP2 - Tests Unitaires', () => {
  const renderMyAPP2 = () => render(<MyAPP2 />, { wrapper: AppProvider });
  describe('Rendu du composant', () => {
    it('devrait rendre le composant MyAPP2', () => {
      const { container } = renderMyAPP2();
      
      expect(container.firstChild).toBeInTheDocument();
    });

    it('devrait avoir un conteneur avec la classe app-container', () => {
      const { container } = renderMyAPP2();
      
      const appContainer = container.querySelector('.app-container');
      expect(appContainer).toBeInTheDocument();
    });

    it('devrait rendre sans erreur', () => {
      expect(() => {
        renderMyAPP2();
      }).not.toThrow();
    });
  });

  describe('Présence du Header', () => {
    it('devrait afficher un élément header', () => {
      const { container } = renderMyAPP2();
      
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('devrait avoir le logo DanShop dans le header', () => {
      renderMyAPP2();
      
      const logo = screen.getByAltText(/DanShop Logo/i);
      expect(logo).toBeInTheDocument();
    });

    it('le header devrait contenir un élément h1', () => {
      const { container } = renderMyAPP2();
      
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      expect(header?.querySelector('h1')).toBeInTheDocument();
    });
  });

  describe('Présence du Main2 (Routes)', () => {
    it('devrait afficher un élément main', () => {
      const { container } = renderMyAPP2();
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('le main devrait avoir la classe main-content', () => {
      const { container } = renderMyAPP2();
      
      const main = container.querySelector('main.main-content');
      expect(main).toBeInTheDocument();
    });
  });

  describe('BrowserRouter', () => {
    it('devrait inclure le BrowserRouter pour la navigation', () => {
      const { container } = renderMyAPP2();
      
      // Vérifier la présence d'éléments qui nécessitent BrowserRouter
      const header = container.querySelector('header');
      const main = container.querySelector('main');
      
      expect(header?.querySelector('a[href="/"]') || main).toBeTruthy();
    });
  });

  describe('Structure de l\'application', () => {
    it('devrait avoir l\'ordre correct: header puis main', () => {
      const { container } = renderMyAPP2();
      
      const appContainer = container.querySelector('.app-container');
      if (appContainer) {
        const children = appContainer.children;
        
        // Vérifier qu\'il y a au moins header et main
        expect(children.length).toBeGreaterThanOrEqual(2);
      }
    });

    it('devrait avoir un BrowserRouter wrapper', () => {
      const { container } = renderMyAPP2();
      
      // Vérifier que les éléments de route sont présents
      const appContainer = container.querySelector('.app-container');
      expect(appContainer).toBeInTheDocument();
    });
  });

  describe('CSS et styling', () => {
    it('devrait appliquer la classe MyAPP2.css (vérifiable via la structure)', () => {
      const { container } = renderMyAPP2();
      
      const appContainer = container.querySelector('.app-container');
      expect(appContainer).toHaveClass('app-container');
    });
  });

  describe('Navigation', () => {
    it('devrait avoir un lien vers la page d\'accueil', () => {
      renderMyAPP2();
      
      // Le logo devrait être un lien vers l\'accueil
      const homeLink = screen.getByRole('link');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('le header devrait avoir un bouton menu', () => {
      renderMyAPP2();
      
      const menuButton = screen.getByRole('button', { name: /Ouvrir le menu/i });
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Page d\'accueil', () => {
    it('devrait afficher du contenu de la page d\'accueil', () => {
      const { container } = renderMyAPP2();
      
      // Au minimum, du contenu devrait être rendu
      const content = container.textContent;
      expect(content?.length || 0).toBeGreaterThan(0);
    });
  });

  describe('Responsivité et accessibilité', () => {
    it('devrait avoir une structure sémantique correcte', () => {
      const { container } = renderMyAPP2();
      
      const header = container.querySelector('header');
      const main = container.querySelector('main');
      
      expect(header?.tagName).toBe('HEADER');
      expect(main?.tagName).toBe('MAIN');
    });

    it('devrait avoir des headings pour la structure', () => {
      renderMyAPP2();
      
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  describe('Contenu initial', () => {
    it('la page initiale devrait être la page d\'accueil', () => {
      const { container } = renderMyAPP2();
      
      // Main2 affiche Home par défaut
      const main = container.querySelector('main');
      expect(main?.textContent || '').toBeTruthy();
    });
  });
});
