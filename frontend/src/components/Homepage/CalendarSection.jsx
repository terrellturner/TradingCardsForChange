import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import CalendarEventModal from './CalendarEventModal';

const CalendarSection = ({ eventList }) => {
	const [isCalendarEventOpen, setIsCalendarEventOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);

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

	return (
		<AnimatePresence>
			<div className="flex w-full flex-col items-center space-y-5">
				<h3 className="mb-6 text-center font-serif text-7xl text-creased-khaki">
					Scheduled Events
				</h3>
				{
					<div
						id="calendar"
						className="relative hidden w-full justify-center md:flex"
					>
						<Calendar
							localizer={localizer}
							events={eventList.map((product) => ({
								_id: product._id,
								title: product.title,
								start: new Date(product.startTime),
								end: new Date(product.endTime),
								image: product.image,
								description: product.description,
								maximumEventCapacity: product.maximumEventCapacity,
								isRecurring: product.isRecurring,
							}))}
							startAccessor="start"
							endAccessor="end"
							className="relative h-[50rem] w-5/6 max-w-[1200px] text-creased-khaki"
							style={{ height: '50rem' }}
							onSelectEvent={(e) => {
								handleEventClick(e);
							}}
						/>
						{isCalendarEventOpen && selectedEvent && (
							<CalendarEventModal
								key={selectedEvent._id}
								selectedEvent={selectedEvent}
								setSelectedEvent={setSelectedEvent}
								setIsCalendarEventOpen={setIsCalendarEventOpen}
							/>
						)}
					</div>
				}
			</div>
		</AnimatePresence>
	);
};

export default CalendarSection;

CalendarSection.propTypes = {
	products: PropTypes.arrayOf(
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
