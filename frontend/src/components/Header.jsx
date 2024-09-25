import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <header>
            <nav className="text-white flex h-24 flex-row items-center justify-between bg-hops-green font-bold">
                <Link
                    to="/"
                    className="group pl-4 text-center font-serif text-4xl text-ipa-beige"
                >
                    <div className="bg-white h-10 w-8">TC4C</div>
                </Link>
                <div className="hidden h-full items-center justify-center text-[#ffffff] md:mr-4 md:flex md:space-x-8">
                    <div className="group">
                        <Link to="/events">Events</Link>
                        <div className="group-hover:border-white w-full group-hover:border-b"></div>
                    </div>
                    <div className="group">
                        <Link to="/about">About</Link>
                        <div className="group-hover:border-white w-full group-hover:border-b"></div>
                    </div>
                    <div className="group">
                        <Link to="/cart">
                            <FaShoppingCart className="m-1 inline-block" />
                            Cart
                            {cartItems.length > 0 && (
                                <div className="m-1 inline rounded-full bg-pale-ale-green px-2 text-center text-off-white">
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </div>
                            )}
                            <div className="group-hover:border-white w-full group-hover:border-b"></div>
                        </Link>
                    </div>
                    <div className="group">
                        <FaUser className="m-1 inline-block" />
                        <Link to="/profile">Profile</Link>
                        <div className="group-hover:border-white w-full group-hover:border-b"></div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
