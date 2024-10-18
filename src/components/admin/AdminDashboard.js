"use client";
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/redux/slices/authSlice';
import CustomAlert from './CustomAlert';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { menuItems, logoutItem } from '@/helpers/admin/config';
import * as Icon from "@/helpers/icons";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners';
import { IoPersonCircleSharp } from "react-icons/io5";
import UserDetailsModal from './UserDetailsModal';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { FaEnvelope } from 'react-icons/fa';
import { CustomLoader } from '../CustomLoader';
import { usePathname } from 'next/navigation';
import CustomTooltip from './CustomTooltip';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const AdminDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [selectedTab, setSelectedTab] = useState(menuItems[0].name);

    const pathname = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();
    const status = useSelector((state) => state.auth.status);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const openDetailsModal = () => {
        setShowUserDetails(true);
    };

    const closeDetailsModal = () => {
        setShowUserDetails(false);
    };

    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleConfirm = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            Cookies.remove("authToken:");
            localStorage.removeItem('user');
            localStorage.removeItem('workspaces');
            toast.success("Logout successful!");
            router.push("/teams");
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        } finally {
            closeModal();
        }
    };

    return (
        <>
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
            <div className="flex">
                <div
                    className={`fixed top-0 left-0 h-full ${isSidebarOpen ? "w-64 md:w-64" : "w-0 md:w-20"} bg-dashboard shadow-lg text-black transition-all duration-300 ease-in-out flex flex-col z-30`}
                >
                    <div className="mt-[14px]">
                        {!isSidebarOpen ? (
                            <button onClick={toggleSidebar}>
                                <RxHamburgerMenu className="h-6 w-[3.25rem] ml-2 mt-2 text-default" />
                            </button>
                        ) : (
                            <div className="flex items-center justify-between h-[2rem]">
                                <div>
                                    <Image
                                        src={Icon?.crownsetLogo}
                                        alt="Crownset Logo"
                                        width={150}
                                        height={20}
                                        className="p-0 ml-[12px] mt-[2rem]"
                                    />
                                </div>
                                <div>
                                    <button onClick={toggleSidebar}>
                                        <RxCross2 className="h-6 w-6 mr-[12px] mt-[2.5rem] text-default" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col p-4 mt-[4rem] overflow-y-auto max-h-[calc(100vh-4rem)] scrollbar-hide">
                        <ul className="space-y-4">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={user?.data?.accessId === 1 && item.name === "Daily Task" ? `/admin/dailytask/department` : item.href}
                                        className={`group flex items-center p-2 rounded w-full transition-all duration-300 ease-in-out transform hover:translate-x-2 ${pathname === item.href ? "bg-default rounded-3xl text-black" : "text-default hover:bg-[#d8d8d8] hover:rounded-3xl hover:text-black"}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (item.name === "Daily Task") {
                                                if (user?.data?.accessId === 1) {
                                                    router.push("/admin/dailytask/departments");
                                                } else {
                                                    router.push(item.href);
                                                }
                                            } else {
                                                setSelectedTab(item.name);
                                                router.push(item.href);
                                            }
                                        }}
                                        data-tooltip-id={`tooltip-${item.name}`}
                                        data-tooltip-content={item.name}
                                    >
                                        <item.icon className={`h-5 w-5 mr-2 ${pathname === item.href ? "text-black" : "text-default group-hover:text-black"}`} />
                                        <span className={`${!isSidebarOpen && "hidden"} ml-2`}>{item.name}</span>
                                    </Link>
                                    {
                                        isSidebarOpen === false && (
                                            <Tooltip id={`tooltip-${item.name}`} place="right" offset={20} className="z-50 custom-tooltip" />
                                        )
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-4 mt-auto">
                        <ul className="space-y-4">
                            <li>
                                <button
                                    className="group flex items-center text-default hover:bg-default hover:text-black p-2 rounded w-full transition-transform duration-300 transform hover:translate-x-2"
                                    onClick={openModal}
                                >
                                    <logoutItem.icon className="h-5 w-5 mr-2 text-default group-hover:text-black" />
                                    <span className={`${!isSidebarOpen && "hidden"} ml-2`}>{logoutItem.name}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`fixed w-full flex items-center justify-between bg-default p-4 ${isSidebarOpen ? 'ml-64 md:ml-64' : 'ml-0 md:ml-20'} transition-all duration-300 ease-in-out shadow-md z-10`}>
                    <div className="flex items-center w-[60%]">
                        <button onClick={toggleSidebar}>
                            <RxHamburgerMenu className={`h-6 w-[3.25rem] ${isSidebarOpen ? "hidden" : null}  text-black md:hidden`} />
                        </button>
                    </div>
                    <div className="pt-2">
                        <button onClick={openDetailsModal}>
                            <IoPersonCircleSharp className="h-7 w-7 text-dashboard" />
                        </button>
                    </div>
                </div>
            </div>
            <UserDetailsModal openDetails={showUserDetails} closeDetails={closeDetailsModal} data={user} />
            <CustomAlert
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Are you sure?"
                description="Are you sure you want to logout?"
                confirmButtonText={status === "loading" ? <BeatLoader color="#ffffff" size={10} /> : "Yes, I'm sure"}
                cancelButtonText="No, cancel"
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default AdminDashboard;
