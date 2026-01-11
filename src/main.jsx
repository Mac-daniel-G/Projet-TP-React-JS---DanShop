/**
 * Point d'entrée principal de l'application React
 * 
 * Ce fichier initialise l'application React et la rend dans le DOM
 * Il enveloppe l'application avec le Provider du contexte global
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import MyAPP2 from './Composant/MyAPP2.jsx';
import './index.css';

// Récupération de l'élément root du DOM
const rootElement = document.getElementById('root');

// Création du root React
const root = createRoot(rootElement);

// Rendu de l'application
// AppProvider enveloppe toute l'application pour fournir le contexte global
// StrictMode active des vérifications supplémentaires en développement
root.render(
  <StrictMode>
    <AppProvider>
      <MyAPP2 />
    </AppProvider>
  </StrictMode>
);
