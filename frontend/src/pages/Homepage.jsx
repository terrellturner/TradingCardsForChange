import {useEffect, useState} from 'react'
import Logo from '/images/tc4c-one.svg'
import products from '../products'
import ProductCard from '../components/ProductCard'
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () =>{
      const {data} = await axios.get('/api/products');
      setProducts(data);
    }

    fetchProducts();
  }, [])
  

  return (
    <div className="min-h-full grow bg-newsletter-black flex flex-col ">
        <div className="h-full w-1/2 flex">
          <img src={Logo} alt="" className='w-full h-full'/>
          <img src={Logo} alt="" className='w-full h-full'/>
        </div>
        <div className="my-5 w-4/5 mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 2xl:grid-cols-3 max-w-[90rem]">
          {products.map((product)=>{
            return (
              <ProductCard product={product} key={product._id} />
            )
          })}
        </div>
   </div>
  )
}

export default HomePage