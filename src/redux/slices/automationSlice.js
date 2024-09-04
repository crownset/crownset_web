import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

export const sendMailData = createAsyncThunk(
    'automation/sendMailData',
    async (mailData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/automation/mail', { mailData });
            console.log("data===========>", response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const automationSlice = createSlice({
    name: 'automation',
    initialState: {
        mailData: [],
        isLoading: false,
        isSuccess: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendMailData.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.error = null; ``
            })
            .addCase(sendMailData.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(sendMailData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload || 'Failed to send mail');
            });
    },
});

export default automationSlice.reducer;
