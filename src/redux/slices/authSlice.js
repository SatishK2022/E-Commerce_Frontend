import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('auth'))?.isLoggedIn || false,
    role: JSON.parse(localStorage.getItem('auth'))?.role || '',
    user: JSON.parse(localStorage.getItem('auth'))?.user || null
}

export const registerUser = createAsyncThunk('auth/signup', async (data) => {
    try {
        const response = await axiosInstance.post("/user/register", data);
        toast.success("User Registered Successfully", {
            position: "bottom-right"
        });
        return response.data;
    } catch (error) {
        toast.error("Error Registering User", {
            position: "bottom-right"
        });
        throw error;
    }
})

export const loginUser = createAsyncThunk('auth/login', async (data) => {
    try {
        const response = await axiosInstance.post("/user/login", data);
        toast.success("User Logged In Successfully", {
            position: "bottom-right"
        });
        return response.data;
    } catch (error) {
        toast.error("Error Logging In", {
            position: "bottom-right"
        });
        throw error;
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    const response = await axiosInstance.get("/user/logout");

    toast.success("Logged Out Successfully", {
        position: "bottom-right"
    });

    return response.data;
})

export const updateUserProfile = createAsyncThunk('auth/updateProfile', async (data) => {
    try {
        const response = await axiosInstance.put("/user/update-profile", data);
        toast.success("Profile Updated Successfully", {
            position: "bottom-right"
        });

        return response.data;
    } catch (error) {
        console.error("Error Updating Profile", error);
        toast.error("Error Updating Profile", {
            position: "bottom-right"
        });
    }
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (data) => {
    try {        
        const response = await toast.promise(
            axiosInstance.post("/user/forgot-password", data),
            {
                pending: "Sending Password Reset Email",
                success: "Password Reset Email Sent",
                error: "Error Sending Password Reset Email"
            },
            {
                position: "bottom-right"
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error Sending Password Reset Email", error);
        throw error;
    }
})

export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (data) => {
    try {
        const response = await axiosInstance.post("/user/verify-otp", data);
        toast.success("OTP Verified Successfully", {
            position: "bottom-right"
        });
        return response.data;
    } catch (error) {
        console.error("Error Verifying OTP", error);
        toast.error("Error Verifying OTP", {
            position: "bottom-right"
        });
        throw error;
    }
})

export const resetPassword = createAsyncThunk('auth/resetPassword', async (data) => {
    try {
        const response = await axiosInstance.post("/user/reset-password", data);
        toast.success("Password Reset Successfully", {
            position: "bottom-right"
        });
        return response.data;
    } catch (error) {
        console.error("Error Resetting Password", error);
        toast.error("Error Resetting Password", {
            position: "bottom-right"
        });
        throw error;
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.isLoggedIn = true;
                    state.role = action.payload.data.role;
                    state.user = action.payload.data;
                    localStorage.setItem('auth', JSON.stringify({
                        isLoggedIn: true,
                        role: action.payload.data.role,
                        user: action.payload.data
                    }));
                }
            })
            .addCase(logout.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    state.isLoggedIn = false;
                    state.role = '';
                    state.user = null;
                    localStorage.removeItem('auth');
                }
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    state.user = action.payload.data;
                }
            })
    }
})

export default authSlice.reducer;