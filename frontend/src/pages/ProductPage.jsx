import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { motion } from 'motion/react';
import Message from '../components/Message';
import { defaultMotion } from '../constants';


const ProductPage = () => {

    const { id: productId } = useParams();

    const dis = useDispatch();
    const nav = useNavigate();

    const [qty, setQty] = useState(1);

    const {
        data: product,
        isLoading,
        error,
    } = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        dis(addToCart({ ...product, qty }));
        nav('/cart');
    };

    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <Message>{error.data?.message || error.error}</Message>
            ) : (
                <>
                    {/* Navigation button */}
                    <motion.div variants={
                        defaultMotion
                    }
                        initial="initial"
                        animate="open"
                        exit="closed" className="min-w-80 grow px-12 py-8">
                        <Link to="/">
                            <button className="h-12 w-28 rounded-md border-ipa-beige bg-hops-green text-draft-yellow">
                                Go Back
                            </button>
                        </Link>
                        <section className="mx-auto flex max-w-[1440px] flex-col space-y-5 py-8 md:min-w-[900px] md:flex-row md:justify-between">
                            <img
                                src={product.image}
                                className="aspect-square object-cover md:h-96"
                                alt={product.description}
                            />
                            {/* Product Details */}
                            <div className="flex w-full flex-col space-y-3 divide-y-2 md:w-1/3 md:min-w-52 md:px-16">
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
                            {/* Order Details */}
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

                                    {product.countInStock > 0 && (
                                        <select
                                            name="qty"
                                            id="qty"
                                            className="w-full border-draft-yellow bg-newsletter-black md:w-1/2"
                                            onChange={(e) =>
                                                setQty(Number(e.target.value))
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    product.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                                <span className="border-ipa-beige p-4 text-off-white">
                                    <button
                                        disabled={product.countInStock === 0}
                                        className="disabled: h-12 w-28 rounded-md bg-hops-green text-draft-yellow disabled:text-newsletter-black"
                                        onClick={addToCartHandler}
                                    >
                                        Buy Now
                                    </button>
                                </span>
                            </div>
                        </section>
                    </motion.div>
                </>
            )}
        </>
    );
};

export default ProductPage;
