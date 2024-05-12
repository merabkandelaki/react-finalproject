import React from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "../NavBar/NavBar.css";
import '../NavBar/Mobile.css'

function NavBar({ children, isMenuOpen, toggleMenu }) {
  return (
    <div className={`nav-bar ${isMenuOpen ? "open" : ""}`}>
      <div className="burger-menu" onClick={toggleMenu}>
        {isMenuOpen ? (
          <AiOutlineClose className="menu-icon" />
        ) : (
          <AiOutlineMenu className="menu-icon" />
        )}
      </div>
      {children}
    </div>
  );
}

export default NavBar;
