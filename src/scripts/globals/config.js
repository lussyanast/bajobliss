// config.js
const axios = require('axios');

// Base URL
const BASE_URL = 'http://35.230.16.229';

// Konfigurasi axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Menambahkan interceptor untuk menyisipkan token JWT ke dalam header Authorization
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Products endpoints
const productAPI = {
    getProducts: () => api.get('/products'),
    createProduct: (productData) => api.post('/products', productData),
    getProduct: (productId) => api.get(`/products/${productId}`),
    updateProduct: (productId, productData) => api.put(`/products/${productId}`, productData),
    deleteProduct: (productId) => api.delete(`/products/${productId}`),
    getCategories: () => api.get('/products/categories'),
    createCategory: (categoryData) => api.post('/products/categories', categoryData),
    getCategory: (categoryId) => api.get(`/products/categories/${categoryId}`),
    updateCategory: (categoryId, categoryData) => api.put(`/products/categories/${categoryId}`, categoryData),
    deleteCategory: (categoryId) => api.delete(`/products/categories/${categoryId}`),
    getProductsByCategory: (categoryId) => api.get(`/products/categories/${categoryId}/products`),
};

// Exports
module.exports = {
    productAPI,
};
