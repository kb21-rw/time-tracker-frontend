import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/api'

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

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, loading: false, error: null as any },
    reducers: {},
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
    },
})

export default authSlice.reducer
