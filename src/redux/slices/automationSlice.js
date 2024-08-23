import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const sendMailData = createAsyncThunk(
    'automation/sendMailData',
    async (mailData, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/automation/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mailData }),
            });
            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || 'Something went wrong');
            }

            return data;
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
                state.error = null;
            })
            .addCase(sendMailData.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success('Mail sent successfully!');
            })
            .addCase(sendMailData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload || 'Failed to send mail');
            });
    },
});

export default automationSlice.reducer;
