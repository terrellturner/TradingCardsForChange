import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], billingAddress: {}, shippingAddress: { fName: "", lName: "", address: "", addressSecondary: "", postalCode: "", city: "", state: "", country: "" }, paymentMethod: "Paypal", };

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
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        saveBillingAddress: (state, action) => {
            state.billingAddress = action.payload;
            return updateCart(state);
        },
        clearCart: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    saveBillingAddress,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
