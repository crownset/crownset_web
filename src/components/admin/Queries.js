"use client"
import React, { useEffect, useState } from 'react'
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';
import { BeatLoader } from 'react-spinners';

const Queries = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 h-full "w-64" bg-default text-black transition-all duration-300 ease-in-out z-10 flex flex-col shadow-md`}
    >
      <div className="flex-1 flex flex-col p-4">
        {user ? (

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">User Details</h2>
            <p className="text-sm">Access Id : {user?.data?.accessId}</p>
            <p className="text-sm">Name : {user?.data?.firstName} {user?.data?.lastName}</p>
            <p className="text-sm">Email : {user?.data?.email}</p>
            <p className="text-sm">Date Of Birth : {user?.data?.dob}</p>
            <p className="text-sm">Date Of Joining : {user?.data?.doj}</p>
            <p className="text-sm">Designation : {user?.data?.designation}</p>
          </div>) : (
          <div className="flex justify-center items-center h-full">
            <BeatLoader
              color={"#0146cf"}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Queries
