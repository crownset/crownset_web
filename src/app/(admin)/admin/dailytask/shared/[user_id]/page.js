"use client"
import { CustomLoader } from '@/components/CustomLoader';
import { getSharedTask } from '@/redux/slices/sharedTaskSlice';
import { openEditDailyTask } from '@/redux/slices/uiSlice';
import moment from 'moment';
import React, { useEffect } from 'react'
import { LuFileEdit } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';

const page = ({ params }) => {
    const  {user_id}  = params;
    const { shared, sharedLoading, error } = useSelector((state) => state.shared);
    const dispatch = useDispatch()
    console.log("shared>>>>>", shared)


    // useEffect(() =>  {
        
    // }, [dispatch]);

    useEffect(() => {

        const fetch = async () => {
    
          try {
            const res = await dispatch(getSharedTask({user_id}));
            
          } catch (error) {
            return toast.error("Error in fetching tasklist")
    
          }
    
        }
        fetch();
    
      }, [dispatch,user_id])

    const getRemarkColor = (review) => {
        return review ? 'bg-mature' : 'bg-dead';
    };

    return (
        <>
            <div className="p-4 h-[85vh] flex flex-col">
                {
                    sharedLoading ? (
                        <CustomLoader loading={sharedLoading} color={"#0146cf"} size={15} />
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto rounded-3xl shadow-xl scrollbar-hide ">
                                <table className="min-w-full bg-white text-sm ">
                                    <thead className='sticky top-0 z-20'>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 border-b min-w-[100px]">Task</th>
                                            <th className="py-2 border-b min-w-[100px]">Estimated Date</th>
                                            <th className="py-2 border-b min-w-[100px]">Actual Date</th>
                                            <th className="py-2 border-b min-w-[100px]">Review</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shared?.tasks?.map((item, index) => (
                                            <tr key={item.id} defaultValue={index} className='even:bg-dashboardUserBg odd:bg-default'>
                                                <td className="py-2 border-b text-[12px] text-center">{item?.taskmessage}</td>
                                                <td className="py-2 border-b text-[12px] text-center">{moment(item?.estimated_date).format('LL')}</td>
                                                <td className="py-2 border-b text-[12px] text-center">{moment(item?.actual_date).format('LL')}</td>
                                                <td className="py-2 border-b text-[12px] text-center">
                                                    <span className={`py-1 px-2 text-default rounded-3xl ${getRemarkColor(item.remarks)}`}>
                                                        {item?.review === false ? "No" : "Yes"}
                                                    </span>
                                                </td>
                                                <td className="py-2 border-b text-center">
                                                    <div className='flex gap-3 justify-center items-center -z-10'>
                                                        <button className="text-[#3577f1] border border-[#3577f1] p-1 rounded-md hover:bg-[#3577f1] hover:text-white hover:border-[#FFFFFF] translate-x-1" onClick={() => dispatch(openEditDailyTask(item))}>
                                                            <LuFileEdit className='h-4 w-4' />
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
                {/* <AddDailyTask openDailyTask={isAddTaskOpen} />
                <UpdateDailyTask isOpenEditTask={isopenEditTaskModal} onClose={() => dispatch(openEditDailyTask(false))} taskData={selectedDailyTaskId} />
                <ShareDailyTask isOpenShareTask={isOpenShareTask} onClose={() => dispatch(openShareTaskModal(false))} taskData={selectedShareTaskId} /> */}
            </div>
        </>
    )
}

export default page
