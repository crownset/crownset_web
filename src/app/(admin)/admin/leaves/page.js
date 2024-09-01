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

const Page = () => {
  const dispatch = useDispatch();
  const { leave, loading, error } = useSelector((state) => state.leave);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [selectedQueryData, setSelectedQueryData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

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
    <>
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
                  <th className="py-2 border-b min-w-[100px]">End Date</th>
                  <th className="py-2 border-b min-w-[100px]">Applied Date</th>
                  <th className="py-2 border-b min-w-[150px]">Status</th>
                  <th className="py-2 border-b min-w-[100px] text-center">Approved By</th>
                  <th className="py-2 border-b min-w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(leave && Array.isArray(leave) ? leave : []).map((leaveItem, index) => (
                  <tr key={index}>
                    <td className="py-2 border-b text-[12px] text-center">{leaveItem?.userId?.firstName}</td>
                    <td className="py-2 border-b text-[12px] text-center">{leaveItem?.startDate}</td>
                    <td className="py-2 border-b text-[12px] text-center">{leaveItem?.endDate}</td>
                    <td className="py-2 border-b text-[12px] text-center">{leaveItem?.appliedDate}</td>
                    <td className="py-2 border-b text-[12px] text-center">{leaveItem?.status}</td>
                    <td className="py-2 border-b text-[12px] text-center">{leaveItem?.approvedBy?.firstName}</td>
                    <td className="py-2 border-b text-[12px] text-center">
                      <div className='flex gap-3 justify-center items-center -z-10'>
                        <button
                          className="text-[#3577f1] border border-[#3577f1] p-1 rounded-md hover:bg-[#3577f1] hover:text-white hover:border-[#FFFFFF] translate-x-1"
                          onClick={() => openEditModal(leaveItem)}
                        >
                          <LuFileEdit className='h-4 w-4' />
                        </button>
                        <button
                          className="text-red-500 border border-[#ef4444] p-1 rounded-md hover:bg-[#ef4444] hover:text-white hover:border-[#FFFFFF] translate-x-1"
                          onClick={() => handleOpenDeleteModal(leaveItem._id)} // Pass the leave ID to the delete modal
                        >
                          <RiDeleteBin5Line className='h-4 w-4' />
                        </button>
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
              confirmButtonText="Yes, I'm sure"
              cancelButtonText="No, cancel"
              onConfirm={handleDelete}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Page;
