import React from 'react'
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { Link } from 'react-router-dom';


const OrdersPage = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();
    return (
        <>
            <h1>Orders</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div className='flex flex-col'>
                    <h1 className='text-5xl text-off-white p-12 font-bold'>Users</h1>
                    <div className=' text-ipa-beige flex-row self-center p-20 w-11/12 hidden md:flex'>
                        <table className="table-fixed w-full bg-hops-green rounded-2xl border-ipa-beige border border-spacing-0 border-separate overflow-hidden">
                            <thead className='h-10'>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>FULFILLED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                order.paidAt.substring(0, 10)
                                            ) : (
                                                <FaTimes style={{ color: "red" }} />
                                            )}
                                        </td>
                                        <td>
                                            {order.isDelivered ? (
                                                order.deliveredAt.substring(0, 10)
                                            ) : (
                                                <FaTimes style={{ color: "red" }} />
                                            )}
                                        </td>
                                        <td>
                                            <Link to={`/order/${order._id}`}>
                                                <button className="btn-sm">
                                                    Details
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrdersPage;
