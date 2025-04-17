import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../lib/api'
import { WorkspaceState } from '../../util/interfaces'

const initialState: WorkspaceState = {
    workspaces: [],
    workspaceUsers: [],
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
            const errorMessage = error.response?.data?.message || 'creating Workspace failed'
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

export const inviteUser = createAsyncThunk(
    'workspace/inviteUser',
    async (
        params: { id: string; userData: { fullName: string; email: string } },
        { rejectWithValue },
    ) => {
        const { id, userData } = params
        try {
            const response = await api.post(`Workspaces/${id}/invitations`, userData)
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to invite user'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const renameWorkspace = createAsyncThunk(
    'workspace/rename',
    async ({ name, id }: { name: string; id: string }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`workspaces/${id}`, { name })
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Renaming workspace failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const getWorkspaceUsers = createAsyncThunk(
    'workspace/getUsers',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`Workspaces/${id}/users`)
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Fetching users failed'
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
                state.loading = false
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
                state.loading = false
                state.error = action.payload
            })
            .addCase(inviteUser.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(inviteUser.fulfilled, state => {
                state.loading = false
            })
            .addCase(inviteUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(renameWorkspace.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(renameWorkspace.fulfilled, (state, action) => {
                state.loading = false
                const index = state.workspaces.findIndex(
                    workspace => workspace.id === action.payload.id,
                )
                if (index !== -1) {
                    state.workspaces[index].name = action.payload.name
                }
                state.workspaces[1].name
            })
            .addCase(renameWorkspace.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getWorkspaceUsers.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(getWorkspaceUsers.fulfilled, (state, action) => {
                state.loading = false
                state.workspaceUsers = action.payload
            })
            .addCase(getWorkspaceUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default workspacesSlice.reducer
