import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleActionsProject, handleAsyncActions } from "@/helpers/admin/reduxState";

export const fetchProjects = createAsyncThunk(
    'project/fetchData',
    async () => {
        const response = await axios.get('/api/projects/getProject');
        console.log("projectResponse==>", response)
        return response.data;
    });

export const deleteProject = createAsyncThunk(
    "project/deleteData",
    async (queryId, { rejectWithValue }) => {
        try {
            const deleteResponse = await axios.put(`/api/projects/deleteProject/${queryId}`);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const editProject = createAsyncThunk(
    "project/editData",
    async ({ queryId, updatedData }, { rejectWithValue }) => {
        try {
            const editResponse = await axios.put(`/api/projects/updateProject/${queryId}`, updatedData)
            return editResponse.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const addProject = createAsyncThunk('project/addProject', async (projectData) => {
    const response = await axios.post('/api/projects/addProject', projectData);
    return response.data;
});

const initialState = {
    project: [],
    loading: false,
    error: null,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleActionsProject(builder, fetchProjects, initialState)
        handleActionsProject(builder, deleteProject, initialState, (state, action) => {
            state.project = state.project.filter(item => item.id !== action.meta.arg);
        });
        handleActionsProject(builder, editProject, initialState, (state, action) => {
            const index = state.project.findIndex(item => item.id === action.meta.arg);
            if (index !== -1) {
                state.project[index] = { ...state.project[index], ...action.payload };
            }
        });
    }
})

export default projectSlice.reducer