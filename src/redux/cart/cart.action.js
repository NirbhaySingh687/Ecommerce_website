import { CartActionTypes } from "./cart.types";

export const toggleCartHidden = () => {
    return {
        type: CartActionTypes.TOGGLE_CART_HIDDEN
    }
}

export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})

export const clearItemForCart= item => ({
    type: CartActionTypes.CLEAR_ITEM_FOR_CART,
    payload: item
})

export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
})