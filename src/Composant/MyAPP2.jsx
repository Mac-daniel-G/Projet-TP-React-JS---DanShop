/**
 * Composant MyAPP2 - Composant racine principal de l'application
 * 
 * Ce composant enveloppe toute l'application avec le BrowserRouter
 * et le Header qui est commun à toutes les pages
 */

import { BrowserRouter } from "react-router-dom";
import Header from "./Header.jsx";
import Main2 from "./main2.jsx";
import './MyAPP2.css';

export default function MyAPP2() {
  return (
    <div className="app-container">
      {/* BrowserRouter permet la navigation entre les pages */}
      <BrowserRouter>
        {/* Header commun à toutes les pages */}
        <Header />
        
        {/* Contenu principal avec les routes */}
        <Main2 />
      </BrowserRouter>
    </div>
  );
}
