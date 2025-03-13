import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api'
import { AuthState } from '../../util/interfaces'

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
}
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (
        userData: { fullName: string; email: string; password: string },
        { rejectWithValue },
    ) => {
        try {
            const response = await api.post(`/users`, userData)
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Signup failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/auth/login`, userData)

            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
            }
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Login failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.user = null
            state.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
        // Add a reducer to restore auth state from localStorage
        restoreAuth: state => {
            const token = localStorage.getItem('token')
            const user = localStorage.getItem('user')
            if (token && user) {
                state.token = token
                state.user = JSON.parse(user)
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(signupUser.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(loginUser.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { logout, restoreAuth } = authSlice.actions
export default authSlice.reducer
