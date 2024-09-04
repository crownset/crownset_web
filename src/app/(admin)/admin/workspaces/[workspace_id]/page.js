"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'

import TaskList from '../_components/TaskList'
import { fetchTasklist } from '@/redux/slices/tasklistSlice'


const Page = ({ params }) => {


  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.tasklist.isLoading);

  useEffect(() => {

    const fetch = async () => {
      await dispatch(fetchTasklist(params.workspace_id));
    }
    fetch();

  }, [dispatch, params.workspace_id])
  return (
    <>

      {isLoading ? (
        <>
          <div className="flex justify-center items-center w-full h-screen">
            <BeatLoader />
          </div>
        </>
      ) : (
        <TaskList workspace_id={params.workspace_id} />
      )
      }


    </>

  )
}

export default Page
