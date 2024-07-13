import React from "react";
import "./Header.scss";
import espeLogo from "../../assets/images/espe-logo.png";
import deccLogo from "../../assets/images/decc-logo.png";

const Header = () => (
  <header className="header">
    <img src={espeLogo} alt="ESPE Logo" className="header__logo" />
    <h1 className="header__title">
      Departamento de Ciencias de la Computación
    </h1>
    <img
      src={deccLogo}
      alt="DECC Logo"
      className="header__logo header__logo-right"
    />
  </header>
);

export default Header;
