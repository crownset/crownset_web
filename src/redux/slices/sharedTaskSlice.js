import { handleSharedAsyncActions } from '@/helpers/admin/reduxState';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSharedTask = createAsyncThunk(
    'shared/getSharedTask',
    async ({ user_id }) => {
        try {
            console.log("user_id>>>>>>>>>", user_id)
            const sharedResponse = await axios.get(`/api/teams/getSharedTask/${user_id}`);
            console.log("sharedResponse", sharedResponse)

            return sharedResponse.data;
        } catch (error) {
            console.log(error)
        }

    }
);

const initialState = {
    shared: [],
    sharedLoading: false,
    error: null,
};

const sharedSlice = createSlice({
    name: "shared",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleSharedAsyncActions(builder, getSharedTask, 'sharedLoading');
    }
});

export default sharedSlice.reducer;
