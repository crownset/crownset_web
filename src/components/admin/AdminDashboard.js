"use client";
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/redux/slices/authSlice';
import CustomAlert from './CustomAlert';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { menuItems, logoutItem } from '@/helpers/admin/config';
import { BeatLoader } from 'react-spinners';

const AdminDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);


    const dispatch = useDispatch();
    const router = useRouter();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleConfirm = async () => {
        localStorage.removeItem('user');
        await dispatch(logoutUser());
        router.push("/teams");
        closeModal();
    };

    return (
        <>
            <div className="flex">
                <div
                    className={`fixed top-0 left-0 h-full ${isSidebarOpen ? "w-64" : "w-20"} bg-dashboard text-black transition-all duration-300 ease-in-out z-10 flex flex-col shadow-md`}
                >
                    <div className="flex justify-between items-center p-4">
                        {isSidebarOpen === false ? (
                            <button onClick={() => setSidebarOpen(true)}>
                                <RxHamburgerMenu className="h-6 w-6 ml-2 mt-2 text-default" />
                            </button>
                        ) : (
                            <div className='flex items-center justify-between w-full'>
                                <Image
                                    src="https://thecrownset.com/wp-content/uploads/2024/07/cropped-crownsetfinalblackvector-removebg-preview-1.png"
                                    alt="Crownset Logo"
                                    width={isSidebarOpen ? 150 : 50}
                                    height={20}
                                />
                                <div>
                                    <button onClick={toggleSidebar}>
                                        <RxCross2 className="h-6 w-6 text-default" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col p-4">
                        <ul className="space-y-4">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.href}>
                                        <button className="group flex items-center text-default hover:bg-default hover:text-black p-2 rounded w-full transition-transform duration-300 transform hover:translate-x-2">
                                            <item.icon className="h-5 w-5 mr-2 text-default group-hover:text-black" />
                                            <span className={`${!isSidebarOpen && "hidden"} ml-2`}>{item.name}</span>
                                        </button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-4 mt-auto">
                        <ul className="space-y-4">
                            <li>
                                <button className="group flex items-center text-default hover:bg-default hover:text-black p-2 rounded w-full transition-transform duration-300 transform hover:translate-x-2" onClick={openModal}>
                                    <logoutItem.icon className="h-5 w-5 mr-2 text-default group-hover:text-black" />
                                    <span className={`${!isSidebarOpen && "hidden"} ml-2`}>{logoutItem.name}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`fixed w-full flex items-center bg-[#f5f6fa] p-4 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 ease-in-out shadow`}>
                    <div className='w-[16rem] text-2xl font-semibold'>
                        <h1>Dashboard</h1>
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
