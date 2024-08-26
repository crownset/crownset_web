"use client"
import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./redux/slices/authSlice"
import projectSlice from "./redux/slices/projectSlice"
import querySlice from "./redux/slices/querySlice"
import userSlice from "./redux/slices/userSlice"
import automationSlice from "./redux/slices/automationSlice"
import uiSlice from "./redux/slices/uiSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        data: querySlice,
        user: userSlice,
        project: projectSlice,
        automation : automationSlice,
        ui: uiSlice,
    }
})

export default store