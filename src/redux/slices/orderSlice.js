import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    orders: [],
}

export const createOrder = createAsyncThunk("order/createOrder", async ({total_price, order_items}) => {
    try {
        console.log("total_price", total_price);
        console.log("order_items", order_items);

        const response = await axiosInstance.post("/order", {total_price, order_items});

        toast.success("Order Created Successfully", {
            position: "bottom-right"
        });

        console.log("response redux", response);
        return response.data;
    } catch (error) {
        toast.error("Error Creating Order", {
            position: "bottom-right"
        });
        throw error;
    }
})

export const getOrders = createAsyncThunk("order/getOrders", async () => {
    try {
        const response = await axiosInstance.get("/order/me");
        return response.data;
    } catch (error) {
        toast.error("Error Fetching Orders", {
            position: "bottom-right"
        });
        throw error;
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {}
})

export default orderSlice.reducer;
