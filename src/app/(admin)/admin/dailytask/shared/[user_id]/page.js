"use client"

import UpdateSharedTask from '@/components/admin/UpdateSharedTask';
import { CustomLoader } from '@/components/CustomLoader';
import { getSharedTask } from '@/redux/slices/sharedTaskSlice';
import { openEditDailyTask, openSharedTaskModal } from '@/redux/slices/uiSlice';
import moment from 'moment';
import React, { useEffect } from 'react'
import { LuFileEdit } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';

const Page = ({ params }) => {
    const { user_id } = params;
    const { shared, sharedLoading } = useSelector((state) => state.shared);
    const { isOpenSharedEditTask, selectedSharedTaskId } = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            try {
                await dispatch(getSharedTask({ user_id }));
            } catch (error) {
                toast.error("Error in fetching task list");
            }
        };
        fetch();
    }, [dispatch, user_id]);

    // const getRemarkColor = (review) => {
    //     return review ? 'bg-green-500' : 'bg-red-500';
    // };

    const getStatus = (estimatedDate, actualDate) => {
        const isSameDate = moment(estimatedDate).isSame(actualDate, 'day');
        const isDelayed = moment(actualDate).isAfter(estimatedDate);
        if (isSameDate) {
            return 'On Time';
        } else if (isDelayed) {
            return 'Delay';
        }
        return '';
    };

    const getStatusClass = (status) => {
        if (status === 'On Time') {
            return 'bg-green-500 text-white';
        } else if (status === 'Delay') {
            return 'bg-red-500 text-white';
        }
        return '';
    };

    return (
        <>
            <div className="p-4 h-[85vh] flex flex-col mt-3">
                {sharedLoading ? (
                    <CustomLoader loading={sharedLoading} color={"#0146cf"} size={15} />
                ) : (
                    <div className="flex-1 overflow-y-auto rounded-3xl shadow-xl scrollbar-hide">
                        {shared?.tasks?.length > 0 ? (
                            <table className="min-w-full bg-white text-sm">
                                <thead className='sticky top-0 z-20'>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 border-b min-w-[100px]">Task</th>
                                        <th className="py-2 border-b min-w-[100px]">Estimated Date</th>
                                        <th className="py-2 border-b min-w-[100px]">Actual Date</th>
                                        <th className="py-2 border-b min-w-[100px]">Shared</th>
                                        {/* <th className="py-2 border-b min-w-[100px]">Review</th> */}
                                        {/* <th>Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {shared.tasks.map((item) => (
                                        <tr key={item.id} className='even:bg-dashboardUserBg odd:bg-default'>
                                            <td className="py-2 border-b text-[12px] text-center">{item?.taskmessage}</td>
                                            <td className="py-2 border-b text-[12px] text-center">{moment(item?.estimated_date).format('LL')}</td>
                                            <td className="py-2 border-b text-[12px] text-center">{moment(item?.actual_date).format('LL')}</td>
                                            <td className="py-2 border-b text-[12px] text-center">
                                                <span className={`py-1 px-2 text-black rounded-3xl ${getStatusClass(getStatus(item?.estimated_date, item?.actual_date))}`}>
                                                    {getStatus(item?.estimated_date, item?.actual_date)}
                                                </span>
                                            </td>
                                            {/* <td className="py-2 border-b text-center">
                                                <button
                                                    className="text-[#3577f1] border border-[#3577f1] p-1 rounded-md hover:bg-[#3577f1] hover:text-white"
                                                    onClick={() => dispatch(openSharedTaskModal(item))}
                                                >
                                                    <LuFileEdit className='h-4 w-4' />
                                                </button>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-gray-600 text-lg">No shared tasks available</p>
                            </div>
                        )}
                    </div>
                )}
                {isOpenSharedEditTask && (
                    <UpdateSharedTask
                        isOpenEditShared={isOpenSharedEditTask}
                        onCloseEditShared={() => dispatch(openSharedTaskModal(false))}
                        taskData={selectedSharedTaskId}
                    />
                )}
            </div>
        </>
    );
};

export default Page;
