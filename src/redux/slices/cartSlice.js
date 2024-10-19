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
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);
            const quantityToAdd = newItem.quantity || 1;

            if (existingItem) {
                existingItem.quantity += quantityToAdd;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            } else {
                state.cartItems.push({
                    ...newItem,
                    quantity: quantityToAdd,
                    totalPrice: newItem.price * quantityToAdd,
                });
            }

            state.totalQuantity += quantityToAdd;
            state.totalAmount += newItem.price * quantityToAdd;
        },
        removeFromCart: (state, action) => {
            const { id, quantity = 1 } = action.payload;
            const item = state.cartItems.find((item) => item.id === id);
            if (item) {
                if (item.quantity > quantity) {
                    item.quantity -= quantity;
                    item.totalPrice = item.price * item.quantity;
                } else {
                    state.cartItems = state.cartItems.filter((item) => item.id !== id);
                }
                state.totalQuantity -= quantity;
                state.totalAmount -= item.price * quantity;
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