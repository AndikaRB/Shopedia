import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    totalCartQuantity: 0,
    totalPrice: 0,
    totalQuantity: 0,
    checkoutCart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            state.cart.push(action.payload)
        },
        fillCart: (state, action) => {
            state.cart = action.payload
        },
        getTotalCartQuantity: (state, action) => {
            state.totalCartQuantity = action.payload
        },
        getTotalPrice: (state, action) => {
            state.totalPrice = action.payload
        },
        getTotalQuantity: (state, action) => {
            state.totalQuantity = action.payload
        },
        checkoutCartItems: (state, action) => {
            state.checkoutCart = action.payload
        }
    },
});

export const { addItemToCart, fillCart, getTotalPrice, getTotalQuantity, checkoutCartItems, getTotalCartQuantity } = cartSlice.actions
export default cartSlice.reducer
