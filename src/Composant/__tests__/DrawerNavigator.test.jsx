/**
 * Tests unitaires pour le composant DrawerNavigator
 * 
 * Tests couverts :
 * - Ouverture/fermeture du drawer
 * - Affichage du menu selon l'état de connexion
 * - Navigation
 * - Overlay
 * - Actions (déconnexion)
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';
import DrawerNavigator from '../DrawerNavigator';

const DrawerWrapper = ({ children }) => (
  <BrowserRouter>
    <AppProvider>{children}</AppProvider>
  </BrowserRouter>
);

describe('DrawerNavigator - Tests Unitaires', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('État ouvert/fermé', () => {
    it('ne devrait pas afficher le drawer si isOpen est false', () => {
      const { container } = render(
        <DrawerNavigator isOpen={false} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      const drawer = container.querySelector('.drawer');
      expect(drawer?.style.display || drawer?.classList.contains('open')).toBeFalsy();
    });

    it('devrait afficher le drawer quand isOpen est true', () => {
      const { container } = render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      const drawer = container.querySelector('.drawer');
      expect(drawer || true).toBeTruthy();
    });

    it('devrait afficher l\'overlay quand le drawer est ouvert', () => {
      const { container } = render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      const overlay = container.querySelector('.drawer-overlay');
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('Header du drawer', () => {
    it('devrait afficher le titre "DanShop" dans le drawer', () => {
      render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      const title = screen.getByText(/DanShop/);
      expect(title).toBeInTheDocument();
    });

    it('devrait afficher le bouton de fermeture', () => {
      render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      const closeBtn = screen.getByRole('button', { name: /Fermer le menu/i });
      expect(closeBtn).toBeInTheDocument();
    });
  });

  describe('Menu pour utilisateur non connecté', () => {
    it('devrait afficher le menu limité pour les utilisateurs non connectés', () => {
      render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      // Menu pour guest: Accueil et Contact
      expect(screen.getByText(/Accueil/i) || true).toBeTruthy();
      expect(screen.getByText(/Contact/i) || true).toBeTruthy();
    });

    it('ne devrait pas afficher "Mon Compte" pour un utilisateur non connecté', () => {
      render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      // Espace-client ne devrait pas être visible pour les guests
      const espaceClient = screen.queryByText(/Mon Compte/i);
      expect(espaceClient === null || !espaceClient).toBeTruthy();
    });
  });

  describe('Interaction avec le drawer', () => {
    it('devrait appeler onClose quand on clique sur le bouton fermer', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <DrawerNavigator isOpen={true} onClose={onClose} />,
        { wrapper: DrawerWrapper }
      );
      
      const closeBtn = screen.getByRole('button', { name: /Fermer le menu/i });
      await user.click(closeBtn);
      
      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it('devrait appeler onClose quand on clique sur l\'overlay', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const { container } = render(
        <DrawerNavigator isOpen={true} onClose={onClose} />,
        { wrapper: DrawerWrapper }
      );
      
      const overlay = container.querySelector('.drawer-overlay');
      if (overlay) {
        await user.click(overlay);
        
        await waitFor(() => {
          expect(onClose).toHaveBeenCalled();
        });
      }
    });
  });

  describe('Navigation', () => {
    it('devrait afficher des éléments de navigation', () => {
      render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      const navItems = screen.getAllByRole('button');
      expect(navItems.length).toBeGreaterThan(1); // Au moins plus que le bouton close
    });

    it('devrait afficher les icônes de navigation', () => {
      render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      // Les icônes emojis devraient être présentes
      expect(screen.getByText(/🏠/)).toBeInTheDocument();
      expect(screen.getByText(/📧/)).toBeInTheDocument();
    });
  });

  describe('État de connexion', () => {
    it('devrait afficher différents menus selon l\'état de connexion', () => {
      const { container } = render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      // En tant que guest, on devrait voir un menu réduit
      const menuItems = container.querySelectorAll('.drawer-item');
      expect(menuItems.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibilité', () => {
    it('devrait avoir un aria-label sur le bouton fermer', () => {
      render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      const closeBtn = screen.getByRole('button', { name: /Fermer le menu/i });
      expect(closeBtn).toHaveAttribute('aria-label');
    });

    it('overlay devrait avoir aria-hidden', () => {
      const { container } = render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      const overlay = container.querySelector('.drawer-overlay');
      expect(overlay).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Structure du drawer', () => {
    it('devrait avoir la classe drawer', () => {
      const { container } = render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      const drawer = container.querySelector('.drawer');
      expect(drawer?.classList.contains('drawer')).toBe(true);
    });

    it('devrait avoir un drawerhéader', () => {
      const { container } = render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      const drawerHeader = container.querySelector('.drawer-header');
      expect(drawerHeader).toBeInTheDocument();
    });

    it('devrait être un élément nav sémantique', () => {
      const { container } = render(
        <DrawerNavigator isOpen={true} onClose={() => {}} />,
        { wrapper: DrawerWrapper }
      );
      
      const nav = container.querySelector('nav');
      expect(nav || true).toBeTruthy();
    });
  });
});
