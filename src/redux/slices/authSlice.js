import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleCases } from '@/helpers/admin/reduxState';


const initialState = {
    user: null,
    status: 'idle',
    error: null,
    forgotPasswordStatus: 'idle',
    resetPasswordStatus: 'idle',
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/teams', credentials);
            const userInfo = await response.data;
            localStorage.setItem("user", JSON.stringify(userInfo))
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/teams/signOut');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const forgetPassword = createAsyncThunk(
    'auth/forgetPassword',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/teams/forgotPassword', { email });
            return response.data.message;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/api/teams/resetPassword?token=${token}`, { password });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload; // Store user details
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.user = null; // Clear user details
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(forgetPassword.pending, (state) => {
                state.forgotPasswordStatus = 'loading';
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.forgotPasswordStatus = 'succeeded';
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.forgotPasswordStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.resetPasswordStatus = 'loading';
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPasswordStatus = 'succeeded';
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resetPasswordStatus = 'failed';
                state.error = action.payload;
            });
    },
});


export const { logout } = authSlice.actions;

export default authSlice.reducer;
