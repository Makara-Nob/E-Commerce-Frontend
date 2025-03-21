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
    addItemToCartRedux: (state,action) => {
      const { itemId, quantity, unitPrice, product } = action.payload
      const item = state.items.find(item => item.itemId === itemId)
      if (item) {
        item.quantity += quantity,
        item.totalPrice = item.unitPrice * item.quantity
      } else {
        state.items.push({
          itemId,
          quantity,
          unitPrice,
          product,
          totalPrice: unitPrice * quantity
        })
      }
    },
    removeItemFromCartRedux: (state,action) => {
        const { cartId, itemId } = action.payload
        if (state.cartId === cartId ) {
          state.items = state.items.filter(item => item.itemId !== itemId)
        }
    },
    updateCartItemQuantityReduxd: (state,action) => {
        const { cartId, itemId, quantity } = action.payload
        if(state.cartId === cartId) {
          const item = state.items.find(item => item.itemId === itemId)
          if (quantity > 0) {
            item.quantity = quantity;
            item.totalPrice = item.unitPrice * quantity
          } else {
            delete state.items[item]
          }
        }
    },
    setCart(state, action) {
      if (action.payload && action.payload.items) {
        state.items = action.payload.items;
        state.totalAmount = action.payload.totalAmount 
        state.cartId = action.payload.cartId || state.cartId;  // Handle missing cartId safely
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

export const { setLoading, setCart, clearCart, toggleStatusTab, addItemToCartRedux,updateCartItemQuantityReduxd, removeItemFromCartRedux } = cartSlice.actions;

// Fetch the cart by userId
export const fetchCart = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await getCartByUserId(userId);
    if(response) {
      dispatch(setCart(response)); 
    } else {
      console.warn('Empty cart response')
    }
  } catch (error) {
    console.error('Failed to fetch cart:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Add item to the cart
export const addToCart = (details) => async (dispatch) => {
  const { cartId, itemId, quantity, unitPrice, product } = details
  if (!cartId || !itemId || !quantity) {
    console.error("Invalid parameters:", { cartId, itemId, quantity });
    return;
  }
  dispatch(setLoading(true));
  try {
    await addItemToCart(cartId,itemId,quantity);
    // Fetch the updated cart after adding the item
    dispatch(addItemToCartRedux({ cartId, itemId, quantity, unitPrice, product })); 

  } catch (error) {
    console.error('Failed to add item to cart:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Remove item from the cart
export const removeFromCart = (cartDetails) => async (dispatch) => {
    const { cartId, itemId } = cartDetails; // Destructure cartId and itemId here
   if (!cartId || !itemId) {
    console.error("Invalid parameters:", { cartId, itemId });
    return;
    }
  dispatch(setLoading(true));
  try {
    await removeItemFromCart(cartId,itemId);
    // Fetch the updated cart after removing item
    dispatch(removeItemFromCartRedux({ cartId, itemId}));
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
    dispatch(updateCartItemQuantityReduxd({cartId,itemId,quantity}));
  } catch (error) {
    console.error('Failed to update item quantity:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default cartSlice.reducer;