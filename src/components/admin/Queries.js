"use client"
import React, { useEffect, useState } from 'react';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';
import { BeatLoader } from 'react-spinners';
import { FaUser, FaEnvelope, FaBirthdayCake, FaCalendarAlt, FaIdBadge, FaUserTie } from 'react-icons/fa'; // Importing icons

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
      className={`hidden fixed top-0 right-0 h-full w-64 bg-default text-black transition-all duration-300 ease-in-out z-10 md:flex flex-col shadow-md`}
    >
      <div className="flex-1 flex flex-col p-4">
        {user ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <FaUser className="text-lg" />
              <span>User Details</span>
            </h2>
            <div className="flex items-center space-x-2">
              <FaIdBadge className="text-sm" />
              <p className="text-sm font-semibold text-bodyTextColor">Access Id: {user?.data?.accessId}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
                {user?.data?.firstName?.charAt(0)}
              </div>
              <p className="text-sm font-semibold text-bodyTextColor">
                Name: {user?.data?.firstName} {user?.data?.lastName}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-sm" />
              <p className="text-sm font-semibold text-bodyTextColor">Email: {user?.data?.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaBirthdayCake className="text-sm" />
              <p className="text-sm font-semibold text-bodyTextColor">Date Of Birth: {user?.data?.dob}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-sm" />
              <p className="text-sm font-semibold text-bodyTextColor">Date Of Joining: {user?.data?.doj}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaUserTie className="text-sm " />
              <p className="text-sm font-semibold text-bodyTextColor" >Designation: {user?.data?.designation}</p>
            </div>
          </div>
        ) : (
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

export default Queries;
