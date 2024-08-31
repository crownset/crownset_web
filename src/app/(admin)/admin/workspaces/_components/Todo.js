"use client"

import { BsPlus as PlusIcon } from "react-icons/bs";
import { CiMenuKebab as EditIcon } from "react-icons/ci";
import { FcCollapse, FcExpand } from "react-icons/fc";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { IoCheckmarkDoneCircle as DoneIcon } from "react-icons/io5";
import { MdOutlineModeEditOutline as EditTodoIcon } from "react-icons/md";

import {
    setIsAssginedUserModal,
    setIsEditTaskListModal,
    setIsShareModal,
    setIsTodoEditMenu,
    setIsTodoEditModal,
    setIsTodoIndex,
    setIsTodoLabelsModal,
    setTasklsitIndex
} from "@/redux/slices/misc";
import { createTodo, fetchTasklist, markTodoDone } from '@/redux/slices/tasklistSlice';
import moment from "moment";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';


const Todo = ({ listIndex, taskList, handleEditTaskList, onCancelEditTaskList, isEditingTaskList, workspace_id }) => {

    const { isCreatingTodo } = useSelector((state) => state.tasklist)

    const { isTodoEditMenu, isTodoIndex, tasklistIndex, isTodoEditModal } = useSelector((state) => state.misc);
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState(taskList?.todo);
    const [showAddTodo, setShowAddTodo] = useState(false);

    const list_id = taskList?._id;

    console.log(taskList)

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
        // console.log(data);
        try {
            const res = await dispatch(createTodo({ list_id, data }))
            setNewTodo('')
            dispatch(fetchTasklist(workspace_id));
            toast.success("Todo added");

        } catch (error) {
            toast.error("Failed To add Todo")

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
        const todo_id = taskList?.todo[isTodoIndex]?._id;
        console.log(todo_id);
        const data = {
            todo_id
        }

        try {
            await dispatch(markTodoDone(data));
            dispatch(setIsTodoIndex(null));
            console.log("mark done")
        } catch (error) {
            console.log("Faild to mark done", error)
        }
    }

    return (
        <div className="bg-gray-100 relative py-4 px-0   mt-5 md:mt-0 rounded-2xl shadow flex-none md:w-[300px] ">

            <div className="relative flex justify-between items-center">

                <div className="flex flex-col px-4">

                    <span className="font-semibold text-gray-700 text-[1rem]">
                        {taskList?.name}
                    </span>
                    <span className="text-gray-500 text-[0.7rem]">
                        (Deadline : {moment(taskList?.deadline).format('LL')})
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
                        className="p-2 rounded-lg md:hidden"
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

                    ) : null}

                </div>

                {isEditingTaskList && (
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
                        {/* <span className="cursor-pointer bg-transparent hover:bg-gray-200 py-1 pl-2" onClick={deleteTaskList}>delete</span> */}
                        {/* <span className="cursor-pointer" onClick={markListDone}>Mark as done</span> */}
                    </div>
                )
                }
            </div>

            {isOpen && (
                <>
                    <div className="">
                        <ul className="mt-4 max-h-[30rem] flex flex-col justify-start items-start px-4 scrollbar-custom">

                            {todos?.map((todo, todoIndex) => (
                                <li
                                    key={todoIndex}
                                    className="group relative rounded-xl mt-4 flex-none  px-3 py-1 w-[260px] sm:w-[560px] md:w-[270px] bg-white  hover:outline hover:outline-blue-500 shadow"
                                >

                                    <div className="flex justify-between items-end ">

                                        <span className="">{todo?.title}</span>

                                        <div className="flex justify-center items-center gap-3">

                                            <div>
                                                {
                                                    todo?.is_completed && <span><DoneIcon className="text-green-700" /></span>
                                                }
                                            </div>
                                            <button
                                                onClick={() => { handleOpenTodoEditMenu(todoIndex) }}
                                                className=" absolute flex ml-[85%] justify-center items-center bg-transparent hover:bg-gray-100 p-1 rounded-full"
                                            >
                                                <EditTodoIcon className=" md:hidden md:group-hover:block text-bodyTextColor transition-opacity duration-300 ease-in-out" />
                                            </button>
                                        </div>

                                    </div>

                                    {(isTodoIndex == todoIndex && tasklistIndex == listIndex && isTodoEditMenu) && (
                                        <div className="absolute flex flex-col z-10  bg-white shadow rounded-lg right-3 top-10 w-[7rem] ">

                                            <span>
                                                <CloseIcon
                                                    className='text-[1.5rem] text-bodyTextColor cursor-pointer ml-20 mt-2 bg-transparent hover:bg-gray-200 p-1 rounded-lg'
                                                    onClick={handleCloseTodoEditMenu}
                                                />
                                            </span>

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
                                                Mark as done
                                            </span>

                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* add todo button */}



                        {showAddTodo ? (

                            <div className="mt-4 flex flex-col justify-start items-start mx-4">
                                <input
                                    type="text"
                                    value={newTodo}
                                    onChange={(e) => setNewTodo(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-xl h-auto px-3  flex-none outline-blue-500"
                                    placeholder="Enter new todo"
                                />
                                <div className="inline-flex gap-2 justify-center items-center ">

                                    <button
                                        onClick={handleAddTodo}
                                        className="mt-2 bg-blue-500 text-white p-2 rounded-xl  flex justify-center items-center"
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
                        ) : null


                        )}

                    </div>
                </>
            )}
        </div>
    );
}

export default Todo