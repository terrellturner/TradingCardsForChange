import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { useGetPayPalClientIdQuery } from '../slices/ordersApiSlice';
import ContentContainer from '../components/ContentContainer';
import FormRequiredFieldAlert from '../components/Forms/FormRequiredFieldAlert';
import CheckoutForm from '../components/Forms/CheckoutForm';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { useCreateBookingMutation } from '../slices/bookingApiSlice';

import { clearCart, removeFromCart } from '../slices/cartSlice';
import { motion } from 'motion/react';
import { defaultMotion } from '../constants';
import EventBookingQuantityPicker from '../components/UI/EventBookingQuantityPicker';

const CheckoutPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const auth = useSelector((state) => state.auth);

	const modalRef = useRef(null);

	const { cartItems } = cart;

	const [shippingModalOpen, setShippingModalToggle] = useState(false);

	const { userInfo } = useSelector((state) => state.auth);

	const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

	const {
		data: paypal,
		isLoading: loadingPayPal,
		error: errorPayPal,
	} = useGetPayPalClientIdQuery();

	const [newBooking] = useCreateBookingMutation();
	const [newOrder] = useCreateOrderMutation();

	useEffect(() => {
		const handleModalOuterClick = (e) => {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				setShippingModalToggle(false);
			}
		};

		try {
			if (!errorPayPal && !loadingPayPal && paypal.clientId) {
				const loadPayPalScript = async () => {
					payPalDispatch({
						type: 'resetOptions',
						value: {
							'client-id': paypal.clientId,
							currency: 'USD',
						},
					});
					payPalDispatch({ type: 'setLoadingStatus', value: 'pending' });
				};
				if (!window.paypal) {
					loadPayPalScript();
				}
			}
		} catch (error) {
			console.log(error);
		}

		document.addEventListener('click', handleModalOuterClick);
	}, [errorPayPal, loadingPayPal, paypal, payPalDispatch, modalRef]);

	const placeOrderHandler = async () => {
		try {
			const res = await newOrder({
				orderItems: cart.cartItems.map((item) => ({
					...item,
					qty: item.bookings.reduce(
						(total, booking) => total + booking.reservationSeats.qty,
						0
					),
				})),
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			}).unwrap();

			const orderId = res._id;

			await Promise.all(
				cart.cartItems?.map((item) =>
					item.bookings?.flatMap((booking) =>
						newBooking({
							product: item._id,
							reservationSeats: booking.reservationSeats.qty,
							bookingDate: new Date(booking.bookingDate).toISOString(),
							status: 'confirmed',
							order: orderId,
							user: userInfo._id,
						}).unwrap()
					)
				)
			);

			dispatch(clearCart());
			navigate(`/order/${res._id}`);
			toast.success('Payment successful.');
		} catch (err) {
			console.error('Order failed. Full error:', JSON.stringify(err, null, 2));
			toast.error(err);
		}
	};

	async function createOrder(data, actions) {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: {
							value: cart.totalPrice,
						},
					},
				],
			})
			.then((orderId) => {
				return orderId;
			});
	}

	const removeFromCartHandler = async (id) => {
		dispatch(removeFromCart(id));
		if (cartItems.length === 1) {
			navigate('/cart');
		}
	};

	function onApprove(data, actions) {
		return actions.order.capture().then(async function () {
			try {
				placeOrderHandler();
			} catch (error) {
				toast.error(error?.data?.message || error.message);
			}
		});
	}

	function onError(error) {
		toast.error(error.message);
	}

	function handleShippingModalToggle() {
		setShippingModalToggle(!shippingModalOpen);
	}

	return (
		<motion.div
			variants={defaultMotion}
			initial="initial"
			animate="open"
			exit="closed"
			className="mx-auto flex w-full min-w-52 grow flex-col place-items-center py-5 md:px-20"
		>
			<h1 className="mb-10 self-start p-3 text-4xl font-bold text-off-white">
				Checkout
			</h1>
			<div className="-mt-10 flex w-full grow flex-col place-content-center space-y-5 md:space-x-10 md:space-y-0 lg:flex-row">
				<div className="flex flex-col place-items-center md:w-1/2 md:flex-row">
					{shippingModalOpen && (
						<CheckoutForm
							handleClick={handleShippingModalToggle}
							cartItems={cart.cartItems}
						/>
					)}
					<ContentContainer className="flex w-full flex-col space-y-10 border-none">
						<h3 className="text-center text-2xl lg:text-left">
							Contact Information
						</h3>
						<div
							className="grid w-full cursor-pointer grid-cols-2 rounded-lg border border-creased-khaki p-5"
							onClick={handleShippingModalToggle}
						>
							<span>
								<div className="text-xl font-bold">First Name </div>
								{auth.userInfo?.firstName ? (
									auth.userInfo?.firstName
								) : cart.shippingAddress?.fName ? (
									cart.shippingAddress?.fName
								) : (
									<FormRequiredFieldAlert />
								)}
							</span>
							<span>
								<div className="text-xl font-bold">Last Name </div>
								{auth.userInfo?.lastName ? (
									auth.userInfo?.lastName
								) : cart.shippingAddress?.lName ? (
									cart.shippingAddress?.lName
								) : (
									<FormRequiredFieldAlert />
								)}
							</span>
							<span>
								<div className="text-xl font-bold">Address</div>
								{cart.shippingAddress.address ? (
									cart.shippingAddress.address
								) : (
									<FormRequiredFieldAlert />
								)}
							</span>
							<span>
								<div className="text-xl font-bold">Address Line 2 </div>
								{cart.shippingAddress.addressSecondary ? (
									cart.shippingAddress.addressSecondary
								) : (
									<FormRequiredFieldAlert />
								)}
							</span>
							<span>
								<div className="text-xl font-bold">City </div>
								{cart.shippingAddress.city ? (
									cart.shippingAddress.city
								) : (
									<FormRequiredFieldAlert />
								)}
							</span>
							<span>
								<div className="text-xl font-bold">State </div>
								{cart.shippingAddress.state ? (
									cart.shippingAddress.state
								) : (
									<FormRequiredFieldAlert />
								)}
							</span>
							<span>
								<div className="text-xl font-bold">ZIP/Postal </div>
								{cart.shippingAddress.postalCode ? (
									cart.shippingAddress.postalCode
								) : (
									<FormRequiredFieldAlert />
								)}
							</span>
							<span>
								<div className="text-xl font-bold">Country </div>
								{cart.shippingAddress.country ? (
									cart.shippingAddress.country
								) : (
									<FormRequiredFieldAlert />
								)}
							</span>
						</div>
						<div className="flex flex-col">
							<h2 className="pb-5 text-2xl text-off-white">Order Items</h2>
							{cart.cartItems?.map((item) =>
								item.bookings?.map((booking) => (
									<div
										key={`${item._id}-${booking.reservationSeats.qty}-${booking.bookingDate}`}
										className="flex w-full flex-row place-items-center gap-4 rounded-lg p-5 text-off-white lg:space-x-5"
									>
										<img
											src={item.image}
											className="aspect-square h-16 rounded-lg object-cover"
											alt=""
										/>
										<div className="flex flex-col pl-4">
											<div className="flex flex-col lg:block">
												<span className="text-xl font-bold">{item.name}</span>
												<span className="mx-2 text-creased-khaki">
													{new Date(booking.bookingDate).toLocaleDateString()}
												</span>
											</div>
											<EventBookingQuantityPicker
												booking={booking}
												product={item}
											/>
										</div>
									</div>
								))
							)}
						</div>
					</ContentContainer>
				</div>
				<div
					id="cart-total-checkout-container"
					className="flex flex-col place-items-center md:flex-row"
				>
					<div className="z-0 space-y-3 divide-y-2 divide-creased-khaki rounded-lg border border-creased-khaki p-8">
						<div className="px-3">
							<div className="text-3xl text-off-white">
								Subtotal ({cart.itemsPrice})
							</div>
							<div className="text-lg text-off-white">${cart.totalPrice}</div>
						</div>
						<PayPalButtons
							createOrder={createOrder}
							onApprove={onApprove}
							onError={onError}
						/>
						<button
							onClick={placeOrderHandler}
							className="bg-creased-khaki p-4 text-2xl font-bold text-emerald-green"
						>
							Test Order
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
export default CheckoutPage;
