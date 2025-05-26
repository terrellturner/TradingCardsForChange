import React from 'react';
import { FaCoffee } from 'react-icons/fa';
import { TbCards } from 'react-icons/tb';
import CafeLogo from '/images/logo/logo.svg?&react';
import { AnimatePresence, motion } from 'motion/react';
import CafeLogoTextOnly from '/images/logo/TC4C-Text-Only.svg?&react';
import CafeLogoOnly from '/images/logo/TC4C-Logo-Only.svg?&react';

const Logo = ({ classNames }) => {
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
				className={`aspect-square ${classNames}`}
			>
				<div className="relative flex h-full w-full items-center justify-center">
					<img
						src={CafeLogoTextOnly}
						className="loading-logo-spin aspect-square h-4/5 w-full grow"
						alt=""
					/>
					<img
						src={CafeLogoOnly}
						className="absolute mb-1 aspect-square w-1/3"
						alt=""
					/>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Logo;
