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
				(x) => x._id === newItem._id
			);
			if (existingItemIndex === -1) {
				state.cartItems.push(newItem);
			}

			return updateCart(state);
		},
		addBookingToCart: (state, action) => {
			const { productData, bookingDetails } = action.payload;

			const existingItem = state.cartItems.find(
				(item) => item._id === productData._id
			);

			console.log(existingItem);

			if (!existingItem.bookings) {
				existingItem.bookings = [];
			}

			const existingBookingIndex = existingItem.bookings.findIndex(
				(b) =>
					new Date(b.bookingDate).getTime() ===
					new Date(bookingDetails.bookingDate).getTime()
			);

			console.log(existingBookingIndex);

			if (existingBookingIndex !== -1) {
				existingItem.bookings[existingBookingIndex].reservationSeats.qty +=
					bookingDetails.reservationSeats.qty;
			} else {
				existingItem.bookings.push({
					...bookingDetails,
				});
			}
			return updateCart(state);
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
			return updateCart(state);
		},
		updateExistingBooking: (state, action) => {
			const { id: productId, bookingDate, bookingSeats } = action.payload;

			const productIndex = state.cartItems.findIndex(
				(x) => x._id === productId
			);

			const bookingIndex = state.cartItems[productIndex].bookings.findIndex(
				(x) => new Date(x.bookingDate).getTime() === bookingDate
			);

			if (productIndex !== -1 && bookingIndex !== -1) {
				const product = state.cartItems[productIndex];
				if (product.bookings) {
					bookingSeats > 0
						? (product.bookings[bookingIndex].reservationSeats.qty =
								bookingSeats)
						: product.bookings.splice(bookingIndex, 1);
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
	updateExistingBooking,
	saveShippingAddress,
	saveBillingAddress,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
