"use client";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "@/app/globals.css";
import 'react-calendar/dist/Calendar.css';

const Page = () => {
    const [date, setDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPunchedIn, setIsPunchedIn] = useState(false);

    const onChange = (newDate) => {
        setDate(newDate);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handlePunchInOut = () => {
        setIsPunchedIn(!isPunchedIn);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
                <h2 className="text-xl  font-bold mb-4 sm:mb-8 text-gray-800 text-center">
                    Select a Date
                </h2>
                <div className="w-full max-w-xs sm:max-w-md p-6 sm:p-10 bg-white rounded-lg shadow-lg">
                    <Calendar
                        onChange={onChange}
                        value={date}
                        maxDate={new Date()}
                        className="react-calendar	"
                    />
                </div>
            </div>

       {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative p-4 w-full max-w-sm sm:max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={closeModal}
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
                                        d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 sm:p-5 text-center">
                                <h3 className="mb-5 text-base sm:text-lg font-normal text-gray-500 dark:text-gray-400">
                                    {date.toDateString()}
                                </h3>
                                <button
                                    type="button"
                                    className={`text-white ${isPunchedIn ? 'bg-red-600' : 'bg-blue-600'
                                        } hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm sm:text-base inline-flex items-center px-4 py-2.5 sm:px-5 sm:py-2.5 text-center`}
                                    onClick={handlePunchInOut}
                                >
                                    {isPunchedIn ? 'Punch Out' : 'Punch In'}
                                </button>
                                <button
                                    type="button"
                                    className="py-2 px-4 sm:px-5 ms-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    onClick={closeModal}
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
