import React from 'react';
import { removeFromCart, updateCartItemQuantity } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../Context/AuthContext';

function CartItems() {

  const { items, cartId, loading } = useSelector((state) => state.cart);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const userId = user?.id;
  const cartIdValue = cartId ?? null
  const handleRemove = (itemId) => {
    cartId && itemId ? 
      dispatch(removeFromCart({ cartId, itemId })) 
    : console.error("Invalid parameters:", { cartId, itemId });
  };

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    newQuantity > 0 ? 
      dispatch(updateCartItemQuantity(cartIdValue, itemId, newQuantity,userId)) 
    : handleRemove(itemId)
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="space-y-2">
      {items && items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.itemId}
            className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center space-x-4 transform transition-all duration-300 ease-in-out"
          >          
              <img
                src={item.product.images[0]?.downloadUrl || 'https://www.dummyimage.co.uk/50x50/cbcbcb'} // Handle missing images
                alt={item.product.name}
                 className="w-16 h-16 object-cover rounded-md"
              />
              <div className='flex-1'>
                <h3 className="font-semibold text-base">{item.product.name}</h3>
                <p className="text-xs text-gray-500">{item.product.brand}</p>
              </div>
            {/* Quantity and Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleQuantityChange(item.itemId, item.quantity - 1)}
                  className="bg-gray-800 text-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-600"
                  disabled={item.quantity < 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  readOnly
                  className="w-8 text-center"
                />
                <button
                  onClick={() => handleQuantityChange(item.itemId, item.quantity + 1)}
                  className="bg-gray-800 text-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Price and Remove Button */}
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm text-gray-500">Total</span>
              <span className="text-lg font-semibold text-gray-900">${item.totalPrice.toFixed(2)}</span>
              <button
                onClick={() => handleRemove(item.itemId)}
                className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out"
                aria-label='Remove'
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartItems;
