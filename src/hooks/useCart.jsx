import { addItemToCart, getCartByUserId, updateItemQuantity, removeItemFromCart } from '../Services/CartService'
import { useDispatch } from 'react-redux'
import { useQuery, useMutation } from 'react-query'
import { addToCart, removeFromCart } from '../store/cartSlice'

const useCart = () => {
    const userId  = localStorage.getItem("userId") || null
    console.log("userId: " + userId)
    const dispatch = useDispatch()

    const { data: items , isLoading, isError, refetch } = useQuery({
        queryKey: ['cart',userId],
        queryFn: () => getCartByUserId(userId),
        enabled: !!userId
    })

    const { mutate: addProduct } = useMutation(
        async (product) => {
            const response = await addItemToCart(product.productId,product.quantity)
            return response;
        },
        {
            onSuccess: (newItem) => {
                dispatch(addToCart(newItem));
                refetch()
            },
        }
    )

    const { mutate: removeProduct } = useMutation(
        async (productId) => {
            const cardId = items?.cartId
            const response = await removeItemFromCart(cardId,productId)
            return response
        },
        {
            onSuccess: (removeItem) => {
                dispatch(removeFromCart(removeItem.id))
                refetch()
            }
        }
    )

    // Update item quantity in the cart
  const { mutate: updateProductQuantity } = useMutation(
    async (updatedItem) => {
      const { itemId, quantity } = updatedItem;
      const cartId = items?.cartId; // Assuming cartId is available from the fetched data
      const response = await updateItemQuantity(cartId, itemId, quantity);
      return response;  // Return the updated item data
    },
    {
      onSuccess: (updatedItem) => {
        dispatch(updateCartItemQuantity(updatedItem));  // Dispatch to redux to update item quantity
        refetch();  // Refetch to ensure the latest data
      },
    }
  );

  return {
    items,
    isLoading,
    isError,
    addProduct,
    removeProduct,
    updateProductQuantity
  }
}

export default useCart