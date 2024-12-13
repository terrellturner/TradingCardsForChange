import React from 'react';
import Logo from '/images/tc4c-one.svg';
import ProductCard from '../components/ProductCard';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { FaUser } from 'react-icons/fa';

const HomePage = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <Message>{error.data?.message || error.error}</Message>
            ) : (
                <>
                    <div className="flex min-h-full grow flex-col bg-newsletter-black ">
                        <div className="flex h-full w-1/2">
                            <img src={Logo} alt="" className="h-full w-full" />
                            <img src={Logo} alt="" className="h-full w-full" />
                        </div>
                        <div className="mx-auto my-5 grid w-4/5 max-w-[90rem] grid-cols-1 gap-10 md:grid-cols-2 2xl:grid-cols-3">
                            {products ? (
                                products.map((product, index = product._id) => {
                                    const startTime = new Date(
                                        product.startTime
                                    );
                                    return (
                                        <ProductCard
                                            product={product}
                                            key={index}
                                        >
                                            <div className="flex w-full justify-between">
                                                <div className="mt-auto flex h-12 rounded-full p-3 text-center font-bold text-hops-green">
                                                    <FaUser className="m-0.5 my-auto" />
                                                    <span className="">
                                                        {product.countInStock}/
                                                        {
                                                            product.originalStockCount
                                                        }
                                                    </span>
                                                </div>
                                                <button className="flex rounded-lg bg-hops-green p-2 text-center font-bold text-draft-yellow">
                                                    <span className="p-2">
                                                        RSVP
                                                    </span>
                                                </button>
                                            </div>
                                        </ProductCard>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default HomePage;
