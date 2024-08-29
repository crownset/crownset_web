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
      <div
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

      </div>
      <div className='w-[80%] lg:w-[50%] grid grid-cols-1 md:grid-cols-2 justify-center items-center max-md:m-auto md:ml-5  mt-5  gap-3'>
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
      </div>
    </>

  )
}

export default Queries;
