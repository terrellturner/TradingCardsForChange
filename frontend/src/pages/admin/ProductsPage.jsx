import React from 'react'
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ProductPagination from "../../components/ProductPagination";



const ProductsPage = () => {
    const { pageNumber } = useParams();
    const { data, isLoading, error, refetch } = useGetProductsQuery(
        // {
        //     pageNumber,
        // }
    );
    const [createProduct, { isLoading: loadingCreateProduct }] =
        useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDeleteProduct }] =
        useDeleteProductMutation();

    const deleteProductHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                refetch();
                toast.success(`Successfully deleted product ${id}`);
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        }
    };

    const createProductHandler = async () => {
        if (window.confirm("Creating new product, continue?")) {
            try {
                await createProduct();
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };

    return (
        <>
            {loadingDeleteProduct && <Loader />}
            {isLoading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h2>{error?.data?.message || error.error}</h2>
            ) : (
                <div className='flex flex-col'>
                    <h1 className='text-5xl text-off-white p-12 font-bold'>Products</h1>
                    <div className=' text-ipa-beige flex-row self-center p-20 w-11/12 hidden md:flex'>
                        <table className="table-fixed w-full bg-hops-green rounded-2xl border-ipa-beige border border-spacing-0 border-separate overflow-hidden">
                            <thead className='h-10'>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>LOCATION</th>
                                    <th>START</th>
                                    <th>END</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {data.map((product) => (
                                    <tr key={product._id}>
                                        <td className='truncate p-3 px-10'>{product._id}</td>
                                        <td className='truncate p-3'>{product.name}</td>
                                        <td className='truncate p-3'>${product.price}</td>
                                        <td className='truncate p-3'>{product.category}</td>
                                        <td className='truncate p-3'>{product.brand}</td>
                                        <td className='truncate p-3'>
                                            <Link to={`/admin/product/${product._id}/edit`}>
                                                <button className="btn-sm mx-2">
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                            <button
                                                className="btn-sm"
                                                onClick={() => deleteProductHandler(product._id)}
                                            >
                                                <FaTrash style={{ color: "white" }} />
                                            </button>
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
}

export default ProductsPage;