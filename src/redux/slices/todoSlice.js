import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const createTodo  = createAsyncThunk(
    'createtodo',
    async({list_id,data})=>{
        try {
            
            const res = await axios.post(`/api/teams/task/${list_id}`,data)
            // console.log(res.data.data);
            return res.data.data;
            
        } catch (error) {
            console.log(error);
            
        }
    }
)

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
        .addCase(createTodo.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(createTodo.fulfilled,(state,action)=>{
            state.todo = action.payload
            state.isLoading = false;
        })
        .addCase(createTodo.rejected,(state)=>{
            state.isError = true;
            state.isLoading = false;
        })
    }
})

export default todoSlice;