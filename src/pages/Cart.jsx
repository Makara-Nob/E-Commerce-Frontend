import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // to access Redux state
import CartItems from '../components/CartItems';
import { toggleStatusTab } from '../store/cartSlice';
import { motion } from 'framer-motion';

function Cart() {
  const { statusTab } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <motion.div
      className="fixed top-0 right-0 bg-gray-700 shadow-2xl w-[27rem] h-full grid grid-rows-[60px_1fr_60px]"
      initial={{ x: '100%', opacity: 10 }}
      animate={{ x: statusTab ? '0' : '100%', opacity: statusTab ? 1 : 0 }}
      exit={{ x: '100%', opacity: 10 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
      <div className="p-5">
        <CartItems />
      </div>
      <div className="grid grid-cols-2">
        <button 
          className="bg-black text-white"
          onClick={() => dispatch(toggleStatusTab())}
        >
          CLOSE
        </button>
        <button className="bg-amber-600 text-white">CHECKOUT</button>
      </div>
    </motion.div>
  );
}

export default Cart;
