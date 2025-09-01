import { TimerState } from '@/util/interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TimerState = {
    isRunning: false,
    startTimestamp: null,
    stopTimestamp: null,
    currentTimerId: null,
}

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        startTimer(state, action: PayloadAction<{ timerId?: string } | undefined>) {
            state.isRunning = true
            state.startTimestamp = Date.now()
            state.stopTimestamp = null
            state.currentTimerId = action.payload?.timerId || null
        },
        stopTimer(state) {
            state.isRunning = false
            state.stopTimestamp = Date.now()
            state.startTimestamp = null
            state.currentTimerId = null
        },
     




syncTimer(state, action: PayloadAction<{ timerId: string; startTime: string } | null>) {
  if (!action.payload) {
    state.isRunning = false
    state.stopTimestamp = Date.now()
    state.startTimestamp = null
    state.currentTimerId = null
    return
  }
  state.isRunning = true
  state.startTimestamp = new Date(action.payload.startTime).getTime()
  state.stopTimestamp = null
  state.currentTimerId = action.payload.timerId
}
    },
})

export const { startTimer, stopTimer, syncTimer } = timerSlice.actions
export default timerSlice.reducer
