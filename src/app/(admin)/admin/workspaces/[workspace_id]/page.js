"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'

import TaskList from '../_components/TaskList'
import { fetchTasklist } from '@/redux/slices/tasklistSlice'
import { toast } from 'react-toastify'


const Page = ({ params }) => {


  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.tasklist.isLoading);
  
  const [workspaces,setWorkspaces] = useState(null);
  const [name,setName] = useState(null);
  
  useEffect(() => {
    const storedWorkspaces = localStorage.getItem('workspaces');
    if (storedWorkspaces) {
      const parsedWorkspaces = JSON.parse(storedWorkspaces);
      setWorkspaces(parsedWorkspaces);

     
      const workspace = parsedWorkspaces?.data?.data?.filter(work => work?._id === params.workspace_id);
      if (workspace && workspace.length > 0) {
        setName(workspace[0]?.name);
      }
    }
  }, [params.workspace_id]);

  useEffect(() => {

    const fetch = async () => {

      try {
        const res = await dispatch(fetchTasklist(params.workspace_id));
        
      } catch (error) {
        return toast.error("Error in fetching tasklist")

      }

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
        <div className='mt-10 ml-5'>
          
            {name&& (<h1 className='text-center sticky text-[2rem] font-semibold text-gray-700'>{name}</h1>)}
      
          
          <TaskList workspace_id={params.workspace_id} />
        </div>
      )
      }


    </>

  )
}

export default Page