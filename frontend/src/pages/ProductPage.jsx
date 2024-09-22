import React from 'react';
import { useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';

const ProductPage = () => {
    const { id: productId } = useParams();

    const {
        data: product,
        isLoading,
        error,
    } = useGetProductDetailsQuery(productId);

    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <div>{error.data?.message || error.error}</div>
            ) : (
                <>
                    <div className="min-w-80 px-12 py-8">
                        <Link to="/">
                            <button className="h-12 w-28 rounded-md border-ipa-beige bg-hops-green text-draft-yellow">
                                Go Back
                            </button>
                        </Link>
                        <section className="mx-auto flex max-w-[1440px] flex-col space-y-5 py-8 md:flex-row md:justify-between">
                            <img
                                src={product.image}
                                className="object-cover md:h-96 md:w-1/3"
                                alt={product.description}
                            />
                            <div className="flex w-full flex-col space-y-3 divide-y-2 md:px-16">
                                <h3 className="p-4 text-4xl text-off-white">
                                    {product.name}
                                </h3>
                                <span className="border-ipa-beige p-4 pb-0 text-lg font-bold text-off-white">
                                    <FaUser className="my-auto inline" />
                                    {product.countInStock}/
                                    {product.originalStockCount} seats available
                                </span>
                                <span className="border-ipa-beige p-4 pb-0 text-lg font-bold text-off-white">
                                    Category: {product.category}
                                </span>
                                <span className="border-ipa-beige p-4 pb-0 text-off-white">
                                    {product.description}
                                </span>
                            </div>
                            <div className="flex h-1/2 flex-col justify-around divide-y-2 rounded-md border border-ipa-beige md:p-10">
                                <div className="flex justify-between space-x-3 border-ipa-beige p-4 text-off-white">
                                    <span>Ticket Price: </span>
                                    <span>${product.price}</span>
                                </div>
                                <div className="flex justify-between space-x-3 border-ipa-beige p-4 text-off-white">
                                    <span>Seats Available?: </span>
                                    <span>
                                        {product.countInStock > 0
                                            ? 'Yes!'
                                            : 'Sold Out!'}
                                    </span>
                                </div>
                                <div className="flex justify-between space-x-3 border-ipa-beige p-4 text-off-white">
                                    <span>Seats to Reserve:</span>
                                    <select
                                        name="qty"
                                        id="qty"
                                        className="w-full border-draft-yellow bg-newsletter-black md:w-1/2"
                                    >
                                        {[
                                            ...Array(
                                                product.countInStock
                                            ).keys(),
                                        ].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <span className="border-ipa-beige p-4 text-off-white">
                                    <button
                                        disabled={product.countInStock === 0}
                                        className="disabled: h-12 w-28 rounded-md bg-hops-green text-draft-yellow disabled:text-newsletter-black"
                                    >
                                        Buy Now
                                    </button>
                                </span>
                            </div>
                        </section>
                    </div>
                </>
            )}
        </>
    );
};

export default ProductPage;
