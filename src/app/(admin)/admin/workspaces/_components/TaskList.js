"use client"
import { useEffect, useState } from 'react';
import { BsPlus as PlusIcon } from "react-icons/bs";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';


import {
  setIsAssginedUserModal,
  setIsEditTaskListModal,
  setIsShareModal,
  setIsTodoEditModal,
  setIsTodoLabelsModal
} from '@/redux/slices/misc';
import { createlist, deleteTasklist, editList, fetchTasklist } from '@/redux/slices/tasklistSlice';
import { AssginedUserModal, EditTaskListModal, EditTodoModal, ShareTaskListModal, TodoLabelsModal } from './Modals';
import Todo from './Todo';


export default function TaskList({ workspace_id }) {

  const dispatch = useDispatch();
  const tasklists = useSelector((state) => state.tasklist?.tasklist);
  const { isCreatingList } = useSelector((state) => state.tasklist);
  const { isTodoEditModal, isTodoIndex, tasklistIndex, isTodoLabelsModal,
    isShareModal, isAssginedUserModal, isEditTaskListModal
  } = useSelector((state) => state.misc)
  // console.log(tasklists);

  const [user, setUser] = useState(null);

  const [newTaskListName, setNewTaskListName] = useState('');
  const [newTaskListDeadline, setNewTaskListDeadline] = useState('');
  const [editingTaskListIndex, setEditingTaskListIndex] = useState(null);
  const [editTaskList, setEditTaskList] = useState({ name: '', deadline: '' });


  const [showAddList, setShowAddList] = useState(false);

  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));

    }
  }, [dispatch]);



  const handleAddTaskList = async (e) => {
    e.preventDefault();


    if (!newTaskListName) {
      toast.error("List field should not be empty")

      return;
    }
    if (!newTaskListDeadline) {
      toast.error("Deadline field should not be empty")

      return;

    }
    const data = {
      name: newTaskListName,
      deadline: newTaskListDeadline,
      workspace_id: workspace_id

    }

    try {

      const res = await dispatch(createlist(data));
      // console.log(res);
      await dispatch(fetchTasklist(workspace_id))
      setNewTaskListName('');
      setNewTaskListDeadline('');
      toast.success(res?.data?.data?.message);
    } catch (error) {
       return toast.error("Failed to create list")

    }

  };

  const handleEditTaskList = (index) => {

    const taskList = tasklists[index];
    setEditingTaskListIndex(index);
    setEditTaskList({ name: taskList.name, deadline: taskList.deadline });
  };

  const handleCancelEditTaskList = () => setEditingTaskListIndex(null);


  // MODAL Handler


  const handleSaveEditModal = async () => {
    // console.log(editingTaskListIndex);
    if (!editTaskList.name && !editTaskList.deadline) {

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
      await dispatch(fetchTasklist(workspace_id));
      dispatch(setIsEditTaskListModal(false));
      toast.success("Tasklist Editted Successfully")

    } catch (error) {
      return toast.error("Failed to Edit Task List")

    }

  }


  const deleteTaskList = async (index) => {
    const taskList_id = tasklists[index]._id;

    try {
      await dispatch(deleteTasklist(taskList_id));
      setEditingTaskListIndex(null);
      await dispatch(fetchTasklist(workspace_id));


    } catch (error) {
      // console.log("Error in deleting tasklist")
      return toast.error("Error in deleting list");
    }
    // console.log("Delete List")
  }

  const handlName = (e) => {
    setNewTaskListName(e.target.value);
  }
  const handlDeadline = (e) => {
    setNewTaskListDeadline(e.target.value);
  }

  return (
    <div className="mt-5 mb-10 ">

      <div className=" flex justify-center md:justify-start md:overflow-x-auto md:h-[80vh]">

        <div className="flex flex-col justify-center md:flex-row  md:gap-6 md:justify-start md:items-start">

          {user?.data?.accessId == 1 ? (

            showAddList ? (

              <div className='bg-gray-100 px-2 py-4 rounded-xl shadow-md  w-[280px] sm:w-[500px] md:w-[300px] flex-none'>

                <input
                  type="text"
                  value={newTaskListName}
                  onChange={handlName}
                  className="w-full p-2 border border-gray-300 rounded-xl outline-none px-3 py-1 h-[2rem]"
                  placeholder="Enter Task List Name"
                />

                <div className='text-gray-400 mt-4'>
                  <span className='ml-2 mt-4'>Deadline</span>
                  <input
                    type="date"
                    value={newTaskListDeadline}
                    onChange={handlDeadline}
                    className="w-full p-2 border border-gray-300 rounded-xl mt-2 outline-none px-3 py-1 h-[2rem]"
                    placeholder="Enter deadline"
                  />
                </div>

                <div className="mt-2 flex gap-4 items-center">
                  {isCreatingList ? (
                    <ClipLoader size={15} />
                  ) : (
                    <span
                      className='bg-blue-500 text-white rounded-lg px-2 py-1 cursor-pointer'
                      onClick={handleAddTaskList}
                    >
                      Add
                    </span>
                  )}

                  <span
                    onClick={() => { setShowAddList(false) }}
                    className='cursor-pointer bg-transparent hover:bg-gray-200 p-1 rounded-lg'
                  >
                    <CloseIcon className='text-[1.2rem]' />
                  </span>
                </div>

              </div>

            ) : (

              <div
                className='flex gap-2 w-[280px]  p-2  flex-none md:w-[300px] cursor-pointer rounded-xl todoButtonEffect'
                onClick={() => { setShowAddList(true) }}
              >
                <PlusIcon className='text-[1.5rem]' />
                <span >Add new List</span>
              </div>

            )
          ) : null

          }

          {
            tasklists && tasklists?.map((taskList, index) => (

              <Todo
                key={index}
                listIndex={index}
                taskList={taskList}
                handleEditTaskList={() => handleEditTaskList(index)}
                onCancelEditTaskList={handleCancelEditTaskList}
                isEditingTaskList={editingTaskListIndex === index}
                workspace_id={workspace_id}
                deleteTaskList={()=>deleteTaskList(index)}
              />
            ))
          }

        </div>

      </div>

      {/* taskList Modal */}
      {isShareModal &&
        <ShareTaskListModal
          isOpenShare={isShareModal}
          onClose={() => { dispatch(setIsShareModal(false)) }}
          tasklist_id={tasklists[editingTaskListIndex]?._id}
          workspace_id={workspace_id}
        />
      }

      {isAssginedUserModal &&
        <AssginedUserModal
          isOpen={isAssginedUserModal}
          onClose={() => { dispatch(setIsAssginedUserModal(false)) }}
          tasklist_id={tasklists[editingTaskListIndex]?._id}
          workspace_id={workspace_id}
        />
      }

      {isEditTaskListModal &&
        <EditTaskListModal
          isOpen={isEditTaskListModal}
          onClose={() => { dispatch(setIsEditTaskListModal(false)) }}
          onSave={handleSaveEditModal}
          editTaskList={editTaskList}
          setEditTaskList={setEditTaskList}
          workspace_id={workspace_id}
        />
      }

      {/* todo modal */}

      {isTodoEditModal &&
        <EditTodoModal
          isOpen={isTodoEditModal}
          onClose={() => { dispatch(setIsTodoEditModal(false)) }}
          workspace_id={workspace_id}

        />
      }

      {isTodoLabelsModal &&
        <TodoLabelsModal
          isOpen={isTodoLabelsModal}
          onClose={() => { dispatch(setIsTodoLabelsModal(false)) }}
          workspace_id={workspace_id}
        />
      }
    </div >
  );
}