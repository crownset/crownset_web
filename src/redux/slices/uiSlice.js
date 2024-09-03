// src/redux/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalOpen: false,
    isSuccessModalOpen: false,
    isAddLeadModal: false,
    //project
    isAddProjectDetails: false,
    isEditProjectDetails: false,
    isEditProjectID: null,
    isDeleteProjectID: null,
    isDeleteProject: false,
    //leave states
    isAddLeaveModal: false,
    isDeleteLeaveModal: false,
    isDeleteLeaveID: null,
    isDeleteSuccessModal:false,
    isEditLeaveModal:false,
    isEditLeaveId:null,    
    // old
    isEditLeadModalOpen: false,
    isAddModalOpen: false,
    isAddSuccessModal: false,
    isEditSuccessfull: false,
    isQueryModalOpen: false,

    selectedQueryId: null,
    selectedQueryData: null,
    isAutoSuccess: false,
    fullQuery: "",
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        //leads page state
        openDeleteLeadModal: (state, action) => {
            state.isModalOpen = action.payload;
            state.selectedQueryId = action.payload;
        },
        openSuccessModal: (state, action) => {
            state.isSuccessModalOpen = action.payload;
        },
        openEditLeadModal: (state, action) => {
            state.isEditLeadModalOpen = action.payload;
            state.selectedQueryData = action.payload;
        },
        openAddLeadModal: (state, action) => {
            state.isAddLeadModal = action.payload;
        },
        //project page state
        openAddPojectDetails: (state, action) => {
            state.isAddProjectDetails = action.payload
        },
        openEditProjectModal: (state, action) => {
            state.isEditProjectDetails = action.payload
            state.isEditProjectID = action.payload;
        },
        openDeleteProjects: (state, action) => {
            state.isDeleteProject = action.payload
            state.isDeleteProjectID = action.payload
        },
        //Leave Management state
        openAddLeaveModal: (state, action) => {
            state.isAddLeaveModal = action.payload
        },
        openDeleteLeaveModal: (state, action) => {
            state.isDeleteLeaveModal = action.payload
            state.isDeleteLeaveID = action.payload
        },
        openEditLeaveModal: (state, action) => {
            state.isEditLeaveModal = action.payload
            state.isEditLeaveId = action.payload
        },
        openDeleteSuccessModal : (state, action) => {
            state.isDeleteSuccessModal = action.payload
        },
        // old
        openAddModal: (state) => {
            state.isAddModalOpen = true;
        },
        closeAddModal: (state) => {
            state.isAddModalOpen = false;
        },
        openQueryModal: (state, action) => {
            state.isQueryModalOpen = true;
            state.fullQuery = action.payload;
        },
        closeQueryModal: (state) => {
            state.isQueryModalOpen = false;
            state.fullQuery = "";
        },
        closeSuccessModal: (state) => {
            state.isSuccessModalOpen = false;
        },
        openAddSuccessModal: (state) => {
            state.isAddSuccessModal = true;
        },
        closeAddSuccessModal: (state) => {
            state.isAddSuccessModal = false;
        },
        openEditSuccessModal: (state) => {
            state.isEditSuccessfull = true
        },
        closeEditSuccessModal: (state) => {
            state.isEditSuccessfull = false
        },
        openAutoSuccess: (state) => {
            state.isAutoSuccess = true
        },
        closeAutoSuccess: (state) => {
            state.isAutoSuccess = false
        }
    },
});

export const {
    openDeleteLeadModal,
    openEditLeadModal,
    openAddLeadModal,
    // project
    openAddPojectDetails,
    openEditProjectModal,
    openDeleteProjects,
    //leave
    openAddLeaveModal,
    openDeleteLeaveModal,
    openEditLeaveModal,
    openDeleteSuccessModal,
    //old
    openModal,
    closeModal,
    openEditModal,
    closeEditModal,
    openAddModal,
    closeAddModal,
    openQueryModal,
    closeQueryModal,
    openSuccessModal,
    closeSuccessModal,
    openAddSuccessModal,
    closeAddSuccessModal,
    openEditSuccessModal,
    closeEditSuccessModal,
    openAutoSuccess,
    closeAutoSuccess

} = uiSlice.actions;

export default uiSlice.reducer;
