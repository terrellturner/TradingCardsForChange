import React from 'react';
import Logo from '/images/tc4c-one.svg';
import ProductCard from '../components/ProductCard';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { FaUser } from 'react-icons/fa';
import ImageCarousel from '../components/ImageCarousel';
import Loader from '../components/Loader';

const HomePage = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();
    const heroImages = import.meta.env.VITE_HERO_IMG_URLS.split(',');

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message>{error.data?.message || error.error}</Message>
            ) : (
                <>
                    <div className="my-10 flex h-full grow flex-col items-center space-y-10 bg-newsletter-black">
                        <ImageCarousel imageUrls={heroImages} />
                        <div className="mx-auto grid w-4/5 max-w-[90rem] grid-cols-1 gap-10 md:grid-cols-2 2xl:grid-cols-3">
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
