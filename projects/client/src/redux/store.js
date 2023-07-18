import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/authSlice"
import cartSlice from "./features/cartSlice"
import profileSlice from "./features/profileSlice"
import resetSlice from "./features/resetSlice"
import transSlice from "./features/transSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        reset: resetSlice,
        cart: cartSlice,
        trans: transSlice
    },
})
