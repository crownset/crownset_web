// utils/reduxHelpers.js
export const handleAsyncActions = (builder, action, initialState = {}) => {
    builder
        .addCase(action.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(action.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(action.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
};
