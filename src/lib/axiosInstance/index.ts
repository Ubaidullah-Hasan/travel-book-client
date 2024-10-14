import axios from "axios";
import { cookies } from "next/headers";
import envConfig from "@/src/config/envConfig";
import { getNewAccessToken } from "@/src/services/authService";

export const axiosInstance = axios.create({
    baseURL: envConfig.backend_api,
});
 

axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken = cookies().get("accessToken")?.value;

    if (accessToken) {
        config.headers.Authorization = accessToken;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    function (response) {
 
        return response;
    },
    async function (error) {
        const config = error.config;

        if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;
            const res = await getNewAccessToken();
            const accessToken = res.result.accessToken;

            config.headers["Authorization"] = accessToken;
            cookies().set("accessToken", accessToken);

            return axiosInstance(config);
        } else {
            return Promise.reject(error);
        }
    },
);

export default axiosInstance;