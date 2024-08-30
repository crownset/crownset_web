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
            console.log(data)
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
    async ({ user_id, tasklist_id }, { rejectWithValue }) => {
        // console.log(tasklist_id)
        try {
            const res = await axios.put(`/api/teams/tasklist/share/${user_id}`, { tasklist_id });
            return res.data.data;

        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteTasklist = createAsyncThunk(
    'deleteTaskList',
    async (tasklist_id) => {
        try {
            // console.log(tasklist_id);
            const res = await axios.put(`/api/teams/tasklist/delete/${tasklist_id}`);
            // fetchTasklist();
            return res.data.data;
        } catch (error) {
            console.log(error);

        }
    }
)




export const createTodo = createAsyncThunk(
    'createtodo',
    async ({ list_id, data }, { rejectWithValue }) => {
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
    isDeleteTasklist: false,
    isError: false
}

const tasklistSlice = createSlice({
    name: "tasklist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(deleteTasklist.pending, (state) => {
                state.isDeleteTasklist = true;
            })
            .addCase(deleteTasklist.fulfilled, (state, action) => {
                state.isDeleteTasklist = false;
            })
            .addCase(deleteTasklist.rejected, (state) => {
                state.isDeleteTasklist = false;
            })
            .addCase(createTodo.pending, (state) => {
                state.isCreatingTodo = true;
            })
            .addCase(createTodo.fulfilled, (state, action) => {

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