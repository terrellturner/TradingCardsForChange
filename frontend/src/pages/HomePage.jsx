import React from 'react';
import Logo from '/images/tc4c-one.svg';
import ProductCard from '../components/ProductCard';
import Message from '../components/Message';
import { useGetProductsQuery } from '../slices/productsApiSlice';

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
                                    return (
                                        <ProductCard
                                            product={product}
                                            key={index}
                                        />
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
