"use client";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { assignUsers } from '@/redux/slices/userSlice';
import { CustomLoader } from '@/components/CustomLoader';

const DepartmentUsers = ({ params }) => {
    const department = decodeURIComponent(params.deparment);
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(assignUsers()); 
    }, [dispatch]);

    const filteredUsers = user.filter((user) => user.department === department);
    console.log("filteredUsers", filteredUsers)

    return (
        <>
            {
                loading ? <CustomLoader size={10} loading={loading} color={"#FFFFFF"} /> : (
                    <>
                        <div className="bg-default shadow-xl rounded-2xl w-[95%] mt-10 md:px-3 md:py-3 flex flex-col gap-4 m-auto md:h-[50vh]">
                            <div className="text-center">
                                <h1 className="text-xl font-bold">Department: {department}</h1>
                            </div>
                            <div className="w-full flex flex-wrap justify-center gap-4 items-start">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex cursor-pointer flex-col justify-center items-center bg-dashboardUserBg px-4 py-3 rounded-2xl text-center shadow-md"
                                        >
                                            <div className="text-lg font-medium">{user.firstName}</div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No users found in {department} department.</p>
                                )}
                            </div>
                        </div>
                    </>
                )
            }
        </>


    );
};

export default DepartmentUsers;
