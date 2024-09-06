import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    workspaces: null,
    error: false,
    isCreateWorkspaceLoading: false,
    deleteWorkspaceLoading: false,
    editWorkspaceLoading: false,
    loading: false,
}

export const editWorkspace = createAsyncThunk(
    'editworkspace',
    async ({updateName,workspace_id}) => {
        
        try {
            const res = await axios.put('/api/teams/workspace/editWorkspace', {updateName,workspace_id});
            return res.data.data;

        } catch (error) {
            console.log(error);

        }
    }
)

export const fetchWorkspaces = createAsyncThunk(
    "fetchWorksapcesforadmin",
    async () => {
        try {
            const allWorkspaces = await axios.get('/api/teams/workspace/getWorkspaces'); 
            const workspaces = await allWorkspaces;
            localStorage.setItem("workspaces", JSON.stringify(allWorkspaces))
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
            
            return res.data.data;
        } catch (error) {
            console.log(error);

        }

    }
)

export const deleteWorkspace = createAsyncThunk(
    'deleteworkspace',
    async (workspace_id, { rejectWithValue }) => {

        try {
           
            const res = await axios.put("/api/teams/workspace/deleteWorkspace", { workspace_id });
            
            return res.data.data;

        } catch (error) {
            console.log(error);
            return rejectWithValue(res.data.message);

        }
    }
)

const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(editWorkspace.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(editWorkspace.fulfilled, (state, action) => {
                state.workspaces = state.workspaces.map((data) => {
                    if (data._id == action.payload._id) {
                        return action.payload;
                    }else{
                        return data;
                    }
                })
                state.loading = false;
            })
            .addCase(editWorkspace.rejected, (state) => {
                state.loading = false;
            })
            .addCase(deleteWorkspace.pending, (state) => {
                state.deleteWorkspaceLoading = true

            })
            .addCase(deleteWorkspace.fulfilled, (state, action) => {

                state.deleteWorkspaceLoading = false;
                state.workspaces = state.workspaces.filter((data) => data._id !== action.payload._id);

            })
            .addCase(deleteWorkspace.rejected, (state) => {
                state.deleteWorkspaceLoading = false;

            })
            .addCase(createWorkspace.pending, (state) => {
                state.isCreateWorkspaceLoading = true;

            })
            .addCase(createWorkspace.fulfilled, (state, action) => {
                //check for null condition
                state.workspaces = action.payload;
                state.isCreateWorkspaceLoading = false;
            })
            .addCase(createWorkspace.rejected, (state, action) => {

                state.isCreateWorkspaceLoading = false;
            })
            .addCase(fetchWorkspaces.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWorkspaces.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.workspaces = action.payload;
                // console.log(state.workspaces);
                state.loading = false;
            })
            .addCase(fetchWorkspaces.rejected, (state, action) => {

                state.error = true;
                state.loading = false;
            })

    }
})



export default workspaceSlice.reducer