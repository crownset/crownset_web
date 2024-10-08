"use client"
import AddLead from '@/components/admin/AddLead';
import CustomAlert from '@/components/admin/CustomAlert';
import SuccessModal from '@/components/admin/SuccessLottie';
import UpdateForm from '@/components/admin/UpdateForm';
import { CustomLoader } from '@/components/CustomLoader';
import { getExcelData } from '@/redux/slices/multipleLeadSlice';
import { deleteQuery, fetchData } from '@/redux/slices/querySlice';
import { closeQueryModal, openAddLeadModal, openDeleteLeadModal, openEditLeadModal, openQueryModal, openSuccessModal } from '@/redux/slices/uiSlice';


import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaPlus } from "react-icons/fa6";
import { LuFileEdit } from "react-icons/lu";
import { MdSend } from 'react-icons/md';
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';

const Page = () => {
    const dispatch = useDispatch();
    const { data, fetching, error, deleting } = useSelector((state) => state.data);
    // console.log("dataLeads>>>", data)
    const { isModalOpen, isEditLeadModalOpen, isAddLeadModal, isEditModalOpen, isAddModalOpen, isQueryModalOpen, isSuccessModalOpen, selectedQueryId, selectedQueryData, fullQuery } = useSelector((state) => state.ui);
    const [user, setUser] = useState(null);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isEditSuccessModal, setIsEditSuccessModal] = useState(false)
    const handleShowSuccessModal = () => {
        setIsSuccessModalVisible(true);
    };
    const [queryData, setQueryData] = useState([]);
    const [fileName, setFileName] = useState('');
    const { isLoading, isSuccess } = useSelector((state) => state.queryData);
    const { isAutoSuccess } = useSelector((state) => state.ui);
    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    const [searchItem, setSearchItem] = useState('')
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    // const handleInputChange = (e) => {
    //     const searchTerm = e.target.value;

    //     setSearchItem(searchTerm)

    //     if (searchTerm === '') {
    //         setFilteredData(originalData);
    //     } else {

    //         const filteredItems = originalData.filter((user) =>
    //             user?.assignTo?.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    //         );
    //         setFilteredData(filteredItems);
    //     }
    // }

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
    
        setSearchItem(searchTerm);
    
        // Clear any existing timeout
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
    
        // Set a new timeout to delay the search
        const newTimeout = setTimeout(() => {
            if (searchTerm === '') {
                setFilteredData(originalData);
            } else {
                const filteredItems = originalData.filter((user) =>
                    user?.assignTo?.firstName.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredData(filteredItems);
            }
        }, 300); // 300ms debounce time (adjust as needed)
    
        setDebounceTimeout(newTimeout);
    };

    useEffect(() => {
        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        };
    }, [debounceTimeout]);

    const handleFile = (file) => {
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.SheetNames[0];
            const sheet = workbook.Sheets[worksheet];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            console.log("jsonData==>", jsonData);

            if (jsonData.length === 0) {
                toast.error('You have no data in the file');
                return;
            }
            setQueryData(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };

    const onDrop = (acceptedFiles) => {
        handleFile(acceptedFiles[0]);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFile(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleSend = async () => {
        try {
            if (queryData.length > 0) {
                const leadExcelRes = await dispatch(getExcelData(queryData));
                console.log("leadExcelRes", leadExcelRes)
                setQueryData([]);
                setFileName('');
                dispatch(fetchData());
                toast.success(leadExcelRes?.payload?.message)
            }
        } catch (error) {
            toast.error(leadExcelRes?.payload?.message);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const fetchLeads = async () => {
            await dispatch(fetchData());
        }
        fetchLeads();
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            setFilteredData(data.query);
            setOriginalData(data.query);

        }
    }, [data]);

    const handleConfirm = async () => {
        if (selectedQueryId) {
            try {
                await dispatch(deleteQuery(selectedQueryId)).unwrap();
                dispatch(openDeleteLeadModal(false));
                dispatch(fetchData());
            } catch (error) {
                toast.error('Failed to delete query!');
            } finally {
                dispatch(openSuccessModal(true));
            }
        }
    };

    const getRemarkColor = (remark) => {
        switch (remark) {
            case 'Premature':
                return 'bg-premature';
            case 'Prospect':
                return 'bg-premature';
            case 'DNP':
                return 'bg-dead';
            case 'Meeting':
                return 'bg-meeting';
            case 'Closed':
                return 'bg-mature';
            case 'Not Intersted':
                return 'bg-dashboard';
            default:
                return 'bg-gray-500';
        }
    };

    return (
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
            {fetching ? (
                <CustomLoader loading={fetching} color={"#0146cf"} size={15} />
            ) : error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                <>
                    <div className='flex gap-5 flex-wrap m-auto mt-2'>
                        <div className='bg-dashboardUserBg rounded-2xl  flex flex-col gap-2 p-2 justify-center items-center w-[8rem]'>
                            <span className='text-gray-700 font-semibold'>Total Leads</span>
                            <span className='text-gray-600 font-semibold'>{data.totalCount}</span>
                        </div>

                        <div className='bg-dashboardUserBg rounded-2xl   flex flex-col gap-2 p-2 justify-center items-center w-[8rem]'>
                            <span className='text-gray-700 font-semibold'>Premature</span>
                            <span className='text-gray-600 font-semibold'>{data.prematureCount}</span>
                        </div>
                        <div className='bg-dashboardUserBg rounded-2xl   flex flex-col gap-2 p-2 justify-center items-center w-[8rem]'>
                            <span className='text-gray-700 font-semibold'>Prospect</span>
                            <span className='text-gray-600 font-semibold'>{data.prospectCount}</span>
                        </div>
                        <div className='bg-dashboardUserBg rounded-2xl   flex flex-col gap-2 p-2 justify-center items-center w-[8rem]'>
                            <span className='text-gray-700 font-semibold'>DNP</span>
                            <span className='text-gray-600 font-semibold'>{data.DNPCount}</span>
                        </div>
                        <div className='bg-dashboardUserBg rounded-2xl   flex flex-col gap-2 p-2 justify-center items-center w-[8rem]'>
                            <span className='text-gray-700 font-semibold'>Meeting</span>
                            <span className='text-gray-600 font-semibold'>{data.meetingCount}</span>
                        </div>
                        <div className='bg-dashboardUserBg rounded-2xl   flex flex-col gap-2 p-2 justify-center items-center w-[8rem]'>
                            <span className='text-gray-700 font-semibold'>Closed</span>
                            <span className='text-gray-600 font-semibold'>{data.closedCount}</span>
                        </div>
                        <div className='bg-dashboardUserBg rounded-2xl   flex flex-col gap-2 p-2 justify-center items-center w-[8rem]'>
                            <span className='text-gray-700 font-semibold'>Not Intersted</span>
                            <span className='text-gray-600 font-semibold'>{data.notinterstedCount}</span>
                        </div >
                    </div>


                    <div className='flex justify-end items-center gap-5 cursor-pointer  mt-4'>

                        <div className='hidden sm:block w-[40%] shadow-md  rounded-2xl'>
                            <div className=' flex justify-center '>
                                <input
                                    type="text"
                                    value={searchItem}
                                    onChange={handleInputChange}
                                    placeholder='Search By Name'
                                    className=' rounded-2xl px-3 py-1 outline-none w-full text-gray-800 '
                                />
                            </div>
                        </div>

                        <div className='bg-dashboard flex items-center gap-5 text-default text-sm text-center py-2 px-5 rounded-3xl my-3 text-[12px]'>
                            <div className='flex items-center gap-5'>
                                {fileName ? (
                                    <div className='flex items-center gap-3'>
                                        <p className='text-sm'> {fileName}
                                        </p>
                                        <button onClick={() => { setQueryData([]); setFileName(""); }}>
                                            <RiDeleteBin5Line className='h-4 w-4 text-red-600' />
                                        </button>
                                    </div>
                                ) : (
                                    <button {...(!fileName ? getRootProps() : {})} className='flex items-center'>
                                        <span>Import Excel </span>
                                    </button>
                                )}
                            </div>
                            <button onClick={handleSend}>
                                {
                                    isLoading ? (<CustomLoader size={10} loading={isLoading} color={"#FFFFFF"} />)
                                        :
                                        (<MdSend className='h-6 w-6' />)
                                }
                            </button>
                        </div>
                        {/* Add Lead button */}
                        <button
                            className='bg-dashboard flex items-center gap-1 text-default text-sm text-center py-2 px-5 rounded-3xl my-3 text-[12px]'
                            onClick={() => dispatch(openAddLeadModal(true))}
                        >
                            <span><FaPlus /></span>
                            <span>Lead</span>
                        </button>
                    </div>

                    <div className='flex justify-center sm:hidden '>
                        <input
                            type="text"
                            value={searchItem}
                            onChange={handleInputChange}
                            placeholder='Search by Name'
                            className='outline-1 outline-blue-600 rounded-2xl px-3 py-1 mt-3 outline-none text-gray-800 mb-3'
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto rounded-3xl shadow-xl scrollbar-hide ">
                        <table className="min-w-full bg-white text-sm ">
                            <thead className='sticky top-0 z-20'>
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
                                    <th className="py-2 border-b min-w-[100px]">Address</th>
                                    <th className="py-2 border-b min-w-[100px]">Actions</th>
                                </tr>
                            </thead>
                            {filteredData?.length == 0 ? (
                                <tbody>
                                    <tr>
                                        <td colSpan={10} className='text-center text-3xl p-4  font-semibold italic'>No data Found</td>
                                    </tr>
                                </tbody>) :
                                <tbody className='z-10'>

                                    {(filteredData && Array.isArray(filteredData) ? filteredData : []).map((item, index) => (
                                        <tr key={index} className='even:bg-dashboardUserBg odd:bg-default'>
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
                                                {item?.queryContent?.length > 50 ? (
                                                    <>
                                                        {item?.queryContent.slice(0, 50)}...
                                                        <button
                                                            className="text-blue-500 underline ml-1"
                                                            onClick={() => dispatch(openQueryModal(item?.queryContent))}
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
                                            <td className="py-2 text-[12px] border-b text-center ">
                                                {item?.address?.length > 50 ? (
                                                    <>
                                                        {item?.address.slice(0, 50)}...
                                                        <button
                                                            className="text-blue-500 underline ml-1"
                                                            onClick={() => dispatch(openQueryModal(item?.address))}
                                                        >
                                                            View More
                                                        </button>
                                                    </>
                                                ) : (
                                                    item?.address
                                                )}
                                            </td>
                                            <td className="py-2 text-[12px] border-b text-center">
                                                <div className='flex gap-3 justify-center items-center'>
                                                    <button className="text-[#3577f1] border border-[#3577f1] p-1 rounded-md hover:bg-[#3577f1] hover:text-white hover:border-[#FFFFFF] translate-x-1"
                                                        onClick={() => dispatch(openEditLeadModal(item))}
                                                    >
                                                        <LuFileEdit className='h-4 w-4' />
                                                    </button>
                                                    {
                                                        user?.data?.accessId === 1 ? (
                                                            <button
                                                                className="text-red-500 border border-[#ef4444] p-1 rounded-md hover:bg-[#ef4444] hover:text-white hover:border-[#FFFFFF] translate-x-1"
                                                                onClick={() => dispatch(openDeleteLeadModal(item._id))}
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
                            }
                        </table>
                    </div>
                </>
            )}
            <CustomAlert
                isOpen={isModalOpen}
                onClose={() => dispatch(openDeleteLeadModal(false))}
                title="Are you sure?"
                description="Are you sure you want to delete this query?"
                confirmButtonText={deleting ? <CustomLoader size={10} loading={deleting} color={"#FFFFFF"} /> : "Yes, I'm sure"}
                cancelButtonText="No, cancel"
                onConfirm={handleConfirm}
            />

            <UpdateForm
                isOpen={isEditLeadModalOpen}
                onClose={() => dispatch(openEditLeadModal(false))}
                queryData={selectedQueryData}
                onSuccess={() => setIsEditSuccessModal(true)}
            />

            <AddLead
                openProject={isAddLeadModal}
                onCloseProject={() => dispatch(openAddLeadModal(false))}
                onSuccess={handleShowSuccessModal}
            />

            <SuccessModal
                isOpen={isSuccessModalVisible}
                onClose={() => setIsSuccessModalVisible(false)}
                title={"Lead Saved Successfully."}
            />

            <SuccessModal
                isOpen={isEditSuccessModal}
                onClose={() => setIsEditSuccessModal(false)}
                title={"Lead Edited Successfully."}
            />

            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => dispatch(openSuccessModal(false))}
                title={"Lead Deleted Successfully."}
            />
            {/* <SuccessModal
                // isOpen={isAddSuccessModal}
                onClose={() => dispatch(closeAddSuccessModal())}
                title="Lead Added Successfully."
            /> */}

            {/* Query Modal */}
            {isQueryModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 py-2">
                    <div className="bg-white p-6 rounded-3xl w-[90%] max-w-xl h-[400px] overflow-hidden">
                        <div className='flex items-center justify-between'>
                            <h2 className="text-lg font-bold">Full Detail</h2>
                            <RxCross2 className="h-6 w-6 mr-10 text-dashboard cursor-pointer" onClick={() => dispatch(closeQueryModal())} />
                        </div>

                        <div className="overflow-y-auto h-[300px]">
                            <p className="text-sm">{fullQuery}</p>
                        </div>
                        {/* <div className="text-right">
                            <button
                                className="bg-dashboard text-white mr-3 px-4 py-2  rounded-3xl hover:bg-blue-600"
                                onClick={() => dispatch(closeQueryModal())}
                            >
                                Close
                            </button>
                        </div> */}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Page;
