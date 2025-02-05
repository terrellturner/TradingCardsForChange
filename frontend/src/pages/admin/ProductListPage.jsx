import React, { useState, useEffect } from 'react';
import { useGetProductsQuery, useDeleteProductMutation } from '../../slices/productsApiSlice'
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
} from 'react-icons/fa';
import Loader from '../../components/Loader';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '../../components/Pagination';
import SortDropdown from '../../components/SortDropdown';

const ProductListPage = () => {
    const tableHeaders = [
        { displayName: 'ID', queryName: '_id' },
        { displayName: 'Title', queryName: 'title' },
        { displayName: 'Price', queryName: 'price' },
        { displayName: 'Category', queryName: 'category' },
        { displayName: 'Start Time', queryName: 'startTime' },
        { displayName: '#Stock', queryName: 'countInStock' },
        { displayName: 'Venue', queryName: 'eventLocation' },
    ];
    const { pageNumber } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const sortField = searchParams.get('sortField') || '';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    const [productData, setProductData] = useState([]);
    const { data, isLoading, error } = useGetProductsQuery(
        {
            pageNumber,
            sortField,
            sortOrder
        },
    );
    const [deleteProduct, { isLoading: loadingDeleteProduct }] =
        useDeleteProductMutation();

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

    const deleteHandler = async (id) => {
        if (window.confirm('Deleting product. Are you sure?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted.');
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        }
    };

    useEffect(() => {
        if (data?.products) {
            setProductData(data?.products);
        }
    }, [data?.products]);

    return (
        <>
            {loadingDeleteProduct && <Loader />}
            {isLoading || !productData ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h2>{error?.data?.message || error.error}</h2>
            ) : window.innerWidth > 800 ? (
                <div className="flex flex-col">
                    <h1 className="p-12 text-5xl font-bold text-off-white">
                        Products
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
                                {productData.map((product) => (
                                    <tr
                                        className="text-center text-off-white odd:bg-newsletter-black"
                                        key={product._id}
                                    >
                                        <td className="truncate p-3">
                                            {product._id}
                                        </td>
                                        <td className="truncate p-3">
                                            {product.name}
                                        </td>
                                        <td className="truncate p-3">
                                            {product.price}
                                        </td>
                                        <td className="truncate p-3">
                                            {product.category}
                                        </td>
                                        <td className="truncate p-3">
                                            {product.startTime}
                                        </td>
                                        <td className="truncate p-3">
                                            {product.countInStock}
                                        </td>
                                        <td className="truncate p-3">
                                            {product.eventLocation}
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
                                                onClick={() =>
                                                    deleteHandler(product._id)
                                                }
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
            ) : (
                //Mobile view
                <div className="flex flex-col space-y-10 px-12 py-6 my-auto">
                    <SortDropdown headers={tableHeaders} sortedField={sortField} sortedDirection={sortOrder} onSort={sortBy} />
                    <div className="flex flex-col place-items-center space-y-10 ">
                        {productData.map((product) => (
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
                        paginationType="products"
                        isAdmin={true}
                        className={'place-self-center'}
                    />
                </div>
            )}
        </>
    );
};

export default ProductListPage;
