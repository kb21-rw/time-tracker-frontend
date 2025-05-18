import api from '@/lib/api'
import { projectState } from '@/util/interfaces'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: projectState = {
    projects: [],
    loading: false,
    error: null,
}

export const createProject = createAsyncThunk(
    'project',
    async (
        { workspaceId, clientId, name }: { workspaceId: string; clientId: string; name: string },
        { rejectWithValue },
    ) => {
        try {
            const response = await api.post(
                `/workspaces/${workspaceId}/clients/${clientId}/projects`,
                { name: name },
            )
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Creating project failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const getProjectsByWorkspaceId = createAsyncThunk(
    'workspaces/getProjectsByWorkspaceId ',
    async (workspaceId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/workspaces/${workspaceId}/projects`)
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Fetching projects failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createProject.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload.projects
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getProjectsByWorkspaceId.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(getProjectsByWorkspaceId.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload
            })
            .addCase(getProjectsByWorkspaceId.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default projectSlice.reducer
