"use client"
import React, { useState, useEffect } from 'react';
import { format, addDays, startOfMonth, endOfMonth, setMonth, setYear, isSameDay } from 'date-fns';
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import * as Config from "@/helpers/admin/config"
import { useDispatch, useSelector } from 'react-redux';
import { getData, punchInDatas, punchOutData } from '@/redux/slices/attendanceSlice';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import { CustomLoader } from '@/components/CustomLoader';
import AllUsers from '@/components/admin/AllUsers';

const AttendanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [punchInData, setPunchInData] = useState(null);
  const [punchOutDetail, setPunchOutDetail] = useState(null);
  const [currentRangeStart, setCurrentRangeStart] = useState(startOfMonth(currentDate));
  const [selectedDate, setSelectedDate] = useState(new Date(), "yyyy-MM-dd")
  const { attendance, isPunching, isPunchout } = useSelector((state) => state.attendance);
  const [dataPunhIn, setDataPunchIn] = useState()
///console.log("dataPunhIn>>>", dataPunhIn)
  const [userDetail, setUserDetail] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  // console.log("attendanceData", attendanceData)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchedAttendanceData = async () => {
      try {
        const dataResponse = await dispatch(getData({ date: selectedDate }))
        setAttendanceData(dataResponse.payload)
      } catch (error) {
        console.log(error)
      }

    }
    fetchedAttendanceData()
  }, [selectedDate, dispatch])

  useEffect(() => {
    const savedPunchInData = localStorage.getItem('punchInData');
    const savedPunchOutDetail = localStorage.getItem('punchOutDetail');

    if (savedPunchInData) setPunchInData(JSON.parse(savedPunchInData));
    if (savedPunchOutDetail) setPunchOutDetail(JSON.parse(savedPunchOutDetail));
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserDetail(JSON.parse(storedUser));
    }
  }, []);

  const getDateRange = (start) => {
    let dates = [];
    for (let i = 0; i < 5; i++) {
      const newDate = addDays(start, i);
      if (format(newDate, 'MM') === format(start, 'MM')) {
        dates.push(newDate);
      }
    }
    return dates;
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setSelectedMonth(newMonth);
    const newDate = setMonth(setYear(new Date(), selectedYear), newMonth)
    setCurrentDate(newDate);
    setCurrentRangeStart(startOfMonth(newDate))
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setSelectedYear(newYear);
    const newDate = setYear(setMonth(new Date(), selectedMonth), newYear);
    setCurrentDate(newDate);
    setCurrentRangeStart(startOfMonth(newDate));
  };

  const handlePrevious = () => {
    const newStart = addDays(currentRangeStart, -5);
    if (newStart >= startOfMonth(currentDate)) {
      setCurrentRangeStart(newStart);
    }
  };

  const handleNext = () => {
    const newStart = addDays(currentRangeStart, 5);
    if (newStart <= endOfMonth(currentDate)) {
      setCurrentRangeStart(newStart);
    }
  };

  const dates = getDateRange(currentRangeStart);
  const isNextDisabled = format(dates[dates.length - 1], 'yyyy-MM-dd') >= format(new Date(), 'yyyy-MM-dd');
  const isPreviousDisabled = format(currentRangeStart, 'yyyy-MM-dd') <= format(startOfMonth(currentDate), 'yyyy-MM-dd');

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
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  // const getPublicIP = async () => {
  //   try {
  //     const response = await fetch('https://api.ipify.org?format=json');
  //     const data = await response.json();
  //     return data.ip;
  //   } catch (error) {
  //     console.error("Error fetching IP address:", error);
  //     return null;
  //   }
  // };

  const handlePunchIn = async () => {
    try {
      const location = await getLocation()
      const punchInRes = await dispatch(punchInDatas({ latitude: location.latitude, longitude: location.longitude }))
      const getInstant = await dispatch(getData({ date: new Date }))
      setDataPunchIn(getInstant?.payload)
      console.log("getInstant>>>>>", getInstant)
      setPunchInData(punchInRes?.payload);
      localStorage.setItem('punchInData', JSON.stringify(punchInRes?.payload));

      toast.success(punchInRes?.payload?.message)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePunchOut = async () => {
    try {
      // const ip = await getPublicIP();  
      const location = await getLocation();
      // console.log("location>>>", location)
      const punchOutRes = await dispatch(punchOutData({ latitude: location.latitude, longitude: location.longitude }));
      setPunchOutDetail(punchOutRes?.payload);
      localStorage.setItem('punchOutDetail', JSON.stringify(punchOutRes?.payload));
      toast.success(punchOutRes?.payload?.message);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectedDate = (date) => {
    const formatDate = format(date, "yyyy-MM-dd")
    setSelectedDate(formatDate)
  }

  return (
    <>
      {
        userDetail?.data?.accessId === 2 &&
        (
          <>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <div className="mt-10 bg-white shadow-2xl w-[100%] sm:w-[80%] m-auto rounded-2xl p-10">
              <div className="flex items-center justify-center flex-col">
                <div className="flex justify-center sm:justify-start w-full pl-5 mb-5 gap-3">
                  <select
                    className="p-2 bg-dashboardUserBg text-dashboard rounded-3xl font-bold cursor-pointer"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                  >
                    {Config?.monthsArray?.map((month, index) => (
                      <option key={index} value={index} className='bg-dashboardUserBg text-dashboard cursor-pointer'>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    className="p-2 bg-dashboardUserBg text-dashboard rounded-3xl font-bold cursor-pointer"
                    value={selectedYear}
                    onChange={handleYearChange}
                  >
                    {Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i).map((year) => (
                      <option key={year} value={year} className='bg-dashboardUserBg text-dashboard'>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-3">
                  {dates.map((date, index) => (
                    <div
                      key={index}
                      className={`flex group hover:shadow-lg mx-1 text-black transition-all rounded-xl cursor-pointer justify-center w-[90px] sm:w-[150px] ${format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'bg-dashboardUserBg shadow-lg text-black border-t-4 border-t-dashboard' : 'bg-attendanceDate border-t-4 border-t-[#688f68]'} ${selectedDate === format(date, 'yyyy-MM-dd') ? "border-t-red-600" : ""}`}
                      onClick={() => handleSelectedDate(date)}
                    >
                      <div className="flex items-center px-6 py-4">
                        <div className="text-center">
                          <p className={`text-sm ${format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'text-black font-semibold' : 'text-gray-900'}`}>
                            {format(date, 'EEEE')}
                          </p>
                          <p className={`mt-3 font-bold ${format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'text-black' : 'text-gray-900'}`}>
                            {format(date, 'd')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='flex w-full justify-between items-center mt-4'>
                  <button
                    className="px-4 py-2 rounded transition-all"
                    onClick={handlePrevious}
                    disabled={isPreviousDisabled}
                  >
                    <GrCaretPrevious />
                  </button>
                  <hr className='bg-gray-500 h-[1px] w-full' />
                  <button
                    className="px-4 py-2 rounded transition-all"
                    onClick={handleNext}
                    disabled={isNextDisabled}
                  >
                    <GrCaretNext />
                  </button>
                </div>
              </div>

              <div className='flex flex-col mt-5 justify-center items-center gap-4'>
                <div className='flex bg-dashboardUserBg justify-between items-center px-5 py-5 rounded-2xl  md:w-[50%] gap-[9px] text-[9px] sm:text-sm sm:gap-0 m-auto'>
                  {
                    attendance?.records?.length > 0 ? (
                      <ul>
                        <li className='text-bodyTextColor font-semibold'>Punch In :</li>
                        <li className='text-bodyTextColor font-semibold'>Punch Out :</li>
                        <li className='text-bodyTextColor font-semibold'>Working Hours :</li>
                      </ul>
                    ) : (
                      null
                    )
                  }
                  <ul>
                    {
                      isSameDay(selectedDate, new Date()) ? (
                        <>
                          <li className="text-bodyTextColor font-semibold">
                            {punchInData?.data?.punchIn && moment(punchInData?.data?.punchIn).format('MMM Do YYYY, h:mm:ss a')}
                          </li>
                          <li className="text-bodyTextColor font-semibold">
                            {punchOutDetail?.data?.punchOut && moment(punchOutDetail?.data?.punchOut).format('MMM Do YYYY, h:mm:ss a')}
                          </li>
                          <li className="text-bodyTextColor font-semibold">{punchOutDetail?.workedHours}</li>
                        </>
                      ) : (
                        <>
                          {attendance?.records?.length > 0 ? (
                            <>
                              <li className='text-bodyTextColor font-semibold'>
                                {attendance?.records?.[0]?.punchIn ? moment(attendance?.records[0]?.punchIn).format('MMM Do YYYY, h:mm:ss a') : 'N/A'}
                              </li>
                              <li className='text-bodyTextColor font-semibold'>
                                {attendance?.records?.[0]?.punchOut ? moment(attendance?.records[0]?.punchOut).format('MMM Do YYYY, h:mm:ss a') : 'N/A'}
                              </li>
                              <li className='text-bodyTextColor font-semibold'>
                                {attendance?.records?.[0]?.hours || 'N/A'}
                              </li>
                            </>
                          ) : (
                            <div className='w-full'>
                              <p className='text-center'>
                                {attendance?.message}
                              </p>
                            </div>
                          )
                          }
                        </>
                      )
                    }
                  </ul>
                </div>
                <div className='flex justify-center items-center gap-2 w-[100%] md:w-[50%]'>
                  {
                    isSameDay(selectedDate, new Date()) && (
                      <>
                        <button className="text-white bg-dashboard hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-[10px] w-full sm:w-auto px-5 py-2.5 text-center md:w-[40%] md:text-sm cursor-pointer"
                          onClick={handlePunchIn}
                          disabled={punchInData?.data?.isPunchIn === true}
                        >
                          {
                            isPunching ? (
                              <CustomLoader loading={isPunching} color={"#ffffff"} size={10} />
                            ) : "Punch In"
                          }

                        </button>
                        <button className="text-white bg-dashboard hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-[10px] w-full sm:w-auto px-5 py-2.5 text-center md:w-[40%] md:text-sm cursor-pointer"
                          onClick={handlePunchOut}
                          disabled={punchOutDetail?.data?.isPunchOut === true}
                        >
                          {
                            isPunchout ? (
                              <CustomLoader loading={isPunchout} color={"#ffffff"} size={10} />
                            ) : "Punch Out"
                          }
                        </button>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          </>
        )
      }
      {
        userDetail?.data?.accessId === 1 && <AllUsers />
      }
    </>
  );
};

export default AttendanceCalendar;
