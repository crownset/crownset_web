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


export const fetchLeave = createAsyncThunk(
    'Leave/fetchData',
    async () => {
        const response = await axios.get('/api/leaves/getLeave');
        console.log("projectResponse==>", response)
        return response.data;
    });


const initialState = {
    leave: [],
    loading: false,
    error: null,
};

const  leaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleLeaveActions(builder, LeaveQuery,  initialState);
        handleLeaveActions(builder, fetchLeave, initialState);

        
    },
});

export default leaveSlice.reducer;