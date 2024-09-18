import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        alert("Login realizado com sucesso!");
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("role", data.role);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao realizar o login.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao realizar o login.");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
            />
          </div>
          <button type="submit" className="auth-button">
            Entrar
          </button>
        </form>
        <p className="toggle-text">
          Não tem uma conta?{" "}
          <span
            onClick={() => (window.location.href = "/registrar")}
            className="toggle-link"
          >
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
