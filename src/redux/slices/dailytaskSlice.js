import { handleAsyncActions, handleDailyTaskAsyncActions } from '@/helpers/admin/reduxState';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTaskData = createAsyncThunk(
    'daily/fetchTaskData',
    async () => {
        const response = await axios.get('/api/teams/getTask');
        return response.data;
    }
);

export const postTask = createAsyncThunk(
    'daily/postTask',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/teams/dailyTask', credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editDailyTask = createAsyncThunk(
    "daily/editDailyTask",
    async ({ task_id, updatedData }, { rejectWithValue }) => {
        try {
            const editTaskResponse = await axios.put(`/api/teams/edit/${task_id}`, updatedData)
            console.log("editTaskResponse", editTaskResponse)
            return editTaskResponse.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const shareDailyTask = createAsyncThunk(
    "daily/shareDailyTask",
    async ({ task_id, share_with_id }, { rejectWithValue }) => {
        try {
            const sharetTaskResponse = await axios.put(`/api/teams/share/${task_id}`, share_with_id)
            console.log("sharetTaskResponse", sharetTaskResponse)
            return sharetTaskResponse.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

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
        handleDailyTaskAsyncActions(builder, postTask, 'postingTaskLoading');
        handleDailyTaskAsyncActions(builder, editDailyTask, "updatingTaskLoading", (state, action) => {
            const index = state.daily.findIndex(item => item.id === action.meta.arg);
            if (index !== -1) {
                state.daily[index] = { ...state.daily[index], ...action.payload };
            }
        });
        handleDailyTaskAsyncActions(builder, shareDailyTask, "updatingTaskLoading", (state, action) => {
            const index = state.daily.findIndex(item => item.id === action.meta.arg);
            if (index !== -1) {
                state.daily[index] = { ...state.daily[index], ...action.payload };
            }
        });
    },
});

export default dailytaskSlice.reducer;