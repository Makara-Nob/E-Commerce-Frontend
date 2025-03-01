import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // to access Redux state
import CartItems from '../components/CartItems';
import { fetchCart, updateCartItemQuantity, removeFromCart, toggleStatusTab } from '../store/cartSlice';
import { useAuth } from '../Context/AuthContext';

function Cart() {
  const { items, cartId, loading, totalAmount, statusTab } = useSelector((state) => state.cart);
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user?.id) {
      dispatch(fetchCart(user.id)); // Fetch cart on component mount
    }
  }, [dispatch, user]);

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId)); // Dispatch the remove action
  };

  // Handle quantity change
  const handleQuantityChange = (cartId, itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity(cartId, itemId, newQuantity)); // Dispatch the update action with the correct cartId, itemId, and newQuantity
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div
      className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-[27rem] h-full grid grid-rows-[60px_1fr_60px] 
        transition-transform transform duration-500 ease-in-out
        ${statusTab === false ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
      `}
    >
      <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
      <div className="p-5">
        <CartItems 
          items={items} 
          removeProduct={handleRemove} 
          updateProductQuantity={handleQuantityChange} 
          cartId={cartId} 
        />
      </div>
      <div className="grid grid-cols-2">
        <button 
          className="bg-black text-white"
          onClick={() => dispatch(toggleStatusTab())} // Close cart
        >
          CLOSE
        </button>
        <button className="bg-amber-600 text-white">CHECKOUT</button>
      </div>
    </div>
  );
}

export default Cart;
