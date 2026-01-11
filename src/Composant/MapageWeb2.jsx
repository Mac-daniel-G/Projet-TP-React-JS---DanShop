// MaPageWeb.jsx
import './MapageWeb2.css';

export default function MaPageWeb() {
  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <h1>Bienvenue sur ma page</h1> 
        
      </header>

      {/* Main Content */}
      <main className="main-content">
        <section className="content-section">
          <h2>Contenu principal</h2>
          <p>
            Ceci est la section principale de la page. Vous pouvez y ajouter du texte, 
            des images ou tout autre contenu.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 MonSiteWeb. Tous droits réservés.</p>
      </footer>
    </div>
  );
}