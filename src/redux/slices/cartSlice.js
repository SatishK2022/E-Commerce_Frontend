import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    totalAmount: localStorage.getItem("totalAmount") ? localStorage.getItem("totalAmount") : 0,
    totalQuantity: localStorage.getItem("totalQuantity") ? localStorage.getItem("totalQuantity") : 0,
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

            localStorage.setItem("cart", JSON.stringify(state.cartItems));
            localStorage.setItem("totalAmount", state.totalAmount);
            localStorage.setItem("totalQuantity", state.totalQuantity);
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

            localStorage.setItem("cart", JSON.stringify(state.cartItems));
            localStorage.setItem("totalAmount", state.totalAmount);
            localStorage.setItem("totalQuantity", state.totalQuantity);
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;

            localStorage.removeItem("cart");
            localStorage.removeItem("totalAmount");
            localStorage.removeItem("totalQuantity");
        }
    }
});

export const { addToCart, removeFromCart, clearCart, getCart } = cartSlice.actions;
export default cartSlice.reducer;