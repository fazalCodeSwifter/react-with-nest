import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { store } from "../../store/store";
import { localTokenStorage } from "../../storage/storage";
import { logout, refresh } from "../../store/authSlice";
const BASE_URL = "http://localhost:3000/api"

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = store.getState().auth.access_token;
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config

})

api.interceptors.response.use(
    (config) => config,
    async (error: AxiosError) => {
        let original = error.config as AxiosRequestConfig & { _isRetry?: boolean };
        if(error.response?.status === 401 && (error.response?.data as { message: string }).message === "your token is expired" && !original._isRetry){
            original._isRetry = true;
            try {
                const token = localTokenStorage.getRefreshToken()
                if(!token){
                    throw new Error("token is missing")
                }
                const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken: token }, { withCredentials: true })
                store.dispatch(refresh(response.data))
                original.headers = {...(original.headers || {}), Authorization: `Bearer ${response.data?.access_token}`};
                return api(original)
            } catch (err) {
                store.dispatch(logout())
                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    }
)


export const loginApi = async (data: any) => {
    const response = await api.post("/auth/login", data)
    return response;
}

export const refreshApi = async (data: { refreshToken: string | null }) => {
    const response = await api.post("/auth/refresh", data)
    return response;
}

