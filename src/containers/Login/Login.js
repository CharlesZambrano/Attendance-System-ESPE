import React, { useState } from "react";
import "./Login.scss";
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <Input
          label="Nombre de usuario"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Contraseña"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="login-button" type="submit">
          Ingresar
        </Button>
      </form>
    </div>
  );
};

export default Login;
