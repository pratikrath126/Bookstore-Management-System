import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const register = (name, email, password) => {
    return axios.post(`${API_URL}/register`, { name, email, password });
};

const login = (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const getToken = () => {
    const user = getCurrentUser();
    return user ? user.token : null;
};

const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.role === 'ADMIN';
};

const isLoggedIn = () => {
    return getCurrentUser() !== null;
};

export default { register, login, logout, getCurrentUser, getToken, isAdmin, isLoggedIn };
