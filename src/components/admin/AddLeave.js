"use client";
import { assignUsers } from '@/redux/slices/userSlice';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeave, LeaveQuery } from '@/redux/slices/leaveSlice';
import { CustomLoader } from '../CustomLoader';
import * as Config from "@/helpers/admin/config"


const AddLeave = ({ onClose, isLeaveOpen, onSuccess }) => {
    const [userDetail, setUserDetail] = useState(null);
    const [formData, setFormData] = useState({
        userId: "",
        approvedBy: "",
        userName: "",
        startDate: '',
        endDate: '',
        reason: '',
        leaveType: '',


    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    

    const { user, loading } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const filteredData = user.filter((item) => item.accessId == "1")

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
            }
            else if (!formData.leaveType) {
                newErrors.leaveType = 'Leave type is required';
            }

            else if (!formData.endDate) {
                newErrors.endDate = 'Ending date is required';
            } else if (!formData.reason) {
                newErrors.reason = 'Reason is required';
            }
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            await dispatch(LeaveQuery(formData)).unwrap();
            dispatch(fetchLeave());
            setFormData({
                startDate: '',
                endDate: '',
                reason: '',
                leaveType: '',
            });
            onClose();
            onSuccess()
        } catch (error) {
            console.error('Failed to add leave:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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

    if (!isLeaveOpen) return null;

    return (
        <>
            <div className="fixed border-[10px] top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-3 max-w-md w-full">
                    <div className="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Apply Leave
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
                    <form onSubmit={handleSubmit} className="p-3" autoComplete='off'>
                        <div className="grid gap-2 mb-4">
                            <div className="flex space-x-2">
                                <div className="flex-1">
                                    <label htmlFor="name" className="block mb-1 text-left text-xs font-medium text-gray-900 dark:text-white">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type='text'
                                        name="name"
                                        value={formData?.userName}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                    {errors?.name && <p className="text-red-500 text-sm">{errors?.name}</p>}
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="approvedBy" className="block mb-1 text-xs text-left font-medium text-gray-900 dark:text-white">
                                        To Whom
                                    </label>
                                    <select
                                        id="approvedBy"
                                        name="approvedBy"
                                        value={formData?.approvedBy}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    >
                                        <option value="">Applied to</option>
                                        {filteredData.map((item) => (
                                            <option key={item._id} value={item._id}>
                                                {item?.firstName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors?.approvedBy && <p className="text-red-500 text-sm">{errors?.approvedBy}</p>}
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="flex-1 text-left">
                                    <label htmlFor="startDate" className="block mb-1 text-left text-xs font-medium text-gray-900 dark:text-white">
                                        Start Date
                                    </label>
                                    <DatePicker
                                        id="startDate"
                                        selected={formData?.startDate}
                                        onChange={(date) => handleDateChange('startDate', date)}
                                        dateFormat="yyyy/MM/dd"
                                        minDate={new Date()} 
                                        className="bg-gray-50 border  border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                    {errors?.startDate && <p className="text-red-500 text-sm">{errors?.startDate}</p>}
                                </div>
                                <div className="flex-1 text-left">
                                    <label htmlFor="endDate" className="block mb-1 text-left text-xs font-medium text-gray-900 dark:text-white">
                                        End Date
                                    </label>
                                    <DatePicker
                                        id="endDate"
                                        selected={formData?.endDate}
                                        onChange={(date) => handleDateChange('endDate', date)}
                                        dateFormat="yyyy/MM/dd"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                    {errors?.endDate && <p className="text-red-500 text-sm">{errors?.endDate}</p>}
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="flex-1 text-left">
                                    <label htmlFor="leaveType" className="block mb-1 text-left text-xs font-medium text-gray-900 dark:text-white">
                                        Leave Type
                                    </label>
                                    <select
                                        id="leaveType"
                                        name="leaveType"
                                        value={formData?.leaveType}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    >
                                        <option value="">Select a leave type</option>
                                        {Config?.LeaveOption.map((item, id) => (
                                            <option key={id} value={item.type}>
                                                {item?.type}
                                            </option>
                                        ))}
                                    </select>
                                    {errors?.leaveType && <p className="text-red-500 text-sm">{errors?.leaveType}</p>}
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="flex-1">
                                    <label htmlFor="reason" className="block text-left mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                        Reason
                                    </label>
                                    <textarea
                                        id="reason"
                                        name="reason"
                                        type="text"
                                        value={formData?.reason}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 h-[4rem]"
                                    />
                                    {errors?.reason && <p className="text-red-500 text-sm">{errors?.reason}</p>}
                                </div>
                            </div>
                            <div className="flex ">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex w-full justify-center rounded-lg bg-primary-600 px-4 py-2 text-lg text-white bg-dashboard shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                                >
                                    {
                                        loading ? <CustomLoader loading={isSubmitting} color={"#ffffff"} size={10} /> : "Apply"
                                    }
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddLeave;
