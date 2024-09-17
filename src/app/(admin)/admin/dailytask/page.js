"use client"
import { fetchTaskData } from '@/redux/slices/dailytaskSlice';
import React, { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa';
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { LuFileEdit } from 'react-icons/lu';
import { CustomLoader } from '@/components/CustomLoader';
import AddDailyTask from '@/components/admin/AddDailyTask';
import { openDailyTaskModal, openEditDailyTask, openShareTaskModal } from '@/redux/slices/uiSlice';
import { UpdateDailyTask } from '@/components/admin/UpdateDailyTask';
import ShareDailyTask from '@/components/admin/ShareDailyTask';

const Page = () => {
    const { daily, fetchingTaskLoading, error } = useSelector((state) => state.daily);
    const { isAddTaskOpen, isopenEditTaskModal, selectedDailyTaskId, isOpenShareTask, selectedShareTaskId } = useSelector((state) => state.ui)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTaskData());
    }, [dispatch]);

    const getRemarkColor = (review) => {
        return review ? 'bg-green-500' : 'bg-red-500';
    };


    return (
        <>
            <div className="p-4 h-[85vh] flex flex-col">
                {
                    fetchingTaskLoading ? (
                        <CustomLoader loading={fetchingTaskLoading} color={"#0146cf"} size={15} />
                    ) : (
                        <>
                            <div className='flex justify-end w-[98%] m-auto'>
                                <button className='bg-dashboard flex items-center gap-1 text-default text-sm text-center py-2 px-5 rounded-3xl my-3 text-[12px]' onClick={() => dispatch(openDailyTaskModal(true))}>
                                    <span><FaPlus /></span>
                                    <span>Task</span>
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto rounded-3xl shadow-xl scrollbar-hide ">
                                <table className="min-w-full bg-white text-sm ">
                                    <thead className='sticky top-0 z-20'>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 border-b min-w-[100px]">Task</th>
                                            <th className="py-2 border-b min-w-[100px]">Estimated Date</th>
                                            <th className="py-2 border-b min-w-[100px]">Actual Date</th>
                                            <th className="py-2 border-b min-w-[100px]">Shared</th>
                                            <th className="py-2 border-b min-w-[100px]">Review</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {daily?.tasks?.map((item, index) => (
                                            <tr key={item.id} defaultValue={index} className='even:bg-dashboardUserBg odd:bg-default'>
                                                <td className="py-2 border-b text-[12px] text-center">{item?.taskmessage}</td>
                                                <td className="py-2 border-b text-[12px] text-center">{moment(item?.estimated_date).format('LL')}</td>
                                                <td className="py-2 border-b text-[12px] text-center">{moment(item?.actual_date).format('LL')}</td>
                                                <td className="py-2 border-b text-[12px] text-center">
                                                    {item?.share_with?.map(person => person.firstName).join(",")}
                                                </td>
                                                <td className="py-2 border-b text-[12px] text-center">
                                                    <span className={`py-1 px-2 text-default rounded-3xl ${getRemarkColor(item?.review)}`}>
                                                        {item?.review ? "Yes" : "No"}
                                                    </span>
                                                </td>

                                                <td className="py-2 border-b text-center">
                                                    <div className='flex gap-3 justify-center items-center -z-10'>
                                                        <button className="text-[#3577f1] border border-[#3577f1] p-1 rounded-md hover:bg-[#3577f1] hover:text-white hover:border-[#FFFFFF] translate-x-1" onClick={() => dispatch(openEditDailyTask(item))}>
                                                            <LuFileEdit className='h-4 w-4' />
                                                        </button>
                                                        <button className="text-mature border border-mature p-1 rounded-md hover:bg-mature hover:text-white hover:border-[#FFFFFF] translate-x-1" onClick={() => dispatch(openShareTaskModal(item))}>
                                                            <FaShareSquare className='h-4 w-4' />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                }
                <AddDailyTask openDailyTask={isAddTaskOpen} />
                <UpdateDailyTask isOpenEditTask={isopenEditTaskModal} onClose={() => dispatch(openEditDailyTask(false))} taskData={selectedDailyTaskId} />
                <ShareDailyTask isOpenShareTask={isOpenShareTask} onClose={() => dispatch(openShareTaskModal(false))} taskData={selectedShareTaskId} />
            </div>
        </>

    )
}

export default Page