import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api'
import { AuthState } from '../../util/interfaces'
import { saveToken } from '@/util/auth'

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    expiresAt: null,
    error: null,
}
export const signupAdmin = createAsyncThunk(
    'auth/signupAdmin',
    async (
        userData: { fullName: string; email: string; password: string },
        { rejectWithValue },
    ) => {
        try {
            const response = await api.post(`/auth/signup`, userData)
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Signup failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const signupUser = createAsyncThunk(
    'workspaces/invitations/accept',
    async (
        { token, password, fullName }: { token: string; fullName: string; password: string },
        { rejectWithValue },
    ) => {
        try {
            const response = await api.post(`workspaces/invitations/accept`, {
                token,
                fullName,
                password,
            })
            return response.data
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Accepting invitation failed'
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
                const expiresAt = saveToken(response.data.access_token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                return {
                    ...response.data,
                    expiresAt,
                }
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Login failed'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await api.post(`/auth/forgot-password`, { email })
            return response.data
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || 'Failed to send reset password link'
            return rejectWithValue(
                typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
            )
        }
    },
)

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (data: { newPassword: string; token: string }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/auth/reset-password`, data)
            return response.data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to reset password'
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
            localStorage.removeItem('token_expiry')
        },
        // Add a reducer to restore auth state from localStorage
        restoreAuth: state => {
            const token = localStorage.getItem('token')
            const user = localStorage.getItem('user')
            const expiry = localStorage.getItem('token_expiry')
            if (token && user && expiry) {
                state.token = token
                state.user = JSON.parse(user)
                state.expiresAt = parseInt(expiry)
            }
        },
        clearError: state => {
            state.error = null
        },
    },
    extraReducers: builder => {
        builder
            .addCase(signupAdmin.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(signupAdmin.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(signupAdmin.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
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
                state.expiresAt = action.payload.expiresAt
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(forgotPassword.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(forgotPassword.fulfilled, state => {
                state.loading = false
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(resetPassword.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(resetPassword.fulfilled, state => {
                state.loading = false
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { clearError, logout, restoreAuth } = authSlice.actions
export default authSlice.reducer
