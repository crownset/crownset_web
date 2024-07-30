"use client";
import React, { useEffect, useState } from 'react'
import { MdEmail as EmailIcon } from "react-icons/md";
import { FaLock as LockIcon } from "react-icons/fa";
const Page = () => {
  const [isForgot, setIsforgot] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

 
  const handleToggle = () => {
    setIsforgot(!isForgot);
  }

  return (
    <>


      {
        isForgot ? <>

          <div className=' border border-bodyTextColor rounded-[2rem] h-screen flex justify-center items-center
        my-4 mx-3' >

            <div className='flex flex-col justify-center items-center  gap-5  py-3 px-2'>

              <h1 className='text-[1.8rem] font-bold'>Forgot Password</h1>
              <form className=' flex flex-col justify-center items-center gap-5 py-2 px-3 w-full'>

                <div className='border-b border-b-primary-color  w-full flex justify-center items-center px-[0.5rem]'>
                  <span><EmailIcon className='text-[1.2rem] text-primary-color' /></span>
                  <input type="email" placeholder='Enter your email'
                    className='text-[1.3rem] outline-none' />
                </div>

                <div className='flex justify-end items-end  w-full'>
                  <button className='text-primary-color' onClick={handleToggle}>Login?</button>

                </div>

                <button className='bg-black text-white px-2 py-1 rounded-[2rem] w-full text-[1.3rem]
            '>Submit</button>
              </form>

            </div>
          </div>

        </> : (
          <>
            <div className=' border border-bodyTextColor rounded-[2rem] h-screen flex justify-center items-center
        my-4 mx-3' >

              <div className='flex flex-col justify-center items-center  gap-5  py-3 px-2'>

                <h1 className='text-[1.8rem] font-bold'>Login</h1>
                <form className=' flex flex-col justify-center items-center gap-5 py-2 px-3 w-full'>

                  <div className='border-b border-b-primary-color  w-full flex justify-center items-center px-[0.5rem]'>
                    <span><EmailIcon className='text-[1.2rem] text-primary-color' /></span>
                    <input type="email" placeholder='Email'
                      className='text-[1.3rem] outline-none' />
                  </div>

                  <div className='border-b border-b-primary-color  w-full flex justify-center items-center px-[0.5rem]'>
                    <span><LockIcon className='text-[1.2rem] text-primary-color' /></span>
                    <input type="password" placeholder='Password'
                      className='text-[1.3rem] outline-none' />
                  </div>

                  <div className='flex justify-end items-end  w-full'>
                    <button className='text-primary-color' onClick={handleToggle}>Forgot Password?</button>

                  </div>

                  <button className='bg-black text-white px-2 py-1 rounded-[2rem] w-full text-[1.3rem]
            '>Login</button>
                </form>

              </div>
            </div>
          </>
        )
      }


    </>
  )
}

export default Page