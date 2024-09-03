import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
    <div className="p-5 space-y-3 relative flex flex-col max-w-sm max-w-full min-h-[20rem] md:h-max-96 bg-off-white border border-gray-700 rounded-lg shadow">
        <div className="bg-hops-green h-20 w-20 text-ipa-beige shadow-lg absolute top-0 right-0 m-2 rounded-lg p-3 text-center">
            <span className="text-sm block font-bold">
                {product.startTime.toLocaleString('default', {month: 'short'})}
            </span>
            <span className="text-3xl font-black">{product.startTime.getDate()}</span>
        </div>
        <Link to={`/product/${product._id}`}>
           <img src={product.image} alt="" className='object-cover object-center h-52 md:h-72 mx-auto'/>
        </Link>
        <Link to={`/product/${product._id}`}>
            <strong className='text-4xl font-bold'>{product.name}</strong>
        </Link>
        <h3>{product.description}</h3>
    </div>
  )
}

export default ProductCard

ProductCard.propTypes = {
    product: PropTypes.object
}