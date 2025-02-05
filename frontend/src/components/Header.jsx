import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaCalendar, FaSeedling } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { clearCart } from '../slices/cartSlice';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const [userButtonToggle, setUserButtonToggle] = useState(false);
    const [mobileNavToggle, setMobileNavToggle] = useState(false);

    const mobileNavMotionVariants = {
        open: { x: 0, opacity: 1, transition: { duration: 0.5 } },
        closed: { x: '100%', opacity: 0, transition: { duration: 0.5 } },
    };

    const dis = useDispatch();
    const nav = useNavigate();

    const [apiLogout] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await apiLogout().unwrap();
            dis(logout());
            dis(clearCart());
            nav('/login');
        } catch (error) {
            console.log(error.error);
        }
    };

    const toggleNavMenu = () => {
        setMobileNavToggle(!mobileNavToggle);
    };

    return (
        <header>
            <nav className="text-white flex h-24 flex-row items-center justify-between bg-hops-green px-10 font-bold lg:justify-around lg:px-0 w-full">
                <Link
                    to="/"
                    className="group flex h-full items-center text-center"
                >
                    <span className=' mx-10 hidden md:flex text-3xl font-elfreth text-draft-yellow font-thin w-48'>Twin Cities Brew Crew</span>
                    <img
                        src="https://pmv1txxicxtao8iw.public.blob.vercel-storage.com/TCBC_Simple-r6cEbuoDVCCu3R6efh1z7i0k5l24BL.svg"
                        alt=""
                        id="header-logo"
                        className="block h-full w-full fill-ipa-beige stroke-draft-yellow py-2 md:hidden"
                    />
                </Link>
                <div
                    id="hamburger-btn"
                    className="z-[100] flex h-16 w-16 flex-col items-center justify-center space-y-2 p-3 md:hidden"
                    onClick={toggleNavMenu}
                >
                    <span className="h-1 w-full bg-ipa-beige"></span>
                    <span className="h-1 w-full bg-ipa-beige"></span>
                    <span className="h-1 w-full bg-ipa-beige"></span>
                </div>
                <div className="hidden h-full items-center justify-center text-[#ffffff] md:mr-4 md:flex md:space-x-8 md:text-lg">
                    <div className="flex flex-row justify-center items-center group">
                        <FaCalendar className="m-1 inline-block fill-ipa-beige" />
                        <Link to="/events">Events</Link>
                    </div>
                    <div className="flex flex-row justify-center items-center group">
                        <FaSeedling className="m-1 inline-block fill-ipa-beige" />
                        <Link to="/about">About Us</Link>
                    </div>
                    <div className="group">
                        <Link to="/cart" className='flex flex-row justify-center items-center '>
                            <FaShoppingCart className="m-1 inline-block fill-ipa-beige" />
                            Cart
                            {cartItems.length > 0 && (
                                <div className="m-1 inline rounded-full bg-pale-ale-green px-2 text-center text-off-white">
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </div>
                            )}
                        </Link>
                    </div>
                    <div
                        className="flex flex-row justify-center items-center group relative cursor-pointer"
                        onClick={() => {
                            userInfo && setUserButtonToggle(!userButtonToggle);
                        }}
                    >
                        <FaUser className="m-1 inline-block fill-ipa-beige" />
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
                            className={`absolute z-50 top-8 rounded-md bg-hops-green border border-ipa-beige p-3 whitespace-nowrap ${userButtonToggle ? '' : 'invisible'}`}
                        >
                            <ul className="flex flex-col">
                                <li
                                    onClick={() => {
                                        nav('/profile');
                                    }}
                                >
                                    Profile
                                </li>
                                <li onClick={logoutHandler}>Logout</li>
                                {userInfo && userInfo.isAdmin && (
                                    <>
                                        <span className='pt-5 text-2xl text-ipa-beige uppercase'>Admin</span>
                                        <Link to="/admin/orders">
                                            <li>Order Log</li>
                                        </Link>
                                        <Link to="/admin/products">
                                            <li>Edit Events</li>
                                        </Link>
                                        <Link to="/admin/users">
                                            <li>Users</li>
                                        </Link>
                                        <button className='px-4 py-3 bg-ipa-beige text-newsletter-black mt-4 rounded-lg'>Create New Event</button>
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
                            className="fixed bottom-0 left-32 right-0 top-0 z-[90] flex flex-col items-start space-y-2 bg-hops-green pl-8 pt-32 text-lg text-ipa-beige shadow-2xl md:hidden"
                            variants={mobileNavMotionVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <div className="group">
                                <FaCalendar className="m-1 inline-block" />
                                <Link to="/events">Events</Link>
                            </div>
                            <div className="group">
                                <FaSeedling className="m-1 inline-block" />
                                <Link to="/about">About Us</Link>
                            </div>
                            <div className="group">
                                <Link to="/cart">
                                    <FaShoppingCart className="m-1 inline-block" />
                                    Cart
                                    {cartItems.length > 0 && (
                                        <div className="m-1 inline rounded-full bg-pale-ale-green px-2 text-center text-off-white">
                                            {cartItems.reduce(
                                                (a, c) => a + c.qty,
                                                0
                                            )}
                                        </div>
                                    )}
                                </Link>
                            </div>
                            <div
                                className="group relative cursor-pointer truncate"
                                onClick={() => {
                                    userInfo &&
                                        setUserButtonToggle(!userButtonToggle);
                                }}
                            >
                                <FaUser className="m-1 inline-block" />
                                {userInfo ? (
                                    userInfo.lastName ? (
                                        <a>
                                            {userInfo.firstName}{' '}
                                            {userInfo.lastName}
                                        </a>
                                    ) : (
                                        <a>{userInfo.firstName}</a>
                                    )
                                ) : (
                                    <Link to="/login">Log In</Link>
                                )}
                                <div
                                    className={`${userButtonToggle ? 'invisible' : ''}`}
                                >
                                    <ul className="flex flex-col">
                                        <li
                                            onClick={() => {
                                                nav('/profile');
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
