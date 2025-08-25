import api from '@/lib/api'
import { StartTimerPayload, TimeLogState, TimeLogEntryValues } from '@/util/interfaces'
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

export const stopTimerAPI = createAsyncThunk(
    'timeLog/stopTimer',
    async (
        payload: { workspaceId: string; endTime: string; description?: string; projectId?: string },
        { rejectWithValue },
    ) => {
        try {
            const { workspaceId, ...data } = payload
            const cleanData = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => value !== undefined && value !== ''),
            )
            const response = await api.post(`workspaces/${workspaceId}/timeEntries/stop`, cleanData)
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Stopping timer failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const submitManualEntry = createAsyncThunk(
    'manualEntry',
    async ({ id, data }: { id: string; data: TimeLogEntryValues }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/workspaces/${id}/timeEntries`, data)
            return response.data
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Submission failed'

            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const editTimeLogAPI = createAsyncThunk(
    'editTimeLog',
    async (
        { workspaceId, id, data }: { workspaceId: string; id: string; data: TimeLogEntryValues },
        { rejectWithValue },
    ) => {
        try {
            const response = await api.patch(`/workspaces/${workspaceId}/timeEntries/${id}`, data)
            return response.data
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Edit failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const deleteTimeLogAPI = createAsyncThunk(
    'deleteTimeLog',
    async ({ workspaceId, id }: { workspaceId: string; id: string }, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/workspaces/${workspaceId}/timeEntries/${id}`)
            return response.data
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Delete failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const syncActiveTimer = createAsyncThunk(
    'syncActiveTimer',
    async ({ workspaceId }: { workspaceId: string }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/workspaces/${workspaceId}/timeEntries/active`)
            const activeTimer = response.data

            // Check if response is empty object (no active timer)
            if (Object.keys(activeTimer).length === 0) {
                return null // No active timer
            }

            return activeTimer // Return the active timer object
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Sync failed'
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
        resetManualEntryState: state => {
            state.loading = false
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
            .addCase(submitManualEntry.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(submitManualEntry.fulfilled, (state, action) => {
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
            .addCase(startTimerAPI.fulfilled, state => {
                state.loading = false
            })
            .addCase(startTimerAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(editTimeLogAPI.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(editTimeLogAPI.fulfilled, (state, action) => {
                state.loading = false
                const index = state.timeLogs.findIndex(log => log.id === action.payload.id)
                if (index !== -1) {
                    state.timeLogs[index] = action.payload
                }
            })
            .addCase(editTimeLogAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(deleteTimeLogAPI.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteTimeLogAPI.fulfilled, (state, action) => {
                state.loading = false
                state.timeLogs = state.timeLogs.filter(log => log.id !== action.meta.arg.id)
            })
            .addCase(deleteTimeLogAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(syncActiveTimer.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(syncActiveTimer.fulfilled, state => {
                state.loading = false
                // Note: Timer sync is handled in the timer slice, not here
            })
            .addCase(syncActiveTimer.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { clearError } = TimeLogSlice.actions
export default TimeLogSlice.reducer
export const { resetManualEntryState } = TimeLogSlice.actions
