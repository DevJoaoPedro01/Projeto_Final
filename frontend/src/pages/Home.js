import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { isAuthenticated, nome, role } from "../auth.js";

const Home = () => {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState({
    isAuthenticated: localStorage.getItem("authToken"),
    nome: localStorage.getItem("nome"),
    role: localStorage.getItem("role"),
  });
  const navigate = useNavigate();

  useEffect(() => {
    const products = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    products();
    //console.log(auth);
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("role");
    setAuth({
      isAuthenticated: null,
      nome: null,
      role: null,
    });
    navigate("/");
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  return (
    <div className="home-container">
      {/* Cabeçalho */}
      <header className="header">
        <div className="logo">GameStoreBR</div>
        <nav className="nav">
          {role === "admin" ? (
            <button onClick={handleAdminClick}>ADM</button>
          ) : null}
          <a href="#home" className="nav-link">
            Início
          </a>
          <a href="#featured" className="nav-link">
            Jogos
          </a>
          {!auth.isAuthenticated ? (
            <Link to="/login" className="nav-link">
              Login / Cadastro
            </Link>
          ) : (
            <>
              <p className="ola">Olá, {nome}</p>
              <button onClick={handleLogout}>Sair</button>
            </>
          )}
        </nav>
      </header>
      {/* Seção de Destaque */}
      <section id="home" className="highlight">
        <div className="highlight-content">
          <h1>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</h1>
          <p>ㅤ</p>
          <p>ㅤ</p>
          <p>ㅤ</p>
          <p>ㅤ</p>
        </div>
      </section>
      {/* Produtos em Destaque */}
      <section id="featured" className="featured-products">
        <h2 className="section-title">Jogos</h2>
        <div className="product-cards">
          {data.map((item) => (
            <div className="product-card">
              <img
                src={item.image_url}
                alt="Produto 1"
                className="product-image"
              />
              <h3 className="product-title">{item.name}</h3>
              <p className="product-description">R${item.price}</p>
              <a href="https://wa.me/32999261051" className="cta-button">
                Fazer o Pedido
              </a>
            </div>
          ))}
        </div>
        {/* Ofertas Especiais */}
        <section className="special-offers">
          <h2 className="section-title">Ofertas Especiais</h2>
          <div className="offers-container">
            <div className="offer-item">
              <img
                src="https://m.media-amazon.com/images/I/516xBCpnsML._AC_SX300_SY300_QL70_ML2.jpg"
                alt="Oferta 1"
                className="offer-image"
              />
              <div className="offer-details">
                <h3>Red Dead Redemption 2 - PlayStation 4</h3>
                <p>De R$129,90 para R$117,89</p>
                <a href="https://wa.me/32999261051" className="cta-button">
                  Aproveitar
                </a>
              </div>
            </div>
            <div className="offer-item">
              <img
                src="https://m.media-amazon.com/images/I/81h0oxLQQPL._AC_SX300_SY300_QL70_ML2.jpg"
                alt="Oferta 2"
                className="offer-image"
              />
              <div className="offer-details">
                <h3>God Of War Hits - PlayStation 4</h3>
                <p>De R$99,90 para R$86,33</p>
                <a href="https://wa.me/32999261051" className="cta-button">
                  Aproveitar
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="new-arrivals">
        <h2 className="section-title">Diversos</h2>
        <div className="product-cards">
          {" "}
          {/* Reutiliza a classe para os cards */}
          <div className="product-card">
            <img
              src="https://m.media-amazon.com/images/I/61Lhf7o6SgL._AC_SX300_SY300_QL70_ML2.jpg"
              alt="Novidade 1"
              className="product-image"
            />
            <h3 className="product-title">Sniper Elite 5 (PS5)</h3>
            <p className="product-description">R$259,89</p>
            <a href="https://wa.me/32999261051" className="cta-button">
              Fazer o Pedido
            </a>
          </div>
          <div className="product-card">
            <img
              src="https://m.media-amazon.com/images/I/61KU9GYqDPL._AC_SX300_SY300_QL70_ML2.jpg"
              alt="Novidade 2"
              className="product-image"
            />
            <h3 className="product-title">
              The Last of Us Part II Remastered - PlayStation 5
            </h3>
            <p className="product-description">R$214,99</p>
            <a href="https://wa.me/32999261051" className="cta-button">
              Fazer o Pedido
            </a>
          </div>
          <div className="product-card">
            <img
              src="https://m.media-amazon.com/images/I/81RfcW3Ml-L._AC_SX300_SY300_QL70_ML2.jpg"
              alt="Novidade 3"
              className="product-image"
            />
            <h3 className="product-title">
              Marvel's Spider-Man 2 - Edição Standard - PlayStation 5
            </h3>
            <p className="product-description">R$283,55</p>
            <a href="https://wa.me/32999261051" className="cta-button">
              Fazer o Pedido
            </a>
          </div>
          <div className="product-card">
            <img
              src="https://m.media-amazon.com/images/I/81fKcstBvkL._AC_SX300_SY300_QL70_ML2.jpg"
              alt="Novidade 4"
              className="product-image"
            />
            <h3 className="product-title">Hogwarts Legacy - PlayStation 5</h3>
            <p className="product-description">R$229,90</p>
            <a href="https://wa.me/32999261051" className="cta-button">
              Fazer o Pedido
            </a>
          </div>
          <div className="product-card">
            <img
              src="https://m.media-amazon.com/images/I/91ik5MsUTgL._AC_SX300_SY300_QL70_ML2.jpg"
              alt="Novidade 5"
              className="product-image"
            />
            <h3 className="product-title">
              Batman the Enemy Within - Xbox One
            </h3>
            <p className="product-description">R$52,48 </p>
            <a href="https://wa.me/32999261051" className="cta-button">
              Fazer o Pedido
            </a>
          </div>
          <div className="product-card">
            <img
              src="https://m.media-amazon.com/images/I/71B7wnMzgeL._AC_SX300_SY300_QL70_ML2.jpg"
              alt="Novidade 6"
              className="product-image"
            />
            <h3 className="product-title">
              Tom Clancy’S - Rainbow Six Siege - Xbox One
            </h3>
            <p className="product-description">R$53,91</p>
            <a href="https://wa.me/32999261051" className="cta-button">
              Fazer o Pedido
            </a>
          </div>
          <div className="product-card">
            <img
              src="https://m.media-amazon.com/images/I/81qsBBTCRjL._AC_SX300_SY300_QL70_ML2.jpg"
              alt="Novidade 7"
              className="product-image"
            />
            <h3 className="product-title">Battlefield 2042 - Xbox series X</h3>
            <p className="product-description">R$73,90</p>
            <a href="https://wa.me/32999261051" className="cta-button">
              Fazer o Pedido
            </a>
          </div>
          <div className="product-card">
            <img
              src="https://m.media-amazon.com/images/I/61xHyukBywL._AC_SX300_SY300_QL70_ML2.jpg"
              alt="Novidade 8"
              className="product-image"
            />
            <h3 className="product-title">
              Stranger Of Paradise: Final Fantasy Origin - Xbox Series X
            </h3>
            <p className="product-description">R$129,99</p>
            <a href="https://wa.me/32999261051" className="cta-button">
              Fazer o Pedido
            </a>
          </div>
        </div>
      </section>
      {/* Rodapé */}
      <footer className="home-footer">
        <p>© 2024 GameStoreBR. Todos os direitos reservados.</p>
        <p>Siga-nos nas redes sociais:</p>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/jo%C3%A3o-pedro-707a142a3/?trk=opento_sprofile_goalscard"
            className="social-icon"
          >
            Linkedin
          </a>
          <a href="https://github.com/DevJoaoPedro01" className="social-icon">
            GitHub
          </a>
          <a
            href="https://www.instagram.com/_jotape03/"
            className="social-icon"
          >
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
