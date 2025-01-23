import React, { useState, useEffect } from 'react'
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaSortUp, FaSortDown, FaLockOpen, FaCopy, FaFilter, FaArchive } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { Link, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import Pagination from '../../components/Pagination';

const ProductsListPage = () => {
    const tableHeaders =
        [{ displayName: "ID", queryName: "_id" },
        { displayName: "Title", queryName: "name" },
        { displayName: "Price", queryName: "price" },
        { displayName: "Category", queryName: "category" },
        { displayName: "Start Time", queryName: "startTime" },
        { displayName: "Venue", queryName: "eventLocation" }];
    const { pageNumber } = useParams();
    const { data, refetch, isLoading, error } = useGetProductsQuery(pageNumber);
    const [deleteProduct, { isLoading: loadingDeleteProduct }] =
        useDeleteProductMutation();

    const [sortingConfig, setSortingConfig] = useState({ key: '', direction: 'asc' });
    const [productData, setProductData] = useState([]);

    const sortBy = (key) => {
        let direction = 'asc';

        if (sortingConfig.key === key && sortingConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sortedProducts = [...productData].sort((a, b) => {
            if (typeof a[key] === 'string') {
                return direction === 'asc'
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            }
            return direction === 'asc'
                ? a[key] - b[key]
                : b[key] - a[key];
        });

        setProductData(sortedProducts);
        setSortingConfig({ key, direction })
    }

    const getSortingIcon = (colKey) => {
        if (sortingConfig.key !== colKey) {
            return null;
        }

        return sortingConfig.direction === 'asc' ? <FaSortUp className='mt-2' /> : <FaSortDown />;
    }

    const deleteHandler = async (id) => {
        if (window.confirm("Deleting product. Are you sure?")) {
            try {
                await deleteProduct(id);
                toast.success("Product deleted.");
                refetch();
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
                <div className='flex flex-col'>
                    <h1 className='text-5xl text-off-white p-12 font-bold'>Products</h1>
                    <div className=' text-ipa-beige flex-row self-center p-20 w-full hidden md:flex'>
                        <table className="table-fixed w-full bg-hops-green rounded-2xl border-ipa-beige border border-spacing-0 border-separate overflow-hidden">
                            <thead className='h-10'>
                                <tr className='select-none'>
                                    {tableHeaders.map((header, index) => (
                                        <th
                                            key={index}
                                            className='cursor-pointer p-3'
                                            onClick={() => sortBy(header.queryName)}
                                        >
                                            <div className='flex flex-row justify-items-center justify-self-center'>{header.displayName} {getSortingIcon(header.queryName)}</div>
                                        </th>
                                    ))}
                                    <th className='p-3'></th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {productData.map((product) => (
                                    <tr className='text-center odd:bg-newsletter-black text-off-white' key={product._id}>
                                        <td className='p-3 truncate'>{product._id}</td>
                                        <td className='p-3 truncate'>{product.name}</td>
                                        <td className='p-3 truncate'>{product.price}</td>
                                        <td className='p-3 truncate'>{product.category}</td>
                                        <td className='p-3 truncate'>{product.startTime}</td>
                                        <td className='p-3 truncate'>{product.eventLocation}</td>
                                        <td className='p-3 space-x-4 text-ipa-beige'>
                                            <Link to={`/admin/product/${product._id}/edit`}>
                                                <button className="btn-sm">
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                            <button
                                                className="btn-sm"
                                                onClick={() => deleteHandler(product._id)}
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
                        paginationType='products'
                        isAdmin={true}
                        className={"place-self-center"} />
                </div>
            ) :
                (<div className='flex flex-col px-12 py-6 space-y-6'>
                    <div className='text-xl text-draft-yellow font-bold flex flex-row place-items-center justify-around'>
                        <div className='flex flex-row space-x-2 place-items-center'><FaFilter /><span>Sort By</span></div>
                        <div className='w-44 text-nowrap overflow-scroll flex flex-row space-x-2 snap-x snap-proximity'>
                            {tableHeaders.map((header) =>
                            (<button key={header.queryName} className='border p-1 px-3 my-2 border-ipa-beige rounded-lg snap-center'>
                                {header.displayName}
                            </button>))}</div>
                    </div>
                    <div className="flex flex-col space-y-10 place-items-center pb-12 ">
                        {productData.map((product) => (
                            <div key={product._id} className=" flex flex-col bg-hops-green rounded-2xl border-ipa-beige border-2 p-6 w-full">
                                <div className='text-3xl text-off-white truncate font-bold'>
                                    {product.firstName} {product.lastName}
                                </div>
                                <div className='text-off-white text-sm mb-3 flex flex-row items-center py-1'><FaCopy /><span className='truncate w-24 pl-1'>{product._id}</span></div>
                                <div className='flex flex-row justify-between text-off-white'><span className='font-bold truncate'>Email:</span><div className='flex flex-row space-x-1 items-center'><FaCopy /><span className='truncate w-36'>{product.email}</span></div></div>
                                <div className='flex flex-row justify-between text-off-white items-center'><span className='font-bold'>Is Admin:</span><span>{product.isAdmin ? (
                                    <FaCheck className='mx-auto fill-green-600' />
                                ) : (
                                    <FaTimes className='mx-auto' style={{ color: "red" }} />
                                )}</span></div>
                                <div className='flex flex-row mt-5 justify-between space-x-4'>
                                    <button className='text-newsletter-black bg-ipa-beige h-full w-full p-3 flex justify-center rounded-2xl font-bold text-lg'><FaEdit /></button>
                                    <button className='text-newsletter-black bg-ipa-beige h-full w-full p-3 flex justify-center rounded-2xl font-bold text-lg'><FaLockOpen /></button>
                                    <button className='text-newsletter-black bg-ipa-beige h-full w-full p-3 flex justify-center rounded-2xl font-bold text-lg'><FaArchive /></button>
                                </div>
                            </div >
                        ))}
                    </div >
                </div>)
            }
        </>
    );
}

export default ProductsListPage;