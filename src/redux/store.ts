import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import counterReducer from './slice/counterSlice'
import workspacesReducer from './slice/workspaceSlice'
const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        workspaces: workspacesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
