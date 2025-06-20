import api from '@/lib/api'
import { StartTimerPayload, TimeLogState } from '@/util/interfaces'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: TimeLogState = {
    timeLogs: [],
    loading: false,
    error: null,
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

export const startTimerAPI = createAsyncThunk(
    'timeLog/startTimer',
    async (payload: StartTimerPayload, { rejectWithValue }) => {
        try {
            const { workspaceId, ...data } = payload
            const cleanData = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => value !== undefined && value !== ''),
            )
            const response = await api.post(
                `workspaces/${workspaceId}/timeEntries/start`,
                cleanData,
            )
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Starting timer failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

const TimeLogSlice = createSlice({
    name: 'timeLog',
    initialState,
    reducers: {
        clearError: state => {
            state.error = null
        },
    },
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
            .addCase(startTimerAPI.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(startTimerAPI.fulfilled, (state, action) => {
                state.loading = false
                state.timeLogs.push(action.payload)
            })
            .addCase(startTimerAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { clearError } = TimeLogSlice.actions
export default TimeLogSlice.reducer
