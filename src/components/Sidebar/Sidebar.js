import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Sidebar.scss";
import userLogo from "../../assets/images/user-logo.jpg";
import logoutIcon from "../../assets/images/icons-salida-32.png";

const Sidebar = ({ selectedMenu }) => {
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    // Aquí puedes añadir la lógica de cierre de sesión si es necesario
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__admin">
        <label htmlFor="user-image-upload" className="sidebar__admin-image">
          <img
            src={userImage || userLogo}
            alt="User"
            className="sidebar__admin-img"
          />
          <span className="sidebar__admin-pencil">✏️</span>
        </label>
        <input
          id="user-image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <span className="sidebar__admin-text">Administrador</span>
        <img
          src={logoutIcon}
          alt="Logout"
          className="sidebar__logout-icon"
          onClick={handleLogout}
        />
      </div>
      <nav className="sidebar__nav">
        <ul>
          <li className={selectedMenu === "personal" ? "active" : ""}>
            <Link to="/admin">Personal</Link>
          </li>
          <li className={selectedMenu === "registrar" ? "active" : ""}>
            <Link to="/register-new">Registrar nuevo</Link>
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
};

export default Sidebar;
