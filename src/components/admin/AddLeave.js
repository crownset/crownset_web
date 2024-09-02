"use client";
import { assignUsers } from '@/redux/slices/userSlice';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeave, LeaveQuery } from '@/redux/slices/leaveSlice';
import { CustomLoader } from '../CustomLoader';


const AddLeave = ({ onClose, }) => {
    const [userDetail, setUserDetail] = useState(null);
    const [formData, setFormData] = useState({
        userId: "",
        approvedBy: "",
        userName: "",
        startDate: '',
        endDate: '',
        reason: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const filteredData = user.filter(item => item.accessId == "1");
    //console.log("filteredData>>>>>", filteredData)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleDateChange = (name, date) => {
        setFormData({
            ...formData,
            [name]: date
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const newErrors = {};
            if (!formData?.approvedBy) {
                newErrors.approvedBy = "required"
            } else if (!formData.startDate) {
                newErrors.startDate = 'Starting date is required';
            } else if (!formData.endDate) {
                newErrors.endDate = 'Ending date is required';
            } else if (!formData.reason) {
                newErrors.reason = 'Reason is required';
            }
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                //setIsSubmitting(false);
                return;
            }
            await dispatch(LeaveQuery(formData)).unwrap();
            dispatch(fetchLeave());
            setFormData({
                startDate: '',
                endDate: '',
                reason: ''
            });

            onClose();
        } catch (error) {
            console.error('Failed to add leave:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser) {
    //         setUserDetail(JSON.parse(storedUser));
    //     }
    // }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserDetail(parsedUser);
            setFormData((prevValues) => ({
                ...prevValues,
                userName: parsedUser?.data?.firstName,
                userId: parsedUser?.data?._id

            }));
        }
    }, []);

    useEffect(() => {
        dispatch(assignUsers());
    }, [dispatch]);

    

    return (
        <div className="fixed border-[10px] top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
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

                <h2 className="text-2xl font-semibold mb-4 flex text-left">Apply for Leave</h2>
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
                            {errors?.approvedBy && <p className="text-red-500 text-sm">{errors?.approvedBy}</p>}
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
                            {errors?.userName && <p className="text-red-500 text-sm">{errors?.userName}</p>}
                        </div>
                    </div>
                    
                    <div className="flex space-x-2">
                        <div className="flex-1">
                            <label htmlFor="startDate" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white text-start">
                                Start date
                            </label>
                            <DatePicker
                                id="startDate"
                                selected={formData?.startDate}
                                onChange={(date) => handleDateChange('startDate', date)}
                                dateFormat="yyyy/MM/dd"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
                        </div>
                        <div className="flex-1">
                            <label htmlFor="endDate" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white text-start">

                                End date
                            </label>
                            <DatePicker
                                id="endDate"
                                selected={formData.endDate}
                                onChange={(date) => handleDateChange('endDate', date)}
                                dateFormat="yyyy/MM/dd"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 text-left">
                            Reason:
                        </label>
                        <textarea
                            name="reason"
                            placeholder="write your reason..."
                            value={formData?.reason}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-white bg-dashboard hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        {isSubmitting ? <CustomLoader loading={isSubmitting} color={"#ffffff"} size={10} /> : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddLeave;