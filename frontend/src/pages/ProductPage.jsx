import React, { useState, useEffect } from 'react';
import {
	Link,
	useParams,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { useGetBookingsPerEventQuery } from '../slices/bookingApiSlice';
import { addToCart, addBookingToCart } from '../slices/cartSlice';
import { motion } from 'motion/react';
import { defaultMotion } from '../constants';
import createEventRecurrences from '../utils/eventUtils';
import Loader from '../components/UI/Loader';
import { toast } from 'react-toastify';

const ProductPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const { id: productId } = useParams();
	const rsvpDate = searchParams.get('rsvpDate') || '';

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [qty, setQty] = useState(1);
	const [qtyOptionsArray, setQtyOptionsArray] = useState([]);
	const [availableDates, setAvailableDates] = useState([]);
	const [selectedDate, setSelectedDate] = useState('');

	const {
		data: product,
		isLoading,
		error,
		isSuccess,
	} = useGetProductDetailsQuery(productId);

	const skipQuery = !isSuccess || !product?.startTime;

	const {
		data: bookingInfo,
		isLoading: bookingIsLoading,
		isSuccess: bookingQuerySucccessful,
		error: getBookingError,
	} = useGetBookingsPerEventQuery(
		{
			productId: productId,
			eventStartTime: rsvpDate ? new Date(rsvpDate).toISOString() : undefined,
		},
		{ skip: skipQuery }
	);

	const addToCartHandler = () => {
		dispatch(addToCart(product));
		addBookingHandler();
		navigate('/cart');
	};

	const addBookingHandler = () => {
		dispatch(
			addBookingToCart({
				productData: { ...product },
				bookingDetails: {
					reservationSeats: { qty },
					bookingDate: new Date(selectedDate).toISOString(),
					status: 'pending',
				},
			})
		);
	};

	const handleChangeDate = (e) => {
		setSelectedDate(new Date(e.target.value));
		if (product && product.rrule) {
			const newSelectedDateIso = e.target.value;
			setSelectedDate(newSelectedDateIso);

			setSearchParams(
				(prevParams) => {
					if (newSelectedDateIso) {
						prevParams.set('rsvpDate', newSelectedDateIso);
					} else {
						prevParams.delete('rsvpDate');
					}
					return prevParams;
				},
				{ replace: true }
			);
		}
	};

	useEffect(() => {
		if (bookingQuerySucccessful && product) {
			setQtyOptionsArray(
				Array.from(
					{
						length:
							product.maximumEventCapacity - bookingInfo.totalReservations,
					},
					(_, index) => index + 1
				)
			);
			if (product.rrule) {
				setAvailableDates(createEventRecurrences(product));
			}
		}

		if (rsvpDate) {
			setSelectedDate(new Date(rsvpDate).toISOString());
		} else if (availableDates && availableDates.length > 0) {
			setSelectedDate(new Date(availableDates[0].startTime).toISOString());
		}
	}, [bookingInfo, product]);

	if (isLoading || !bookingQuerySucccessful) {
		return <Loader />;
	} else if (error) {
		toast.error(error?.data?.message || error.error);
		return;
	}
	return (
		<>
			{/* Navigation button */}
			<motion.div
				variants={defaultMotion}
				initial="initial"
				animate="open"
				exit="closed"
				className="min-w-80 grow px-12 py-8"
			>
				<Link to="/">
					<button className="h-12 w-28 rounded-md border-creased-khaki bg-emerald-green text-creased-khaki">
						Go Back
					</button>
				</Link>
				<section className="mx-auto flex max-w-screen-2xl flex-col flex-wrap place-items-center space-y-5 py-8  md:flex-row md:justify-around md:space-y-14 xl:flex-nowrap">
					<img
						src={product.image}
						className="aspect-square object-cover md:max-h-80 md:w-1/2"
						alt={product.description}
					/>
					{/* Product Details */}
					<div className="flex w-full flex-col space-y-3 divide-y-2 md:w-1/2 md:min-w-52 md:px-16">
						<h3 className="p-4 text-4xl text-off-white">{product.name}</h3>
						<span className="border-creased-khaki p-4 pb-0 text-lg font-bold text-off-white">
							<FaUser className="my-auto inline" />
							{bookingInfo?.totalReservations}/
							{product.maximumEventCapacity ?? 0}
						</span>
						<span className="border-creased-khaki p-4 pb-0 text-lg font-bold text-off-white">
							Category: {product.category}
						</span>
						<span className="border-creased-khaki p-4 pb-0 text-off-white">
							{product.description}
						</span>
					</div>
					{/* Order Details */}
					<div className="flex h-1/3 w-full flex-col justify-around divide-y-2 rounded-md border border-creased-khaki md:mx-36 md:p-10 lg:mx-0 lg:w-1/2">
						<div className="flex justify-between space-x-3 border-creased-khaki p-4 text-off-white">
							<span>Ticket Price: </span>
							<span>${product.price}</span>
						</div>
						<div className="flex justify-between space-x-3 border-creased-khaki p-4 text-off-white">
							<span>Seats Available? </span>
							<span>
								{bookingInfo.totalReservations >= product.maximumEventCapacity
									? 'Sold Out!'
									: 'Yes!'}
							</span>
						</div>
						<div className="flex justify-between space-x-3 border-creased-khaki p-4 text-off-white">
							<span>Reservation Date</span>

							{
								<select
									name="reservation"
									id="reservation"
									value={selectedDate}
									className="w-full border-creased-khaki bg-noir-de-vigne md:w-1/2"
									onChange={(e) => {
										() => {
											handleChangeDate(e);
										};
									}}
								>
									{product.rrule ? (
										availableDates.map((e) => {
											return (
												<option
													key={new Date(e.startTime).toISOString()}
													value={new Date(e.startTime).toISOString()}
												>
													{new Date(e.startTime).toLocaleDateString()},{' '}
													{new Date(e.startTime).toLocaleTimeString([], {
														hour: '2-digit',
														minute: '2-digit',
														hour12: true,
													})}
												</option>
											);
										})
									) : (
										<option value={new Date(product.startTime).toISOString()}>
											{new Date(product.startTime).toISOString()}
										</option>
									)}
								</select>
							}
						</div>
						<div className="flex justify-between space-x-3 border-creased-khaki p-4 text-off-white">
							<span>Seats to Reserve</span>

							{product.maximumEventCapacity - bookingInfo.totalReservations >
								0 && (
								<select
									name="qty"
									id="qty"
									className="w-full border-creased-khaki bg-noir-de-vigne md:w-1/2"
									onChange={(e) => setQty(Number(e.target.value))}
								>
									{qtyOptionsArray.map((e) => {
										return (
											<option key={e} value={e}>
												{e}
											</option>
										);
									})}
								</select>
							)}
						</div>
						<span className="flex justify-center border-creased-khaki p-4 pb-0 text-off-white">
							<button
								disabled={product.countInStock === 0}
								className="disabled: h-12 w-28 rounded-md bg-emerald-green text-creased-khaki disabled:text-noir-de-vigne"
								onClick={addToCartHandler}
							>
								Add to Cart
							</button>
						</span>
					</div>
				</section>
			</motion.div>
		</>
	);
};

export default ProductPage;
