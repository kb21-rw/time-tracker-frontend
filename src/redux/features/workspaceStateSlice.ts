import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface WorkspaceMinimal {
    id: string
    name: string
}
interface WorkspaceState {
    workspace: WorkspaceMinimal | null
}

const initialState: WorkspaceState = {
    workspace: null,
}

export const workspaceStateSlice = createSlice({
    name: 'workspaceState',
    initialState,
    reducers: {
        setWorkspace: (state, action: PayloadAction<WorkspaceMinimal>) => {
            state.workspace = action.payload
        },

        clearWorkspace: state => {
            state.workspace = null
        },
    },
})

export const { setWorkspace, clearWorkspace } = workspaceStateSlice.actions

export const selectWorkspace = (state: RootState): WorkspaceMinimal | null =>
    state.workspaceState.workspace

export default workspaceStateSlice.reducer
