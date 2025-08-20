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
    isAuth : boolean
}

const initialState: IAuthState = {
    user: null,
    isAuth: false
}

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {
        loginStore: (state, action: PayloadAction<IAuthState>) => {
            
            state.user = action.payload.user;
            state.isAuth = action.payload.isAuth
        },
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
            localTokenStorage.clearRefreshToken()
            localTokenStorage.clearAccessToken()
        },
         refresh: (state, action: PayloadAction<IAuthState>) => {
            state.user = action.payload.user;
            state.isAuth = action.payload.isAuth
        },
    }
});

export const { loginStore, logout, refresh } = authSlice.actions;
export default authSlice.reducer;