import api from '@/lib/api'
import { TimeLogState as ImportedTimeLogState, ManualEntryValues } from '@/util/interfaces'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface TimeLogState extends ImportedTimeLogState {
    success: boolean
}

const initialState: TimeLogState = {
    timeLogs: [],
    loading: false,
    error: null,
    success: false,
}

export const getUserTimeLogs = createAsyncThunk(
    'getUserTimeLogs',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`workspaces/${id}/timeEntries`)
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Fetching time entries failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const submitManualEntry = createAsyncThunk(
    'manualEntry',
    async ({id, data}: {id: string, data:ManualEntryValues}, { rejectWithValue }) => {
        try {
            console.log(data)
            const response = await axios.post(`workspaces/${id}/timeEntries/manualEntry`,data)
            return response.data
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err.response?.data?.message || 'Submission failed')
        }
    }
)

const TimeLogSlice = createSlice({
    name: 'timeLog',
    initialState,
    reducers: {  resetManualEntryState: state => {
        state.loading = false
        state.error = null
        state.success = false
    },},
    extraReducers: builder => {
        builder
            .addCase(getUserTimeLogs.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserTimeLogs.fulfilled, (state, action) => {
                state.loading = false
                state.timeLogs = action.payload
            })
            .addCase(getUserTimeLogs.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(submitManualEntry.pending, state => {
                state.loading = true
                state.error = null
                state.success = false
            })
            .addCase(submitManualEntry.fulfilled, state => {
                state.loading = false
                state.success = true
            })
            .addCase(submitManualEntry.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            
            
    },
})

export default TimeLogSlice.reducer
export const { resetManualEntryState } = TimeLogSlice.actions