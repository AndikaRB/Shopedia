import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    trans: [],
    paidTrans: [],
    unpaidTrans: [],
    totalPrice: 0,
    totalQuantity: 0,
    checkoutCart: []
}

const transSlice = createSlice({
    name: "trans",
    initialState,
    reducers: {
        fillTrans: (state, action) => {
            state.trans = action.payload
        },
        addTransaction: (state, action) => {
            state.trans.push(action.payload)
        },
        fillPaidTrans: (state, action) => {
            state.paidTrans = action.payload
        },
        fillUnpaidTrans: (state, action) => {
            state.unpaidTrans = action.payload
        },
    },
});

export const { fillTrans, addTransaction, fillPaidTrans, fillUnpaidTrans } = transSlice.actions
export default transSlice.reducer
