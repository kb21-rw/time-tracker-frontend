import api from '@/lib/api'
import { StartTimerPayload, TimeLogState , ManualEntryValues } from '@/util/interfaces'
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

export const submitManualEntry = createAsyncThunk(
    'manualEntry',
    async ({id, data}: {id: string, data:ManualEntryValues}, { rejectWithValue }) => {
        try {
            console.log(data)
            const response = await api.post(`/workspaces/${id}/timeEntries`,data)
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
    reducers: {
        clearError: state => {
            state.error = null
        },
      resetManualEntryState: state => {
        state.loading = false
        state.error = null
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
            })
            .addCase(submitManualEntry.fulfilled,(state,action) => {
                state.loading = false
                state.timeLogs.push(action.payload)
            })
            .addCase(submitManualEntry.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
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
export const { resetManualEntryState } = TimeLogSlice.actions