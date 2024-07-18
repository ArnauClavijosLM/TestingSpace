import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Assuming you store your token in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
