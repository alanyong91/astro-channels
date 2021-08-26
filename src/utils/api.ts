import axios from "axios";

export const api = axios.create({
  baseURL: 'https://contenthub-api.eco.astro.com.my',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 61000
});

export default api;