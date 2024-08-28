"use client"
import { assignUsers } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import { shareList } from "@/redux/slices/tasklistSlice";


export const EditWorkspaceModal = ({ isOpen, onClose, updateName, setUpdateName, onSave }) => {

    if (!isOpen) return null;

    return (

        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4 w-1/5 max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex items-end justify-end">

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <CloseIcon className="w-3 h-3" />

                        </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">
                        <input value={updateName} onChange={(e) => setUpdateName(e.target.value)} className="outline outline-primary-color p-1 rounded" />
                        <button onClick={onSave} className="bg-primary-color text-white p-1 rounded">Save</button>
                    </div>

                </div>
            </div>
        </>
    )
}

//tasklist modals
export const ShareTaskListModal = ({ isOpenShare, onClose, tasklist_id }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('select user');
    const [user_id, setUserId] = useState('');
    const users = useSelector((state) => state.user.user)
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchuser = async () => {
            try {
                await dispatch(assignUsers());
            } catch (error) {
                console.log("Errors");

            }
        }
        fetchuser();

    }, [dispatch])

    if (!isOpenShare) return null;

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const onSave = async () => {
        if (selectedUser == 'select user') {
            console.log("Select any user");
            return
        }

        try {

            await dispatch(shareList({ user_id, tasklist_id }));

            onClose();

        } catch (error) {
            console.log(error);

        }

    }

    const handleSelect = (index) => {
        setSelectedUser(users[index].firstName);
        setUserId(users[index]._id);
        setIsOpen(false);
    };

    return (

        <>
            <div className="fixed w-full h-full border border-black inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4 w-1/3 h-2/3 bg-white rounded-lg shadow dark:bg-gray-700 border border-black">

                    <div className="flex items-end justify-end">

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <CloseIcon className="w-3 h-3" />

                        </button>
                    </div>
                    <div className="relative inline-block text-left">
                        <button
                            type="button"
                            onClick={toggleDropdown}
                            className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-64 flex justify-between items-center"
                        >
                            {selectedUser}
                            <svg
                                className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 bg-white  rounded-lg shadow-lg overflow-y-auto ">
                                <ul className="py-1 ">
                                    {users?.map((user, index) => (
                                        <li
                                            key={index}
                                            onClick={() => { handleSelect(index) }}
                                            className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                                        >

                                            {user.firstName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>


                    <div className="p-4 md:p-5 space-y-4">

                        <button onClick={onSave} className="bg-primary-color text-white p-1 rounded">Save</button>
                    </div>

                </div>

            </div>
        </>

    )
}

export const EditTaskListModal = ({ isOpen, onClose, onSave, editTaskList, setEditTaskList }) => {

    if (!isOpen) return null;

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        return moment(dateString, 'YYYY-MM-DD').format('DD-MM-YYYY');
    };


    const parseDateForStorage = (dateString) => {
        if (!dateString) return '';
        return moment(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD');
    };

    const handleDateChange = (date) => {
        setEditTaskList(prev => ({
            ...prev,
            deadline: date // Store as JavaScript Date object
        }));
    };

    // Handle input change for name field
    const handleNameChange = (e) => {
        setEditTaskList(prev => ({
            ...prev,
            name: e.target.value
        }));
    };

    return (

        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4 w-1/5 max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex items-end justify-end">

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <CloseIcon className="w-3 h-3" />

                        </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">

                        <input
                            name="name"
                            value={editTaskList.name}
                            onChange={handleNameChange}
                            className="outline outline-primary-color p-1 rounded"
                            placeholder="Task Name"

                        />
                        <DatePicker
                            selected={editTaskList.deadline}
                            onChange={handleDateChange}
                            dateFormat="dd-MM-yyyy"
                            className="outline outline-primary-color p-1 rounded"
                            placeholderText="Select deadline"
                        />

                        <button onClick={onSave} className="bg-primary-color text-white p-1 rounded">Save</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export const AssginedUserModal = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    return (

        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4 w-1/5 max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex items-end justify-end">

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <CloseIcon className="w-3 h-3" />

                        </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">
                        <div>Show user here</div>
                        {/* <button className="bg-primary-color text-white p-1 rounded">Save</button> */}
                    </div>

                </div>
            </div>
        </>
    )
}

//edit todo
//mark as done todo
//labels

//Todo modal
export const EditTodoModal = ({ isOpen, onClose, onSave }) => {
    const tasklists = useSelector((state) => state.tasklist?.tasklist);
    const {isTodoIndex,tasklistIndex} = useSelector((state)=>state.misc)
    console.log(tasklists[tasklistIndex].todo[isTodoIndex]);
    const [title,setTitle] = useState(tasklists[tasklistIndex].todo[isTodoIndex].title); 

    if (!isOpen) return null;

    return (

        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4 w-1/5 max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex items-end justify-end">

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <CloseIcon className="w-3 h-3" />

                        </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">
                        {/* <div>Edit Todo Modal</div> */}
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className="outline outline-primary-color p-1 rounded" />
                        <button onClick={onSave} className="bg-primary-color text-white p-1 rounded">Save</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export const TodoLabelsModal = ({ isOpen, onClose, onSave }) => {
    const tasklists = useSelector((state) => state.tasklist?.tasklist);
    const {isTodoIndex,tasklistIndex} = useSelector((state)=>state.misc)

    if (!isOpen) return null;

    return (

        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4 w-1/5 max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex items-end justify-end">

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <CloseIcon className="w-3 h-3" />

                        </button>
                    </div>
                    {/* #F87168*/}
                    <div className="p-4 md:p-5 space-y-4">
                        <div className="w-full h-[2rem] bg-[#4BCE97] cursor-pointer rounded-sm hover:bg-[#7EE2B8]"></div>
                        <div className="w-full h-[2rem] bg-[#F5CD47] cursor-pointer rounded-sm hover:bg-[#E2B203]"></div>
                        <div className="w-full h-[2rem] bg-[#FEA362] cursor-pointer rounded-sm hover:bg-[#FEC195]"></div>
                        <div className="w-full h-[2rem] bg-[#F87168] cursor-pointer rounded-sm hover:bg-[#FD9891]"></div>
                        {/* <input value={updateName} onChange={(e) => setUpdateName(e.target.value)} className="outline outline-primary-color p-1 rounded" /> */}
                        <button onClick={onSave} className="bg-primary-color text-white p-1 rounded">Save</button>
                    </div>

                </div>
            </div>
        </>
    )
}
