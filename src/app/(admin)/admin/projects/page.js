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
import { openAddPojectDetails, openDeleteProjects, openEditProjectModal } from '@/redux/slices/uiSlice';

const Page = () => {
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector((state) => state.project);
  const { isAddProjectDetails, isEditProjectDetails, isEditProjectID, isDeleteProject, isDeleteProjectID } = useSelector((state) => state.ui)

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);


  const handleConfirm = async () => {
    if (isDeleteProjectID) {
      try {
        const deleteProjectRes = await dispatch(deleteProject(isDeleteProjectID)).unwrap();
        console.log("deleteProjectRes", deleteProjectRes)
        toast.success(deleteProjectRes?.message)
        dispatch(openDeleteProjects(false))
        dispatch(fetchProjects());
      } catch (error) {
        toast.error(error.message || "Failed to delete project");
      }
    }
  };

  return (
    <>
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
            <div className='flex justify-end w-[98%] m-auto'>
              <button className='bg-dashboard flex items-center gap-1 text-default text-sm text-center py-2 px-5 rounded-3xl my-3 text-[12px]' onClick={() => dispatch(openAddPojectDetails(true))}>
                <span><FaPlus /></span>
                <span>Project</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto rounded-3xl shadow-xl scrollbar-hide">
              <table className="min-w-full bg-white text-sm ">
                <thead className='sticky top-0 z-20'>
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
                <tbody className='z-10'>
                  {(project && Array.isArray(project) ? project : []).map((item, index) => (
                    <tr key={index} className='even:bg-dashboardUserBg odd:bg-default'>
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
                          <button className="text-[#3577f1] border border-[#3577f1] p-1 rounded-md hover:bg-[#3577f1] hover:text-white hover:border-[#FFFFFF] translate-x-1" onClick={() => dispatch(openEditProjectModal(item))}>
                            <LuFileEdit className='h-4 w-4' />
                          </button>
                          <button
                            className="text-red-500 border border-[#ef4444] p-1 rounded-md hover:bg-[#ef4444] hover:text-white hover:border-[#FFFFFF] translate-x-1"
                            onClick={() => dispatch(openDeleteProjects(item._id))}
                          >
                            <RiDeleteBin5Line className='h-4 w-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <UpdateProjectData
                isOpen={isEditProjectDetails}
                onClose={() => dispatch(openEditProjectModal(false))}
                queryData={isEditProjectID}
              />
              <AddProjectDetails
                openProject={isAddProjectDetails}
                onCloseProject={() => openAddPojectDetails(false)}
              />
              <CustomAlert
                isOpen={isDeleteProject}
                onClose={() => dispatch(openDeleteProjects(false))}
                title="Are you sure?"
                description="Are you sure you want to delete this Project?"
                confirmButtonText={loading ? <CustomLoader size={10} loading={loading} color={"#FFFFFF"} /> : "Yes, I'm sure"}
                cancelButtonText="No, cancel"
                onConfirm={handleConfirm}
              />
            </div>
          </>
        )}
      </div>

    </>
  );
};

export default Page;
