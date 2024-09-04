"use client";
import React from 'react';
import * as Config from "@/helpers/admin/config";

const ViewHolidays = () => {
  return (
    <div className="bg-dashboardUserBg mt-5 m-auto w-[95%] p-4 rounded-lg shadow-lg">
      <div className="flex flex-wrap gap-4">
        {Config?.permanentholidays.map((item, id) => (
          <div
            key={id}
            className="flex-1 min-w-[45%] sm:min-w-[30%] md:min-w-[20%] lg:min-w-[15%] xl:min-w-[10%] bg-white p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-base font-semibold mb-1 text-gray-800">{item?.name}</div>
            <div className="text-sm text-gray-600">{item?.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewHolidays;
