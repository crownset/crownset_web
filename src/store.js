"use client"
import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./redux/slices/authSlice"
import projectSlice from "./redux/slices/projectSlice"
import querySlice from "./redux/slices/querySlice"
import userSlice from "./redux/slices/userSlice"
import workspaceSlice from "./redux/slices/workspaceSlice"
import tasklistSlice from "./redux/slices/tasklistSlice"

import miscSlice from "./redux/slices/misc"
import automationSlice from "./redux/slices/automationSlice"
import uiSlice from "./redux/slices/uiSlice"
import leaveSlice from "./redux/slices/leaveSlice"
import multipleLeadSlice from "./redux/slices/multipleLeadSlice"
import dailytaskSlice from "./redux/slices/dailytaskSlice"
import attendanceSlice from "./redux/slices/attendanceSlice"

import sharedTaskSlice from "./redux/slices/sharedTaskSlice"
import QuotationSlice from "./redux/slices/QuotationSlice"
import InvoiceSlice from "./redux/slices/InvoiceSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        data: querySlice,
        user: userSlice,
        project: projectSlice,
        workspace:workspaceSlice,
        tasklist:tasklistSlice,
        misc:miscSlice,
        automation : automationSlice,
        ui: uiSlice,
        leave:leaveSlice,
        queryData:multipleLeadSlice,
        daily:dailytaskSlice,
        attendance:attendanceSlice,
        shared:sharedTaskSlice,
        quotation:QuotationSlice,
        invoice:InvoiceSlice
    }
})

export default store;