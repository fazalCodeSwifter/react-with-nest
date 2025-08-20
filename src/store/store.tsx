import { configureStore } from '@reduxjs/toolkit';
// import authReducers from "./authSlice";
import productSlice from "./productSlice";

export const store = configureStore({
    reducer:{
        // auth: authReducers,
        productStore: productSlice,
    }
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;