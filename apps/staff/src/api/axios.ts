import axios from "axios";
import { secureStorage } from "../storage/secureStorage";
import { ENDPOINTS } from "./endpoints";

const BASE_URL = "https://doctor-twin-ai-production.up.railway.app";

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Automatically get the access token if it exists
api.interceptors.request.use(
    async config => {
        const accessToken = await secureStorage.getItem("accessToken");

        if (accessToken) {
            config.headers = config.headers || {};

            config.headers.Authorization =
                `Bearer ${accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error),
);

// ** Automatically refresh the access token if it exists ** //
api.interceptors.response.use(
    response => response,

    async (error: any) => {
        const originalRequest: any = error.config;

        /**
         * Prevent infinite retry loop
         */
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = await secureStorage.getItem("refreshToken");

                if (!refreshToken) {
                    throw new Error("No refresh token");
                }

                const response = await axios.post(
                    `${BASE_URL}${ENDPOINTS.REFRESH_TOKEN}`,
                    {
                        refreshToken,
                    }
                );

                const newAccessToken = response.data.accessToken;
                const newRefreshToken = response.data.refreshToken;

                await secureStorage.setItem("accessToken", newAccessToken);
                await secureStorage.setItem("refreshToken", newRefreshToken);

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                await secureStorage.removeItem("accessToken");
                await secureStorage.removeItem("refreshToken");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);