import axios from "axios";
import { secureStorage } from "../storage/secureStorage";
import { ENDPOINTS } from "./endpoints";

// const BASE_URL = "https://doctor-twin-ai-production.up.railway.app"; old python backend
const BASE_URL = "https://doctor-twin-be-production.up.railway.app/api/v1";

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

/** One in-flight refresh so parallel 401s don't stampede /auth/refresh. */
let refreshPromise: Promise<string | null> | null = null;

const clearSession = async () => {
    await secureStorage.removeItem("accessToken");
    await secureStorage.removeItem("refreshToken");
    await secureStorage.removeItem("user");
};

const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = await secureStorage.getItem("refreshToken");
    if (!refreshToken) {
        return null;
    }

    const response = await axios.post(
        `${BASE_URL}${ENDPOINTS.REFRESH_TOKEN}`,
        { refresh_token: refreshToken },
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        },
    );

    console.log(response, "response in refreshAccessToken");

    const body = response?.data;
    const payload = body?.data ?? body;
    const newAccessToken = payload?.access_token as string | undefined;
    const newRefreshToken = payload?.refresh_token as string | undefined;

    if (body?.ok === false || !newAccessToken) {
        return null;
    }

    await secureStorage.setItem("accessToken", newAccessToken);
    if (newRefreshToken) {
        await secureStorage.setItem("refreshToken", newRefreshToken);
    }

    return newAccessToken;
};

const getNewAccessToken = (): Promise<string | null> => {
    if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
        });
    }
    return refreshPromise;
};

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
        const originalRequest = error?.config;
        const status = error?.response?.status;

        if (status !== 401 || !originalRequest || originalRequest._retry) {
            return Promise.reject(error);
        }

        const requestUrl = String(originalRequest.url ?? "");
        if (requestUrl.includes(ENDPOINTS.REFRESH_TOKEN)) {
            await clearSession();
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const newAccessToken = await getNewAccessToken();
            if (!newAccessToken) {
                await clearSession();
                return Promise.reject(error);
            }

            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return api(originalRequest);
        } catch (refreshError: any) {
            console.error(
                "refresh token failed",
                refreshError?.response?.data ?? refreshError,
            );
            await clearSession();
            return Promise.reject(refreshError);
        }
    },
);
