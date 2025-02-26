import React from 'react'
import { ShoppingCartIcon } from '@heroicons/react/16/solid';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice'

function ProductCard({ product }) {
   // Check the structure of product.images to make sure it's correct
   const imageUrl = product.images && product.images.length > 0 ? 
   `http://localhost:5000${product.images[0].downloadUrl}` : 
   'https://via.placeholder.com/150'; // fallback image if no downloadUrl

   const dispatch = useDispatch();

   const handleAddToCart = () => {
      dispatch(addToCart({
        productId: product.productId,
        quantity: 1
      }
      ))
   }
  return (
    <>
        <div key={product.productId} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <Link to={`/product/${product.productId}`} className="block group">
            <img
              src={imageUrl}
              alt={product.name}
              className="object-cover object-top md:h-50 rounded-md group-hover:opacity-90 transition-opacity duration-300"
            />
          </Link>

          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">{product.name}</h3>
          <h5 className="font-semibold text-gray-500 text-center">{product.brand}</h5>
          {/* Price and Add to Cart */}
          <div className="flex justify-between items-center mt-4 gap-2">
          <p className="font-bold text-base text-gray-800">
             ${product.price ? product.price.toFixed(2) : "0.00"}
          </p>
            <button
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg shadow-sm transition-all duration-300"
              onClick={() => handleAddToCart(product.productId)}
              aria-label="Add to cart"
            >
              <ShoppingCartIcon className="size-[1.5rem]" />
              Add To Cart
            </button>
          </div>
        </div>
    </>
  );
}

export default ProductCard