import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    workspaces: null,
    error: false,
    loading: false
}

export const fetchWorkspaces = createAsyncThunk(
    "fetchWorksapcesforadmin",
    async () => {
        try {
            const allWorkspaces = await axios.get('/api/teams/workspace/getWorkspaces');
            return allWorkspaces.data.data
        } catch (error) {
            console.log(error);

        }
    })

export const createWorkspace = createAsyncThunk(
    'craeteWorkspace',
    async (data) => {

        try {
            const res = await axios.post('/api/teams/workspace', data);
        } catch (error) {
            console.log(error);

        }

    }
)

const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createWorkspace.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createWorkspace.fulfilled, (state, action) => {

                state.loading = false;
            })
            .addCase(createWorkspace.rejected, (state, action) => {
               
                state.loading = false;
            })
            .addCase(fetchWorkspaces.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWorkspaces.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.workspaces = action.payload;
                state.loading = false;
            })
            .addCase(fetchWorkspaces.rejected, (state, action) => {

                state.error = true;
                state.loading = false;
            })

    }
})



export default workspaceSlice.reducer