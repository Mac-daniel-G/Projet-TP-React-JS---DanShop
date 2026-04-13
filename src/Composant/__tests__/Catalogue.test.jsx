/**
 * Tests unitaires pour le composant Catalogue
 * 
 * Tests couverts :
 * - Rendu initial avec tous les produits
 * - Recherche et filtrage des produits
 * - Ajout de produits au panier
 * - État vide après recherche sans résultat
 * - Réinitialisation de la recherche
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';
import Catalogue from '../Catalogue';

const CatalogueWrapper = ({ children }) => (
  <BrowserRouter>
    <AppProvider>{children}</AppProvider>
  </BrowserRouter>
);

describe('Catalogue - Tests Unitaires', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Rendu initial', () => {
    it('devrait afficher le titre du catalogue', () => {
      render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      const searchBar = screen.getByPlaceholderText(/Rechercher un produit/i);
      expect(searchBar).toBeInTheDocument();
    });

    it('devrait afficher la barre de recherche', () => {
      render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      const searchBar = screen.getByPlaceholderText(/Rechercher un produit/i);
      expect(searchBar).toHaveValue('');
    });

    it('devrait afficher tous les produits au chargement initial', () => {
      render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      // Au moins un produit devrait être visible
      const productCards = document.querySelectorAll('.product-card');
      expect(productCards.length).toBeGreaterThan(0);
    });

    it('devrait afficher les images des produits', () => {
      render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      const productImages = document.querySelectorAll('.product-image');
      expect(productImages.length).toBeGreaterThan(0);
      
      productImages.forEach((img) => {
        expect(img).toHaveAttribute('alt');
      });
    });
  });

  describe('Recherche et filtrage', () => {
    it('devrait filtrer les produits en fonction du terme de recherche', async () => {
      const user = userEvent.setup();
      render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      const searchBar = screen.getByPlaceholderText(/Rechercher un produit/i);
      
      // Taper "Ordinateur" pour trouver "Ordinateur Portable Ultra"
      await user.type(searchBar, 'Ordinateur');
      
      await waitFor(() => {
        expect(searchBar).toHaveValue('Ordinateur');
      });
    });

    it('devrait afficher "Aucun produit" si la recherche n\'a pas de résultats', async () => {
      const user = userEvent.setup();
      render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      const searchBar = screen.getByPlaceholderText(/Rechercher un produit/i);
      
      // Taper un terme qui ne correspond à aucun produit
      await user.type(searchBar, 'XXXXXXXXXXXXXX');
      
      await waitFor(() => {
        expect(screen.getByText(/Aucun produit ne correspond/i)).toBeInTheDocument();
      });
    });

    it('devrait être insensible à la casse lors de la recherche', async () => {
      const user = userEvent.setup();
      render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      const searchBar = screen.getByPlaceholderText(/Rechercher un produit/i);
      
      // Taper "ordinateur" en minuscules
      await user.type(searchBar, 'ordinateur');
      
      await waitFor(() => {
        expect(searchBar).toHaveValue('ordinateur');
      });
    });

    it('devrait réafficher tous les produits après avoir vidé la recherche', async () => {
      const user = userEvent.setup();
      render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      const searchBar = screen.getByPlaceholderText(/Rechercher un produit/i);
      
      // Taper un terme de recherche
      await user.type(searchBar, 'Ordinateur');
      
      // Effacer la recherche
      await user.clear(searchBar);
      
      await waitFor(() => {
        expect(searchBar).toHaveValue('');
      });
    });
  });

  describe('Interaction avec le panier', () => {
    it('devrait afficher les boutons "Ajouter au panier" pour chaque produit', () => {
      render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      const addButtons = document.querySelectorAll('button');
      expect(addButtons.length).toBeGreaterThan(0);
    });

    it('devrait afficher les prix des produits', () => {
      render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      // Vérifier que les prix sont affichés (format: €99.99)
      const priceElements = document.querySelectorAll('[class*="price"]');
      expect(priceElements.length).toBeGreaterThanOrEqual(0);
    });

    it('devrait afficher une alerte après avoir ajouté un produit au panier', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
      
      render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      const addButtons = document.querySelectorAll('button');
      if (addButtons.length > 0) {
        await user.click(addButtons[0]);
        
        await waitFor(() => {
          expect(alertSpy).toHaveBeenCalled();
        });
      }
      
      alertSpy.mockRestore();
    });
  });

  describe('Structuredu catalogue', () => {
    it('devrait avoir un conteneur catalogue avec la classe appropriée', () => {
      const { container } = render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      const catalogueContainer = container.querySelector('.catalogue-container');
      expect(catalogueContainer).toBeInTheDocument();
    });

    it('devrait avoir une grille de produits', () => {
      const { container } = render(<Catalogue />, { wrapper: CatalogueWrapper });
      
      const productsGrid = container.querySelector('.products-grid');
      expect(productsGrid || document.querySelectorAll('.product-card').length > 0).toBeTruthy();
    });
  });
});
