import React from 'react'
import { FaLock as LockIcon } from "react-icons/fa";
const Page = () => {
  return (
    <div className=' h-screen flex justify-center items-center
        my-4 mx-3 border border-primary-color rounded-[2rem] ' >

              <div className='flex flex-col justify-center items-center  gap-5  py-3 px-2'>

                <h1 className='text-[1.8rem] font-bold'>New Password</h1>
                <form className=' flex flex-col justify-center items-center gap-5 py-2 px-3 w-full'>

                <div className='border-b border-b-primary-color  w-full flex justify-center items-center px-[0.5rem]'>
                    <span><LockIcon className='text-[1.2rem] text-primary-color' /></span>
                    <input type="password" placeholder='Password'
                      className='text-[1.3rem] outline-none' />
                  </div>

                  <div className='border-b border-b-primary-color  w-full flex justify-center items-center px-[0.5rem]'>
                    <span><LockIcon className='text-[1.2rem] text-primary-color' /></span>
                    <input type="password" placeholder='Confirm Password'
                      className='text-[1.3rem] outline-none' />
                  </div>

                  

                  <button className='bg-black text-white px-2 py-1 rounded-[2rem] w-full text-[1.3rem]
            '>Submit</button>
                </form>

              </div>
   </div> 
  )
}

export default Page