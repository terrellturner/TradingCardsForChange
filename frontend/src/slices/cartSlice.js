import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "Paypal" };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find((x) => x._id === item._id);

            if (existingItem) {
                state.cartItems = state.cartItems.map((x) =>
                x._id === existingItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
                return updateCart(state);
            },
        },
});

export const {
  addToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
