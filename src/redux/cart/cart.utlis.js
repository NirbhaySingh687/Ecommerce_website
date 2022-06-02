export const addItemToCart = ( cartItems, cartItemToAdd) => {
    const existingCollection = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)
    if(existingCollection){
        return cartItems.map( cartItem => cartItem.id === cartItemToAdd.id ? {
            ...cartItem, quantity: cartItem.quantity +1
        } : cartItem)
    }else {
        return [ ...cartItems, { ...cartItemToAdd, quantity: 1}]
    }
}

export const filterItems = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id )
}

export const removeItemToCart = (cartItems, cartItemToRemove) => {
    const existingCollection = cartItems.find( cartItem => cartItem.id === cartItemToRemove.id)
    if(existingCollection.quantity === 1){
        return filterItems(cartItems, existingCollection)
    }
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem )
}