import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleAttendanceActions } from "@/helpers/admin/reduxState";

export const punchInDatas = createAsyncThunk(
    "Attendance/postDatain",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/punchIn", credentials);
            //console.log(response);
            return response.data;
        } catch (error) {
          //  console.log("punch in-> ",error);
            return rejectWithValue(error.response.message);
        }
    }
);
export const punchOutData = createAsyncThunk(
    "Attendance/postDataout",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/punchOut", credentials);
           // console.log(response);
            return response.data;
        } catch (error) {

            //console.log("punch out-> ",error);
            return rejectWithValue(error.response.message);
        }
    }
);

export const getData = createAsyncThunk(
    'Attendance/getData',
    async (date, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/getAttendance', date);
            //  console.log(response);
            return response.data
        } catch (error) {
            // console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
);


const initialState = {
    attendance: [], 
    isPunching: false,
    isPunchout: false, 
    error: false, 
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
                
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload);
                state.attendance = action.payload;
            })
            .addCase(getData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true
            });
    },
});

export default attendanceSlice.reducer;
