import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';

const Loader = () => {
	const loaderVariants = {
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
				duration: 2,
			},
		},
	};
	return (
		<AnimatePresence>
			<motion.div
				key={'loader'}
				initial="initial"
				animate="open"
				exit="closed"
				variants={loaderVariants}
				className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-noir-de-vigne bg-opacity-80"
			>
				<Logo classNames={`w-4/5 lg:flex`} />
			</motion.div>
		</AnimatePresence>
	);
};

export default Loader;
