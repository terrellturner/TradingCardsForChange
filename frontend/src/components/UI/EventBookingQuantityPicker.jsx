import React, { useEffect, useState } from 'react';
import { useGetBookingsPerEventQuery } from '../../slices/bookingApiSlice';
import { updateExistingBooking } from '../../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Loader from '../UI/Loader';

const EventBookingQuantityPicker = ({ booking, product }) => {
	const dispatch = useDispatch();

	const [reservationSeats, setReservationSeats] = useState(0);

	const {
		data: bookingInfo,
		isLoading: bookingIsLoading,
		isSuccess: bookingQuerySucccessful,
		error: getBookingError,
	} = useGetBookingsPerEventQuery({
		eventStartTime: new Date(booking.bookingDate).toISOString(),
		productId: product._id,
	});

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const modifyBookingHandler = async (id, bookingDate, bookingSeats) => {
		dispatch(updateExistingBooking({ id, bookingDate, bookingSeats }));
	};

	useEffect(() => {
		if (cartItems) {
			const productIndex = cartItems.findIndex(
				(item) => item._id === product._id
			);
			const bookingIndex = cartItems[productIndex].bookings.findIndex(
				(b) =>
					new Date(b.bookingDate).getTime() ===
					new Date(booking.bookingDate).getTime()
			);
			setReservationSeats(
				cartItems[productIndex].bookings[bookingIndex].reservationSeats.qty
			);
		}
	}, [reservationSeats, cartItems, booking]);

	if (bookingIsLoading) {
		return <Loader />;
	}

	return (
		<div className="flex w-full flex-row space-x-4">
			<select
				name="qty"
				id="qty"
				value={reservationSeats}
				className="my-2 w-full rounded-xl border-2 border-creased-khaki bg-noir-de-vigne px-2 md:w-1/2"
				onChange={(e) =>
					modifyBookingHandler(
						product._id,
						new Date(booking.bookingDate).getTime(),
						e.target.value
					)
				}
			>
				{[
					...Array(
						product.maximumEventCapacity - bookingInfo.totalReservations
					).keys(),
				].map((x) => (
					<option key={x + 1} value={x + 1}>
						{x + 1}
					</option>
				))}
			</select>
			<button
				onClick={() => {
					modifyBookingHandler(
						product._id,
						new Date(booking.bookingDate).getTime(),
						0
					);
				}}
				className="my-2 flex aspect-square h-12 items-center rounded-lg bg-creased-khaki p-5 text-emerald-green"
			>
				<FaTrash />
			</button>
		</div>
	);
};

export default EventBookingQuantityPicker;
