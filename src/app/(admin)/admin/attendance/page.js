"use client"
import React, { useState } from 'react';
import { format, subDays, addDays, startOfMonth, endOfMonth } from 'date-fns';
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";

const AttendanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDateRange = (date) => {
    let dates = [];
    for (let i = 4; i >= 0; i--) {
      dates.push(subDays(date, i));
    }
    return dates;
  };

  const getMonthName = (date) => {
    return format(date, 'MMMM yyyy');
  };

  const handlePrevious = () => {
    setCurrentDate(subDays(currentDate, 5));
  };

  const handleNext = () => {
    setCurrentDate(addDays(currentDate, 5));
  };

  const dates = getDateRange(currentDate);
  const currentMonth = getMonthName(currentDate);

  const isNextDisabled = format(dates[dates.length - 1], 'yyyy-MM-dd') >= format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="mt-10 bg-white shadow-2xl w-[100%] sm:w-[80%] m-auto rounded-2xl p-10">
      <div className="flex items-center justify-center flex-col">
        <div>
          <h2 className="text-xl text-center mb-3 font-bold text-gray-800">{currentMonth}</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {dates.map((date, index) => (
            <div
              key={index}
              className={`flex group hover:shadow-lg mx-1 text-black transition-all rounded-xl cursor-pointer justify-center w-[100px] sm:w-[150px] 
            ${format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'bg-dashboardUserBg shadow-lg text-black' : 'bg-attendanceDate'}`}
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
          <div>
            <button
              className="px-4 py-2 rounded transition-all"
              onClick={handlePrevious}
            >
              <GrCaretPrevious />
            </button>
          </div>
          <hr className='bg-black h-[2px] w-full' />
          <div>
            <button
              className="px-4 py-2 rounded transition-all"
              onClick={handleNext}
              disabled={isNextDisabled}
            >
              <GrCaretNext />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default AttendanceCalendar;
