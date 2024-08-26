"use client";
import { addProject, fetchProjects } from '@/redux/slices/projectSlice';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { CustomLoader } from '../CustomLoader';
import SuccessModal from './SuccessLottie';

const AddProjectDetails = ({ onCloseProject, openProject }) => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        contactNo: "",
        assignTo: "",
        remarks: "",
        businessName: "",
        projectBy: "",
        lastFollowUp: "",
        deadLine: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
   
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

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
        setIsSubmitting(true);
        try {
            const newErrors = {};
            if (!formValues?.name) {
                newErrors.name = 'Name is required';
            } else if (!formValues?.email) {
                newErrors.email = 'Email is required';
            } else if (!formValues?.contactNo) {
                newErrors.contactNo = 'Contact number is required';
            } else if (!formValues?.assignTo) {
                newErrors.assignTo = 'Assign To is required';
            } else if (!formValues?.businessName) {
                newErrors.businessName = 'Business Name is required';
            } else if (!formValues?.remarks) {
                newErrors.remarks = 'Remarks are required';
            } else if (!formValues?.projectBy) {
                newErrors.projectBy = 'Project By is required';
            } else if (!formValues?.lastFollowUp) {
                newErrors.lastFollowUp = 'Last Follow-Up is required';
            } else if (!formValues?.deadLine) {
                newErrors.deadLine = 'Deadline is required';
            }
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            await dispatch(addProject(formValues)).unwrap();
            setIsSuccessModalOpen(true); // Show success modal
            dispatch(fetchProjects());
        } catch (error) {
            toast.error('Failed to add project!');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!openProject) return null;

    return (
        <div className="fixed border-[10px] top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-3 max-w-md w-full">
                <div className="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Add Project Details
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
                                    id="name"
                                    type='text'
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.name && <p className="text-red-500 text-sm">{errors?.name}</p>}
                            </div>
                            <div className="flex-1">
                                <label htmlFor="email" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formValues.email}
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
                                    name="contactNo"
                                    type="number"
                                    value={formValues.contactNo}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.contactNo && <p className="text-red-500 text-sm">{errors?.contactNo}</p>}
                            </div>
                            <div className="flex-1">
                                <label htmlFor="assignTo" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Assign To
                                </label>
                                <select
                                    id="assignTo"
                                    name="assignTo"
                                    value={formValues.assignTo}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    {user.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.firstName}
                                        </option>
                                    ))}
                                </select>
                                {errors?.assignTo && <p className="text-red-500 text-sm">{errors?.assignTo}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <label htmlFor="businessName" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Business Name
                                </label>
                                <input
                                    id="businessName"
                                    name="businessName"
                                    type="text"
                                    value={formValues.businessName}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.businessName && <p className="text-red-500 text-sm">{errors?.businessName}</p>}
                            </div>
                            <div className="flex-1">
                                <label htmlFor="remarks" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Remarks
                                </label>
                                <input
                                    id="remarks"
                                    name="remarks"
                                    type="text"
                                    value={formValues.remarks}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.remarks && <p className="text-red-500 text-sm">{errors?.remarks}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <label htmlFor="projectBy" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Project By
                                </label>
                                <input
                                    id="projectBy"
                                    name="projectBy"
                                    type="text"
                                    value={formValues.projectBy}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.projectBy && <p className="text-red-500 text-sm">{errors?.projectBy}</p>}
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastFollowUp" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Last Follow-Up
                                </label>
                                <DatePicker
                                    id="lastFollowUp"
                                    selected={formValues.lastFollowUp}
                                    onChange={(date) => handleDateChange('lastFollowUp', date)}
                                    dateFormat="yyyy/MM/dd"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.lastFollowUp && <p className="text-red-500 text-sm">{errors?.lastFollowUp}</p>}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <label htmlFor="deadLine" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Deadline
                                </label>
                                <DatePicker
                                    id="deadLine"
                                    selected={formValues.deadLine}
                                    onChange={(date) => handleDateChange('deadLine', date)}
                                    dateFormat="yyyy/MM/dd"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {errors?.deadLine && <p className="text-red-500 text-sm">{errors?.deadLine}</p>}
                            </div>
                        </div>
                        <div className="flex ">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex w-full justify-center rounded-lg bg-primary-600 px-4 py-2 text-lg text-white bg-dashboard shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                            >
                                {
                                    isSubmitting ? <CustomLoader loading={isSubmitting} color={"#ffffff"} size={10} /> : "Save"
                                }
                            </button>
                        </div>

                    </div>
                </form>
               
            </div>
        </div>
    );
};

export default AddProjectDetails;
