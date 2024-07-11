import React from "react";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="user-info">
        <img src="/assets/images/user-icon.png" alt="User Icon" />
        <p>Administrador</p>
      </div>
      <nav className="menu">
        <ul>
          <li className="menu-item active">Personal</li>
          <li className="menu-item">Registrar nuevo</li>
          <li className="menu-item">Horarios</li>
          <li className="menu-item">Reportes</li>
          <li className="menu-item">Usuarios</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
