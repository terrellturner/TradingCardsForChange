import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
	FaShoppingCart,
	FaUser,
	FaCalendar,
	FaSeedling,
	FaDoorOpen,
	FaBook,
	FaUsers,
	FaBookmark,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { clearCart } from '../slices/cartSlice';
import { HashLink } from 'react-router-hash-link';
import CafeLogoOnly from '/images/logo/TC4C-Logo-Only.svg?&react';

const Header = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.auth);

	const closeMenuTimeRef = useRef(null);

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
			console.error(error.error);
		}
	};

	const userMenuMouseEnter = () => {
		if (closeMenuTimeRef.current) {
			clearTimeout(closeMenuTimeRef.current);
			closeMenuTimeRef.current = null;
		}
		if (userInfo) {
			setUserButtonToggle(true);
		}
	};

	const userMenuMouseLeave = () => {
		closeMenuTimeRef.current = setTimeout(
			() => setUserButtonToggle(false),
			100
		);
	};

	return (
		<header>
			<nav className="lg:justify-stetch flex h-24 w-full flex-row items-center justify-between bg-emerald-green px-4 text-white md:px-6">
				<Link
					to="/"
					className="group hidden h-full items-center text-center md:flex"
				>
					<span className=" mx-10 w-48 font-serif text-2xl font-thin uppercase text-creased-khaki ">
						Trading Cards For Change
					</span>
				</Link>
				<Link className="h-full" to={'/'}>
					<img
						src={CafeLogoOnly}
						className="flex aspect-square h-full px-3 md:hidden"
						alt=""
					/>
				</Link>
				<button
					id="hamburger-btn"
					className="z-[100] flex h-16 w-16 flex-col items-center justify-center space-y-2 p-3 md:hidden"
					onClick={() => setMobileNavToggle(!mobileNavToggle)}
				>
					<span
						className={`h-1 w-full origin-center bg-creased-khaki transition  ${mobileNavToggle ? 'translate-y-[0.40rem] rotate-45' : ''}`}
					></span>
					<span
						className={`h-1 w-full bg-creased-khaki transition ${mobileNavToggle ? 'my-0 hidden' : ''}`}
					></span>
					<span
						className={`h-1 w-full origin-center bg-creased-khaki transition  ${mobileNavToggle ? ' -translate-y-[0.40rem] -rotate-45' : ''}`}
					></span>
				</button>
				<div className="hidden h-full items-center justify-center text-creased-khaki md:mr-4 md:flex md:space-x-8 md:text-lg">
					<div className="group flex flex-row items-center justify-center">
						<FaCalendar className="m-1 inline-block" />
						<HashLink smooth to={`/#events`}>
							Events
						</HashLink>
					</div>
					<div className="group flex flex-row items-center justify-center">
						<FaSeedling className="m-1 inline-block" />
						<Link to="/about">About Us</Link>
					</div>
					<div className="group">
						<Link
							to="/cart"
							className="flex flex-row items-center justify-center"
						>
							<FaShoppingCart className="m-1 inline-block" />
							Cart
							{cartItems?.length > 0 && (
								<div className="m-1 inline rounded-full bg-wasabi px-2 text-center text-off-white">
									{cartItems.reduce(
										(a, c) => a + (c.bookings ? c.bookings.length : 0),
										0
									)}
								</div>
							)}
						</Link>
					</div>
					<div
						className="group relative flex flex-row flex-nowrap items-center justify-center"
						onMouseEnter={() => userMenuMouseEnter()}
						onMouseLeave={() => userMenuMouseLeave()}
					>
						<FaUser className="m-1 inline-block " />
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
							className={`absolute top-8 z-50 whitespace-nowrap rounded-md border border-creased-khaki bg-emerald-green p-5 ${userButtonToggle ? '' : 'invisible'}`}
						>
							<ul className="flex flex-col font-medium">
								<Link to={`/user/${userInfo?._id}`}>Profile</Link>
								<li>
									<button onClick={logoutHandler}>Logout</button>
								</li>
								{userInfo && userInfo.isAdmin && (
									<>
										<span className="border-b border-b-creased-khaki pt-5 text-2xl font-black uppercase text-egyptian-earth">
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
									</>
								)}
							</ul>
						</div>
					</div>
				</div>
				<AnimatePresence>
					{mobileNavToggle && (
						<motion.ul
							id="mobile-menu"
							className="fixed bottom-0 left-32 right-0 top-0 z-[90] flex flex-col items-start space-y-2 bg-emerald-green pl-8 pt-32 text-xl text-creased-khaki shadow-2xl md:hidden"
							variants={mobileNavMotionVariants}
							initial="closed"
							animate="open"
							exit="closed"
						>
							{userInfo ? (
								<div className="p-3 text-2xl ">
									Hi,{' '}
									<span className="text-3xl font-bold">
										{userInfo?.firstName}!
									</span>
								</div>
							) : (
								''
							)}
							<li className="group">
								<FaCalendar className="m-1 inline-block fill-egyptian-earth font-bold" />
								<HashLink
									className="font-bold"
									onClick={() => setMobileNavToggle(!mobileNavToggle)}
									smooth
									to={`/#events`}
								>
									Events
								</HashLink>
							</li>
							<li className="group">
								<FaSeedling className="m-1 inline-block fill-egyptian-earth font-bold" />
								<Link
									className="font-bold"
									onClick={() => setMobileNavToggle(!mobileNavToggle)}
									to="/about"
								>
									About Us
								</Link>
							</li>
							<li className="group">
								<Link
									className="font-bold"
									onClick={() => setMobileNavToggle(!mobileNavToggle)}
									to="/cart"
								>
									<FaShoppingCart className="m-1 inline-block fill-egyptian-earth" />
									Cart
									{cartItems?.length > 0 && (
										<div className="m-1 inline rounded-full bg-wasabi px-2 text-center text-off-white">
											{cartItems.reduce(
												(a, c) => a + (c.bookings ? c.bookings.length : 0),
												0
											)}
										</div>
									)}
								</Link>
							</li>
							{userInfo ? (
								<>
									<Link
										to={`/user/${userInfo._id}`}
										onClick={() => setMobileNavToggle(!mobileNavToggle)}
										className="flex flex-row items-center justify-center font-bold"
									>
										<FaUser className="m-1 fill-egyptian-earth" /> Profile
									</Link>
									<Link
										to={`/user/${userInfo._id}`}
										onClick={() => {
											logoutHandler();
											setMobileNavToggle(!mobileNavToggle);
										}}
										className="flex flex-row items-center justify-center font-bold"
									>
										<FaDoorOpen className="m-1 fill-egyptian-earth" />
										Logout
									</Link>
									{userInfo && userInfo.isAdmin && (
										<>
											<span className="pt-5 text-2xl uppercase text-creased-khaki">
												Admin
											</span>
											<ul className="flex flex-col space-y-2 pl-3 ">
												<Link
													onClick={() => setMobileNavToggle(!mobileNavToggle)}
													className="flex flex-row place-items-center space-x-1 font-bold"
													to="/admin/orders"
												>
													<FaBook className="fill-egyptian-earth" />
													<li>Order Log</li>
												</Link>
												<Link
													onClick={() => setMobileNavToggle(!mobileNavToggle)}
													className="flex flex-row place-items-center space-x-1 font-bold"
													to="/admin/products"
												>
													<FaBookmark className="fill-egyptian-earth" />
													<li>Edit Events</li>
												</Link>
												<Link
													onClick={() => setMobileNavToggle(!mobileNavToggle)}
													className="flex flex-row place-items-center space-x-1 font-bold"
													to="/admin/users"
												>
													<FaUsers className="fill-egyptian-earth" />
													<li>Manage Users</li>
												</Link>
											</ul>
										</>
									)}
								</>
							) : (
								<Link to="/login">Log In</Link>
							)}
						</motion.ul>
					)}
				</AnimatePresence>
			</nav>
		</header>
	);
};

export default Header;
