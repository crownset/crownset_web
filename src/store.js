"use client"
import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./redux/slices/authSlice"
import querySlice from "./redux/slices/querySlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        data:querySlice
    }
})

export default store