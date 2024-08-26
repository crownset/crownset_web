import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { original } from 'immer'
import axios from "axios";



export const fetchTasklist = createAsyncThunk(
    'fetchtasklist',
    async (workspace_id) => {
        try {
            const tasklistData = await axios.get(`/api/teams/workspace/${workspace_id}`)

            // console.log("fetch call")
            return tasklistData.data.data

        } catch (error) {
            console.log(error);

        }
    }
)

export const createlist = createAsyncThunk(
    'createlist',
    async (data) => {

        try {
            // console.log("async")
            const tasklist = await axios.post('/api/teams/tasklist', data);
            // console.log(tasklist.data.data);
            return tasklist.data.data;

        } catch (error) {
            console.log(error);
        }

    }
)

export const editList = createAsyncThunk(
    "edittasklist",
    async ({ tasklist_id, data }) => {
        // console.log(tasklist_id);
        try {

            const res = await axios.put(`/api/teams/tasklist/${tasklist_id}`, data)
            // console.log(res);
            return res.data.data;

        } catch (error) {
            console.log(error);

        }
    }
)

export const shareList = createAsyncThunk(
    'sharelist',
    async ({ user_id, tasklist_id },{ rejectWithValue }) => {
        // console.log(tasklist_id)
        try {
            const res = await axios.put(`/api/teams/tasklist/share/${user_id}`,{tasklist_id});
            return res.data.data;

        } catch (error) {
            console.log(error);
        }
    }
)




export const createTodo = createAsyncThunk(
    'createtodo',
    async ({ list_id, data },{ rejectWithValue }) => {
        try {

            const res = await axios.post(`/api/teams/task/${list_id}`, data)
            // console.log("todo");
          
            return res.data.data;

        } catch (error) {
            console.log(error);

        }
    }
)

const initialState = {
    tasklist: null,
    isLoading: false,
    isCreatingList: false,
    isCreatingTodo: false,
    isError: false
}

const tasklistSlice = createSlice({
    name: "tasklist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(createTodo.pending, (state) => {
                state.isCreatingTodo = true;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                
                const newTodo = action.payload;
                const { tasklist_id } = newTodo;

                const tasklistIndex = state.tasklist.findIndex(list => list._id === tasklist_id);
                // console.log(tasklistIndex);

                if (tasklistIndex !== -1) {
                    state.tasklist[tasklistIndex].todo.push(action.payload)
                    // console.log(original(state.tasklist[tasklistIndex]));
                    // state.tasklist[tasklistIndex].is_deleted = true;
                   
                    // console.log(action.payload);
                    // console.log(original(state.tasklist[tasklistIndex]));
                    //  state.tasklist[tasklistIndex].todo.push(action.payload);
                    // console.log(original(state.tasklist))
                    

                }else{

                  console.log("Tasklist is not found");
                }

                state.isCreatingTodo = false;
            })
            .addCase(createTodo.rejected, (state) => {
                state.isCreatingTodo = false;
            })
            .addCase(createlist.pending, (state) => {
                state.isCreatingList = true;

            })
            .addCase(createlist.fulfilled, (state, action) => {
                state.tasklist.push(action.payload);
                state.isCreatingList = false;

            })
            .addCase(createlist.rejected, (state) => {
                state.isCreatingList = false;

            })
            .addCase(fetchTasklist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTasklist.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.tasklist = action.payload;
                // console.log(state.tasklist);
                state.isLoading = false;
            })
            .addCase(fetchTasklist.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

    }
})

export default tasklistSlice.reducer;