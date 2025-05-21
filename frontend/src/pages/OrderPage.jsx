import React from 'react';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import { useParams } from 'react-router-dom';
import { FaCalendar, FaMapMarkerAlt, FaPrint } from 'react-icons/fa';
import { motion } from 'motion/react';
import { defaultMotion } from '../constants';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as ics from 'ics';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

const OrderPage = () => {
	const { id: orderId } = useParams();

	const { data: order, isLoading } = useGetOrderDetailsQuery(orderId);

	const handleCreateEventInviteLink = (item, booking) => {
		const startDate = new Date(booking.bookingDate);

		ics.createEvent(
			{
				title: item.name,
				busyStatus: 'BUSY',
				start: [
					startDate.getFullYear(),
					startDate.getMonth() + 1,
					startDate.getDate(),
					startDate.getHours(),
					startDate.getMinutes(),
				],
				duration: { minutes: 60 },
			},
			(error, value) => {
				if (error) {
					console.error(error);
				}
				const blob = new Blob([value], { type: 'text/calendar' });
				saveAs(blob, `${item.name}.ics`);
				toast.success(`Download initiated for${item.name}.ics`);
			}
		);
	};

	const handleOpenMapLink = (locationString) => {
		if (locationString) {
			const q = encodeURIComponent(locationString);
			const url = `https://www.google.com/maps/search/?api=1&query=${q}`;
			window.open(url, '_blank', 'noopener,norefresher');
		} else {
			console.warn('No location string provided!');
		}
	};

	return isLoading ? (
		<h2>Please wait...</h2>
	) : (
		<motion.div
			variants={defaultMotion}
			initial="initial"
			animate="open"
			exit="closed"
			className="flex w-full grow flex-col items-center justify-center space-y-10 text-center text-off-white md:space-y-24"
		>
			<h3 className="text-4xl font-bold">Thank you for your purchase!</h3>
			<div className="flex flex-col flex-wrap items-center divide-y divide-creased-khaki rounded-lg border border-creased-khaki md:w-1/3 md:min-w-[300px]">
				{order.orderItems.map((item, index) =>
					item.bookings.map((booking, index) => (
						<div
							key={item._id}
							className="flex w-full flex-col justify-between gap-4 p-4 text-off-white md:flex-row md:place-items-center md:px-10 lg:space-x-5"
						>
							<div className=" flex flex-col md:w-3/5 md:flex-row md:place-items-center md:space-x-8">
								<img
									src={item.image}
									className="mb-4 aspect-square h-32 rounded-lg object-cover md:mb-0 md:h-16"
									alt=""
								/>
								<div className="flex w-11/12 flex-col text-left">
									<div className="mb-4 truncate text-lg font-bold md:text-xl">
										{item.name}
									</div>
									<div className="flex w-full flex-row justify-between">
										<span className="font-bold">Seats: </span>
										<span>{booking.reservationSeats.qty}</span>
									</div>
									<div className="flex flex-row justify-between">
										<span className="font-bold">Subtotal: </span>
										<span>
											{`$${(item.price * booking.reservationSeats.qty).toFixed(2)}`}
										</span>
									</div>
								</div>
							</div>
							<div className="flex flex-row justify-between space-x-4 md:justify-center">
								<button
									onClick={() => {
										handleCreateEventInviteLink(item, booking);
									}}
									className="my-2 flex w-full place-items-center justify-around rounded-lg border border-creased-khaki p-4 text-creased-khaki md:aspect-square md:w-auto lg:p-3"
								>
									<FaCalendar />
								</button>
								<button
									onClick={() => {
										handleOpenMapLink(item.eventLocation);
									}}
									className="my-2 flex w-full place-items-center justify-around rounded-lg border border-creased-khaki p-4 text-creased-khaki md:aspect-square md:w-auto lg:p-3"
								>
									<FaMapMarkerAlt />
								</button>
							</div>
						</div>
					))
				)}
				<div className="flex w-full flex-row justify-between p-6">
					<div className="font-bold">Placed At:</div>
					<div className="">
						{new Date(order.createdAt).toLocaleDateString('en-US')} @{' '}
						{new Date(order.createdAt).toLocaleTimeString('en-US')}
					</div>
				</div>
				<div className="flex w-full flex-row justify-between p-6">
					<div className="font-bold">Taxes & Other Fees</div>
					<div>${order.taxPrice.toFixed(2)}</div>
				</div>
				<div className="flex w-full flex-row justify-between p-6 text-2xl font-bold text-creased-khaki">
					<div className="">Total</div>
					<div>${order.totalPrice}</div>
				</div>
			</div>
			<button className="flex flex-row place-items-center space-x-1 rounded-lg bg-creased-khaki p-6 font-bold text-noir-de-vigne">
				<span>
					<FaPrint />
				</span>
				<span>Print</span>
			</button>
		</motion.div>
	);
};

export default OrderPage;
