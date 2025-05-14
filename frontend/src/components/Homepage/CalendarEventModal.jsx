import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../ProductCard';
import { Link } from 'react-router-dom';


const CalendarEventModal = ({
	selectedEvent,
	setSelectedEvent,
	setIsCalendarEventOpen,
}) => {
	const MotionProductCard = motion(ProductCard);

	console.log('Query Args:', {
		productId: selectedEvent._id,
		eventStartTime: new Date(selectedEvent.start).toISOString(),
	});

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

	return (
		<motion.div className="absolute top-[20%] z-50 w-1/4 min-w-[30rem]">
			<MotionProductCard
				product={{
					startTime: selectedEvent.start,
					endTime: selectedEvent.end,
					name: selectedEvent.title,
					description: selectedEvent.description,
					image: selectedEvent.image,
					_id: selectedEvent._id,
					countInStock: selectedEvent.countInStock,
					maximumEventCapacity: selectedEvent.maximumEventCapacity,
					isRecurring: selectedEvent.isRecurring,
				}}
				variants={productCardVariants}
				initial="initial"
				animate="open"
				exit="closed"
				handleCloseModal={handleCloseModal}
			>
			</MotionProductCard>
		</motion.div>
	);
};

export default CalendarEventModal;
