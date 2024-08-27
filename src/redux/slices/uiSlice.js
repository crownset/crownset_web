// src/redux/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalOpen: false,
    isEditModalOpen: false,
    isAddModalOpen: false,
    isAddSuccessModal:false,
    isEditSuccessfull:false,
    isQueryModalOpen: false,
    isSuccessModalOpen: false,
    selectedQueryId: null,
    selectedQueryData: null,
    fullQuery: "",
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.selectedQueryId = action.payload;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.selectedQueryId = null;
        },
        openEditModal: (state, action) => {
            state.isEditModalOpen = true;
            state.selectedQueryData = action.payload;
        },
        closeEditModal: (state) => {
            state.isEditModalOpen = false;
            state.selectedQueryData = null;
        },
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
        openSuccessModal: (state) => {
            state.isSuccessModalOpen = true;
        },
        closeSuccessModal: (state) => {
            state.isSuccessModalOpen = false;
        },
        openAddSuccessModal:(state)=> {
            state.isAddSuccessModal = true;
        },
        closeAddSuccessModal:(state)=> {
            state.isAddSuccessModal = false;
        },
        openEditSuccessModal:(state)=>{
            state.isEditSuccessfull = true
        },
        closeEditSuccessModal:(state)=>{
            state.isEditSuccessfull = false
        }
    },
});

export const {
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
    closeEditSuccessModal
} = uiSlice.actions;

export default uiSlice.reducer;
