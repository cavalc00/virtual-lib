import axios from "axios";
import Storage from "./Storage";

const api = axios.create({
  timeout: 30000,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  baseURL: process.env.REACT_APP_URL_API,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      localStorage.clear();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } else if (error.status === null) {
      console.log(JSON.stringify(error));
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  if (!config?.headers) {
    throw new Error('no header available');
  }

  const token = Storage.getSessionToken();
  if (!token) return config;

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

