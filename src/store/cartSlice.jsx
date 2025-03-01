// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { addItemToCart, getCartByUserId, removeItemFromCart, updateItemQuantity } from '../Services/CartService';

const initialState = {
  items: [], // This will hold the cart items (with product details)
  totalAmount: 0, // Total amount of the cart
  cartId: null, // Store cart ID to reference for future actions
  loading: false,
  statusTab: false, // Control visibility of the cart tab
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCart(state, action) {
      if (action.payload && action.payload.items) {
        state.items = action.payload.items;
        state.totalAmount = action.payload.totalAmount || 0;
        state.cartId = action.payload.cartId || null;  // Handle missing cartId safely
      } else {
        console.error('Invalid cart data:', action.payload);
        state.items = [];
        state.totalAmount = 0;
        state.cartId = null;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.cartId = null; // Reset cartId on clearing the cart
    },
    toggleStatusTab(state) {
      state.statusTab = !state.statusTab;
    },
  },
});

export const { setLoading, setCart, clearCart, toggleStatusTab } = cartSlice.actions;

// Fetch the cart by userId
export const fetchCart = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await getCartByUserId(userId);
    dispatch(setCart(response)); // Assuming API returns cart data with items and totalAmount
  } catch (error) {
    console.error('Failed to fetch cart:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Add item to the cart
export const addToCart = (productId, quantity) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await addItemToCart(productId, quantity);
    // Fetch the updated cart after adding the item
    dispatch(fetchCart()); // Optionally fetch cart again to get updated state
  } catch (error) {
    console.error('Failed to add item to cart:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Remove item from the cart
export const removeFromCart = (itemId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await removeItemFromCart(itemId);
    // Fetch the updated cart after removing item
    dispatch(fetchCart());
  } catch (error) {
    console.error('Failed to remove item from cart:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Update item quantity in the cart
export const updateCartItemQuantity = (cartId, itemId, quantity) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await updateItemQuantity(cartId, itemId, quantity);
    // Fetch the updated cart after updating item quantity
    dispatch(fetchCart());
  } catch (error) {
    console.error('Failed to update item quantity:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default cartSlice.reducer;