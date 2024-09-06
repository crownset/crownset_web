"use client"
import React, { useEffect, useState } from 'react';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';
import { BeatLoader } from 'react-spinners';
import { FaUser, FaEnvelope, FaBirthdayCake, FaCalendarAlt, FaIdBadge, FaUserTie } from 'react-icons/fa';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { Chart as ChartJS } from "chart.js/auto"
import { Bar, Doughnut, Line, PolarArea } from "react-chartjs-2"
import * as Config from "@/helpers/admin/config"

const Queries = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <div className='bg-default shadow-xl  rounded-2xl w-[95%] mt-10 md:px-3 md:py-3 flex justify-center items-center m-auto md:h-[50vh]'>
        <div className='w-full md:flex md:justify-between md:items-start'>
          {/* Left side (First Letter and Name) */}
          <div className='flex flex-col justify-center items-center gap-1 md:w-[30%]  md:m-auto'>
            <div className='bg-dashboardUserBg text-4xl text-gray-600 rounded-full w-16 h-16 md:w-20 md:h-20 flex justify-center items-center'>
              {user?.data?.firstName.charAt(0)}
            </div>
            <div className='mt-2 text-center'>
              {user?.data?.firstName} {user?.data?.lastName}
            </div>
          </div>
          {/* HR divider for small screens */}
          <hr className='md:hidden w-[90%] m-auto border-none h-[0.25px] bg-gray-600 mt-2' />
          {/* Right side (User details) */}
          <div className='mt-3 mb-3 grid grid-cols-2 md:grid-cols-3 gap-4 text-[10px] sm:text-[13px] w-[95%] md:w-[70%] m-auto md:m-0'>
            <div className='flex flex-col justify-center items-center bg-dashboardUserBg px-2 py-2 rounded-2xl'>
              <div>Access Id:</div>
              <div className='ml-1'>{user?.data?.accessId}</div>
            </div>
            <div className='flex flex-col justify-center items-center bg-dashboardUserBg px-2 py-2 md:px-3 md:py-3 rounded-2xl'>
              <div>Name:</div>
              <div className='ml-1'>{user?.data?.firstName} {user?.data?.lastName}</div>
            </div>
            <div className='flex flex-col justify-center items-center bg-dashboardUserBg px-2 py-2 rounded-2xl md:px-3 md:py-3'>
              <div>UID:</div>
              <div className='ml-1'>{user?.data?.uid}</div>
            </div>
            <div className='flex flex-col justify-center items-center bg-dashboardUserBg px-2 py-2 rounded-2xl md:px-3 md:py-3'>
              <div>Email:</div>
              <div className='ml-1'>{user?.data?.email}</div>
            </div>
            <div className='flex flex-col justify-center items-center bg-dashboardUserBg px-2 py-2 rounded-2xl md:px-3 md:py-3'>
              <div>Designation:</div>
              <div className='ml-1'>{user?.data?.designation}</div>
            </div>
            <div className='flex flex-col justify-center items-center bg-dashboardUserBg px-2 py-2 rounded-2xl md:px-3 md:py-3'>
              <div>Leave Balance:</div>
              <div className='ml-1'>{user?.data?.leaveBalance}</div>
            </div>
            <div className='flex flex-col justify-center items-center bg-dashboardUserBg px-2 py-2 rounded-2xl md:px-3 md:py-3'>
              <div>Date of Joining:</div>
              <div className='ml-1'>{user?.data?.doj}</div>
            </div>
            <div className='flex flex-col justify-center items-center bg-dashboardUserBg px-2 py-2 rounded-2xl md:px-3 md:py-3'>
              <div>Date of Birth:</div>
              <div className='ml-1'>{user?.data?.dob}</div>
            </div>
            <div className='flex flex-col justify-center items-center bg-dashboardUserBg px-2 py-2 rounded-2xl md:px-3 md:py-3'>
              <div>Department:</div>
              <div className='ml-1'>{user?.data?.department}</div>
            </div>
          </div>
        </div>
      </div>




      {/* <div
        className={`hidden fixed top-0 right-0 h-full w-64 bg-dashboardUserBg text-black transition-all duration-300 ease-in-out z-10   flex-col shadow-md`}
      >
        <div className='bg-dashboard h-1/2 flex justify-center items-center m-auto w-[95%] rounded-3xl'>

          <div className="flex-1 flex flex-col p-4 text-default ">
            {user ? (
              <div className="space-y-4">
                <h2 className="text-lg  flex items-center space-x-2">
                  <FaUser className="text-lg" />
                  <span>User Details</span>
                </h2>
                <div className="flex items-center space-x-2">
                  <FaIdBadge className="text-sm" />
                  <p className="text-sm  text-default ">Access Id: {user?.data?.accessId}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <MdOutlineDriveFileRenameOutline className="text-sm" />
                  <p className="text-sm  text-default">
                     {user?.data?.firstName} {user?.data?.lastName}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-sm" />
                  <p className="text-sm  text-default">Email: {user?.data?.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaBirthdayCake className="text-sm" />
                  <p className="text-sm  text-default">Date Of Birth: {user?.data?.dob}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-sm" />
                  <p className="text-sm  text-default">Date Of Joining: {user?.data?.doj}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUserTie className="text-sm " />
                  <p className="text-sm  text-default" >Designation: {user?.data?.designation}</p>
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
      </div> */}
      {/* <div className='w-[80%] lg:w-[50%] grid grid-cols-1 md:grid-cols-2 justify-center items-center max-md:m-auto md:ml-5  mt-5  gap-3'>
        <div className='bg-white w-full shadow-xl flex justify-center items-center px-3 py-3 rounded-3xl '>
          <Doughnut
            data={{
              labels: Config?.DoughnutChartData.map((data) => data?.lable),
              datasets: [
                {
                  lable: "count",
                  data: Config?.DoughnutChartData.map((data) => data?.value),
                  backgroundColor: [
                    'rgb(38, 147, 70)',
                    'rgb(244, 186, 19)',
                    'rgb(214, 51, 40)'
                  ],
                  borderColor: [
                    'rgb(38, 147, 70)',
                    'rgb(244, 186, 19)',
                    'rgb(214, 51, 40)'
                  ],
                }
              ]
            }}
          />
        </div>
        <div className='bg-white w-full shadow-xl flex justify-center items-center px-3 py-3 rounded-3xl '>
          <Doughnut
            data={{
              labels: Config?.FollowUpChart.map((data) => data?.lable),
              datasets: [
                {
                  lable: "count",
                  data: Config?.FollowUpChart.map((data) => data?.value),
                  backgroundColor: [
                    'rgb(77, 126, 221)',
                    'rgb(98, 3, 55)',
                  ],
                  borderColor: [
                    'rgb(77, 126, 221)',
                    'rgb(98, 3, 55)',
                  ],
                }
              ]
            }}
          />
        </div>
      </div> */}
    </>

  )
}

export default Queries;
