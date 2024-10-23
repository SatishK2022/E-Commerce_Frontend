import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    products: [],
    singleProduct: null,
}

export const getProducts = createAsyncThunk("product/getProducts", async () => {
    try {
        const response = await axiosInstance.get("/product");
        return response.data;
    } catch (error) {
        toast.error("Error Fetching Products", {
            position: "bottom-right"
        });
        throw error;
    }
})

export const getSingleProduct = createAsyncThunk("product/getSingleProduct", async (id) => {
    try {
        const response = await axiosInstance.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        toast.error("Error Fetching Product", {
            position: "bottom-right"
        });
        throw error;
    }
})

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })
        builder.addCase(getSingleProduct.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
        })
    }
})

export default productSlice.reducer;
