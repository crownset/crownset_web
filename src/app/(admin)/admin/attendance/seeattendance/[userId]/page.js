"use client";
import { getDataAll } from '@/redux/slices/attendanceSlice';
import { addDays, endOfMonth, format, setMonth, setYear, startOfMonth } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Config from "@/helpers/admin/config"
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';

const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString();
};

const formatTime = (dateString) => {
    const dateObject = new Date(dateString);
    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesFormatted} ${ampm}`;
};

const generateYears = (range = 5) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - range; i <= currentYear + range; i++) {
        years.push(i);
    }
    return years;
};

const Page = ({ params }) => {
    const { userId } = params;
    const dispatch = useDispatch();
    const { attendance, loading, error } = useSelector(state => state.attendance);
    const [selectedMonthTable, setSelectedMonthTable] = useState("");
    const [selectedYearTable, setSelectedYearTable] = useState("");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [punchInData, setPunchInData] = useState(null);
    const [punchOutDetail, setPunchOutDetail] = useState(null);
    const [currentRangeStart, setCurrentRangeStart] = useState(startOfMonth(currentDate));
    const [selectedDate, setSelectedDate] = useState(new Date(), "yyyy-MM-dd")

    const Attendance_data = attendance?.all;
    console.log("Attendance_data", Attendance_data)

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const responseAllData = await dispatch(getDataAll({ userId }))
                console.log("responseAllData", responseAllData)
            } catch (error) {
                toast.error("Error fetching attendance data");
            }
        };

        fetchAttendance();
    }, [dispatch, userId]);

    const filteredData = Attendance_data?.filter(item => {
        const punchInDate = new Date(item.punchIn);
        const month = punchInDate.getMonth() + 1;
        const year = punchInDate.getFullYear();

        const matchesMonth = selectedMonthTable ? month === parseInt(selectedMonthTable) : true;
        const matchesYear = selectedYearTable ? year === parseInt(selectedYearTable) : true;

        return matchesMonth && matchesYear;
    });
    const yearOptions = generateYears(5);

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

    const handleSelectedDate = (date) => {
        const formatDate = format(date, "yyyy-MM-dd")
        setSelectedDate(formatDate)
    }

    return (
        <>
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
                                className={`flex group hover:shadow-lg mx-1 text-black transition-all rounded-xl cursor-pointer justify-center w-[90px] sm:w-[150px] ${format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'bg-dashboardUserBg shadow-lg text-black border-t-4 border-t-dashboard' : 'bg-attendanceDate border-t-4 border-t-[#688f68]'}`}
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
            </div>
            {/* table attendance data */}
            <div className="flex-1 overflow-y-auto rounded-3xl shadow-xl scrollbar-hide   mt-10 mx-10">

                <div className="flex justify-start gap-4 py-4 ml-6">
                    <select
                        className="border px-4 py-2 rounded-md outline-none"
                        value={selectedMonthTable}
                        onChange={(e) => setSelectedMonthTable(e.target.value)}
                    >
                        <option value="">All Months</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <select
                        className="border px-4 py-2 rounded-md outline-none"
                        value={selectedYearTable}
                        onChange={(e) => setSelectedYearTable(e.target.value)}
                    >
                        <option value="">All Years</option>
                        {yearOptions.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <table className="min-w-full bg-white text-sm ">
                    <thead className='sticky top-0 z-20'>
                        <tr className="bg-gray-200">
                            <th className="py-2 border-b min-w-[100px]">Date</th>
                            <th className="py-2 border-b min-w-[100px]">Punch-In</th>
                            <th className="py-2 border-b min-w-[150px]">Punch-Out</th>
                            <th className="py-2 border-b min-w-[150px]">Working Hours</th>

                        </tr>
                    </thead>
                    {filteredData?.length == 0 ? (
                        <tbody>
                            <tr>
                                <td colSpan={4} className='text-center text-3xl p-4  font-semibold italic'>No data Found</td>
                            </tr>
                        </tbody>) :
                        <tbody className='z-10'>

                            {(filteredData && Array.isArray(Attendance_data) ? Attendance_data : []).map((item, index) => (
                                <tr key={index} className="even:bg-dashboardUserBg odd:bg-default">
                                    {/* Show only punch-in date */}
                                    <td className="py-2 text-[12px] border-b text-center">{formatDate(item.punchIn)}</td>

                                    {/* Show punch-in time in AM/PM */}
                                    <td className="py-2 text-[12px] border-b text-center">{formatTime(item.punchIn)}</td>

                                    {/* Show punch-out time in AM/PM */}
                                    <td className="py-2 text-[12px] border-b text-center">{item.isPunchOut ? formatTime(item.punchOut) : 'N/A'}</td>

                                    {/* Show working hours */}
                                    <td className="py-2 text-[12px] border-b text-center">{item.hours}</td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
            </div>
        </>
    );
};

export default Page;
