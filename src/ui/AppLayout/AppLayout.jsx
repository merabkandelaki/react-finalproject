import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import NavBarItem from "../../components/NavBar/NavBarItem/NavBarItem";
import LogoNavbar from '../../assets/books_logo.png';
import { useAuthCont } from "../../context/AuthContext";
import Footer from "../../components/Footer/Footer";
import "./AppLayout.css";
import './Mobile.css';

function AppLayout() {
  const navigate = useNavigate();
  const { isAuth, logout, user } = useAuthCont();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthAction = () => {
    if (isAuth) {
      logout();
    }
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app-layout">
      <NavBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}>
        <div className="logo-navbar-item">
          <img src={LogoNavbar} alt="logo" className="logo-navbar" />
          <NavBarItem title="Home" to="/" />
          <NavBarItem title="Favorites" to="/favorites" />
        </div>
        <div className="navbar-user-info">
          <span className="user-firstname">{isAuth && user.firstName}</span>
          <button className="navbar-login-button" onClick={handleAuthAction}>
            {isAuth ? "Log out" : "Login"}
          </button>
        </div>
      </NavBar>
      <div className="app-layout-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
