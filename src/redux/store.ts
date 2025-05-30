import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import workspacesReducer from './slice/workspaceSlice'
import authReducer from './slice/authSlice'
import sidebarReducer from './features/sidebarSlice'
import clientReducer from './slice/clientSlice'
import projectReducer from './slice/projectSlice'
import workspaceStateReducer from './features/workspaceStateSlice'
import timerSliceReducer from './features/timerSlice'

import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    auth: authReducer,
    workspaces: workspacesReducer,
    sidebar: sidebarReducer,
    clients: clientReducer,
    projects: projectReducer,
    workspaceState: workspaceStateReducer,
    timer: timerSliceReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['workspaceState', 'timer'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
