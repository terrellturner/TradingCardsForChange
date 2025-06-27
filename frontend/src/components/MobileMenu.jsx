import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

import { createPortal } from 'react-dom';

const MobileMenu = ({ cartItems, userInfo }) => {
	const main = document.getElementById('main');

	return createPortal(
		<>
			{' '}
			<motion.div
				id="mobile-menu"
				className="fixed bottom-0 left-36 right-0 top-0 z-40 bg-wasabi md:hidden"
			>
				<div className="group">
					<Link to="/events">Events</Link>
				</div>
				<div className="group">
					<Link to="/about">About</Link>
				</div>
				<div className="group">
					<Link to="/cart">
						<FaShoppingCart className="m-1 inline-block" />
						Cart
						{cartItems.length > 0 && (
							<div className="m-1 inline rounded-full bg-wasabi px-2 text-center text-off-white">
								{cartItems.reduce((a, c) => a + c.qty, 0)}
							</div>
						)}
					</Link>
				</div>
				<div
					className="group relative cursor-pointer truncate"
				>
					<FaUser className="m-1 inline-block" />
					{userInfo ? (
						userInfo.lastName ? (
							<a>
								{userInfo.firstName} {userInfo.lastName}
							</a>
						) : (
							<a>{userInfo.firstName}</a>
						)
					) : (
						<Link to="/login">Log In</Link>
					)}
					<div
						className={`absolute top-8 rounded-md bg-wasabi p-3 pr-20 ${userButtonToggle ? 'invisible' : ''}`}
					>
						<ul className="flex flex-col">
							<li
								onClick={() => {
									navigate('/profile');
								}}
							>
								Profile
							</li>
							<li onClick={logoutHandler}>Logout</li>
						</ul>
					</div>
				</div>
			</motion.div>
			<div className="bg-opaque-noir-de-vigne fixed bottom-0 left-0 right-0 top-0 z-30 md:hidden"></div>
		</>,
		main
	);
};

export default MobileMenu;
