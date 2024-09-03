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
import { openQueryModal } from '@/redux/slices/uiSlice';


const Page = () => {
  const dispatch = useDispatch();
  const { leave, loading, error } = useSelector((state) => state.leave);
  const [user, setUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [selectedQueryData, setSelectedQueryData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isreason, setIsreason] = useState(false);
  const [fullQuery, setFullQuery] = useState("")

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



  const handleToggle = () => {
    setIsreason(true);
  };

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setSelectedQueryId(null);
    setIsFormVisible(false);
  };

  const openEditModal = (leaveItem) => {
    setSelectedQueryData(leaveItem);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedQueryData(null);
    setIsEditModalOpen(false);
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedQueryId(id);
    setModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedQueryId(null);
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (selectedQueryId) {
      try {
        await dispatch(deleteLeave(selectedQueryId)).unwrap();
        dispatch(fetchLeave());
        toast.success('Leave successfully deleted!');
      } catch (error) {
        toast.error('Failed to delete leave!');
      } finally {
        setModalOpen(false);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchLeave());
  }, [dispatch]);

  return (
    <div className="p-4 h-screen flex flex-col">
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
          <div className='flex justify-end w-[98%] m-auto'>
            <div className="text-end">
              <button
                onClick={handleOpenForm}
                className='bg-dashboard text-default text-sm text-center py-2 px-2 rounded-3xl my-3 text-[12px]'
              >
                Apply Leaves
              </button>
              {isFormVisible && (
                <AddLeave
                  onClose={handleCloseForm}
                />
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto rounded-3xl w-[98%] m-auto">
            <table className="w-[98%] m-auto bg-white border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 border-b min-w-[100px]">User Name</th>
                  <th className="py-2 border-b min-w-[150px]">Start Date</th>
                  <th className="py-2 border-b min-w-[150px]">End Date</th>
                  <th className="py-2 border-b min-w-[100px]">Applied Date</th>
                  <th className="py-2 border-b min-w-[150px]">Status</th>
                  <th className="py-2 border-b min-w-[150px]">Reason</th>
                  <th className="py-2 border-b min-w-[100px] text-center">Approved By</th>
                  <th className="py-2 border-b min-w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(leave && Array.isArray(leave) ? leave : []).map((leaveItem, index) => (
                  <tr key={index}>
                    <td className="py-2 border-b text-[12px] text-center">{leaveItem?.userId?.firstName}</td>
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
                            onClick={() => handleToggle(setIsreason(true), setFullQuery(leaveItem?.reason))}
                          >View More
                          </button>
                        </>
                      ) : (
                        leaveItem?.reason
                      )}
                    </td>
                    <td className="py-2 border-b text-[12px] text-center">{leaveItem?.approvedBy?.firstName}</td>
                    <td className="py-2 border-b text-[12px] text-center">
                      <div className='flex gap-3 justify-center items-center -z-10'>
                        <button
                          className="text-[#3577f1] border border-[#3577f1] p-1 rounded-md hover:bg-[#3577f1] hover:text-white hover:border-[#FFFFFF] translate-x-1"
                          onClick={() => openEditModal(leaveItem)}
                        >
                          <LuFileEdit className='h-4 w-4' />
                        </button>
                        {
                          user?.data?.accessId === 2 ? (
                            <button
                              className="text-red-500 border border-[#ef4444] p-1 rounded-md hover:bg-[#ef4444] hover:text-white hover:border-[#FFFFFF] translate-x-1"
                              onClick={() => handleOpenDeleteModal(leaveItem._id)}
                            >
                              <RiDeleteBin5Line className='h-4 w-4' />
                            </button>
                          ) : (
                            null
                          )
                        }

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <UpdateLeave isOpen={isEditModalOpen} onClose={closeEditModal} queryData={selectedQueryData} />
            <CustomAlert
              isOpen={isModalOpen}
              onClose={handleCloseDeleteModal}
              title="Are you sure?"
              description="Are you sure you want to delete this leave request?"
              confirmButtonText={loading ? <CustomLoader size={10} loading={loading} color={"#FFFFFF"} /> : "Yes, I'm sure"}
              cancelButtonText="No, cancel"
              onConfirm={handleDelete}
            />
            {isreason && (
              <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 py-2">
                <div className="bg-white p-6 rounded-lg w-[90%] max-w-xl h-[400px] overflow-hidden">
                  <h2 className="text-lg font-bold mb-4">Full Query</h2>
                  <div className="overflow-y-auto h-[300px]">
                    <p className="text-sm">{fullQuery}</p>
                  </div>
                  <div className="text-right mb-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 mb-10 rounded hover:bg-blue-600"
                      onClick={() => setIsreason(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
