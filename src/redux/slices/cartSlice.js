import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
                item.totalPrice = item.price * item.quantity;
            } else {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                    totalPrice: action.payload.price,
                });
            }
            state.totalQuantity += 1;
            state.totalAmount += action.payload.price;
        },
        removeFromCart: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload.id);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    item.totalPrice = item.price * item.quantity;
                } else {
                    state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
                }
                state.totalQuantity -= 1;
                state.totalAmount -= item.price;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;