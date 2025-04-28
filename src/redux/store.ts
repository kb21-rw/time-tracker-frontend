import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/counterSlice'
import workspacesReducer from './slice/workspaceSlice'
import authReducer from './slice/authSlice'
import sidebarReducer from './features/sidebarSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        workspaces: workspacesReducer,
        sidebar: sidebarReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
