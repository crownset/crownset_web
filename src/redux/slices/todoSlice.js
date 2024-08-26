import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";





const initialState = {
    todo:null,
    isLoading:false,
    isError:false,
}

const todoSlice  = createSlice({
    name:"todo",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
    }
})

export default todoSlice;