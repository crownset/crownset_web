import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editQuery, fetchData } from '@/redux/slices/querySlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { assignUsers } from '@/redux/slices/userSlice';
import { closeEditSuccessModal, openEditSuccessModal } from '@/redux/slices/uiSlice';
import SuccessModal from './SuccessLottie';
import { CustomLoader } from '../CustomLoader';

const UpdateForm = ({ isOpen, onClose, queryData, onSuccess }) => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);
    const { isEditSuccessfull } = useSelector((state) => state.ui)
    const [isRemarkColor, setIsRemarkColor] = useState("Premature")
    const [userDetail, setUserDetail] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserDetail(JSON.parse(storedUser));
        }
    }, []);
    const [formValues, setFormValues] = useState({
        assignTo: '',
        followUp: false,
        lastFollowUp: new Date(),
        remarks: '',
        comments: "",
        queryId: ''
    });

    useEffect(() => {
        if (queryData) {
            setFormValues({
                assignTo: queryData.assignTo || '',
                followUp: queryData.followUp || false,
                lastFollowUp: new Date(queryData.lastFollowUp) || new Date(),
                remarks: queryData.remarks || '',
                comments: queryData.comments || '',
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
            onClose();
            dispatch(fetchData());
            onSuccess()
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white rounded-3xl shadow dark:bg-gray-700 p-2 md:p-3 max-w-md w-full">
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
                    <div className="grid gap-4 mb-2">
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="assignTo" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Assign To
                                </label>
                                <select
                                    id="assignTo"
                                    name="assignTo"
                                    value={formValues.assignTo}
                                    onChange={handleChange}
                                    disabled={userDetail?.data?.accessId === 2}
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
                            <div className="flex-1">
                                <label htmlFor="followUp" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
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
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="lastFollowUp" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Last Follow Up
                                </label>
                                <DatePicker
                                    selected={formValues.lastFollowUp}
                                    onChange={handleDateChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="remarks" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Remarks
                                </label>
                                <select
                                    id="remarks"
                                    name="remarks"
                                    value={formValues.remarks}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="Premature">Premature</option>
                                    <option value="Prospect">Prospect</option>
                                    <option value="DNP">DNP</option>
                                    <option value="Meeting">Meeting</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Not Intersted">Not Intersted</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input
                            className="border mb-2 rounded-xl w-full h-[5rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="comments"
                            name='comments'
                            placeholder="write your Comment..."
                            value={formValues.comments}
                            onChange={handleChange}
                        />
                        {/* {errors.comments && <p className="text-red-500 text-sm">{errors.comments}</p>} */}
                    </div>
                    <button
                        type="submit"
                        className="w-full text-default inline-flex items-center justify-center bg-dashboard focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-[#93969A]"
                    > {
                            loading ? <CustomLoader loading={loading} color={"#ffffff"} size={10} /> : "Update Query"
                        }

                    </button>
                </form>

            </div>
            <SuccessModal
                isOpen={isEditSuccessfull}
                onClose={() => dispatch(closeEditSuccessModal())}
                title="Lead Edited Successfully."
            />
        </div>
    );
};

export default UpdateForm;
