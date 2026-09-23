import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Auto-attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('lnl_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('lnl_token');
      localStorage.removeItem('lnl_user');
    }
    return Promise.reject(error);
  }
);

export default API;
