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

export const handleCases = (builder, asyncThunk, statusKey) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state[statusKey] = 'loading';
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {
            state[statusKey] = 'succeeded';
            if (statusKey === 'status') state.user = action.payload;
        })
        .addCase(asyncThunk.rejected, (state, action) => {
            state[statusKey] = 'failed';
            state.error = action.payload;
        });
};