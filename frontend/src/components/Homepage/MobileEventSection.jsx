import React from 'react';
import ProductCard from '../ProductCard';
import { motion, AnimatePresence } from 'motion/react';

const MobileEventSection = ({ mobileEvents }) => {
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
	return (
		<div className="mx-auto my-10 grid w-4/5 max-w-[90rem] grid-cols-1 gap-10 md:hidden md:min-h-[70dvh] md:grid-cols-2 2xl:grid-cols-3">
			<AnimatePresence>
				{mobileEvents.map((product, index) => {
					return (
						<MotionProductCard
							product={{
								startTime: product.startTime,
								endTime: product.endTime,
								name: product.title,
								description: product.description,
								image: product.image,
								_id: product._id,
								countInStock: product.countInStock,
								maximumEventCapacity: product.maximumEventCapacity,
								isRecurring: product.isRecurring,
							}}
							key={product._id + product.startTime + index}
							variants={productCardVariants}
							initial="initial"
							animate="open"
							exit="closed"
							mobileLayout={true}
						></MotionProductCard>
					);
				})}
			</AnimatePresence>
		</div>
	);
};

export default MobileEventSection;
