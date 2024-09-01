"use client";
import AddProjectDetails from '@/components/admin/AddProjectDetails';
import CustomAlert from '@/components/admin/CustomAlert';
import UpdateProjectData from '@/components/admin/UpdateProjectData';
import { deleteProject, fetchProjects } from '@/redux/slices/projectSlice';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { LuFileEdit } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BsFileText } from 'react-icons/bs'; // Import an icon for empty state
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomLoader } from '@/components/CustomLoader';
import { FaPlus } from 'react-icons/fa';

const Page = () => {
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector((state) => state.project);
  console.log("project====>", project)
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [selectedQueryData, setSelectedQueryData] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

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

  const openEditModal = (id) => {
    setSelectedQueryData(id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedQueryData(null);
    setIsEditModalOpen(false);
  };

  const openAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleConfirm = async () => {
    if (selectedQueryId) {
      try {
        await dispatch(deleteProject()).unwrap();
        dispatch(fetchProjects());
        toast.success('Project successfully deleted!');
      } catch (error) {
        toast.error('Failed to delete Project!');
      } finally {
        closeModal();
      }
    }
  };

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
          {/* {project.length > 0 ? (
            <> */}
          <div className='flex justify-end w-[98%] m-auto'>
            <button className='bg-dashboard text-default text-sm  gap-1 text-center py-2 px-5 flex items-center rounded-3xl my-3 text-[12px]' onClick={openAddModal}>
              <span><FaPlus /></span>
              <span>Project</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto rounded-3xl w-[98%] m-auto ">
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
                    <td className="py-2 border-b text-[12px] text-center">{item?.name}</td>
                    <td className="py-2 border-b text-[12px] text-center">{item?.email}</td>
                    <td className="py-2 border-b text-[12px] text-center">{item?.contactNo}</td>
                    <td className="py-2 border-b text-[12px] text-center">{item?.remarks}</td>
                    <td className="py-2 border-b text-[12px] text-center">{item?.businessName}</td>
                    <td className="py-2 border-b text-[12px] text-center">{item?.projectBy}</td>
                    <td className="py-2 border-b text-[12px] text-center">{item?.assignTo?.firstName}</td>
                    <td className="py-2 border-b text-[12px] text-center">{moment(item?.lastFollowUp).format('LL')}</td>
                    <td className="py-2 border-b text-[12px] text-center">{moment(item?.projectDate).format('LL')}</td>
                    <td className="py-2 border-b text-[12px] text-center">{moment(item?.deadLine).format('LL')}</td>
                    <td className="py-2 border-b text-center">
                      <div className='flex gap-3 justify-center items-center -z-10'>
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
            <UpdateProjectData isOpen={isEditModalOpen} onClose={closeEditModal} queryData={selectedQueryData} />
            <AddProjectDetails openProject={isAddModalOpen} onCloseProject={closeAddModal} />
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
        //   ) : (
        //     <div className="flex flex-col justify-center items-center h-full">
        //       <BsFileText className="text-gray-400 text-4xl mb-4" />
        //       <p className="text-gray-500 text-lg">No projects available</p>
        //     </div>
        //   )}
        // </>
      )}
    </>
  );
};

export default Page;
