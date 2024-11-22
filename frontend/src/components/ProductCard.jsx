import React from "react";
import PropTypes from 'prop-types'
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
     const inStock = product.countInStock;
     const startTime = new Date(product.startTime);
     const endTime = new Date(product.endTime)
  return (
    <div className="p-5 space-y-3 justify-around relative flex flex-col max-w-full bg-off-white border border-gray-700 rounded-lg shadow">
        <div className="bg-hops-green h-20 w-20 text-ipa-beige shadow-lg absolute top-0 right-0 m-2 rounded-lg p-3 text-center">
            <span className="text-sm block font-bold">
                {startTime.toLocaleString('default', {month: 'short'})}
            </span>
            <span className="text-3xl font-black">{`${startTime.getDay()}`}</span>
        </div>
        <Link to={`/product/${product._id}`}>
           <img src={product.image} alt="" className='rounded-lg object-cover object-center h-52 md:h-72 mx-auto w-full'/>
        </Link>
        <Link to={`/product/${product._id}`}>
            <strong className={`text-4xl font-bold ${inStock === 0 ? 'line-through':''}`}>{product.name}</strong>
        </Link>
        <h3>{product.description}</h3>
        <div className="flex justify-between w-full">
            <div className="h-12 mt-auto rounded-full font-bold text-hops-green text-center flex p-3">
                <FaUser className='my-auto m-0.5'/> 
                <span className=''>{inStock}/{product.originalStockCount}</span>
            </div>
            <button className="rounded-lg font-bold bg-hops-green text-draft-yellow text-center flex p-2">
                <span className='p-2'>RSVP</span>
            </button>
        </div>
    </div>
  )
}

export default ProductCard

ProductCard.propTypes = {
    product: PropTypes.object
}