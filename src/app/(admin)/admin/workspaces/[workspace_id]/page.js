"use client"
import React, { useEffect } from 'react'
import TaskList from '../_components/TaskList'
import { useDispatch } from 'react-redux'
import { fetchTasklist } from '@/redux/slices/tasklistSlice'

const Page = ({params}) => {

  const dispatch = useDispatch();

  useEffect(()=>{

    const fetch = async()=>{
       dispatch(fetchTasklist(params.workspace_id));
    }
    fetch();

  },[dispatch,params.workspace_id])
  return (
    <>
    <TaskList workspace_id={params.workspace_id}/>
    
    </>
    
  )
}

export default Page
