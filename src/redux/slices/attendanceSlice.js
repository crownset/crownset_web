import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleAttendanceActions } from "@/helpers/admin/reduxState";

export const punchInDatas = createAsyncThunk(
    "Attendance/postDatain",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/punchIn", credentials);
            console.log(response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const punchOutData = createAsyncThunk(
    "Attendance/postDataout",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/punchOut", credentials);
            console.log(response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getData = createAsyncThunk(
    'Attendance/getData',
    async (date, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/getAttendance', date);
            console.log(response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const initialState = {
    attendance: [], 
    isPunching: false,
    isPunchout: false, 
    error: null, 
};
const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    
        handleAttendanceActions(builder, punchInDatas, "isPunching");
         handleAttendanceActions(builder, punchOutData, "isPunchout");

        
        builder
            .addCase(getData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.attendance = action.payload;
            })
            .addCase(getData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Error fetching attendance data.";
            });
    },
});

export default attendanceSlice.reducer;
