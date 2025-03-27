import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../lib/api'
import { WorkspaceState } from '../../util/interfaces'

const initialState: WorkspaceState = {
    workspaces: [],
    loading: false,
    error: null,
}
export const createWorkspace = createAsyncThunk(
    'workspaces',
    async (workspaceName: { name: string }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/workspaces`, workspaceName)
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'creating Workspace faile'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)
export const getWorkspacesByUser = createAsyncThunk(
    'workspace/getByUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('workspaces')
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Fetching workspaces failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

const workspacesSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createWorkspace.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(createWorkspace.fulfilled, (state, action) => {
                state.loading = false
                state.workspaces.push(action.payload.workspace)
            })
            .addCase(createWorkspace.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload
            })
            .addCase(getWorkspacesByUser.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(getWorkspacesByUser.fulfilled, (state, action) => {
                state.loading = false
                state.workspaces = action.payload
            })
            .addCase(getWorkspacesByUser.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload
            })
    },
})

export default workspacesSlice.reducer
