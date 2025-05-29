import { createSlice } from '@reduxjs/toolkit'

interface TimerState {
    isRunning: boolean
    startTimestamp: number | null
}

const initialState: TimerState = {
    isRunning: false,
    startTimestamp: null,
}

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        startTimer(state) {
            state.isRunning = true
            state.startTimestamp = Date.now()
        },
        stopTimer(state) {
            state.isRunning = false
            state.startTimestamp = null
        },
    },
})

export const { startTimer, stopTimer } = timerSlice.actions
export default timerSlice.reducer
