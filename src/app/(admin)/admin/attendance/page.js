"use client";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import "@/app/globals.css";
import 'react-calendar/dist/Calendar.css';
//import {setDate, setIsModalOpen,setIsPunchOutConfirmOpen,setPunchData, setErrorMessage,} from '@/redux/slices/uiSlice';
//import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { punchInDatas, punchOutData, getData } from '@/redux/slices/attendanceSlice';


const Page = () => {
    const [date, setDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPunchOutConfirmOpen, setIsPunchOutConfirmOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [punchData, setPunchData] = useState({});
    const dispatch = useDispatch();
    const { attendance, punchInData, punchOutData, loading, error } = useSelector((state) => state.attendance);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    //useEffect(() => {
      //  dispatch(fetchData());
    //}, [dispatch])

    const onChange = (newDate) => {
        setDate(newDate);
        setIsModalOpen(true);
        setErrorMessage("");
    };

    const closeModal = () => {
        setIsModalOpen(false);

    };
    const closeModals = () => {

        setIsPunchOutConfirmOpen(false)
    };

    const handlePunchOutConfirm = () => {
        setIsPunchOutConfirmOpen(true);
    };

    const getLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        resolve({ latitude, longitude });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                reject(new Error("Geolocation is not supported by this browser."));
            }
        });
    };

    const getIPAddress = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error("Error fetching IP address: ", error);
        }
    };

    const handlePunchIn = async () => {
        try {
            const location = await getLocation()
            const ipAddress = await getIPAddress()
            console.log("loaction>>>>>>>>", location)
            const puchInRes = dispatch(punchInDatas({ latitude: location.latitude, longitude: location.longitude, ip: ipAddress }))
            console.log("puchInRes>>>>>>>>>", puchInRes)
            dispatch(getData());

        } catch (error) {
            console.log(error)
        }
        const currentTime = new Date().toLocaleTimeString();
        const dateKey = date.toDateString();
        setPunchData((prevData) => {
            //const isPunchedIn = prevData[dateKey]?.isPunchedIn;
            const punchInTime = prevData[dateKey]?.punchInTime;
            if (!punchInTime) {
                return {
                    ...prevData,
                    [dateKey]: {
                        isPunchedIn: true,
                        punchInTime: currentTime,
                        punchOutTime: null,
                        completed: false,
                    },
                };
            } else if (!prevData[dateKey]?.punchOutTime) {

                return {
                    ...prevData,
                    [dateKey]: {
                        ...prevData[dateKey],
                        punchOutTime: currentTime,
                        completed: true,
                    },
                };
            }

            return prevData;
        });

        setIsModalOpen(false);
        setIsPunchOutConfirmOpen(false)


    };
    const handlePunchOut = async () => {
        try {
            const location = await getLocation()
            const ipAddress = await getIPAddress()
            console.log("loaction>>>>>>>>", location)
            const puchoutRes = dispatch(punchOutData({ latitude: location.latitude, longitude: location.longitude, }))
            console.log("puchoutRes>>>>>>>>>", puchoutRes)
            dispatch(getData());
        } catch (error) {
            console.log(error)
        }
        const currentTime = new Date().toLocaleTimeString();
        const dateKey = date.toDateString();

        setPunchData((prevData) => {
            const punchInTime = prevData[dateKey]?.punchInTime;
            if (!punchInTime) {
                return {
                    ...prevData,
                    [dateKey]: {
                        isPunchedIn: true,
                        punchInTime: currentTime,
                        punchOutTime: null,
                        completed: false,
                    },
                };
            } else if (!prevData[dateKey]?.punchOutTime) {
                return {
                    ...prevData,
                    [dateKey]: {
                        ...prevData[dateKey],
                        punchOutTime: currentTime,
                        completed: true,
                    },
                };
            }

            return prevData;
        });
        setIsModalOpen(false);
        setIsPunchOutConfirmOpen(false)
    };



    const dateKey = date.toDateString();
    const selectedDate = punchData[dateKey];
    const isToday = date.getTime() === today.getTime();

    return (

        <>
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
                <h2 className="text-2xl font-bold mb-4 sm:mb-8 text-gray-800 text-center">
                    Select a Date
                </h2>
                <div className="w-full max-w-xs sm:max-w-md p-6 sm:p-10 bg-white rounded-lg shadow-lg">
                    <Calendar
                        onChange={onChange}
                        value={date}
                        maxDate={new Date()}
                        className="react-calendar"
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
                                    {dateKey}
                                </h3>

                                {errorMessage && (
                                    <p className="text-red-500 font-bold mb-4">
                                        {errorMessage}
                                    </p>
                                )}

                                {isToday ? (
                                    selectedDate ? (
                                        <>
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                                Punch In: {selectedDate.punchInTime || 'Not available'}
                                            </p>
                                            {selectedDate.punchOutTime && (
                                                <p className="mb-5 text-gray-500 dark:text-gray-400">
                                                    Punch Out: {selectedDate.punchOutTime}
                                                </p>
                                            )}
                                            {selectedDate.completed ? (
                                                <p className="text-green-500 font-bold">
                                                    Punch-in and Punch-out completed for the day.
                                                </p>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm sm:text-base inline-flex items-center px-4 py-2.5 sm:px-5 sm:py-2.5 text-center"
                                                    onClick={handlePunchOutConfirm}
                                                >
                                                    Punch Out
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <p className="mb-5 text-gray-500 dark:text-gray-400">
                                                No punch data available yet.
                                            </p>
                                            <button
                                                type="button"
                                                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm sm:text-base inline-flex items-center px-4 py-2.5 sm:px-5 sm:py-2.5 text-center"
                                                onClick={handlePunchIn}
                                            >
                                                Punch In
                                            </button>
                                        </>
                                    )
                                ) : (
                                    <p className="text-red-500 font-bold">
                                        You can only punch in or punch out on the current date.
                                    </p>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isPunchOutConfirmOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative p-4 w-full max-w-sm sm:max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={closeModals}
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
                                    Are you sure you want to punch out?
                                </h3>
                                <button
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm sm:text-base inline-flex items-center px-4 py-2.5 sm:px-5 sm:py-2.5 text-center"
                                    onClick={handlePunchOut}
                                >
                                    Yes, Punch Out
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
