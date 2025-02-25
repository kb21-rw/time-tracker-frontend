import { createSlice } from '@reduxjs/toolkit'

interface initialState {
    counter: number
}

const initialState: initialState = {
    counter: 0
}
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.counter++
        },
        decrement: state => {
            state.counter--
        },
        incrementByAmount: (state, action) => {
            state.counter += action.payload
        }
    }
})
export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer