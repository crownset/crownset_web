"use client"
import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./redux/slices/authSlice"
import querySlice from "./redux/slices/querySlice"
import assignUserSlice from "./redux/slices/assignUserSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        data:querySlice,
    }
})

export default store