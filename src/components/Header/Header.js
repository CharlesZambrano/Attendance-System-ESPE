import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.scss";
import espeLogo from "../../assets/images/espe-logo.png";
import deccLogo from "../../assets/images/decc-logo.png";

const Header = () => {
  const location = useLocation();
  const isLoggedIn = location.pathname !== "/login";

  return (
    <header className={`header ${isLoggedIn ? "header-logged-in" : ""}`}>
      <div className="logo">
        <img src={espeLogo} alt="ESPE Logo" />
      </div>
      {isLoggedIn && (
        <div className="title">
          <h1>Departamento de Ciencias de la Computación</h1>
        </div>
      )}
      <div className="logo">
        <img src={deccLogo} alt="DECC Logo" />
      </div>
    </header>
  );
};

export default Header;
