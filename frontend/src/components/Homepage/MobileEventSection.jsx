import React from 'react';
import ProductCard from '../ProductCard';
import { motion, AnimatePresence } from 'motion/react';

const MobileEventSection = ({ mobileEvents }) => {
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

	console.log(mobileEvents);

	return (
		<div className="mx-auto my-10 grid w-4/5 max-w-[90rem] grid-cols-1 gap-10 md:hidden md:min-h-[70dvh] md:grid-cols-2 2xl:grid-cols-3">
			<AnimatePresence>
				{mobileEvents.map((mobileEvent, index) => {
					console.log(mobileEvent);

					return (
						<ProductCard
							productDetails={{
								startTime: new Date(mobileEvent.startTime),
								endTime: new Date(mobileEvent.endTime),
								name: mobileEvent.title,
								description: mobileEvent.description,
								image: mobileEvent.image,
								_id: mobileEvent._id,
								isRecurring: mobileEvent.isRecurring,
							}}
							initial="initial"
							animate="open"
							exit="closed"
							showToggleButton={false}
							showAdminButtons={false}
							showBookingInfo={false}
							key={mobileEvent._id + mobileEvent.startTime + index}
						></ProductCard>
					);
				})}
			</AnimatePresence>
		</div>
	);
};

export default MobileEventSection;
