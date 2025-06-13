import api from '@/lib/api'
import { TimeLogState } from '@/util/interfaces'
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

const TimeLogSlice = createSlice({
    name: 'timeLog',
    initialState,
    reducers: {},
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
    },
})

export default TimeLogSlice.reducer
