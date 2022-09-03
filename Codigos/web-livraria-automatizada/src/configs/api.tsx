import axios from "axios";

const api = axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  baseURL: process.env.REACT_APP_URL_API,
});

export default api;