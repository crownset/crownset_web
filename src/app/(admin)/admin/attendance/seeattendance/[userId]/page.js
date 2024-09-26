"use client";
import { getDataAll } from '@/redux/slices/attendanceSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Page = ({ params }) => {
    const { userId } = params;
    //console.log("userId", userId);
    
    const dispatch = useDispatch();
    const { attendance, loading, error } = useSelector(state => state.attendance);

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
    
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Attendance Data for User:</h1>

            {loading && <p className="text-blue-500">Loading attendance data...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {Attendance_data && Attendance_data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Attendance_data.map((item, index) => (
                        <div key={index} className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100">
                            <p className="text-lg font-semibold text-gray-700 mb-2">
                                {new Date(item.punchIn).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                            <p><strong>Punch In:</strong> {new Date(item.punchIn).toLocaleTimeString()}</p>
                            <p><strong>Punch Out:</strong> {item.punchOut ? new Date(item.punchOut).toLocaleTimeString() : 'Not yet punched out'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <p className="text-gray-500">No attendance data available.</p>
            )}
        </div>
    );
};

export default Page;
