"use client";
import { addProject, fetchProjects } from '@/redux/slices/projectSlice';
import { fetchData, postQuery } from '@/redux/slices/querySlice';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const AddLead = ({ onCloseProject, openProject }) => {
    const [user, setUser] = useState(null);

    const [formValues, setFormValues] = useState({
        fullName: "",
        email: "",
        contact: "",
        businessName: "",
        queryContent: "",
        service: "",
        leadBy: "",
        // comments: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setFormValues((prevValues) => ({
                ...prevValues,
                leadBy: parsedUser?.data?.firstName || ""
            }));
        }
    }, []);

    const handleDateChange = (name, date) => {
        setFormValues({
            ...formValues,
            [name]: date,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const newErrors = {};
            if (!formValues?.fullName) {
                newErrors.fullName = 'Name is required';
            } else if (!formValues?.email) {
                newErrors.email = 'Email is required';
            } else if (!formValues?.contact) {
                newErrors.contact = 'Contact number is required';
            } else if (!formValues?.businessName) {
                newErrors.businessName = 'Business Name is required';
            } else if (!formValues?.service) {
                newErrors.service = 'This field is required';
            } else if (!formValues?.queryContent) {
                newErrors.queryContent = 'Remarks are required';
            } else if (!formValues?.comments) {
                newErrors.comments = 'comments are required';
            }
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            await dispatch(postQuery(formValues)).unwrap();
            toast.success('Lead added successfully!');
            dispatch(fetchData());
            onCloseProject();
        } catch (error) {
            toast.error('Failed to add Lead!');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!openProject) return null;

    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-3 max-w-md w-full">
                <div className="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Add Lead Details
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => { onCloseProject() }}
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
                <form onSubmit={handleSubmit} className="p-3">
                    <div className="grid gap-2 mb-4">
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <label htmlFor="name" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Name
                                </label>
                                <input
                                    id="fullName"
                                    type='text'
                                    name="fullName"
                                    value={formValues?.fullName}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.fullName && <p className="text-red-500 text-sm">{errors?.fullName}</p>}
                            </div>
                            <div className="flex-1">
                                <label htmlFor="email" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formValues?.email}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.email && <p className="text-red-500 text-sm">{errors?.email}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <label htmlFor="contact" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Contact No.
                                </label>
                                <input
                                    id="contact"
                                    name="contact"
                                    type="number"
                                    value={formValues?.contact}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.contact && <p className="text-red-500 text-sm">{errors?.contact}</p>}
                            </div>
                            <div className="flex-1">
                                <label htmlFor="assignTo" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Business Name
                                </label>
                                <input
                                    id="assignTo"
                                    name="businessName"
                                    value={formValues?.businessName}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.businessName && <p className="text-red-500 text-sm">{errors?.businessName}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <label htmlFor="businessName" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Services
                                </label>
                                <input
                                    id="service"
                                    name="service"
                                    type="text"
                                    value={formValues?.service}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.service && <p className="text-red-500 text-sm">{errors?.service}</p>}
                            </div>
                            <div className="flex-1">
                                <label htmlFor="queryContent" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Query
                                </label>
                                <input
                                    id="leadBy"
                                    name="leadBy"
                                    value={formValues?.leadBy}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {/* {errors?.leadBy && <p className="text-red-500 text-sm">{errors?.queryContent}</p>} */}
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2 mb-4">
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <label htmlFor="leadBy" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Query
                                </label>
                                <input
                                    id="queryContent"
                                    name="queryContent"
                                    placeholder="write your query ?"
                                    value={formValues?.queryContent}
                                    onChange={handleChange}
                                    // readOnly
                                    className="border mb-4 rounded-xl w-full h-[4rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.queryContent && <p className="text-red-500 text-sm">{errors.queryContent}</p>}
                            </div>
                            {/* <div className="flex-1">
                                <label htmlFor="date" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Query
                                </label>
                                <input
                                    id="queryContent"
                                    name="queryContent"
                                    value={formValues?.queryContent}
                                    onChange={handleChange}
                                    readOnly
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div> */}
                        </div>
                    </div>
                    <div>
                        <textarea
                            className="border mb-4 rounded-xl w-full h-[5rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name='comments'
                            placeholder="write your Comment..."
                            value={formValues?.comments}
                            onChange={handleChange}
                            maxLength={250}
                        />
                        {errors.comments && <p className="text-red-500 text-sm">{errors.comments}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-white bg-dashboard hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        {isSubmitting ? <BeatLoader color="#fff" size={10} /> : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddLead;
