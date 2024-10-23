import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    products: [],
    categories: [],
    orders: []
};

export const addCategory = createAsyncThunk("dashboard/addCategory", async (category) => {
    try {
        const response = await axiosInstance.post("/category", category);

        toast.success("Category Added Successfully", {
            position: "bottom-right"
        });

        return response.data;
    } catch (error) {
        toast.error("Error Adding Category", {
            position: "bottom-right"
        });
        throw error;
    }
})

export const getCategories = createAsyncThunk("dashboard/getCategories", async () => {
    try {
        const response = await axiosInstance.get("/category");
        return response.data;
    } catch (error) {
        toast.error("Error Fetching Categories", {
            position: "bottom-right"
        });
        throw error;
    }
})

export const addProduct = createAsyncThunk("dashboard/addProduct", async (product) => {
    try {
        const response = await axiosInstance.post("/product", product);

        toast.success("Product Added Successfully", {
            position: "bottom-right"
        });

        return response.data;
    } catch (error) {
        toast.error("Error Adding Product", {
            position: "bottom-right"
        });
        throw error;
    }
});

export const updateProduct = createAsyncThunk("dashboard/updateProduct", async ({id, data}) => {
    try {
        console.log("product", data);
        const response = await axiosInstance.put(`/product/${id}`, data);

        toast.success("Product Updated Successfully", {
            position: "bottom-right"
        });

        return response.data;
    } catch (error) {
        toast.error("Error Updating Product", {
            position: "bottom-right"
        });
        throw error;
    }
})

export const deleteProduct = createAsyncThunk("dashboard/deleteProduct", async (productId) => {
    try {
        const response = await axiosInstance.delete(`/product/${productId}`);

        toast.success("Product Deleted Successfully", {
            position: "bottom-right"
        });

        return response.data;
    } catch (error) {
        toast.error("Error Deleting Product", {
            position: "bottom-right"
        });
        throw error;
    }
})

export const getProducts = createAsyncThunk("dashboard/getProducts", async () => {
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

export const getOrders = createAsyncThunk("dashboard/getOrders", async () => {
    try {
        const response = await axiosInstance.get("/order");
        return response.data;
    } catch (error) {
        console.error("Error Fetching Orders", error);
        throw error;
    }
})

export const updateOrderStatus = createAsyncThunk("dashboard/updateOrderStatus", async ({id, status}) => {
    try {
        const response = await axiosInstance.patch(`/order/${id}`, {status});
        return response.data;
    } catch (error) {
        toast.error("Error Updating Order Status", {
            position: "bottom-right"
        });
        throw error;
    }
})

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        })
    }
});

export default dashboardSlice.reducer;