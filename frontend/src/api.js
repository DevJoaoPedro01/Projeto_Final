import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = (data) =>
  axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const getProducts = () => axios.get(`${API_URL}/products`);
export const addProduct = (data, token) =>
  axios.post(`${API_URL}/products`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateProduct = (id, data, token) =>
  axios.put(`${API_URL}/products/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteProduct = (id, token) =>
  axios.delete(`${API_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
