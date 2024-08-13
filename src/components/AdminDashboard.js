"use client";
import Image from 'next/image';
import React, { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { MdDashboard, MdContentCopy, MdOrder } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import Queries from './Queries';

const AdminDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
          <div className="flex">
            <div
                className={`fixed top-0 left-0 h-full ${isSidebarOpen ? "w-64" : "w-20"} bg-[#e7e7e7] text-black transition-all duration-300 ease-in-out z-10 flex flex-col`}
            >
                <div className="flex justify-between items-center p-4">
                    {
                        isSidebarOpen == false ? (
                            <button onClick={() => setSidebarOpen(true)}>
                                <RxHamburgerMenu className="h-6 w-6 text-black ml-2 mt-2" />
                            </button>
                        ) : (
                                <Image
                                    src="https://thecrownset.com/wp-content/uploads/2024/07/cropped-crownsetfinalblackvector-removebg-preview-1.png"
                                    alt="Crownset Logo"
                                    width={isSidebarOpen ? 150 : 50}
                                    height={20}
                                />
                        )
                    }
                    {
                        isSidebarOpen && (
                            <button onClick={toggleSidebar}>
                                <RxCross2 className="h-6 w-6 text-black" />
                            </button>
                        )
                    }

                </div>
                <hr className='text-black'/>
                <div className="flex-1 flex flex-col p-4">
                    <ul className="space-y-4">
                        <li>
                            <button className="flex items-center hover:bg-[#93969A] hover:text-white p-2 rounded w-full transition-transform duration-300 transform hover:translate-x-2">
                                <MdDashboard className="h-5 w-5 mr-2" />
                                <span className={`${!isSidebarOpen && "hidden"} ml-2`}>Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center hover:bg-[#93969A] hover:text-white p-2 rounded w-full transition-transform duration-300 transform hover:translate-x-2">
                                <MdContentCopy className="h-5 w-5 mr-2" />
                                <span className={`${!isSidebarOpen && "hidden"} ml-2`}>Content Management</span>
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="p-4 mt-auto">
                    <ul className="space-y-4">
                        <li>
                            <button className="flex items-center hover:bg-[#93969A] hover:text-white p-2 rounded w-full transition-transform duration-300 transform hover:translate-x-2">
                                <FaSignOutAlt className="h-5 w-5 mr-2" />
                                <span className={`${!isSidebarOpen && "hidden"} ml-2`}>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`fixed w-full flex items-center bg-[#e7e7e7] p-4 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 ease-in-out`}>
                <div className='w-[16rem]'>
                    <input
                        className="border rounded-[4rem] w-full h-10 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="Search"
                        type="text"
                        placeholder="Search"
                    />
                </div>
            </div>
        </div>
            <div className={`${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 ease-in-out p-4`}>
                efvgegee
            </div>
        </>
      
    );
};

export default AdminDashboard;
