export interface ITokenStorage{
    setRefreshToken(token: string | null): void;
    getRefreshToken(): string | null;
    clearRefreshToken(): void;
}

const REFRESH_TOKEN_KEY = "app:refresh-token" 

export const localTokenStorage: ITokenStorage = {
    setRefreshToken: (refreshToken: string) => {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    },
    getRefreshToken: (): string | null => { 
        return localStorage.getItem(REFRESH_TOKEN_KEY) },
    clearRefreshToken: () => {
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
}