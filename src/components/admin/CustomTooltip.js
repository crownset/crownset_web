import React from 'react';

const CustomTooltip = ({ text, children, isSidebarOpen }) => {
    return (
        <div className="relative group">
            {children}
            {!isSidebarOpen && (
                <div className="absolute left-full transform -translate-y-1/2 bg-dashboardUserBg text-dashboard text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
                    {text}
                </div>
            )}
        </div>
    );
}

export default CustomTooltip;
