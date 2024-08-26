"use client"
import { useState } from 'react';
import Todo from './Todo';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { createlist, editList } from '@/redux/slices/tasklistSlice';
import { BsPlus as PlusIcon } from "react-icons/bs";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { MoonLoader, BeatLoader, ClipLoader } from "react-spinners";
import { AssginedUserModal, EditTaskListModal, ShareTaskListModal } from './Modals';

export default function TaskList({ workspace_id }) {

  const dispatch = useDispatch();
  const tasklists = useSelector((state) => state.tasklist?.tasklist);
  const { isCreatingList } = useSelector((state) => state.tasklist)



  const [newTaskList, setNewTaskList] = useState({ name: '', deadline: '', workspace_id: workspace_id });
  const [editingTaskListIndex, setEditingTaskListIndex] = useState(null);
  const [editTaskList, setEditTaskList] = useState({ name: '', deadline: '' });

  const [isShareModal, setIsShareModal] = useState(false);
  const [isAssginedUserModal, setIsAssginedUserModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const handleAddTaskList = async (e) => {

    if (!newTaskList.name || newTaskList.name == '') {
      toast.error("List field should not be empty")
      return;
    }
    if (!newTaskList.deadline || newTaskList.deadline == '') {
      toast.error("Deadline field should not be empty")
      return;

    }
    try {

      await dispatch(createlist(newTaskList));
      // console.log("here");
      setNewTaskList({ name: '', deadline: '' });
      toast.success('List created successfully');
    } catch (error) {
      toast.error("Failed to create list")

    }

  };

  const handleEditTaskList = (index) => {
    // console.log("edit");
    console.log(index);
    const taskList = tasklists[index];
    setEditingTaskListIndex(index);
    setEditTaskList({ name: taskList.name, deadline: taskList.deadline });
  };
  const handleCancelEditTaskList = () => {
    console.log("cancel");
    setEditingTaskListIndex(null)
  };


  // MODAL Handler
  const handleOpenShareListModal = () => setIsShareModal(true)
  const handleCloseShareLsitModal = () => setIsShareModal(false)
  const handleSaveShareList = () => { console.log("save") };

  const handleOpenAssignedUserModal = () => setIsAssginedUserModal(true);
  const handleCloseAssignedUserModal = () => setIsAssginedUserModal(false);

  const handleOpenEditModal = () => {
    setIsEditModal(true)
  };
  const handleCloseEditModal = () => setIsEditModal(false);

  const handleSaveEditModal = async () => {
    console.log(editingTaskListIndex);
    if (!editTaskList.name && !editTaskList.deadline && !editTaskList.share) {
     
      return;
    }
    
    const tasklist_id = tasklists[editingTaskListIndex]?._id;
   
    const formData = {
      name: editTaskList.name,
      deadline: editTaskList.deadline,

    };
    const data = Object.keys(formData).reduce((acc, key) => {
      if (formData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    try {
      await dispatch(editList({ tasklist_id, data }))

    } catch (error) {
      console.log(error);

    }
    handleCloseEditModal();
    handleCancelEditTaskList();
  }

  const handleMarkAsDone = () => {
    console.log("mark as done");
  }


  const handleSaveEditTaskList = async (index) => {

    if (!editTaskList.name && !editTaskList.deadline && !editTaskList.share) {
      // console.log("no change")
      return;
    }
    // console.log("save")
    console.log(editTaskList);
    const tasklist_id = tasklists[index]?._id;

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

    setEditingTaskListIndex(null);
  };



  return (
    <div className="w-full mx-auto mt-10 ">

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
              name="name"
              value={newTaskList.name}
              onChange={(e) => setNewTaskList({ ...newTaskList, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-xl outline-none px-3 py-1 h-[2rem]"
              placeholder="Enter Task List Name"
            />
            <div className='text-gray-400 mt-4'>
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
              {
                isCreatingList ? (<ClipLoader size={15} />
                ) : (<span>Add</span>)
              }
            </button>



          </div>
          {tasklists && tasklists?.map((taskList, index) => (

            <Todo
              key={index}
              index={index}
              taskList={taskList}
              handleEditTaskList={() => handleEditTaskList(index)}
              onCancelEditTaskList={handleCancelEditTaskList}
              isEditingTaskList={editingTaskListIndex === index}
              editTaskList={editTaskList}
              setEditTaskList={setEditTaskList}
              workspace_id={workspace_id}
              onShare={handleOpenShareListModal}
              onUsers={handleOpenAssignedUserModal}
              onEdit={handleOpenEditModal}
              markListDone={handleMarkAsDone}

            />
          ))}
        </div>

      </div>

      {
        isShareModal &&
        <ShareTaskListModal isOpenShare={isShareModal} onClose={handleCloseShareLsitModal}  tasklist_id={tasklists[editingTaskListIndex]._id} />
      }
      {
        isAssginedUserModal &&
        <AssginedUserModal isOpen={isAssginedUserModal} onClose={handleCloseAssignedUserModal} />
      }
      {
        isEditModal &&
        <EditTaskListModal isOpen={isEditModal} onClose={handleCloseEditModal} onSave={handleSaveEditModal} editTaskList={editTaskList} setEditTaskList={setEditTaskList} />
      }
    </div >
  );
}
