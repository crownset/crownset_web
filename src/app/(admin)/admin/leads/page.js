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
import AddLead from '@/components/admin/AddLead';

const Page = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.data);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedQueryId, setSelectedQueryId] = useState(null);
    const [selectedQueryData, setSelectedQueryData] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
    const [fullQuery, setFullQuery] = useState("");

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

    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    const openAddModal = () => {
        setAddModalOpen(!isAddModalOpen);
    };

    const openQueryModal = (queryContent) => {
        setFullQuery(queryContent);
        setIsQueryModalOpen(true);
    };

    const closeQueryModal = () => {
        setIsQueryModalOpen(false);
        setFullQuery("");
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
                <div className="flex justify-center items-center h-full">
                    <BeatLoader
                        color={"#0146cf"}
                        loading={loading}
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                <>
                    <div className='text-end'>
                        <button className='bg-dashboard text-default text-sm text-center py-2 px-2 rounded-3xl my-3 text-[12px]' onClick={() => setAddModalOpen(!isAddModalOpen)}>
                            ADD Lead
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto rounded-3xl">

                        <table className="min-w-full bg-white border border-gray-300 text-sm">
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
                                    <th className="py-2 border-b min-w-[100px]">Comments</th>
                                    <th className="py-2 border-b min-w-[100px]">Follow Up</th>
                                    <th className="py-2 border-b min-w-[150px]">Last Follow Up</th>
                                    <th className="py-2 border-b min-w-[100px]">Query Date</th>
                                    <th className="py-2 border-b min-w-[100px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(data && Array.isArray(data) ? data : []).map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-2 text-[12px] border-b text-center">{item?.fullName}</td>
                                        <td className="py-2 text-[12px] border-b text-center">{item?.email}</td>
                                        <td className="py-2 text-[12px] border-b text-center">{item?.contact}</td>
                                        <td className="py-2 text-[12px] border-b text-center">{item?.businessName}</td>
                                        <td className="py-2 text-[12px] border-b text-center">
                                            <span className={`py-1 px-2 text-default rounded-3xl ${getRemarkColor(item.remarks)}`}>
                                                {item.remarks}
                                            </span>
                                        </td>
                                        <td className="py-2 text-[12px] border-b text-center ">
                                            {item?.queryContent.length > 50 ? (
                                                <>
                                                    {item?.queryContent.slice(0, 50)}...
                                                    <button
                                                        className="text-blue-500 underline ml-1"
                                                        onClick={() => openQueryModal(item?.queryContent)}
                                                    >
                                                        View More
                                                    </button>
                                                </>
                                            ) : (
                                                item?.queryContent
                                            )}
                                        </td>
                                        <td className="py-2 text-[12px] border-b text-center">{item?.leadBy}</td>
                                        <td className="py-2 text-[12px] border-b text-center">{item?.assignTo?.firstName}</td>
                                        <td className="py-2 text-[12px] border-b text-center">{item?.comments}</td>
                                        <td className="py-2 text-[12px] border-b text-center">{item?.followUp === false ? "No" : "Yes"}</td>
                                        <td className="py-2 text-[12px] border-b text-center">{moment(item?.lastFollowUp).format('LL')}</td>
                                        <td className="py-2 text-[12px] border-b text-center">{moment(item?.queryDate).format('LL')}</td>
                                        <td className="py-2 text-[12px] border-b text-center">
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
                    </div>
                </>
            )}

            <CustomAlert
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Are you sure?"
                description="Are you sure you want to delete this query?"
                confirmButtonText="Yes, I'm sure"
                cancelButtonText="No, cancel"
                onConfirm={handleConfirm}
            />

            <UpdateForm isOpen={isEditModalOpen} onClose={closeEditModal} queryData={selectedQueryData} />
            <AddLead openProject={isAddModalOpen} onCloseProject={closeAddModal} />

            {/* Query Modal */}
            {isQueryModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg max-w-xl w-full">
                        <h2 className="text-lg font-bold mb-4">Full Query</h2>
                        <p className="text-sm mb-4">{fullQuery}</p>
                        <div className="text-right">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={closeQueryModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
