import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

const API_BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || "123456";

const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "secretkey": SECRET_KEY,
        "Content-Type": "application/json",
    },
});



apiInstance.interceptors.request.use(
    (config) => {
        const token = getCookie("access_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//Refresh token
apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = getCookie("refresh_token");
                console.log("Đang refresh token...");

                const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
                setCookie("access_token", data.accessToken);
                originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

                return axios(originalRequest);
            } catch (refreshError) {
                console.error("Lỗi refresh token:", refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiInstance;
