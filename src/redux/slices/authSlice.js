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
            console.log("login response==>", response)
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
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/api/teams/resetPassword?token=${token}`, {password });
            console.log("reset password ===>", response)
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
        handleCases(builder, loginUser, 'status');
        handleCases(builder, logoutUser, 'status');
        handleCases(builder, forgetPassword, 'forgotPasswordStatus');
        handleCases(builder, resetPassword, 'resetPasswordStatus');
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
