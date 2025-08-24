import { configureStore } from '@reduxjs/toolkit';
// import authReducers from "./authSlice";
import productSlice from "./productSlice";
import messageSlice from "./messageSlice";

export const store = configureStore({
    reducer:{
        // auth: authReducers,
        productStore: productSlice,
        messageStore: messageSlice
    }
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;