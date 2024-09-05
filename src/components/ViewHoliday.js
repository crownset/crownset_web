"use client";
import React, { useState } from "react";
import * as Config from "@/helpers/admin/config";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const ViewHolidays = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;


    const totalPages = Math.ceil(Config?.permanentholidays.length / itemsPerPage);


    const currentItems = Config?.permanentholidays.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const PreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const NextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    

    return (
        <div className="bg-dashboardUserBg mt-5 m-auto w-[95%] p-4 rounded-lg shadow-lg">
            <div className="grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {currentItems.map((item, id) => (
                    <div
                        key={id}
                        className="flex-1 min-w-[45%] sm:min-w-[30%] md:min-w-[20%] lg:min-w-[15%] xl:min-w-[10%] bg-white p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="text-base font-semibold mb-1 text-gray-800">{item?.name}</div>
                        <div className="text-sm text-gray-600">{item?.date}</div>
                    </div>
                ))}
            </div>


            <div className="flex justify-center items-center mt-4">
                <button
                    className={`p-2 ${currentPage === 1 ? 'text-gray-400' : 'text-black'}`}
                    onClick={PreviousPage}
                    disabled={currentPage === 1}
                >
                    <AiOutlineLeft className="w-4 h-4" />
                </button>
                <span className="text-gray-600">
                    {currentPage} - {totalPages}
                </span>
                <button
                    className={`p-2 ${currentPage === totalPages ? 'text-gray-400' : 'text-black'}`}
                    onClick={NextPage}
                    disabled={currentPage === totalPages}
                >
                    <AiOutlineRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ViewHolidays;
