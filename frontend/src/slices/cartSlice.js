import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: {
			cartItems: [],
			billingAddress: {},
			shippingAddress: {},
			paymentMethod: 'Paypal',
			itemsPrice: 0.0,
			shippingPrice: 0.0,
			taxPrice: 0.0,
			totalPrice: 0.0,
		};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const newItem = action.payload;

			const existingItemIndex = state.cartItems.findIndex(
				(x) => x._id === newItem.id
			);

			if (existingItemIndex !== -1) {
				state.cartItems[existingItemIndex] = {
					...state.cartItems[existingItemIndex],
					...newItem,
				};
			} else {
				state.cartItems.push(newItem);
			}
			return updateCart(state);
		},
		addBookingToCart: (state, action) => {
			const booking = action.payload;

			const existingItem = state.cartItems.find(
				(x) => x._id === booking.product
			);

			if (existingItem) {
				existingItem.bookings
					? (existingItem.bookings = [...existingItem.bookings, booking])
					: (existingItem.bookings = new Array(booking));
				console.log(booking, existingItem.bookings);
			} else {
				throw new Error('Product does not exist!');
			}

			return updateCart(state);
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
			return updateCart(state);
		},
		removeBookingFromCart: (state, action) => {
			const { id: productId, bookingDate } = action.payload;

			const productIndex = state.cartItems.findIndex(
				(x) => x._id === productId
			);
			if (productIndex !== -1) {
				const product = state.cartItems[productIndex];
				if (product.bookings) {
					product.bookings = product.bookings.filter(
						(booking) => new Date(booking.bookingDate).getTime() !== bookingDate
					);
				}
				if (product.bookings.length === 0) {
					state.cartItems.splice(productIndex, 1);
				}
			}

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
	addBookingToCart,
	removeFromCart,
	removeBookingFromCart,
	saveShippingAddress,
	saveBillingAddress,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
