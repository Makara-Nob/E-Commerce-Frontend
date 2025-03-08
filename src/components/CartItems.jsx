import React from 'react';

function CartItems({ items, removeProduct, updateProductQuantity, cartId }) {
  return (
    <div className="space-y-2">
      {items && items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.itemId}
            className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center space-x-4 transform transition-all duration-300 ease-in-out"
          >          
              <img
                src={item.product.images[0]?.downloadUrl || '/path/to/default-image.jpg'} // Handle missing images
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
                  onClick={() => updateProductQuantity(cartId, item.itemId, item.quantity - 1)}
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
                  onClick={() => updateProductQuantity(cartId, item.itemId, item.quantity + 1)}
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
                onClick={() => removeProduct(item.itemId)}
                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out"
                aria-label={`Remove ${item.product.name} from cart`}
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
