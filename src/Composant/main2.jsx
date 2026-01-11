/**
 * Composant Main2 - Configuration des routes de l'application
 * 
 * Utilise React Router pour gérer la navigation entre les différentes pages
 * Toutes les routes de l'application sont définies ici
 */

import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Inscription from "./Inscription";
import Catalogue from "./Catalogue";
import Panier from "./Panier";
import EspaceClient from "./EspaceClient";
import Contact from "./Contact";

function Main2() {
  return (
    <main className="main-content">
      <Routes>
        {/* Route principale - Page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Routes d'authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/inscription" element={<Inscription />} />

        {/* Routes principales de l'application */}
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/espace-client" element={<EspaceClient />} />
        <Route path="/contact" element={<Contact />} />

        {/* Route par défaut - Redirection vers la page d'accueil */}
        <Route path="*" element={<Home />} />
      </Routes>
    </main>
  );
}

export default Main2;
