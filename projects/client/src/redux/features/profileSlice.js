import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addToProfile: (state, action) => {
            let newData = action.payload
            state.data.push(newData)
        },
        fillDataProfile: (state, action) => {
            state.data = action.payload
        },
    },
})

export const { fillDataProfile, addToProfile } = profileSlice.actions
export default profileSlice.reducer
