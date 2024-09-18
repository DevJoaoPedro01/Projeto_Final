import React, { useState } from "react";
import "../pages/Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, senha }),
      });
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setName('');
        setEmail('');
        setSenha('');
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao realizar o cadastro.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao realizar o cadastro.");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
            />
          </div>
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
            />
          </div>
          <button type="submit" className="auth-button">
            Cadastrar
          </button>
        </form>
        <p className="toggle-text">
          Já tem uma conta?{" "}
          <span onClick={() => window.location.href = '/login'} className="toggle-link">
            Faça Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
