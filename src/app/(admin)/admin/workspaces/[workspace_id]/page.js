"use client"
import React, { useEffect } from 'react'
import TaskList from '../_components/TaskList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasklist } from '@/redux/slices/tasklistSlice'
import { BeatLoader } from 'react-spinners'
import { usePathname } from 'next/navigation'

const Page = ({ params }) => {

  const pathname = usePathname()
  console.log(pathname);
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.tasklist.isLoading);
  


  


  useEffect(() => {
    
      const fetch = async () => {
      dispatch(fetchTasklist(params.workspace_id));
    }
    fetch();

  }, [dispatch,params.workspace_id])
  return (
    <>
      {/* <TaskList workspace_id={params.workspace_id} /> */}
      {
        isLoading ? (
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
