import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './generalForms.css';
import axios from 'axios'

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(event){
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8007/api/usuarios/login', {
        username: username,
        contraseña: password,
      });
      console.log('Inicio de sesión exitoso:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario))
      navigate("/home")
    } catch (error) {
      console.error('Error al iniciar sesión:');
    }
  }

  return (
    <section>
      <h1>Inicia Sesión</h1>
      <form onSubmit={handleSubmit}>
        <h3>Nombre de Usuario</h3>
        <input
          type="text"
          placeholder="Digita tu Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <h3>Contraseña</h3>
        <input
          type="password"
          placeholder="Digita tu Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </section>
  );
}
export default LoginForm;

