export const handleAsyncActions = (builder, action, loadingKey, customCases) => {
    builder
        .addCase(action.pending, (state) => {
            state[loadingKey] = true;
            state.error = null;
        })
        .addCase(action.fulfilled, (state, action) => {
            if (!customCases) {
                state.data = action.payload;
            }
            state[loadingKey] = false;
        })
        .addCase(action.rejected, (state, action) => {
            state.error = action.error.message;
            state[loadingKey] = false;
        });
};

export const handleActionsProject = (builder, action, initialState = {}) => {
    builder
        .addCase(action.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(action.fulfilled, (state, action) => {
            state.project = action.payload;
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

export const handleLeaveActions = (builder, action, initialState = {}) => {
    builder
        .addCase(action.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(action.fulfilled, (state, action) => {
            state.leave = action.payload;
            state.loading = false;
        })
        .addCase(action.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
};

export const handleDailyTaskAsyncActions = (builder, action, loadingKey, customCases) => {
    builder
        .addCase(action.pending, (state) => {
            state[loadingKey] = true;
            state.error = null;
        })
        .addCase(action.fulfilled, (state, action) => {
            if (!customCases) {
                state.daily = action.payload;
            }
            state[loadingKey] = false;
        })
        .addCase(action.rejected, (state, action) => {
            state.error = action.error.message;
            state[loadingKey] = false;
        });
};

export const handleSharedAsyncActions = (builder, action, loadingKey, customCases) => {
    builder
        .addCase(action.pending, (state) => {
            state[loadingKey] = true;
            state.error = null;
        })
        .addCase(action.fulfilled, (state, action) => {
            if (!customCases) {
                state.shared = action.payload;
            }
            state[loadingKey] = false;
        })
        .addCase(action.rejected, (state, action) => {
            state.error = action.error.message;
            state[loadingKey] = false;
        });

};

export const handleAttendanceActions = (builder, action, initialState = {}) => {
    builder
        .addCase(action.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(action.fulfilled, (state, action) => {
            state.attendance = action.payload;
            state.loading = false;
        })
        .addCase(action.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        }) }