import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://quickhire-production-97ff.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
