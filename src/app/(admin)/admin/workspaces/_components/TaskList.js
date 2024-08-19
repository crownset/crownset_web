"use client"
import { useState } from 'react';
import Todo from './Todo';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { createlist } from '@/redux/slices/tasklistSlice';

export default function TaskList({workspace_id}) {

   const dispatch = useDispatch();
   const tasklists = useSelector((state)=>state.tasklist?.tasklist?.tasklists);
  //  console.log(tasklists);
  
    const [newTaskList, setNewTaskList] = useState({ name: '', deadline: '' ,workspace_id:workspace_id});
    const [editingTaskListIndex, setEditingTaskListIndex] = useState(null);
    const [editTaskList, setEditTaskList] = useState({ name: '', deadline: '', share: '' });

  // add newtasklist
    const handleAddTaskList = async() => {
      
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
      setEditTaskList({ name: taskList.name, deadline: taskList.deadline, share: taskList.share });
    };
  
    const handleSaveEditTaskList = async(index) => {

      if(!editTaskList.name && !editTaskList.deadline && !editTaskList.share){
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
      <div className="w-full max-w-md mx-auto mt-10">
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
        <div className="">

          <div className='bg-gray-100 p-4 rounded-lg shadow-md'>
            
          <input
            type="text"
            value={newTaskList.name}
            onChange={(e) => setNewTaskList({ ...newTaskList, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter task list name"
          />
          <input
            type="date"
            value={newTaskList.deadline}
            onChange={(e) => setNewTaskList({ ...newTaskList, deadline: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
            placeholder="Enter deadline"
          />
          <button
            onClick={handleAddTaskList}
            className="mt-2 bg-blue-500 text-white p-2 rounded-lg"
          >
            Add Task List
          </button>

          </div>  

          <div className="mt-4">
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
      </div>
    );
}
