import {useParams} from 'react-router-dom'
import products from '../products'
import { FaUser } from 'react-icons/fa';

const ProductPage = () => {
    const {id: productId} = useParams();

    const product = products.find((p) => p._id === productId)
    console.log(product);
    

  return (
    <div className='px-12 py-8 min-w-80'>
      <button className='w-28 h-12 rounded-md bg-hops-green text-draft-yellow border-ipa-beige'>Go Back</button>
      <section className='flex flex-col py-8 space-y-5 md:flex-row md:justify-between max-w-[1440px] mx-auto'>
        <img src={product.image} className='md:w-1/3 object-cover md:h-96'  alt={product.description} />
        <div className="flex flex-col divide-y-2 space-y-3 md:px-16 w-full">
          <h3 className="text-4xl text-off-white p-4">{product.name}</h3>
          <span className='border-ipa-beige text-off-white p-4 pb-0 text-lg font-bold'>
            <FaUser className='inline my-auto' />{product.countInStock}/{product.originalStockCount} seats available
          </span>
          <span className='border-ipa-beige text-off-white p-4 pb-0 text-lg font-bold'>
            Category: {product.category}
          </span>
          <span className='border-ipa-beige text-off-white p-4 pb-0'>
            {product.description}
          </span>
        </div>
        <div className="flex flex-col divide-y-2 md:p-10 border border-ipa-beige rounded-md justify-around h-1/2">
          <div className='border-ipa-beige text-off-white p-4 flex space-x-3 justify-between'>
            <span>Ticket Price: </span>
            <span>${product.price}</span>
          </div>
          <div className='border-ipa-beige text-off-white p-4 flex space-x-3 justify-between'>
            <span>Seats Available?: </span>
            <span>{product.countInStock > 0 ? 'Yes!' : 'Sold Out!'}</span>
          </div>
          <div className='border-ipa-beige text-off-white p-4 flex space-x-3 justify-between'>
            <span>
              Seats to Reserve:
            </span>
            <select name="qty" id="qty" className='w-full border-draft-yellow md:w-1/2 bg-newsletter-black'>
              {[...Array(product.countInStock).keys()].map(
                (x)=> (
                  <option key={x+1} value={x+1}>
                    {x+1}
                  </option>
                )
              )}
            </select>
          </div>
          <span className='border-ipa-beige text-off-white p-4'>
          <button disabled={product.countInStock === 0} className='bg-hops-green w-28 h-12 rounded-md text-draft-yellow disabled: disabled:text-newsletter-black'>Buy Now</button>
          </span>
        </div>
      </section>
    </div>
    
  )
}

export default ProductPage