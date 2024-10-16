"use client"
import moment from "moment";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';


import { BsPlus as PlusIcon } from "react-icons/bs";
import { CiMenuKebab as EditIcon } from "react-icons/ci";
import { FcCollapse, FcExpand } from "react-icons/fc";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { IoCheckmarkDoneCircle as DoneIcon } from "react-icons/io5";
import { MdOutlineModeEditOutline as EditTodoIcon } from "react-icons/md";


import {
    setIsAssginedUserModal, setIsEditTaskListModal,
    setIsShareModal, setIsTodoEditMenu,
    setIsTodoEditModal, setIsTodoIndex,
    setIsTodoLabelsModal, setTasklsitIndex
} from "@/redux/slices/misc";
import { createTodo, fetchTasklist, markForReview, markTodoDone } from '@/redux/slices/tasklistSlice';



const Todo = ({ listIndex, taskList, handleEditTaskList, onCancelEditTaskList, isEditingTaskList, workspace_id, deleteTaskList }) => {

    const { isCreatingTodo } = useSelector((state) => state.tasklist)

    const { isTodoEditMenu, isTodoIndex, tasklistIndex, isTodoEditModal } = useSelector((state) => state.misc);
    const dispatch = useDispatch();
    // console.log(taskList);
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState(taskList?.todos);
    const [showAddTodo, setShowAddTodo] = useState(false);

    const list_id = taskList?._id;
    // console.log(taskList?.assign_to[0]?.firstName);

    useEffect(() => {

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));

        }
    }, [dispatch]);

    const toggleAccordion = () => setIsOpen(!isOpen);

    //creating new todo
    const handleAddTodo = async () => {

        if (!newTodo || newTodo == '') {
            toast.error("Todo is Empty");
            return
        }
        const data = {
            title: newTodo,
            workspace_id: taskList.workspace_id
        }

        try {
            const res = await dispatch(createTodo({ list_id, data }))
            setNewTodo('')
            dispatch(fetchTasklist(workspace_id));
            toast.success("Todo added");

        } catch (error) {
            return toast.error("Failed To add Todo")

        }

    };


    const handleOpenTodoEditMenu = (todoIndex) => {
        dispatch(setIsTodoEditMenu(true))
        dispatch(setIsTodoIndex(todoIndex));
        dispatch(setTasklsitIndex(listIndex))
    }


    const handleCloseTodoEditMenu = () => {

        dispatch(setIsTodoEditMenu(false));
        dispatch(setIsTodoIndex(null));
        dispatch(setTasklsitIndex(null));
    }


    const handleTodoMarkDone = async () => {
        const todo_id = taskList?.todos[isTodoIndex]?._id;
        // console.log(taskList?.todo[isTodoIndex]?.is_completed);
        if (taskList?.todos[isTodoIndex]?.is_completed) {
            return toast.success("Already Approved");
        }
        // console.log(todo_id);
        const data = {
            todo_id
        }

        try {
            await dispatch(markTodoDone(data));
            dispatch(setIsTodoIndex(null));
            await dispatch(fetchTasklist(workspace_id));
            toast.success("Todo Mark Done")
        } catch (error) {
            return toast.error("Error in updating todo status")
        }
    }

    const handleTodoMarkForReview = async () => {
        const todo_id = taskList?.todos[isTodoIndex]?._id;
        // console.log(taskList?.todo[isTodoIndex]?.is_completed);
        if (taskList?.todos[isTodoIndex]?.mark_for_review) {
            return toast.success("Already Requested");
        }
        // console.log(todo_id);
        const data = {
            todo_id
        }

        try {
            await dispatch(markForReview(data));
            dispatch(setIsTodoIndex(null));
            await dispatch(fetchTasklist(workspace_id));
            toast.success("Todo Mark For Review")
        } catch (error) {
            return toast.error("Error in updating todo status")
        }
    }

    return (
        <div className="bg-gray-100  py-4 px-0   mt-5 sm:mt-0 rounded-2xl shadow flex-none w-[300px] sm:w-[300px] ">

            <div className="relative flex justify-between items-center">


                <div className="flex flex-col px-4">
                    <span className="font-semibold text-gray-700 text-[1rem]">
                        {taskList?.name}
                    </span>
                    <span className="text-gray-500 text-[0.7rem]">
                        (Deadline : {moment(taskList?.deadline).format('LL')})
                    </span>
                    <span className="text-gray-500 text-[0.7rem] flex ">
                        ( {taskList?.assign_to?.map((user, index) => (
                            <li key={index} className='list-none mr-1 text-gray-600'>{user.firstName}</li>
                        ))
                        })
                    </span>
                </div>


                <div>
                    {taskList?.status == "ontime" ? (
                        <span className="bg-green-900 p-1 rounded-lg text-[0.8rem] text-white">
                            {taskList?.status}
                        </span>
                    ) : taskList?.status == "delay" ? (
                        <span className="bg-red-800 p-1 rounded-lg text-[0.8rem] text-white">
                            {taskList?.status}
                        </span>
                    ) : (
                        <span className="bg-yellow-600 p-1 rounded-lg text-[0.8rem] text-white">
                            {taskList?.status}
                        </span>
                    )}
                </div>


                <div>
                    <button
                        className="p-2 rounded-lg sm:hidden"
                        onClick={toggleAccordion}
                    >
                        {isOpen ?
                            <FcCollapse className="text-gray-700" /> :
                            <FcExpand className="text-gray-700" />
                        }
                    </button>

                    {user?.data?.accessId == 1 ? (

                        <button className="ml-2  bg-transparent hover:bg-gray-200 hover:rounded-full p-2">
                            <EditIcon className="text-black" onClick={handleEditTaskList} />
                        </button>

                    ) : null
                    }
                </div>


                {
                    isEditingTaskList && (


                        <div className="absolute flex flex-col z-10  bg-white shadow rounded-lg right-3 top-10 py-1 w-[6rem]">
                            <span className="">
                                <CloseIcon
                                    className='text-[1.5rem] text-bodyTextColor cursor-pointer ml-16 mt-2 bg-transparent hover:bg-gray-200  p-1 rounded-lg'
                                    onClick={onCancelEditTaskList}
                                />
                            </span>
                            <span
                                className="cursor-pointer bg-transparent hover:bg-gray-200 py-1 pl-2 "
                                onClick={() => { dispatch(setIsEditTaskListModal(true)) }}
                            >
                                Edit
                            </span>
                            <span
                                className="cursor-pointer bg-transparent hover:bg-gray-200 py-1 pl-2 "
                                onClick={() => { dispatch(setIsShareModal(true)) }}
                            >
                                Share
                            </span>
                            <span
                                className="cursor-pointer bg-transparent hover:bg-gray-200 py-1 pl-2"
                                onClick={() => { dispatch(setIsAssginedUserModal(true)) }}
                            >
                                Users
                            </span>
                            <span className="cursor-pointer bg-transparent hover:bg-gray-200 py-1 pl-2" onClick={deleteTaskList}>delete</span>
                            {/* <span className="cursor-pointer" onClick={markListDone}>Mark as done</span> */}
                        </div>


                    )
                }


            </div>


            {isOpen && (
                <>
                    <div className="">


                        <ul className="mt-4  flex flex-col justify-start items-start px-4 scrollbar-custom">

                            {todos?.map((todo, todoIndex) => (

                                <li
                                    key={todoIndex}
                                    className="group relative rounded-xl mt-4 pb-2 flex-none  px-3 py-1 w-[270px]  sm:w-[270px] bg-white  hover:outline hover:outline-blue-500 shadow"
                                >


                                    <div className="flex justify-between items-end ">
                                        <span className="">{todo?.title}</span>
                                        <div className="mr-6 flex items-center">
                                            {
                                                todo?.is_completed ? (<span><DoneIcon className="text-green-700" /></span>

                                                ) : todo?.mark_for_review ? (
                                                    <span className="text-blue-500">Review</span>
                                                ) : null
                                            }
                                            {/* <span><DoneIcon className="text-green-700 " /></span> */}
                                        </div>
                                        <button
                                            onClick={() => { handleOpenTodoEditMenu(todoIndex) }}
                                            className=" absolute flex ml-[85%] justify-center items-center bg-transparent hover:bg-gray-100 p-1 rounded-full"
                                        >
                                            <EditTodoIcon className=" sm:hidden sm:group-hover:block text-bodyTextColor transition-opacity duration-300 ease-in-out" />
                                        </button>
                                    </div>


                                    <div className="h-[4px] absolute">
                                        {todo?.label === 'Moderate' ? (
                                            <div className="bg-[#E2B203] h-[4px] w-[2.5rem] rounded-2xl"></div>
                                        ) : todo?.label === "Urgent" ? (
                                            <div className="bg-[#FD9891]  h-[4px] w-[2.5rem] rounded-2xl"></div>

                                        ) : null

                                        }
                                    </div>


                                    {(isTodoIndex == todoIndex && tasklistIndex == listIndex && isTodoEditMenu) && (
                                        <div className="absolute flex flex-col z-10  bg-white shadow rounded-lg right-3 top-10 w-[7rem] ">
                                            <span>
                                                <CloseIcon
                                                    className='text-[1.5rem] text-bodyTextColor cursor-pointer ml-20 mt-2 bg-transparent hover:bg-gray-200 p-1 rounded-lg'
                                                    onClick={handleCloseTodoEditMenu}
                                                />
                                            </span>
                                            {
                                                user?.data?.accessId == 1 && (
                                                    <>

                                                        <span
                                                            className="cursor-pointer bg-transparent hover:bg-gray-200 py-1 pl-2"
                                                            onClick={() => { dispatch(setIsTodoEditModal(true)) }}
                                                        >
                                                            Edit
                                                        </span>
                                                        <span
                                                            className="cursor-pointer bg-transparent hover:bg-gray-200 py-1 pl-2"
                                                            onClick={() => { dispatch(setIsTodoLabelsModal(true)) }}
                                                        >
                                                            labels
                                                        </span>
                                                        <span
                                                            className="cursor-pointer bg-transparent hover:bg-gray-200 py-1 pl-2"
                                                            onClick={handleTodoMarkDone}
                                                        >
                                                            Approved
                                                        </span>
                                                    </>

                                                )

                                            }

                                            {
                                                user?.data?.accessId == 2 && (
                                                    <span
                                                        className="cursor-pointer bg-transparent hover:bg-gray-200 py-1 pl-2"
                                                        onClick={handleTodoMarkForReview}
                                                    >
                                                        Mark For Review
                                                    </span>

                                                )
                                            }

                                        </div>
                                    )}


                                </li>
                            ))}

                        </ul>

                        {/* add todo button */}

                        {user?.data?.accessId === 1 ? (

                            showAddTodo ? (

                                <div className="mt-4 flex flex-col justify-start items-start mx-4">

                                    {/* <input
                                        type="text"
                                        value={newTodo}
                                        onChange={(e) => setNewTodo(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-xl h-auto px-3  flex-none outline-blue-500"
                                        placeholder="Enter new todo"
                                    /> */}
                                    <textarea
                                        value={newTodo}
                                        onChange={(e) => setNewTodo(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-xl h-auto px-3 flex-none outline-blue-500 resize-none overflow-hidden"
                                        placeholder="Enter new todo"
                                        rows={1} // Start with one row
                                        style={{
                                            height: 'auto', // Reset the height to auto
                                        }}
                                        onInput={(e) => {
                                            e.target.style.height = 'auto'; // Reset height to auto
                                            e.target.style.height = `${e.target.scrollHeight}px`; // Adjust the height based on content
                                        }}
                                    />


                                    <div className="inline-flex gap-2 justify-center items-center ">

                                        <button
                                            onClick={handleAddTodo}
                                            className="mt-2 bg-gray-400 hover:text-gray-800 text-white  hover:bg-gray-300 p-2 rounded-xl  flex justify-center items-center"
                                        >
                                            {isCreatingTodo ? (

                                                <ClipLoader size={15} />

                                            ) : (

                                                <span>Add</span>

                                            )}
                                        </button>


                                        <span
                                            onClick={() => { setShowAddTodo(false) }}
                                            className="bg-transparent hover:bg-gray-200 p-2 rounded-lg"
                                        >
                                            <CloseIcon className="text-[1.3rem] text-bodyTextColor cursor-pointer" />
                                        </span>

                                    </div>

                                </div>
                            ) : (!taskList?.is_complete ? (

                                <div
                                    className="mt-4 text-bodyTextColor font-semibold gap-1 bg-transparent hover:bg-gray-200 cursor-pointer rounded-xl px-3 ml-4 py-1 inline-flex justify-center items-center"
                                    onClick={() => { setShowAddTodo(true) }}
                                >
                                    <span className="text-[1.5rem]">
                                        <PlusIcon />
                                    </span>
                                    <span className="text-[0.8rem]">Add Todo</span>

                                </div>

                            ) : null)) : null
                        }


                    </div>
                </>
            )}

        </div>
    );
}

export default Todo