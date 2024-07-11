import React from "react";
import "./Sidebar.scss";

const Sidebar = ({ selectedMenu }) => (
  <div className="sidebar">
    <div className="sidebar__admin">
      <span className="sidebar__admin-text">Administrador</span>
    </div>
    <nav className="sidebar__nav">
      <ul>
        <li className={selectedMenu === "personal" ? "active" : ""}>
          Personal
        </li>
        <li className={selectedMenu === "registrar" ? "active" : ""}>
          Registrar nuevo
        </li>
        <li className={selectedMenu === "horarios" ? "active" : ""}>
          Horarios
        </li>
        <li className={selectedMenu === "reportes" ? "active" : ""}>
          Reportes
        </li>
        <li className={selectedMenu === "usuarios" ? "active" : ""}>
          Usuarios
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
