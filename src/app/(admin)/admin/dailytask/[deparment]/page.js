"use client";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { assignUsers } from '@/redux/slices/userSlice';

const DepartmentUsers = ({ params }) => {
    const deparment = decodeURIComponent(params.deparment); // Fetch department from URL params
    // console.log("department", deparment)
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user); // Extract users and loading state from Redux
    // console.log("departmentuser", user)

    useEffect(() => {
        // Fetch users when the component is mounted
        dispatch(assignUsers());
    }, [dispatch]);

    // Filter users based on the department
    const filteredUsers = user.filter((user) => user.department === deparment);
    // console.log("filteredUsers", filteredUsers)

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='bg-default shadow-xl  rounded-2xl w-[95%] mt-10 md:px-3 md:py-3 flex  flex-col gap-2 m-auto md:h-[50vh]'>
            <div>
                <h1>Department :- {deparment}</h1>
            </div>
            <div className='w-full md:flex md:justify-between gap-2 md:items-start'>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div className='flex flex-col cursor-pointer justify-center items-center bg-dashboardUserBg px-2 py-2 rounded-2xl md:px-3 md:py-3'>
                            <div className='ml-1'>{user.firstName}</div>
                        </div>
                    ))
                ) : (
                    <p>No users found in {deparment} department.</p>
                )}
            </div>
        </div>
    );
};

export default DepartmentUsers;
