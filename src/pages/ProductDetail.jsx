import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import ProductService from '../Services/ProductService'

function ProductDetail() {
    const { id } = useParams()
    const { data: product, error, isLoading } = useQuery(['product', id], () => ProductService.getProductById(id))
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)

    const handleMinusQuantity = () => {
      setQuantity(prev => (prev - 1 < 1 ? 1 : prev - 1));
    };
  
    const handlePlusQuantity = () => {
      setQuantity(prev => prev + 1);
    };
  
    const handleAddToCart = () => {
      if (product) {
        dispatch(addToCart({
          productId: product.productId,  // Use the correct field for productId (typically 'productId')
          quantity: quantity,
        }));
      }
    };

    const imageUrl = product?.images && product.images.length > 0 ? 
    `${product.images[0].downloadUrl}` : 
    'https://www.dummyimage.co.uk/50x50/cbcbcb';

    if (isLoading) return <div>Loading...</div> 
    if (error) return <p>Error loading product</p>;

    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">PRODUCT DETAIL</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={imageUrl}  // Ensure this matches your backend image endpoint
              alt={product.name}
              className="w-full max-w-xl h-auto rounded-lg shadow-lg"
            />
          </div>
  
          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-semibold text-gray-800 uppercase">{product.name}</h1>
            <p className="text-2xl font-semibold text-green-600">${product.price}</p>
            <p className="text-lg text-gray-600">{product.description}</p>
  
            {/* Quantity Selector */}
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <button
                  aria-label="Decrease quantity"
                  className="bg-gray-200 h-10 w-10 flex items-center justify-center text-lg font-bold rounded-md shadow-sm hover:bg-gray-300 transition"
                  onClick={handleMinusQuantity}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  aria-label="Increase quantity"
                  className="bg-gray-200 h-10 w-10 flex items-center justify-center text-lg font-bold rounded-md shadow-sm hover:bg-gray-300 transition"
                  onClick={handlePlusQuantity}
                >
                  +
                </button>
              </div>
  
              {/* Add to Cart Button */}
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProductDetail;
