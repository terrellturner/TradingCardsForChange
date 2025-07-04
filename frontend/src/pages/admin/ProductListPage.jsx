import React, { useState, useEffect } from 'react';
import {
	useGetProductsQuery,
	useDeleteProductMutation,
	useCreateProductMutation,
} from '../../slices/productsApiSlice';
import {
	FaTrash,
	FaEdit,
	FaCheck,
	FaTimes,
	FaSortUp,
	FaSortDown,
	FaLockOpen,
	FaCopy,
	FaFilter,
	FaArchive,
	FaPlusCircle,
} from 'react-icons/fa';
import Loader from '../../components/UI/Loader';
import {
	Link,
	useParams,
	useSearchParams,
	useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '../../components/UI/Pagination';
import SortDropdown from '../../components/SortDropdown';
import { PRODUCTS_URL } from '../../constants';
import ConfirmationPrompt from '../../components/UI/ConfirmationPrompt';

const ProductListPage = () => {
	const navigate = useNavigate();
	const { pageNumber } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	const sortField = searchParams.get('sortField') || '';
	const sortOrder = searchParams.get('sortOrder') || 'asc';

	const [productData, setProductData] = useState([]);
	const [modalConfig, setModalConfig] = useState({
		isOpen: false,
		message: '',
		onConfirm: null,
	});
	const { data, isLoading, error } = useGetProductsQuery({
		pageNumber,
		sortField,
		sortOrder,
	});
	const [deleteProduct, { isLoading: loadingDeleteProduct }] =
		useDeleteProductMutation();

	const [createProduct, { isLoading: loadingCreateProduct }] =
		useCreateProductMutation();

	const tableHeaders = [
		{ displayName: 'ID', queryName: '_id' },
		{ displayName: 'Title', queryName: 'title' },
		{ displayName: 'Price', queryName: 'price' },
		{ displayName: 'Category', queryName: 'category' },
		{ displayName: 'Start Time', queryName: 'startTime' },
		{ displayName: 'Venue', queryName: 'eventLocation' },
	];

	const defaultProduct = {
		name: 'Edit me!',
		category: 'DEF',
		description: 'Edit me!',
		price: 0.0,
		countInStock: 0,
		maximumEventCapacity: 0,
		startTime: new Date(),
		endTime: new Date(),
		eventLocation: 'Default',
		cardSet: 'DEF',
		type: 'event',
		isRecurring: false,
		recurringPattern: null,
	};

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

	const createProductHandler = async (productTemplate = defaultProduct) => {
		try {
			const res = await createProduct(productTemplate).unwrap();
			toast.done('Product created.');

			navigate(`/admin/product/${res._id}/edit`);
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	const deleteProductHandler = async (id) => {
		try {
			await deleteProduct(id).unwrap();
			toast.success(`Product ${id} deleted.`);
		} catch (error) {
			toast.error(error?.data?.message || error.message);
		}
	};

	const openModal = (message, onConfirm) => {
		setModalConfig({
			isOpen: true,
			message,
			onConfirm,
		});
	};

	const closeModal = () => {
		setModalConfig({
			isOpen: false,
			message: '',
			onConfirm: null,
		});
	};

	useEffect(() => {
		if (data?.products) {
			setProductData(data?.products);
		}
	}, [data?.products]);

	if (isLoading || loadingCreateProduct || loadingDeleteProduct) {
		return <Loader />;
	} else if (error) {
		toast.error(error?.data?.message || error.error);
		return;
	}

	return (
		<>
			<div className="hidden flex-col md:flex">
				<h1 className="p-12 pb-0 text-5xl font-bold text-off-white">Events</h1>
				<div className="hidden w-full flex-row space-y-4 self-center p-20 pt-0 text-creased-khaki md:flex md:flex-col">
					<button
						onClick={() => {
							openModal(
								'Creating new product. Are you sure?',
								createProductHandler
							);
						}}
						className="flex w-44 flex-row place-items-center justify-center space-x-1 place-self-end rounded-lg bg-creased-khaki p-3 font-bold text-noir-de-vigne"
					>
						<span>
							<FaPlusCircle />
						</span>
						<span>New Event</span>
					</button>
					<table className="w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-2xl border border-creased-khaki bg-emerald-green">
						<thead className="h-10">
							<tr className="select-none">
								{tableHeaders.map((header, index) => (
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
							{productData.map((product) => (
								<tr
									className="text-center text-off-white odd:bg-noir-de-vigne"
									key={product._id}
								>
									<td className="truncate p-3">{product._id}</td>
									<td className="truncate p-3">{product.name}</td>
									<td className="truncate p-3">{product.price}</td>
									<td className="truncate p-3">{product.category}</td>
									<td className="truncate p-3">
										{new Date(product.startTime).toLocaleDateString('en-US')} (
										{new Date(product.startTime).toLocaleTimeString('en-US')})
									</td>
									<td className="truncate p-3">
										{product.maximumEventCapacity}
									</td>
									<td className="truncate p-3">{product.eventLocation}</td>
									<td className="space-x-4 p-3 text-creased-khaki">
										<Link to={`/admin/product/${product._id}/edit`}>
											<button className="btn-sm">
												<FaEdit />
											</button>
										</Link>
										<button
											className="btn-sm"
											onClick={() => {
												openModal(
													'Deleting product. Are you absolutely sure you want to do this?',
													() => deleteProductHandler(product._id)
												);
											}}
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
					paginationType="products"
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
					{productData.map((product) => (
						<div
							key={product._id}
							className=" flex w-full flex-col rounded-2xl border border-creased-khaki bg-emerald-green p-6"
						>
							<div className="truncate text-xl font-bold text-off-white">
								{product.name}
							</div>
							<div className="mb-3 flex flex-row items-center py-1 text-sm text-off-white">
								<FaCopy />
								<span className="w-24 truncate pl-1">{product._id}</span>
							</div>
							<div className="flex flex-row justify-between text-off-white">
								<span className="truncate font-bold">Venue:</span>
								<div className="flex flex-row items-center justify-around">
									<FaCopy />
									<span className="max-w-32 truncate pl-1">
										{product.eventLocation}
									</span>
								</div>
							</div>
							<div className="flex flex-row justify-between text-off-white">
								<span className="truncate font-bold">Stock Left:</span>
								<div className="flex flex-row items-center justify-around">
									<span className="max-w-32 truncate pl-1">
										{product.maximumEventCapacity -
											(product.maximumEventCapacity - product.countInStock)}
										/{product.maximumEventCapacity}
									</span>
								</div>
							</div>
							<div className="flex flex-row items-center justify-between text-off-white">
								<span className="font-bold">Sold Out?:</span>
								<span>
									{product.stockInCount <= 0 ? (
										<FaCheck className="mx-auto fill-green-600" />
									) : (
										<FaTimes className="mx-auto" style={{ color: 'red' }} />
									)}
								</span>
							</div>
							<div className="mt-5 flex flex-row justify-between space-x-4">
								<Link to={`${PRODUCTS_URL}/${product._id}/edit`}>
									<button className="flex h-full w-full justify-center rounded-2xl bg-creased-khaki p-3 text-lg font-bold text-noir-de-vigne">
										<FaEdit />
									</button>
								</Link>
								<button className="flex h-full w-full justify-center rounded-2xl bg-creased-khaki p-3 text-lg font-bold text-noir-de-vigne">
									<FaLockOpen />
								</button>
								<button className="flex h-full w-full justify-center rounded-2xl bg-creased-khaki p-3 text-lg font-bold text-noir-de-vigne">
									<FaArchive />
								</button>
							</div>
						</div>
					))}
				</div>
				<Pagination
					pages={data.pages}
					page={data.page}
					paginationType="products"
					isAdmin={true}
					className={'place-self-center'}
				/>
			</div>
			{modalConfig.isOpen && (
				<ConfirmationPrompt
					setVisibility={modalConfig.isOpen}
					onCancelClick={closeModal}
					onConfirmClick={async () => {
						await modalConfig.onConfirm();
						closeModal();
					}}
					message={modalConfig.message}
				/>
			)}
		</>
	);
};

export default ProductListPage;
