import { handleAsyncActions } from '@/helpers/admin/reduxState';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async () => {
        const response = await axios.get('/api/teams/getQuery');
        // console.log(response.data);
        return response.data;
    }
);

export const postQuery = createAsyncThunk(
    'data/postData',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/teams/addLeads', credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteQuery = createAsyncThunk(
    'data/deleteData',
    async (queryId, { rejectWithValue }) => {
        try {
            const deleteResponse = await axios.put(`/api/teams/deleteQuery/${queryId}`);
            return deleteResponse.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editQuery = createAsyncThunk(
    'data/editData',
    async ({ queryId, updatedData }, { rejectWithValue }) => {
        try {
            const editResponse = await axios.put(`/api/teams/updateQuery/${queryId}`, updatedData);
            return editResponse.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    data: {},
    fetching: false,
    posting: false,
    deleting: false,
    updating: false,
    error: null,
};

const querySlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleAsyncActions(builder, fetchData, 'fetching');
        handleAsyncActions(builder, postQuery, 'posting');
        handleAsyncActions(builder, deleteQuery, 'deleting', (state, action) => {
            state.data.query = state.data.query.filter(item => item.id !== action.meta.arg);
        });
        handleAsyncActions(builder, editQuery, 'updating', (state, action) => {
            const index = state.data.findIndex(item => item.id === action.meta.arg);
            if (index !== -1) {
                state.data.query[index] = { ...state.data.query[index], ...action.payload };
            }
        });
    },
});

export default querySlice.reducer;