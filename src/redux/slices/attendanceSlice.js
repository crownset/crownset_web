import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleAttendanceActions } from "@/helpers/admin/reduxState";



export const punchInDatas = createAsyncThunk(
    "Attendance/postDatain",
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
export const punchOutData = createAsyncThunk(
    "Attendance/postDataout",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/punchOut", credentials);
            console.log(response);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)




const initialState = {
    attendance: [],
    loading: false,
    error: null,
};

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleAttendanceActions(builder, punchInDatas, initialState);
        handleAttendanceActions(builder, punchOutData, initialState);

    },
});

export default attendanceSlice.reducer;