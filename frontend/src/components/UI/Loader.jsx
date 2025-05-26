import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
		<motion.div
			key={'loader'}
			initial="initial"
			animate="open"
			exit="closed"
			variants={loaderVariants}
			className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full grow items-center justify-center bg-noir-de-vigne bg-opacity-80"
		>
			<Logo classNames={`w-4/5 lg:flex`} />
		</motion.div>
	);
};

export default Loader;
