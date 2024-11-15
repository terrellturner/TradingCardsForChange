import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CartPage = () => {
    const dis = useDispatch();
    const nav = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dis(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = async (id) => {
        dis(removeFromCart(id));
    };

    const checkoutHandler = async () => {
        try {
            nav(`/checkout/`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="mx-auto min-w-52 max-w-[1440px] py-5">
            <h1 className="p-3 text-4xl text-off-white">Shopping Cart</h1>
            <div
                id="cart-page-container"
                className="flex flex-col md:w-full md:flex-row md:place-content-around"
            >
                <div
                    id="cart-item-container"
                    className="flex-col place-items-center space-y-8 p-10"
                >
                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="text-white flex flex-col space-y-8 rounded-lg border border-ipa-beige p-5 text-off-white md:w-full md:flex-row md:space-x-8"
                        >
                            <img
                                src={item.image}
                                className="aspect-square h-[200px] rounded-lg object-cover"
                                alt=""
                            />
                            <div className="flex flex-col justify-between">
                                <div>
                                    <div className="text-3xl font-bold">
                                        {item.name}
                                    </div>
                                    <div className="text-xl">${item.price}</div>
                                </div>
                                <div className="flex flex-row space-x-4">
                                    {item.countInStock > 0 && (
                                        <select
                                            name="qty"
                                            id="qty"
                                            value={item.qty}
                                            className="my-2 w-full rounded-xl border-2 border-draft-yellow bg-newsletter-black px-2 md:w-1/2"
                                            onChange={(e) =>
                                                addToCartHandler(
                                                    item,
                                                    Number(e.target.value)
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    <button
                                        onClick={() => {
                                            removeFromCartHandler(item._id);
                                        }}
                                        className="my-2 aspect-square rounded-lg bg-ipa-beige p-5 text-hops-green"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    id="cart-total-checkout-container"
                    className="flex flex-col place-items-center px-10"
                >
                    <div className="space-y-3 divide-y-2 divide-ipa-beige rounded-lg border border-ipa-beige p-8">
                        <div className="px-3">
                            <div className="text-3xl text-off-white">
                                Subtotal (
                                {cartItems.reduce((a, c) => a + c.qty, 0)}{' '}
                                items)
                            </div>
                            <div className="text-lg text-off-white">
                                $
                                {cartItems
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.qty * item.price,
                                        0
                                    )
                                    .toFixed(2)}
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="m-3 bg-ipa-beige p-3"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
