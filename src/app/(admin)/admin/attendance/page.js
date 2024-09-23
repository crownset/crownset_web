"use client";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import "@/app/globals.css";
import 'react-calendar/dist/Calendar.css';
import { format } from "date-fns";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { CustomLoader } from '@/components/CustomLoader';
import { punchInDatas, punchOutData, getData } from '@/redux/slices/attendanceSlice';

const Page = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPunchOutConfirmOpen, setIsPunchOutConfirmOpen] = useState(false);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [isPunchedOut, setIsPunchedOut] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);

  const { attendance, isPunching, isPunchout } = useSelector((state) => state.attendance);

  const dispatch = useDispatch();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const onChange = async (newDate) => {
    setDate(newDate);

    const formattedDate = format(newDate, "yyyy-MM-dd");

    try {
      const dateFormat = await dispatch(getData({ date: formattedDate })).unwrap();

      const punchIn = dateFormat?.records?.[0]?.punchIn || null;
      const punchOut = dateFormat?.records?.[0]?.punchOut || null;

      setPunchInTime(punchIn ? format(new Date(punchIn), "hh:mm a") : null);
      setPunchOutTime(punchOut ? format(new Date(punchOut), "hh:mm a") : null);
      const isToday = newDate.getTime() === today.getTime();

      if (isToday) {
        setIsPunchedIn(!!punchIn && !punchOut);
        setIsPunchedOut(!!punchOut);
      } else {
        setIsPunchedIn(true);
        setIsPunchedOut(false);
      }

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch punch data for the selected date.");
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModals = () => {
    setIsPunchOutConfirmOpen(false);
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

  const handlePunchIn = async () => {
    try {
      const location = await getLocation();
      const punchInRes = await dispatch(
        punchInDatas({
          latitude: location.latitude,
          longitude: location.longitude,
          date: new Date().toISOString(),
        })
      ).unwrap();

      const formattedDate = format(new Date(), "yyyy-MM-dd");
      const response = await dispatch(getData({ date: formattedDate })).unwrap();
      const punchIn = response?.records?.[0]?.punchIn || null;


      setPunchInTime(punchIn ? format(new Date(punchIn), "hh:mm a") : null);
      if (punchInRes?.status === "Location out of range") {
        toast.error(punchInRes?.status);
      } else if (punchInRes?.message === "Already punched in for today") {
        toast.success(punchInRes?.message);
        setIsPunchedOut(false);
      } else if (punchInRes?.message === "No attendance records found for this date") {
        toast.error(punchInRes?.message);
      } else {
        toast.success(punchInRes?.message || "Punch-in successful");
        setIsPunchedIn(true);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Punch-in error:", error);
      toast.error("Failed to punch in. Please try again.");
    }
  };


  const handlePunchOut = async () => {
    try {
      const location = await getLocation();

      const punchOutRes = await dispatch(
        punchOutData({
          latitude: location.latitude, longitude: location.longitude, date: new Date().toISOString(),
        })).unwrap();
      const formattedDate = format(new Date(), "yyyy-MM-dd");
      const response = await dispatch(getData({ date: formattedDate })).unwrap();

      const punchOut = response?.records[0]?.punchOut;
      setPunchOutTime(punchOut ? format(new Date(punchOut), "hh:mm a") : null);


      if (punchOutRes?.status === "Location out of range") {
        toast.error(punchOutRes?.status)
      } else {
        toast.success(punchOutRes?.message);
        setIsPunchedIn(false);
        setIsPunchedOut(true);
      }

      setIsPunchedIn(false);


    }
    catch (error) {
      toast.error(punchOutRes?.status)
      console.log(error);
    }
    setIsPunchOutConfirmOpen(false);
  };
  //const formattedDate = format(date, "yyyy-MM-dd");
  const isToday = date.getTime() === today.getTime();

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4 ">

        <div className="max-w-xs sm:max-w-md p-6 sm:p-10 bg-white rounded-lg shadow-lg w-[600px]">
          <Calendar onChange={onChange} value={date} maxDate={new Date()} className="react-calendar" />
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

                </h3>

                {isToday ? (
                  <>
                    {/* Show both PunchIn and PunchOut time if both are completed */}
                    {punchInTime && punchOutTime ? (
                      <>
                        <p className="text-black font-bold">PunchIn-Time: {punchInTime}</p>
                        <p className="text-black font-bold">PunchOut-Time: {punchOutTime}</p>
                      </>
                    ) : (
                      <>
                        {isPunchedOut ? (
                          // If only PunchOut is done
                          <p className="text-black font-bold">PunchOut-Time: {punchOutTime}</p>
                        ) : isPunchedIn ? (
                          <>
                            {/* If only PunchIn is done and PunchOut is still pending */}
                            <p className="text-black font-bold">PunchIn-Time: {punchInTime}</p>
                            <button
                              type="button"
                              className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm sm:text-base inline-flex items-center px-4 py-2.5 sm:px-5 sm:py-2.5 text-center"
                              onClick={() => setIsPunchOutConfirmOpen(true)}
                            >
                              {isPunching ? <CustomLoader /> : 'Punch Out'}
                            </button>
                          </>
                        ) : (
                          <>
                            {/* If neither PunchIn nor PunchOut are done */}
                            <p className="text-black font-bold">PunchIn-Time: {punchInTime || "Not yet punched in"}</p>
                            <p className="text-black font-bold">PunchOut-Time: {punchOutTime || "Not yet punched out"}</p>
                            <button
                              type="button"
                              className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm sm:text-base inline-flex items-center px-4 py-2.5 sm:px-5 sm:py-2.5 text-center"
                              onClick={handlePunchIn}
                            >
                              {isPunching ? <CustomLoader /> : 'Punch In'}
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* Display when the selected date is not today */}
                    <p className="text-black font-bold">PunchIn-Time: {punchInTime}</p>
                    <p className="text-black font-bold">PunchOut-Time: {punchOutTime}</p>
                  </>
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
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm sm:text-base inline-flex items-center px-4 py-2.5 sm:px-5 sm:py-2.5 mr-2"
                  onClick={handlePunchOut}
                >
                  {isPunchout ? <CustomLoader /> : 'Confirm'}
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






