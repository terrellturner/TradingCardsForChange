import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import {
	useUpdateBookingMutation,
	useGetBookingsPerEventQuery,
} from '../../slices/bookingApiSlice';
import SkeletonLoader from '../UI/SkeletonLoader';
import ProductCard from '../ProductCard';

const CalendarSection = ({ eventList }) => {
	const [isCalendarEventOpen, setIsCalendarEventOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);

	const [updateBooking, { isLoading: isUpdateBookingLoading }] =
		useUpdateBookingMutation();

	const { data: bookingInfo, isSuccess: bookingLoadingSuccessful } =
		useGetBookingsPerEventQuery(
			{
				productId: selectedEvent?._id,
				eventStartTime: selectedEvent?.start
					? new Date(selectedEvent?.start).toISOString()
					: null,
			},
			{ skip: !selectedEvent }
		);

	const onSnoozeEvent = async (event) => {
		try {
			await updateBooking().unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	const onArchiveProduct = async (event) => {
		try {
			await updateBooking().unwrap();
		} catch (error) {
			console.error(error);
		}
	};

	const locales = {
		'en-US': enUS,
	};

	const localizer = dateFnsLocalizer({
		format,
		parse,
		startOfWeek,
		getDay,
		locales,
	});

	const handleEventClick = (event) => {
		setSelectedEvent(event);
		setIsCalendarEventOpen(true);
	};

	const handleCloseEventModal = () => {
		setSelectedEvent(null);
		setIsCalendarEventOpen(false);
	};

	return (
		<AnimatePresence>
			<div className="hidden h-full w-full flex-col items-center space-y-5 overflow-hidden md:flex">
				<h3 className="py-12 text-center font-serif text-6xl text-creased-khaki md:py-6 md:text-7xl">
					Scheduled Events
				</h3>
				{
					<div
						id="calendar"
						className={`relative hidden w-full justify-center md:flex`}
					>
						<Calendar
							localizer={localizer}
							events={eventList.map((product) => ({
								_id: product?._id,
								title: product.title,
								start: new Date(product.startTime),
								end: new Date(product.endTime),
								image: product.image,
								maximumEventCapacity: product.maximumEventCapacity,
								description: product.description,
							}))}
							startAccessor="start"
							endAccessor="end"
							views={['month', 'week', 'day']}
							className={`relative h-full w-5/6 max-w-[80rem] text-creased-khaki`}
							style={{ height: '60rem' }}
							onSelectEvent={(e) => {
								handleEventClick(e);
							}}
							eventPropGetter={(event) => {
								return event.start > new Date()
									? { className: `current-future-event` }
									: { className: `past-event` };
							}}
						/>
						{bookingLoadingSuccessful &&
							isCalendarEventOpen &&
							(selectedEvent ? (
								<div className="absolute top-[20%] z-50 w-1/4 min-w-[30rem]">
									{console.log(bookingInfo)}
									<ProductCard
										productDetails={{
											startTime: selectedEvent.start,
											endTime: selectedEvent.end,
											name: selectedEvent.title,
											description: selectedEvent.description,
											image: selectedEvent.image,
											_id: selectedEvent._id,
											totalReservations: bookingInfo.totalReservations,
											maximumEventCapacity: selectedEvent.maximumEventCapacity,
											isRecurring: selectedEvent.isRecurring,
											onArchiveProduct,
											onSnoozeEvent,
										}}
										handleCloseModal={handleCloseEventModal}
										initial="initial"
										animate="open"
										exit="closed"
									></ProductCard>
								</div>
							) : (
								<SkeletonLoader
									classNames={`space-y-3 justify-around absolute top-[20%] z-50 w-1/4 min-w-[30rem] p-5 bg-white rounded-lg flex flex-col`}
								>
									<div className="mt-3 h-52 w-full animate-pulse rounded-lg bg-slate-500 md:h-72"></div>
									<div className="h-24 w-full animate-pulse rounded-lg bg-slate-200"></div>
									<div className="flex animate-pulse rounded-lg bg-slate-400 text-center font-bold text-creased-khaki ">
										<div className="h-12 w-24 p-1 text-xl"></div>
									</div>
								</SkeletonLoader>
							))}
					</div>
				}
			</div>
		</AnimatePresence>
	);
};

export default CalendarSection;

CalendarSection.propTypes = {
	eventList: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			start: PropTypes.string,
			end: PropTypes.string,
			id: PropTypes.string,
			image: PropTypes.string,
			description: PropTypes.string,
			countInStock: PropTypes.number,
			maximumEventCapacity: PropTypes.number,
			isRecurring: PropTypes.bool,
		})
	),
};
