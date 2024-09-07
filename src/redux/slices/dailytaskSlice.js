import { handleAsyncActions, handleDailyTaskAsyncActions } from '@/helpers/admin/reduxState';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTaskData = createAsyncThunk(
    'daily/fetchTaskData',
    async () => {
        const response = await axios.get('/api/teams/getTask');
        // console.log()
        return response.data;
    }
);

const initialState = {
    daily: [],
    fetchingTaskLoading: false,
    postingTaskLoading: false,
    updatingTaskLoading: false,
    error: null,
};

const dailytaskSlice = createSlice({
    name: 'daily',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleDailyTaskAsyncActions(builder, fetchTaskData, 'fetchingTaskLoading');
        // handleAsyncActions(builder, postQuery, 'posting');
        // handleAsyncActions(builder, deleteQuery, 'deleting', (state, action) => {
        //     state.data = state.data.filter(item => item.id !== action.meta.arg);
        // });
        // handleAsyncActions(builder, editQuery, 'updating', (state, action) => {
        //     const index = state.data.findIndex(item => item.id === action.meta.arg);
        //     if (index !== -1) {
        //         state.data[index] = { ...state.data[index], ...action.payload };
        //     }
        // });
    },
});

export default dailytaskSlice.reducer;