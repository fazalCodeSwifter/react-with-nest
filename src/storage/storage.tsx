interface ITokens {
    setAccess(token: string | null): void;
    setRefresh(token: string | null): void;
}


export interface ITokenStorage {
    tokens: ITokens;
    getAccessToken(): string | null;
    getRefreshToken(): string | null;
    clearRefreshToken(): void;
    clearAccessToken(): void;
    clearUserSession(): void;
}

export interface IUserDto {
    userId: number | undefined | null;
    username: string | undefined | null;
    email: string | undefined | null;
    role: string | undefined | null;
}

export interface ILocalUserStorage {
    setUserDataInStorage(data: IUserDto): void;
    getUserDataInStorage(): IUserDto
}

const ACCESS_TOKEN_KEY = "app:access-token"
const REFRESH_TOKEN_KEY = "app:refresh-token"
const USER_DATA_KEY = "app:user-data"

export const localUserStorage: ILocalUserStorage = {
    setUserDataInStorage: (data: IUserDto) => {
        const userData = JSON.stringify(data);
        localStorage.setItem(USER_DATA_KEY, userData)
    },
    getUserDataInStorage: () => {
        const userData: any = localStorage.getItem(USER_DATA_KEY)
        const data: IUserDto  = JSON.parse(userData);
        return data;
    },
}

export const localTokenStorage: ITokenStorage = {
    tokens: {
        setAccess: (accessToken: string) => {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
        },
        setRefresh: (refreshToken: string) => {
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
        },
    },
    getAccessToken: (): string | null => {
        return localStorage.getItem(ACCESS_TOKEN_KEY)
    },
    getRefreshToken: (): string | null => {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    },
    clearRefreshToken: () => {
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    },
    clearAccessToken: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
    },
    clearUserSession: () => {
        localStorage.removeItem(USER_DATA_KEY)
    }
}


// const user = {
//     userId : 1,
//     username: "fazal",
//     email: "fazal@fazal.com",
//     role: "customer"
// }