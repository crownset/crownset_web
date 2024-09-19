import { editDailyTask, fetchTaskData, shareDailyTask } from '@/redux/slices/dailytaskSlice';
import { openEditDailyTask, openShareTaskModal } from '@/redux/slices/uiSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomLoader } from '../CustomLoader';
import Select from 'react-dropdown-select';
import { assignUsers } from '@/redux/slices/userSlice';

const ShareDailyTask = ({ isOpenShareTask, taskData, onClose }) => {
    const dispatch = useDispatch();
    const { taskShareLoading } = useSelector((state) => state.daily);
    const { user, loading } = useSelector((state) => state.user);
    console.log("users>>>>222", user)
    const [formValues, setFormValues] = useState({
        share_with: [],
        task_id: ""
    });

    useEffect(() => {
        if (taskData) {
            setFormValues({
                task_id: taskData._id || '',
                share_with: taskData.share_with || [],
            });
        }
    }, [taskData]);

    useEffect(() => {
        dispatch(assignUsers());
    }, [dispatch]);

    const handleSelectChange = (selectedUsers) => {
        setFormValues((prevState) => ({
            ...prevState,
            share_with: selectedUsers
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userIds = formValues.share_with.map(user => user.value);
            const taskShareRes = await dispatch(shareDailyTask({ task_id: formValues.task_id, share_with_id: userIds })).unwrap();
            dispatch(fetchTaskData());
            dispatch(openShareTaskModal(false));
            toast.success(taskShareRes?.message);
        } catch (error) {
            toast.error("Failed to share task");
        }
    };

    if (!isOpenShareTask) return null;

    const filteredUsers = user?.filter((item) => item.accessId === 1);

    return (
        <div>
            <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Share Task
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => dispatch(openShareTaskModal(false))}
                            >
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4">
                                <div className="min-w-full">
                                    <label htmlFor="share_with" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                        Share with
                                    </label>
                                    <Select
                                        id="share_with"
                                        name="share_with"
                                        options={filteredUsers?.map((item) => ({ value: item._id, label: item.firstName }))} 
                                        values={formValues?.share_with}
                                        onChange={handleSelectChange} 
                                        // multi
                                        placeholder="Select users"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full justify-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                {taskShareLoading ? (
                                    <CustomLoader loading={taskShareLoading} color={"#FFFFFF"} size={10} />
                                ) : "Share"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareDailyTask;
