"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createWorkspace,fetchWorkspaces} from '@/redux/slices/workspaceSlice'
import { toast, ToastContainer } from 'react-toastify';

const Workspace = () => {
    
    const dispatch = useDispatch();
    const workspaces = useSelector((state)=>state.workspace.workspaces);

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
        
    }, []);

    useEffect(()=>{
        console.log("api")
        const fetch = async()=>{
            const data = await dispatch(fetchWorkspaces());
            // setWorkspaces(data);

        }
        fetch();
        
    },[])
//    console.log(workspaces);
    const handleAddWorkspace = async() => {
        
        const data = {
            name:newWorkspace,craetedBy:user.data._id
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
            <div className=" w-full flex flex-col justify-center items-center m-auto">
                <button
                    onClick={toggleAccordion}
                    className="w-1/2 text-center font-semibold bg-primary-color text-white  p-2 rounded-lg"
                >
                    Create Workspace
                </button>
                {isOpen && (
                    <div className="mt-4">

                        <div className='flex gap-3'>
                            <input
                                type="text"
                                value={newWorkspace}
                                onChange={(e) => setNewWorkspace(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="workspace name"
                            />
                            <button
                                onClick={handleAddWorkspace}
                                className=" bg-primary-color text-white p-2 rounded-lg"
                            >
                                Add
                            </button>
                        </div>

                    </div>
                )}
            </div>

            <div className='px-10 mt-5'>
                <ul className="mt-4">

                    {workspaces?.map((workspace, index) => (
                        <Link href={`/admin/workspaces/${workspace._id}`} key={index}>
                            <li key={workspace._id} className="bg-gray-200 p-2 h-[4rem] text-[1rem] flex justify-center items-center rounded-lg mt-2">
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