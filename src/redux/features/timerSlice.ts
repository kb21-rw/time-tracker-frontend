import { TimerState } from '@/util/interfaces'
import { createSlice } from '@reduxjs/toolkit'

const initialState: TimerState = {
    isRunning: false,
    startTimestamp: null,
    stopTimestamp: null,
}

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        startTimer(state) {
            state.isRunning = true
            state.startTimestamp = Date.now()
            state.stopTimestamp = null
        },
        stopTimer(state) {
            state.isRunning = false
            state.stopTimestamp = Date.now()
            state.startTimestamp = null
        },
    },
})

export const { startTimer, stopTimer } = timerSlice.actions
export default timerSlice.reducer
