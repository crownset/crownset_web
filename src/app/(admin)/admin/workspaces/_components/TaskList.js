"use client"
import { useEffect, useState } from 'react';
import Todo from './Todo';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { createlist, editList } from '@/redux/slices/tasklistSlice';
import { BsPlus as PlusIcon } from "react-icons/bs";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { MoonLoader, BeatLoader, ClipLoader } from "react-spinners";
import { AssginedUserModal, EditTaskListModal, EditTodoModal, ShareTaskListModal, TodoLabelsModal } from './Modals';
import { assignUsers } from '@/redux/slices/userSlice';
import { setIsTodoEditModal, setIsTodoLabelsModal } from '@/redux/slices/misc';

export default function TaskList({ workspace_id }) {

  const dispatch = useDispatch();
  const tasklists = useSelector((state) => state.tasklist?.tasklist);
  const { isCreatingList } = useSelector((state) => state.tasklist);
  const { isTodoEditModal, isTodoIndex, tasklistIndex, isTodoLabelsModal } = useSelector((state) => state.misc)


  const [user, setUser] = useState(null);

  const [newTaskList, setNewTaskList] = useState({ name: '', deadline: '', workspace_id: workspace_id });
  const [editingTaskListIndex, setEditingTaskListIndex] = useState(null);
  const [editTaskList, setEditTaskList] = useState({ name: '', deadline: '' });

  const [isShareModal, setIsShareModal] = useState(false);
  const [isAssginedUserModal, setIsAssginedUserModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const [showAddList,setShowAddList]=useState(false);
  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));

    }
  }, [dispatch]);

  const handleShowAddList = ()=>{
    setShowAddList(true);
  }

  const handleCloseShowAddList = ()=>{
    setShowAddList(false);
  }

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

    const taskList = tasklists[index];
    setEditingTaskListIndex(index);
    setEditTaskList({ name: taskList.name, deadline: taskList.deadline });
  };

  const handleCancelEditTaskList = () => setEditingTaskListIndex(null);


  // MODAL Handler
  const handleOpenShareListModal = () => setIsShareModal(true)
  const handleCloseShareLsitModal = () => setIsShareModal(false)
  const handleSaveShareList = () => { console.log("save") };

  const handleOpenAssignedUserModal = () => setIsAssginedUserModal(true);
  const handleCloseAssignedUserModal = () => setIsAssginedUserModal(false);

  const handleOpenEditModal = () => setIsEditModal(true);
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

  const handleCloseTodoModal = () => dispatch(setIsTodoEditModal(false));
  const HandleSaveTodoModal = () => dispatch(setIsTodoEditModal(false));

  const HandleCloseLabelModal = () => dispatch(setIsTodoLabelsModal(false));
  const HandleSaveLabel = () => dispatch(setIsTodoLabelsModal(false));

  return (
    <div className="mt-5">

      <div className=" md:overflow-x-auto ">


        <div className="md:flex md:gap-6 md:justify-start md:items-start ">
          {
            user?.data?.accessId == 1 ? (

              showAddList ? (
                <div className='bg-gray-100 p-2 rounded-xl shadow-md   md:w-[300px] flex-none'>

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

                  <div
                   
                    className="mt-2 flex gap-4 items-center "
                  >
                    {
                      isCreatingList ? (<ClipLoader size={15} />
                      ) : (<span className=' bg-primary-color text-white rounded-lg px-2 py-1 cursor-pointer'  onClick={handleAddTaskList}>Add</span>)
                    }
                    <span onClick={handleCloseShowAddList} className='cursor-pointer'><CloseIcon/></span>
                  </div>



                </div>

              ) : (
                <div className='flex gap-2 w-[300px] p-2  flex-none md:w-[300px] cursor-pointer rounded-xl todoButtonEffect'
                  onClick={handleShowAddList}>
                  <PlusIcon className='text-[1.5rem]' />
                  <span >Add new List</span>
                </div>
              )
            ) : null

          }

          {/* {
            user?.data?.accessId == 1 ? (

              // <div className='bg-gray-100 p-4 rounded-xl shadow-md  mx-4 md:w-[300px] flex-none'>

              //   <input
              //     type="text"
              //     name="name"
              //     value={newTaskList.name}
              //     onChange={(e) => setNewTaskList({ ...newTaskList, name: e.target.value })}
              //     className="w-full p-2 border border-gray-300 rounded-xl outline-none px-3 py-1 h-[2rem]"
              //     placeholder="Enter Task List Name"
              //   />
              //   <div className='text-gray-400 mt-4'>
              //     <span className='ml-2 mt-4'>Deadline</span>
              //     <input
              //       type="date"
              //       name="deadline"
              //       value={newTaskList.deadline}
              //       onChange={(e) => setNewTaskList({ ...newTaskList, deadline: e.target.value })}
              //       className="w-full p-2 border border-gray-300 rounded-xl mt-2 outline-none px-3 py-1 h-[2rem]"
              //       placeholder="Enter deadline"
              //     />
              //   </div>

              //   <button
              //     onClick={handleAddTaskList}
              //     className="mt-2 bg-primary-color text-white px-6 py-1 w-full rounded-lg"
              //   >
              //     {
              //       isCreatingList ? (<ClipLoader size={15} />
              //       ) : (<span>Add</span>)
              //     }
              //   </button>



              // </div>

            ) : null
          } */}



          {tasklists && tasklists?.map((taskList, index) => (

            <Todo
              key={index}
              listIndex={index}
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

      {/* taskList Modal */}
      {
        isShareModal &&
        <ShareTaskListModal isOpenShare={isShareModal} onClose={handleCloseShareLsitModal} tasklist_id={tasklists[editingTaskListIndex]?._id} />
      }
      {
        isAssginedUserModal &&
        <AssginedUserModal isOpen={isAssginedUserModal} onClose={handleCloseAssignedUserModal} />
      }
      {
        isEditModal &&
        <EditTaskListModal isOpen={isEditModal} onClose={handleCloseEditModal} onSave={handleSaveEditModal} editTaskList={editTaskList} setEditTaskList={setEditTaskList} />
      }

      {/* todo modal */}
      {
        isTodoEditModal && <EditTodoModal isOpen={isTodoEditModal} onClose={handleCloseTodoModal} onSave={HandleSaveTodoModal} />
      }
      {
        isTodoLabelsModal && <TodoLabelsModal isOpen={isTodoLabelsModal} onClose={HandleCloseLabelModal} onSave={HandleSaveLabel} />
      }
    </div >
  );
}
