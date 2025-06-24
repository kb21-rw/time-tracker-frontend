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

export const {
    startTimer,
    stopTimer,
    setDescription,
    setStateProject,
    clearDescription,
    clearSelectedProject,
    clearTimer,
} = timerSlice.actions
export default timerSlice.reducer
