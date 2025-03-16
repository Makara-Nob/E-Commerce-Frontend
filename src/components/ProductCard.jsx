import React from 'react'
import { ShoppingCartIcon } from '@heroicons/react/16/solid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice'

function ProductCard({ product }) {
  const { cartId } = useSelector((state) => state.cart);
  // Check the structure of product.images to make sure it's correct
  const imageUrl = product.images && product.images.length > 0 ? 
    `${product.images[0].downloadUrl}` : 
    'https://www.dummyimage.co.uk/50x50/cbcbcb'; // fallback image if no downloadUrl

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const cartIdValue = cartId ?? null
    if(!cartIdValue){
        console.error("No cartId presented:", cartId)
        return
    }
    dispatch(addToCart({
      cartId: cartIdValue,
      itemId: product.productId,
      quantity: 1,
      product: product,
      unitPrice: product.price
    }));
  };

  return (
    <div key={product.productId} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.productId}`} className="block group">
        <div className="relative">
          <img
            src={imageUrl}
            alt={product.name}
            className="object-cover object-center w-full h-48 md:h-50 rounded-md group-hover:opacity-90 transition-opacity duration-300"
          />
        </div>
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
          onClick={() => handleAddToCart(product)}
          aria-label="Add to cart"
        >
          <ShoppingCartIcon className="size-[1.5rem]" />
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
