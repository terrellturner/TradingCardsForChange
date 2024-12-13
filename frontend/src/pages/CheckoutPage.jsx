import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import InputItem from '../components/InputItem';
import {
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
} from '../slices/ordersApiSlice';
import ContentContainer from '../components/ContentContainer';
import RequiredFieldAlert from '../components/RequiredFieldAlert';
import CheckoutForm from '../components/CheckoutForm';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCart, removeFromCart } from '../slices/cartSlice';

const CheckoutPage = () => {
    const [shippingModalOpen, setShippingModalOpen] = useState(false);
    const [billingModalOpen, setBillingModalOpen] = useState(false);
    const [contactInfoComplete, setContactInfoComplete] = useState(false);
    const nav = useNavigate();
    const dis = useDispatch();

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    const { id: orderId } = useParams();

    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    const { cartItems } = cart;

    const [payOrder, { isPaymentLoading }] = usePayOrderMutation();

    const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

    const {
        data: paypal,
        isLoading: loadingPayPal,
        error: errorPayPal,
    } = useGetPayPalClientIdQuery();

    const openShippingModalHandler = (e) => {
        setShippingModalOpen(true);
    };
    const closeShippingModalHandler = (e) => {
        setShippingModalOpen(false);
    };

    const placeOrderHandler = async () => {
        if (
            Object.values(cart.shippingAddress).every(
                (x) => x !== '' && x !== null
            )
        ) {
            try {
                const res = await createOrder({
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                }).unwrap();
                dis(clearCart());
                nav(`/order/${res._id}`);
            } catch (err) {
                toast.error(err);
            }
        } else {
            toast.error('You need to fill in each contact field.');
        }
    };

    const removeFromCartHandler = async (id) => {
        dis(removeFromCart(id));
        if (cartItems.length === 1) {
            nav('/cart');
        }
    };

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPayPalScript = async () => {
                payPalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    },
                });
                payPalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };
            if (!window.paypal) {
                loadPayPalScript();
            }
        }
    }, [errorPayPal, loadingPayPal, paypal, payPalDispatch]);

    return (
        <div className="mx-auto flex w-full min-w-52 grow flex-col place-items-center py-5 md:px-20">
            <h1 className="self-start p-3 text-4xl font-bold text-off-white">
                Checkout
            </h1>
            <div className="-mt-10 flex w-full grow flex-col place-content-center space-y-5 md:space-x-10 md:space-y-0 lg:flex-row">
                <div className="flex w-1/2 flex-col place-items-center md:flex-row">
                    {shippingModalOpen && (
                        <CheckoutForm
                            handleClick={closeShippingModalHandler}
                            cartItems={cart.cartItems}
                        />
                    )}
                    <ContentContainer className="flex w-full flex-col space-y-10 border-none">
                        <h3 className="text-center text-2xl lg:text-left">
                            Contact Information
                        </h3>
                        <div
                            className="grid w-full cursor-pointer grid-cols-2 rounded-lg border border-ipa-beige p-5"
                            onClick={openShippingModalHandler}
                        >
                            <span>
                                <div className="text-xl font-bold">
                                    First Name{' '}
                                </div>
                                {auth.userInfo?.firstName ? (
                                    auth.userInfo?.firstName
                                ) : cart.shippingAddress?.fName ? (
                                    cart.shippingAddress?.fName
                                ) : (
                                    <RequiredFieldAlert />
                                )}
                            </span>
                            <span>
                                <div className="text-xl font-bold">
                                    Last Name{' '}
                                </div>
                                {auth.userInfo?.lastName ? (
                                    auth.userInfo?.lastName
                                ) : cart.shippingAddress?.lName ? (
                                    cart.shippingAddress?.lName
                                ) : (
                                    <RequiredFieldAlert />
                                )}
                            </span>
                            <span>
                                <div className="text-xl font-bold">Address</div>
                                {cart.shippingAddress.address ? (
                                    cart.shippingAddress.address
                                ) : (
                                    <RequiredFieldAlert />
                                )}
                            </span>
                            <span>
                                <div className="text-xl font-bold">
                                    Address Line 2{' '}
                                </div>
                                {cart.shippingAddress.addressSecondary ? (
                                    cart.shippingAddress.addressSecondary
                                ) : (
                                    <RequiredFieldAlert />
                                )}
                            </span>
                            <span>
                                <div className="text-xl font-bold">City </div>
                                {cart.shippingAddress.city ? (
                                    cart.shippingAddress.city
                                ) : (
                                    <RequiredFieldAlert />
                                )}
                            </span>
                            <span>
                                <div className="text-xl font-bold">State </div>
                                {cart.shippingAddress.state ? (
                                    cart.shippingAddress.state
                                ) : (
                                    <RequiredFieldAlert />
                                )}
                            </span>
                            <span>
                                <div className="text-xl font-bold">
                                    ZIP/Postal{' '}
                                </div>
                                {cart.shippingAddress.postalCode ? (
                                    cart.shippingAddress.postalCode
                                ) : (
                                    <RequiredFieldAlert />
                                )}
                            </span>
                            <span>
                                <div className="text-xl font-bold">
                                    Country{' '}
                                </div>
                                {cart.shippingAddress.country ? (
                                    cart.shippingAddress.country
                                ) : (
                                    <RequiredFieldAlert />
                                )}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="pb-5 text-2xl text-off-white">
                                Order Items
                            </h2>
                            {cart.cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="text-white flex w-full flex-row place-items-center gap-4 rounded-lg p-5 text-off-white lg:space-x-5"
                                >
                                    <img
                                        src={item.image}
                                        className="aspect-square h-16 rounded-lg object-cover"
                                        alt=""
                                    />
                                    <div className="flex flex-col pl-4">
                                        <div className="text-xl font-bold">
                                            {item.name}
                                        </div>
                                        <div>Seats: {item.qty}</div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            removeFromCartHandler(item._id);
                                        }}
                                        className="my-2 flex aspect-square place-items-center justify-around rounded-lg border border-ipa-beige p-4 text-ipa-beige lg:p-3"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </ContentContainer>
                </div>
                <div
                    id="cart-total-checkout-container"
                    className="flex flex-col place-items-center md:flex-row"
                >
                    <div className="z-0 space-y-3 divide-y-2 divide-ipa-beige rounded-lg border border-ipa-beige p-8">
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
                            <PayPalButtons
                            // createOrder={createOrder}
                            // onApprove={onApprove}
                            // onError={onError}
                            ></PayPalButtons>
                            <button
                                onClick={placeOrderHandler}
                                className="w-full bg-ipa-beige p-5 outline outline-1 "
                            >
                                Place Test Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CheckoutPage;
