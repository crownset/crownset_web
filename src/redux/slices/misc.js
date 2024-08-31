import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTodoEditMenu: false,
    isTodoIndex: null,
    tasklistIndex: null,
    isTodoEditModal: false,
    isTodoLabelsModal: false,
    isShareModal: false,
    isAssginedUserModal: false,
    isEditTaskListModal: false,
    
}

const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        setIsTodoEditMenu: (state, action) => {
            state.isTodoEditMenu = action.payload

        },
        setIsTodoIndex: (state, action) => {
            state.isTodoIndex = action.payload
        },
        setTasklsitIndex: (state, action) => {
            state.tasklistIndex = action.payload;
        },
        setIsTodoEditModal: (state, action) => {
            //    console.log(action.payload);
            state.isTodoEditModal = action.payload;
        },
        setIsTodoLabelsModal: (state, action) => {
            state.isTodoLabelsModal = action.payload;
        },
        setIsShareModal: (state, action) => {
            state.isShareModal = action.payload;
        },
        setIsAssginedUserModal: (state, action) => {
            state.isAssginedUserModal = action.payload;
        },
        setIsEditTaskListModal: (state, action) => {
            state.isEditTaskListModal = action.payload
        },
    }
        

})

export const { setIsTodoEditMenu,
    setIsTodoIndex,
    setTasklsitIndex,
    setIsTodoEditModal,
    setIsTodoLabelsModal,
    setIsShareModal,
    setIsAssginedUserModal,
    setIsEditTaskListModal
} = miscSlice.actions;
export default miscSlice.reducer;