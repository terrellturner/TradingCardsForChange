import { useEffect, React, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import CustomerShippingBillingForm from '../components/CustomerShippingBillingForm';

const CheckoutPage = () => {
    const [shippingModalOpen, setShippingModalOpen] = useState(false);
    const [billingModalOpen, setBillingModalOpen] = useState(false);

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

    const { userInfo } = useSelector((state) => state.auth);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details }).unwrap();
                refetch();
                toast.success('Payment successful.');
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        });
    }

    async function onApproveTest() {
        await payOrder({ orderId, details: { payer: {} } });
        refetch();
        toast.success('Payment successful.');
    }

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: order.totalPrice,
                        },
                    },
                ],
            })
            .then((orderId) => {
                return orderId;
            });
    }

    function onError(error) {
        toast.error(error.message);
    }

    const openShippingModalHandler = (e) => {
        setShippingModalOpen(true);
    };
    const closeShippingModalHandler = (e) => {
        console.log('honk');

        setShippingModalOpen(false);
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
        <div className="mx-auto flex min-w-52 flex-col py-5 md:max-w-[1440px] md:flex-row">
            <h1 className="p-3 text-4xl text-off-white">Checkout</h1>
            <div
                id="checkout-page-container"
                className="flex w-full flex-col md:w-full md:flex-row md:place-content-around"
            >
                <div
                    id="final-order-container"
                    className="w-full flex-col place-items-center space-y-8 p-10"
                >
                    <div id="billing-shipping">
                        {shippingModalOpen && (
                            <CustomerShippingBillingForm
                                handleClick={closeShippingModalHandler}
                            />
                        )}
                        <ContentContainer
                            className="flex cursor-pointer flex-col place-content-center"
                            handleClick={openShippingModalHandler}
                        >
                            <h3>Contact Information</h3>
                            <div className="grid grid-cols-2 gap-y-5">
                                <span>
                                    <div className="text-xl font-bold">
                                        First Name{' '}
                                    </div>
                                    {auth.userInfo.firstName ? (
                                        auth.userInfo.firstName
                                    ) : (
                                        <RequiredFieldAlert />
                                    )}
                                </span>
                                <span>
                                    <div className="text-xl font-bold">
                                        Last Name{' '}
                                    </div>
                                    {auth.userInfo.lastName ? (
                                        auth.userInfo.lastName
                                    ) : (
                                        <RequiredFieldAlert />
                                    )}
                                </span>
                                <span>
                                    <div className="text-xl font-bold">
                                        Address
                                    </div>
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
                                    <div className="text-xl font-bold">
                                        City{' '}
                                    </div>
                                    {cart.shippingAddress.city ? (
                                        cart.shippingAddress.city
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
                        </ContentContainer>
                    </div>
                    <div>
                        <h2 className="text-2xl text-off-white">Order Items</h2>
                        {cart.cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="text-white flex flex-col space-y-8 rounded-lg border border-ipa-beige p-5 text-off-white md:flex-row md:space-x-8"
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
                                        <div className="text-xl">
                                            ${item.price}
                                        </div>
                                    </div>
                                    <div className="flex flex-row space-x-4">
                                        {item.countInStock > 0 && (
                                            <select
                                                name="qty"
                                                id="qty"
                                                value={item.qty}
                                                className="my-2 w-full rounded-xl border-2 border-draft-yellow bg-newsletter-black px-2 md:w-1/2"
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
                                        <button className="my-2 aspect-square rounded-lg bg-ipa-beige p-5 text-hops-green">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div
                id="cart-total-checkout-container"
                className="flex flex-col place-items-center px-10 md:flex-row"
            >
                <div className="z-0 space-y-3 divide-y-2 divide-ipa-beige rounded-lg border border-ipa-beige p-8">
                    <div className="px-3">
                        <div className="text-3xl text-off-white">
                            Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}{' '}
                            items)
                        </div>
                        <div className="text-lg text-off-white">
                            $
                            {cartItems
                                .reduce(
                                    (acc, item) => acc + item.qty * item.price,
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
