import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editQuery, fetchData } from '@/redux/slices/querySlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { assignUsers } from '@/redux/slices/userSlice';

const UpdateForm = ({ isOpen, onClose, queryData }) => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);
    console.log("users===>", user)
    const [formValues, setFormValues] = useState({
        assignTo: '',
        followUp: false,
        lastFollowUp: new Date(),
        remarks: '',
        queryId: ''
    });

    useEffect(() => {
        if (queryData) {
            setFormValues({
                assignTo: queryData.assignTo || '',
                followUp: queryData.followUp || false,
                lastFollowUp: new Date(queryData.lastFollowUp) || new Date(),
                remarks: queryData.remarks || '',
                queryId: queryData._id || ''
            });
        }
    }, [queryData]);

    useEffect(() => {
        dispatch(assignUsers());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: name === 'followUp' ? value === 'true' : value
        });
    };

    const handleDateChange = (date) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            lastFollowUp: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(editQuery({ queryId: formValues.queryId, updatedData: formValues })).unwrap();
            dispatch(fetchData());
            onClose();
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-4 md:p-5 max-w-md w-full">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Update Query
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4">
                        <div>
                            <label htmlFor="assignTo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Assign To
                            </label>
                            <select
                                id="assignTo"
                                name="assignTo"
                                value={formValues.assignTo}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                               <option value="">Select assignee</option>
                               {user.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.firstName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="followUp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Follow Up
                            </label>
                            <select
                                id="followUp"
                                name="followUp"
                                value={String(formValues.followUp)}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="lastFollowUp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Last Follow Up
                            </label>
                            <DatePicker
                                selected={formValues.lastFollowUp}
                                onChange={handleDateChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="remarks" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Remarks
                            </label>
                            <textarea
                                id="remarks"
                                name="remarks"
                                value={formValues.remarks}
                                onChange={handleChange}
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Write remarks here"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Update Query
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateForm;
