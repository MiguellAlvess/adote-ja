import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext, useState } from "react";
import { Context } from "../../context/UserContext";
import Logo from "../../assets/img/logo.png";

const Navbar = () => {
  const { authenticated, logout } = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="AdoteJá" />
        <h2>AdoteJá</h2>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/pets/mypets">Meus Pets</Link>
            </li>
            <li>
              <Link to="/pets/myadoptions">Minhas adoções</Link>
            </li>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Registrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
