import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { assignUsers } from '@/redux/slices/userSlice';
import { editProject, fetchProjects } from '@/redux/slices/projectSlice';
import { toast } from 'react-toastify';
import { openEditProjectModal } from '@/redux/slices/uiSlice';

const UpdateProjectData = ({ isOpen, onClose, queryData, onSuccess }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [userDetail, setUserDetail] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserDetail(JSON.parse(storedUser));
        }
    }, []);

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        contactNo: "",
        assignTo: "",
        remarks: "",
        businessName: "",
        projectBy: "",
        lastFollowUp: new Date(),
        deadLine: "",
        queryId: ''
    });

    useEffect(() => {
        if (queryData) {
            setFormValues({
                name: queryData.name || '',
                email: queryData.email || '',
                contactNo: queryData.contactNo || '',
                assignTo: queryData.assignTo || '',
                businessName: queryData.businessName || '',
                projectBy: queryData.projectBy || '',
                deadLine: queryData.deadLine || '',
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
            [name]: value
        });
    };

    const handleDateChange = (name, date) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(editProject({ queryId: formValues.queryId, updatedData: formValues })).unwrap();
            dispatch(fetchProjects());
            dispatch(openEditProjectModal(false))
            onSuccess()
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-3 max-w-md w-full">
                <div className="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Update Project Details
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
                                <label htmlFor="name" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    value={formValues?.name}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="email" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    value={formValues?.email}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
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
                                    value={formValues?.contactNo}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="assignTo" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Assign To
                                </label>
                                <select
                                    id="assignTo"
                                    name="assignTo"
                                    value={formValues?.assignTo}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    {user.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.firstName}
                                        </option>
                                    ))}
                                </select>
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
                                    value={formValues?.businessName}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="remarks" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Remarks
                                </label>
                                <input
                                    id="remarks"
                                    name="remarks"
                                    value={formValues?.remarks}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
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
                                    value={formValues?.projectBy}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="deadline" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Deadline
                                </label>
                                <input
                                    id="deadline"
                                    name="deadLine"
                                    type="date"
                                    value={formValues?.deadLine}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <label htmlFor="lastFollowUp" className="block mb-1 text-xs font-medium text-gray-900 dark:text-white">
                                    Last Follow-Up
                                </label>
                                <DatePicker
                                    id="lastFollowUp"
                                    name="lastFollowUp"
                                    selected={formValues.lastFollowUp}
                                    onChange={(date) => handleDateChange('lastFollowUp', date)}
                                    dateFormat="MM/dd/yyyy"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                        </div>
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

export default UpdateProjectData;
