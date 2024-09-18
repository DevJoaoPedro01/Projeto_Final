import React, { useEffect, useState } from "react";
import { getProducts } from "../api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (err) {
        console.error("Erro ao buscar produtos", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2>Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Preço: R${product.price}</p>
            <p>Estoque: {product.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
