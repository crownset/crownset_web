"use client"
import Queries from '@/components/admin/Queries'
import store from '@/store'
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'

const page = () => {
  return (
    <Suspense>
      <Provider store={store}>
        <Queries />
      </Provider>
    </Suspense>


  )
}

export default page
