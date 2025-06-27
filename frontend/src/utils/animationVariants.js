export const simpleFade = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: 'easeInOut',
		},
	},
	exit: {
		opacity: 0,
	},
};

export const twoColumnTransition = {
	opacity: { duration: 0.5 },
	transition: {
		delay: 0.4,
	},
};

export const fadeCollapse = {
	initial: {
		opacity: 0,
		height: 0,
		overflow: 'hidden',
	},
	animate: {
		opacity: 1,
		height: 'auto',
		overflow: 'visible',
		transition: {
			duration: 0.1,
			ease: 'easeInOut',
		},
	},
	exit: {
		opacity: 0,
		height: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
};
