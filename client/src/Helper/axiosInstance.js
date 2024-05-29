import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://lmsazure.azurewebsites.net/api/v1",
    withCredentials: true,
});

export default axiosInstance;
