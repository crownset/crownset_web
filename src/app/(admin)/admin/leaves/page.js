"use client";
import  React, { useState } from "react";
import AddLeave from '@/components/admin/AddLeave';

const Page = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleOpenForm = () => setIsFormVisible(true);
    const handleCloseForm = () => setIsFormVisible(false);
  
    return (
        <>
        <div className="text-end" >
                <button 
                 onClick={handleOpenForm}
                className='bg-dashboard text-default text-sm text-center py-2 px-2 rounded-3xl my-3 text-[12px] ' >
                  Apply Leaves
                </button>
                {isFormVisible && <AddLeave onClose={handleCloseForm} />}
        </div>
    
        </>
    )
}


export default Page;


