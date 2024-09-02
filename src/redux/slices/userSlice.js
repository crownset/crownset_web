import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const assignUsers = createAsyncThunk(
    'user/assignUsers',
    async () => {
        const assignResponse = await axios.get('/api/teams/getUser');
        // console.log(assignResponse);
        return assignResponse.data;
    }
);

const initialState = {
    user: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(assignUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(assignUsers.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(assignUsers.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    }
});

export default userSlice.reducer;
