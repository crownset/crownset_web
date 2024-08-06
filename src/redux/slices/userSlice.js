import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleAsyncActions } from "@/helpers/reduxState";

export const assignUsers = createAsyncThunk(
    'user/assignUsers',
    async () => {
        const assignResponse = await axios.get('/api/teams/getUser');
        console.log("assignResponse====>", assignResponse)
        return assignResponse.data;
    });


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
        handleAsyncActions(builder, assignUsers, initialState);
    }
})

export default userSlice.reducer