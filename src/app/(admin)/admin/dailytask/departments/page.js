"use client"
import React, { useState } from 'react'
import * as Config from "@/helpers/admin/config"
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

    const handleDepartmentClick = (href) => {
        router.push(href);
    };

    const dailyTaskItem = Config?.menuItems.find(item => item.name === "Daily Task");

    return (
        <div className="bg-default shadow-xl rounded-2xl w-[95%] mt-10 md:px-3 md:py-3 flex flex-col gap-4 m-auto md:h-[50vh]">
            <div className="w-full flex flex-wrap justify-center gap-4 items-start">
                {
                    dailyTaskItem?.subItems?.map((subItem, index) => (
                        <button
                            key={index}
                            className="flex cursor-pointer flex-col justify-center items-center bg-dashboardUserBg px-4 py-3 rounded-2xl text-center shadow-md"
                            onClick={() => router.push(subItem?.href)}
                        >
                            <div className="text-lg font-medium">{subItem?.name}</div>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Page
