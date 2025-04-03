import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../lib/api'
import { User, WorkspaceState } from '../../util/interfaces'

const initialState: WorkspaceState = {
    workspace: null,
    loading: false,
    error: null,
}
export const createWorkspace = createAsyncThunk(
    'workspaces',
    async (workspaceName: { name: string, user: User }, { rejectWithValue }) => {
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

const workspaceSlice = createSlice({
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
                state.workspace = action.payload.workspace
            })
            .addCase(createWorkspace.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default workspaceSlice.reducer
