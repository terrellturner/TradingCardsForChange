import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { clearCartItems, resetCart } from '../slices/cartSlice';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const [userButtonToggle, setUserButtonToggle] = useState('false');

    const dis = useDispatch();
    const nav = useNavigate();

    const [apiLogout] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await apiLogout().unwrap();
            dis(logout());
            dis(clearCartItems());
            dis(resetCart());
            nav('/login');
        } catch (error) {
            console.log(error.error);
        }
    };

    return (
        <header>
            <nav className="text-white flex h-24 flex-row items-center justify-around bg-hops-green font-bold">
                <Link
                    to="/"
                    className="group text-center font-serif text-4xl text-ipa-beige"
                >
                    <div className="bg-white h-10 w-24">TC4C</div>
                </Link>
                <div className="hidden h-full items-center justify-center text-[#ffffff] md:mr-4 md:flex md:space-x-8">
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
                                <div className="m-1 inline rounded-full bg-pale-ale-green px-2 text-center text-off-white">
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </div>
                            )}
                        </Link>
                    </div>
                    <div
                        className="group relative cursor-pointer"
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
                        <div
                            className={`absolute top-8 rounded-md bg-pale-ale-green p-3 pr-20 ${userButtonToggle ? 'invisible' : ''}`}
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
                </div>
            </nav>
        </header>
    );
};

export default Header;
