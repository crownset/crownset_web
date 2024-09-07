"use client"
import { fetchTaskData } from '@/redux/slices/dailytaskSlice';
import React, { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { LuFileEdit } from 'react-icons/lu';
import { CustomLoader } from '@/components/CustomLoader';

const page = () => {
    const { daily, fetchingTaskLoading, error } = useSelector((state) => state.daily);
    console.log("daily>>", daily?.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTaskData());
    }, [dispatch]);

    const getRemarkColor = (review) => {
        return review ? 'bg-premature' : 'bg-dashboard';
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
                                <button className='bg-dashboard flex items-center gap-1 text-default text-sm text-center py-2 px-5 rounded-3xl my-3 text-[12px]'>
                                    <span><FaPlus /></span>
                                    <span>Task</span>
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto rounded-3xl shadow-xl scrollbar-hide ">
                                <table className="min-w-full bg-white text-sm ">
                                    <thead className='sticky top-0 z-20'>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 border-b min-w-[100px]">Created at</th>
                                            <th className="py-2 border-b min-w-[100px]">Task</th>
                                            <th className="py-2 border-b min-w-[100px]">Estimated Date</th>
                                            <th className="py-2 border-b min-w-[100px]">Actual Date</th>
                                            <th className="py-2 border-b min-w-[100px]">Review</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {daily?.tasks?.map((item, index) => (
                                            <tr key={item.id} defaultValue={index} className='even:bg-dashboardUserBg odd:bg-default'>
                                                <td className="py-2 border-b text-[12px] text-center">{moment(item?.createdAt).format('LL')}</td>
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
                                                        <button className="text-[#3577f1] border border-[#3577f1] p-1 rounded-md hover:bg-[#3577f1] hover:text-white hover:border-[#FFFFFF] translate-x-1">
                                                            <LuFileEdit className='h-4 w-4' />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* <UpdateProjectData isOpen={isEditModalOpen} onClose={closeEditModal} queryData={selectedQueryData} />
    <AddProjectDetails openProject={isAddModalOpen} onCloseProject={closeAddModal} />
    <CustomAlert
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Are you sure?"
      description="Are you sure you want to delete this Project?"
      confirmButtonText="Yes, I'm sure"
      cancelButtonText="No, cancel"
      onConfirm={handleConfirm}
    /> */}
                            </div>
                        </>
                    )
                }
            </div>


        </>

    )
}

export default page