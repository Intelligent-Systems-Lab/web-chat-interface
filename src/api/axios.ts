import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined in the .env file');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    console.log(`URL: ${response.config.url}, Status: ${response.status}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`URL: ${error.response.config.url}, Status: ${error.response.status}`);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;