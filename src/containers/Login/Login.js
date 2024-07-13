import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Common/Input"; // Asegúrate de que la ruta es correcta
import Button from "../../components/Common/Button"; // Asegúrate de que la ruta es correcta
import "./Login.scss";
import espeLogo from "../../assets/images/espe-logo.png";
import deccLogo from "../../assets/images/decc-logo.png";

const Login = () => {
  const navigate = useNavigate();

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
            <Input label="Usuario:" type="text" name="username" required />
            <Input
              label="Contraseña:"
              type="password"
              name="password"
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
