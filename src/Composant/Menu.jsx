
import { Link } from "react-router-dom";

const Menu = () => {
  return (
  
        <nav style={{
            padding: '10px',
            backgroundColor: "lightgray",
            marginBottom: '10px',
            marginRight: '10px',
            marginLeft: '10px'
        }}>
            <Link to="/" style={{
                marginRight: '10px', textDecoration: 'none', color : 'black'
            }}>Accueil</Link>
            <Link to="/login" style={{
                marginRight: '10px', textDecoration: 'none', color : 'black'
            }}>Connexion</Link>
            <Link to="/inscription" style={{
                marginRight: '10px', textDecoration: 'none', color : 'black'
            }}>Inscription</Link>
            
        </nav>  

  
    
  );
};

export default Menu;