import React from 'react';
import PropTypes from 'prop-types';
import CafeLogo from '/images/logo/logo.svg?&react';
import CafeLogoTextOnly from '/images/logo/TC4C-Text-Only.svg?&react';
import CafeLogoOnly from '/images/logo/TC4C-Logo-Only.svg?&react';
import { AnimatePresence, motion } from 'framer-motion';

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
				<div className="relative flex h-full w-1/2 items-center justify-center">
					<img
						src={CafeLogoTextOnly}
						className="absolute aspect-square h-4/5 w-full grow"
						alt=""
					/>
					<img
						src={CafeLogoOnly}
						className=" loading-logo-spin aspect-square w-1/2"
						alt=""
					/>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Loader;
