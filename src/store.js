"use client"
import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./redux/slices/authSlice"
import querySlice from "./redux/slices/querySlice"
import userSlice from "./redux/slices/userSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        data: querySlice,
        user: userSlice
    }
})

export default store