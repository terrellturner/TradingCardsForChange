import React from 'react';
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = React.forwardRef((props, ref) => {
    const { product, cardClasses, children } = props;
    const inStock = product.countInStock;
    const startTime = new Date(product.startTime);
    const endTime = new Date(product.endTime);
    return (
        <div
            ref={ref}
            className={`border-gray-700 relative flex flex-col justify-around space-y-3 rounded-lg border bg-off-white p-5 shadow ${cardClasses}`}
        >
            <div className="absolute top-0 right-0 w-20 h-20 p-3 m-2 text-center rounded-lg shadow-lg bg-hops-green text-ipa-beige">
                <span className="block text-sm font-bold">
                    {startTime.toLocaleString('default', {
                        month: 'short',
                    })}
                </span>
                <span className="text-3xl font-black">{`${startTime.getDate()}`}</span>
            </div>
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.image}
                    alt=""
                    className="object-cover object-center w-full mx-auto rounded-lg h-52 md:h-72"
                />
            </Link>
            <Link to={`/product/${product._id}`}>
                <h3
                    className={`block truncate text-xl font-bold md:text-2xl ${product.inStock === 0 ? 'line-through' : ''}`}
                >
                    {product.name}
                </h3>
            </Link>
            <div className="line-clamp-3">{product.description}</div>
            {children}
        </div>
    );
});

ProductCard.displayName = 'productCard';

export default ProductCard;

ProductCard.propTypes = {
    product: PropTypes.object,
    cardClasses: PropTypes.string,
    children: PropTypes.any,
};
