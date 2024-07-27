import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import deccLogo from "../../assets/images/decc-logo.png";
import espeLogo from "../../assets/images/espe-logo.png";
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    // Aquí puedes añadir la lógica de autenticación
    navigate("/admin");
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-info">
          <img src={espeLogo} alt="ESPE Logo" />
          <h2>DEPARTAMENTO DE CIENCIAS DE LA COMPUTACIÓN</h2>
          <img src={deccLogo} alt="DECC Logo" />
        </div>
        <div className="login-box">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <Input
              label="Usuario:"
              type="text"
              name="username"
              value={username}
              onChange={(newValue) => setUsername(newValue)}
              required
            />
            <Input
              label="Contraseña:"
              type="password"
              name="password"
              value={password}
              onChange={(newValue) => setPassword(newValue)}
              required
            />
            <Button type="submit">Ingresar</Button>
          </form>
          <a href="/forgot-password" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
