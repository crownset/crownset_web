import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleLeaveActions } from "@/helpers/admin/reduxState";

export const LeaveQuery = createAsyncThunk(
    "Leave/postData",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/leaves/addLeave", credentials);
            console.log("postLeadData===>", response)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    leave: [],
    loading: false,
    error: null,
};

const  leaveSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleLeaveActions(builder, LeaveQuery, initialState);
    },
});

export default leaveSlice.reducer;