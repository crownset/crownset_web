"use client"
import CustomAlert from '@/components/admin/CustomAlert';
import { deleteProject, fetchProjects } from '@/redux/slices/projectSlice';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { LuFileEdit } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

const page = () => {
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector((state) => state.project);
  console.log("projectData==>", project)
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const openModal = (id) => {
    setSelectedQueryId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedQueryId(null);
    setModalOpen(false);
  };

  const handleConfirm = async () => {
    if (selectedQueryId) {
      try {
        await dispatch(deleteProject(selectedQueryId)).unwrap();
        dispatch(fetchProjects());
        toast.success('Query successfully deleted!');
      } catch (error) {
        toast.error('Failed to delete query!');
      } finally {
        closeModal();
      }
    }
  };

  return (
    <>
      <div className='flex justify-end w-[98%] m-auto'>

        <button className='bg-dashboard text-default text-base text-center py-2 px-2 rounded-lg my-3  '>
          ADD Project
        </button>
      </div>
     
      <div className="flex-1 overflow-y-auto rounded-3xl ">
      <ToastContainer />
        <table className="w-[98%] m-auto bg-white border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 border-b min-w-[100px]">Name</th>
              <th className="py-2 border-b min-w-[150px]">Email</th>
              <th className="py-2 border-b min-w-[100px]">Contact</th>
              <th className="py-2 border-b min-w-[100px]">Remarks</th>
              <th className="py-2 border-b min-w-[150px]">Business Name</th>
              <th className="py-2 border-b min-w-[100px] text-center">Project By</th>
              <th className="py-2 border-b min-w-[100px]">Assign To</th>
              <th className="py-2 border-b min-w-[100px]">Last Followup</th>
              <th className="py-2 border-b min-w-[100px]">Project Date</th>
              <th className="py-2 border-b min-w-[100px]">Dead Line</th>
              <th className="py-2 border-b min-w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(project && Array.isArray(project) ? project : []).map((item, index) => (
              <tr key={item.id}>
                <td className="py-2 border-b text-center">{item?.name}</td>
                <td className="py-2 border-b text-center">{item?.email}</td>
                <td className="py-2 border-b text-center">{item?.contactNo}</td>
                <td className="py-2 border-b text-center">{item?.remarks}</td>
                <td className="py-2 border-b text-center">{item?.businessName}</td>
                {/* <td className="py-2 border-b text-center">
                                        <span className={`py-1 px-2 text-default rounded-3xl ${getRemarkColor(item.remarks)}`}>
                                            {item.remarks}
                                        </span>
                                    </td> */}
                {/* <td className="py-2 border-b text-center relative cursor-pointer">
                                        {item?.queryContent.length > 20 ? (
                                            <div className="tooltip-container">
                                                <div className="">
                                                    {item?.queryContent.slice(0, 20)}...
                                                </div>
                                                <div className="tooltip">
                                                    {item?.queryContent}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>{item?.queryContent}</div>
                                        )}
                                    </td> */}
                <td className="py-2 border-b text-center ">{item?.projectBy}</td>
                <td className="py-2 border-b text-center">{item?.assignTo?.firstName}</td>
                <td className="py-2 border-b text-center">{moment(item?.lastFollowUp).format('LL')}</td>
                <td className="py-2 border-b text-center">{moment(item?.projectDate).format('LL')}</td>
                <td className="py-2 border-b text-center">{moment(item?.deadLine).format('LL')}</td>

                <td className="py-2 border-b text-center">
                  <div className='flex gap-3 justify-center items-center'>
                    <button className="text-[#3577f1] border border-[#3577f1] p-1 rounded-md hover:bg-[#3577f1] hover:text-white hover:border-[#FFFFFF] translate-x-1" onClick={() => openEditModal(item)}>
                      <LuFileEdit className='h-4 w-4' />
                    </button>
                    <button
                      className="text-red-500 border border-[#ef4444] p-1 rounded-md hover:bg-[#ef4444] hover:text-white hover:border-[#FFFFFF] translate-x-1"
                      onClick={() => openModal(item._id)}
                    >
                      <RiDeleteBin5Line className='h-4 w-4' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <UpdateForm isOpen={isEditModalOpen} onClose={closeEditModal} queryData={selectedQueryData} /> */}
        <CustomAlert
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Are you sure?"
          description="Are you sure you want to delete this Project?"
          confirmButtonText="Yes, I'm sure"
          cancelButtonText="No, cancel"
          onConfirm={handleConfirm}
        />
      </div>
    </>

  )
}

export default page
