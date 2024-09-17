import { editDailyTask, fetchTaskData } from '@/redux/slices/dailytaskSlice';
import { openEditDailyTask, openSharedTaskModal } from '@/redux/slices/uiSlice';
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomLoader } from '../CustomLoader';
import { getSharedTask } from '@/redux/slices/sharedTaskSlice';

export const UpdateDailyTask = ({ isOpenEditTask, taskData, onClose }) => {
    const dispatch = useDispatch();
    const { updatingTaskLoading } = useSelector((state) => state.daily)
    const [formValues, setFormValues] = useState({
        actual_date: "",
        task_id: ""
    })

    useEffect(() => {
        if (taskData) {
            setFormValues({
                task_id: taskData._id || '',
                actual_date: taskData.actual_date || '',
            });
        }
    }, [taskData]);

    const handleDateChange = (name, date) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formValues.actual_date === taskData.actual_date) {
                toast.info("No changes detected");
                dispatch(openEditDailyTask(false));
            } else {
                const taskEditRes = await dispatch(editDailyTask({ task_id: formValues.task_id, updatedData: formValues })).unwrap();
                console.log("taskEditRes", taskEditRes);
                dispatch(fetchTaskData());
                dispatch(openEditDailyTask(false));
                toast.success(taskEditRes?.message)
            }
        } catch (error) {
            toast.success(taskEditRes?.message)
        }
    };


    if (!isOpenEditTask) return null;

    return (
        <div>
            <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Update Task
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
                                onClick={() => dispatch(openEditDailyTask(false))}
                            >
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4">
                                <div className="min-w-full">
                                    <label htmlFor="actual_date" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                        Actual Date
                                    </label>
                                    <DatePicker
                                        id="actual_date"
                                        selected={formValues?.actual_date}
                                        onChange={(date) => handleDateChange('actual_date', date)}
                                        dateFormat="yyyy/MM/dd"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-[370px] p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />

                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full justify-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleSubmit}
                            >
                                {
                                    updatingTaskLoading ? (
                                        <CustomLoader loading={updatingTaskLoading} color={"#FFFFFF"} size={10} />
                                    ) : "Update"
                                }

                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}


