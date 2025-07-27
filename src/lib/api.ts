import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle global errors
    return Promise.reject(error);
  },
);

export default api;
