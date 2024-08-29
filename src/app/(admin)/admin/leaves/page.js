"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddLeave from '@/components/admin/AddLeave';
import { fetchLeave } from '@/redux/slices/leaveSlice';



const Page = () => {
  const dispatch = useDispatch();
  const { leave } = useSelector((state) => state.leave);
  //console.log("leaves", leave)

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleOpenForm = () => setIsFormVisible(true);
  const handleCloseForm = () => setIsFormVisible(false);

  useEffect(() => {
    dispatch(fetchLeave());
    // console.log(leaves);
  }, [dispatch]);

  return (
    <>
      <div className='flex justify-end w-[98%] m-auto'>
        <div className="text-end">
          <button
            onClick={handleOpenForm}
            className='bg-dashboard text-default text-sm text-center py-2 px-2 rounded-3xl my-3 text-[12px]'
          >
            Apply Leaves
          </button>
          {isFormVisible && <AddLeave onClose={handleCloseForm} />}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto rounded-3xl w-[98%] m-auto">
        <table className="w-[98%] m-auto bg-white border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 border-b min-w-[100px]">userName</th>
              <th className="py-2 border-b min-w-[150px]">startDate</th>
              <th className="py-2 border-b min-w-[100px]">endDate</th>
              <th className="py-2 border-b min-w-[100px]">appliedDate</th>
              <th className="py-2 border-b min-w-[150px]">status</th>
              <th className="py-2 border-b min-w-[100px] text-center">approvedBy</th>
              <th className="py-2 border-b min-w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody>

            {(leave && Array.isArray(leave) ? leave : []).map((leave, index) => (
              <tr key={leave.index}>
                <td className="py-2 border-b">{leave?.userId?.firstName}</td>
                <td className="py-2 border-b">{leave?.startDate}</td>
                <td className="py-2 border-b">{leave?.endDate}</td>
                <td className="py-2 border-b">{leave?.appliedDate}</td>
                <td className="py-2 border-b">{leave?.status}</td>
                <td className="py-2 border-b">{leave?.approvedBy?.firstName}</td>
                <td className="py-2 border-b">Actions</td>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
