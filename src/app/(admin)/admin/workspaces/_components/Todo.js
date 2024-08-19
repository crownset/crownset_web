"use client"
import { createTodo } from '@/redux/slices/todoSlice';
import { assignUsers } from '@/redux/slices/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

const Todo = ({ index, taskList, onEdit, onSaveEdit, onCancelEdit, isEditing, editTaskList, setEditTaskList }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState(taskList.todo);
    const list_id = taskList?._id;

    const dispatch = useDispatch();
    const users = useSelector((state)=>state.user.user)
    // console.log(users);

    // console.log(editTaskList);

    // console.log(taskList);
    useEffect(()=>{
        const fetchuser = async()=>{
            try {
                await dispatch(assignUsers());
            } catch (error) {
                toast.error('Error in fetchin user');
                
            }
            
        }
        fetchuser();
    },[])


    const toggleAccordion = () => setIsOpen(!isOpen);

    //creating new todo
    const handleAddTodo = async () => {

        const data = {
            title: newTodo,
            workspace_id: taskList.workspace_id
        }
        try {
            await dispatch(createTodo({ list_id, data }))
            toast.success("Todo added");

        } catch (error) {
            toast.error("Failed To add Todo")

        }

    };

    const handleEditTodo = (todoIndex) => {
        const updatedTodos = todos.map((todo, index) =>
            index === todoIndex ? { ...todo, isEditing: true } : todo
        );
        setTodos(updatedTodos);
    };

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

    const handleToggleComplete = (todoIndex) => {
        const updatedTodos = todos.map((todo, index) =>
            index === todoIndex ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );
        setTodos(updatedTodos);
    };

    const handleLabelChange = (todoIndex, newLabel) => {
        const updatedTodos = todos.map((todo, index) =>
            index === todoIndex ? { ...todo, label: newLabel } : todo
        );
        setTodos(updatedTodos);
    };

    return (
        <div className="bg-white p-4 mb-2 rounded-lg shadow-sm">
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
            <div className="flex justify-between items-center">
                {isEditing ? (
                    <div className="flex-1">
                        <input
                            type="text"
                            value={editTaskList.name}
                            onChange={(e) => setEditTaskList({ name: e.target.value })}
                            className="p-2 border border-gray-300 rounded-lg"
                            placeholder="Task list name"
                        />
                        <input
                            type="date"
                            value={editTaskList.deadline}
                            onChange={(e) => setEditTaskList({deadline: e.target.value })}
                            className="p-2 border border-gray-300 rounded-lg mt-2"
                            placeholder="Deadline"
                        />
                        <select
                            value={editTaskList.share}
                            onChange={(e) =>
                                setEditTaskList({
                                
                                    share: e.target.value,
                                })
                            }
                            className="p-2 border border-gray-300 rounded-lg mt-2"
                        >
                            <option value="" >
                                Select a user
                            </option>
                            {users?.map((user) => (
                                <option key={user._id} value={user._id} className='text-white'>
                                    {user.firstName}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={onSaveEdit}
                            className="ml-2 bg-green-500 text-white p-1 rounded-lg"
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancelEdit}
                            className="ml-2 bg-red-500 text-white p-1 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="flex-1">
                        <span className="font-semibold text-gray-700">{taskList.name}</span>
                        <span className="text-gray-500"> (Deadline: {taskList.deadline})</span>
                        {/* {taskList.share && (
                            <div className="text-gray-600 mt-1">Shared with: {taskList.share}</div>
                        )} */}
                    </div>
                )}
                <button
                    onClick={toggleAccordion}
                    className="bg-gray-300 text-gray-700 p-2 rounded-lg"
                >
                    {isOpen ? 'Collapse' : 'Expand'}
                </button>
                {!isEditing && (
                    <button
                        onClick={onEdit}
                        className="ml-2 bg-yellow-500 text-white p-2 rounded-lg"
                    >
                        Edit
                    </button>
                )}
            </div>

            {isOpen && (
                <>
                    <div className="mt-4">
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Enter new todo"
                        />
                        <button
                            onClick={handleAddTodo}
                            className="mt-2 bg-blue-500 text-white p-2 rounded-lg"
                        >
                            Add Todo
                        </button>
                    </div>
                    <ul className="mt-4">
                        {todos?.map((todo, todoIndex) => (
                            <li key={todoIndex} className="bg-gray-200 p-2 rounded-lg mt-2 flex items-center">
                                {todo.isEditing ? (
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
                                        <span className={`flex-1 ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}>{todo.title}</span>
                                        {/* <span className="text-gray-600 ml-2">{todo.label}</span> */}
                                        <button
                                            onClick={() => handleToggleComplete(todoIndex)}
                                            className={`ml-2 ${todo.isCompleted ? 'bg-green-500' : 'bg-gray-300'} text-white p-1 rounded-lg`}
                                        >
                                            {todo.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                                        </button>
                                        <button
                                            onClick={() => handleEditTodo(todoIndex)}
                                            className="ml-2 bg-yellow-500 text-white p-1 rounded-lg"
                                        >
                                            Edit
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Todo