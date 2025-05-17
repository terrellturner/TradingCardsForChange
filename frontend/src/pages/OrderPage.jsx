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

const OrderPage = () => {
	const { id: orderId } = useParams();

	const { data: order, isLoading } = useGetOrderDetailsQuery(orderId);

	const handleCreateEventInviteLink = (item) => {
		ics.createEvent(
			{
				title: item.title,
				description: item.description,
				busyStatus: 'BUSY',
				start: [2018, 1, 15, 6, 30],
				duration: { minutes: 50 },
			},
			(error, value) => {
				if (error) {
					console.log(error);
				}
				const blob = new Blob([value], { type: 'text/calendar' });
				saveAs(blob, `${item.title}.ics`);
				console.log(`Download initiated for${item.title}.ics`);
			}
		);
	};

	return isLoading ? (
		<h2>Please wait...</h2>
	) : (
		<motion.div
			variants={defaultMotion}
			initial="initial"
			animate="open"
			exit="closed"
			className="flex w-full grow flex-col items-center justify-center space-y-24 text-center text-off-white"
		>
			<h3 className="p-4 text-4xl font-bold">Thank you for your purchase!</h3>
			<div className="mx-10 flex flex-col flex-wrap items-center divide-y divide-creased-khaki rounded-lg border border-creased-khaki md:w-1/3 md:min-w-[600px]">
				{order.orderItems.map((item, index) => {
					const startTime = new Date(item.startTime);
					const endTime = new Date(item.startTime);
					return (
						<div
							key={item._id}
							className="flex w-full flex-col justify-between gap-4 p-4 px-10 text-off-white md:flex-row md:place-items-center lg:space-x-5"
						>
							<div className="flex flex-col space-x-8 md:flex-row md:place-items-center">
								<img
									src={item.image}
									className="aspect-square h-32 rounded-lg object-cover md:h-16"
									alt=""
								/>
								<div className="flex flex-col text-left">
									<div className="line-clamp-2 max-w-44 text-lg font-bold">
										{item.name}
									</div>
									<div>Seats: {item.qty}</div>
								</div>
							</div>
							<div className="flex flex-row place-items-center space-x-4">
								<div>${item.price.toFixed(2)}</div>
								<button
									onClick={() => {
										handleCreateEventInviteLink(item);
									}}
									className="my-2 flex aspect-square place-items-center justify-around rounded-lg border border-creased-khaki p-4 text-creased-khaki lg:p-3"
								>
									<FaCalendar />
								</button>
								<button className="my-2 flex aspect-square place-items-center justify-around rounded-lg border border-creased-khaki p-4 text-creased-khaki lg:p-3">
									<FaMapMarkerAlt />
								</button>
							</div>
						</div>
					);
				})}
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
