"use client"
import React, { useState } from 'react';
import { format, addDays, startOfMonth, endOfMonth, setMonth, setYear } from 'date-fns';
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import * as Config from "@/helpers/admin/config"
import { useDispatch, useSelector } from 'react-redux';
import { punchInDatas, punchOutData } from '@/redux/slices/attendanceSlice';

const AttendanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  console.log("selectedYear", selectedYear)
  const [currentRangeStart, setCurrentRangeStart] = useState(startOfMonth(currentDate));
  const { attendance, isPunching, isPunchout } = useSelector((state) => state.attendance);
  const dispatch = useDispatch()


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
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const handlePunchIn = async () => {
    try {
      const location = await getLocation()
      console.log("location>>", location)
      const punchInRes = await dispatch(punchInDatas({ latitude: location.latitude, longitude: location.longitude }))
      console.log("punchInRes>>", punchInRes)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePunchOut = async () => {
    try {
      const location = await getLocation()
      const punchOutRes = await dispatch(punchOutData({ latitude: location.latitude, longitude: location.longitude }))
      console.log("punchOutRes>>>", punchOutRes)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-10 bg-white shadow-2xl w-[100%] sm:w-[80%] m-auto rounded-2xl p-10">
      <div className="flex items-center justify-center flex-col">
        <div className="flex justify-start w-full pl-5 mb-3 gap-3">
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
              className={`flex group hover:shadow-lg mx-1 text-black transition-all rounded-xl cursor-pointer justify-center w-[100px] sm:w-[150px] 
                ${format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'bg-dashboardUserBg shadow-lg text-black border-t-4 border-t-dashboard' : 'bg-attendanceDate border-t-4 border-t-[#688f68]'}`}
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
        <div className='flex bg-dashboardUserBg justify-between items-center px-5 py-5 rounded-2xl md:w-[50%] lg:w-[40%] m-auto'>
          <ul>
            <li className='text-bodyTextColor font-semibold'>Punch In :</li>
            <li className='text-bodyTextColor font-semibold'>Punch Out :</li>
            <li className='text-bodyTextColor font-semibold'>Working Hours :</li>
          </ul>
          <ul>
            <li className='text-bodyTextColor font-semibold'>test</li>
            <li className='text-bodyTextColor font-semibold'>test</li>
            <li className='text-bodyTextColor font-semibold'>test</li>
          </ul>
        </div>
        <div className='flex justify-center items-center gap-2 w-[100%] md:w-[50%]'>
          <button className="text-white bg-dashboard hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-[10px] w-full sm:w-auto px-5 py-2.5 text-center md:w-[40%] md:text-sm"
            onClick={handlePunchIn}>
            Punch In
          </button>
          <button className="text-white bg-dashboard hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-[10px] w-full sm:w-auto px-5 py-2.5 text-center md:w-[40%] md:text-sm"
            onClick={handlePunchOut}>
            Punch Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
