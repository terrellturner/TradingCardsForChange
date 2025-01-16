import React from 'react';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'motion/react';
import { defaultMotion } from '../constants';

const OrderPage = () => {
    const { id: orderId } = useParams();

    const { data: order, isLoading } = useGetOrderDetailsQuery(orderId);

    return isLoading ? (
        <h2>Please wait...</h2>
    ) : (
        <motion.div variants={defaultMotion} initial="initial"
            animate="open"
            exit="closed" className="flex w-full grow flex-col items-center justify-center text-center text-off-white">
            <h3 className="p-4 text-4xl font-bold">
                Thank you for your purchase!
            </h3>
            <div>{order.orderItems.map((item, index) => { })}</div>
            <div className="flex w-1/3 flex-col flex-wrap items-center divide-y divide-ipa-beige rounded-lg border border-ipa-beige md:min-w-[600px]">
                {order.orderItems.map((item, index) => {
                    const startTime = new Date(item.startTime);
                    const endTime = new Date(item.startTime);
                    return (
                        <div
                            key={item._id}
                            className="text-white flex w-full flex-col place-items-center justify-center gap-4 py-4 text-off-white md:flex-row lg:space-x-5"
                        >
                            <img
                                src={item.image}
                                className="aspect-square h-32 rounded-lg object-cover md:h-16"
                                alt=""
                            />
                            <div className="flex flex-col text-left">
                                <div className="text-xl font-bold">
                                    {item.name}
                                </div>
                                <div>Seats: {item.qty}</div>
                            </div>
                            <div>${item.qty * item.price}</div>
                            <button className="my-2 flex aspect-square place-items-center justify-around rounded-lg border border-ipa-beige p-4 text-ipa-beige lg:p-3">
                                <FaCalendar />
                            </button>
                            <button className="my-2 flex aspect-square place-items-center justify-around rounded-lg border border-ipa-beige p-4 text-ipa-beige lg:p-3">
                                <FaMapMarkerAlt />
                            </button>
                        </div>
                    );
                })}
                <div className="flex w-full flex-row justify-between p-6">
                    <div className="">Taxes & Other Fees</div>
                    <div>${order.taxPrice}</div>
                </div>
                <div className="flex w-full flex-row justify-between p-6 text-xl font-bold">
                    <div className="">Total</div>
                    <div>${order.totalPrice}</div>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderPage;
