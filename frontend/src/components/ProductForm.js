import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/products`,
        {
          name,
          description,
          price,
          stock,
          image_url: imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/");
    } catch (err) {
      setError("Erro ao adicionar produto");
    }
  };

  return (
    <div className="container">
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            step="0.01"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="stock">Estoque</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="imageUrl">URL da Imagem</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ProductForm;
