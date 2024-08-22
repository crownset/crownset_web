"use client"
import { useState } from 'react';
import Todo from './Todo';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { createlist } from '@/redux/slices/tasklistSlice';
import { BsPlus as PlusIcon } from "react-icons/bs";
import { IoMdClose as CloseIcon } from "react-icons/io";

export default function TaskList({ workspace_id }) {

  const dispatch = useDispatch();
  const tasklists = useSelector((state) => state.tasklist?.tasklist?.tasklists);
  //  console.log(tasklists);

  const [newTaskList, setNewTaskList] = useState({ name: '', deadline: '', workspace_id: workspace_id });
  const [editingTaskListIndex, setEditingTaskListIndex] = useState(null);
  const [editTaskList, setEditTaskList] = useState({ name: '', deadline: '' });




  // add newtasklist
  const handleAddTaskList = async () => {

    if (newTaskList.name == '') {
      toast.error("List field should not be empty")
      return;
    }
    if (newTaskList.deadline == '') {
      toast.error("Deadline field should not be empty")
      return;

    }

    if (newTaskList.name.trim() && newTaskList.deadline.trim()) {

      try {

        await dispatch(createlist(newTaskList));
        console.log("here");
        setNewTaskList({ name: '', deadline: '' });
        toast.success('List created successfully');
      } catch (error) {
        toast.error("Failed to create list")

      }
    }
  };

  const handleEditTaskList = (index) => {
    console.log("edit");
    const taskList = tasklists[index];
    // console.log(taskList);
    setEditingTaskListIndex(index);
    setEditTaskList({ name: taskList.name, deadline: taskList.deadline });
  };

  const handleSaveEditTaskList = async (index) => {

    if (!editTaskList.name && !editTaskList.deadline && !editTaskList.share) {
      console.log("no change")
      return;
    }
    console.log("save")
    const tasklist_id = tasklists[index]._id;

    const formData = {
      name: editTaskList.name,
      deadline: editTaskList.deadline,

    };
    const filteredData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});
    console.log(filteredData)

    // if(!editTaskList.share || editTaskList.share == ''){

    // }

    console.log(editTaskList);


    // const updatedTaskLists = [...taskLists];
    // updatedTaskLists[index] = { ...editTaskList, todos: updatedTaskLists[index].todos };
    // setTaskLists(updatedTaskLists);
    setEditingTaskListIndex(null);
  };

  const handleCancelEditTaskList = () => {
    console.log("cancel");
    setEditingTaskListIndex(null);
  };

  return (
    <div className="w-full mx-auto mt-10 ">
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
      {/* put condition for admin and employee */}
      <div className="w-full mx-auto  md:overflow-x-auto md:h-[80vh]">




        {/* {
          showAddList ? (

          ): (
              <div className = 'border border-black inline-flex gap-2 w-[300px] py-2 cursor-pointer rounded-[2rem] px-2 todoButtonEffect'
            onClick = { handleShowAddList }>
               <PlusIcon className = 'text-[1.5rem]'/>
        <span >Add new List</span>
      </div>
      )
        } */}



        <div className="mt-10  mx-4 md:flex md:gap-6 md:justify-start md:items-start">

          <div className='bg-gray-100 p-4 rounded-xl shadow-md  mx-4 md:w-[300px] flex-none'>

            <input
              type="text"
              value={newTaskList.name}
              onChange={(e) => setNewTaskList({ ...newTaskList, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-xl outline-none px-3 py-1 h-[2rem]"
              placeholder="Enter Task List Name"
            />
            <div  className='text-gray-400 mt-4'>
              <span className='ml-2 mt-4'>Deadline</span>
              <input
                type="date"
                name="deadline"
                value={newTaskList.deadline}
                onChange={(e) => setNewTaskList({ ...newTaskList, deadline: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-xl mt-2 outline-none px-3 py-1 h-[2rem]"
                placeholder="Enter deadline"
              />
            </div>

            <button
              onClick={handleAddTaskList}
              className="mt-2 bg-primary-color text-white px-6 py-1 w-full rounded-lg"
            >
              Add
            </button>



          </div>
          {tasklists && tasklists?.map((taskList, index) => (

            <Todo
              key={index}
              index={index}
              taskList={taskList}
              onEdit={() => handleEditTaskList(index)}
              onSaveEdit={() => handleSaveEditTaskList(index)}
              onCancelEdit={handleCancelEditTaskList}
              isEditing={editingTaskListIndex === index}
              editTaskList={editTaskList}
              setEditTaskList={setEditTaskList}

            />
          ))}
        </div>

      </div>
    </div >
  );
}
