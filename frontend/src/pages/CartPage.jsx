import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaGhost, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'motion/react';
import { defaultMotion } from '../constants';
import EventBookingQuantityPicker from '../components/UI/EventBookingQuantityPicker';

const CartPage = () => {
	const [cartCount, setCartCount] = useState(Number);
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const checkoutHandler = async () => {
		navigate(`/checkout/`);
	};

	useEffect(() => {
		setCartCount(cartItems.length);
	}, [cartItems, cartCount]);

	return cart.cartItems.length > 0 ? (
		<motion.div
			variants={defaultMotion}
			initial="initial"
			animate="open"
			exit="closed"
			className="mx-auto flex w-full max-w-[1080px] grow flex-col justify-center space-y-2 px-6 py-5"
		>
			<div className="flex flex-row place-items-center space-x-2">
				<FaShoppingCart className="fill-creased-khaki stroke-egyptian-earth stroke-[20px] text-4xl" />
				<h1 className=" p-8 pl-0 text-4xl font-bold text-off-white">My Cart</h1>
			</div>
			<div
				id="cart-page-container"
				className="flex flex-col place-items-center space-y-4 md:w-full md:flex-row md:place-content-around md:space-x-4 md:space-y-0 md:py-20"
			>
				{/* Cart Items */}
				<div
					id="cart-item-container"
					className="flex-col place-items-center space-y-8"
				>
					{cartItems.map((item) => {
						return item?.bookings?.map((booking) => (
							<div
								key={booking.bookingDate}
								className="flex flex-col space-y-8 rounded-lg border border-creased-khaki p-5 text-white  md:w-3/4 md:min-w-[420px] md:flex-row md:space-x-8"
							>
								<img
									src={item.image}
									className="aspect-square h-[200px] rounded-lg object-cover"
									alt={`${item.name} - ${booking.bookingDate}`}
								/>
								<div className="flex flex-col justify-between">
									<div>
										<div className="text-2xl font-bold">{item.name}</div>
										<div className="text-xl font-bold italic text-creased-khaki">
											{new Date(booking.bookingDate).toDateString()}
										</div>
										<div>
											<div>Subtotal:</div>
											<div>${item.price * booking.reservationSeats.qty}</div>
										</div>
									</div>
									<div className="flex h-16 flex-row space-x-4">
										<EventBookingQuantityPicker
											booking={booking}
											product={item}
										/>
									</div>
								</div>
							</div>
						));
					})}
				</div>
				{/* Cart Summary */}
				<div
					id="cart-total-checkout-container"
					className="flex w-full flex-col"
				>
					<div className="rounded-lg border border-creased-khaki p-8 lg:min-w-[300px]">
						<div className="flex flex-col space-y-5 px-3">
							<div className="flex flex-row flex-wrap space-y-1 pb-5 text-3xl text-creased-khaki">
								<span className="font-bold ">Order Summary</span>({cartCount}{' '}
								{cartCount > 1 ? 'items' : 'item'})
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
									<span>$0</span>
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
			className="flex h-full grow flex-col items-stretch bg-noir-de-vigne text-off-white"
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
