/**
 * Utilitaires pour les tests
 * Fournit des helpers pour wrapper les composants avec les providers nécessaires
 */

import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';

/**
 * Wrapper pour tester les composants qui nécessitent le Router
 */
export const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

/**
 * Wrapper pour tester les composants qui nécessitent le Context
 */
export const ContextWrapper = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};

/**
 * Wrapper complet pour tester les composants avec Router et Context
 */
export const AllProvidersWrapper = ({ children }) => {
  return (
    <BrowserRouter>
      <AppProvider>{children}</AppProvider>
    </BrowserRouter>
  );
};

/**
 * Fonction helper pour créer un événement de changement d'input
 */
export const createChangeEvent = (name, value) => {
  return {
    target: {
      name,
      value,
    },
    preventDefault: () => {},
  };
};

/**
 * Fonction helper pour créer un événement de soumission de formulaire
 */
export const createSubmitEvent = () => {
  return {
    preventDefault: () => {},
  };
};
