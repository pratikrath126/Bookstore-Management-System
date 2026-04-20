import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:8080/api/categories';

const getAuthHeader = () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAllCategories = () => {
    return axios.get(API_URL);
};

const addCategory = (category) => {
    return axios.post(API_URL, category, {
        headers: getAuthHeader()
    });
};

export default { getAllCategories, addCategory };
