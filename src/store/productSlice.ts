import { createSlice} from "@reduxjs/toolkit";
import type {  PayloadAction } from "@reduxjs/toolkit";

export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number | string;
    imageURL: string
}

export interface IProducts {
    products: IProduct[] | null;
}

const initialState: IProducts = {
    products: []
}

const productSlice = createSlice({

    name: "products",
    initialState,
    reducers: {
        setAllProduct: (state, actions:PayloadAction<IProduct[]>) => {
            state.products = actions.payload;
        }
    }
});

export const { setAllProduct } = productSlice.actions;
export default productSlice.reducer;