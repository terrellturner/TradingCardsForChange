export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
export const UPLOAD_URL = '/api/upload';
export const BOOKINGS_URL = '/api/bookings';

export const defaultMotion = {
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
