
"use client"
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoMdClose as CloseIcon } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaCalendarWeek as CalendarIcon } from "react-icons/fa6";


import { setIsTodoEditMenu, setIsTodoEditModal } from "@/redux/slices/misc";
import { editTodo, fetchTasklist, shareList, showWorkingUser, todoLabel } from "@/redux/slices/tasklistSlice";
import { assignUsers } from "@/redux/slices/userSlice";



export const EditWorkspaceModal = ({ isOpen, onClose, updateName, setUpdateName, onSave, workspace_id, WorkspaceModalRef }) => {

    if (!isOpen) return null;

    return (

        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 " ref={WorkspaceModalRef}>
                <div className="relative p-4 w-1/5 max-w-4xl max-h-full bg-white rounded-lg shadow">

                    <div className="flex items-end justify-end">

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            <CloseIcon className="w-3 h-3" />

                        </button>
                    </div>
                    <h2 className="text-center text-bodyTextColor text-[1.4rem]">Update Workspace Name</h2>

                    <div className="p-4 md:p-5 space-y-4">
                        <input
                            value={updateName} onChange={(e) => setUpdateName(e.target.value)}
                            className="outline outline-gray-300 px-3 py-1 rounded-xl w-full text-gray-700"
                        />

                        <div className="flex justify-center">
                            <button
                                onClick={onSave}
                                className="bg-gray-400 hover:text-gray-800 text-white text-[1rem] px-6 py-2 rounded-xl hover:bg-gray-300"
                            >
                                Save
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export const ShareTaskListModal = ({ isOpenShare, onClose, tasklist_id, workspace_id }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('select user');
    const [user_id, setUserId] = useState('');
    const users = useSelector((state) => state.user.user)
    const user = users?.filter((item) => item?.accessId === 2)
    // console.log(user);
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchuser = async () => {
            try {
                await dispatch(assignUsers());

            } catch (error) {

                return toast.error("Failed To show user");
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
            // console.log("Select any user");
            return toast.error("Please Select user");
        }

        try {

            await dispatch(shareList({ user_id, tasklist_id }));
            await dispatch(fetchTasklist(workspace_id));
            toast.success("Task list Shared")
            onClose();

        } catch (error) {
            return toast.error("Failed to share tasklist")

        }

    }

    const handleSelect = (index) => {
        setSelectedUser(user[index].firstName);
        setUserId(user[index]._id);
        setIsOpen(false);
    };

    return (

        <>
            <div className="fixed w-full   inset-0 z-50 flex items-center justify-center overflow-y-hidden overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4   md:w-1/3 md:h-3/3 bg-white rounded-lg shadow  ">

                    <div className="flex items-end justify-end">

                        <button
                            type="button"
                            className="text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[1.4rem] w-8 h-8 inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            <CloseIcon className="w-3 h-3" />

                        </button>
                    </div>
                    <div> <h2 className="text-center text-bodyTextColor text-[1.4rem]">Assign TaskList</h2></div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={toggleDropdown}
                            className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-48 flex justify-between items-center"
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
                            <div className="absolute mt-10 w-48 bg-gray-400  rounded-lg shadow-lg ">
                                <ul className="py-1 max-h-[10rem] overflow-y-auto scrollbar-custom">
                                    {user?.map((user, index) => (
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

                    <div className="p-4 md:p-5 space-y-4  flex justify-center">

                        <button onClick={onSave} className="bg-gray-400 hover:text-gray-800 text-white text-[1rem] px-6 py-2 rounded-xl hover:bg-gray-300">Save</button>
                    </div>

                </div>

            </div>
        </>

    )
}


export const EditTaskListModal = ({ isOpen, onClose, onSave, editTaskList, setEditTaskList, workspace_id }) => {

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
            <div className="fixed  inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4 w-[240px] md:w-[300px] md:max-w-2xl md:max-h-full bg-white rounded-lg shadow ">

                    <div className="flex items-end justify-end">

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            <CloseIcon className="w-3 h-3" />

                        </button>
                    </div>

                    <h2 className="text-center text-bodyTextColor text-[1.4rem]">Edit TaskList</h2>
                    <div className="p-4 md:p-5 space-y-4">

                        <input
                            name="name"
                            value={editTaskList.name}
                            onChange={handleNameChange}
                            className="outline outline-gray-300 px-3 py-1 rounded-xl w-full text-gray-700"
                            placeholder="Task Name"

                        />
                        <div className="flex justify-between items-center outline outline-gray-300 py-1 rounded-xl ">

                            <DatePicker
                                selected={editTaskList.deadline}
                                onChange={handleDateChange}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Select deadline"
                                className="text-gray-700 outline-none w-[7rem] ml-3"
                            />
                            <CalendarIcon className="text-gray-700 mr-3" />
                        </div>

                        <div className="flex justify-center">

                            <button onClick={onSave} className=" bg-gray-400 hover:text-gray-800 text-white text-[1rem] px-6 py-2 rounded-xl hover:bg-gray-300">Save</button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}


export const AssginedUserModal = ({ isOpen, onClose, tasklist_id, workspace_id }) => {

    const workinguser = useSelector((state) => state.tasklist.workinguser)

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {

            try {
                // console.log("call");
                await dispatch(showWorkingUser({ tasklist_id }))

            } catch (error) {
                // console.log("Error in showing user")
                return toast.error("Error in showing user");

            }
        }
        fetchUser();

    }, [dispatch, tasklist_id])
    // console.log(workinguser);

    if (!isOpen) return null;

    return (

        <>
            <div className="fixed w-full inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative p-4 w-[250px] md:w-1/5 md:max-w-2xl md:max-h-full bg-white rounded-lg shadow ">

                    <div className="flex items-end justify-end">

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            <CloseIcon className="w-3 h-3" />

                        </button>
                    </div>
                    <h2 className="text-center text-bodyTextColor text-[1.4rem]">Working Users</h2>

                    <div className="p-4 md:p-5 space-y-4">
                        {workinguser?.length > 0 ? (
                            workinguser?.map((user, index) => (
                                <li
                                    key={index}
                                    className="list-none bg-gray-300 w-full p-2 rounded-md"
                                >
                                    <span className="text-black ">{user?.firstName}</span>
                                </li>
                            ))
                        ) : (<div className="text-center">No Working Member in this list</div>)


                        }

                    </div>

                </div>
            </div>
        </>
    )
}

//Todo modal
export const EditTodoModal = ({ isOpen, onClose, workspace_id }) => {
    const tasklists = useSelector((state) => state.tasklist?.tasklist);
    const { isTodoIndex, tasklistIndex, isEditTodoLoding } = useSelector((state) => state.misc)

    const [title, setTitle] = useState(tasklists?.[tasklistIndex]?.todos?.[isTodoIndex]?.title);
    // console.log(title);

    const dispatch = useDispatch();


    const onSave = async (e) => {
        e.preventDefault();

        const todo_id = tasklists[tasklistIndex]?.todos[isTodoIndex]?._id;
        if (title == tasklists[tasklistIndex]?.todos[isTodoIndex]?.title) {

            dispatch(setIsTodoEditModal(false));
            dispatch(setIsTodoEditMenu(false));
            return;
        }
        // console.log(title);
        try {
            await dispatch(editTodo({ todo_id, title }));
            await dispatch(fetchTasklist(workspace_id));
            dispatch(setIsTodoEditModal(false));
            dispatch(setIsTodoEditMenu(false));
            toast.success("Task editted successfully")
        } catch (error) {
            return toast.error("Failed to edit Task");
        }
    }



    if (!isOpen) return null;

    return (

        <>
            <div className="fixed w-full inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative w-[280px] p-4 md:w-1/5 md:max-w-2xl md:max-h-full bg-white rounded-lg shadow ">

                    <div className="flex items-end justify-end">

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            <CloseIcon className="w-3 h-3" />

                        </button>
                    </div>


                    <h2 className="text-center text-bodyTextColor text-[1.4rem]">Edit Todo</h2>

                    <div className="p-4 md:p-5 space-y-4">
                        {/* <div>Edit Todo Modal</div> */}
                        {/* <input
                            value={title} onChange={(e) => setTitle(e.target.value)}
                            className="outline outline-gray-300 px-3 py-1 rounded-xl w-full text-gray-700"
                        /> */}

                        <textarea
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}

                            className="outline outline-gray-300 px-3 py-1 rounded-xl w-full text-gray-700 resize-none overflow-hidden"
                            placeholder="Type your title here..."
                            style={{
                                height: 'auto', // Reset height to auto
                            }}
                            onInput={(e) => {
                                e.target.style.height = 'auto'; // Reset the height
                                e.target.style.height = `${e.target.scrollHeight}px`; // Set to the scroll height
                            }}
                        />
                        <div className="flex justify-center">
                            <button
                                onClick={onSave}
                                className=" bg-gray-400 hover:text-gray-800 text-white text-[1rem] px-6 py-2 rounded-xl hover:bg-gray-300"
                            >
                                {
                                    isEditTodoLoding ? (<ClipLoader size={15} />) : ("Save")
                                }

                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}


export const TodoLabelsModal = ({ isOpen, onClose, workspace_id }) => {
    const tasklists = useSelector((state) => state.tasklist?.tasklist);
    const { isTodoLabelLoading } = useSelector((state) => state.tasklist.isTodoLabelLoading)
    const { isTodoIndex, tasklistIndex } = useSelector((state) => state.misc)

    const [selectedLabel, setSelectedLabel] = useState("");
    const dispatch = useDispatch();


    const labels = [
        { value: "Moderate", color: "#E2B203" },
        { value: "Urgent", color: "#FD9891" }

    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const todo_id = tasklists[tasklistIndex]?.todos[isTodoIndex]?._id;
        if (selectedLabel == "" || selectedLabel == tasklists[tasklistIndex]?.todos[isTodoIndex]?.label) {

            onClose();
            dispatch(setIsTodoEditMenu(false));
            return;
        }
        try {
            await dispatch(todoLabel({ todo_id, selectedLabel }))
            await dispatch(fetchTasklist(workspace_id));
            onClose();
            dispatch(setIsTodoEditMenu(false));
        } catch (error) {
            //  console.log(error);
            return toast.error("Error in updating Label");

        }

    };

    if (!isOpen) return null;

    return (

        <>
            <div className="fixed w-full inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                <div className="relative w-[280px] p-4 md:w-1/5 md:max-w-2xl md:max-h-full bg-white rounded-lg shadow">

                    <div className="flex items-end justify-end">

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            <CloseIcon className="w-3 h-3" />

                        </button>
                    </div>
                    <h2 className="text-center text-bodyTextColor text-[1.4rem]">Label</h2>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-3">
                        <div className="w-full">

                            <div className="flex flex-col gap-4 justify-center items-center w-full ">
                                {labels.map((label) => (
                                    <div
                                        key={label.value}
                                        className="flex items-center w-full "
                                    >
                                        <input
                                            type="radio"
                                            id={label.value}
                                            name="label"
                                            value={label.value}
                                            checked={selectedLabel === label.value}
                                            onChange={(e) => setSelectedLabel(e.target.value)}
                                            className="hidden w-full"
                                        />
                                        <label
                                            htmlFor={label.value}
                                            className={`cursor-pointer p-2 rounded-md text-white  w-full ${selectedLabel === label.value ? 'ring-4 ring-offset-2 ring-blue-300' : ''}`}
                                            style={{ backgroundColor: label.color }}
                                        >
                                            {label.value}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-400 hover:text-gray-800 text-white  hover:bg-gray-300 p-2 rounded-xl "
                        >
                            {
                                isTodoLabelLoading ? (<ClipLoader size={15} />) : (<span>Update Label</span>)
                            }

                        </button>
                    </form>

                </div>
            </div>
        </>
    )
}
