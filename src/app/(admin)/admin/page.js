"use client"
import Queries from '@/components/admin/Queries'
import store from '@/store'
import React from 'react'
import { Provider } from 'react-redux'

const page = () => {
    return (
        <Provider store={store}>
      <Queries />
    </Provider>

    )
}

export default page
