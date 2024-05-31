import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8081/api/v1",
    withCredentials: true,
});

export default axiosInstance;
