"use client"
import querySlice, { deleteQuery, fetchData } from '@/redux/slices/querySlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuFileEdit } from "react-icons/lu";
import { BeatLoader } from 'react-spinners';
import CustomAlert from '@/components/admin/CustomAlert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateForm from '@/components/admin/UpdateForm';
import axios from 'axios';
// import { Tooltip } from 'react-tooltip';

const Page = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.data);
    console.log("dataqueryyyy==>", data)
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedQueryId, setSelectedQueryId] = useState(null);
    const [selectedQueryData, setSelectedQueryData] = useState(null);

    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const openEditModal = (id) => {
        setSelectedQueryData(id)
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => {
        setSelectedQueryData(null);
        setIsEditModalOpen(false);
    };

    const openModal = (id) => {
        setSelectedQueryId(id);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedQueryId(null);
        setModalOpen(false);
    };

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const handleConfirm = async () => {
        if (selectedQueryId) {
            try {
                await dispatch(deleteQuery(selectedQueryId)).unwrap();
                dispatch(fetchData());
                toast.success('Query successfully deleted!');
            } catch (error) {
                toast.error('Failed to delete query!');
            } finally {
                closeModal();
            }
        }
    };

    const getRemarkColor = (remark) => {
        switch (remark) {
            case 'Premature':
                return 'bg-premature';
            case 'Mature':
                return 'bg-mature';
            case 'Dead':
                return 'bg-dead';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="p-4 h-screen flex flex-col">
            <ToastContainer />
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <BeatLoader
                        color={"#7367f0"}
                        loading={loading}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                <div className="flex-1 overflow-y-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 border-b min-w-[100px]">Name</th>
                                <th className="py-2 border-b min-w-[150px]">Email</th>
                                <th className="py-2 border-b min-w-[100px]">Contact</th>
                                <th className="py-2 border-b min-w-[150px]">Business Name</th>
                                <th className="py-2 border-b min-w-[200px] text-center">Remarks</th>
                                <th className="py-2 border-b min-w-[200px]">Query Content</th>
                                <th className="py-2 border-b min-w-[100px]">Lead By</th>
                                <th className="py-2 border-b min-w-[100px]">Assign To</th>
                                <th className="py-2 border-b min-w-[100px]">Follow Up</th>
                                <th className="py-2 border-b min-w-[150px]">Last Follow Up</th>
                                <th className="py-2 border-b min-w-[100px]">Query Date</th>
                                <th className="py-2 border-b min-w-[100px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(data && Array.isArray(data) ? data : []).map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 border-b text-center">{item?.fullName}</td>
                                    <td className="py-2 border-b text-center">{item?.email}</td>
                                    <td className="py-2 border-b text-center">{item?.contact}</td>
                                    <td className="py-2 border-b text-center">{item?.businessName}</td>
                                    <td className="py-2 border-b text-center">
                                        <span className={`py-1 px-2 text-default rounded-3xl ${getRemarkColor(item.remarks)}`}>
                                            {item.remarks}
                                        </span>
                                    </td>
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
                                    <td className="py-2 border-b text-center ">{item?.queryContent}</td>
                                    <td className="py-2 border-b text-center">{item?.leadBy}</td>
                                    <td className="py-2 border-b text-center">{item?.assignTo?.firstName}</td>
                                    <td className="py-2 border-b text-center">{item?.followUp === false ? "No" : "Yes"}</td>
                                    <td className="py-2 border-b text-center">{moment(item?.lastFollowUp).format('LL')}</td>
                                    <td className="py-2 border-b text-center">{moment(item?.queryDate).format('LL')}</td>
                                    <td className="py-2 border-b text-center">
                                        <div className='flex gap-3 justify-center items-center'>
                                            <button className="text-[#3577f1] border border-[#3577f1] p-1 rounded-md hover:bg-[#3577f1] hover:text-white hover:border-[#FFFFFF] translate-x-1" onClick={() => openEditModal(item)}>
                                                <LuFileEdit className='h-4 w-4' />
                                            </button>
                                            {
                                                user?.data?.accessId === 1 ? (
                                                    <button
                                                        className="text-red-500 border border-[#ef4444] p-1 rounded-md hover:bg-[#ef4444] hover:text-white hover:border-[#FFFFFF] translate-x-1"
                                                        onClick={() => openModal(item._id)}
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
                    <UpdateForm isOpen={isEditModalOpen} onClose={closeEditModal} queryData={selectedQueryData} />
                    <CustomAlert
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        title="Are you sure?"
                        description="Are you sure you want to delete this query?"
                        confirmButtonText="Yes, I'm sure"
                        cancelButtonText="No, cancel"
                        onConfirm={handleConfirm}
                    />
                </div>
            )}
        </div>
    )
}

export default Page;
