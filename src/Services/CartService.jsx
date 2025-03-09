import Api from '../api/api'

const endpoint = '/cart'

export const getCartByUserId = async (userId) => {
    const response = await Api.get(`${endpoint}/user/${userId}`)
    return response.data.data
}

// NOTE: This function will change later on response.data to response.data.data
export const getCartByCartId = async (cartId) => {
    const response = await Api.get(`${endpoint}/${cartId}`)
    return response.data
} 

export const addItemToCart = async (cartId,itemId,quantity) => {
    console.log("cartId:  " + cartId + " productId: " + itemId + " quantity: " + quantity)
    const response = await Api.post(`${endpoint}/items`,{
        cartId,
        itemId,
        quantity
    })
    console.log("response:  ",response)
    return response.data
}

export const removeItemFromCart = async (cartId,itemId) => {
    const response = await Api.delete(`${endpoint}/items`, {
        params: {
            cartId,
            itemId,
        }
    })
    return response.data
}

export const updateItemQuantity = async (cartId,itemId,quantity) => {
    const response = await Api.put(`${endpoint}/items`,{
        cartId,
        itemId,
        quantity
    })
    return response.data
}