"use client";
import React from 'react';
import { FaBirthdayCake, FaCalendarAlt, FaEnvelope, FaIdBadge, FaUser, FaUserTie } from 'react-icons/fa';

const UserDetailsModal = ({ openDetails, closeDetails, data }) => {
    if (!openDetails) return null;

    return (
        <div
            id="crypto-modal"
            tabIndex="-1"
            aria-hidden="true"
            className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center  items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 `}
        >
            <div className="relative p-4 w-full max-w-md max-h-full flex h-[100%] justify-center items-center">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Details
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeDetails}
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
                    <div className="space-y-4 p-4">
                        <div className="flex items-center space-x-2">
                            <FaIdBadge className="text-sm text-dashboard" />
                            <p className="text-sm font-semibold text-bodyTextColor">Access Id: {data?.data?.accessId}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-lg text-dashboard" />
                            <p className="text-sm font-semibold text-bodyTextColor">
                                {data?.data?.firstName} {data?.data?.lastName}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaEnvelope className="text-sm text-dashboard" />
                            <p className="text-sm font-semibold text-bodyTextColor">{data?.data?.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaBirthdayCake className="text-sm text-dashboard" />
                            <p className="text-sm font-semibold text-bodyTextColor">{data?.data?.dob}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-sm text-dashboard" />
                            <p className="text-sm font-semibold text-bodyTextColor">{data?.data?.doj}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-dashboard">
                            <FaUserTie className="text-sm " />
                            <p className="text-sm font-semibold text-bodyTextColor" >{data?.data?.designation}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsModal;
