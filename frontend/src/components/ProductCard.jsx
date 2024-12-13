import React from 'react';
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, cardClasses, children }) => {
    const inStock = product.countInStock;
    const startTime = new Date(product.startTime);
    const endTime = new Date(product.endTime);
    return (
        <div
            className={`border-gray-700 relative flex flex-col justify-around space-y-3 rounded-lg border bg-off-white p-5 shadow ${cardClasses}`}
        >
            <div className="absolute right-0 top-0 m-2 h-20 w-20 rounded-lg bg-hops-green p-3 text-center text-ipa-beige shadow-lg">
                <span className="block text-sm font-bold">
                    {startTime.toLocaleString('default', {
                        month: 'short',
                    })}
                </span>
                <span className="text-3xl font-black">{`${startTime.getDay()}`}</span>
            </div>
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.image}
                    alt=""
                    className="mx-auto h-52 w-full rounded-lg object-cover object-center md:h-72"
                />
            </Link>
            <Link to={`/product/${product._id}`}>
                <strong
                    className={`text-4xl font-bold ${product.inStock === 0 ? 'line-through' : ''}`}
                >
                    {product.name}
                </strong>
            </Link>
            <h3>{product.description}</h3>
            {children}
        </div>
    );
};

export default ProductCard;

ProductCard.propTypes = {
    product: PropTypes.object,
    cardClasses: PropTypes.string,
    children: PropTypes.any,
};
