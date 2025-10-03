import React from 'react';
import { motion } from 'motion/react';
import ProductCard from '../ProductCard';

const CalendarEventModal = ({
	selectedEvent,
	setSelectedEvent,
	setIsCalendarEventOpen,
	onArchiveProduct,
	onSnoozeEvent,
}) => {
	const MotionProductCard = motion(ProductCard);

	const productCardVariants = {
		initial: {
			opacity: 0,
			transition: {
				ease: ['easeIn', 'easeOut'],
				duration: 0.5,
			},
		},
		open: {
			opacity: 1,
			transition: {
				ease: ['easeIn', 'easeOut'],
				duration: 0.5,
			},
		},
		closed: {
			opacity: 0,
			transition: {
				ease: ['easeIn', 'easeOut'],
				duration: 0.5,
			},
		},
	};

	const handleCloseModal = () => {
		setIsCalendarEventOpen(false);
		setSelectedEvent(null);
	};
	console.log(selectedEvent);

	return <></>;
};

export default CalendarEventModal;
