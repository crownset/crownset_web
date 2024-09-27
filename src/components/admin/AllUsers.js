"use client";
import { useDispatch, useSelector } from 'react-redux';
import {useState, useEffect, useCallback } from 'react';
import { assignUsers } from '@/redux/slices/userSlice';
import { CustomLoader } from '@/components/CustomLoader';
import { useRouter } from 'next/navigation';

const AllUsers = () => {

  const dispatch = useDispatch();
    
    const { user, loading } = useSelector((state) => state.user); 
    const [filteredUser,setFilteredUser] = useState([]);
    const [originalUser,setOriginalUser] = useState([]);

    const router = useRouter();

    
    useEffect(() => {
        dispatch(assignUsers());

        
    }, [dispatch]);

    useEffect(() => {
        if (user?.length > 0) {
          setOriginalUser(user);
          setFilteredUser(user.filter((u) => u.accessId === 2)); // Filtering users with accessId === 2
        }
      }, [user]); 

  
    const handleAttendanceView = (id) => {
    
        router.push(`/admin/attendance/seeattendance/${id}`)
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
                        {filteredUser?.length > 0 ? (
                            filteredUser.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex cursor-pointer flex-col justify-center items-center bg-dashboardUserBg px-4 py-3 rounded-2xl text-center shadow-md"
                                    onClick={() => handleAttendanceView(user?._id)} 
                                >
                                    <div className="text-lg font-medium">{user?.firstName}</div>
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

export default AllUsers;
