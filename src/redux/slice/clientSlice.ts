import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../lib/api'
import { ClientState } from '@/util/interfaces'
const initialState: ClientState = {
    clients: [],
    loading: false,
    error: null,
}

export const getWorkspaceClients = createAsyncThunk(
    'workspaces/getClients',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`workspaces/${id}/clients`)
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Fetching clients failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const createClient = createAsyncThunk(
    'client/create',
    async ({ workspaceId, name }: { workspaceId: string; name: string }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/workspaces/${workspaceId}/clients`, { name })
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Creating client failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

const ClientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createClient.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(createClient.fulfilled, (state, action) => {
                state.loading = false
                state.clients = action.payload.clients
            })
            .addCase(createClient.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getWorkspaceClients.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(getWorkspaceClients.fulfilled, (state, action) => {
                state.loading = false
                state.clients = action.payload
            })
            .addCase(getWorkspaceClients.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default ClientSlice.reducer
