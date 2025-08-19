import { createSlice} from "@reduxjs/toolkit";
import type {  PayloadAction } from "@reduxjs/toolkit";
import { localTokenStorage } from "../storage/storage";

interface IUser {
    userId: number,
    username: string,
    email: string,
    role: string
}

interface IAuthState {
    user: IUser | null,
    access_token: string | null,
    refresh_token: string | null,
    isAuth : boolean
}

const initialState: IAuthState = {
    user: null,
    access_token: null,
    refresh_token: null,
    isAuth: false
}

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {
        loginStore: (state, action: PayloadAction<IAuthState>) => {
            
            state.user = action.payload.user;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.isAuth = action.payload.isAuth

            localTokenStorage.setRefreshToken(action.payload.refresh_token)
        },
        logout: (state) => {
            state.user = null;
            state.access_token = null;
            state.refresh_token = null;
            state.isAuth = false;
            localTokenStorage.clearRefreshToken()
        },
         refresh: (state, action: PayloadAction<IAuthState>) => {
            state.user = action.payload.user;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.isAuth = action.payload.isAuth
            localTokenStorage.setRefreshToken(action.payload.refresh_token)
        },
    }
});

export const { loginStore, logout, refresh } = authSlice.actions;
export default authSlice.reducer;