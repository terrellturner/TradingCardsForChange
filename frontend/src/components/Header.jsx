import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaCalendar, FaSeedling } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { clearCart } from '../slices/cartSlice';
import { HashLink } from 'react-router-hash-link';
import Logo from '../components/UI/Logo';

const Header = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.auth);

	const [userButtonToggle, setUserButtonToggle] = useState(false);
	const [mobileNavToggle, setMobileNavToggle] = useState(false);

	const mobileNavMotionVariants = {
		open: { x: 0, opacity: 1, transition: { duration: 0.5 } },
		closed: { x: '100%', opacity: 0, transition: { duration: 0.5 } },
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [apiLogout] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await apiLogout().unwrap();
			dispatch(logout());
			dispatch(clearCart());
			navigate('/login');
		} catch (error) {
			console.log(error.error);
		}
	};

	const toggleNavMenu = () => {
		setMobileNavToggle(!mobileNavToggle);
	};

	return (
		<header>
			<nav className="flex h-24 w-full flex-row items-center justify-between bg-emerald-green px-10 font-bold text-white lg:justify-around lg:px-0">
				<Link to="/" className="group flex h-full items-center text-center">
					<span className=" mx-10 hidden w-48 font-serif text-2xl font-thin uppercase text-creased-khaki md:flex">
						Trading Cards For Change
					</span>
				</Link>
				<Logo classNames={`md:hidden flex`} />
				<div
					id="hamburger-btn"
					className="z-[100] flex h-16 w-16 flex-col items-center justify-center space-y-2 p-3 md:hidden"
					onClick={toggleNavMenu}
				>
					<span className="h-1 w-full bg-creased-khaki"></span>
					<span className="h-1 w-full bg-creased-khaki"></span>
					<span className="h-1 w-full bg-creased-khaki"></span>
				</div>
				<div className="hidden h-full items-center justify-center text-[#ffffff] md:mr-4 md:flex md:space-x-8 md:text-lg">
					<div className="group flex flex-row items-center justify-center">
						<FaCalendar className="m-1 inline-block fill-creased-khaki" />
						<HashLink smooth to={`/#calendar`}>
							Events
						</HashLink>
					</div>
					<div className="group flex flex-row items-center justify-center">
						<FaSeedling className="m-1 inline-block fill-creased-khaki" />
						<Link to="/about">About Us</Link>
					</div>
					<div className="group">
						<Link
							to="/cart"
							className="flex flex-row items-center justify-center"
						>
							<FaShoppingCart className="m-1 inline-block fill-creased-khaki" />
							Cart
							{cartItems.length > 0 && (
								<div className="m-1 inline rounded-full bg-wasabi px-2 text-center text-off-white">
									{cartItems.reduce(
										(a, c) => a + Object.keys(c.bookings).length,
										0
									)}
								</div>
							)}
						</Link>
					</div>
					<div
						className="group relative flex cursor-pointer flex-row flex-nowrap items-center justify-center"
						onClick={() => {
							userInfo && setUserButtonToggle(!userButtonToggle);
						}}
					>
						<FaUser className="m-1 inline-block fill-creased-khaki" />
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
							className={`absolute top-8 z-50 whitespace-nowrap rounded-md border border-creased-khaki bg-emerald-green p-3 ${userButtonToggle ? '' : 'invisible'}`}
						>
							<ul className="flex flex-col">
								<li
									onClick={() => {
										navigate(`/user/${userInfo._id}`);
									}}
								>
									Profile
								</li>
								<li onClick={logoutHandler}>Logout</li>
								{userInfo && userInfo.isAdmin && (
									<>
										<span className="pt-5 text-2xl uppercase text-creased-khaki">
											Admin
										</span>
										<Link to="/admin/orders">
											<li>Order Log</li>
										</Link>
										<Link to="/admin/products">
											<li>Edit Events</li>
										</Link>
										<Link to="/admin/users">
											<li>Users</li>
										</Link>
										<button className="mt-4 rounded-lg bg-creased-khaki px-4 py-3 text-noir-de-vigne">
											Create New Event
										</button>
									</>
								)}
							</ul>
						</div>
					</div>
				</div>
				<AnimatePresence>
					{mobileNavToggle && (
						<motion.div
							id="mobile-menu"
							className="fixed bottom-0 left-32 right-0 top-0 z-[90] flex flex-col items-start space-y-2 bg-emerald-green pl-8 pt-32 text-lg text-creased-khaki shadow-2xl md:hidden"
							variants={mobileNavMotionVariants}
							initial="closed"
							animate="open"
							exit="closed"
						>
							<div className="group">
								<FaCalendar className="m-1 inline-block" />
								<HashLink smooth to={`/#calendar`}>
									Events
								</HashLink>
							</div>
							<div className="group">
								<FaSeedling className="m-1 inline-block" />
								<Link to="/about">About Us</Link>
							</div>
							<div className="group">
								<Link to="/cart">
									<FaShoppingCart className="m-1 inline-block" />
									Cart
									{cartItems?.length > 0 && (
										<div className="m-1 inline rounded-full bg-wasabi px-2 text-center text-off-white">
											{cartItems.reduce((a, c) => a + c.qty, 0)}
										</div>
									)}
								</Link>
							</div>
							<div
								className="group relative cursor-pointer truncate"
								onClick={() => {
									userInfo && setUserButtonToggle(!userButtonToggle);
								}}
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
								<div className={`${userButtonToggle ? 'invisible' : ''}`}>
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
					)}
				</AnimatePresence>
			</nav>
		</header>
	);
};

export default Header;
