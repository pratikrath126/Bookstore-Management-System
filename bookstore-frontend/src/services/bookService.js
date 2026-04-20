import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:8080/api/books';

const getAuthHeader = () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAllBooks = () => {
    return axios.get(API_URL);
};

const getBookById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const getBooksByCategory = (categoryId) => {
    return axios.get(`${API_URL}/category/${categoryId}`);
};

const searchBooks = (keyword) => {
    return axios.get(`${API_URL}/search`, { params: { keyword } });
};

const addBook = (book, categoryId) => {
    return axios.post(`${API_URL}?categoryId=${categoryId}`, book, {
        headers: getAuthHeader()
    });
};

const updateBook = (id, book, categoryId) => {
    return axios.put(`${API_URL}/${id}?categoryId=${categoryId}`, book, {
        headers: getAuthHeader()
    });
};

const deleteBook = (id) => {
    return axios.delete(`${API_URL}/${id}`, {
        headers: getAuthHeader()
    });
};

export default { getAllBooks, getBookById, getBooksByCategory, searchBooks, addBook, updateBook, deleteBook };
