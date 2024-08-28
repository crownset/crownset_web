"use client";
import { assignUsers } from '@/redux/slices/userSlice';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';


const AddLeave = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        reason: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);



    const { user } = useSelector((state) => state.user);
    console.log("user", user)
    const dispatch = useDispatch()
    const filteredData =  user.filter(item=> item.accessId=="1")
   // console.log("filteredData", filteredData)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
        onClose();
    };
    

    const [userDetail, setUserDetail] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserDetail(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        dispatch(assignUsers());
    }, [dispatch]);

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
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
                            <label htmlFor="nameDropdown" className="block text-sm font-medium text-gray-700 text-left">
                                To whom:
                            </label>
                            <select
                                id="nameDropdown"
                                name="nameDropdown"
                                onChange={handleChange}
                                value={formData?.name}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                               {filteredData.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.firstName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="nameDropdown" className="block text-sm font-medium text-gray-700 text-left">
                                Name
                            </label>
                            <input
                                value={userDetail?.data?.firstName}
                                readOnly
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="flex-1">
                            <label htmlFor="deadLine" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white text-start">
                                Start date
                            </label>
                            <DatePicker
                                id="deadLine"
                                // selected={formValues.deadLine}
                                // onChange={(date) => handleDateChange('deadLine', date)}
                                dateFormat="yyyy/MM/dd"
                                //onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"

                            />
                            {/* {errors?.deadLinSe && <p className="text-red-500 text-sm">{errors?.deadLine}</p>} */}
                        </div>
                        <div className="flex-1">
                            <label htmlFor="deadLine" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white text-start">
                                End date
                            </label>
                            <DatePicker
                                id="deadLine"
                                // selected={formValues.deadLine}
                                // onChange={(date) => handleChange( date)}
                               // onChange={handleChange}
                                dateFormat="yyyy/MM/dd"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                            {/* {errors?.deadLine && <p className="text-red-500 text-sm">{errors?.deadLine}</p>} */}
                        </div>
                        {/* <div className="mb-4">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 text-left">End Date:</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                                className="mt-1 block  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                            />
                        </div> */}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 text-left ">Reason:</label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddLeave;
