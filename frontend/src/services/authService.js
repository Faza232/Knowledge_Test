import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/auth';

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Return token and user info
};

export const register = async (data) => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data; // Return success message
};
