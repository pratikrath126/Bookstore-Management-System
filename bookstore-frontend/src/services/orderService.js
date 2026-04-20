import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:8080/api/orders';

const getAuthHeader = () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const placeOrder = (bookId, quantity) => {
    return axios.post(API_URL, { bookId, quantity }, {
        headers: getAuthHeader()
    });
};

const getMyOrders = () => {
    return axios.get(API_URL, {
        headers: getAuthHeader()
    });
};

const getAllOrders = () => {
    return axios.get(`${API_URL}/all`, {
        headers: getAuthHeader()
    });
};

export default { placeOrder, getMyOrders, getAllOrders };
