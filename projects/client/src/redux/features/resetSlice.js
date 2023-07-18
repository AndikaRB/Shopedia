import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "",
    is_verify: true
}

const resetSlice = createSlice({
    name: "reset",
    initialState,
    reducers: {
        attach: (state, action) => {
            state.email = action.payload.email
            state.is_verify = action.payload.is_verify
        },
        detach: (state) => {
            state.email = ""
            state.is_verify = true
        }
    }
})

export const { attach, detach } = resetSlice.actions

export default resetSlice.reducer