import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchTasklist = createAsyncThunk(
    'fetchtasklist',
    async(workspace_id)=>{
       try {
        const tasklistData = await axios.get(`/api/teams/workspace/${workspace_id}`)
        
        // console.log(tasklistData.data.data)
        return tasklistData.data.data
        
       } catch (error) {
        console.log(error);
        
       }
    }
)

export  const createlist  = createAsyncThunk(
    'createlist',
    async(data)=>{

        try {
            console.log("async")
            const tasklist = await axios.post('/api/teams/tasklist',data);
            console.log(tasklist);
            return tasklist.data.data;
            
        } catch (error) {
            console.log(error);
        }

    }
)

export const editList = createAsyncThunk(
    "edittasklist",
    async({tasklist_id,data})=>{
          try {

            const res = await axios.put(`/api/teams/tasklist/${tasklist_id}`,data)
            console.log(res.data.data);
            return res.data.data;
            
          } catch (error) {
            console.log(error);
            
          }
    }
)

export const shareList = createAsyncThunk(
    'sharelist',
    async({user_id,tasklist_id})=>{
        try {
            const res = await axios.put(`/api/teams/tasklist/share/${user_id}`,tasklist_id);
            return res.data.data;
            
        } catch (error) {
            console.log(error);
        }
    }
)


const initialState = {
    tasklist:null,
    isLoading:false,
    isError:false
}

const tasklistSlice = createSlice({
    name:"tasklist",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        builder
        .addCase(createlist.pending,(state)=>{
            state.isLoading = true;

        })
        .addCase(createlist.fulfilled,(state)=>{
            state.isLoading = false;
        })
        .addCase(createlist.rejected,(state)=>{
            state.isLoading = false;

        })
        .addCase(fetchTasklist.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(fetchTasklist.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.tasklist = action.payload;
        })
        .addCase(fetchTasklist.rejected,(state)=>{
            state.isError = true;
        })

    }
})

export default tasklistSlice.reducer;