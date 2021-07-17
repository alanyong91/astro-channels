import axios from "axios";

export const api = axios.create({
  baseURL: 'https://contenthub-api.eco.astro.com.my',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000
});

export default api;