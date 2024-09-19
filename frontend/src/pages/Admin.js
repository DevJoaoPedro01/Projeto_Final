import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const produtos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    produtos();
  }, []);

  const deleteProduct = (id) => {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`http://localhost:5000/products/${id}`, config)
      .then((response) => {
        alert("Produto deletado com sucesso:", response);
      })
      .catch((error) => {
        console.error("Erro ao deletar o produto:", error);
      });
  };

  return (
    <div className="admin-container">
      {/* Cabeçalho */}
      <header className="admin-header">
        <div className="admin-logo">Admin Dashboard</div>
        <nav className="admin-nav">
          <Link to="/login" className="admin-nav-link">
            Logout
          </Link>
        </nav>
      </header>

      {/* Seção de Gerenciamento de Produtos */}
      <section className="admin-products">
        <h2 className="section-title">Gerenciar Produtos</h2>
        <Link to="/productForm" className="cta-button">
          Adicionar Novo Produto
        </Link>
        <div className="admin-product-list">
          {products.map((product) => (
            <div key={product.id} className="admin-product-card">
              <img
                src={product.image_url}
                alt={product.name}
                className="admin-product-image"
              />
              <div className="admin-product-details">
                <h3 className="admin-product-title">{product.name}</h3>
                <p className="admin-product-price">{product.price}</p>
                <div className="admin-product-actions">
                  <Link
                    to={`/admin/edit/${product.id}`}
                    className="admin-action-button"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="admin-action-button delete-button"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
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

export default Admin;
