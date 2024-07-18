const axios = require('axios');
const { getCookie } = require('../utils/cookie-helper');

// const BASE_URL = 'http://35.230.16.229:3000';
const BASE_URL = 'http://127.0.0.1:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie('jwt');
    if (token) {
      const newConfig = { ...config };
      newConfig.headers = { ...config.headers };
      newConfig.headers.Authorization = `Bearer ${token}`;
      return newConfig;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

module.exports = api;
