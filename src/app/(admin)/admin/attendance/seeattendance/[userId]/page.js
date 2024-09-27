"use client";
import { getDataAll } from '@/redux/slices/attendanceSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString(); // Output: "MM/DD/YYYY" format
};

const formatTime = (dateString) => {
    const dateObject = new Date(dateString);
    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero
    return `${hours}:${minutesFormatted} ${ampm}`; // Output: "12:34 PM"
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
    //console.log("userId", userId);

    const dispatch = useDispatch();
    const { attendance, loading, error } = useSelector(state => state.attendance);
    const [selectedMonth, setSelectedMonth] = useState(""); // State for selected month
    const [selectedYear, setSelectedYear] = useState("");

    const Attendance_data = attendance?.all;
    // console.log("Attendance_data", Attendance_data);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const responseAllData = await dispatch(getDataAll({ userId }));
                //console.log("responseAllData", responseAllData);  
            } catch (error) {
                toast.error("Error fetching attendance data");
            }
        };

        fetchAttendance();
    }, [dispatch, userId]);

    const filteredData = Attendance_data?.filter(item => {
        const punchInDate = new Date(item.punchIn);
        const month = punchInDate.getMonth() + 1; // Months are 0-based in JS
        const year = punchInDate.getFullYear();

        const matchesMonth = selectedMonth ? month === parseInt(selectedMonth) : true;
        const matchesYear = selectedYear ? year === parseInt(selectedYear) : true;

        return matchesMonth && matchesYear;
    });
    const yearOptions = generateYears(5);

    return (
        <div className="flex-1 overflow-y-auto rounded-3xl shadow-xl scrollbar-hide   mt-10 mx-10">

            <div className="flex justify-start gap-4 py-4 ml-6">
                {/* Month Filter */}
                <select
                    className="border px-4 py-2 rounded-md outline-none"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
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

                {/* Year Filter */}
                <select
                    className="border px-4 py-2 rounded-md outline-none"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
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
    );
};

export default Page;
