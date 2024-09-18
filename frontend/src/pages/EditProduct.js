import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css';

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const GETproduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                const data = response.data[0];
                console.log(data)
                setProduct(data);
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setStock(data.stock);
                setImageUrl(data.image_url);
                console.log(data.name)
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
            }
        };
        GETproduct();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const updatedProduct = {
            name,
            description,
            price,
            stock,
            image_url: imageUrl
        };

        try {
            await axios.put(`http://localhost:5000/products/${id}`, updatedProduct, config);
            alert('Produto atualizado com sucesso!');
            navigate('/admin');
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
        }
    };

    if (!product) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="edit-product-container">
            <h2>Editar Produto</h2>
            <form onSubmit={handleSubmit} className="edit-product-form">
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descrição:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Preço:</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Estoque:</label>
                    <input
                        type="number"
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">URL da Imagem:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="cta-button">Atualizar Produto</button>
            </form>
        </div>
    );
};

export default EditProduct;
