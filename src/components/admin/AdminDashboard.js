"use client";
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { MdDashboard, MdContentCopy, MdOrder } from "react-icons/md";
import { SiGoogleads } from "react-icons/si";

import { FaSignOutAlt } from "react-icons/fa";
import Queries from './Queries';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/redux/slices/authSlice';
import CustomAlert from './CustomAlert';
import Cookies from 'js-cookie';
import Link from 'next/link';

const AdminDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const dispatch = useDispatch();
    const router = useRouter();

    // useEffect(() => {
    //     const token = Cookies.get('authToken');
    //     if (!token) {
    //         router.replace('/teams');
    //     }
    // }, [router]);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleConfirm = async () => {
        await dispatch(logoutUser());
        router.push("/teams");
        console.log("Confirmed!");
        closeModal();
    };

    // If loading, display nothing or a loading indicator
    // if (loading) return null;

    return (
        <>
            <div className="flex">
                <div
                    className={`fixed top-0 left-0 h-full ${isSidebarOpen ? "w-64" : "w-20"} bg-[#e7e7e7] text-black transition-all duration-300 ease-in-out z-10 flex flex-col`}
                >
                    <div className="flex justify-between items-center p-4">
                        {isSidebarOpen == false ? (
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
                        )}
                        {isSidebarOpen && (
                            <button onClick={toggleSidebar}>
                                <RxCross2 className="h-6 w-6 text-black" />
                            </button>
                        )}
                    </div>
                    <hr className='text-black' />
                    <div className="flex-1 flex flex-col p-4">
                        <ul className="space-y-4">
                            <li>
                                <Link href="/admin/leads">
                                    <button className="flex items-center hover:bg-[#93969A] hover:text-white p-2 rounded w-full transition-transform duration-300 transform hover:translate-x-2">
                                        <SiGoogleads className="h-5 w-5 mr-2" />
                                        <span className={`${!isSidebarOpen && "hidden"} ml-2`}>Leads Management</span>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/pades">
                                    <button className="flex items-center hover:bg-[#93969A] hover:text-white p-2 rounded w-full transition-transform duration-300 transform hover:translate-x-2">
                                        <MdContentCopy className="h-5 w-5 mr-2" />
                                        <span className={`${!isSidebarOpen && "hidden"} ml-2`}>Our Pades</span>
                                    </button>
                                </Link>

                            </li>
                        </ul>
                    </div>
                    <div className="p-4 mt-auto">
                        <ul className="space-y-4">
                            <li>
                                <button className="flex items-center hover:bg-[#93969A] hover:text-white p-2 rounded w-full transition-transform duration-300 transform hover:translate-x-2" onClick={openModal}>
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
            <CustomAlert
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Are you sure?"
                description="Are you sure you want to logout?"
                confirmButtonText="Yes, I'm sure"
                cancelButtonText="No, cancel"
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default AdminDashboard;
