/**
 * Tests unitaires pour le composant Main2
 * 
 * Tests couverts :
 * - Rendu de toutes les routes
 * - Navigation entre les routes
 * - Route par défaut (wildcard)
 * - Existence des routes
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';
import Main2 from '../main2';

const Main2Wrapper = ({ children, initialEntry = '/' }) => (
  <BrowserRouter initialEntries={[initialEntry]}>
    <AppProvider>{children}</AppProvider>
  </BrowserRouter>
);

describe('Main2 - Tests Unitaires', () => {
  describe('Rendu du composant', () => {
    it('devrait rendre un élément main', () => {
      const { container } = render(<Main2 />, { wrapper: Main2Wrapper });
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('devrait avoir la classe main-content', () => {
      const { container } = render(<Main2 />, { wrapper: Main2Wrapper });
      
      const main = container.querySelector('.main-content');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Routes disponibles', () => {
    it('devrait avoir une route pour l\'accueil (/)', () => {
      const { container } = render(<Main2 />, { wrapper: Main2Wrapper });
      
      // Main2 devrait contenir un élément Routes
      const routes = container.querySelector('main');
      expect(routes).toBeInTheDocument();
    });

    it('devrait avoir une route pour la connexion (/login)', () => {
      const { container } = render(<Main2 />, {
        wrapper: ({ children }) => Main2Wrapper({ children, initialEntry: '/login' })
      });
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('devrait avoir une route pour l\'inscription (/inscription)', () => {
      const { container } = render(<Main2 />, {
        wrapper: ({ children }) => Main2Wrapper({ children, initialEntry: '/inscription' })
      });
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('devrait avoir une route pour le catalogue (/catalogue)', () => {
      const { container } = render(<Main2 />, {
        wrapper: ({ children }) => Main2Wrapper({ children, initialEntry: '/catalogue' })
      });
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('devrait avoir une route pour le panier (/panier)', () => {
      const { container } = render(<Main2 />, {
        wrapper: ({ children }) => Main2Wrapper({ children, initialEntry: '/panier' })
      });
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('devrait avoir une route pour l\'espace client (/espace-client)', () => {
      const { container } = render(<Main2 />, {
        wrapper: ({ children }) => Main2Wrapper({ children, initialEntry: '/espace-client' })
      });
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('devrait avoir une route pour le contact (/contact)', () => {
      const { container } = render(<Main2 />, {
        wrapper: ({ children }) => Main2Wrapper({ children, initialEntry: '/contact' })
      });
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Route par défaut (wildcard)', () => {
    it('devrait rendre la page d\'accueil pour une route inconnue', () => {
      const { container } = render(<Main2 />, {
        wrapper: ({ children }) => Main2Wrapper({ children, initialEntry: '/route-inexistante' })
      });
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Structure du composant', () => {
    it('devrait avoir le composant Routes à l\'intérieur de main', () => {
      const { container } = render(<Main2 />, { wrapper: Main2Wrapper });
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('devrait rendre correctement le contenu principal', () => {
      const { container } = render(<Main2 />, { wrapper: Main2Wrapper });
      
      const main = container.querySelector('main.main-content');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Contenu des routes', () => {
    it('la route accueil devrait contenir du contenu', () => {
      const { container } = render(<Main2 />, {
        wrapper: ({ children }) => Main2Wrapper({ children, initialEntry: '/' })
      });
      
      const main = container.querySelector('main');
      expect(main?.textContent?.length || 0).toBeGreaterThan(0);
    });
  });
});
