import { TimerState } from '@/util/interfaces'
import { createSlice } from '@reduxjs/toolkit'

const initialState: TimerState = {
    isRunning: false,
    description: '',
    selectedProject: null,
    startTimestamp: null,
    stopTimestamp: null,
}

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setTimerRunning(state, action){
            state.isRunning = action.payload
        },
        setDescription(state, action) {
            state.description = action.payload
        },
        setStateProject(state, action) {
            state.selectedProject = action.payload
        },
        clearSelectedProject(state) {
            state.selectedProject = null
        },
        clearDescription(state) {
            state.description = ''
        },
        clearTimer(state) {
            state.isRunning = false
            state.description = ''
            state.selectedProject = null
            state.startTimestamp = null
            state.stopTimestamp = null
        },

        startTimer(state, action) {
            state.isRunning = true
            // state.startTimestamp = Date.now()
            state.startTimestamp = action.payload
            state.stopTimestamp = null
        },
        stopTimer(state) {
            state.isRunning = false
            state.stopTimestamp = Date.now()
            state.startTimestamp = null
        },
    },
})

export const {
    setTimerRunning,
    startTimer,
    stopTimer,
    setDescription,
    setStateProject,
    clearDescription,
    clearSelectedProject,
    clearTimer,
} = timerSlice.actions
export default timerSlice.reducer
