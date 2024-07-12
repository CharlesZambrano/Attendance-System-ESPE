import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Cambia esto a la URL de tu API
});

export default api;
