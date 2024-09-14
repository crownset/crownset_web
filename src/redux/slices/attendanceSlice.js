import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleAttendanceActions } from "@/helpers/admin/reduxState";



export const punchInData = createAsyncThunk(
    "Attendance/postData",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/punchIn", credentials);
            console.log(response);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
const initialState = {
    punchData: {},
    loading: false,
    error: null,
};

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleAttendanceActions(builder, punchInData, initialState);
        

    },
});

export default attendanceSlice.reducer;