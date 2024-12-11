import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/products';

// Ambil token JWT dari localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProducts = async () => {
    const response = await axios.get(API_URL, { headers: getAuthHeader() });
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await axios.post(API_URL, productData, { headers: getAuthHeader() });
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await axios.put(`${API_URL}/${id}`, productData, { headers: getAuthHeader() });
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
    return response.data;
};
