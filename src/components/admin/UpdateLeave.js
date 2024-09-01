import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { assignUsers } from '@/redux/slices/userSlice';
import { editLeave, fetchLeave } from '@/redux/slices/leaveSlice';
import { toast } from 'react-toastify';

const UpdateLeave = ({ isOpen, onClose, queryData }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const filteredData = user.filter(item => item.accessId == "1");
    const [userDetail, setUserDetail] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserDetail(JSON.parse(storedUser));
        }
    }, []);

    const [formData, setFormData] = useState({
        userId: "",
        approvedBy: "",
        userName: "",
        startDate: new Date(),
        endDate: new Date(),
        reason: '',
        queryId: "" // Include queryId in the form state
    });

    useEffect(() => {
        if (queryData) {
            setFormData({
                userId: queryData.userId || '',
                approvedBy: queryData.approvedBy || '',
                userName: queryData.userName || '',
                startDate: new Date(queryData.startDate) || new Date(),
                endDate: new Date(queryData.endDate) || new Date(),
                reason: queryData.reason || '',
                queryId: queryData._id || '' // Ensure queryId is set from queryData
            });
        }
    }, [queryData]);

    useEffect(() => {
        dispatch(assignUsers());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (name, date) => {
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: date.toISOString() // Ensure dates are in ISO format
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);

        try {
            // Ensure queryId is included in the request payload
            const result = await dispatch(editLeave({ queryId: formData.queryId, updatedData: formData })).unwrap();
            console.log("Update result:", result);

            dispatch(fetchLeave());
            onClose();
            toast.success('Leave updated successfully');
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update leave');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed border-[10px] top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white "
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

                <h2 className="text-2xl font-semibold mb-4 flex text-left">Update Leave</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex mb-2 space-x-2">
                        <div className='flex-1'>
                            <label htmlFor="approvedBy" className="block text-sm font-medium text-gray-700 text-left">
                                To whom:
                            </label>
                            <select
                                id="approvedBy"
                                name="approvedBy"
                                onChange={handleChange}
                                value={formData?.approvedBy}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="">Select a user</option>
                                {filteredData.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item?.firstName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 text-left">
                                Name
                            </label>
                            <input
                                id="userName"
                                value={formData?.userName}
                                readOnly
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="flex-1">
                            <label htmlFor="startDate" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white text-start">
                                Start date
                            </label>
                            <DatePicker
                                id="startDate"
                                selected={new Date(formData.startDate)} // Convert to Date object
                                onChange={(date) => handleDateChange('startDate', date)}
                                dateFormat="yyyy/MM/dd"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="endDate" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white text-start">
                                End date
                            </label>
                            <DatePicker
                                id="endDate"
                                selected={new Date(formData.endDate)} // Convert to Date object
                                onChange={(date) => handleDateChange('endDate', date)}
                                dateFormat="yyyy/MM/dd"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 text-left">
                            Reason:
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={formData?.reason}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white bg-dashboard shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateLeave;
