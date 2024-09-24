"use client";
import { useDispatch, useSelector } from 'react-redux';
import {useState, useEffect } from 'react';
import { assignUsers } from '@/redux/slices/userSlice';
import { CustomLoader } from '@/components/CustomLoader';
import { useRouter } from 'next/navigation';
import { format } from "date-fns";
const DepartmentUsers = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
    
    const { user, loading } = useSelector((state) => state.user); 
    const router = useRouter();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        dispatch(assignUsers());
    }, [dispatch]);

  
    const handleAttendanceView = (id) => {
      const formattedDate = format(newDate, "yyyy-MM-dd");
      setDate(newDate);
      dispatch(getDataAll({ date: formattedDate }))
        router.push(`/admin/attendance/${id}`)
    };

    return (
        <>
            {loading ? (
                <CustomLoader size={10} loading={loading} color={"#FFFFFF"} />
            ) : (
                <div className="bg-default shadow-xl rounded-2xl w-[95%] mt-10 md:px-3 md:py-3 flex flex-col gap-4 m-auto md:h-[50vh]">
                    <div className="text-center">
                        <h1 className="text-xl font-bold">Users List</h1>
                    </div>

                    <div className="w-full flex flex-wrap justify-center gap-4 items-start">
                        {user?.length > 0 ? (
                            user.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex cursor-pointer flex-col justify-center items-center bg-dashboardUserBg px-4 py-3 rounded-2xl text-center shadow-md"
                                    onClick={() => handleAttendanceView(user?._id)} 
                                >
                                    <div className="text-lg font-medium">{user.firstName}</div>
                                    <div className="text-sm font-light text-gray-500">View Attendance</div>
                                </div>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentUsers;
