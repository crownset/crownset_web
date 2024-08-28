"use client"

import { FaRegEdit } from "react-icons/fa";
import { FcExpand } from "react-icons/fc";
import { FcCollapse } from "react-icons/fc";
import { CiMenuKebab as EditIcon } from "react-icons/ci";
import { MdOutlineModeEditOutline as EditTodoIcon } from "react-icons/md";
import { BsPlus as PlusIcon } from "react-icons/bs";
import { IoMdClose as CloseIcon } from "react-icons/io";

import { createTodo, fetchTasklist } from '@/redux/slices/tasklistSlice';
import { assignUsers } from '@/redux/slices/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { MoonLoader, BeatLoader, ClipLoader } from "react-spinners";
import moment from "moment";
import { setIsTodoEditMenu, setIsTodoIndex, setTasklsitIndex, setIsTodoEditModal, setIsTodoLabelsModal } from "@/redux/slices/misc";


const Todo = ({ listIndex, taskList, handleEditTaskList, onCancelEditTaskList, isEditingTaskList, editTaskList,
    setEditTaskList, workspace_id, onShare, onUsers, onEdit, markListDone }) => {

    const { isCreatingTodo } = useSelector((state) => state.tasklist)
  
    const { isTodoEditMenu, isTodoIndex, tasklistIndex,isTodoEditModal } = useSelector((state) => state.misc);
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState(taskList?.todo);
    const [showAddTodo, setShowAddTodo] = useState(false);
    


    const list_id = taskList?._id;

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

    const handleOpenTodoEdit = () => {
        dispatch(setIsTodoEditModal(true));
        
        console.log("open todo edit");

    }
    

    const handleOpenLabels = () => {
        dispatch(setIsTodoLabelsModal(true));
        console.log("open labels");
    }
   

    const handleTodoMarkDone = (todoIndex) => {
        console.log("mark done")

    }

    const handleShowAddTodo = () => {
        setShowAddTodo(true);
    }

    const handleShowAddTodoClose = () => {
        setShowAddTodo(false);

    }



    return (
        <div className="bg-[#f1f2f4] relative p-4  mt-5 md:mt-0 rounded-2xl shadow flex-none md:w-[300px] ">

            <div className="relative flex justify-between items-center">

                <div className="flex flex-col">
                    <span className="font-semibold text-gray-700 text-[1rem]">{taskList.name}</span>
                    <span className="text-gray-500 text-[0.7rem]"> (Deadline:{moment(taskList.deadline).format('LL')})</span>

                </div>

                <div>
                    <button onClick={toggleAccordion} className="p-2 rounded-lg md:hidden" >
                        {isOpen ? <FcCollapse className="text-gray-700" /> : <FcExpand className="text-gray-700" />}
                    </button>

                    {
                        user?.data?.accessId == 1 ? (
                            <button className="ml-2  text-white p-2 rounded-lg">
                                <EditIcon className="text-black" onClick={handleEditTaskList} />
                            </button>
                        ) : null
                    }



                </div>

                {
                    isEditingTaskList && (
                        <div className="absolute flex flex-col z-10 p-4 bg-white shadow gap-3 rounded-sm right-3 top-10">
                            <span><CloseIcon className='text-[1rem] text-bodyTextColor cursor-pointer ml-16' onClick={onCancelEditTaskList} /></span>
                            <span className="cursor-pointer" onClick={onEdit}>Edit</span>
                            <span className="cursor-pointer" onClick={onShare}>Share</span>
                            <span className="cursor-pointer" onClick={onUsers}>Users</span>
                            <span className="cursor-pointer" >delete</span>
                            {/* <span className="cursor-pointer" onClick={markListDone}>Mark as done</span> */}
                        </div>
                    )
                }
            </div>

            {isOpen && (
                <>
                    <div className="">
                        <ul className="mt-4 flex flex-col justify-start items-start">

                            {todos?.map((todo, todoIndex) => (
                                <li key={todoIndex} className="group relative rounded-xl mt-4 flex-none  px-3 py-1 w-[260px] sm:w-[560px] md:w-[270px] bg-white  hover:outline hover:outline-primary-color shadow" >

                                    <div className="flex justify-between items-end ">
                                        <span className="">{todo.title}</span>
                                        <button
                                            onClick={() => { handleOpenTodoEditMenu(todoIndex) }}
                                            className=" bg-white absolute flex ml-[85%] justify-center items-center"
                                        >
                                            <EditTodoIcon className=" md:hidden md:group-hover:block transition-opacity duration-300 ease-in-out" />
                                        </button>
                                    </div>

                                    {
                                        (isTodoIndex == todoIndex && tasklistIndex == listIndex && isTodoEditMenu) && (
                                            <div className="absolute flex flex-col z-10 p-4 bg-white shadow gap-3 rounded-sm right-3 top-10">
                                                <span><CloseIcon className='text-[1rem] text-bodyTextColor cursor-pointer ml-16' onClick={handleCloseTodoEditMenu} /></span>
                                                <span className="cursor-pointer" onClick={handleOpenTodoEdit}>Edit</span>
                                                <span className="cursor-pointer" onClick={handleOpenLabels}>labels</span>
                                                <span className="cursor-pointer" onClick={handleTodoMarkDone}>Mark as done</span>
                                            </div>
                                        )
                                    }


                                </li>
                            ))}
                        </ul>

                        {/* add todo button */}

                        {
                            showAddTodo ? (
                                <div className="mt-4 flex flex-col justify-start items-start">
                                    <input
                                        type="text"
                                        value={newTodo}
                                        onChange={(e) => setNewTodo(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-xl h-auto px-3  flex-none outline-none"
                                        placeholder="Enter new todo"
                                    />
                                    <div className="inline-flex gap-2 justify-center items-center ">
                                        <button
                                            onClick={handleAddTodo}
                                            className="mt-2 bg-blue-500 text-white p-2 rounded-xl  flex justify-center items-center"
                                        >
                                            {
                                                isCreatingTodo ? (<ClipLoader size={15} />) : (<span>Add</span>)
                                            }
                                        </button>
                                        <span onClick={handleShowAddTodoClose}><CloseIcon className="text-[1.3rem] text-bodyTextColor cursor-pointer" /></span>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className=" mt-4 text-bodyTextColor font-semibold gap-1 hover:bg-blue-100 cursor-pointer rounded-xl px-2 py-1 inline-flex justify-center items-center"
                                    onClick={handleShowAddTodo}>
                                    <span className="text-[1.5rem]"><PlusIcon /></span>
                                    <span className="text-[0.8rem]">Add Todo</span>
                                </div>
                            )

                        }
                    </div>


                </>
            )}


        </div>
    );
}

export default Todo