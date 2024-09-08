import { fetchTaskData, postTask } from '@/redux/slices/dailytaskSlice';
import { openDailyTaskModal } from '@/redux/slices/uiSlice';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';

const AddDailyTask = ({ openDailyTask }) => {
    const { isAddTaskOpen } = useSelector((state) => state.ui)
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState({
        taskmessage: "",
        estimated_date: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (name, date) => {
        setFormValues({
            ...formValues,
            [name]: date,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setIsSubmitting(true);
        try {
            const newErrors = {};
            if (!formValues?.taskmessage) {
                newErrors.taskmessage = 'Task is required';
            } else if (!formValues?.estimated_date) {
                newErrors.estimated_date = "Estimated time is required"
            }
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            const PostTaskRes = await dispatch(postTask(formValues)).unwrap();
            console.log("PostTaskRes>>>>", PostTaskRes)
            // dispatch(openEditLeadModal(false))
            dispatch(openDailyTaskModal(false))
            // onSuccess()
            dispatch(fetchTaskData());
            setFormValues({
                taskmessage: "",
                estimated_date: ""
            })
        } catch (error) {
            toast.error('Failed to add Lead!');
        }

    };

    if (!isAddTaskOpen) return null;
    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Task
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => dispatch(openDailyTaskModal(false))}>
                            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form class="p-4 md:p-5">
                        <div class="grid gap-4 mb-4 grid-cols-2">
                            <div class="col-span-2">
                                <label for="taskmessage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task</label>
                                <input type="text" name="taskmessage" value={formValues?.taskmessage} onChange={handleChange} id="taskmessage" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="write about your task" required="" />
                                {errors?.taskmessage && <p className="text-red-500 text-sm">{errors?.taskmessage}</p>}
                            </div>
                            <div class="col-span-2">
                                <label htmlFor="deadLine" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Estimated Date
                                </label>
                                <DatePicker
                                    id="estimated_date"
                                    selected={formValues?.estimated_date}
                                    onChange={(date) => handleDateChange('estimated_date', date)}
                                    dateFormat="yyyy/MM/dd"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.estimated_date && <p className="text-red-500 text-sm">{errors?.estimated_date}</p>}
                            </div>
                        </div>
                        <button type="submit" class="text-white inline-flex items-center bg-blue-700 text-center w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default AddDailyTask