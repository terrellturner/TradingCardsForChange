import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToCart,
	removeBookingFromCart,
	removeFromCart,
} from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FaGhost, FaTrash } from 'react-icons/fa';
import { motion } from 'motion/react';
import { defaultMotion } from '../constants';

const CartPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [cartTrigger, setCartTrigger] = useState(false);

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const addToCartHandler = async (product, qty) => {
		dispatch(addToCart({ ...product, qty }));
	};

	const removeFromCartHandler = async (id, bookingDate) => {
		dispatch(removeBookingFromCart({ id, bookingDate }));
	};

	const checkoutHandler = async () => {
		try {
			navigate(`/checkout/`);
		} catch (err) {
			console.log(err);
		}
	};

	return cart.cartItems.length > 0 ? (
		<motion.div
			variants={defaultMotion}
			initial="initial"
			animate="open"
			exit="closed"
			className="mx-auto flex h-full grow flex-col py-5"
		>
			<h1 className="p-3 text-4xl text-off-white">Shopping Cart</h1>
			<div
				id="cart-page-container"
				className="flex flex-col md:w-full md:flex-row md:place-content-around"
			>
				{/* Cart Items */}
				<div
					id="cart-item-container"
					className="flex-col place-items-center space-y-8 p-10"
				>
					{cartItems.map((item) => {
						return item.bookings.map((booking) => (
							<div
								key={booking.bookingDate}
								className="flex flex-col space-y-8 rounded-lg border border-creased-khaki p-5  text-white md:w-full md:min-w-[420px] md:flex-row md:space-x-8"
							>
								<img
									src={item.image}
									className="aspect-square h-[200px] rounded-lg object-cover"
									alt=""
								/>
								<div className="flex flex-col justify-between">
									<div>
										<div className="text-3xl font-bold">{item.name}</div>
										<div className="text-2xl font-bold italic text-creased-khaki">
											{new Date(booking.bookingDate).toDateString()}
										</div>
										<div className="text-xl">${item.price}</div>
									</div>
									<div className="flex flex-row space-x-4">
										{item.countInStock > 0 && (
											<select
												name="qty"
												id="qty"
												value={booking.qty}
												className="my-2 w-full rounded-xl border-2 border-creased-khaki bg-noir-de-vigne px-2 md:w-1/2"
												onChange={(e) =>
													addToCartHandler(item, Number(e.target.value))
												}
											>
												{[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</select>
										)}
										<button
											onClick={() => {
												removeFromCartHandler(
													item._id,
													new Date(booking.bookingDate).getTime()
												);
											}}
											className="my-2 aspect-square rounded-lg bg-creased-khaki p-5 text-emerald-green"
										>
											<FaTrash />
										</button>
									</div>
								</div>
							</div>
						));
					})}
				</div>
				{/* Cart Summary */}
				<div
					id="cart-total-checkout-container"
					className="flex flex-col place-items-center px-10 "
				>
					<div className="rounded-lg border border-creased-khaki p-8 md:min-w-[300px]">
						<div className="flex flex-col space-y-5 px-3">
							<div className="pb-5 text-3xl text-off-white">
								Order Summary ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
							</div>
							<div className="grid grid-cols-1 divide-y divide-creased-khaki rounded-lg border-creased-khaki">
								<div className="flex flex-row justify-between p-4 text-off-white">
									<span>Subtotal</span>
									<span>${cart.itemsPrice}</span>
								</div>
								<div className="flex flex-row justify-between p-4 text-off-white">
									<span>Taxes</span>
									<span>${cart.taxPrice}</span>
								</div>
								<div className="flex flex-row justify-between p-4 text-off-white">
									<span>Shipping</span>
									<span>${cart.shippingPrice}</span>
								</div>
							</div>

							<div className="text-lg text-off-white"></div>

							<button
								type="button"
								className="w-full rounded-lg bg-creased-khaki p-3 text-lg font-medium"
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed to Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	) : (
		<motion.div
			variants={defaultMotion}
			initial="initial"
			animate="open"
			exit="closed"
			className="flex grow flex-col items-stretch bg-noir-de-vigne text-off-white"
		>
			<div className="flex h-full grow flex-col items-center justify-center">
				<FaGhost className="fill-creased-khaki text-9xl" />
				<div className="text-center text-4xl font-bold">
					<div>Oh no!</div>
					<div>The cart's empty...</div>
				</div>
			</div>
		</motion.div>
	);
};

export default CartPage;
