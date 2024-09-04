"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddLeave from '@/components/admin/AddLeave';
import { fetchLeave, deleteLeave } from '@/redux/slices/leaveSlice';
import { LuFileEdit } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import UpdateLeave from "@/components/admin/UpdateLeave";
import { toast, ToastContainer } from 'react-toastify';
import CustomAlert from '@/components/admin/CustomAlert';
import { CustomLoader } from '@/components/CustomLoader';
import moment from "moment";
import { openAddLeaveModal, openDeleteLeaveModal, openDeleteSuccessModal, openEditLeaveModal, openQueryModal } from '@/redux/slices/uiSlice';
import SuccessModal from "@/components/admin/SuccessLottie";
import { motion } from "framer-motion"
import Link from "next/link";
import * as Config from "@/helpers/admin/config"
import ViewHolidays from "@/components/ViewHoliday";




const Page = () => {
  const dispatch = useDispatch();
  const { leave, loading, error } = useSelector((state) => state.leave);
  const { isAddLeaveModal, isDeleteLeaveModal, isDeleteSuccessModal, isDeleteLeaveID, isEditLeaveModal } = useSelector((state) => state.ui);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedQueryData, setSelectedQueryData] = useState(null);
  const [isreason, setIsreason] = useState(false);
  const [fullQuery, setFullQuery] = useState("");

  const [isClicked, setIsClicked] = useState(false)

  const toggleNavbar = () => {
    setIsClicked(!isClicked)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getRemarkColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-premature';
      case 'Approved':
        return 'bg-mature';
      case 'Reject':
        return 'bg-dead';
      default:
        return 'bg-gray-500';
    }
  };

  //const openEditModal = (leaveItem) => {
  // setSelectedQueryData(leaveItem);
  // setIsEditModalOpen(true);
  //};

  // const closeEditModal = () => {
  //setSelectedQueryData(null);
  // setIsEditModalOpen(false);
  //};

  const handleDelete = async () => {
    console.log("clicked delete");
    if (isDeleteLeaveID) {
      try {
        await dispatch(deleteLeave(isDeleteLeaveID)).unwrap();
        dispatch(openDeleteLeaveModal(false));
        dispatch(fetchLeave());
        dispatch(openDeleteSuccessModal(true))
      } catch (error) {
        toast.error('Failed to delete leave!');
      }
    }
  };

  useEffect(() => {
    dispatch(fetchLeave());
  }, [dispatch]);

  return (
    <>
    <div className="flex justify-end w-[98%] m-auto mt-3">
            <div className="text-end">
              {user?.data?.accessId !== 1 ? (
                <button
                  onClick={() => dispatch(openAddLeaveModal(true))}
                  className='bg-dashboard text-default text-sm text-center py-2 px-2  rounded-3xl my-3 text-[12px]'
                >
                  Apply Leave
                </button>
              ) : null}
            </div>
           
          </div>
       <ViewHolidays/>
      <div className="p-4 h-[85vh] flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading ? (
        <CustomLoader loading={loading} color={"#0146cf"} size={15} />
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <>
          
          
         

          <div className="flex-1 overflow-y-auto rounded-3xl shadow-xl scrollbar-hide mt-2 ">
            <table className="min-w-full bg-white text-sm">
              <thead className="z-20 sticky top-0">
                <tr className="bg-gray-200">
                  <th className="py-2 border-b min-w-[100px]">Name</th>
                  <th className="py-2 border-b min-w-[100px]">Leave Type</th>
                  <th className="py-2 border-b min-w-[150px]">Start Date</th>
                  <th className="py-2 border-b min-w-[150px]">End Date</th>
                  <th className="py-2 border-b min-w-[100px]">Applied Date</th>
                  <th className="py-2 border-b min-w-[150px]">Status</th>
                  <th className="py-2 border-b min-w-[150px]">Reason</th>
                  <th className="py-2 border-b min-w-[100px] text-center">Approved By</th>
                  <th className="py-2 border-b min-w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody className='z-10'>
                {(leave && Array.isArray(leave) ? leave : []).map((leaveItem, index) => (
                  <tr key={index}>
                    <td className="py-2 border-b text-[12px] text-center">{leaveItem?.userId?.firstName}</td>
                    <td className="py-2 border-b text-[12px] text-center">{leaveItem?.leaveType}</td>
                    <td className="py-2 border-b text-[12px] text-center min-w-[150px]">{moment(leaveItem?.startDate).format('LL')}</td>
                    <td className="py-2 border-b text-[12px] text-center min-w-[150px]">{moment(leaveItem?.endDate).format('LL')}</td>
                    <td className="py-2 border-b text-[12px] text-center">{moment(leaveItem?.appliedDate).format('LL')}</td>
                    <td className="py-2 text-[12px] border-b text-center">
                      <span className={`py-1 px-2 text-default rounded-3xl ${getRemarkColor(leaveItem?.status)}`}>
                        {leaveItem?.status}
                      </span>
                    </td>
                    <td className="py-2 text-[12px] border-b text-center ">
                      {leaveItem?.reason?.length > 50 ? (
                        <>
                          {leaveItem?.reason.slice(0, 50)}...
                          <button
                            className="text-blue-500 underline ml-1"
                            onClick={() => setIsreason(true) && setFullQuery(leaveItem?.reason)}
                          >
                            View More
                          </button>
                        </>
                      ) : (
                        leaveItem?.reason
                      )}
                    </td>
                    <td className="py-2 border-b text-[12px] text-center">{leaveItem?.approvedBy?.firstName}</td>
                    <td className="py-2 border-b text-[12px] text-center">
                      <div className='flex gap-3 justify-center items-center'>
                        {
                          user?.data?.accessId !== 2 ? (
                            <button
                              className="text-[#3577f1] border border-[#3577f1] p-1 rounded-md hover:bg-[#3577f1] hover:text-white hover:border-[#FFFFFF]"
                              onClick={() => dispatch(openEditLeaveModal(leaveItem))}
                            >
                              <LuFileEdit className='h-4 w-4' />
                            </button>
                          ) : (
                            null
                          )
                        }

                        {user?.data?.accessId === 2 ? (
                          <button
                            className="text-red-500 border border-[#ef4444] p-1 rounded-md hover:bg-[#ef4444] hover:text-white hover:border-[#FFFFFF]"
                            onClick={() => dispatch(openDeleteLeaveModal(leaveItem._id))}
                          >
                            <RiDeleteBin5Line className='h-4 w-4' />
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <AddLeave
              onClose={() => dispatch(openAddLeaveModal(false))}
              isLeaveOpen={isAddLeaveModal}
              onSuccess={() => setIsSuccessModalVisible(true)}
            />
            <UpdateLeave
              isOpen={isEditLeaveModal}
              onClose={() => dispatch(openEditLeaveModal(false))}
              queryData={selectedQueryData}
            />
            <CustomAlert
              isOpen={isDeleteLeaveModal}
              onClose={() => dispatch(openDeleteLeaveModal(false))}
              title="Are you sure?"
              description="Are you sure you want to delete this leave request?"
              confirmButtonText={loading ? <CustomLoader size={5} color={"#ffffff"} /> : "Yes I'm sure"}
              cancelButtonText="No, cancel"
              onConfirm={handleDelete}
            />
            <SuccessModal isOpen={isDeleteSuccessModal} onClose={() => dispatch(openDeleteSuccessModal(false))} title={"Leave Deleted Successfully."} />
            <SuccessModal isOpen={isSuccessModalVisible} onClose={() => setIsSuccessModalVisible(false)} title={"Leave Applied Successfully."} />
            
          </div>
        </>
      )}
    </div>
    </>
  
  );
};

export default Page;
