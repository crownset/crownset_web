"use client"
import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./redux/slices/authSlice"
import projectSlice from "./redux/slices/projectSlice"
import querySlice from "./redux/slices/querySlice"
import userSlice from "./redux/slices/userSlice"
import workspaceSlice from "./redux/slices/workspaceSlice"
import tasklistSlice from "./redux/slices/tasklistSlice"

import miscSlice from "./redux/slices/misc"

const store = configureStore({
    reducer: {
        auth: authSlice,
        data: querySlice,
        user: userSlice,
        project: projectSlice,
        workspace:workspaceSlice,
        tasklist:tasklistSlice,
        misc:miscSlice,
    }
})

export default store