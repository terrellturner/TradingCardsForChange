import React, { useState, useEffect } from 'react';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import {
	FaSortUp,
	FaSortDown,
	FaCopy,
	FaExternalLinkAlt,
	FaReceipt,
	FaCreditCard,
} from 'react-icons/fa';
import Loader from '../../components/UI/Loader';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/UI/Pagination';
import SortDropdown from '../../components/SortDropdown';
import { toast } from 'react-toastify';

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
	const { data, isLoading, error } = useGetOrdersQuery({
		pageNumber,
		sortField,
		sortOrder,
	});

	const sortBy = (key) => {
		const newSort = key === sortField && sortOrder === 'asc' ? 'desc' : 'asc';

		setSearchParams({ sortField: key, sortOrder: newSort });
	};

	const getSortingIcon = (colKey) => {
		if (sortField !== colKey) {
			return null;
		}

		return sortOrder === 'asc' ? <FaSortUp className="mt-2" /> : <FaSortDown />;
	};

	useEffect(() => {
		if (data?.orders) {
			setOrderData(data?.orders);
		}
	}, [data?.orders]);

	if (isLoading) {
		return <Loader />;
	} else if (error) {
		toast.error(error?.data?.message || error.error);
		return <Loader />;
	}

	return (
		<>
			<div className="hidden w-full flex-col self-center md:flex">
				<h1 className="text-5xl6 p-12  font-bold text-off-white">Orders</h1>
				<div className="hidden w-full flex-row self-center p-20 text-creased-khaki md:flex">
					<table className="w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-2xl border border-creased-khaki bg-emerald-green">
						<thead className="h-10">
							<tr className="select-none">
								{tableHeaders?.map((header, index) => (
									<th
										key={index}
										className="cursor-pointer p-3"
										onClick={() => sortBy(header.queryName)}
									>
										<div className="flex flex-row justify-items-center justify-self-center">
											{header.displayName} {getSortingIcon(header.queryName)}
										</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody className="">
							{orderData?.map((order, index) => (
								<tr
									className="text-center text-off-white odd:bg-noir-de-vigne"
									key={index}
								>
									<td className="truncate p-3">{order._id}</td>
									<td className="truncate p-3">{order.user}</td>
									<td className="truncate p-3">
										{order?.orderItems?.reduce(
											(total, item) => total + item.bookings.length,
											0
										)}
									</td>
									<td className="truncate p-3">${order?.totalPrice}</td>
									<td className="truncate p-3">
										{new Date(order.createdAt).toLocaleDateString('en-US')} (
										{new Date(order.createdAt).toLocaleTimeString('en-US')})
									</td>
									<td className="truncate p-3">{order.paymentMethod}</td>
									<td className="space-x-4 p-3 text-creased-khaki">
										<Link to={`/admin/user/${order._id}/edit`}>
											<button className="btn-sm">
												<FaCreditCard />
											</button>
										</Link>
										<button className="btn-sm">
											<FaReceipt />
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
			<div className="my-auto flex flex-col space-y-10 px-12 py-6 md:hidden">
				<SortDropdown
					headers={tableHeaders}
					sortedField={sortField}
					sortedDirection={sortOrder}
					onSort={sortBy}
				/>
				<div className="flex flex-col place-items-center space-y-10 ">
					{orderData.map((order) => (
						<div
							key={order._id}
							className=" flex w-full flex-col rounded-2xl border border-creased-khaki bg-emerald-green p-6"
						>
							<div className="truncate text-3xl font-bold  text-creased-khaki">
								{`$${order.totalPrice}`}
							</div>
							<div className="mb-3 flex flex-row items-center py-1 text-sm text-off-white">
								<FaCopy />
								<span className="w-24 truncate pl-1">{order._id}</span>
							</div>
							<div className="flex flex-row justify-between text-off-white">
								<span className="truncate font-bold">User:</span>
								<div className="flex flex-row items-center justify-around">
									<span className="max-w-24 truncate pr-1">{order.user}</span>
									<FaExternalLinkAlt />
								</div>
							</div>

							<div className="flex flex-row items-center justify-between text-off-white">
								<span className="font-bold">Placed:</span>

								<span className="truncate">
									{new Date(order.createdAt).toLocaleDateString('en-US')}
								</span>
							</div>
							<div className="flex flex-row justify-between text-off-white">
								<span className="truncate font-bold">Reservations:</span>
								<div className="flex flex-row items-center justify-around">
									<span className="max-w-32 truncate pl-1">
										{order?.orderItems.reduce(
											(total, item) => total + item.bookings.length,
											0
										)}
									</span>
								</div>
							</div>
							<div className="mt-5 flex flex-row justify-between space-x-4">
								<button className="flex h-full w-full justify-center rounded-2xl bg-creased-khaki p-3 text-lg font-bold text-noir-de-vigne">
									<FaCreditCard />
								</button>
								<button className="flex h-full w-full justify-center rounded-2xl bg-creased-khaki p-3 text-lg font-bold text-noir-de-vigne">
									<FaReceipt />
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
		</>
	);
};

export default OrderListPage;
