import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async () => {
        const response = await axios.get('/api/teams/getQuery');
        console.log("response====>", response)
        return response.data;
    });

const querySlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default querySlice.reducer;
