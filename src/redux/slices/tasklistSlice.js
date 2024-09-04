import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { original } from 'immer'
import axios from "axios";



export const fetchTasklist = createAsyncThunk(
    'fetchtasklist',
    async (workspace_id) => {
        try {
            const tasklistData = await axios.get(`/api/teams/workspace/${workspace_id}`)
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
            // console.log(data)
            const tasklist = await axios.post('/api/teams/tasklist', data);
            return tasklist.data.data;

        } catch (error) {
            console.log(error);
        }

    }
)

export const editList = createAsyncThunk(
    "edittasklist",
    async ({ tasklist_id, data }) => {
        try {

            const res = await axios.put(`/api/teams/tasklist/${tasklist_id}`, data)
            return res.data.data;

        } catch (error) {
            console.log(error);

        }
    }
)

export const shareList = createAsyncThunk(
    'sharelist',
    async ({ user_id, tasklist_id }, { rejectWithValue }) => {
       
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
            
            const res = await axios.put(`/api/teams/tasklist/delete/${tasklist_id}`);
            
            return res.data.data;
        } catch (error) {
            console.log(error);

        }
    }
)

export const showWorkingUser = createAsyncThunk(
    'showWorkingUSer',
    async ({ tasklist_id }) => {
        try {
            const res = await axios.get(`/api/teams/tasklist/assignUsers/${tasklist_id}`);
            return res.data.data
        } catch (error) {

        }
    }
)


//create todo
//mark done todo
//edit todo
//set label

export const createTodo = createAsyncThunk(
    'createtodo',
    async ({ list_id, data }, { rejectWithValue }) => {
        try {

            const res = await axios.post(`/api/teams/task/${list_id}`, data);
            return res.data.data;

        } catch (error) {
            console.log(error);

        }
    }
)

export const markTodoDone = createAsyncThunk(
    'markdonetodo',
    async (data, { rejectWithValue }) => {

        try {
            const res = await axios.put('/api/teams/task/markdone', data);
            return res.data.data;

        } catch (error) {
            console.log(error);
        }
    }
)

export const editTodo = createAsyncThunk(
    'editTodo',
    async ({ todo_id, title }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`/api/teams/task/editTodo/${todo_id}`, { title });
            // console.log(res.data.data);
            return res.data.data;
        } catch (error) {
            console.log(error)

        }
    }
)

export const todoLabel = createAsyncThunk(
    'todoLable',
    async ({ todo_id, selectedLabel }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`/api/teams/task/label/${todo_id}`, { selectedLabel });
            return res.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)


const initialState = {
    tasklist: null,
    workinguser: null,
    isLoading: false,
    isCreatingList: false,
    isDeleteTasklist: false,
    isShareLoading: false,
    isCreatingTodo: false,
    isTodoMarkDone: false,
    isEditTodoLoding: false,
    isTodoLabelLoading: false,
    isShowUerLoading: false,
    isError: false
}

const tasklistSlice = createSlice({
    name: "tasklist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(showWorkingUser.pending, (state) => {
                state.isShowUerLoading = true;
            })
            .addCase(showWorkingUser.fulfilled, (state, action) => {
                
                state.workinguser = action.payload;
                state.isShowUerLoading = false;

            })
            .addCase(showWorkingUser.rejected, (state) => {
                state.isShowUerLoading = false;
                // console.log("error")
            })
            .addCase(shareList.pending, (state) => {
                state.isShareLoading = true;
            })
            .addCase(shareList.fulfilled, (state, action) => {
                state.isShareLoading = false;
            })
            .addCase(shareList.rejected, (state) => {
                state.isShareLoading = false;
            })
            .addCase(todoLabel.pending, (state) => {
                state.isTodoLabelLoading = true;
            })
            .addCase(todoLabel.fulfilled, (state, action) => {
                state.isTodoLabelLoading = false;
            })
            .addCase(todoLabel.rejected, (state) => {
                state.isTodoLabelLoading = false;
            })
            .addCase(editTodo.pending, (state) => {
                state.isEditTodoLoding = true;
            })
            .addCase(editTodo.fulfilled, (state, action) => {
                state.isEditTodoLoding = false;
            })
            .addCase(editTodo.rejected, (state) => {
                state.isEditTodoLoding = false;
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
                state.tasklist = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchTasklist.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

    }
})

export default tasklistSlice.reducer;