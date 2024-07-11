import React, { useState } from "react";
import "./Login.scss";
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import espeLogo from "../../assets/images/espe-logo.png";
import deccLogo from "../../assets/images/decc-logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-info">
          <img src={espeLogo} alt="ESPE Logo" />
          <h2>DEPARTAMENTO DE CIENCIAS DE LA COMPUTACIÓN</h2>
          <img src={deccLogo} alt="DECC Logo" />
          <h2>REGISTRO DE ASISTENCIA</h2>
        </div>
        <div className="login-box">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <Input
              label="Usuario:"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Contraseña:"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="login-button" type="submit">
              Ingresar
            </Button>
          </form>
          <a href="#" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
