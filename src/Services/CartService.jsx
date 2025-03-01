import Api from '../api/api'

const endpoint = '/cart'

export const getCartByUserId = async (userId) => {
    const response = await Api.get(`${endpoint}/user/${userId}`)
    return response.data
}

export const addItemToCart = async (productId,quantity) => {
    const response = await Api.post(`${endpoint}/items?productId=${productId}&quantity=${quantity}`)
    return response.data
}

export const removeItemFromCart = async (cartId,itemId) => {
    const response = await Api.delete(`${endpoint}/${cartId}/items/${itemId}`)
    return response.data
}

export const updateItemQuantity = async (cartId,itemId,quantity) => {
    const response = await Api.put(`${endpoint}/items?cartId=${cartId}&itemId=${itemId}&quantity=${quantity}`)
    return response.data
}