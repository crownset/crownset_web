import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

export const getExcelData = createAsyncThunk(
    'automation/sendMailData',
    async (queryData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/addMultipleQueries', { queryData });
            console.log("data", response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const multipleLeadSlice = createSlice({
    name: 'multipleLeadSlice',
    initialState: {
        queryData: [],
        isLoading: false,
        isSuccess: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getExcelData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.error = null; ``
            })
            .addCase(getExcelData.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getExcelData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload || 'Failed to get data');
            });
    },
});

export default multipleLeadSlice.reducer;
