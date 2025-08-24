import axios, { AxiosError, type AxiosRequestConfig } from "axios";
// import { store } from "../../store/store";
import { localTokenStorage, localUserStorage } from "../../storage/storage";
// import { logout, refresh } from "../../store/authSlice";
export const BASE_URL = "http://localhost:3000";


const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = localTokenStorage.getAccessToken()
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
                const response = await axios.post(`${BASE_URL}/api/auth/refresh`, { refreshToken: token }, { withCredentials: true })
                console.log(response);                
                // store.dispatch(refresh(response.data))
                localTokenStorage.tokens.setAccess(response.data?.access_token)
                localTokenStorage.tokens.setRefresh(response.data?.refresh_token)
                localUserStorage.setUserDataInStorage(response.data?.user)
                original.headers = {...(original.headers || {}), Authorization: `Bearer ${response.data?.access_token}`};
                return api(original)
            } catch (err) {
                
                // store.dispatch(logout())
                localTokenStorage.clearAccessToken()
                localTokenStorage.clearRefreshToken()
                localTokenStorage.clearUserSession()
                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    }
)


export const loginApi = async (data: any) => {
    const response = await api.post("/api/auth/login", data)
    return response;
}

export const refreshApi = async (data: { refreshToken: string | null }) => {
    const response = await api.post("//api/auth/refresh", data)
    return response;
}


export const profileApi = async () => {
    const response = await api.get("/api/auth/profile")
    return response;
}


export const productseApi = async () => {
    const response = await axios.get(`${BASE_URL}/api/products`)
    return response;
}


export const allUserseApi = async () => {
    const response = await api.get(`/api/auth/users`)
    return response;
}


export const allFriendsApi = async () => {
    const response = await api.get(`/api/auth/friends`)
    return response;
}

