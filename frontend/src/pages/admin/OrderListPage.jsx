import React, { useState, useEffect } from 'react';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import {
    FaTrash,
    FaEdit,
    FaCheck,
    FaTimes,
    FaSortUp,
    FaSortDown,
    FaLockOpen,
    FaCopy,
    FaArchive,
} from 'react-icons/fa';
import Loader from '../../components/Loader';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import SortDropdown from '../../components/SortDropdown';

const OrderListPage = () => {
    const tableHeaders = [
        { displayName: 'ID', queryName: '_id' },
        { displayName: 'User', queryName: 'user._id' },
        { displayName: 'Reservations', queryName: 'orderItems' },
        { displayName: 'Total', queryName: 'totalPrice' },
        { displayName: 'Order Placed', queryName: 'createdAt' },
        { displayName: 'Payment Method', queryName: 'paymentMethod' },
    ];
    const { pageNumber } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const sortField = searchParams.get('sortField') || '';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    const [orderData, setOrderData] = useState([]);
    const { data, isLoading, error } = useGetOrdersQuery(
        {
            pageNumber,
            sortField,
            sortOrder
        },
    );

    const sortBy = (key) => {
        const newSort =
            key === sortField && sortOrder === 'asc'
                ? 'desc'
                : 'asc';

        setSearchParams({ sortField: key, sortOrder: newSort })
    };

    const getSortingIcon = (colKey) => {
        if (sortField !== colKey) {
            return null;
        }

        return sortOrder === 'asc' ? (
            <FaSortUp className="mt-2" />
        ) : (
            <FaSortDown />
        );
    };

    useEffect(() => {
        if (data?.orders) {
            setOrderData(data?.orders);
        }
    }, [data?.orders]);

    return (
        <>
            {isLoading || !orderData ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h2>{error?.data?.message || error.error}</h2>
            ) : window.innerWidth > 800 ? (
                <div className="flex flex-col">
                    <h1 className="p-12 text-5xl font-bold text-off-white">
                        Orders
                    </h1>
                    <div className="hidden w-full flex-row self-center p-20 text-ipa-beige md:flex">
                        <table className="w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-2xl border border-ipa-beige bg-hops-green">
                            <thead className="h-10">
                                <tr className="select-none">
                                    {tableHeaders.map((header, index) => (
                                        <th
                                            key={index}
                                            className="cursor-pointer p-3"
                                            onClick={() =>
                                                sortBy(header.queryName)
                                            }
                                        >
                                            <div className="flex flex-row justify-items-center justify-self-center">
                                                {header.displayName}{' '}
                                                {getSortingIcon(
                                                    header.queryName
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="">
                                {orderData.map((product) => (
                                    <tr
                                        className="text-center text-off-white odd:bg-newsletter-black"
                                        key={product._id}
                                    >
                                        <td className="truncate p-3">
                                            {product._id}
                                        </td>
                                        <td className="truncate p-3">
                                            {product.user}
                                        </td>
                                        <td className="truncate p-3">
                                            {product.orderItems.reduce((total, item) => total + item.qty, 0)}
                                        </td>
                                        <td className="truncate p-3">
                                            ${product.totalPrice}
                                        </td>
                                        <td className="truncate p-3">
                                            {product.createdAt}
                                        </td>
                                        <td className="truncate p-3">
                                            {product.paymentMethod}
                                        </td>
                                        <td className="space-x-4 p-3 text-ipa-beige">
                                            <Link
                                                to={`/admin/user/${product._id}/edit`}
                                            >
                                                <button className="btn-sm">
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                            <button
                                                className="btn-sm"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        pages={data.pages}
                        page={data.page}
                        paginationType="orders"
                        isAdmin={true}
                        className={'place-self-center'}
                    />
                </div>
            ) : (
                //Mobile view
                <div className="flex flex-col space-y-10 px-12 py-6 my-auto">
                    <SortDropdown headers={tableHeaders} sortedField={sortField} sortedDirection={sortOrder} onSort={sortBy} />
                    <div className="flex flex-col place-items-center space-y-10 ">
                        {orderData.map((product) => (
                            <div
                                key={product._id}
                                className=" flex w-full flex-col rounded-2xl border-2 border-ipa-beige bg-hops-green p-6"
                            >
                                <div className="truncate text-xl font-bold text-off-white">
                                    {product.name}
                                </div>
                                <div className="mb-3 flex flex-row items-center py-1 text-sm text-off-white">
                                    <FaCopy />
                                    <span className="w-24 truncate pl-1">
                                        {product._id}
                                    </span>
                                </div>
                                <div className="flex flex-row justify-between text-off-white">
                                    <span className="truncate font-bold">
                                        Venue:
                                    </span>
                                    <div className="flex flex-row items-center justify-around">
                                        <FaCopy />
                                        <span className="max-w-32 truncate pl-1">
                                            {product.eventLocation}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between text-off-white">
                                    <span className="truncate font-bold">
                                        Stock Left:
                                    </span>
                                    <div className="flex flex-row items-center justify-around">
                                        <span className="max-w-32 truncate pl-1">
                                            {product.originalStockCount - (product.originalStockCount - product.countInStock)}/{product.originalStockCount}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-between text-off-white">
                                    <span className="font-bold">Sold Out?:</span>
                                    <span>
                                        {product.stockInCount <= 0 ? (
                                            <FaCheck className="mx-auto fill-green-600" />
                                        ) : (
                                            <FaTimes className="mx-auto"
                                                style={{ color: 'red' }} />
                                        )}
                                    </span>
                                </div>
                                <div className="mt-5 flex flex-row justify-between space-x-4">
                                    <button className="flex h-full w-full justify-center rounded-2xl bg-ipa-beige p-3 text-lg font-bold text-newsletter-black">
                                        <FaEdit />
                                    </button>
                                    <button className="flex h-full w-full justify-center rounded-2xl bg-ipa-beige p-3 text-lg font-bold text-newsletter-black">
                                        <FaLockOpen />
                                    </button>
                                    <button className="flex h-full w-full justify-center rounded-2xl bg-ipa-beige p-3 text-lg font-bold text-newsletter-black">
                                        <FaArchive />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        pages={data.pages}
                        page={data.page}
                        paginationType="orders"
                        isAdmin={true}
                        className={'place-self-center'}
                    />
                </div>
            )}
        </>
    );
};

export default OrderListPage;
