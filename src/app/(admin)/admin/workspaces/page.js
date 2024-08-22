"use client"
import { BsPlus as PlusIcon } from "react-icons/bs";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkspace, fetchWorkspaces } from '@/redux/slices/workspaceSlice'
import { toast, ToastContainer } from 'react-toastify';

const Workspace = () => {

    const dispatch = useDispatch();
    const workspaces = useSelector((state) => state.workspace.workspaces);

    const [isOpen, setIsOpen] = useState(false);

    const [newWorkspace, setNewWorkspace] = useState('');

    const toggleAccordion = () => setIsOpen(!isOpen);

    const [user, setUser] = useState(null);
    useEffect(() => {
        console.log("here");
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));

        }

    }, [dispatch]);

    useEffect(() => {
        console.log("api")
        const fetch = async () => {
            const data = await dispatch(fetchWorkspaces());
            // setWorkspaces(data);

        }
        fetch();

    }, [dispatch])
    //    console.log(workspaces);
    const handleAddWorkspace = async () => {

        const data = {
            name: newWorkspace, craetedBy: user.data._id
        }

        try {
            const res = await dispatch(createWorkspace(data));
            toast.success('Workspace Created Successfully');
            await dispatch(fetchWorkspaces());

        } catch (error) {
            toast.error('Failed to create Workspace');

        }
        if (newWorkspace.trim()) {
            // setWorkspaces();
            setNewWorkspace('');
        }
    };



    return (
        <div className="w-full  mx-auto mt-10">
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
            <div className=" w-full flex flex-col  justify-center items-center m-auto ">


                <div className="my-4  w-[70%] md:w-[50%]  h-[4rem]">

                    <div className='flex bg-white rounded-xl px-3 shadow-md justify-center items-center  hover:border hover:border-primary-color'>
                        <input
                            type="text"
                            value={newWorkspace}
                            onChange={(e) => setNewWorkspace(e.target.value)}
                            className="w-full p-2  outline-none border-none"
                            placeholder="Enter Workspace Name"
                        />
                        <span onClick={handleAddWorkspace}>
                            <PlusIcon className="text-primary-color text-[1.7rem] font-bold cursor-pointer" />
                        </span>

                    </div>

                </div>

            </div>

            <div className='px-10 mt-5 '>
                <ul className="mt-4 md:flex md:gap-5 md:justify-center md:flex-wrap ">

                    {workspaces?.map((workspace, index) => (
                        <Link href={`/admin/workspaces/${workspace._id}`} key={index}>
                            <li key={workspace._id}
                                className="bg-[#d0d2d36e] p-2 h-[4rem] text-[1rem] shadow-sm md:h-[8rem] md:w-[12rem] flex justify-center items-center rounded-lg mt-2">
                                {workspace.name}

                            </li>
                        </Link>
                    ))}

                </ul>

            </div>


        </div>
    );
}

export default Workspace;