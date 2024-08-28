"use client"
import { BsPlus as PlusIcon } from "react-icons/bs";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkspace, deleteWorkspace, editWorkspace, fetchWorkspaces } from '@/redux/slices/workspaceSlice'
import { toast, ToastContainer } from 'react-toastify';
import { MoonLoader, BeatLoader } from "react-spinners";
// import { BsThreeDots as EditIcon} from "react-icons/bs";
import { PiDotsThreeOutlineThin as EditIcon } from "react-icons/pi";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { EditWorkspaceModal } from "./_components/Modals";

const Workspace = () => {

    const dispatch = useDispatch();
    const { workspaces, isCreateWorkspaceLoading, isLoading } = useSelector((state) => state.workspace);


    // const [isOpen, setIsOpen] = useState(false);
    const [newWorkspace, setNewWorkspace] = useState('');
    const [user, setUser] = useState(null);
    const [isEditWorkspace, setIsEditWorkspace] = useState(false);
    const [workspaceIndex, setWorkspaceIndex] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [updateName, setUpdateName] = useState('');

    useEffect(() => {

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));

        }
    }, [dispatch]);

    useEffect(() => {

        const fetch = async () => {
            const data = await dispatch(fetchWorkspaces());
        }
        fetch();
    }, [dispatch])

    const handleOpenModal = (index) => {
        if (index < 0 || index >= workspaces.length) return;

        const workspace = workspaces[index]
        if (workspace) {
            setWorkspaceIndex(index);
            setUpdateName(workspace.name);
            setIsOpenModal(true);
        }

    }

    const handleCloseModal = () => {
        setIsOpenModal(false);
        setWorkspaceIndex(null);
    }

    const handleEditWorkspace = (index) => {

        setWorkspaceIndex(index);
        setIsEditWorkspace(true);
    }

    const handleCloseEditWorkspace = () => {
        setIsEditWorkspace(false);
        setWorkspaceIndex(null);
    }

    const handleOnSave = async () => {

        if (workspaceIndex == null) return

        const workspace_id = workspaces[workspaceIndex]?._id;
        if (!workspace_id) return


        try {
            await dispatch(editWorkspace({ updateName, workspace_id })).unwrap();
            toast.success("Workspace Editted Successful")
            handleCloseModal();

        } catch (error) {
            toast.error("Failed to edit workspace");
        }



    }

    const handleDeleteWorkspace = async () => {

        if (workspaceIndex === null) return;
        const workspace_id = workspaces[workspaceIndex]?._id;

        try {

            await dispatch(deleteWorkspace(workspace_id)).unwrap();
            toast.success("Workspace Deleted Successfully")
            handleCloseEditWorkspace();

        } catch (error) {
            console.log(error);
            return toast.error("Failed To delete Workspace");

        }

    }

    const handleAddWorkspace = async () => {

        const data = {
            name: newWorkspace, craetedBy: user.data._id
        }

        try {
            const res = await dispatch(createWorkspace(data));
            toast.success('Workspace Created Successfully');
        } catch (error) {
            toast.error('Failed to create Workspace');

        }
        if (newWorkspace.trim()) {
            // setWorkspaces();
            setNewWorkspace('');
        }
    };


    return (
        <>
            {
                isLoading ? (
                    <>
                        <div className="flex justify-center items-center w-full h-screen">
                            <BeatLoader />

                        </div>
                    </>
                ) :
                    (
                        <div className="w-full  mx-auto mt-10" >

                            {user?.data?.accessId == 1 ? (
                                <div className=" w-full flex flex-col  justify-center items-center m-auto ">

                                    <div className="my-4  w-[70%] md:w-[50%]  h-[4rem]">

                                        <div className='flex bg-white rounded-xl px-3 shadow-md justify-center items-center  hover:outline hover:outline-primary-color'>
                                            <input
                                                type="text"
                                                value={newWorkspace}
                                                onChange={(e) => setNewWorkspace(e.target.value)}
                                                className="w-full p-2  outline-none border-none"
                                                placeholder="Create Workspace"
                                            />

                                            {
                                                isCreateWorkspaceLoading ?
                                                    (
                                                        <MoonLoader size={15} color="#8153e9" />
                                                    ) :
                                                    (
                                                        <span onClick={handleAddWorkspace}>
                                                            <PlusIcon className="text-primary-color text-[1.7rem] font-bold cursor-pointer" />
                                                        </span>
                                                    )
                                            }


                                        </div>

                                    </div>

                                </div>

                            ) : null
                            }



                            <div className='px-10 mt-5 '>

                                <ul className="mt-4 md:flex md:gap-5 md:justify-center md:flex-wrap ">

                                    {!isLoading && workspaces?.map((workspace, index) => (

                                        <li key={index}
                                            index={index}
                                            className="bg-[#d0d2d36e] relative p-2 h-[4rem] text-[1rem] shadow-sm md:h-[8rem] md:w-[12rem] flex justify-center items-center rounded-lg mt-2">
                                            {
                                                user?.data?.accessId == 1 && (
                                                    <span className="absolute top-1 right-1 cursor-pointer" onClick={() => { handleEditWorkspace(index) }}><EditIcon /></span>
                                                )
                                            }

                                            {
                                                workspaceIndex == index && (
                                                    <div className="absolute flex flex-col top-6 shadow rounded-sm right-1 bg-white p-2 z-10">
                                                        <CloseIcon className="text-[0.8rem] mr-1 cursor-pointer ml-9" onClick={handleCloseEditWorkspace} />

                                                        <span className="cursor-pointer" onClick={() => { handleOpenModal(index) }}>Edit</span>
                                                        <span onClick={handleDeleteWorkspace} className="cursor-pointer">Delete</span>
                                                    </div>
                                                )
                                            }
                                            <Link href={`/admin/workspaces/${workspace?._id}`} key={index} className="text-bodyTextColor font-semibold">
                                                {workspace?.name}
                                            </Link>
                                        </li>

                                    ))
                                    }

                                </ul>
                            </div>

                            {isOpenModal &&
                                <EditWorkspaceModal
                                    isOpen={isOpenModal}
                                    onClose={handleCloseModal}
                                    workspaceIndex={workspaceIndex}
                                    workspaces={workspaces}
                                    updateName={updateName}
                                    setUpdateName={setUpdateName}
                                    onSave={handleOnSave}
                                />
                            }
                        </div >

                    )
            }
        </>
    );
}

export default Workspace;

