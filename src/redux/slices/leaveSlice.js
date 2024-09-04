import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleLeaveActions } from "@/helpers/admin/reduxState";




export const fetchLeave = createAsyncThunk(
    'Leave/fetchData',
    async () => {
        const response = await axios.get('/api/leaves/getLeave');
        console.log("projectResponse==>", response)
        return response.data;
    });

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

export const editLeave = createAsyncThunk(
    "Leave/editData",
    async ({ queryId, updatedData }, { rejectWithValue }) => {
        try {
            const editResponse = await axios.put(`/api/leaves/updateLeave/${queryId}`, updatedData)
            console.log("editResponse", editResponse)
            return editResponse.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const deleteLeave = createAsyncThunk(
    "Leave/deleteData",
    async (leaveId, { rejectWithValue }) => {
        try {
            const deleteResponse = await axios.put(`/api/leaves/deleteLeave/${leaveId}`);
            console.log("leaveDelete", deleteResponse )
            return deleteResponse.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


const initialState = {
    leave: null,
    loading: false,
    error: null,
};

const leaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleLeaveActions(builder, LeaveQuery, initialState);
        handleLeaveActions(builder, fetchLeave, initialState);
        handleLeaveActions(builder, deleteLeave, initialState, (state, action) => {
            state.leave = state.leave.filter(item => item.id !== action.meta.arg);
        });
        handleLeaveActions(builder, editLeave, initialState, (state, action) => {
            const index = state.leave.findIndex(item => item.id === action.meta.arg);
            if (index !== -1) {
                state.leave[index] = { ...state.leave[index], ...action.payload };
            }
        });


    },
});

export default leaveSlice.reducer;