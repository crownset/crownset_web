import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleActionsProject, handleAsyncActions } from "@/helpers/admin/reduxState";

export const fetchProjects = createAsyncThunk(
    'project/fetchData',
    async () => {
        const response = await axios.get('/api/projects/getProject');
        console.log("projectResponse====>", response)
        return response.data;
    });

export const deleteProject = createAsyncThunk(
    "project/deleteData",
    async (queryId, { rejectWithValue }) => {
        try {
            const deleteResponse = await axios.put(`/api/projects/deleteProject/${queryId}`);
            console.log("deleteProjectResponse===>", deleteResponse)
            return deleteResponse.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

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
    }
})

export default projectSlice.reducer