import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

// const API_BASE_URL = process.env.REACT_APP_BASE_URL || "http://dangnvpc07460.id.vn";
const API_BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || "123456"; // Định nghĩa Secret Key từ .env

const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "secretkey": SECRET_KEY,
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3N5c3RlbS9hdXRoL2xvZ2luIiwiaWF0IjoxNzQzNDI0MTQ4LCJleHAiOjE3NDM0MjU5NDgsIm5iZiI6MTc0MzQyNDE0OCwianRpIjoibHR4YU9qZ3l6QmVmWXlTcSIsInN1YiI6ImI1MGI4NjM4LTk4ODctNGM2OC1hZTdmLWEyMTRiMzdmMmJhZiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJpZCI6ImI1MGI4NjM4LTk4ODctNGM2OC1hZTdmLWEyMTRiMzdmMmJhZiIsIm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiQWRtaW4xMjNAZ21haWwuY29tIiwicm9sZXMiOlsiQWRtaW4iLCJUcmFmZmljIiwiU3RhZmYiXSwiZ2FyYWdlIjp7IkdhcmFnZV9pZCI6MywiR2FyYWdlX25hbWUiOiJOaMOgIHhlIE1pbmggVHXhuqVuIn19.Erho2ZTIRvNRrs5kN6rafzmTU5vqfOh8iWVFTfGGlWE",
        "Content-Type": "application/json",
    },
    withCredentials: false,

});


apiInstance.interceptors.request.use(
    (config) => {
        const token = getCookie("access_token");
        console.log("Token được gửi:", token);
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
            const token = getCookie("access_token");
            if (!token) {
                return Promise.reject(error);
            }

            try {
                console.log("⏳ Đang refresh token...");

                const { data } = await axios.post(`${API_BASE_URL}/api/system/auth/refresh`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "secretkey": SECRET_KEY,
                        "Content-Type": "application/json",
                    },
                });

                setCookie("access_token", data.token); // hoặc data.access_token nếu backend trả về key này
                originalRequest.headers["Authorization"] = `Bearer ${data.token}`;

                return axios(originalRequest);
            } catch (refreshError) {
                console.error("❌ Lỗi refresh token:", refreshError);
                // Có thể redirect về login ở đây nếu cần
            }
        }

        return Promise.reject(error);
    }
);


export default apiInstance;
