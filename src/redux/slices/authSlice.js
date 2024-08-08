import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleAsyncActions } from '@/helpers/admin/reduxState';

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
            console.log("login response==>",response )
            return response.data;
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
            console.log("forgetResponse====>", response)
            return response.data.message;
        } catch (   error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/resetpassword', { token, newPassword });
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
            state.user = action.payload;
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
            state.user = null;
            state.error = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(forgetPassword.pending, (state) => {
            state.forgotPasswordStatus = 'loading';
        })
        .addCase(forgetPassword.fulfilled, (state) => {
            state.forgotPasswordStatus = 'succeeded';
        })
        .addCase(forgetPassword.rejected, (state, action) => {
            state.forgotPasswordStatus = 'failed';
            state.error = action.payload;
        })
        .addCase(resetPassword.pending, (state) => {
            state.resetPasswordStatus = 'loading';
        })
        .addCase(resetPassword.fulfilled, (state) => {
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
