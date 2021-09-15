import axios from 'axios';

// Constants
import { IHEROES_AUTH } from 'constants/LocalStorageKeysConstants';

function getAuthToken() {
  const auth = JSON.parse(localStorage.getItem(IHEROES_AUTH));
  return auth?.token;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (config) => config,
  (error) => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== '/login'
    ) {
      localStorage.removeItem(IHEROES_AUTH);
      window.location.reload();
    }

    return Promise.reject(error);
  },
);

export default api;
