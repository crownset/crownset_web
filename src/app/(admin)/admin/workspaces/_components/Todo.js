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


const Todo = ({ index, taskList, handleEditTaskList,  onCancelEditTaskList, isEditingTaskList, editTaskList,
    setEditTaskList, workspace_id, onShare, onUsers, onEdit, markListDone }) => {

    const { isCreatingTodo } = useSelector((state) => state.tasklist)
    const dispatch = useDispatch();


    const [isOpen, setIsOpen] = useState(true);
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState(taskList?.todo);
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [isEditTodoMenu, setIsEditTodoMenu] = useState(false);
    const [todoIndex,setTodoIndex] = useState(null);

    const list_id = taskList?._id;

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

    const handleOpenEditMenu = () => setIsEditTodoMenu(true);
    const handleCloseEditMenu = () => setIsEditTodoMenu(false);

    const handleSaveTodo = (todoIndex, newName) => {
        const updatedTodos = todos.map((todo, index) =>
            index === todoIndex ? { ...todo, name: newName, isEditing: false } : todo
        );
        setTodos(updatedTodos);
    };

    const handleCancelTodoEdit = (todoIndex) => {

        const updatedTodos = todos.map((todo, index) =>
            index === todoIndex ? { ...todo, isEditing: false } : todo
        );
        setTodos(updatedTodos);
    };

    // const handleToggleComplete = (todoIndex) => {
    //     const updatedTodos = todos.map((todo, index) =>
    //         index === todoIndex ? { ...todo, isCompleted: !todo.isCompleted } : todo
    //     );
    //     setTodos(updatedTodos);
    // };

    const handleLabelChange = (todoIndex, newLabel) => {
        const updatedTodos = todos.map((todo, index) =>
            index === todoIndex ? { ...todo, label: newLabel } : todo
        );
        setTodos(updatedTodos);
    };

    const handleShowAddTodo = () => {
        setShowAddTodo(true);
    }

    const handleShowAddTodoClose = () => {
        setShowAddTodo(false);

    }


    return (
        <div className="bg-[#f1f2f4] p-4  mt-5 md:mt-0 rounded-2xl shadow flex-none md:w-[300px]">

            <div className="relative flex justify-between items-center">

                <div className="flex flex-col">
                    <span className="font-semibold text-gray-700 text-[1rem]">{taskList.name}</span>
                    <span className="text-gray-500 text-[0.7rem]"> (Deadline:{moment(taskList.deadline).format('LL')})</span>

                </div>

                <div>
                    <button onClick={toggleAccordion} className="p-2 rounded-lg md:hidden" >
                        {isOpen ? <FcCollapse className="text-gray-700" /> : <FcExpand className="text-gray-700" />}
                    </button>

                    <button className="ml-2  text-white p-2 rounded-lg">
                        <EditIcon className="text-black" onClick={handleEditTaskList} />
                    </button>

                </div>

                {
                    isEditingTaskList && (
                        <div className="absolute flex flex-col z-10 p-4 bg-white shadow gap-3 rounded-sm right-3 top-10">
                            <span><CloseIcon className='text-[1rem] text-bodyTextColor cursor-pointer ml-16' onClick={onCancelEditTaskList} /></span>
                            <span className="cursor-pointer" onClick={onEdit}>Edit</span>
                            <span className="cursor-pointer" onClick={onShare}>Share</span>
                            <span className="cursor-pointer" onClick={onUsers}>Users</span>
                            {/* <span className="cursor-pointer" onClick={markListDone}>Mark as done</span> */}
                        </div>
                    )
                }
            </div>

            {isOpen && (
                <>
                    <div>
                        <ul className="mt-4 flex flex-col justify-start items-start">

                            {todos?.map((todo, todoIndex) => (
                                <li key={todoIndex} className="group relative rounded-xl mt-4 flex-none  px-3 py-1 w-[260px] sm:w-[560px] md:w-[270px] bg-white  hover:outline hover:outline-primary-color">

                                    <div className="flex justify-between items-end ">
                                        <span className="">{todo.title}</span>
                                        <button
                                            onClick={() => handleEditTodo(todoIndex)}
                                            className=" bg-white absolute ml-[85%] "
                                        >
                                            <EditTodoIcon className=" md:hidden md:group-hover:block transition-opacity duration-300 ease-in-out" />
                                        </button>
                                    </div>

                                    {
                                        isEditTodoMenu && (
                                            <div className="absolute flex flex-col z-10 p-4 bg-white shadow gap-3 rounded-sm right-3 top-10">
                                                <span><CloseIcon className='text-[1rem] text-bodyTextColor cursor-pointer ml-16' onClick={handleCloseEditMenu} /></span>
                                                <span className="cursor-pointer" onClick={onEdit}>Edit</span>
                                                <span className="cursor-pointer" onClick={onShare}>Share</span>
                                                <span className="cursor-pointer" onClick={onUsers}>Users</span>
                                                <span className="cursor-pointer" onClick={markListDone}>Mark as done</span>
                                            </div>
                                        )
                                    }

                                    {/* {isEditing && (
                                        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded p-4 z-10">
                                            <h3 className="text-lg font-semibold mb-2">Edit Item</h3>
                                            <input
                                                type="text"
                                                defaultValue={item}
                                                className="border border-gray-300 rounded p-2 mb-2 w-full"
                                            />
                                            <button
                                                onClick={handleCloseMenu}
                                                className="bg-red-500 text-white p-2 rounded w-full"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    )} */}

                                    {/* {todo.isEditing ? (
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={todo.name}
                                                onChange={(e) => handleSaveTodo(todoIndex, e.target.value)}
                                                className="p-2 border border-gray-300 rounded-lg"
                                            />
                                            <input
                                                type="text"
                                                value={todo.label}
                                                onChange={(e) => handleLabelChange(todoIndex, e.target.value)}
                                                className="p-2 border border-gray-300 rounded-lg mt-2"
                                                placeholder="Label"
                                            />
                                            <button
                                                onClick={() => handleSaveTodo(todoIndex, todo.name)}
                                                className="ml-2 bg-green-500 text-white p-1 rounded-lg"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => handleCancelTodoEdit(todoIndex)}
                                                className="ml-2 bg-red-500 text-white p-1 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <>



                                            <div className="flex justify-between items-end ">
                                                <span className="">{todo.title}</span>
                                                <button
                                                    onClick={() => handleEditTodo(todoIndex)}
                                                    className=" bg-white absolute ml-[85%] "
                                                >
                                                    <EditTodoIcon className=" md:hidden md:group-hover:block transition-opacity duration-300 ease-in-out" />
                                                </button>
                                            </div>


                                        </>
                                    )} */}
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