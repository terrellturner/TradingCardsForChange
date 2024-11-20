import React from 'react';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import { useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const OrderPage = () => {
    const { id: orderId } = useParams();
    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);

    return isLoading ? (
        <h2>Please wait...</h2>
    ) : (
        <div>
            {order.orderItems.map((item) => (
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
                            <div className="text-xl">${item.price}</div>
                        </div>
                        <div className="flex flex-row space-x-4">
                            {item.countInStock > 0 && (
                                <select
                                    name="qty"
                                    id="qty"
                                    value={item.qty}
                                    className="my-2 w-full rounded-xl border-2 border-draft-yellow bg-newsletter-black px-2 md:w-1/2"
                                >
                                    {[...Array(item.countInStock).keys()].map(
                                        (x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        )
                                    )}
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
    );
};

export default OrderPage;
