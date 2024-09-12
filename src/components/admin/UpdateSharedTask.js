"use client"
import { editDailyTask, fetchTaskData } from '@/redux/slices/dailytaskSlice';
import { openEditDailyTask, openSharedTaskModal } from '@/redux/slices/uiSlice';
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomLoader } from '../CustomLoader';
import { getSharedTask } from '@/redux/slices/sharedTaskSlice';

const UpdateSharedTask = ({ isOpenEditShared, onCloseEditShared, taskData }) => {
    const [sharedFormValues, setSharedFormValues] = useState({
        review: "",
        task_id: ""
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (taskData) {
            setSharedFormValues({
                task_id: taskData._id || '',
                review: taskData.review || '',
            });
        }
    }, [taskData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSharedFormValues({
            ...sharedFormValues,
            [name]: name === 'review' ? value === 'true' : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (sharedFormValues.review === taskData.review) {
                toast.info("No changes detected");
                dispatch(openEditDailyTask(false));
            } else {
                const shareTaskEditRes = await dispatch(editDailyTask({ task_id: sharedFormValues.task_id, updatedData: sharedFormValues })).unwrap();
                await dispatch(getSharedTask());
                console.log("taskEditRes", shareTaskEditRes);
                dispatch(openSharedTaskModal(false));
                toast.success(shareTaskEditRes?.message);
            }
        } catch (error) {
            toast.error("Error updating task");
        }
    };

    if (!isOpenEditShared) return null;

    return (
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
                            onClick={onCloseEditShared}
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
                                <label htmlFor="review" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Follow Up
                                </label>
                                <select
                                    id="review"
                                    name="review"
                                    value={String(sharedFormValues?.review)}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full justify-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateSharedTask