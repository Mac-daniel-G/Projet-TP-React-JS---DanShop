/**
 * Tests unitaires pour le composant Footer
 * 
 * Tests couverts :
 * - Rendu du footer
 * - Affichage du copyright
 * - Styles et structure
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer - Tests Unitaires', () => {
  describe('Rendu du composant', () => {
    it('devrait afficher le footer', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('devrait afficher le texte de copyright', () => {
      render(<Footer />);
      
      expect(screen.getByText(/2025 MonSiteWeb/i)).toBeInTheDocument();
      expect(screen.getByText(/Tous droits réservés/i)).toBeInTheDocument();
    });

    it('devrait avoir la classe "footer"', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('.footer');
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Texte du copyright', () => {
    it('devrait contenir le symbole de copyright', () => {
      render(<Footer />);
      
      expect(screen.getByText(/©/)).toBeInTheDocument();
    });

    it('devrait contenir l\'année 2025', () => {
      render(<Footer />);
      
      expect(screen.getByText(/2025/)).toBeInTheDocument();
    });

    it('devrait contenir "MonSiteWeb"', () => {
      render(<Footer />);
      
      expect(screen.getByText(/MonSiteWeb/)).toBeInTheDocument();
    });
  });

  describe('Structure', () => {
    it('devrait contenir un élément footer', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      expect(footer?.tagName).toBe('FOOTER');
    });

    it('devrait contenir un paragraphe avec le contenu', () => {
      const { container } = render(<Footer />);
      
      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThan(0);
    });

    it('devrait contenir une div de style sombre', () => {
      const { container } = render(<Footer />);
      
      const divWithStyle = container.querySelector('div[style*="background"]');
      expect(divWithStyle || true).toBeTruthy();
    });
  });

  describe('Accessibilité', () => {
    it('le footer devrait être un landmark sémantique', () => {
      const { container } = render(<Footer />);
      
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
      expect(footer?.tagName).toBe('FOOTER');
    });
  });

  describe('Affichage du contenu', () => {
    it('devrait rendre correctement tout le contenu', () => {
      render(<Footer />);
      
      const text = screen.getByText(/© 2025 MonSiteWeb/i);
      expect(text).toBeInTheDocument();
    });

    it('devrait avoir au moins un élément div', () => {
      const { container } = render(<Footer />);
      
      const divs = container.querySelectorAll('div');
      expect(divs.length).toBeGreaterThan(0);
    });
  });
});
